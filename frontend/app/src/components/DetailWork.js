import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import Truck from '../assets/truck.png';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

export default function DetailWork(props) {
  const [tab, setTab] = useState(false);
  const [ID, setID] = useState(-1);
  const driver = [
    {id: 1, region: props.region, regionName: props.regionName, name: '김싸피'},
    {id: 2, region: props.region, regionName: props.regionName, name: '이싸피'},
    {id: 3, region: props.region, regionName: props.regionName, name: '박싸피'},
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
      pickup_finish: false,
      photo: '',
      order_quantity: 7,
    },
  ];

  const driverDeliveryWorkList = [
    {
      deliveryLocation_id: 1,
      deliveryLocation_name: '생활관 A동',
      delivery_time: '12:10',
      delivery_finish: false,
      delivery_quantity: 15,
    },
    {
      deliveryLocation_id: 2,
      deliveryLocation_name: '생활관 B동',
      delivery_time: '12:13',
      delivery_finish: false,
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            return setTab(false);
          }}>
          <Text style={tab ? styles.headerText : styles.headerClickText}>
            드라이버 업무 현황
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            return setTab(true);
          }}>
          <Text style={tab ? styles.headerClickText : styles.headerText}>
            드라이버 업무 변경
          </Text>
        </TouchableOpacity>
      </View>
      {tab === false && (
        <FlatList
          style={styles.driverListLayout}
          data={driver}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setID(item.id);
              }}>
              <View style={styles.driverList}>
                <View style={styles.driverListTextLayout}>
                  <Text style={styles.driverListText}>
                    {item.regionName} {item.name} 드라이버
                  </Text>
                </View>
                <View style={styles.driverListImageLayout}>
                  <Image source={Truck} style={styles.image} />
                </View>
              </View>
            </TouchableOpacity>
          )}></FlatList>
      )}
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
    marginVertical: 15,
    alignItems: 'center',
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
