import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const index = (props) => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      }}
    >
      <StatusBar translucent={false} barStyle="light-content" />
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
              padding: "5%",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "rgb(100,198,247)",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Free Test
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("DemoBeginScreen")}
            style={{
              marginVertical: "1%",
              backgroundColor: "rgba(0,0,0,0.4)",
              padding: "2%",
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Free Test</Text>

            <View>
              <Text style={{ color: "green" }}>Free</Text>
              <Text style={{ color: "rgb(100,198,247)" }}>20 Questions</Text>
            </View>
            {/* <AntDesign name="playcircleo" size={24}  /> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({});
