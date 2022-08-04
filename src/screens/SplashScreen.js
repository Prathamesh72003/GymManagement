import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";

import LottieView from "lottie-react-native";
import firestore from "@react-native-firebase/firestore";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const value = await AsyncStorage.getItem("GYM");
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        ToastAndroid.show(
          "You are Offline, please check your internet connection!",
          ToastAndroid.LONG
        );
      } else {
        if (value != null) {
          var today = new Date();
          firestore()
            .collection("GYM")
            .doc(value)
            .get()
            .then((data) => {
              var expiry_date = new Date(Date.UTC(1970, 0, 1)); // Epoch
              expiry_date.setUTCSeconds(data._data.expiry_date.seconds);
              if (expiry_date < today) {
                ToastAndroid.show(
                  "Your plan has expired please renew it",
                  ToastAndroid.LONG
                );
                setTimeout(() => {
                  navigation.replace("Subscription");
                }, 1000);
              } else {
                setTimeout(() => {
                  navigation.replace("Home");
                }, 1000);
              }
            });
        } else {
          setTimeout(() => {
            navigation.replace("Login");
          }, 2000);
        }
      }
    });
  };

  return (
    <View style={styles.containerr}>
      <LottieView
        source={require("../assets/splash.json")}
        autoPlay
        resizeMode="cover"
        style={{
          // width: Dimensions.get("window").width,
          // height: Dimensions.get("window").height,
          display: "flex",
          flexGrow: 1,
        }}
        loop={false}
      />

      <LottieView
        source={require("../assets/watersplash.json")}
        autoPlay
        style={{ position: "absolute", width: 350, height: 350 }}
        loop={false}
      />
      <Image
        style={styles.AppName}
        source={require("../assets/LogoName.png")}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  containerr: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  AppName: {
    position: "absolute",
    height: 80,
  },
});
