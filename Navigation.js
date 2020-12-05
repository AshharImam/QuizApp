import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingPage from "./Screens/LandingPage/landingPage";
import SignUp from "./Screens/SignUp/Signup";

const Stack = createStackNavigator();

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"LandingPage"}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
