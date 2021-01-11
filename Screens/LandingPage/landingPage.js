import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import queryString from "query-string";
import db from "../../config";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./logo.jpg")}
            style={{ resizeMode: "center" }}
          />
        </View>

        <View
          style={{
            marginVertical: 100,
            marginHorizontal: 50,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            The Quiz App
          </Text>
          <Text
            style={{
              fontSize: 14,
              alignItems: "center",
              textAlign: "center",
              paddingVertical: 10,
              paddingBottom: 20,
            }}
          >
            with love : Wayne Managment Institue
          </Text>

          <View style={{ paddingVertical: 30 }}>
            <Button
              mode="outlined"
              theme={{ colors: { text: "white" } }}
              color="rgb(100,198,247)"
              onPress={() => this.props.navigation.navigate("DemoQuestions")}
            >
              Try the demo quiz
            </Button>
          </View>

          <Button
            disabled={this.state.disable}
            icon="crown"
            mode="contained"
            // color="#f1d4d4"
            color="rgb(100,198,247)"
            // color="red"
            // onPress={() => this.props.navigation.navigate("SignUp")}
            onPress={() => this.payment()}
          >
            get the best questions
          </Button>
          {this.state.expires_at && (
            <View style={{ width: "100%", padding: 5 }}>
              <Text
                style={{
                  backgroundColor: "red",
                  alignSelf: "center",
                  marginTop: 10,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {this.state.expires_at}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default LandingPage;
