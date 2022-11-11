import NaverMapView, {Marker} from 'react-native-nmap';
import {StyleSheet} from 'react-native';
const Map = props => {
  const position = {
    latitude: props.coords.latitude,
    longitude: props.coords.longitude,
  };
  return (
    <NaverMapView
      center={{...position, zoom: 16}}
      style={{
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
      }}>
      <Marker coordinate={props.coords} />
    </NaverMapView>
  );
};

export default Map;
