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
import HomeScreen from './src/pages/HomeScreen';
import MyPageScreen from './src/pages/MyPageScreen';
import GPSScreen from './src/pages/GPSScreen';
import MessageScreen from './src/pages/MessageScreen';
import DetailWorkScreen from './src/pages/DetailWorkScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Provider} from 'react-redux';
import store from './src/redux/store';

// <-- driver App pages -->
import DetailPage from './src/pages/driverApp/DetailPage';
import HomePage from './src/pages/driverApp/HomePage';
import TestMap from './src/pages/driverApp/TestMap';
import LoginPage from './src/pages/driverApp/LoginPage';
import SignUpPage from './src/pages/driverApp/SignUpPage';
import Test from './src/pages/driverApp/Test';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const isManager = false;

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
            backgroundColor: '#29b6f6',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="Gps"
        component={Gps}
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
                    backgroundColor: '#29b6f6',
                  },
                  headerTitleAlign: 'center',
                  headerTintColor: '#ffffff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  tabBarIcon: ({color, size}) => (
                    <Icon name="chat" color={color} size={size}></Icon>
                  ),
                }}></Tab.Screen>
              <Tab.Screen
                name="GPS"
                component={GPSScreen}
                options={{
                  title: '실시간위치',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerTitleAlign: 'center',
                  headerTintColor: '#ffffff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  tabBarIcon: ({color, size}) => (
                    <Icon name="gps-fixed" color={color} size={size}></Icon>
                  ),
                }}></Tab.Screen>
              <Tab.Screen
                name="MyPage"
                component={MyPageScreen}
                options={{
                  title: '마이페이지',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerTitleAlign: 'center',
                  headerTintColor: '#ffffff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  tabBarIcon: ({color, size}) => (
                    <Icon name="person" color={color} size={size}></Icon>
                  ),
                }}></Tab.Screen>
            </Tab.Navigator>
          ) : (
            // <-- driver 로그인 시-->
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
                }}></Tab.Screen>
              <Tab.Screen
                name="Detail"
                component={DetailPage}
                options={{
                  title: 'Detail',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerShown: false,
                }}></Tab.Screen>
              <Tab.Screen
                name="Test"
                component={Test}
                options={{
                  title: 'Test',
                  headerStyle: {
                    backgroundColor: '#29b6f6',
                  },
                  headerShown: false,
                }}></Tab.Screen>
              <Tab.Screen
                name="login"
                component={LoginPage}
                options={{
                  title: 'LoginPage',
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
