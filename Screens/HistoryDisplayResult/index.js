import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

function index(props) {
  const [correct, setCorrect] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [unattempted, setUnattempted] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const { correct, wrong, unattempted, array } = props.route.params;
    // console.table("CORRECT", correct);
    setCorrect(correct);
    setWrong(wrong);
    setUnattempted(unattempted);
    setArray(array);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
        }}
      >
        <ScrollView>
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
                {(correct.length / array.length) * 100 < 80
                  ? "Failed!"
                  : "Passed!"}
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
              onPress={() => props.navigation.goBack()}
            >
              <Text
                style={{
                  fontSize: 26,
                  marginVertical: 5,
                  color: "rgb(100,198,247)",
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default index;
