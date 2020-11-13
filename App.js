import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation'
import LandingPage from './Screens/LandingPage/landingPage';
import Questions from './Screens/DisplayQuestion/Questions';
import SignUp from './Screens/SignUp/Signup';
import DemoQuestions from './Screens/DemoQuestions/DemoQuestions';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from  '@react-navigation/stack';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import Result from './Screens/DisplayResult/Result';

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator headerMode='none' initialRouteName={"LandingPage"}>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="DemoQuestions" component={DemoQuestions} />
            <Stack.Screen name='Questions' component={Questions} />
            <Stack.Screen name='Result' component={Result} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
