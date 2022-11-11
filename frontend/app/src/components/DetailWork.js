import {useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Truck from '../assets/images/truck.png';
import Sample from '../assets/images/sample.png';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const identityColor = '#0B0B3B';
const identityTextColor = '#F7FE2E';

export default function DetailWork(props) {
  // const [tab,setTab]=useState(false); // 드라이버업무현황 / 드라이버업무변경 분기처리
  const [workType, setWorkType] = useState(false); // 픽업장소 / 수령장소 분기처리
  const [ID, setID] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const driver = [
    {id: 1, region: props.region, regionName: props.regionName, name: '김싸피'},
    {id: 2, region: props.region, regionName: props.regionName, name: '이싸피'},
    {id: 3, region: props.region, regionName: props.regionName, name: '박싸피'},
    {id: 4, region: props.region, regionName: props.regionName, name: '최싸피'},
    {id: 5, region: props.region, regionName: props.regionName, name: '전싸피'},
    {id: 6, region: props.region, regionName: props.regionName, name: '남싸피'},
    {id: 7, region: props.region, regionName: props.regionName, name: '강싸피'},
    {id: 8, region: props.region, regionName: props.regionName, name: '안싸피'},
    {id: 9, region: props.region, regionName: props.regionName, name: '나싸피'},
  ];

  const driverPickupWorkList = [
    {
      restaurant_id: 1,
      restaurant_name: '한솥도시락',
      pickup_time: '11:20',
      pickup_finish: true,
      photo: '',
      order_quantity: 15,
    },
    {
      restaurant_id: 2,
      restaurant_name: '봉구스밥버거',
      pickup_time: '11:25',
      pickup_finish: true,
      photo: '',
      order_quantity: 20,
    },
    {
      restaurant_id: 3,
      restaurant_name: '김밥나라',
      pickup_time: '11:30',
      pickup_finish: true,
      photo: '',
      order_quantity: 18,
    },
    {
      restaurant_id: 4,
      restaurant_name: '덮덮밥',
      pickup_time: '11:35',
      pickup_finish: true,
      photo: '',
      order_quantity: 7,
    },
  ];

  const driverDeliveryWorkList = [
    {
      deliveryLocation_id: 1,
      deliveryLocation_name: '생활관 A동',
      delivery_time: '12:10',
      delivery_finish: true,
      delivery_quantity: 15,
    },
    {
      deliveryLocation_id: 2,
      deliveryLocation_name: '생활관 B동',
      delivery_time: '12:13',
      delivery_finish: true,
      delivery_quantity: 10,
    },
    {
      deliveryLocation_id: 3,
      deliveryLocation_name: '생활관 C동',
      delivery_time: '12:17',
      delivery_finish: false,
      delivery_quantity: 5,
    },
    {
      deliveryLocation_id: 4,
      deliveryLocation_name: '생활관 D동',
      delivery_time: '12:20',
      delivery_finish: false,
      delivery_quantity: 12,
    },
  ];

  return (
    <View style={styles.container}>
      {/* // 헤더(드라이버 업무현황 / 드라이버 업무변경)
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setID(-1);
          }}>
          <Text style={tab ? styles.headerText : styles.headerClickText}>
            드라이버 업무 현황
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setTab(true);
            setID(-1);
          }}>
          <Text style={tab ? styles.headerClickText : styles.headerText}>
            드라이버 업무 변경
          </Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        style={styles.driverListLayout}
        data={driver}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                if (ID !== item.id) {
                  setID(item.id);
                  setWorkType(false);
                } else {
                  setID(-1);
                  setWorkType(false);
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
                      {item.regionName} {item.name} 드라이버
                    </Text>
                  </View>
                  <View style={styles.driverListImageLayout}>
                    <Image source={Truck} style={styles.image} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {ID === item.id && (
              <View style={styles.ScrollList}>
                <View style={styles.driverHeader}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      return setWorkType(false);
                    }}>
                    <Text
                      style={
                        workType
                          ? styles.driverHeaderText
                          : styles.driverHeaderClickText
                      }>
                      픽업 장소
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      return setWorkType(true);
                    }}>
                    <Text
                      style={
                        workType
                          ? styles.driverHeaderClickText
                          : styles.driverHeaderText
                      }>
                      수령 장소
                    </Text>
                  </TouchableOpacity>
                </View>
                {workType === false && (
                  <FlatList
                    style={styles.pickupListLayout}
                    data={driverPickupWorkList}
                    keyExtractor={item => item.restaurant_id}
                    renderItem={({item}) => (
                      <View style={styles.pickupLayout}>
                        <View style={styles.pickupRestaurantName}>
                          <Text style={styles.pickupRestaurantNameText}>
                            {item.restaurant_name}
                          </Text>
                          <Text style={styles.pickupOrderQuantityText}>
                            {item.order_quantity}건
                          </Text>
                        </View>
                        <View style={styles.pickupTime}>
                          <Text style={styles.pickupTimeText}>
                            {item.pickup_time}
                          </Text>
                        </View>
                        <View style={styles.pickupFinish}>
                          {item.pickup_finish === true && (
                            <Pressable
                              onPress={() => {
                                setModalVisible(!modalVisible);
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={styles.pickupFinishText}>
                                  픽업 완료
                                </Text>
                                <Icon name="image-search" size={18}></Icon>
                              </View>
                            </Pressable>
                          )}
                          {item.pickup_finish === false && (
                            <Text style={styles.pickupFailText}>미완료</Text>
                          )}
                        </View>
                      </View>
                    )}></FlatList>
                )}

                {workType === true && (
                  <FlatList
                    style={styles.deliveryListLayout}
                    data={driverDeliveryWorkList}
                    keyExtractor={item => item.deliveryLocation_id}
                    renderItem={({item}) => (
                      <View style={styles.deliveryLayout}>
                        <View style={styles.deliveryLocationName}>
                          <Text style={styles.deliveryLocationNameText}>
                            {item.deliveryLocation_name}
                          </Text>
                          <Text style={styles.deliveryQuantityText}>
                            {item.delivery_quantity}건
                          </Text>
                        </View>
                        <View style={styles.deliveryTime}>
                          <Text style={styles.deliveryTimeText}>
                            {item.delivery_time}
                          </Text>
                        </View>
                        <View style={styles.deliveryFinish}>
                          {item.delivery_finish === true && (
                            <Pressable
                              onPress={() => {
                                setModalVisible(!modalVisible);
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={styles.deliveryFinishText}>
                                  수령 완료
                                </Text>
                                <Icon name="image-search" size={18}></Icon>
                              </View>
                            </Pressable>
                          )}
                          {item.delivery_finish === false && (
                            <Text style={styles.deliveryFailText}>미완료</Text>
                          )}
                        </View>
                      </View>
                    )}></FlatList>
                )}
              </View>
            )}
          </View>
        )}></FlatList>

      {/* 이미지 모달창 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text></Text>
            <View style={{alignItems: 'center'}}>
              <Image source={Sample} style={styles.modalImage} />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
