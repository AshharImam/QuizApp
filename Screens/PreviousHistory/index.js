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
// import {widthToDp, heightToDp} from "../../utils";

const { width, height } = Dimensions.get("window");

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      takenTestArray: [],
    };
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    const doc = db
      .collection("users")
      .doc(Constants.installationId)
      .collection(`${this.props.route.params.demo}`)
      .orderBy("timeStamp")
      .get();
    doc.then((querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((data) => {
        // console.log(
        //   new Date(data.data().timeStamp.seconds * 1000).toDateString()
        // );
        temp.push(data.data());
      });
      this.setState({
        takenTestArray: temp,
      });
    });
  }

  render() {
    // console.log(this.state.expires_at);
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
            {this.state.takenTestArray.map((i, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() =>
                    // this.props.navigation.navigate("PremiumQuestionSet")
                    console.log("HISTORY")
                  }
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
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default LandingPage;
