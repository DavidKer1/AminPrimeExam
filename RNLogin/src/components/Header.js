import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

export default function Header({title}) {
  return (
    <View style={styles.container}>
     <ImageBackground source={require('../../assets/header-image.jpg')} style={styles.bgImage}>
     <LinearGradient
      colors={['rgba(255,255,255,0)', 'rgba(253,164,60,.6)']}
      style={styles.linearGradient}>
       <Text style={{fontSize: 25}}>Admin Prime</Text>
       <Text style={{fontSize:40}}>{title}</Text>
       </LinearGradient>
     </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    width: '100%',
    height: '100%'
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingVertical: 30
  }
})