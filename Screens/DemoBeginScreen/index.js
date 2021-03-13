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
              flex: 1,
              alignItems: "center",
              width: "100%",
            }}
          >
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
                  color: "white",
                  // color: "rgb(100,198,247)",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                Free Test: Introduction
              </Text>
              <Text style={{ color: "white", fontSize: 22 }}>
                Test Duration
              </Text>
              <Text style={{ color: "red", fontSize: 40 }}>00:25:00</Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "5%",
                width: "100%",
                marginVertical: "1%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  // color: "rgb(100,198,247)",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Instructions
              </Text>
              <Text style={{ color: "white", fontSize: 20, marginVertical: 1 }}>
                -You have 1.2 minute per question.
              </Text>
              <Text style={{ color: "white", fontSize: 20, marginVertical: 1 }}>
                -Select the best answer per question.
              </Text>
              <Text style={{ color: "white", fontSize: 20, marginVertical: 1 }}>
                -Mark questions for review if you don't know the correct answer.
              </Text>
              <Text style={{ color: "white", fontSize: 20, marginVertical: 1 }}>
                -Just like the real exam, feel free to mark questions for
                review. Save tests in progress and resume at a later time.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("DemoQuestions")}
            style={{
              marginVertical: "1%",
              backgroundColor: "rgba(0,0,0,0.4)",
              padding: "2%",
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "rgb(100,198,247)",
                fontSize: 30,
              }}
            >
              Begin
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({});
