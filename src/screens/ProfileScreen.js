import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.mainconatiner}>
        <View style={styles.upperConatiner}>
          <View style={styles.ImageNdName}>
            <Avatar.Image
              style={styles.avatar}
              size={65}
              source={require('../assets/user.png')}
            />
            <View style={styles.TileSubtitle}>
              <Text style={styles.GymName}>Universal Gym</Text>
              <Text style={styles.OwnerName}>Prathamesh</Text>
            </View>
          </View>
          <View style={styles.contactInfo}>
            <View style={styles.contactCard}>
              <FontAwesome5
                style={styles.contactSymbol}
                name="phone"
                size={20}
                color={'#000'}
              />
              <Text style={styles.phoneNumber}>9112272004</Text>
            </View>
            <View style={styles.contactCard}>
              <FontAwesome5
                style={styles.contactSymbol}
                name="envelope"
                size={20}
                color={'#000'}
              />
              <Text style={styles.emailId}>universal@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.components}>
            <TouchableOpacity>
              <View style={styles.card}>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: '#2f50c9'}}>
                  102
                </Text>
                <Text style={styles.componentText}>Members</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.card}>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: '#2f50c9'}}>
                  12
                </Text>
                <Text style={styles.componentText}>Plans</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.card}>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: '#2f50c9'}}>
                  20
                </Text>
                <Text style={styles.componentText}>Services</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.LowerContainer}>
          <View style={styles.TabList}>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="download" size={25} color={'#2f50c9'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>Download members list</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="bullhorn" size={25} color={'#2f50c9'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>Tell a friend</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Subscription')}}>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="wallet" size={25} color={'#2f50c9'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>Upgrade subscription</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="question" size={25} color={'#2f50c9'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>How to use gymbook</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="info" size={25} color={'#2f50c9'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>
                    FAQ ( issues and queries )
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainconatiner: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  upperConatiner: {
    padding: 20,
  },
  ImageNdName: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {},
  TileSubtitle: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  GymName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  OwnerName: {},
  contactInfo: {
    padding: 20,
    marginTop: 5,
  },
  contactCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactSymbol: {
    marginRight: 10,
    opacity: 0.5,
  },
  phoneNumber: {
    opacity: 0.5,
    color: '#000',
  },
  emailId: {
    opacity: 0.5,
  },

  middleContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 40,
    padding: 25,
    marginHorizontal: 20,
    elevation: 10,
  },
  components: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  LowerContainer: {
    padding: 20,
    marginTop: 10,
    // backgroundColor: '#F3F3F3',
  },
  TabList: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    padding: 10,
    // backgroundColor: 'grey'
  },
  Icon: {},
  ListTextContainer: {
    marginLeft: 20,
  },
  ListText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
