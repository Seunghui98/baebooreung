import { useEffect } from 'react';
import {Text, View,StyleSheet} from 'react-native';
import DetailWork from '../../components/DetailWork';

function DetailWorkScreen(props){
    useEffect(()=>{
        const headerTitle = props.route.params.headerTitle;
        props.navigation.setOptions({headerTitle : headerTitle});
    },[])
    return(
        <View style={styles.container}>
            <DetailWork regionName={props.route.params.headerTitle} region={props.route.params.region}></DetailWork>
        </View>

    )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
    }
});



export default DetailWorkScreen;