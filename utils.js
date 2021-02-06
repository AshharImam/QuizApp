import { Dimensions, PixelRatio } from "react-native";

let { width, height } = Dimensions.get("window");

const widthToDp = (widthNumber) => {
  let widthRate =
    typeof widthNumber === "number" ? widthNumber : parseFloat(widthNumber);

  return PixelRatio.roundToNearestPixel((width * widthRate) / 100);
};

const heightToDp = (heightNumber) => {
  let heightRate =
    typeof heightNumber === "number" ? heightNumber : parseFloat(heightNumber);

  return PixelRatio.roundToNearestPixel((height * heightRate) / 100);
};

export { widthToDp, heightToDp };
