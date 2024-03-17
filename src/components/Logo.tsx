import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => {
  return <Image source={require('../assets/logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    marginBottom: 8,
    resizeMode:'contain'
  },
})

export default Logo;