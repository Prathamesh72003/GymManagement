import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import Card from "../components/Card";

import { LineChart } from "react-native-chart-kit";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ["Members count"], // optional
};

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: () => "#000",
  labelColor: () => "#000",
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "2",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const HomeScreen = ({ navigation }) => {
  return (
    <View styles={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Universal GYM</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Card
              width={"100%"}
              count={78}
              title={"Members"}
              intent={"Members"}
            />
          </View>
          <View style={styles.row}>
            <Card width={"45%"} count={3} title={"Plans"} intent={"Plans"} />
            <Card
              width={"45%"}
              count={2}
              title={"Services"}
              intent={"Services"}
            />
          </View>
          <View style={styles.chart}>
            <LineChart
              data={data}
              withInnerLines={false}
              withDot={false}
              style={{ borderRadius: 20 }}
              width={Dimensions.get("window").width - 40}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
    fontWeight: "600",
  },
  body: {
    height: "100%",
    padding: 20,
    marginTop: -30,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "space-between",
  },
  chart: {
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
