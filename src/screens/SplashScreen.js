import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const SplashScreen = ({navigation}) => {

  setTimeout(() => {
    navigation.replace('Login');
  }, 2500);

  return (
    <View style={styles.containerr}>
      <LottieView
            source={require('../assets/splash.json')}
            autoPlay
            style={{width: '100%', height: '100%'}}
            loop
          />
      
      <LottieView
            source={require('../assets/watersplash.json')}
            autoPlay
            style={{position: 'absolute', width: 350, height: 350}}
            loop
          />
      <Image style={styles.AppName} source={require('../assets/LogoName.png')} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    containerr:{
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    AppName:{
        position: 'absolute',
        height: 80,
        height: 80
    }

})