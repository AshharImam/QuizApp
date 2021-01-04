import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

class Questions extends Component {
  constructor(props) {
    super();
    this.state = {
      value: "unchecked",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.value === "unchecked") {
      return { value: props.answer?.answer };
    }
    return null;
  }

  render() {
    return (
      <View
        style={{
          marginTop: 5,
          flex: 1,
          paddingBottom: 10,
          backgroundColor: "#fff",
        }}
      >
        {/* <View
          style={{
            marginTop: 20,
            // width: "100%",
            // height: 120,
            // alignItems: "center",
            // backgroundColor: "red",
            // justifyContent: "flex-end",
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="center"
            style={{
              alignSelf: "center",
              width: "30%",
              height: 80,
            }}
          />
        </View> */}
        <ScrollView style={{ paddingHorizontal: 5, backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
            {this.props.index + 1}){this.props.question}?
          </Text>
          {/* <Image source={require("../../assets/Images/Copy.PNG")} /> */}
          {/* <Image
            source={require(`../../assets/Images/${this.props.question}.PNG`)}
          /> */}
          {this.props.image && (
            <Image
              source={this.props.image}
              resizeMode="contain"
              style={{
                width: "100%",
                alignSelf: "center",
              }}
            />
          )}
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: "a" })}
              style={styles.container}
            >
              <View
                style={{
                  width: "100%",
                  borderBottomWidth: 2,
                  // borderBottomColor: "#ea2c62",
                  borderBottomColor: "rgb(100,198,247)",

                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="a"
                  status={this.state.value === "a" ? "checked" : "unchecked"}
                  onPress={() => this.setState({ value: "a" })}
                  // color="#ea2c62"
                  color="rgb(100,198,247)"
                />
                <Text style={styles.answer}>{this.props.optionA}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ value: "b" })}
              style={styles.container}
            >
              <View
                style={{
                  width: "100%",

                  borderBottomWidth: 2,
                  // borderBottomColor: "#ea2c62",
                  borderBottomColor: "rgb(100,198,247)",

                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="b"
                  status={this.state.value === "b" ? "checked" : "unchecked"}
                  onPress={() => this.setState({ value: "b" })}
                  // color="#ea2c62"
                  color="rgb(100,198,247)"
                />
                <Text style={styles.answer}>{this.props.optionB}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ value: "c" })}
              style={styles.container}
            >
              <View
                style={{
                  width: "100%",

                  borderBottomWidth: 2,
                  // borderBottomColor: "#ea2c62",
                  borderBottomColor: "rgb(100,198,247)",

                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="c"
                  status={this.state.value === "c" ? "checked" : "unchecked"}
                  onPress={() => this.setState({ value: "c" })}
                  // color="#ea2c62"
                  color="rgb(100,198,247)"
                />
                <Text style={styles.answer}>{this.props.optionC}.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ value: "d" })}
              style={styles.container}
            >
              <View
                style={{
                  width: "100%",
                  borderBottomWidth: 2,
                  // borderBottomColor: "#ea2c62",
                  borderBottomColor: "rgb(100,198,247)",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="d"
                  status={this.state.value === "d" ? "checked" : "unchecked"}
                  onPress={() => this.setState({ value: "d" })}
                  // color="#ea2c62"
                  color="rgb(100,198,247)"
                />
                <Text style={styles.answer}>{this.props.optionD} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Button
            onPress={() => {
              this.props.back();
              this.setState({ value: "unchecked" });
            }}
            mode="outlined"
            color="#000"
            style={{ width: 120 }}
          >
            PREV
          </Button>
          <FontAwesome name="pause" size={30} color="rgb(100,198,247)" />
          <Button
            onPress={() => {
              this.props.next(this.state.value);
              this.setState({ value: "unchecked" });
            }}
            icon="check"
            mode="contained"
            // color="#f1d4d4"
            color="rgb(100,198,247)"
            style={{ width: 120 }}
          >
            Next
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button
            onPress={() => this.props.markReview()}
            mode="outlined"
            color="#000"
            style={{ width: 120 }}
          >
            {this.props.titleMark}
          </Button>

          <Button
            onPress={() => {
              this.props.next(this.state.value);
              this.setState({ value: "unchecked" });
            }}
            // mode="outlined"
            color="rgb(100,198,247)"
            // style={{ width: 120 }}
          >
            SUBMIT
          </Button>
          <Button
            onPress={() => this.props.showReview()}
            mode="outlined"
            // color="#f1d4d4"
            color="#000"
            style={{ width: 120 }}
          >
            REVIEW
          </Button>
        </View>
      </View>
    );
  }
}

export default Questions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 7,
    flex: 1,
  },
  prefix: {
    paddingRight: 20,
  },
  answer: {
    fontSize: 18,
    paddingRight: 30,
    paddingBottom: 0,
  },
});
