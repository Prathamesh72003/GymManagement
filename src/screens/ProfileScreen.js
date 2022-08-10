import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  ImageBackground,
  ToastAndroid,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Avatar } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import XLSX from "xlsx";
import RNFS from "react-native-fs";

const ProfileScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const value = await AsyncStorage.getItem("GYM");

    firestore()
      .collection("GYM")
      .doc(value)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log('User data: ', documentSnapshot.data());
          var expiry_date = documentSnapshot.data().expiry_date;

          var date = new Date(Date.UTC(1970, 0, 1)); // Epoch
          date.setUTCSeconds(expiry_date.seconds);

          date =
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();
          setProfileData({
            gymname: documentSnapshot.data().gymname,
            ownername: documentSnapshot.data().owner,
            phone: documentSnapshot.data().phone,
            email: documentSnapshot.data().email,
            totalServices: documentSnapshot.data().services,
            totalPlans: documentSnapshot.data().plans,
            totalMembers: documentSnapshot.data().members,
            expiryDate: date,
            planType: documentSnapshot.data().plan_type,
          });
        }
        setInitializing(false);
      });
  }

  const onRefresh = React.useCallback(() => {
    setInitializing(true);
    fetchData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("GYM");
    navigation.replace("Login");
  };

  const exportDataToExcel = async () => {
    setInitializing(true);
    // Created Sample data
    // let sample_data_to_export = [
    //   { id: "1", name: "First User" },
    //   { id: "2", name: "Second User" },
    // ];
    const value = await AsyncStorage.getItem("GYM");

    const members = await firestore()
      .collection("GYM")
      .doc(value)
      .collection("MEMBERS")
      .get();
    var membersArray = members.docs;

    var data = [];
    membersArray.map((member) => {
      data.push({
        id: member._data.id,
        name: member._data.name,
        phone_no: member._data.phone_no,
        email_id: member._data.email_id,
        dob: member._data.dob,
        address: member._data.address,
        injury: member._data.injury,
      });
    });

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(
      RNFS.ExternalStorageDirectoryPath + "/Members - (Digi Eegistry).xlsx",
      wbout,
      "ascii"
    )
      .then((r) => {
        ToastAndroid.show(
          "File downloaded successfully! check in your file manager",
          ToastAndroid.LONG
        );
      })
      .catch((e) => {
        ToastAndroid.show(
          "Error occurred while downloading file " + e,
          ToastAndroid.LONG
        );
        console.log("Error", e);
      });
    setInitializing(false);
  };

  const share = async () => {
    try {
      const result = await Share.share({
        title: "App link",
        message:
          "Hey there checkout this amazing management app I found! , AppLink: https://github.com/somesh4545/GYM/blob/main/README.md",
        url: "https://github.com/somesh4545/GYM/blob/main/README.md",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
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
      refreshControl={
        <RefreshControl refreshing={initializing} onRefresh={onRefresh} />
      }
    >
      <View styles={styles.container}>
        <ImageBackground
          source={{
            uri: "https://media.istockphoto.com/vectors/football-championship-background-vector-id540383298?k=20&m=540383298&s=612x612&w=0&h=Eh4Ie-Ki_a0aOhUw7D3R7qrIa40LhGzq76mkqzzczwA=",
          }}
          resizeMode="cover"
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={{ color: "#ddd" }}>Pull to load changes</Text>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.upperConatiner}>
            <View style={styles.ImageNdName}>
              <Avatar.Image
                style={styles.avatar}
                size={65}
                source={require("../assets/user.png")}
              />
              <View style={styles.TileSubtitle}>
                <Text style={styles.GymName}>{profileData.gymname}</Text>
                <Text style={styles.OwnerName}>{profileData.ownername}</Text>
                <Text style={{ fontSize: 17 }}>
                  Plan type: {profileData.planType}
                </Text>
                <Text style={{ fontSize: 17 }}>
                  Plan expiry: {profileData.expiryDate}
                </Text>
              </View>
            </View>
            <View style={styles.contactInfo}>
              <View style={styles.contactCard}>
                <FontAwesome5
                  style={styles.contactSymbol}
                  name="phone"
                  size={20}
                  color={"#000"}
                />
                <Text style={styles.phoneNumber}>{profileData.phone}</Text>
              </View>
              <View style={styles.contactCard}>
                <FontAwesome5
                  style={styles.contactSymbol}
                  name="envelope"
                  size={20}
                  color={"#000"}
                />
                <Text style={styles.emailId}>{profileData.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.components}>
              <TouchableOpacity>
                <View style={styles.card}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#2f50c9",
                    }}
                  >
                    {profileData.totalMembers}
                  </Text>
                  <Text style={styles.componentText}>Members</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#2f50c9",
                    }}
                  >
                    {profileData.totalPlans}
                  </Text>
                  <Text style={styles.componentText}>Plans</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.card}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#2f50c9",
                    }}
                  >
                    {profileData.totalServices}
                  </Text>
                  <Text style={styles.componentText}>Services</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.LowerContainer}>
            <View style={styles.TabList}>
              {/* <TouchableOpacity>
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="download" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Download members list</Text>
                  </View>
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => {
                  ToastAndroid.show("In progress", ToastAndroid.LONG);
                }}
              >
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="sms" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Make announcement</Text>
                  </View>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PaymentReminder");
                }}
              >
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5
                      name="money-bill"
                      size={22}
                      color={"#2f50c9"}
                    />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Send payment reminder</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  exportDataToExcel();
                }}
              >
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="download" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Download members</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  share();
                }}
              >
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="bullhorn" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Tell a friend</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Subscription");
                }}
              >
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="wallet" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Upgrade subscription</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://youtube.com")}
              >
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="question" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>
                      How to use digi registry
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5 name="info" size={22} color={"#2f50c9"} />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>
                      FAQ ( issues and queries )
                    </Text>
                  </View>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={logout}>
                <View style={styles.listItem}>
                  <View style={styles.Icon}>
                    <FontAwesome5
                      name="sign-out-alt"
                      size={22}
                      color={"#2f50c9"}
                    />
                  </View>
                  <View style={styles.ListTextContainer}>
                    <Text style={styles.ListText}>Logout</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f50c9",
  },
  header: {
    backgroundColor: "#2f50c9",
    // backgroundColor: '#04080F',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
    height: "100%",
    marginTop: -30,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
  },
  upperConatiner: {
    padding: 20,
  },
  ImageNdName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {},
  TileSubtitle: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
  },
  GymName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  OwnerName: {},
  contactInfo: {
    padding: 20,
    marginTop: 5,
  },
  contactCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactSymbol: {
    marginRight: 10,
    opacity: 0.5,
  },
  phoneNumber: {
    opacity: 0.5,
    color: "#000",
  },
  emailId: {
    opacity: 0.5,
  },

  middleContainer: {
    backgroundColor: "#fff",
    marginTop: -20,
    borderRadius: 30,
    padding: 25,
    marginHorizontal: 20,
    elevation: 5,
  },
  components: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  componentText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  LowerContainer: {
    padding: 20,
    marginTop: 10,
    marginBottom: 70,
    // backgroundColor: '#F3F3F3',
  },
  TabList: {},
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    padding: 10,
    // backgroundColor: 'grey'
  },
  Icon: {},
  ListTextContainer: {
    marginLeft: 20,
  },
  ListText: {
    color: "#000",
    fontSize: 18,
    // fontWeight: "bold",
  },
});
