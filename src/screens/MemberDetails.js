import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const MemberDetails = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.MainContainer}>
        <View style={styles.UpperContainer}>
          <View style={styles.ImageName}>
            <View style={styles.MemberImage}>
              <Image
                style={styles.avatar}
                source={require("../assets/member.png")}
              />
            </View>
            <View style={styles.MemberInfo}>
              <Text style={styles.MemberName}>Prathamesh</Text>
              <Text style={styles.MemberContact}>7843087679</Text>
              <Text numberOfLines={1} style={styles.MemberContact}>pthakare72003@gmail.com</Text>
            </View>
          </View>

          <View style={styles.CounterInfo}>
            <View style={styles.Counter}>
              <Text style={styles.CounterCount}>21</Text>
              <Text style={styles.CounterName}>Days remaining</Text>
            </View>
            <View style={styles.Counter}>
              <Text style={styles.CounterCount}>17</Text>
              <Text style={styles.CounterName}>Attendence</Text>
            </View>
          </View>
        </View>

        <View style={styles.MiddleContainer}>
          <Text style={styles.MiddleTitle}>Plans and Services</Text>
        </View>
        <View style={styles.LowerContainer}></View>
      </View>
    </ScrollView>
  );
};

export default MemberDetails;

const styles = StyleSheet.create({
  MainContainer: {
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 20
  },
  UpperContainer: {
    display: "flex",
    flexDirection: "row",
  },
  ImageName: {
    width: 130,
    overflow: "hidden"
  },
  MemberImage:{
  },
  avatar: {
    width: 130,
    height: 150,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  MemberInfo: {
    marginTop: 10,
  },
  MemberName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  MemberContact: {
    fontSize: 12,
    opacity: 0.7,
  },
  CounterInfo: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10
  },
  Counter: {
    display: "flex",
    alignItems: "center",
  },
  CounterCount: {},
  CounterName: {},
  MiddleContainer: {
    marginTop: 20
  },
  MiddleTitle:{
    fontSize: 20,
    color: 'black',
    fontWeight: "bold"
  },
  LowerContainer: {},
});
