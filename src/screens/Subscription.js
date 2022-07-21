import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import React, {useState} from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  RadioButton,
} from "react-native-paper";

const Subscription = () => {

  const [plan, setPlan] = useState(12)

  // const PlanPrice = () => {
  //   if (plan == 12) {
  //     setPrice(12000);
  //   }else if(plan == 6){
  //     setPrice(6000);
  //   }else if(plan == 1){
  //     setPrice(200);
  //   }
  // }

  const Payment = () => {
    if (plan == null) {
      ToastAndroid.show(
        "Select a plan",
        ToastAndroid.SHORT,
      );
    }else{
      ToastAndroid.show(
        "Proccessing a payment for the "+plan+" months",
        ToastAndroid.SHORT,
      );
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.TitleText}>Be the part of huge community!</Text>
        <Text style={styles.SubtitleText}>
          Various plans with various features.
        </Text>
      </View>

      <View style={styles.MiddleContainer}>
        <View style={styles.cardsContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPlan(12)} style={[styles.Card,{ borderWidth: plan == 12 ? 4 : 0, borderColor: plan == 12 ? 'green' : 'grey',elevation: plan == 12 ? 5 : 2}]}>
            <Card>
              <Card.Title
                title="Rs. 12000"
                subtitle="Yearly Subscription"
                // left={LeftContent}
              />
              <Card.Content>
                <View style={styles.features}>
                  <FlatList
                    data={[
                      { key: "Cardio" },
                      { key: "Swimming" },
                      { key: "Weightlifting" },
                    ]}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {"✔️" + " "}
                        {item.key}
                      </Text>
                    )}
                  />
                  <FlatList
                    data={[
                      { key: "Cardio" },
                      { key: "Swimming" },
                      { key: "Weightlifting" },
                    ]}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {"✔️" + " "}
                        {item.key}
                      </Text>
                    )}
                  />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPlan(6)} style={[styles.Card,{ borderWidth: plan == 6 ? 4 : 0, borderColor: plan == 6 ? 'green' : 'grey',elevation: plan == 6 ? 5 : 2}]}>
            <Card>
              <Card.Title
                title="Rs. 600"
                subtitle="Half year subscription"
                // left={LeftContent}
              />
              <Card.Content>
                <View style={styles.features}>
                  <FlatList
                    data={[
                      { key: "Cardio" },
                      { key: "Swimming" },
                      { key: "Weightlifting" },
                    ]}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {"✔️" + " "}
                        {item.key}
                      </Text>
                    )}
                  />
                  <FlatList
                    data={[
                      { key: "Cardio" },
                      { key: "Swimming" },
                      { key: "Weightlifting" },
                    ]}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {"❌" + " "}
                        {item.key}
                      </Text>
                    )}
                  />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPlan(1)} style={[styles.Card,{ borderWidth: plan == 1 ? 4 : 0, borderColor: plan == 1 ? 'green' : 'grey', elevation: plan == 1 ? 5 : 2}]}>
            <Card>
              <Card.Title
                title="Rs. 200"
                subtitle="One month subscription"
                // left={LeftContent}
              />
              <Card.Content>
                <View style={styles.features}>
                  <FlatList
                    data={[
                      { key: "Cardio" },
                      { key: "Swimming" },
                      { key: "Weightlifting" },
                    ]}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {"✔️" + " "}
                        {item.key}
                      </Text>
                    )}
                  />
                  <FlatList
                    data={[
                      { key: "Cardio" },
                      { key: "Swimming" },
                      { key: "Weightlifting" },
                    ]}
                    renderItem={({ item }) => (
                      <Text style={styles.item}>
                        {"❌" + " "}
                        {item.key}
                      </Text>
                    )}
                  />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Button
          style={styles.PurchaseButton}
          mode="contained"
          onPress={() => Payment()}
        >
          Buy Subscription
        </Button>
        
      </View>
    </View>
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
    display: "flex",
    flexDirection: "row",
  },
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  PurchaseButton: {
    width: "100%",
    backgroundColor: "#2f50c9"
  },
});
