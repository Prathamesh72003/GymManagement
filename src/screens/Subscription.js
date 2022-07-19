import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  RadioButton,
} from 'react-native-paper';

const Subscription = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.TitleText}>Be the part of huge community!</Text>
        <Text style={styles.SubtitleText}>
          Various plans with detailed description
        </Text>
      </View>

      <View style={styles.MiddleContainer}>
        <View style={styles.cardsContainer}>
          <Card style={styles.Card}>
            <Card.Title
              title="Rs. 12000"
              subtitle="Yearly Subscription"
              // left={LeftContent}
            />
            <Card.Content>
              <View style={styles.features}>
                <FlatList
                  data={[{key: 'Devin'}, {key: 'Dan'}, {key: 'Dominic'}]}
                  renderItem={({item}) => (
                    <Text style={styles.item}>
                      {'✔️' + ' '}
                      {item.key}
                    </Text>
                  )}
                />
                <FlatList
                  data={[{key: 'Devin'}, {key: 'Dan'}, {key: 'Dominic'}]}
                  renderItem={({item}) => (
                    <Text style={styles.item}>
                      {'✔️' + ' '}
                      {item.key}
                    </Text>
                  )}
                />
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.Card}>
            <Card.Title
              title="Rs. 600"
              subtitle="Yearly Subscription"
              // left={LeftContent}
            />
            <Card.Content>
              <View style={styles.features}>
                <FlatList
                  data={[{key: 'Devin'}, {key: 'Dan'}, {key: 'Dominic'}]}
                  renderItem={({item}) => (
                    <Text style={styles.item}>
                      {'✔️' + ' '}
                      {item.key}
                    </Text>
                  )}
                />
                <FlatList
                  data={[{key: 'Devin'}, {key: 'Dan'}, {key: 'Dominic'}]}
                  renderItem={({item}) => (
                    <Text style={styles.item}>
                      {'❌' + ' '}
                      {item.key}
                    </Text>
                  )}
                />
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Button style={styles.PurchaseButton} mode="contained" onPress={() => console.log('Pressed')}>
          Purchase
        </Button>
      </View>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  headingContainer: {},
  TitleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  SubtitleText: {
    fontSize: 15,
    marginTop: 5,
  },
  MiddleContainer: {},
  cardsContainer: {},
  Card: {
    marginTop: 20,
    elevation: 5,
    borderRadius: 10,
  },
  features: {
    display: 'flex',
    flexDirection: 'row',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  PurchaseButton: {
    width: '100%',
  }
});
