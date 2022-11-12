import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useEffect} from 'react';
import {setUser} from '../redux/user';
import {setUserInfo} from '../redux/auth';
import {setUserList} from '../redux/userList';
import axios from 'axios';
import {user} from '../api/api';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const identityColor = '#0B0B3B';
const identityTextColor = '#FACC2E';
function ManagerHome({navigation}) {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  // const user = {name: '최싸피', grade: '관리자'};
  const userInfo = useSelector(state => state.user); //react-redux를 이용하여 user 정보 받을 예정
  const workList = [
    {region: 1, regionName: '광주과학기술원', driver: 2, total: 50, finish: 30},
    {region: 2, regionName: '전남대학교', driver: 2, total: 25, finish: 25},
    {region: 3, regionName: '서울대학교', driver: 5, total: 70, finish: 50},
    {region: 4, regionName: '연세대학교', driver: 3, total: 50, finish: 50},
    {region: 5, regionName: '건국대학교', driver: 3, total: 45, finish: 25},
    {region: 6, regionName: '경희대학교', driver: 2, total: 50, finish: 30},
  ];

  // useEffect(() => {
  //   //임시 로그인
  //   axios({
  //     method: 'post',
  //     url: user.login(),
  //     data: {
  //       email: 'ee@test.com',
  //       password: 'test1234',
  //     },
  //   })
  //     .then(res => {
  //       console.log(res.headers);
  //       const token = res.headers.token;
  //       dispatch(
  //         setUserInfo({
  //           id: res.headers.id,
  //           accessToken: res.headers.token,
  //           name: res.headers.name,
  //           specialkey: res.headers.specialkey,
  //         }),
  //       );
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  //       //로그인 성공 시 내 정보 추출하여 redux에 저장
  //       axios({
  //         method: 'get',
  //         url: user.getUserInfo() + `${res.headers.id}`,
  //       })
  //         .then(res => {
  //           console.log(res.data);
  //           dispatch(setUser(res.data));
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });

  //       //로그인 성공 시 내 연락처에 유저 정보 저장
  //       axios({
  //         metohd: 'get',
  //         url: user.getAllUser(),
  //       })
  //         .then(res => {
  //           console.log('All userList', res.data);
  //           dispatch(setUserList(res.data));
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="person"
          size={SCREEN_HEIGHT / 8}
          color={identityTextColor}></Icon>
        <View style={styles.topTextLayout}>
          {userInfo.grade === 'MANAGER' && (
            <Text style={styles.topText}> {userInfo.name} 관리자님</Text>
          )}
          {userInfo.grade === 'DRIVER' && (
            <Text style={styles.topText}> {userInfo.name} 드라이버님</Text>
          )}
        </View>
      </View>

      <View style={styles.dailyWorkLayout}>
        <View style={styles.dailyWorkTitleTextLayout}>
          <Text style={styles.dailyWorkTitleText}>업무현황</Text>
        </View>
        <View style={styles.dailyWork}>
          <FlatList
            style={styles.dailyWorkListLayout}
            data={workList}
            keyExtractor={item => item.region}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('DetailWork', {
                    headerTitle: `${item.regionName}`,
                    region: item.region,
                    driver: item.driver,
                    total: item.total,
                    finish: item.finish,
                  });
                }}>
                {({pressed}) => (
                  <View
                    style={
                      pressed ? styles.dailyWorkListClick : styles.dailyWorkList
                    }>
                    <View style={styles.dailWorkFirstLine}>
                      <View style={{flex: 1}}>
                        <Text style={styles.dailyWorkListText}>
                          {item.regionName}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        {item.total === item.finish && (
                          <Text style={styles.dailyWorkFinishText}>완료</Text>
                        )}
                        {item.total !== item.finish && (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <Text style={styles.dailyWorkText}>
                              {item.finish}{' '}
                            </Text>
                            <Text style={{fontWeight: 'bold'}}>
                              / {item.total}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <View>
                      <Text style={styles.driverNumText}>
                        드라이버 {item.driver}명
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
            )}></FlatList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 8,
    backgroundColor: identityColor,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  topTextLayout: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: identityTextColor,
  },
  dailyWorkLayout: {
    flex: 1,
  },
  dailyWorkTitleTextLayout: {
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingTop: 15,
    justifyContent: 'center',
  },
  dailyWorkTitleText: {
    fontSize: 20,
    fontWeight: '900',
  },
  dailyWork: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  dailyWorkListLayout: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  dailyWorkList: {
    flex: 1,
    height: SCREEN_HEIGHT / 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 1,
    shadowOpacity: 0.4,
  },
  dailyWorkListClick: {
    flex: 1,
    height: SCREEN_HEIGHT / 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(210, 230, 255)',
    marginBottom: 20,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 1,
    shadowOpacity: 0.4,
  },
  dailWorkFirstLine: {
    flex: 1,
    flexDirection: 'row',
  },
  dailyWorkListText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dailyWorkFinishText: {
    color: 'green',
  },
  dailyWorkText: {
    color: 'red',
  },
});
export default ManagerHome;
