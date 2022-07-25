import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  RadioButton,
} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const names = [
  "Infinit",
  "Bility",
  "Infinitbility",
  "Infinit",
  "Bility",
  "Infinitbility",
  "Infinit",
  "Bility",
  "Infinitbility",
];

const Subscription = () => {
  const [plan, setPlan] = useState();
  const [price, setPrice] = useState("0");
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const getSubs = async () => {
      const subsList = [];
      await firestore()
        .collection("SUBSCRIPTIONS")
        .get()
        .then((result) => {
          result.forEach((doc) => {
            const { desc, discounted_price, name, org_price,id } = doc.data();
            subsList.push({
              desc,
              discounted_price,
              name,
              org_price,
              id
            });
          });
        });
      setSubs(subsList);
    };

    getSubs();
  }, []);

  const Payment = () => {
    if (plan == null) {
      ToastAndroid.show("Select a plan", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Proccessing a payment for the " + plan + " months",
        ToastAndroid.SHORT
      );
    }
  };
  
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.TitleText}>Be the part of huge community!</Text>
        <Text style={styles.SubtitleText}>
          Various plans with various features.
        </Text>
      </View>

      <View style={styles.MiddleContainer}>
        <View style={styles.cardsContainer}>
          {subs.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => {setPlan(item.id),setPrice(item.discounted_price)}}
                style={[
                  styles.Card,
                  {
                    borderWidth: plan == item.id ? 4 : 0 ,
                    borderColor: plan == item.id ? "green" : "grey",
                    elevation: plan == item.id ? 5 : 2,
                  },
                ]}
              >
                <Card>
                  <Card.Title
                    title={"Rs." + item.discounted_price}
                    subtitle={item.name+" Plan"}
                    // left={LeftContent}
                  />
                  <Card.Content>
                    <View style={styles.features}>
                      {item.desc.map((item1, index) => {
                        return (
                          <Text key={index} numberOfLines={1} style={{width: '50%', marginBottom: 5}}>
                            {"✔️" + " "}
                            {item1}
                          </Text>
                        );
                      })}
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Button
          style={styles.PurchaseButton}
          mode="contained"
          onPress={() => Payment()}
        >
          Checkout Plan
        </Button>

        <Text style={styles.total}>
          Total Rs. {price}
        </Text>
      </View>
    </View>
    </ScrollView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
  },
  headingContainer: {},
  TitleText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  SubtitleText: {
    fontSize: 15,
    marginTop: 5,
  },
  MiddleContainer: {},
  cardsContainer: {},
  Card: {
    marginTop: 20,
    // elevation: 5,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  features: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30, 
    marginBottom: 10, 

  },
  PurchaseButton: {
    backgroundColor: "#2f50c9",
  },
  total:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#2f50c9"
  },
});
