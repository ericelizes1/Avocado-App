import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Header, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './App/BottomTabNavigator/HomeScreen';
import DiscoverScreen from './App/BottomTabNavigator/DiscoverScreen';
import NotificationsScreen from './App/BottomTabNavigator/NotificationsScreen';
import ProfileScreen from './App/ProfileScreen';
import LoginScreen from './App/LoginScreen';


//Headers
import HomeHeader from './App/BottomTabNavigator/HomeScreen/HomeHeader';
import DiscoverHeader from './App/BottomTabNavigator/DiscoverScreen/DiscoverHeader';
import NotificationsHeader from './App/BottomTabNavigator/NotificationsScreen/NotificationsHeader';
import ProfileHeader from './App/BottomTabNavigator/ProfileScreen/ProfileHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Main" component={MainScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
          }}
      >
        <Tab.Screen
          name="Login"
          component={HomeScreen}
          options={{
            header: () => <HomeHeader/>,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <MaterialCommunityIcons name="home" color='black' size={30} />
              ) : (
                <MaterialCommunityIcons name="home-outline" color='black' size={30} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            header: () => <DiscoverHeader/>,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <MaterialCommunityIcons name="compass" color='black' size={30} />
              ) : (
                <MaterialCommunityIcons name="compass-outline" color='black' size={30} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            header: () => <NotificationsHeader/>,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <MaterialCommunityIcons name="bell" color='black' size={30} />
              ) : (
                <MaterialCommunityIcons name="bell-outline" color='black' size={30} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            header: () => <Header
              placement="center"
              centerComponent={<ProfileHeader/>}
              containerStyle={styles.header}
            />,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <MaterialCommunityIcons name="account" color='black' size={30} />
              ) : (
                <MaterialCommunityIcons name="account-outline" color='black' size={30} />
              );
            },
          }}
        />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: 'red', 
    justifyContent: 'center', 
    height: 100, 
    alignContent: 'center', 
    width: '100%'
  },
});
