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
    this.formatDateTime = this.formatDateTime.bind(this);
    this.navigateToPaymentScreen = this.navigateToPaymentScreen.bind(this);

    this.state = {
      url: "",
      disable: false,
      expires_at: null,
      data: null,
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
    const doc = db.collection("users").doc(Constants.installationId).get();

    const data = this.getData();
    data.then((i) => {
      console.log("ASYNC DATA", new Date(i.expires_at));
      if (i && i.expires_at) {
        const date = new Date();
        const expiryDate = new Date(i.expires_at);

        console.log(expiryDate);
        // console.log(new Date(i?.expires_at.seconds * 1000));
        // console.log(expiryDate.getTime());
        // console.log(this.isExpired(date.getTime(), expiryDate?.getTime()));
        if (this.isExpired(date.getTime(), expiryDate?.getTime())) {
          this.setState({
            expires_at: `You Subscription Has Expired!`,
          });
          console.log("Expired");
        } else {
          console.log("Expiring");

          this.setState({
            expires_at: `You Subscription Expires at ${expiryDate.toDateString()}`,
            data: i,
          });
        }
      }
    });
    if (doc && !this.state.data) {
      doc.then((data) => {
        // console.log("DATA>>>", data);
        // console.log(">>>", data.data().expires_at);
        if (data.data() && data.data().expires_at) {
          const date = new Date();
          const expiryDate = new Date(data.data()?.expires_at.seconds * 1000);

          // console.log(date.getTime());
          // console.log(new Date(data.data()?.expires_at.seconds * 1000));
          // console.log(expiryDate.getTime());
          // console.log(this.isExpired(date.getTime(), expiryDate?.getTime()));
          if (this.isExpired(date.getTime(), expiryDate?.getTime())) {
            this.setState({
              expires_at: `You Subscription Has Expired!`,
            });
          } else {
            // console.log("Expiring");
            this.setState({
              expires_at: `You Subscription Expires at ${new Date(
                data.data().expires_at.seconds * 1000
              ).toDateString()}`,
            });
          }
        }
      });
    }
  }

  isExpired(date, expiry) {
    // console.log(date, expiry);
    return expiry ? date > expiry : true;
  }

  formatDateTime(date) {
    const _date = date.getDate();
    const _month = date.getMonth() + 1;
    const _year = date.getFullYear();
    const _hour = date.getHours();
    const _minute = date.getMinutes();
    const _seconds = date.getSeconds();
    return `${_year}${_month < 10 ? "0" + _month : _month}${
      _date < 10 ? "0" + _date : _date
    }${_hour < 10 ? "0" + _hour : _hour}${
      _minute < 10 ? "0" + _minute : _minute
    }${_seconds < 10 ? "0" + _seconds : _seconds}`;
  }

  payment() {
    console.log(Constants.installationId);
    this.setState({
      disable: true,
    });
    console.log(this.state.data);
    const doc = db.collection("users").doc(Constants.installationId).get();

    if (this.state.data && this.state.data.expires_at) {
      const date = new Date();

      const expiryDate = new Date(this.state.data.expires_at);
      // console.log(expiryDate);
      if (
        this.state.data &&
        this.state.data.completed_at &&
        !this.isExpired(date.getTime(), expiryDate?.getTime())
      ) {
        console.log("EXPIRY>>", expiryDate);
        this.props.navigation.navigate("PremiumQuestionSet");
      } else {
        this.navigateToPaymentScreen();
      }
    } else if (doc) {
      doc.then((data) => {
        console.log(">>>", data?.data()?.completed_at);
        const date = new Date();

        const expiryDate = new Date(data?.data()?.expires_at?.seconds * 1000);
        // console.log(expiryDate);
        if (
          data.data() &&
          data.data().completed_at &&
          !this.isExpired(date.getTime(), expiryDate?.getTime())
        ) {
          this.props.navigation.navigate("PremiumQuestionSet");
        } else {
          this.navigateToPaymentScreen();
        }
      });
    } else {
      this.navigateToPaymentScreen();
    }

    this.setState({
      disable: false,
    });
  }

  navigateToPaymentScreen() {
    fetch("https://sandbox.api.getsafepay.com/order/v1/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: "sec_0400d1f7-542e-4af3-81ac-6c588b7a79df",
        amount: 1.0,
        currency: "PKR",
        environment: "sandbox",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        db.collection("users")
          .doc(Constants.installationId)
          .set({
            token: json["data"]["token"],
            order_id: `T${this.formatDateTime(new Date())}`,
            started_at: new Date(),
          });
        const params = {
          env: "sandbox",
          beacon: json["data"]["token"],
          order_id: `T${this.formatDateTime(new Date())}`,
          source: "mobile",
        };

        const qs = queryString.stringify(params);
        const baseURL =
          process.env.ENVIRONMENT === "PRODUCTION"
            ? "https://api.getsafepay.com/components"
            : "https://sandbox.api.getsafepay.com/components";
        const url = `${baseURL}?${qs}`;
        // console.log("url>>", url);
        this.props.navigation.navigate("PaymentScreen", {
          url: url,
        });
        this.setState({
          disable: false,
        });
        // console.log(json["data"]["token"]);
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          disable: false,
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "12%",
            }}
          >
            <Image
              source={require("./logo.png")}
              resizeMode="center"
              style={{ height: 70 }}
            />
          </View>

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
                }}
              >
                The Quiz App
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 10,
                }}
              >
                with love : Wayne Managment Institue
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FreeTestScreen")}
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                flexDirection: "row",
                padding: 3,
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Free test</Text>
              <AntDesign
                name="playcircleo"
                size={20}
                color="rgb(100,198,247)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
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
                Test by knowledge area
              </Text>
              <AntDesign
                name="playcircleo"
                size={20}
                color="rgb(100,198,247)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("PremiumQuestionSet")
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
              <Text style={{ color: "white", fontSize: 18 }}>Full test</Text>
              <AntDesign
                name="playcircleo"
                size={20}
                color="rgb(100,198,247)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
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
                Package for just $50 (save 45$)
              </Text>
              <AntDesign
                name="playcircleo"
                size={20}
                color="rgb(100,198,247)"
              />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
                // backgroundColor: "red",
                // height: "100%",
                // height: "50%",
              }}
            >
              <Text
                style={{
                  color: "rgb(100,198,247)",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Student Reviews!
              </Text>
              <Image
                source={require("./logo.png")}
                style={{ resizeMode: "center", height: 40, margin: 5 }}

                // style={{ resizeMode: "center" }}
              />
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginVertical: 5,
                }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    console.log("HERE");
                    await WebBrowser.openBrowserAsync(
                      "https://m.facebook.com/wmifan/"
                    );
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../assets/facebook.png")}
                      style={{
                        resizeMode: "center",
                        width: 30,
                        height: 30,
                      }}

                      // style={{ resizeMode: "center" }}
                    />
                    <Text style={{ color: "#fff", fontSize: 15 }}>
                      Facebook
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 40,
                    width: 1,
                    backgroundColor: "white",
                  }}
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPress={async () => {
                    console.log("HERE");
                    await WebBrowser.openBrowserAsync("http://www.thewmi.net/");
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("./logo.png")}
                      style={{
                        resizeMode: "center",
                        width: 100,
                        height: 30,
                      }}

                      // style={{ resizeMode: "center" }}
                    />
                    <Text style={{ color: "#fff", fontSize: 15 }}>Website</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 5,
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Welcome To Wayne Management Institute, Your career
                transformation partner.
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Do you still have questions?
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Our Customer Support Team is ready and waiting to help you:
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  marginVertical: 5,
                }}
              >
                info@thewmi.net
              </Text>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  marginTop: 5,
                }}
              >
                <Text style={{ color: "black" }}>All right reserved</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default LandingPage;
