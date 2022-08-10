import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TextInput, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const EditMember = ({ route, navigation }) => {
  const { data } = route.params;

  const [userName, setUserName] = useState(data.name);
  const [email, setEmail] = useState(data.email_id);
  const [gender, setGender] = useState(data.gender);
  const [phone, setPhone] = useState(data.phone_no);
  const [address, setAddress] = useState(data.address);

  const UpdateData = async() => {

    const value = await AsyncStorage.getItem("GYM");

    if (userName.trim() === "") {
      ToastAndroid.show("Username required", ToastAndroid.SHORT);
    } else {
        try {
            firestore()
              .collection("GYM")
              .doc(value)
              .collection("MEMBERS")
              .doc(data.id)
              .update({
                name: userName,
                email_id: email,
                gender: gender,
                phone_no: phone,
                address: address
              })
              .then(() => {
                console.log("Member profile updated successfully!");
                ToastAndroid.show("Member profile updated successfully!", ToastAndroid.LONG);
                navigation.replace("Members")
              });
          } catch (error) {
            console.log(error);
          }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="User Name"
                value={userName}
                onChangeText={(text) => setUserName(text)}
                // mode="outlined"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="Phone"
                keyboardType="numeric"
                value={phone}
                maxLength={10}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inoutHeader}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  onPress={() => setGender("male")}
                  style={[
                    styles.boxContainer,
                    {
                      backgroundColor: gender == "male" ? "#2f70c9" : "#fff",
                      color: gender == "male" ? "#fff" : "#000",
                    },
                  ]}
                >
                  <View style={styles.box}>
                    <FontAwesome5
                      name="male"
                      size={18}
                      color={gender == "male" ? "#fff" : "#000"}
                    />
                    <Text style={{ color: gender == "male" ? "#fff" : "#000" }}>
                      Male
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.boxContainer,
                    {
                      backgroundColor: gender == "female" ? "#2f70c9" : "#fff",
                      color: gender == "male" ? "#fff" : "#000",
                    },
                  ]}
                  onPress={() => setGender("female")}
                >
                  <View style={styles.box}>
                    <FontAwesome5
                      name="female"
                      size={18}
                      color={gender == "female" ? "#fff" : "#000"}
                    />
                    <Text
                      style={{ color: gender == "female" ? "#fff" : "#000" }}
                    >
                      Female
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.saveBtnContainer}
              onPress={() => {UpdateData()}}
            >
              <View style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Update</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  inoutHeader: {
    marginRight: 10,
    color: "#000",
    opacity: 0.6,
  },
  input: {
    flexGrow: 1,
    height: 60,
    // alignSelf: 'stretch',
    // borderBottomWidth: 1,
    fontWeight: "bold",
    color: "#000",
    // width: width-30,
    backgroundColor: "#fff",
    padding: 0,
  },
  saveBtnContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtn: {
    width: 150,
    height: 45,
    backgroundColor: "#2f70c9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    marginTop: 5,
  },
  boxContainer: {
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    // backgroundColor: '#fff',
  },
  box: {
    flex: 1,
    flexDirection: "row",
    width: 80,
    justifyContent: "space-around",
    // justifyContent: 'center',
    alignItems: "center",
  },
});
