import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import * as set5 from "../../assets/questions/backup.json";
import Questions from "../DisplayQuestion/Questions";
import Result from "../DisplayResult/Result";
import images from "../../images";

class DemoQuestions extends Component {
  constructor() {
    super();
    this.state = {
      demo: [],
      index: 0,
      answers: [],
      corrects: [],
      wrongs: [],
    };
  }

  componentDidMount() {
    // firebase
    //   .database()
    //   .ref()
    //   .child("Demo")
    //   .on("value", (snapshot) => {
    //     if (snapshot.val() != null) {
    //       this.setState({ demo: snapshot.val() });
    //     } else {
    //       console.log("no data found");
    //     }
    //   });
    this.setState({
      demo: set5,
    });
  }
  next = (correctAnswer) => {
    this.setState({ index: this.state.index + 1 });
    {
      var DemoQuestionsArray = Object.values(this.state.demo);
    }
    const question = DemoQuestionsArray[this.state.index];
    const answers = [...this.state.answers];
    console.log(this.state.index);
    answers[this.state.index] = {
      answer: correctAnswer,
      correct: correctAnswer == question.answer,
      question: question.question,
      explanation: question.explanation,
    };
    this.setState({
      answers: answers,
    });
    console.log("Checking if : ", correctAnswer, question.answer);
    if (correctAnswer == question.answer) {
      console.log("this is correct");
      const corrects = this.state.corrects;
      corrects.push(question);
      this.setState({ corrects });
    } else {
      const wrongs = this.state.wrongs;
      wrongs.push(question);
      this.setState({ wrongs });
    }
  };

  back = () => {
    this.state.index > 0 && this.setState({ index: this.state.index - 1 });
  };
  render() {
    {
      var DemoQuestionsArray = Object.values(this.state.demo);
      // console.log(DemoQuestionsArray);
    }

    const question = DemoQuestionsArray[this.state.index];
    if (this.state.index < DemoQuestionsArray.length - 1) {
      return question ? (
        <Questions
          index={this.state.index}
          next={(correctAnswer) => this.next(correctAnswer)}
          back={this.back}
          answer={this.state.answers[this.state.index]}
          question={question.question}
          optionA={question.a}
          optionB={question.b}
          optionC={question.c}
          optionD={question.d}
          image={question.image && images[question.image]}
        />
      ) : (
        <View></View>
      );
    } else {
      return (
        <View>
          <ScrollView>
            {console.log(this.state.answers.length)}
            <Result
              answers={this.state.answers}
              corrects={this.state.corrects}
              wrongs={this.state.wrongs}
              navigation={this.props.navigation}
              value="unchecked"
            />
          </ScrollView>
        </View>
      );
    }
  }
}

export default DemoQuestions;
