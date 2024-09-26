import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Item({icon, title}) {
  return (
    <View style={styles.item}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  title: {
    color: "white"
  }
})