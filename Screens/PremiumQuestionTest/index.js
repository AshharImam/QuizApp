import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import * as set5 from "../../assets/questions/set5.json";
import * as set1 from "../../assets/questions/SET1.json";
import * as set2 from "../../assets/questions/set2.json";
import * as set3 from "../../assets/questions/set3.json";
import * as set4 from "../../assets/questions/set4.json";
import Questions from "../DisplayQuestion/Questions";
import Result from "../DisplayResult/Result";
import images from "../../images";
import CountDown from "react-native-countdown-component";
import AsyncStorage from "@react-native-async-storage/async-storage";

class PremiumQuestionTest extends Component {
  constructor() {
    super();
    this.state = {
      demo: [], //LIST OF ALL QUESTIONS
      index: 0, //CURRENT INDEX OF QUESTION
      answers: [], //LIST OF ANSWERS ACCORDING TO THIER INDEX
      reviewQuestions: [], //INDECES OF QUESTIONS FOR REVIEW
      showReview: false,
      reviewIndex: 0,
      unmarkedReview: [],
      submit: false,
      timer: 4 * 60 * 60,
      pauseTimer: 0,
    };
  }
  getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  storeData = async (key, value) => {
    // console.log(value);
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key.toString(), jsonValue);
    } catch (e) {
      // saving error
    }
  };

  componentDidMount() {
    this.props.navigation.addListener("beforeRemove", (e) => {
      if (
        this.state.index == this.state.demo.length ||
        this.state.submit ||
        e.data.action.type == "POP" ||
        e.data.action.type == "NAVIGATE"
      ) {
        // If we don't have unsaved changes, then we don't need to do anything
        this.props.navigation.dispatch(e.data.action);
        return;
      } else {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Current test will be discarded?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => this.props.navigation.dispatch(e.data.action),
            },
          ]
        );
      }
    });

    const set = this.props.route.params.set;
    console.log("SET FROM PREMIUM TEST", set);
    if (set === 1) {
      this.setState({
        demo: Object.values(set1),
      });
    }
    if (set === 2) {
      this.setState({
        demo: Object.values(set2),
      });
    }
    if (set === 3) {
      this.setState({
        demo: Object.values(set3),
      });
    }
    if (set === 4) {
      this.setState({
        demo: Object.values(set4),
      });
    }
    if (set === 5) {
      this.setState({
        demo: Object.values(set5),
      });
    }

    const res = this.getData(`${set}`);
    // console.log("RESUME", res);
    res.then((i) => {
      // console.log(i.index);
      if (i) {
        Alert.alert(
          "Resume?",
          "You left this test incomplete. Do you want to resume?",
          [
            {
              text: "Resume",
              onPress: () => this.setState(i),
            },
            {
              text: "Cancel",
              onPress: () => {
                this.storeData(set, "");
              },
            },
          ]
        );
        this.storeData(set, "");
      }
    });
  }

  next = (correctAnswer) => {
    //CORRECT ANSWER ===>> CHOOSEN ANSWER
    // INCREMENTING FOR NEXT QUESTION
    this.setState({ index: this.state.index + 1 });
    this.setAnswer(correctAnswer);
  };

  back = (correctAnswer) => {
    this.setAnswer(correctAnswer);
    // DECREMENTING INDEX FOR PREVIOUS QUESTION
    this.state.index > 0 && this.setState({ index: this.state.index - 1 });
  };

  setAnswer = (correctAnswer) => {
    {
      var DemoQuestionsArray = Object.values(this.state.demo);
    }
    const question = DemoQuestionsArray[this.state.index];
    // LISTING ALL ANSWERS
    const answers = [...this.state.answers];
    // console.log(this.state.index);
    // SAVING AT THE ANSWER[INDEX]
    answers[this.state.index] = {
      selectedAnswer: correctAnswer,
      correct: correctAnswer == question.answer, //CHECKING IF ANSWER IS CORRECT OR WRONG | UNDEFINED FOR LEFT ANSWER
      ...question,
    };

    this.setState({
      answers: answers,
    });
  };

  nextReview = (correctAnswer) => {
    this.setReviewAnswer(correctAnswer);

    !(this.state.reviewIndex + 1 === this.state.reviewQuestions.length) &&
      this.setState({
        reviewIndex: this.state.reviewIndex + 1,
      });
  };

  backReview = (correctAnswer) => {
    this.setReviewAnswer(correctAnswer);
    this.state.reviewIndex > 0 &&
      this.setState({ reviewIndex: this.state.reviewIndex - 1 });
  };

  setReviewAnswer = (correctAnswer) => {
    const DemoQuestionsArray = [...this.state.demo];
    const question =
      DemoQuestionsArray[this.state.reviewQuestions[this.state.reviewIndex]];
    const answers = [...this.state.answers];
    answers[this.state.reviewQuestions[this.state.reviewIndex]] = {
      // answer: correctAnswer,
      ...question,
      correct: correctAnswer == question.answer, //CHECKING IF ANSWER IS CORRECT OR WRONG | UNDEFINED FOR LEFT ANSWER
      // question: question.question,
      // explanation: question.explanation,
      selectedAnswer: correctAnswer,
    };

    this.setState({
      answers: answers,
    });
  };
  markUnmarkReview = () => {
    const temp = [...this.state.reviewQuestions];

    if (!this.state.showReview) {
      if (!this.state.reviewQuestions.includes(this.state.index)) {
        temp.push(this.state.index);
        this.setState({
          reviewQuestions: temp,
        });
      } else {
        const index = temp.indexOf(this.state.index);
        temp.splice(index, 1);
        this.setState({
          reviewQuestions: temp,
        });
      }
      // console.log("REVIEW QUESTIONS>>>", temp);
    } else {
      // FOR DIRECTLY REMOVING QUESTION FROM REVIEW ====
      // const index = this.state.reviewIndex;
      // temp.splice(index, 1);
      // this.setState({
      //   reviewQuestions: temp,
      // });
      // ========
      const unmarkedReview = [...this.state.unmarkedReview];
      if (!this.state.unmarkedReview.includes(this.state.reviewIndex)) {
        unmarkedReview.push(this.state.reviewIndex);
      } else {
        const index = this.state.unmarkedReview.indexOf(this.state.reviewIndex);
        unmarkedReview.splice(index, 1);
      }
      this.setState({
        unmarkedReview: unmarkedReview,
      });
      // console.log("UNMAKED REVIEW ARRAY>>>", unmarkedReview);
    }
  };

  submit = (correctAnswer) => {
    // this.state.showReview
    //   ? this.setReviewAnswer(correctAnswer)
    //   : this.setAnswer(correctAnswer);

    Alert.alert(
      "Submit",
      "Do you want to submit this test?",
      [
        {
          text: "Submit",
          onPress: () =>
            this.setState({
              submit: true,
            }),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  handlePause = () => {
    const {
      index,
      answers,
      reviewIndex,
      reviewQuestions,
      demo,
      unmarkedReview,
      showReview,
      submit,
      pauseTimer,
      timer,
    } = this.state;
    Alert.alert("Pause test?", "Do you want to pause this test?", [
      {
        text: "Pause",
        onPress: () => {
          this.storeData(`${this.props.route.params.set}`, {
            index,
            answers,
            reviewIndex,
            reviewQuestions,
            demo,
            unmarkedReview,
            showReview,
            submit,
            timer: pauseTimer,
            pauseTimer: timer,
          });
          this.props.navigation.pop();
        },
      },
      {
        text: "Cancel",
        onPress: () => {},
      },
    ]);
  };
  render() {
    // console.log("ANSWERS", this.state.answers);
    // {
    //   var DemoQuestionsArray = Object.values(this.state.demo);
    //   // console.log(DemoQuestionsArray);
    // }
    if (!this.state.showReview || !this.state.reviewQuestions.length === 0) {
      var question = this.state.demo[this.state.index];
    } else {
      var question = this.state.demo[
        this.state.reviewQuestions[this.state.reviewIndex]
      ];
    }

    if (this.state.index < this.state.demo.length - 1 && !this.state.submit) {
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
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "red" }}
                >
                  Q
                  {!this.state.showReview ||
                  !this.state.reviewQuestions.length === 0
                    ? this.state.index + 1
                    : this.state.reviewQuestions[this.state.reviewIndex] + 1}
                  / {this.state.demo.length - 1}
                </Text>
                {this.state.showReview && (
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "red" }}
                  >
                    REVIEW
                  </Text>
                )}
              </View>
              <Image
                source={require("../../assets/logo.png")}
                resizeMode="center"
                style={{
                  alignSelf: "center",
                  width: "40%",
                  height: 80,
                }}
              />
              <CountDown
                onChange={(e) =>
                  this.setState({
                    pauseTimer: e,
                  })
                }
                timeLabelStyle={{ color: "red", fontWeight: "bold" }}
                until={this.state.timer}
                size={15}
                digitTxtStyle={{ color: "#fff" }}
                timeToShow={["H", "M", "S"]}
                onFinish={() =>
                  this.setState({
                    submit: true,
                  })
                }
                digitStyle={{ backgroundColor: "red" }}
              />
            </View>
            {/* {console.log(this.state.reviewQuestions[this.state.reviewIndex])} */}
            {question ? (
              <Questions
                onPause={this.handlePause}
                index={
                  !this.state.showReview ||
                  !this.state.reviewQuestions.length === 0
                    ? this.state.index
                    : this.state.reviewQuestions[this.state.reviewIndex]
                }
                next={(correctAnswer) =>
                  !this.state.showReview
                    ? this.next(correctAnswer)
                    : this.nextReview(correctAnswer)
                }
                back={!this.state.showReview ? this.back : this.backReview}
                answer={
                  !this.state.showReview
                    ? this.state.answers[this.state.index]
                    : this.state.answers[
                        this.state.reviewQuestions[this.state.reviewIndex]
                      ]
                }
                question={question.question}
                optionA={question.a}
                optionB={question.b}
                optionC={question.c}
                optionD={question.d}
                submit={this.submit}
                titleMark={
                  !this.state.showReview
                    ? this.state.reviewQuestions.includes(this.state.index)
                      ? "UNMARK"
                      : "MARK"
                    : !this.state.unmarkedReview.includes(
                        this.state.reviewIndex
                      )
                    ? "UNMARK"
                    : "MARK"
                }
                markReview={this.markUnmarkReview}
                showReview={(correctAnswer) => {
                  // console.log(
                  //   "REVIEW QUESTIONS LENGTH | SHOW REVIEW>>>",
                  //   this.state.reviewQuestions.length
                  // );
                  if (
                    this.state.showReview === false &&
                    this.state.reviewQuestions.length === 0
                  ) {
                  } else {
                    this.state.showReview
                      ? this.setReviewAnswer(correctAnswer)
                      : this.setAnswer(correctAnswer);
                    if (this.state.showReview && this.state.unmarkedReview) {
                      const temp = this.state.reviewQuestions;
                      this.state.unmarkedReview.forEach((i) => {
                        temp.splice(i, 1);
                      });
                      this.setState({
                        reviewQuestions: temp,
                      });
                    }
                    this.setState({
                      showReview: !this.state.showReview,
                      reviewIndex: 0,
                    });
                  }
                }}
                image={question.image && images[question.image]}
              />
            ) : (
              <View></View>
            )}
          </ImageBackground>
        </View>
      );
    } else {
      // this.storeData(`${this.props.route.params.set}`, "");
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
              <Result
                demo={`set${this.props.route.params.set}`}
                allQuestion={this.state.demo}
                total={this.state.demo.length - 1}
                answers={this.state.answers}
                corrects={this.state.corrects}
                wrongs={this.state.wrongs}
                navigation={this.props.navigation}
                value="unchecked"
              />
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
}
export default PremiumQuestionTest;
