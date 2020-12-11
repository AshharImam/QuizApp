import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import queryString from "query-string";
import Constants from "expo-constants";
import db from "../../config";

const index = (props) => {
  const WEBVIEW_REF = useRef();
  console.log(props);

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
        .update({
          cancelled_at: formatDateTime(new Date()),
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
      db.collection("users")
        .doc(Constants.installationId)
        .set(
          {
            completed_at: formatDateTime(new Date()),
            tracker: parsed.tracker,
            reference: parsed.reference,
            token: parsed.token,
          },
          { merge: true }
        );
      props.navigation.navigate("PremiumQuestionSet");
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

  const onError = (e) => {
    // console.log(e);
  };

  const handleMessage = (m) => {
    // console.log(m);
  };
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
