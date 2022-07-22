import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import { Divider } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";

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

const plansSelectedTable = [
  {
    id: 10,
    durationType: "Month",
    duration: "30 days",
    amount: 400,
    amountPaid: 100,
    discount: 200,
    date: "",
  },
  {
    id: 11,
    memID: 1,
    durationType: "Days",
    duration: "10",
    amount: 50,
    amountPaid: 50,
    date: "",
  },
  {
    id: 12,
    memID: 1,
    durationType: "Days",
    duration: "10",
    amount: 50,
    amountPaid: 0,
    date: "",
  },
];

const servicesSelectedTable = [
  {
    id: 10,
    service: "Cardio",
    amount: 400,
    discount: 100,
    amountPaid: 0,
    date: "",
  },
  {
    id: 11,
    memID: 1,
    name: "Overall",
    amount: 500,
    amountPaid: 50,
    date: "",
  },
];

const members = [
  {
    id: 1,
    gender: "male",
    name: "john",
    phoneNumber: "808025983",
    plans: [10, 11, 12],
    services: [10, 11, 12],
  },
];

const Collections = () => {
  const [planCollection, setPlanCollection] = useState();
  const [serviceCollection, setServiceCollection] = useState();

  const pie_chart_data = useRef([]);

  useEffect(() => {
    var plan_full = 0;
    var plan_full_total = 0;

    var plan_reminder = 0;
    var plan_reminder_total = 0;
    var plan_reminder_received = 0;
    var plan_reminder_remaining = 0;

    var plan_unpaid = 0;
    var plan_unpaid_total = 0;

    plansSelectedTable.map((plan_details) => {
      // checking if plan is completly paid
      if (plan_details.amount == plan_details.amountPaid) {
        plan_full += 1;
        plan_full_total += plan_details.amount;
      } else if (plan_details.amountPaid == 0 && plan_details.amount != 0) {
        plan_unpaid += 1;
        plan_unpaid_total += plan_details.amount;
      } else {
        plan_reminder += 1;
        plan_reminder_total += plan_details.amount;
        plan_reminder_received += plan_details.amountPaid;
        plan_reminder_remaining +=
          plan_details.amount - plan_details.amountPaid;
      }
    });

    var resultPlan = {
      total: plan_full_total + plan_reminder_total + plan_unpaid_total,
      received: plan_full_total + plan_reminder_received,
      remaining: plan_reminder_remaining + plan_unpaid_total,
      plan_full,
      plan_full_total,
      plan_reminder,
      plan_reminder_total,
      plan_reminder_received,
      plan_reminder_remaining,
      plan_unpaid,
      plan_unpaid_total,
    };
    setPlanCollection(resultPlan);

    // calculating services collection
    var service_full = 0;
    var service_full_total = 0;

    var service_reminder = 0;
    var service_reminder_total = 0;
    var service_reminder_received = 0;
    var service_reminder_remaining = 0;

    var service_unpaid = 0;
    var service_unpaid_total = 0;

    servicesSelectedTable.map((service_details) => {
      // checking if plan is completly paid
      if (service_details.amount == service_details.amountPaid) {
        service_full += 1;
        service_full_total += service_details.amount;
      } else if (
        service_details.amountPaid == 0 &&
        service_details.amount != 0
      ) {
        service_unpaid += 1;
        service_unpaid_total += service_details.amount;
      } else {
        service_reminder += 1;
        service_reminder_total += service_details.amount;
        service_reminder_received += service_details.amountPaid;
        service_reminder_remaining +=
          service_details.amount - service_details.amountPaid;
      }
    });

    var resultService = {
      total: service_full_total + service_reminder_total + service_unpaid_total,
      received: service_full_total + service_reminder_received,
      remaining: service_reminder_remaining + service_unpaid_total,
      service_full,
      service_full_total,
      service_reminder,
      service_reminder_total,
      service_reminder_received,
      service_reminder_remaining,
      service_unpaid,
      service_unpaid_total,
    };
    setServiceCollection(resultService);

    pie_chart_data.data = [
      {
        name: "Received",
        amount: resultPlan.received + resultService.received,
        color: "#00FF00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Remaining",
        amount: resultPlan.remaining + resultService.remaining,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* date block */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Collection</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Overall collection</Text>
            <View style={styles.blockDivider} />
            {pie_chart_data.data != null ? (
              <PieChart
                data={pie_chart_data.data}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"0"}
                center={[0, 0]}
                absolute
              />
            ) : null}
          </View>

          {/* member plan collection block */}
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Members's plan collection</Text>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total members: {members.length}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {planCollection != null ? planCollection.total : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Received:{" "}
                  {planCollection != null ? planCollection.received : null}
                </Text>
                <Text style={styles.boldText}>
                  Remaining:{" "}
                  {planCollection != null ? planCollection.remaining : null}
                </Text>
              </View>
            </View>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Full paid:{" "}
                  {planCollection != null ? planCollection.plan_full : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {planCollection != null
                    ? planCollection.plan_full_total
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Remainder balance:{" "}
                  {planCollection != null ? planCollection.plan_reminder : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {planCollection != null
                    ? planCollection.plan_reminder_total
                    : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Received:{" "}
                  {planCollection != null
                    ? planCollection.plan_reminder_received
                    : null}
                </Text>
                <Text style={styles.boldText}>
                  Remaining:{" "}
                  {planCollection != null
                    ? planCollection.plan_reminder_remaining
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Unpaid payment:{" "}
                  {planCollection != null ? planCollection.plan_unpaid : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {planCollection != null
                    ? planCollection.plan_unpaid_total
                    : null}
                </Text>
              </View>
            </View>
          </View>

          {/* member service collection */}
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Members's service collection</Text>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total members: {members.length}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {serviceCollection != null ? serviceCollection.total : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Received:{" "}
                  {serviceCollection != null
                    ? serviceCollection.received
                    : null}
                </Text>
                <Text style={styles.boldText}>
                  Remaining:{" "}
                  {serviceCollection != null
                    ? serviceCollection.remaining
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Full paid:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_full
                    : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_full_total
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Remainder balance:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_reminder
                    : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_reminder_total
                    : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Received:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_reminder_received
                    : null}
                </Text>
                <Text style={styles.boldText}>
                  Remaining:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_reminder_remaining
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.blockDivider} />
            <View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Unpaid payment:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_unpaid
                    : null}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>
                  Total amount:{" "}
                  {serviceCollection != null
                    ? serviceCollection.service_unpaid_total
                    : null}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 80 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Collections;

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
    marginTop: -30,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
    padding: 20,
  },
  block: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  blockTitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  blockDivider: {
    marginVertical: 5,
    width: "100%",
    height: 1,
    backgroundColor: "#d3d3d3",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
  },
  boldText: {
    fontSize: 16,
    marginRight: 10,
  },
});
