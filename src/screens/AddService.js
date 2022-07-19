import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {TextInput, RadioButton} from 'react-native-paper';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [amount, setAmount] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.formHeader}>
        <TextInput
          style={styles.inputField}
          label="Service name"
          numberOfLines={1}
          value={serviceName}
          onChangeText={text => setServiceName(text)}
          left={<TextInput.Icon name="format-list-bulleted-type" />}
        />
        <TextInput
          style={styles.inputField}
          label="Amount"
          keyboardType="numeric"
          numberOfLines={1}
          value={amount}
          onChangeText={text => setAmount(text)}
          left={<TextInput.Icon name="currency-rupee" />}
        />
      </View>
      <View style={styles.formBottom}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddService;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  inputField: {
    marginVertical: 10,
  },
  formBottom: {
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f50c9',
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});