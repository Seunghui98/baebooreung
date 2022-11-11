import {PermissionsAndroid} from 'react-native';

// Function to get permission for location
export const getLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      // {
      //   title: 'Cool Photo App Camera Permission',
      //   message:
      //     'Cool Photo App needs access to your camera ' +
      //     'so you can take awesome pictures.',
      //   buttonNeutral: 'Ask Me Later',
      //   buttonNegative: 'Cancel',
      //   buttonPositive: 'OK',
      // },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
