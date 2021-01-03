import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase";

const Result = (props) => {
  const [correct, setCorrect] = useState();
  const [unattempted, setUnattempted] = useState([]);
  {
    console.log(props.navigation);
  }
  useEffect(() => {
    const correct = props.answers.filter((i) => i.correct === true);
    const unattempted = props.answers.filter((i) => !i.answer);
    setCorrect(correct.length);
    setUnattempted(unattempted.length);
  }, []);
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
          backgroundColor: "white",
          marginHorizontal: 30,
          paddingVertical: 30,
          shadowColor: "black",
          elevation: 10,
        }}
      >
        <Image
          source={require("./test.png")}
          resizeMode="center"
          style={{ height: 90 }}
        />
        <Text style={{ fontSize: 26, marginVertical: 25, color: "green" }}>
          {/* Corrects : {props.corrects.length} */}
          Corrects : {correct}
        </Text>
        <Text style={{ fontSize: 26, marginBottom: 25, color: "red" }}>
          {/* Wrongs : {props.wrongs.length} */}
          Wrongs : {props.answers.length - correct - unattempted}
        </Text>
        <Text style={{ fontSize: 26, marginBottom: 25, color: "#FAAD14" }}>
          {/* Wrongs : {props.wrongs.length} */}
          Unattempted : {unattempted}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Button
            icon="home"
            mode="contained"
            // color="#f1d4d4"
            color="rgb(100,198,247)"
            onPress={() => props.navigation.navigate("LandingPage")}
          >
            Go Home
          </Button>
        </View>
      </View>

      <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
        <View>
          <Text style={{ fontSize: 24, paddingLeft: 10 }}>Explainations</Text>
          {props.answers.map((i, index) => {
            console.log(i.correct, i.answer);
            return (
              i.correct != true && (
                <View
                  key={index}
                  style={[
                    {
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      // backgroundColor: "white",
                      backgroundColor: "lightblue",
                      marginVertical: 10,
                      shadowColor: "black",
                      elevation: 8,
                    },
                    // { backgroundColor: !i.answer ? "#FAAD14" : "#FF4D4F" },
                    { backgroundColor: !i.answer ? "#FAAD14" : "#FF7F7F" },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      paddingBottom: 10,
                      fontStyle: "italic",
                    }}
                  >
                    Q{index + 1}) {i.question}
                  </Text>
                  <Text style={{ fontSize: 16 }}> {i.explanation} </Text>
                </View>
              )
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Result;
