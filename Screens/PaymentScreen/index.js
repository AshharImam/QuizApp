import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const index = (props) => {
  const WEBVIEW_REF = useRef();
  console.log(props);
  const onNavigationStateChange = (event) => {
    console.log(event?.url);
  };

  const onError = (e) => {
    console.log(e);
  };

  const handleMessage = (m) => {
    console.log(m);
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
