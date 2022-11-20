import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  SafeAreaView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import * as encoding from 'text-encoding';
import {
  NavigationContainer,
  NavigationContainerRefContext,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';

// <-- manager App pages-->
import HomeScreen from './src/pages/managerApp/HomeScreen';
import GPSScreen from './src/pages/managerApp/GPSScreen';
import MessageScreen from './src/pages/managerApp/MessageScreen';
import DetailWorkScreen from './src/pages/managerApp/DetailWorkScreen';
import STTScreen from './src/pages/managerApp/STTScreen';
import DetailGPSScreen from './src/pages/managerApp/DetailGPSScreen';

// <-- driver App pages -->
import HomePage from './src/pages/driverApp/HomePage';
import LoginPage from './src/pages/driverApp/LoginPage';
import SignUpPage from './src/pages/driverApp/SignUpPage';
import DetailRoutePage from './src/pages/driverApp/DetaliRoutePage';
import Cam from './src/components/Cam';

// <-- firebase -->
import {
  requestUserPermission,
  NotificationListener,
} from './src/components/push';
// <-- ignore warning box -->
import {LogBox} from 'react-native';

console.disableYellowBox = true;
LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const identityColor = '#0B0B3B';
const identityTextColor = '#FACC2E';

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="DetailWork"
        component={DetailWorkScreen}
        options={{
          headerStyle: {
            backgroundColor: identityColor,
          },
          headerTitleAlign: 'center',
          headerTintColor: identityTextColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

function GPSStack() {
  return (
    <Stack.Navigator initialRouteName="GPSHome">
      <Stack.Screen
        name="GPSHome"
        component={GPSScreen}
        options={{
          title: '드라이버 위치확인',
          headerStyle: {
            backgroundColor: identityColor,
          },
          headerTitleAlign: 'center',
          headerTintColor: identityTextColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailGPS"
        component={DetailGPSScreen}
        options={{
          headerStyle: {
            backgroundColor: identityColor,
          },
          headerTitleAlign: 'center',
          headerTintColor: identityTextColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

function ManagerTab() {
  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: '메세지',
          headerStyle: {
            backgroundColor: identityColor,
          },
          headerTitleAlign: 'center',
          headerTintColor: identityTextColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="chat" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="GPS"
        component={GPSStack}
        options={{
          title: '실시간위치',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="gps-fixed" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
      {/* <Tab.Screen
        name="STT"
        component={STTScreen}
        options={{
          title: '음성인식',
          headerStyle: {
            backgroundColor: identityColor,
          },
          headerTitleAlign: 'center',
          headerTintColor: identityTextColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="mic" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen> */}
    </Tab.Navigator>
  );
}

function DriverTab() {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#29b6f6',
          },
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: '메세지',
          headerStyle: {
            backgroundColor: identityColor,
          },
          headerTitleAlign: 'center',
          headerTintColor: identityTextColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="chat" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Detail"
        component={DetailRoutePage}
        options={{
          title: '업무',
          headerStyle: {
            backgroundColor: '#29b6f6',
          },
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="directions-car" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}
export default function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{
                title: 'LoginPage',
                headerStyle: {
                  backgroundColor: '#29b6f6',
                },
                headerShown: false,
              }}></Stack.Screen>
            <Stack.Screen
              name="Signup"
              component={SignUpPage}
              options={{
                title: 'SignUpPage',
                headerStyle: {
                  backgroundColor: '#29b6f6',
                },
                headerShown: false,
              }}></Stack.Screen>
            <Stack.Screen
              name="ManagerTab"
              component={ManagerTab}
              options={{
                headerShown: false,
              }}></Stack.Screen>
            <Stack.Screen
              name="DriverTab"
              component={DriverTab}
              options={{
                headerShown: false,
              }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
