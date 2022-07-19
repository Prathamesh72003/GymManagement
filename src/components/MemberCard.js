import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  
  import Entypo from 'react-native-vector-icons/Entypo';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import {Menu, Button, Divider, Provider} from 'react-native-paper';
  
  const data = [];
  
  const MemberCard = props => {
    const [visible, setVisible] = useState(true);
  
    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);
    return (
      <View>
        {/* <Provider style={{padding: 0, margin: 0}}> */}
          <View style={styles.memberCard}>
            <View style={styles.memberCardLeft}>
              <View style={styles.memberAvatar}>
                <Fontisto name={props.data.gender} size={25} color="#2f50c9" />
              </View>
            </View>
            <View style={styles.memberCardRight}>
              <Text style={styles.memberText} numberOfLines={1}>
                <Text style={styles.memberTextBold}>Name: </Text>{' '}
                {props.data.name}
              </Text>
              <Text style={styles.memberText} numberOfLines={1}>
                <Text style={styles.memberTextBold}>Plan: </Text>{' '}
                {props.data.plan}
              </Text>
              <Text style={styles.memberText} numberOfLines={1}>
                <Text style={styles.memberTextBold}>Plan expiry: </Text>
                {props.data.planExpiry}
              </Text>
              <Text style={styles.memberText} numberOfLines={1}>
                <Text style={styles.memberTextBold}>Due amount: </Text>
                {props.data.dueAmount}
              </Text>
            </View>
            <View style={{flex: 1, zIndex: 200}}>
              <Menu
              style={{flex: 1, zIndex: 200}}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Button onPress={openMenu}>
                    <Entypo name="dots-three-vertical" size={18} color="#000" />
                  </Button>
                }>
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="ID card"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="Attendance"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="Renew plan"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="Call"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="Whatsapp"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="Block"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                  }}
                  title="Delete"
                />
              </Menu>
            </View>
          </View>
        {/* </Provider> */}
      </View>
    );
  };
  
  export default MemberCard;
  
  const styles = StyleSheet.create({
    memberCard: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      marginVertical: 15,
      backgroundColor: '#fff',
      borderRadius: 15,
    },
    memberCardLeft: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    memberAvatar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    memberText: {
      fontSize: 17,
      paddingBottom: 2,
    },
    memberTextBold: {
      marginRight: 10,
      fontWeight: 'bold',
    },
  });
  