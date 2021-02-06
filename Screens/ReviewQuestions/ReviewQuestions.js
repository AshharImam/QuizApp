import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import * as set5 from "../../assets/questions/backup.json";
import Questions from "../DisplayReviewQuestion";
import Result from "../DisplayResult/Result";
import images from "../../images";
import CountDown from "react-native-countdown-component";

class DemoQuestions extends Component {
  constructor(props) {
    super();
    this.state = {
      demo: [], //LIST OF ALL QUESTIONS
      index: 0, //CURRENT INDEX OF QUESTION
      title: "",
    };
  }

  componentDidMount() {
    const { array, title } = this.props.route.params;
    this.setState({
      // demo: Object.values(),
      demo: array,
      title: title,
    });
    console.log("ARRAY LENGTH>>", array.length);
    console.log("QUESTION 1>>>", array[0]);
    // console.log(this.props.route.params.title);
  }

  // NEXT QUESTION
  next = () => {
    //CORRECT ANSWER ===>> CHOOSEN ANSWER
    // INCREMENTING FOR NEXT QUESTION
    this.state.index < this.state.demo.length - 1 &&
      this.setState({ index: this.state.index + 1 });
  };

  back = () => {
    // DECREMENTING INDEX FOR PREVIOUS QUESTION
    this.state.index > 0 && this.setState({ index: this.state.index - 1 });
  };

  render() {
    const question = this.state.demo[this.state.index];
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
              marginTop: 10,
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
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                Q {this.state.index + 1} / {this.state.demo.length}
                {/* Q
                {!this.state.showReview ||
                !this.state.reviewQuestions.length === 0
                  ? this.state.index + 1
                  : this.state.reviewQuestions[this.state.reviewIndex] + 1}
                / {this.state.demo.length - 1} */}
              </Text>
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
            <Text
              style={{
                color:
                  this.props.route.params.title === "Skipped"
                    ? "orange"
                    : this.props.route.params.title === "Correct"
                    ? "green"
                    : "red",
              }}
            >
              {this.props.route.params.title}
            </Text>
          </View>
          {/* {console.log(question.selectedAnswer)} */}
          {/* {console.log(this.state.reviewQuestions[this.state.reviewIndex])} */}
          {question ? (
            <Questions
              explaination={question.explanation}
              index={this.state.index}
              next={(correctAnswer) => this.next(correctAnswer)}
              back={this.back}
              answer={{ answer: question.answer }}
              selectedAnswer={question.selectedAnswer}
              question={question.question}
              optionA={question.a}
              optionB={question.b}
              optionC={question.c}
              optionD={question.d}
              done={() => this.props.navigation.goBack()}
              // titleMark={
              //   !this.state.showReview
              //     ? this.state.reviewQuestions.includes(this.state.index)
              //       ? "UNMARK"
              //       : "MARK"
              //     : !this.state.unmarkedReview.includes(this.state.reviewIndex)
              //     ? "UNMARK"
              //     : "MARK"
              // }
              // markReview={this.markUnmarkReview}
              // showReview={(correctAnswer) => {
              // console.log(
              //   "REVIEW QUESTIONS LENGTH | SHOW REVIEW>>>",
              //   this.state.reviewQuestions.length
              // );
              //   if (
              //     this.state.showReview === false &&
              //     this.state.reviewQuestions.length === 0
              //   ) {
              //   } else {
              //     this.state.showReview
              //       ? this.setReviewAnswer(correctAnswer)
              //       : this.setAnswer(correctAnswer);
              //     if (this.state.showReview && this.state.unmarkedReview) {
              //       const temp = this.state.reviewQuestions;
              //       this.state.unmarkedReview.forEach((i) => {
              //         temp.splice(i, 1);
              //       });
              //       this.setState({
              //         reviewQuestions: temp,
              //       });
              //     }
              //     this.setState({
              //       showReview: !this.state.showReview,
              //       reviewIndex: 0,
              //     });
              //   }
              // }}
              image={question.image && images[question.image]}
            />
          ) : (
            <View></View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

export default DemoQuestions;
