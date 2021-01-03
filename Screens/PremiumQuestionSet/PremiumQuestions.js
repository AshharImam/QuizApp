import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";

class PremiumQuestionSet extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./logo.jpg")}
            style={{ resizeMode: "center" }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            paddingHorizontal: 10,
            paddingTop: 0,
            fontWeight: "bold",
          }}
        >
          We designed 5 sets of quality questions just for you.
        </Text>
        <Button
          icon="book"
          mode="contained"
          onPress={() =>
            this.props.navigation.navigate("PremiumQuestionTest", { set: 1 })
          }
          style={{ marginVertical: 15 }}
          color="#ea2c62"
        >
          Question Set 1
        </Button>

        <Button
          icon="book"
          mode="contained"
          onPress={() =>
            this.props.navigation.navigate("PremiumQuestionTest", { set: 2 })
          }
          style={{ marginVertical: 15 }}
          color="#ea2c62"
        >
          Question Set 2
        </Button>

        <Button
          icon="book"
          mode="contained"
          onPress={() =>
            this.props.navigation.navigate("PremiumQuestionTest", { set: 3 })
          }
          style={{ marginVertical: 15 }}
          color="#ea2c62"
        >
          Question set 3
        </Button>

        <Button
          icon="book"
          mode="contained"
          onPress={() =>
            this.props.navigation.navigate("PremiumQuestionTest", { set: 4 })
          }
          style={{ marginVertical: 15 }}
          color="#ea2c62"
        >
          Question set 4
        </Button>

        <Button
          icon="book"
          mode="contained"
          onPress={() =>
            this.props.navigation.navigate("PremiumQuestionTest", { set: 5 })
          }
          style={{ marginVertical: 15 }}
          color="#ea2c62"
        >
          Question set 5
        </Button>
      </View>
    );
  }
}
export default PremiumQuestionSet;
