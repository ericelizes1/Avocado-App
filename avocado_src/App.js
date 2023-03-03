import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <Header
              placement="center"
              centerComponent={<HomeHeader/>}
              containerStyle={styles.header}
            />
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            header: () => <Header
              placement="center"
              centerComponent={<DiscoverHeader/>}
              containerStyle={styles.header}
            />
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            header: () => <Header
              placement="center"
              centerComponent={<NotificationsHeader/>}
              containerStyle={styles.header}
            />
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
            />
          }}
        />
      </Tab.Navigator>
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
