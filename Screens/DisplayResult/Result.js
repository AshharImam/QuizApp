import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import db from "../../config";

const Result = (props) => {
  const [correct, setCorrect] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [unattempted, setUnattempted] = useState([]);
  const [array, setArray] = useState([]);
  {
    // console.log(props.navigation);
  }
  useEffect(() => {
    // props.answer --- Array for the list of answer which questions are attempted
    // props.total --- TOtal number of questions
    // props.allQuestion --- All Questions for the test
    const correct = props.answers.filter((i) => i.correct && i.selectedAnswer); //filtering for correct answers
    const wrong = props.answers.filter((i) => !i.correct && i.selectedAnswer); // filtering for wrong answers
    // const unattempted = props.total - correct.length - wrong.length;
    // Filtering the remaining unattempted questions (which are skipped or left)
    const results = props.allQuestion.filter(
      ({ question: id1 }) =>
        // asssigning question variable from object to id1
        // condition for not returning the questions which are  included in props.answer
        !props.answers.some(({ question: id2 }) => id2 === id1)
    );
    // merging attempted answers and unattempted answers
    const arr = [...props.answers, ...results];
    arr.pop();
    const skipped = arr.filter((i) => !i.selectedAnswer);
    console.log(arr[0]);
    setArray(arr);
    setWrong(wrong);
    setCorrect(correct);
    setUnattempted(skipped);
    addToDatabase(arr, wrong, correct, skipped);
  }, []);

  const addToDatabase = (arr, wrong, correct, skipped) => {
    try {
      db.collection("users")
        .doc(Constants.installationId)
        .collection(props.demo)
        .add({
          array: arr,
          wrong: wrong,
          correct: correct,
          unattempted: skipped,
          timeStamp: new Date(),
        });
    } catch (error) {
      // handle error
    }
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <StatusBar translucent={false} barStyle="light-content" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          marginHorizontal: 30,
          paddingVertical: 30,
          shadowColor: "black",
        }}
      >
        <Image //Logo for quiz
          source={require("./test.png")}
          resizeMode="center"
          style={{ height: 90 }}
        />
        <Text style={{ fontSize: 16, marginTop: 10, color: "#fff" }}>
          Your Score
        </Text>
        <Text
          style={{
            fontSize: 30,
            marginVertical: 5,
            color:
              (correct.length / array.length) * 100 < 80
                ? "rgb(200,0,0)"
                : "rgb(0,200,0)",
          }}
        >
          {/* Corrects : {props.corrects.length} */}
          {parseInt((correct.length / array.length) * 100)} %
        </Text>
        <Text
          style={{
            fontSize: 30,
            marginVertical: 5,
            color:
              (correct.length / array.length) * 100 < 80
                ? "rgb(200,0,0)"
                : "rgb(0,200,0)",
          }}
        >
          {/* Corrects : {props.corrects.length} */}
          {(correct.length / array.length) * 100 < 80 ? "Failed!" : "Passed!"}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "rgba(0,100,0,0.6)",
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
        onPress={() =>
          correct.length > 0 &&
          props.navigation.navigate("ReviewQuestions", {
            title: "Correct",
            array: correct,
          })
        }
      >
        <Text style={{ fontSize: 26, marginVertical: 5, color: "white" }}>
          {/* Corrects : {props.corrects.length} */}
          {correct.length} Review Correct
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "rgba(100,0,0,0.6)",
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
        onPress={() =>
          wrong.length > 0 &&
          props.navigation.navigate("ReviewQuestions", {
            title: "Wrong",
            array: wrong,
          })
        }
      >
        <Text style={{ fontSize: 26, marginVertical: 5, color: "white" }}>
          {/* Corrects : {props.corrects.length} */}
          {wrong.length} Review Wrong
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "rgba(255,165,0, 0.6)",
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
        onPress={() =>
          unattempted.length > 0 &&
          props.navigation.navigate("ReviewQuestions", {
            title: "Skipped",
            array: unattempted,
          })
        }
      >
        <Text style={{ fontSize: 26, marginVertical: 5, color: "white" }}>
          {/* Corrects : {props.corrects.length} */}
          {unattempted.length} Review Skipped
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
        onPress={() => props.navigation.navigate("LandingPage")}
      >
        <Text
          style={{ fontSize: 26, marginVertical: 5, color: "rgb(100,198,247)" }}
        >
          Done
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "rgba(100,198,247, 0.6)",
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
        onPress={() =>
          props.navigation.navigate("PreviousHistory", {
            demo: props.demo,
          })
        }
      >
        <Text
          style={{ fontSize: 26, marginVertical: 5, color: "rgb(255,255,255)" }}
        >
          Previous History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
