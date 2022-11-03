import { useState } from "react";
import { View,Text,StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import Truck from '../assets/truck.png'
const {height : SCREEN_HEIGHT, width : SCREEN_WIDTH} = Dimensions.get('window');

export default function DetailWork(props){
    console.log(props);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.headerText}>드라이버 업무 현황</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.headerText}>드라이버 업무 변경</Text>
                </TouchableOpacity>
            </View>
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
    image : {
        resizeMode : 'stretch',
        width:70,
        height:50
    }
});
