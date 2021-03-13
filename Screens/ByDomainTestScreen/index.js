import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../../config";
import queryString from "query-string";

class PremiumQuestionSet extends Component {
  constructor(props) {
    super(props);
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
  // Code to check if the payment is done

  // componentDidMount() {
  //   const doc = db.collection("users").doc(Constants.installationId).get();

  //   const data = this.getData();
  //   data.then((i) => {
  //     console.log("ASYNC DATA", new Date(i.expires_at));
  //     if (i && i.expires_at) {
  //       const date = new Date();
  //       const expiryDate = new Date(i.expires_at);

  //       console.log(expiryDate);
  //       // console.log(new Date(i?.expires_at.seconds * 1000));
  //       // console.log(expiryDate.getTime());
  //       // console.log(this.isExpired(date.getTime(), expiryDate?.getTime()));
  //       if (this.isExpired(date.getTime(), expiryDate?.getTime())) {
  //         this.setState({
  //           expires_at: `You Subscription Has Expired!`,
  //         });
  //         console.log("Expired");
  //       } else {
  //         console.log("Expiring");

  //         this.setState({
  //           expires_at: `You Subscription Expires at ${expiryDate.toDateString()}`,
  //           data: i,
  //         });
  //       }
  //     }
  //   });
  //   if (doc && !this.state.data) {
  //     doc.then((data) => {
  //       // console.log("DATA>>>", data);
  //       // console.log(">>>", data.data().expires_at);
  //       if (data.data() && data.data().expires_at) {
  //         const date = new Date();
  //         const expiryDate = new Date(data.data()?.expires_at.seconds * 1000);

  //         // console.log(date.getTime());
  //         // console.log(new Date(data.data()?.expires_at.seconds * 1000));
  //         // console.log(expiryDate.getTime());
  //         // console.log(this.isExpired(date.getTime(), expiryDate?.getTime()));
  //         if (this.isExpired(date.getTime(), expiryDate?.getTime())) {
  //           this.setState({
  //             expires_at: `You Subscription Has Expired!`,
  //           });
  //         } else {
  //           // console.log("Expiring");
  //           this.setState({
  //             expires_at: `You Subscription Expires at ${new Date(
  //               data.data().expires_at.seconds * 1000
  //             ).toDateString()}`,
  //           });
  //         }
  //       }
  //     });
  //   }
  // }

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

  payment(set) {
    // console.log("SET FROM PAYMENT", set);
    // console.log(Constants.installationId);
    this.setState({
      disable: true,
    });

    const doc = db
      .collection("users")
      .doc(Constants.installationId)
      .collection("PremiumQuestions")
      .doc(`${set}`)
      .get();
    if (doc) {
      doc.then((data) => {
        const date = new Date();
        const expiryDate = new Date(data?.data()?.expires_at?.seconds * 1000);
        if (
          data.data() &&
          data.data().completed_at &&
          !this.isExpired(date.getTime(), expiryDate?.getTime())
        ) {
          this.props.navigation.navigate("PremiumBeginScreen", { set: set });
        } else {
          this.navigateToPaymentScreen(set);
        }
      });
    } else {
      this.navigateToPaymentScreen(set);
    }

    this.setState({
      disable: false,
    });
  }

  navigateToPaymentScreen(set) {
    console.log("SET FROM NAVIGATE TO PAYMENT", set);
    fetch("https://sandbox.api.getsafepay.com/order/v1/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: "sec_0400d1f7-542e-4af3-81ac-6c588b7a79df",
        amount: 100.0,
        currency: "PKR",
        environment: "sandbox",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        db.collection("users")
          .doc(Constants.installationId)
          .collection("PremiumQuestions")
          .doc(`${set}`)
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
        console.log("url>>", url);
        this.props.navigation.navigate("PaymentScreen", {
          url: url,
          set: set,
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
    return (
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
            padding: "5%",
            width: "100%",
            marginVertical: "1%",
          }}
        >
          <Text
            style={{
              // color: "white",
              color: "rgb(100,198,247)",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Test by Domain
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("PremiumBeginScreen", {
                set: 1,
              });
              // this.payment(1)
            }}
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
            <Text style={{ color: "white", fontSize: 18 }}>People</Text>

            <View>
              <Text style={{ color: "red" }}>100 PKR</Text>
              <Text style={{ color: "rgb(100,198,247)" }}>180 Questions</Text>
            </View>
            {/* <AntDesign name="playcircleo" size={24}  /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("PremiumBeginScreen", {
                set: 2,
              });
              // this.payment(2)
            }}
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
            <Text style={{ color: "white", fontSize: 18 }}>Process</Text>

            <View>
              <Text style={{ color: "red" }}>100 PKR</Text>
              <Text style={{ color: "rgb(100,198,247)" }}>180 Questions</Text>
            </View>
            {/* <AntDesign name="playcircleo" size={24}  /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // this.payment(3)
              this.props.navigation.navigate("PremiumBeginScreen", {
                set: 3,
              });
            }}
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
            <Text style={{ color: "white", fontSize: 18 }}>
              Business Environment
            </Text>

            <View>
              <Text style={{ color: "red" }}>100 PKR</Text>
              <Text style={{ color: "rgb(100,198,247)" }}>180 Questions</Text>
            </View>
            {/* <AntDesign name="playcircleo" size={24}  /> */}
          </TouchableOpacity>

          {/* <Button
            icon="book"
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate("PremiumQuestionTest", { set: 1 })
            }
            style={{ marginVertical: 15 }}
            color="#ea2c62"
          >
            Question Set 1
          </Button>

          <Button
            icon="book"
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate("PremiumQuestionTest", { set: 2 })
            }
            style={{ marginVertical: 15 }}
            color="#ea2c62"
          >
            Question Set 2
          </Button>

          <Button
            icon="book"
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate("PremiumQuestionTest", { set: 3 })
            }
            style={{ marginVertical: 15 }}
            color="#ea2c62"
          >
            Question set 3
          </Button>

          <Button
            icon="book"
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate("PremiumQuestionTest", { set: 4 })
            }
            style={{ marginVertical: 15 }}
            color="#ea2c62"
          >
            Question set 4
          </Button>

          <Button
            icon="book"
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate("PremiumQuestionTest", { set: 5 })
            }
            style={{ marginVertical: 15 }}
            color="#ea2c62"
          >
            Question set 5
          </Button> */}
        </View>
      </ImageBackground>
    );
  }
}
export default PremiumQuestionSet;
