import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function CardWeek({day, training, isActive }) {

  return (
    <View style={[styles.card, isActive && {backgroundColor: "#FF9500"}]}>
      <Text style={[!isActive && {color: "white"}]}>{day}</Text>
      <Text style={[styles.description, !isActive && {color: "white"}]}>{training}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171717",
    padding: 10,
    marginLeft: 10,
    width: 120,
    height: 70,
    justifyContent: "space-around",
    borderRadius: 10
  },
  description: {
    fontSize: 16,
    fontWeight: "semibold"
  }
});
