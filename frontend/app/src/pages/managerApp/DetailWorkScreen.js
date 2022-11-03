import { useEffect } from 'react';
import {Text, View,StyleSheet} from 'react-native';
import DetailWork from '../../components/DetailWork';

function DetailWorkScreen(props){
    console.log(props)
    useEffect(()=>{
        const headerTitle = props.route.params.headerTitle;
        props.navigation.setOptions({headerTitle : headerTitle});
    },[])
    return(
        <View style={styles.container}>
            <DetailWork 
                regionName={props.route.params.headerTitle} 
                region={props.route.params.region}
                driver={props.route.params.driver}
                total={props.route.params.total}
                finsih={props.route.params.finish}
            ></DetailWork>
        </View>

    )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
    }
});



export default DetailWorkScreen;