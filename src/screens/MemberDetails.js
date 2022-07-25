import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FloatingAction } from "react-native-floating-action";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const actions = [
  {
    text: "Add Plan",
    icon: <FontAwesome5 name="calendar" size={12} color={"#fff"} />,
    name: "AddPlan",
    position: 1,
  },
  {
    text: "Add Serice",
    icon: <FontAwesome5 name="briefcase" size={12} color={"#fff"} />,
    name: "AddService",
    position: 2,
  },
];

const MemberDetails = ({ route, navigation }) => {
  const [choice, setChoice] = useState("1");
  const [due, setDue] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState("");
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const { data } = route.params;
  console.log(data);

  var date = new Date(Date.UTC(1970, 0, 1)); // Epoch
  date.setUTCSeconds(data.dob.seconds);

  var dob =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  console.log(dob);

  var plan_expiry = "";

  const getPlanExpiry = (latestPlan) => {
    var plan_start = latestPlan.date;
    var duration = parseInt(latestPlan.duration);
    plan_start = new Date(plan_start);

    if (latestPlan.durationType == "Month") {
      plan_expiry = new Date(
        plan_start.setMonth(plan_start.getMonth() + duration)
      );
    } else {
      plan_expiry = new Date(
        plan_start.setDate(plan_start.getDate() + duration)
      );
    }

    plan_expiry =
      plan_expiry.getDate() +
      "/" +
      (plan_expiry.getMonth() + 1) +
      "/" +
      plan_expiry.getFullYear();

    return plan_expiry;
  };

  const banfun = async () => {
    console.log("pressed");
    const value = await AsyncStorage.getItem("GYM");
    try {
      firestore()
        .collection("GYM")
        .doc(value)
        .collection("MEMBERS")
        .doc(data.id)
        .update({
          block: true,
        })
        .then(() => {
          console.log("Blocked");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const PayDue = (plan) => {
    console.log("hi" + plan);
   
  };
  return (
    <View style={{ backgroundColor: "#2f50c9", height: "100%" }}>
      <ScrollView>
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
                <Text numberOfLines={1} style={styles.MemberName}>
                  {data.name}
                </Text>
                <Text style={styles.MemberContact}>{data.phone_no}</Text>
                <Text numberOfLines={1} style={styles.MemberContact}>
                  {data.email_id}
                </Text>
              </View>
            </View>

            <View style={styles.UpperRightContainer}>
              <View style={styles.Details}>
                <Text style={styles.Label}>Injury/Body pain: </Text>
                <Text numberOfLines={1} style={styles.Discription}>
                  {data.injury}
                </Text>
              </View>
              <View style={styles.Details}>
                <Text style={styles.Label}>Gender: </Text>
                <Text style={styles.Discription}>{data.gender}</Text>
              </View>
              <View style={styles.Details}>
                <Text style={styles.Label}>Address: </Text>
                <Text numberOfLines={1} style={styles.Discription}>
                  {data.address}
                </Text>
              </View>
              <View style={styles.Details}>
                <Text style={styles.Label}>DOB: </Text>
                <Text style={styles.Discription}>{data.dob}</Text>
              </View>
              <View style={styles.QuickAction}>
                <TouchableOpacity>
                  <View style={styles.quicktab}>
                    <FontAwesome5 name="envelope" size={22} color={"#2f50c9"} />
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      Message
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.quicktab}>
                    <FontAwesome5 name="phone" size={22} color={"#2f50c9"} />
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      Phone
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.quicktab}>
                    <FontAwesome5 name="marker" size={22} color={"#2f50c9"} />
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      Attendance
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} onPress={() => banfun()}>
                  <View style={styles.quicktab}>
                    <FontAwesome5 name="ban" size={22} color={"#2f50c9"} />
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      Ban
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.MiddleContainer}>
            <Text style={styles.MiddleTitle}>Plans and Services</Text>

            <View style={styles.TabContainer}>
              <View style={styles.Tabs}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setChoice("1")}
                  style={{
                    backgroundColor: choice == "1" ? "#6F84FD" : "#fff",
                    borderRadius: 20,
                    width: 150,
                  }}
                >
                  <Text
                    style={{
                      color: choice == "1" ? "#fff" : "#000",
                      fontSize: 18,
                      textAlign: "center",
                      padding: 5,
                      fontWeight: choice == "1" ? "bold" : "100",
                    }}
                  >
                    Plans
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setChoice("2")}
                  style={{
                    backgroundColor: choice == "2" ? "#6F84FD" : "#fff",
                    borderRadius: 20,
                    width: 150,
                  }}
                >
                  <Text
                    style={{
                      color: choice == "2" ? "#fff" : "#000",
                      fontSize: 18,
                      textAlign: "center",
                      padding: 5,
                      fontWeight: choice == "2" ? "bold" : "100",
                    }}
                  >
                    Services
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {choice == "1" ? (
              <View style={styles.Holder}>
                <View style={styles.cards}>
                  {data.plans.map((item, index) => {
                    var plan = JSON.parse(item);
                    return (
                      <View style={styles.card} key={index}>
                        <View style={styles.AboutPlan}>
                          <Text style={styles.PlanName}>
                            Plan: {plan.plan} Plan
                          </Text>
                          <Text style={styles.PlanAmount}>
                            Price: {plan.amount}
                          </Text>
                        </View>
                        <View style={styles.datesAndPayment}>
                          <View style={styles.PlansInfo}>
                            <Text style={styles.PurchaseDate}>
                              Purchase Date:{" "}
                              {new Date(plan.date).getDate() +
                                "/" +
                                (new Date(plan.date).getMonth() + 1) +
                                "/" +
                                new Date(plan.date).getFullYear()}
                            </Text>
                            <Text style={styles.ExpiryDate}>
                              Expiry Date: {getPlanExpiry(plan)}
                            </Text>
                          </View>
                          <View style={styles.AddPaymentBtn}>
                            <TouchableOpacity
                              style={styles.AddPayment}
                              onPress={() =>
                                PayDue(
                                  plan.amount - plan.discount - plan.amountPaid
                                )
                              }
                            >
                              <Text style={styles.AddPaymentText}>
                                Add Payment
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.CostInfo}>
                          <Text style={styles.PaidAmt}>
                            Paid:{" "}
                            {
                              <Text style={{ color: "#90EE90" }}>
                                {plan.amountPaid}
                              </Text>
                            }
                          </Text>
                          <Text style={styles.Discount}>
                            Discount:{" "}
                            {
                              <Text style={{ color: "#fff" }}>
                                {plan.discount}
                              </Text>
                            }
                          </Text>
                          <Text style={styles.DueAmt}>
                            Due:{" "}
                            {
                              <Text style={{ color: "red" }}>
                                {plan.amount - plan.discount - plan.amountPaid}
                              </Text>
                            }
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={styles.Holder}>
                <View style={styles.cards}>
                  {data.service.map((item, index) => {
                    var service = JSON.parse(item);
                    return (
                      <View style={styles.card} key={index}>
                        <View style={styles.AboutPlan}>
                          <Text style={styles.PlanName}>
                            Service: {service.service} Plan
                          </Text>
                          <Text style={styles.PlanAmount}>
                            Price: {service.amount}
                          </Text>
                        </View>
                        <View style={styles.datesAndPayment}>
                          <View style={styles.PlansInfo}>
                            <Text style={styles.PurchaseDate}>
                              Purchase Date:{" "}
                              {new Date(service.date).getDate() +
                                "/" +
                                (new Date(service.date).getMonth() + 1) +
                                "/" +
                                new Date(service.date).getFullYear()}
                            </Text>
                          </View>
                          <View style={styles.AddPaymentBtn}>
                            <TouchableOpacity
                              style={[{ marginBottom: 10 }, styles.AddPayment]}
                            >
                              <Text style={styles.AddPaymentText}>
                                Add Payment
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.CostInfo}>
                          <Text style={styles.PaidAmt}>
                            Paid:{" "}
                            {
                              <Text style={{ color: "#90EE90" }}>
                                {service.amountPaid}
                              </Text>
                            }
                          </Text>
                          <Text style={styles.Discount}>
                            Discount:{" "}
                            {
                              <Text style={{ color: "#fff" }}>
                                {service.discount}
                              </Text>
                            }
                          </Text>
                          <Text style={styles.DueAmt}>
                            Due:{" "}
                            {
                              <Text style={{ color: "red" }}>
                                {service.amount -
                                  service.discount -
                                  service.amountPaid}
                              </Text>
                            }
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
          <View style={styles.LowerContainer}></View>
        </View>
      </ScrollView>
      <FloatingAction
        actions={actions}
        color={"#000"}
        onPressItem={(name) => {
          {
            name == "AddPlan"
              ? navigation.navigate("AddPlanToMember", { id: data.id })
              : navigation.navigate("AddServiceToMember", { id: data.id });
          }
        }}
      />
    </View>
  );
};

export default MemberDetails;

const styles = StyleSheet.create({
  MainContainer: {
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  UpperContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  ImageName: {
    width: 130,
    overflow: "hidden",
  },
  MemberImage: {},
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
    color: "#2f50c9",
  },
  MemberContact: {
    fontSize: 12,
    opacity: 0.7,
  },
  UpperRightContainer: {
    display: "flex",
    flexDirection: "column",
    paddingRight: 20,
  },

  Details: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginBottom: 5,
  },
  QuickAction: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  quicktab: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#2f50c9",
  },
  Discription: {
    fontSize: 14,
    fontWeight: "bold",
    width: 80,
  },
  MiddleContainer: {},
  MiddleTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginLeft: 20,
  },
  TabContainer: {
    padding: 20,
  },
  Tabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Holder: {
    backgroundColor: "#2f50c9",
    width: width,
    borderTopRightRadius: 50,
    paddingBottom: 20,
  },
  cards: {},
  card: {
    marginTop: 20,
    height: 120,
    width: width - 20,
    overflow: "hidden",
    backgroundColor: "#6F84FD",
    paddingLeft: 20,
    paddingRight: 50,
    paddingTop: 10,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 5,
  },
  AboutPlan: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  PlanName: {
    color: "white",
    fontWeight: "bold",
  },
  PlanAmount: {
    color: "white",
    fontWeight: "bold",
  },
  PlansInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  PurchaseDate: {
    color: "white",
    fontWeight: "bold",
  },
  ExpiryDate: {
    color: "white",
    fontWeight: "bold",
  },
  datesAndPayment: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  AddPaymentBtn: {},
  AddPayment: {
    borderWidth: 1,
    padding: 5,
    borderColor: "white",
    elevation: 1,
  },
  AddPaymentText: {
    textAlign: "right",
    fontSize: 12,
    color: "#90EE90",
    fontWeight: "bold",
  },
  CostInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  PaidAmt: {
    color: "white",
    fontWeight: "bold",
  },
  Discount: {
    color: "white",
    fontWeight: "bold",
  },
  DueAmt: {
    color: "white",
    fontWeight: "bold",
  },
  LowerContainer: {},
 
});
