import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import Card from '../components/Card';
  import CardWithImage from '../components/CardWithImage';
  
  const QuickAction = () => {
    return (
      <View styles={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Quick Actions</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.row}>
              <Card
                width={'100%'}
                count={10}
                title={'Near term expiry'}
                intent={'Members'}
              />
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
              Members
            </Text>
            <View style={styles.row}>
              <Card width={'47%'} count={3} title={'Total'} intent={'Members'} />
              <Card width={'47%'} count={2} title={'Active'} intent={'Members'} />
            </View>
            <View style={styles.row}>
              <Card
                width={'47%'}
                count={2}
                title={'Expired'}
                intent={'Members'}
              />
              <Card
                width={'47%'}
                count={2}
                title={'Blocked'}
                intent={'Members'}
              />
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
              Add
            </Text>
            <View style={styles.row}>
              <CardWithImage
                width={'30%'}
                icon={'user'}
                title={'Members'}
                intent={'Members'}
              />
              <CardWithImage
                width={'30%'}
                icon={'profile'}
                title={'Plans'}
                intent={'AddPlan'}
              />
              <CardWithImage
                width={'30%'}
                icon={'carryout'}
                title={'Services'}
                intent={'AddService'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default QuickAction;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2f50c9',
    },
    header: {
      backgroundColor: '#14213D',
      // backgroundColor: '#04080F',
      padding: 20,
      paddingTop: 30,
      paddingBottom: 60,
    },
    headerTitle: {
      color: '#fff',
      fontSize: 25,
      fontWeight: '600',
    },
    body: {
      flex: 1,
      height: '100%',
      padding: 20,
      marginTop: -30,
      overflow: 'hidden',
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      backgroundColor: '#E0E3E9',
    },
    row: {
      flexDirection: 'row',
      marginVertical: 15,
      justifyContent: 'space-between',
    },
  });
  