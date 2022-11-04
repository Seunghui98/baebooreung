import { useState } from "react";
import { View,Text,StyleSheet, TouchableOpacity, Dimensions, Image,FlatList, TouchableHighlight,Pressable } from "react-native";
import Truck from '../assets/truck.png'
const {height : SCREEN_HEIGHT, width : SCREEN_WIDTH} = Dimensions.get('window');

export default function DetailWork(props){
    const [tab, setTab] = useState();
    const driver = [{id : 1, region : props.region, regionName : props.regionName, name : "김싸피"},{id :2, region : props.region, regionName : props.regionName, name : "이싸피" },{id :3, region : props.region, regionName : props.regionName, name : "박싸피" },]
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.headerText}>드라이버 업무 현황</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.headerText}>드라이버 업무 변경</Text>
                </Pressable>
            </View>
            <FlatList
                style={styles.driverListLayout}
                data={driver}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <TouchableOpacity>
                        <View style={styles.driverList}>
                            <Text>{item.regionName} {item.name} 드라이버</Text>
                        </View>
                    </TouchableOpacity>
                }   
            > 
                
            </FlatList>
            <Image source={Truck} style={styles.image}/>
       </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
    },
    header : {
        height : SCREEN_HEIGHT/12,
        backgroundColor :'white',
        flexDirection :'row',
        alignItems :'center',
        justifyContent : 'space-around',
        shadowOffset : {width:0, height:1},
        shadowRadius :2,
        elevation :10, 
        shadowOpacity :0.4,
    },
    headerText : {
        fontSize : 18,
    },
    driverListLayout : {
        flex :1,

    },
    driverList : {

    },
    image : {
        resizeMode : 'stretch',
        width:70,
        height:50
    }
});
