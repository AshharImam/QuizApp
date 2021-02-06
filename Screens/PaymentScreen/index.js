import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import queryString from "query-string";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../../config";
import { set } from "react-native-reanimated";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("data", jsonValue);
  } catch (e) {
    // saving error
  }
};

const index = (props) => {
  const WEBVIEW_REF = useRef();
  console.log("HERE IN PAYMENT");
  const formatDateTime = (date) => {
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
  };
  const onNavigationStateChange = (event) => {
    const url = event.url;
    console.log(props.route.params.set);
    // If the customer has not been redirected to
    // /mobile yet (meaning he has neither completed
    // or cancelled the payment) do nothing.
    if (url.indexOf("/mobile") === -1) {
      return;
    }
    // Get the query params as a string
    const params = url.split("?")[1];
    // parse the query string using the
    // npm package
    // https://github.com/sindresorhus/query-string
    const parsed = queryString.parse(params);
    if (parsed.action === "cancel") {
      db.collection(users)
        .doc(Constants.installationId)
        .collection("PremiumQuestions")
        .doc(prop.route.params.set)
        .update({
          cancelled_at: new Date(),
        });
      // close the webview since the customer
      // cancelled the payment
      return;
    }
    if (parsed.action === "complete") {
      // console.log(parsed.tracker);
      // console.log(parsed.reference);
      // console.log(parsed.token);
      // console.log(parsed.signature);
      const obj = {
        completed_at: new Date(),
        expires_at: getExpiryDate(),
        tracker: parsed.tracker,
        reference: parsed.reference,
        token: parsed.token,
      };
      db.collection("users")
        .doc(Constants.installationId)
        .collection("PremiumQuestions")
        .doc(`${props.route.params.set}`)
        .set(obj, { merge: true });
      storeData(obj);
      props.navigation.navigate("PremiumBeginScreen", {
        set: props.route.params.set,
      });
      // the customer completed the payment,
      // you should close the WebView and then
      // asynchronously call your server to
      // mark the payment complete.
      // Additionally, the params will include
      // - tracker
      // - reference
      // - token
      // - signature
    }
  };

  const getExpiryDate = () => {
    const date = new Date();
    const month = date.getMonth();
    if (month === 11) {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    console.log("DATE >>>", date);
    return date;
  };

  const onError = (e) => {
    // console.log(e);
  };

  const handleMessage = (m) => {
    // console.log(m);
  };
  console.log("URL", props.route.params.url);
  return (
    <WebView
      // The main ones
      source={{ uri: props.route.params.url }}
      onNavigationStateChange={onNavigationStateChange}
      // Extra props
      ref={WEBVIEW_REF}
      onError={onError}
      onMessage={handleMessage}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      javaScriptEnabledAndroid={true}
      style={{ flex: 1 }}
    />
  );
};

export default index;

const styles = StyleSheet.create({});
