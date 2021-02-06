import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { Entypo, Feather } from "@expo/vector-icons";

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
          backgroundColor: "rgba(0,0,0,0.6)",
          margin: 10,
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
        <ScrollView style={{ paddingHorizontal: 5 }}>
          <Text style={{ fontSize: 20, paddingHorizontal: 10, color: "white" }}>
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
            <View style={styles.container}>
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
                {this.state.value === "a" ? (
                  <Feather
                    style={{ marginHorizontal: 7 }}
                    name="check-circle"
                    color="rgb(0,200,0)"
                    size={20}
                  />
                ) : this.props.selectedAnswer === "a" ? (
                  <Entypo
                    style={{ marginHorizontal: 5 }}
                    name="circle-with-cross"
                    color="rgb(200,0,0)"
                    size={24}
                  />
                ) : (
                  <Entypo
                    name="circle"
                    style={{ marginHorizontal: 7 }}
                    color="rgb(100,198,247)"
                    size={20}
                  />
                  // <RadioButton
                  //   uncheckedColor="rgb(100,198,247)"
                  //   value="d"
                  //   color="red"
                  // />
                )}
                <Text style={styles.answer}>{this.props.optionA}</Text>
              </View>
            </View>

            <View style={styles.container}>
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
                {this.state.value === "b" ? (
                  <Feather
                    style={{ marginHorizontal: 7 }}
                    name="check-circle"
                    color="rgb(0,200,0)"
                    size={20}
                  />
                ) : this.props.selectedAnswer === "b" ? (
                  <Entypo
                    style={{ marginHorizontal: 5 }}
                    name="circle-with-cross"
                    color="rgb(200,0,0)"
                    size={24}
                  />
                ) : (
                  <Entypo
                    name="circle"
                    style={{ marginHorizontal: 7 }}
                    color="rgb(100,198,247)"
                    size={20}
                  />
                  // <RadioButton
                  //   uncheckedColor="rgb(100,198,247)"
                  //   value="d"
                  //   color="red"
                  // />
                )}
                <Text style={styles.answer}>{this.props.optionB}</Text>
              </View>
            </View>

            <View style={styles.container}>
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
                {this.state.value === "c" ? (
                  <Feather
                    style={{ marginHorizontal: 7 }}
                    name="check-circle"
                    color="rgb(0,200,0)"
                    size={20}
                  />
                ) : this.props.selectedAnswer === "c" ? (
                  <Entypo
                    style={{ marginHorizontal: 5 }}
                    name="circle-with-cross"
                    color="rgb(200,0,0)"
                    size={24}
                  />
                ) : (
                  <Entypo
                    name="circle"
                    style={{ marginHorizontal: 7 }}
                    color="rgb(100,198,247)"
                    size={20}
                  />
                  // <RadioButton
                  //   uncheckedColor="rgb(100,198,247)"
                  //   value="d"
                  //   color="red"
                  // />
                )}
                <Text style={styles.answer}>{this.props.optionC}.</Text>
              </View>
            </View>

            <View style={styles.container}>
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
                {this.state.value === "d" ? (
                  <Feather
                    style={{ marginHorizontal: 7 }}
                    name="check-circle"
                    color="rgb(0,200,0)"
                    size={20}
                    style={{ marginHorizontal: 7 }}
                  />
                ) : this.props.selectedAnswer === "d" ? (
                  <Entypo
                    style={{ marginHorizontal: 5 }}
                    name="circle-with-cross"
                    color="rgb(200,0,0)"
                    size={24}
                  />
                ) : (
                  <Entypo
                    name="circle"
                    style={{ marginHorizontal: 7 }}
                    color="rgb(100,198,247)"
                    size={20}
                  />
                  // <RadioButton
                  //   uncheckedColor="rgb(100,198,247)"
                  //   value="d"
                  //   color="red"
                  // />
                )}
                <Text style={styles.answer}>{this.props.optionD} </Text>
              </View>
            </View>
          </View>
          {this.props.explaination && (
            <View>
              <Text style={{ color: "rgb(100,198,247)", fontSize: 18 }}>
                Explaination:
              </Text>
              <Text style={{ color: "white", fontSize: 18 }}>
                {this.props.explaination}
              </Text>
            </View>
          )}
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
              this.props.back(this.state.value);
              this.setState({ value: "unchecked" });
            }}
            mode="contained"
            color="rgb(100,198,247)"
            style={{ width: 120 }}
          >
            PREV
          </Button>

          <Button
            onPress={this.props.done}
            mode="outlined"
            // color="#f1d4d4"
            color="rgb(100,198,247)"
            style={{ width: 120 }}
          >
            Done
          </Button>
          <Button
            onPress={() => {
              this.props.next(this.state.value);
              this.setState({ value: "unchecked" });
            }}
            mode="contained"
            // color="#f1d4d4"
            color="rgb(100,198,247)"
            style={{ width: 120 }}
          >
            Next
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
    color: "white",
  },
});
