import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {FAB} from 'react-native-paper';
  import MemberCard from '../components/MemberCard';
  import ServiceCard from '../components/ServiceCard';
  
  const data = [
    {
      id: 1,
      name: 'timepass',
      amount: '200',
    },
    {
      id: 2,
      name: 'cardio',
      amount: '400',
    },
  ];
  
  const Services = props => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} styles={styles.container}>
        <View style={styles.body}>
          {data.map(item => {
            console.log(item.name);
            return <ServiceCard key={item.id} data={item} />;
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
  
  export default Services;
  
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
  