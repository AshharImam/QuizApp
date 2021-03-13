import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import queryString from "query-string";
import db from "../../config";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { widthToDp } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
// import {widthToDp, heightToDp} from "../../utils";

const { width, height } = Dimensions.get("window");

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      takenTestArray: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const doc = db
      .collection("users")
      .doc(Constants.installationId)
      .collection(`${this.props.route.params.demo}`)
      .orderBy("timeStamp", "desc")
      .get();
    doc.then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((data) => {
        // console.log(
        //   new Date(data.data().timeStamp.seconds * 1000).toDateString()
        // );
        if (data.data().array.length > 0) {
          temp.push(data.data());
        }
      });
      this.setState({
        takenTestArray: temp,
        isLoading: false,
      });
    });
  }

  render() {
    // console.log(this.state.expires_at);
    if (this.state.isLoading) {
      return (
        <ImageBackground
          source={require("../../assets/background.jpg")}
          style={{
            flex: 1,
            resizeMode: "cover",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size="large"
              color="red"
              style={{ alignSelf: "center" }}
            />
          </View>
        </ImageBackground>
      );
    }
    return (
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
          <StatusBar translucent={false} barStyle="light-content" />

          <View style={{}}>
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                alignItems: "center",
                marginVertical: 5,
                padding: 5,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  alignItems: "center",
                  textAlign: "center",
                  color: "white",
                  fontSize: 25,
                  padding: 10,
                }}
              >
                History
              </Text>
            </View>
            <ScrollView>
              {this.state.takenTestArray.map((i, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => {
                      console.log(i);
                      this.props.navigation.navigate("HistoryDisplayResult", {
                        correct: i.correct,
                        wrong: i.wrong,
                        unattempted: i.unattempted,
                        array: i.array,
                      });
                      // console.log("HISTORY")
                    }}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      padding: 3,
                      marginBottom: 5,

                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {new Date(i.timeStamp.seconds * 1000).toDateString()}
                    </Text>
                    <AntDesign
                      name="playcircleo"
                      size={20}
                      color="rgb(100,198,247)"
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
              marginVertical: 5,
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              position: "absolute",
              bottom: 10,
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text
              style={{
                fontSize: 26,
                marginVertical: 5,
                color: "rgb(100,198,247)",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default LandingPage;
