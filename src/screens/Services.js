import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from "react-native-paper";
import MemberCard from "../components/MemberCard";
import ServiceCard from "../components/ServiceCard";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const data = [
  {
    id: 1,
    name: "timepass",
    amount: "200",
  },
  {
    id: 2,
    name: "cardio",
    amount: "400",
  },
];

const Services = ({ navigation }) => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);  

    const getServices = async () => {
      try {
        const serviceList = [];
        await firestore()
          .collection("GYM")
          .doc(user.email)
          .collection("SERVICES")
          .get()
          .then((result) => {
            result.forEach((doc) => {
              const { service, amount } = doc.data();
              serviceList.push({
                service,
                amount,
              });
            });
          });
        setServices(serviceList);
      } catch (error) {
        console.log("eee" + error);
      }
    };

    getServices();

   


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
        {services.map((item,index) => {
          return <ServiceCard key={index} data={item} />;
        })}
        <FAB
          color={"#fff"}
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate("AddService")}
        />
      </View>
    </ScrollView>
  );
};

export default Services;

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
