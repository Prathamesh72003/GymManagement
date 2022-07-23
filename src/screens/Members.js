import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import { FAB, Provider } from "react-native-paper";
import MemberCard from "./../components/MemberCard";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  {
    id: 1,
    gender: "male",
    name: "john",
    plan: "12 month",
    planExpiry: "21st june",
    dueAmount: 100,
    phoneNumber: "808025983",
  },
  {
    id: 2,
    gender: "female",
    name: "bob",
    plan: "4 month",
    planExpiry: "21st june",
    dueAmount: 0,
    phoneNumber: "808025983",
  },
];

const Members = ({ route, navigation }) => {
  const [membersData, setMembersData] = useState([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    console.log(route.params);
    if (route.params == null) {
      getMembers();
    } else {
      setMembersData(route.params.membersData);
      setInitializing(false);
    }
  }, []);

  const getMembers = async () => {
    try {
      const value = await AsyncStorage.getItem("GYM");

      const membersList = [];
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
              dob
            } = doc.data();
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
              dob
            });
          });
        });
      setMembersData(membersList);
      setInitializing(false);
    } catch (error) {
      console.log("eee" + error);
    }
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      styles={styles.container}
    >
      <Provider>
        <View style={styles.body}>
          {membersData.length == 0 ? (
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
            membersData.map((item) => {
              console.log(item.name);
              return <MemberCard key={item.id} data={item} />;
            })
          )}

          <FAB
            color={"#fff"}
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate("AddMember")}
          />
        </View>
      </Provider>
    </ScrollView>
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 20,
    bottom: 30,
    backgroundColor: "#2f50c9",
  },
});
