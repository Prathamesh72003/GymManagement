import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace("Login");
  }, 2500);

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
