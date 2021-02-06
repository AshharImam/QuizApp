import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation";
import LandingPage from "./Screens/LandingPage/landingPage";
import Questions from "./Screens/DisplayQuestion/Questions";
import SignUp from "./Screens/SignUp/Signup";
import DemoQuestions from "./Screens/DemoQuestions/DemoQuestions";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import app from "firebase/app";
// import { firebaseConfig } from "./config";
import Result from "./Screens/DisplayResult/Result";
import PremiumQuestionSet from "./Screens/PremiumQuestionSet/PremiumQuestions";
import PremiumQuestionTest from "./Screens/PremiumQuestionTest";
import PaymentScreen from "./Screens/PaymentScreen";
import FreeTestScreen from "./Screens/FreeTestScreen";
import DemoBeginScreen from "./Screens/DemoBeginScreen";
import PremiumBeginScreen from "./Screens/PremiumBeginScreen";
import ReviewQuestions from "./Screens/ReviewQuestions/ReviewQuestions";
import PreviousHistory from "./Screens/PreviousHistory";

// app.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  // return <FreeTestScreen />;
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={"LandingPage"}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="DemoQuestions" component={DemoQuestions} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen
          name="PremiumQuestionSet"
          component={PremiumQuestionSet}
        />
        <Stack.Screen name="ReviewQuestions" component={ReviewQuestions} />
        <Stack.Screen name="FreeTestScreen" component={FreeTestScreen} />
        <Stack.Screen name="DemoBeginScreen" component={DemoBeginScreen} />
        <Stack.Screen
          name="PremiumBeginScreen"
          component={PremiumBeginScreen}
        />
        <Stack.Screen
          name="PremiumQuestionTest"
          component={PremiumQuestionTest}
        />
        <Stack.Screen name="PreviousHistory" component={PreviousHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
