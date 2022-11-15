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
// import ManagerMap from './ManagerMap';
import axios from 'axios';
import {gps_service} from '../api/api';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const identityColor = '#0B0B3B';
const identityTextColor = '#F7FE2E';

export default function DetailGPS(props) {
  const userList = useSelector(state => state.userList.userList);
  const [ok, setOk] = useState(false);
  const [ID, setID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [location, setLocation] = useState({
    latitude: 35.2028,
    longitude: 126.8091,
  });

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
    // if (driverList.length !== 0) {
    //   driverList.map((item, idx) => {
    //   });
    // }
  }, [ok]);

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{width: '100%', height: '70%'}}
        center={{...location, zoom: 16}}>
        <Marker coordinate={location} pinColor="red" />
      </NaverMapView>

      <FlatList
        style={styles.driverListLayout}
        data={driverList}
        keyExtractor={(item, idx) => idx}
        renderItem={({item}) => (
          <View>
            {item.routeInfo.routeName === props.routeName && (
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (ID !== item.id) {
                      setID(item.id);
                      axios({
                        method: 'get',
                        url: gps_service.getRealTimeGPS() + `${item.id}`,
                      })
                        .then(res => {
                          // console.log('gps 정보 출력', res.data);
                          const latitude = parseFloat(res.data.latitude);
                          const longitude = parseFloat(res.data.longitude);
                          setLocation({
                            latitude: latitude,
                            longitude: longitude,
                          });
                        })
                        .catch(e => {
                          console.log(e);
                        });
                    }
                  }}>
                  <View>
                    <View
                      style={
                        ID === item.id
                          ? styles.driverListClick
                          : styles.driverList
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
              </View>
            )}
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
