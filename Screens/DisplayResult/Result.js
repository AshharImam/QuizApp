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
  const [wrong, setWrong] = useState();
  const [unattempted, setUnattempted] = useState([]);
  const [array, setArray] = useState([]);
  {
    // console.log(props.navigation);
  }
  useEffect(() => {
    // console.log(props.total);
    const correct = props.answers.filter((i) => i.correct && i.answer);
    const wrong = props.answers.filter((i) => !i.correct && i.answer);
    // console.log(props.answers);
    const unattempted = props.total - correct.length - wrong.length;
    const results = props.allQuestion.filter(
      ({ question: id1 }) =>
        !props.answers.some(({ question: id2 }) => id2 === id1)
    );
    const arr = [...props.answers, ...results];
    // console.log(arr);
    arr.pop();
    setArray(arr);
    setWrong(wrong.length);
    setCorrect(correct.length);
    setUnattempted(unattempted);
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
          Wrongs : {wrong}
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
          {array.map((i, index) => {
            // console.log(i.correct, i.answer);
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
