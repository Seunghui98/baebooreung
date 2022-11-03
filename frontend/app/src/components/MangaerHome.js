import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height : SCREEN_HEIGHT, width : SCREEN_WIDTH} = Dimensions.get('window');

function ManagerHome({navigation}){
    const user = { name : "최싸피", grade : "관리자" }
    //const user = useSelector((state) => state.user.value); //react-redux를 이용하여 user 정보 받을 예정
    const workList = [{region : 1, regionName : "광주과학기술원"},{region : 2, regionName : "전남대학교"},{region :3, regionName : "서울대학교"},{region :4, regionName : "연세대학교"},{region :5, regionName : "건국대학교"},{region :6, regionName : "경희대학교"}]
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Icon name="person" size={SCREEN_HEIGHT/8} color={'#F4FA58'}></Icon>
                <View style={styles.topTextLayout}>
                    <Text style={styles.topText}> {user.name} {user.grade}님 안녕하세요!</Text>
                </View>
            </View>

            <View style={styles.noticeLayout}>
                <View style={styles.notice}>
                    <Text style={styles.noticeText}>공지사항</Text>
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
                    renderItem={({item}) =>
                        <View style={styles.dailyWorkList}>
                        <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('DetailWork',{ headerTitle : `${item.regionName}`, region : item.region})
                        }}>
                        <Text style={styles.dailyWorkListText}>{item.regionName}</Text>
                        </TouchableOpacity>
                        </View>
                    }
                >
                </FlatList>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    top : {
        flexDirection : 'row',
        width : SCREEN_WIDTH,
        height : SCREEN_HEIGHT/8,
        backgroundColor :'#191970',
        shadowOffset : {width:0, height:1},
        shadowRadius :2,
        elevation :2, 
        shadowOpacity :0.4,
    },
    topTextLayout : {
        flex :1,
        alignItems : 'center',
        justifyContent : 'center',
        
    },
    topText : {
        fontSize : 22,
        fontWeight : 'bold',
        color : '#F4FA58'
    },
    noticeLayout : {
        height : SCREEN_HEIGHT/8,
        marginHorizontal : 15,
        marginVertical : 15,
    },
    notice : {
        flex : 1,
        marginHorizontal : 10,
        marginVertical :10,
        borderRadius : 15,
        backgroundColor : '#00BFFF',
        alignItems :'center',
        justifyContent :'center',
        shadowOffset : {width:0, height:1},
        shadowRadius :2,
        elevation :10, 
        shadowOpacity :0.4,
    },
    noticeText : {
        fontSize : 22,
        color : 'white',
        fontWeight :'bold'
    },
    dailyWorkLayout : {
        width : SCREEN_WIDTH,
        height : SCREEN_HEIGHT*5/8,
    },
    dailyWorkTitleTextLayout : {
        alignItems : 'center',
        justifyContent : 'center',

    },
    dailyWorkTitleText : {
        fontSize : 22,
        fontWeight :'bold'
    },
    dailyWork : {
        flex : 1,
        marginHorizontal : 10,
        marginVertical :10,
        borderRadius : 15,
    },
    dailyWorkListLayout : {
        marginHorizontal : 15,
        marginVertical : 15,
    },
    dailyWorkList : {
        height : SCREEN_HEIGHT/10,
        alignItems : 'center',
        justifyContent :'center',
        borderRadius : 20, 
        backgroundColor :'white',
        marginBottom :20,
        shadowOffset : {width:0, height:1},
        shadowRadius :2,
        elevation :10, 
        shadowOpacity :0.4,
    },
    dailyWorkListText : {
        fontSize : 22,
    }
});
export default ManagerHome;