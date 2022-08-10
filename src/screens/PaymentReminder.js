import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Avatar } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PaymentReminder = ({ navigation }) => {
  const [phoneNOList, setPhoneNOList] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [availableCredits, setAvailableCredits] = useState();
  const [requiredCredits, setRequiredCredits] = useState();
  const [gymName, setGymName] = useState();
  const [canSend, setCanSend] = useState(false);
  const [dueMembers, setDueMembers] = useState([]);

  const [message, setMessage] = useState("");
  const [previewMessage, setPreviewMessage] = useState(
    "Hi dear customer, \nthis message is from (your gym name), \nYou have a due of Rs. XXX. Please pay it as soon as possible"
  );

  useEffect(() => {
    preprocess();
  }, []);

  const preprocess = async () => {
    setInitializing(true);

    const value = await AsyncStorage.getItem("GYM");
    await firestore()
      .collection("GYM")
      .doc(value)
      .get()
      .then((result) => {
        if (
          result._data.plan_type == "Annual" ||
          result._data.plan_type == "HalfYearly"
        ) {
          var available_credits = result._data.msg_credits;

          setAvailableCredits(available_credits);
          setGymName(result._data.gymname);
          setCanSend(true);

          preparePhoneList();
        } else {
          setCanSend(false);
          ToastAndroid.show(
            "To send reminder message upgrade to annual or half yearly plan",
            ToastAndroid.SHORT
          );
          setInitializing(false);
        }
      });
  };

  const preparePhoneList = async () => {
    // updating value in firebase
    const value = await AsyncStorage.getItem("GYM");
    //   var new_credits = availableCredits - requiredCredits;
    //   var numbers = phoneNOList;
    const members = await firestore()
      .collection("GYM")
      .doc(value)
      .collection("MEMBERS")
      .get();

    const membersArray = members.docs;
    var dueMemberArray = [];

    membersArray.map((member) => {
      member = member._data;
      var id = member.id;
      var name = member.name;
      var phone_no = member.phone_no;
      var due_amount = 0;
      member.plans.map((plan) => {
        plan = JSON.parse(plan);

        due_amount +=
          parseInt(plan.amount) -
          parseInt(plan.amountPaid) -
          parseInt(plan.discount);
      });

      member.service.map((ser) => {
        ser = JSON.parse(ser);
        due_amount +=
          parseInt(ser.amount) -
          parseInt(ser.discount) -
          parseInt(ser.amountPaid);
      });

      if (due_amount > 0) {
        dueMemberArray.push({
          id,
          name,
          due_amount,
          phone_no,
        });
      }
    });

    console.log(dueMemberArray);
    setDueMembers(dueMemberArray);
    setRequiredCredits(dueMemberArray.length);
    setInitializing(false);
  };

  const sendReminder = async () => {
    setInitializing(true);

    var gym_name = gymName; // use this to let user know from which gym message is from
    // const numbers = phoneNOList.join(",");
    dueMembers.map((member) => {
      const url =
        " https://www.fast2sms.com/dev/bulkV2?authorization=XbZW1luNkpaLDq5oVFnxyAmr07evi3P6dG8SEw2MUBIg9tzsRKSfxKcgAOH0bm9JC4MownkR3YdyI8Pe&route=v3&sender_id=FTWSMS&message=" +
        gym_name +
        ", " +
        "You have a due of Rs." +
        member.due_amount +
        " , Please pay it as soon as possible" +
        "&language=english&flash=0&numbers=" +
        member.phone_no.slice(2);

      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const value = await AsyncStorage.getItem("GYM");
    var new_credits = availableCredits - requiredCredits;
    // var numbers = phoneNOList;
    await firestore().collection("GYM").doc(value).update({
      msg_credits: new_credits,
    });
    ToastAndroid.show(
      "Payment reminder successfully send!",
      ToastAndroid.SHORT
    );

    setInitializing(false);
    navigation.replace("PaymentReminder");
  };

  const buyCredits = async () => {
    Linking.openURL(
      "whatsapp://send?text=Hello , this message is related to buying credits&phone=" +
        918080259833
    );
  };

  if (initializing) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {canSend && requiredCredits < availableCredits ? (
        <>
          <Text style={styles.text}>Message send would be like this</Text>
          <Text style={styles.preview}>{previewMessage}</Text>
          <Text style={styles.text}>
            Total message would be send {requiredCredits}
          </Text>
          <Text style={styles.textSmall}>
            After this transcation you will have{" "}
            {availableCredits - requiredCredits} message credits
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              sendReminder();
            }}
          >
            <Text style={styles.btnText}>Send reminder</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.preview}>
            You don't have enough credits to send this message. Either buy
            credits or upgrade your plan
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                buyCredits();
              }}
            >
              <Text style={styles.btnText}>Buy credits</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Subscription");
              }}
            >
              <Text style={styles.btnText}>Upgrade plan</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default PaymentReminder;

const styles = StyleSheet.create({
  container: { height: "100%", padding: 20, backgroundColor: "#fff" },
  preview: {
    fontSize: 16,
    marginVertical: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  textSmall: {
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#000",
    borderRadius: 15,
    marginRight: 20,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
