import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import { FAB } from "react-native-paper";
import PlanCard from "../components/PlanCard";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const data = [
  {
    id: 1,
    name: "1 month",
    amount: "200",
    durationType: "Month",
    duration: "1",
  },
  {
    id: 2,
    name: "Expiremental",
    amount: "400",
    durationType: "Days",
    duration: "10",
  },
];

const Plans = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState("");
  const [plans, setPlans] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const getPlans = async () => {
    try {
      const planList = [];
      await firestore()
        .collection("GYM")
        .doc(user.email)
        .collection("PLANS")
        .get()
        .then((result) => {
          result.forEach((doc) => {
            const { plan, durationType, months, amount } = doc.data();
            planList.push({
              plan,
              durationType,
              months,
              amount,
            });
          });
        });
      setPlans(planList);
    } catch (error) {
      console.log("eee" + error);
    }
  };

  getPlans();

  if (initializing) return null;

  if (!user) {
    return navigation.replace("Login");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      styles={styles.container}
    >
      <View style={styles.body}>
        {plans.map((item, index) => {
          return <PlanCard key={index} data={item} />;
        })}
        <FAB
          color={"#fff"}
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate("AddPlan")}
        />
      </View>
    </ScrollView>
  );
};

export default Plans;

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
