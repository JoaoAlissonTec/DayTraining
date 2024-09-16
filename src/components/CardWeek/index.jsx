import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function CardWeek({day, training, isActive }) {

  return (
    <View style={[styles.card, isActive && {backgroundColor: "#FF9500"}]}>
      <Text style={[styles.title, !isActive && {color: "white"}]}>{day}</Text>
      <Text style={[styles.description, !isActive && {color: "white"}, !training && {color: "grey"}]}>{training ?? "(Sem treino)"}</Text>
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
  title:{
    textTransform: "capitalize"
  },
  description: {
    fontSize: 16,
    fontWeight: "semibold"
  }
});
