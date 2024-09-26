import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Root({children}) {
  return (
    <View style={styles.menu_container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    menu_container: {
        position: "absolute",
        backgroundColor: "#242424",
        top: 40
    }
})