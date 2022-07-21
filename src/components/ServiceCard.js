import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

const ServiceCard = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text} numberOfLines={1}>
          <Text style={styles.textBold}>Service name: </Text>
          {props.data.service}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          <Text style={styles.textBold}>Total amount: </Text>
          {props.data.amount}
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <AntDesign name="delete" size={20} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
    paddingBottom: 5,
  },
  textBold: {
    marginRight: 10,
    fontWeight: 'bold',
  },
});