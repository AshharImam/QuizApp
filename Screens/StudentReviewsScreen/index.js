import { AntDesign } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

var images = {
  img1: require("../../assets/reviews/1.jpeg"),
  img2: require("../../assets/reviews/2.jpeg"),
  img3: require("../../assets/reviews/3.jpeg"),
  img4: require("../../assets/reviews/4.jpeg"),
  img5: require("../../assets/reviews/5.jpeg"),
  img6: require("../../assets/reviews/6.jpeg"),
  img7: require("../../assets/reviews/7.jpeg"),
  img8: require("../../assets/reviews/8.jpeg"),
  img9: require("../../assets/reviews/9.jpeg"),
  img10: require("../../assets/reviews/10.jpeg"),
  img11: require("../../assets/reviews/11.jpeg"),
  img12: require("../../assets/reviews/12.jpeg"),
  img13: require("../../assets/reviews/13.jpeg"),
  img14: require("../../assets/reviews/14.jpeg"),
  img15: require("../../assets/reviews/15.jpeg"),
  img16: require("../../assets/reviews/16.jpeg"),
  img17: require("../../assets/reviews/17.jpeg"),
  img18: require("../../assets/reviews/18.jpeg"),
  img19: require("../../assets/reviews/19.jpeg"),
  img20: require("../../assets/reviews/20.jpeg"),
  img21: require("../../assets/reviews/21.jpeg"),
  img22: require("../../assets/reviews/22.jpeg"),
  img23: require("../../assets/reviews/23.jpeg"),
  img24: require("../../assets/reviews/24.jpeg"),
  img25: require("../../assets/reviews/25.jpeg"),
  img26: require("../../assets/reviews/26.jpeg"),
  img27: require("../../assets/reviews/27.jpeg"),
  img28: require("../../assets/reviews/28.jpeg"),
  img29: require("../../assets/reviews/29.jpeg"),
  img30: require("../../assets/reviews/30.jpeg"),
};

export default function index() {
  //   const [image, setImage] = useState({
  //     img1: require("../../assets/reviews/1.jpeg"),
  //     img2: require("../../assets/reviews/2.jpeg"),
  //     img3: require("../../assets/reviews/3.jpeg"),
  //     img4: require("../../assets/reviews/4.jpeg"),
  //     img5: require("../../assets/reviews/5.jpeg"),
  //     img6: require("../../assets/reviews/6.jpeg"),
  //     img7: require("../../assets/reviews/7.jpeg"),
  //     img8: require("../../assets/reviews/8.jpeg"),
  //     img9: require("../../assets/reviews/9.jpeg"),
  //     img10: require("../../assets/reviews/10.jpeg"),
  //     img11: require("../../assets/reviews/11.jpeg"),
  //     img12: require("../../assets/reviews/12.jpeg"),
  //     img13: require("../../assets/reviews/13.jpeg"),
  //     img14: require("../../assets/reviews/14.jpeg"),
  //     img15: require("../../assets/reviews/15.jpeg"),
  //     img16: require("../../assets/reviews/16.jpeg"),
  //     img17: require("../../assets/reviews/17.jpeg"),
  //     img18: require("../../assets/reviews/18.jpeg"),
  //     img19: require("../../assets/reviews/19.jpeg"),
  //     img20: require("../../assets/reviews/20.jpeg"),
  //     img21: require("../../assets/reviews/21.jpeg"),
  //     img22: require("../../assets/reviews/22.jpeg"),
  //     img23: require("../../assets/reviews/23.jpeg"),
  //     img24: require("../../assets/reviews/24.jpeg"),
  //     img25: require("../../assets/reviews/25.jpeg"),
  //     img26: require("../../assets/reviews/26.jpeg"),
  //     img27: require("../../assets/reviews/27.jpeg"),
  //     img28: require("../../assets/reviews/28.jpeg"),
  //     img29: require("../../assets/reviews/29.jpeg"),
  //     img30: require("../../assets/reviews/30.jpeg"),
  //   });
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          padding: "5%",
          width: "100%",
          marginVertical: "1%",
        }}
      >
        <Text
          style={{
            // color: "white",
            color: "rgb(100,198,247)",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Student Reviews
        </Text>
      </View>

      <FlatList
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{ width: 350, height: 300 }}
            resizeMode="center"
          />
        )}
        data={Object.values(images)}
      />
    </ImageBackground>
  );
}
