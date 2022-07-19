import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  
  import {FAB} from 'react-native-paper';
  import PlanCard from '../components/PlanCard';
  
  const data = [
    {
      id: 1,
      name: '1 month',
      amount: '200',
      durationType: 'Month',
      duration: '1',
    },
    {
      id: 2,
      name: 'Expiremental',
      amount: '400',
      durationType: 'Days',
      duration: '10',
    },
  ];
  
  const Plans = () => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} styles={styles.container}>
        <View style={styles.body}>
          {data.map(item => {
            console.log(item.name);
            return <PlanCard key={item.id} data={item} />;
          })}
          <FAB
            color={'#fff'}
            icon="plus"
            style={styles.fab}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </ScrollView>
    );
  };
  
  export default Plans;
  
  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    body: {
      height: '100%',
      padding: 20,
      backgroundColor: '#E0E3E9',
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 20,
      bottom: 30,
      backgroundColor: '#2f50c9',
    },
  });