import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Header, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';

// Screens
import HomeScreen from './App/BottomTabNavigator/HomeScreen';
import DiscoverScreen from './App/BottomTabNavigator/DiscoverScreen';
import NotificationsScreen from './App/BottomTabNavigator/NotificationsScreen';
import ProfileScreen from './App/BottomTabNavigator/ProfileScreen';
import LoginScreen from './App/LoginScreen';
import RegisterScreen from './App/RegisterScreen';

// Components
import AddReviewScreen from './App/BottomTabNavigator/AddReviewScreen';
import EditProfileScreen from './App/BottomTabNavigator/EditProfileScreen';
import OtherUserProfileScreen from './App/BottomTabNavigator/OtherUserProfileScreen';


//Headers
import HomeHeader from './App/BottomTabNavigator/HomeScreen/HomeHeader';
import NotificationsHeader from './App/BottomTabNavigator/NotificationsScreen/NotificationsHeader';
import ProfileHeader from './App/BottomTabNavigator/ProfileScreen/ProfileHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          gestureDirection: 'vertical',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Main" component={MainScreen}/>
        <Stack.Screen
          name="AddReview"
          component={AddReviewScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            }),
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
        />   
        <Stack.Screen
          name="OtherUserProfile"         
          component={OtherUserProfileScreen}
        />            
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{  
        "tabBarShowLabel": false,
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
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
            header: () => null,
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
            header: () => <ProfileHeader/>,
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
