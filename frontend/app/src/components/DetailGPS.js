import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import Truck from '../assets/images/truck.png';
import Sample from '../assets/images/sample.png';
import ManagerMap from './ManagerMap';
import axios from 'axios';
import {gps_service} from '../api/api';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const identityColor = '#0B0B3B';
const identityTextColor = '#F7FE2E';

export default function DetailGPS(props) {
  const userList = useSelector(state => state.userList.userList);
  const [ok, setOk] = useState(false);
  const [ID, setID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [LocationList, setLocationList] = useState([]);

  useEffect(() => {
    props.routeList //props 로 받아온 조건에 맞는 루트 리스트를 driverList에 저장
      .map((item, idx) => {
        setDriverList(driverList => {
          const newDriverList = [...driverList];
          newDriverList.push({
            userId: item.userId,
            name: item.name,
            routeInfo: item.routeInfo,
            id: item.id,
          });
          return newDriverList;
        });
      });
    setOk(true);
  }, []);

  useEffect(() => {
    if (driverList.length !== 0) {
      console.log(driverList);
      driverList.map((item, idx) => {
        axios({
          method: 'get',
          url: gps_service.getRealTimeGPS() + `${item.id}`,
        })
          .then(res => {
            console.log('gps 정보 출력', res.data);
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  }, [ok]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.driverListLayout}
        data={driverList}
        keyExtractor={(item, idx) => idx}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                if (ID !== item.id) {
                  axios.get;
                  setID(item.id);
                } else {
                  setID('');
                }
              }}>
              <View>
                <View
                  style={
                    ID === item.id ? styles.driverListClick : styles.driverList
                  }>
                  <View style={styles.driverListTextLayout}>
                    <Text
                      style={
                        ID === item.id
                          ? styles.driverListClickText
                          : styles.driverListText
                      }>
                      {item.routeInfo.routeName} {item.name} 드라이버
                    </Text>
                  </View>
                  <View style={styles.driverListImageLayout}>
                    <Image source={Truck} style={styles.image} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* {ID === item.id && } */}
            <ManagerMap></ManagerMap>
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: SCREEN_HEIGHT / 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 10,
    shadowOpacity: 0.4,
  },
  headerText: {
    fontSize: 18,
  },
  headerClickText: {
    fontSize: 18,
    color: '#00BFFF',
    fontWeight: 'bold',
  },
  driverListLayout: {
    flex: 1,
  },
  driverList: {
    flex: 1,
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 15,
    marginHorizontal: 15,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  driverListClick: {
    flex: 1,
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 15,
    marginHorizontal: 15,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  driverListTextLayout: {
    flex: 1,
    alignItems: 'center',
  },
  driverListText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  driverListClickText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  driverListImageLayout: {
    felx: 1,
  },
  image: {
    resizeMode: 'stretch',
    width: 70,
    height: 50,
  },
  ScrollList: {
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  driverHeader: {
    height: SCREEN_HEIGHT / 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
  },
  driverHeaderText: {
    fontSize: 15,
  },
  driverHeaderClickText: {
    fontSize: 15,
    color: '#00BFFF',
    fontWeight: 'bold',
  },
  pickupListLayout: {
    flex: 1,
    marginHorizontal: 10,
  },
  pickupLayout: {
    height: SCREEN_HEIGHT / 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pickupRestaurantName: {
    flex: 3,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  pickupRestaurantNameText: {
    fontWeight: 'bold',
  },
  pickupOrderQuantityText: {
    color: 'red',
  },
  pickupTime: {
    flex: 1,
    alignItems: 'center',
  },
  pickupTimeText: {},
  pickupFinish: {
    flex: 2,
    alignItems: 'center',
  },
  pickupFinishText: {
    color: 'green',
    fontWeight: 'bold',
  },
  pickupFailText: {
    color: 'red',
  },
  deliveryListLayout: {
    flex: 1,
    marginHorizontal: 10,
  },
  deliveryLayout: {
    height: SCREEN_HEIGHT / 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deliveryLocationName: {
    flex: 3,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  deliveryLocationNameText: {
    fontWeight: 'bold',
  },
  deliveryQuantityText: {
    color: 'red',
  },
  deliveryTime: {
    flex: 1,
    alignItems: 'center',
  },
  deliveryTimeText: {},
  deliveryFinish: {
    flex: 2,
    alignItems: 'center',
  },
  deliveryFinishText: {
    color: 'green',
    fontWeight: 'bold',
  },
  deliveryFailText: {
    color: 'red',
  },

  //모달 css
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: identityColor,
  },
  textStyle: {
    color: identityTextColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalImage: {
    resizeMode: 'stretch',
    width: (SCREEN_WIDTH * 2) / 3,
    height: SCREEN_HEIGHT / 3,
    marginVertical: 10,
  },
});
