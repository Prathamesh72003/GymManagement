import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

import { FAB, Provider, Modal, Portal } from "react-native-paper";
import MemberCard from "./../components/MemberCard";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const baseUrl = "https://www.fast2sms.com/dev/bulkV2";

const Members = ({ route, navigation }) => {
  const [phoneNOList, setPhoneNOList] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [gymName, setGymName] = useState();
  const [text, setText] = useState("");

  const [availableCredits, setAvailableCredits] = useState();
  const [requiredCredits, setRequiredCredits] = useState();
  const [message, setMessage] = useState("");

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (route.params == null) {
      getMembers();
    } else {
      var phone_list = [];
      route.params.membersData.map((member) =>
        phone_list.push(member.phone_no)
      );
      setPhoneNOList(phone_list);
      setAllUsers(route.params.membersData);
      setFilteredUsers(route.params.membersData);
      setInitializing(false);
    }
  }, []);

  const getMembers = async () => {
    try {
      const value = await AsyncStorage.getItem("GYM");

      const membersList = [];
      const phoneList = [];
      await firestore()
        .collection("GYM")
        .doc(value)
        .collection("MEMBERS")
        .get()
        .then((result) => {
          result.forEach((doc) => {
            const {
              id,
              email_id,
              gender,
              phone_no,
              joining_date,
              plans,
              service,
              name,
              injury,
              address,
              dob,
              profileImg,
            } = doc.data();
            phoneList.push(phone_no);
            membersList.push({
              id,
              email_id,
              gender,
              phone_no,
              joining_date,
              plans,
              service,
              name,
              injury,
              address,
              dob,
              profileImg,
            });
          });
        });
      console.log(phoneList);
      setAllUsers(membersList);
      setFilteredUsers(membersList);
      setPhoneNOList(phoneList);
      setInitializing(false);
    } catch (error) {
      console.log("eee" + error);
    }
  };

  const searchUser = (text) => {
    if (text) {
      const newData = allUsers.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredUsers(newData);
      setSearch(text);
    } else {
      setFilteredUsers(allUsers);
      setSearch(text);
    }
  };

  const showMessageForm = async () => {
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
          var required_credits = phoneNOList.length;
          var available_credits = result._data.msg_credits;
          console.log(available_credits, required_credits);
          setRequiredCredits(required_credits);
          setAvailableCredits(available_credits);
          setGymName(result._data.gymname);

          showModal();
        } else {
          ToastAndroid.show(
            "To send message upgrade to annual or half yearly plan",
            ToastAndroid.LONG
          );
        }
      });

    setInitializing(false);
  };

  const sendMessage = async () => {
    if (message.length != 0) {
      setInitializing(true);
      hideModal();

      // send text message main code here
      var gym_name = gymName; // use this to let user know from which gym message is from
      // const numbers = phoneNOList.join(",");
      var numbers = "";
      phoneNOList.map((num) => {
        numbers += num.slice(2) + ",";
      });
      numbers.slice(0, -1);

      const url =
        " https://www.fast2sms.com/dev/bulkV2?authorization=XbZW1luNkpaLDq5oVFnxyAmr07evi3P6dG8SEw2MUBIg9tzsRKSfxKcgAOH0bm9JC4MownkR3YdyI8Pe&route=v3&sender_id=FTWSMS&message=" +
        gym_name +
        ", " +
        message +
        "&language=english&flash=0&numbers=" +
        numbers;

      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // updating value in firebase
      const value = await AsyncStorage.getItem("GYM");
      var new_credits = availableCredits - requiredCredits;
      await firestore().collection("GYM").doc(value).update({
        msg_credits: new_credits,
      });

      ToastAndroid.show("Message successfully send", ToastAndroid.SHORT);
      setMessage("");
      setInitializing(false);
    } else {
      ToastAndroid.show("Type your message in input field", ToastAndroid.SHORT);
    }
  };

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20 };

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
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        styles={styles.container}
      >
        <Provider>
          <View style={styles.body}>
            <View style={styles.SearchConatiner}>
              <FontAwesome5 name="search" size={18} color={"#000"} />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchUser(text)}
                value={search}
                placeholderTextColor="#000"
                underlineColorAndroid="transparent"
                placeholder="Search User"
              />
            </View>

            {filteredUsers.length == 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  No members found
                </Text>
              </View>
            ) : (
              filteredUsers.map((item) => {
                // console.log(item.name);
                return <MemberCard key={item.id} data={item} />;
              })
            )}
          </View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              {requiredCredits > availableCredits ? (
                <>
                  <Text style={styles.boldText}>
                    You are short of message credits
                  </Text>
                  <Text style={styles.text}>
                    Your available message credits are {availableCredits}
                  </Text>
                  <Text style={styles.text}>
                    You required {requiredCredits} message credits
                  </Text>
                </>
              ) : (
                <>
                  <TextInput
                    multiline
                    placeholder="Type your message max 80 characters"
                    style={styles.input}
                    value={message}
                    maxLength={80}
                    onChangeText={(text) => setMessage(text)}
                  />
                  <Text style={styles.textSmall}>
                    After this transcation you will have{" "}
                    {availableCredits - requiredCredits} message credits
                  </Text>
                </>
              )}
              <View style={styles.modalRow}>
                <TouchableOpacity onPress={() => hideModal()}>
                  <Text>Close</Text>
                </TouchableOpacity>
                {requiredCredits > availableCredits ? (
                  <TouchableOpacity style={styles.modalBtn} onPress={() => {}}>
                    <Text style={{ color: "#fff" }}>Buy credits</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => {
                      sendMessage();
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 18 }}>
                      Send Message
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Modal>
          </Portal>
        </Provider>
      </ScrollView>
      {visible ? null : (
        <>
          <FAB
            color={"#fff"}
            icon="message"
            style={styles.messageBtn}
            onPress={() => showMessageForm()}
          />
          <FAB
            color={"#fff"}
            icon="plus"
            style={styles.addMemberBtn}
            onPress={() => navigation.navigate("AddMember")}
          />
        </>
      )}
    </>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  body: {
    height: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },
  SearchConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#000",
    color: "#000",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    height: 45,
  },
  textInputStyle: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    margin: 5,
    color: "#000",
  },
  messageBtn: {
    position: "absolute",
    margin: 16,
    right: 20,
    bottom: 100,
    backgroundColor: "#000",
  },
  addMemberBtn: {
    position: "absolute",
    margin: 16,
    right: 20,
    bottom: 30,
    backgroundColor: "#2f50c9",
  },
  input: {
    height: 100,
    backgroundColor: "#fff",
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    color: "#000",
    marginBottom: 10,
  },
  modalRow: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2f50c9",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 15,
  },
  textSmall: {
    fontSize: 13,
  },
});
