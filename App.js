import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import screens

import Start from './components/Start';
import Chat from './components/Chat';

// import react native gesture handler

import 'react-native-gesture-handler';

// import react Navigation

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create navigator

const Stack = createStackNavigator();
export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator

// load screen

          initialRouteName="Start"
        >
          <Stack.Screen

// start screen

            name="Start"
            component={Start}
          />
          <Stack.Screen

// chat screen

            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
