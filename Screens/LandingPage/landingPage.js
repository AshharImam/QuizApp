import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import queryString from "query-string";

const { width, height } = Dimensions.get("window");

class LandingPage extends Component {
  constructor() {
    super();
    this.formatDateTime = this.formatDateTime.bind(this);
    this.state = {
      url: "",
    };
  }

  formatDateTime(date) {
    const _date = date.getDate();
    const _month = date.getMonth() + 1;
    const _year = date.getFullYear();
    const _hour = date.getHours();
    const _minute = date.getMinutes();
    const _seconds = date.getSeconds();
    return `${_year}${_month < 10 ? "0" + _month : _month}${
      _date < 10 ? "0" + _date : _date
    }${_hour < 10 ? "0" + _hour : _hour}${
      _minute < 10 ? "0" + _minute : _minute
    }${_seconds < 10 ? "0" + _seconds : _seconds}`;
  }

  // payment() {
  //   const nowDate = new Date(); //Date Now
  //   const pp_Amount = "100";
  //   const pp_BillReference = "billRef";
  //   const pp_Description = "Description of transaction";
  //   const pp_Language = "EN";
  //   const pp_MerchantID = "MC13259";
  //   const pp_Password = "3x89vs3gxx";
  //   const pp_ReturnURL =
  //     "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Purchase/PAY";
  //   const pp_ver = "1.1";
  //   const pp_TxnCurrency = "PKR";
  //   const pp_TxnDateTime = this.formatDateTime(nowDate);
  //   // const pp_TxnDateTime = `20201208153253`;
  //   nowDate.setDate(nowDate.getDate() + 1); // Expire date and time ( increasing a day)
  //   const pp_TxnExpiryDateTime = this.formatDateTime(nowDate);
  //   // const pp_TxnExpiryDateTime = "20170609114800";
  //   const pp_TxnRefNo = `T${pp_TxnDateTime}`;
  //   // const pp_TxnRefNo = `T20201208153208`;
  //   const pp_CustomerCardNumber = "5366190033463817";
  //   const pp_CustomerCardExpiry = "0924";
  //   const pp_CustomerCardCvv = "306";
  //   const pp_TxnType = "MPAY";
  //   const pp_IntegeritySalt = "sg92502998";
  //   const pp_Frequency = "SINGLE";
  //   const bigData = `${pp_IntegeritySalt}&${pp_Amount}&${pp_BillReference}&${pp_CustomerCardCvv}&${pp_CustomerCardExpiry}&${pp_CustomerCardNumber}&${pp_Description}&${pp_Frequency}&${pp_Language}&${pp_MerchantID}&${pp_Password}&${pp_TxnCurrency}&${pp_TxnDateTime}V${pp_TxnExpiryDateTime}&${pp_TxnRefNo}&${pp_TxnType}&${pp_ver}`;

  //   const key = unescape(encodeURIComponent(pp_IntegeritySalt));
  //   const bytes = unescape(encodeURIComponent(bigData));
  //   // const key = unescape(encodeURIComponent("0F5DD14AE2"));
  //   // const bytes = unescape(
  //   //   encodeURIComponent("0F5DD14AE2&2995&MER123&A48cvE28")
  //   // );

  //   (async (key, bytes) => {
  //     const hmac = CryptoES.algo.HMAC.create(CryptoES.algo.SHA256, key);
  //     hmac.update(bytes);
  //     const hash = hmac.finalize();
  //     // console.log("Digest: ", hash.toString());
  //     console.log(hash.toString(CryptoES.enc.Hex));

  //     const req = await fetch(pp_ReturnURL, {
  //       method: "POST",
  //       body: {
  //         pp_Version: pp_ver,
  //         pp_TxnType: pp_TxnType,
  //         pp_TxnRefNo: pp_TxnRefNo,
  //         pp_MerchantID: pp_MerchantID,
  //         pp_Password: pp_MerchantID,
  //         pp_Amount: pp_Password,
  //         pp_TxnCurrency: pp_TxnCurrency,
  //         pp_TxnExpiryDateTime: pp_TxnExpiryDateTime,
  //         pp_BillReference: pp_BillReference,
  //         pp_Description: pp_Description,
  //         pp_CustomerCardNumber: pp_CustomerCardNumber,
  //         pp_CustomerCardExpiry: pp_CustomerCardExpiry,
  //         pp_CustomerCardCvv: pp_CustomerCardCvv,
  //         pp_SecureHash: hash.toString(CryptoES.enc.Hex),
  //         pp_Frequency: pp_Frequency,
  //         pp_TxnDateTime: pp_TxnDateTime,
  //       },
  //     });

  //     req.json().then((res) => console.log(res));

  //     /* Some crypto operation... */
  //   })(key, bytes);
  //   console.log("sad");
  //   // const hash = crypto.createHmac("sha256", key).update(bytes).digest("hex");
  //   // console.log(hash);
  // }

  payment() {
    fetch("https://sandbox.api.getsafepay.com/order/v1/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: "sec_0400d1f7-542e-4af3-81ac-6c588b7a79df",
        amount: 1.0,
        currency: "PKR",
        environment: "sandbox",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const params = {
          env: "sandbox",
          beacon: json["data"]["token"],
          order_id: `T${this.formatDateTime(new Date())}`,
          source: "mobile",
        };

        const qs = queryString.stringify(params);
        const baseURL =
          process.env.ENVIRONMENT === "PRODUCTION"
            ? "https://api.getsafepay.com/components"
            : "https://sandbox.api.getsafepay.com/components";
        const url = `${baseURL}?${qs}`;
        console.log("url>>", url);
        this.props.navigation.navigate("PaymentScreen", {
          url: url,
        });

        // console.log(json["data"]["token"]);
      });
  }

  // "pp_Version": "1.1",
  //   "pp_InstrToken": "",
  //   "pp_TxnType": "MPAY",
  //   "pp_TxnRefNo": "T20201208153208",
  //   "pp_MerchantID": "MC13259",
  //   "pp_Password": "3x89vs3gxx",
  //   "pp_Amount": "100",
  //   "pp_TxnCurrency": "PKR",
  //   "pp_TxnExpiryDateTime": "20170609114800",
  //   "pp_BillReference": "billRef",
  //   "pp_Description": "Description of transaction",
  //   "pp_CustomerCardNumber": "5366190033463817",
  //   "pp_CustomerCardExpiry": "0924",
  //   "pp_CustomerCardCvv": "306",
  //   "pp_SecureHash": "AB5B84EF705CAD1055DC85FC780733551E39CE865BAC41B0FCB8179B5085BBA6",
  //   "pp_Frequency": "SINGLE",
  //   "pp_TxnDateTime": "20201208153253"

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 270,
          }}
        >
          <Image
            source={require("./logo.jpg")}
            style={{ resizeMode: "center" }}
          />
        </View>

        <View style={{ marginVertical: 100, marginHorizontal: 50 }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            The Quiz App
          </Text>
          <Text
            style={{
              fontSize: 14,
              alignItems: "center",
              textAlign: "center",
              paddingVertical: 10,
              paddingBottom: 20,
            }}
          >
            with love : Wayne Managment Institue
          </Text>

          <View style={{ paddingVertical: 30 }}>
            <Button
              mode="contained"
              theme={{ colors: { text: "white" } }}
              color="#f1d4d4"
              onPress={() => this.props.navigation.navigate("DemoQuestions")}
            >
              Try the demo quiz
            </Button>
          </View>

          <Button
            icon="crown"
            mode="contained"
            color="#f1d4d4"
            onPress={() => this.props.navigation.navigate("SignUp")}
            // onPress={() => this.payment()}
          >
            get the best questions
          </Button>
        </View>
      </View>
    );
  }
}

export default LandingPage;
