import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

interface BackButtonProps {
    onBackPressed: () => void;
}

const BackButton = (props: BackButtonProps) => {
    const {onBackPressed} = props
    return (
        <TouchableOpacity onPress={onBackPressed} style={styles.container}>
        <Image
            style={styles.image}
            source={require('../assets/arrow_back.png')}
        />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})

export default BackButton;