import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import SplashScreen from "./src/screens/SplashScreen";
import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddService from "./src/screens/AddService";
import AddPlan from "./src/screens/AddPlan";
import QuickActions from "./src/screens/QuickActions";
import Members from "./src/screens/Members";
import Subscription from "./src/screens/Subscription";
import Plans from "./src/screens/Plans";
import Services from "./src/screens/Services";
import AddMember from "./src/screens/AddMember";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavi = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: 'absolute',
          // bottom: 25,
          // left: 20,
          // right: 20,
          // elevation: 8,
          backgroundColor: "#344955",
          // borderRadius: 15,
          // height: 60,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="home" size={22} color={color} />;
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="briefcase" size={22} color={color} />;
          },
        }}
        name="QuickAction"
        component={QuickActions}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="user" size={22} color={color} />;
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddMember">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={TabNavi}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Members"
          component={Members}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Subscription"
          component={Subscription}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Plans"
          component={Plans}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Services"
          component={Services}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="AddService"
          component={AddService}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="AddPlan"
          component={AddPlan}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="AddMember"
          component={AddMember}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
