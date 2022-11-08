import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import * as encoding from 'text-encoding';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// <-- manager App pages-->
import HomeScreen from './src/pages/managerApp/HomeScreen';
import GPSScreen from './src/pages/managerApp/GPSScreen';
import MessageScreen from './src/pages/managerApp/MessageScreen';
import DetailWorkScreen from './src/pages/managerApp/DetailWorkScreen';
import STTScreen from './src/pages/managerApp/STTScreen';

// <-- driver App pages -->
import DetailWork from './src/pages/driverApp/DetailWork';
import MainScreen from './src/pages/driverApp/MainScreen';
import TestMap from './src/pages/driverApp/TestMap';
import Login from './src/pages/driverApp/Login';
import SignUp from './src/pages/driverApp/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const identityColor = '#0B0B3B';
const identityTextColor = '#FACC2E';
const isManager = true;

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
      <Stack.Screen
        name="Gps"
        component={DetailWork}
        options={{
          headerStyle: {
            backgroundColor: '#29b6f6',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          {isManager ? (
            // <-- manager 로그인 시-->
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
                name=""
                component={GPSScreen}
                options={{
                  title: '실시간위치',
                  headerStyle: {
                    backgroundColor: identityColor,
                  },
                  headerTitleAlign: 'center',
                  headerTintColor: identityTextColor,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  tabBarIcon: ({color, size}) => (
                    <Icon name="gps-fixed" color={color} size={size}></Icon>
                  ),
                }}></Tab.Screen>
              <Tab.Screen
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
                }}></Tab.Screen>
            </Tab.Navigator>
          ) : (
            // <-- driver 로그인 시-->
            <Tab.Navigator initialRouteName="home">
              <Tab.Screen
                name="DetailWork"
                component={DetailWork}
                options={{
                  title: 'DetailWork',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerShown: false,
                }}></Tab.Screen>
              <Tab.Screen
                name="home"
                component={MainScreen}
                options={{
                  title: 'Home',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerShown: false,
                }}></Tab.Screen>
              <Tab.Screen
                name="TestMap"
                component={TestMap}
                options={{
                  title: 'naver',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },

                  headerShown: false,
                }}></Tab.Screen>
              <Tab.Screen
                name="Login"
                component={Login}
                options={{
                  title: 'Login',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerShown: false,
                }}></Tab.Screen>
              <Tab.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: 'SignUp',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerShown: false,
                }}></Tab.Screen>
            </Tab.Navigator>
          )}
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
