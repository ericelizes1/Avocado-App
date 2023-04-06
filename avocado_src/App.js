import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './App/HomeScreen';
import DiscoverScreen from './App/DiscoverScreen';
import NotificationsScreen from './App/NotificationsScreen';
import ProfileScreen from './App/ProfileScreen';

//Headers
import HomeHeader from './App/HomeScreen/HomeHeader';
import DiscoverHeader from './App/DiscoverScreen/DiscoverHeader';
import NotificationsHeader from './App/NotificationsScreen/NotificationsHeader';
import ProfileHeader from './App/ProfileScreen/ProfileHeader';
import LoginScreen from './App/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LoginScreen} options={{ header: () => <HomeHeader /> }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  }
});
