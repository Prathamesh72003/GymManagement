import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {FAB,Provider} from 'react-native-paper';
  import MemberCard from './../components/MemberCard';
  
  const data = [
    {
      id: 1,
      gender: 'male',
      name: 'john',
      plan: '12 month',
      planExpiry: '21st june',
      dueAmount: 100,
      phoneNumber: '808025983',
    },
    {
      id: 2,
      gender: 'female',
      name: 'bob',
      plan: '4 month',
      planExpiry: '21st june',
      dueAmount: 0,
      phoneNumber: '808025983',
    },
  ];
  
  const Members = props => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} styles={styles.container}>
        
        <Provider>
        
        <View style={styles.body}>
          {data.map(item => {
            console.log(item.name);
            return <MemberCard key={item.id} data={item} />;
          })}
          <FAB
            color={'#fff'}
            icon="plus"
            style={styles.fab}
            onPress={() => console.log('Pressed')}
          />
        </View>

        </Provider>
      </ScrollView>
    );
  };
  
  export default Members;
  
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
  