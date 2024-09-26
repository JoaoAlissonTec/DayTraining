import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function CardWeek({day, training, isActive }) {

  const router = useRouter()

  function handleClick(){
    if(!training){
      return
    }

    router.push({pathname: `/home/${training}`})
  }

  return (
    <Pressable style={[styles.card, isActive && {backgroundColor: "#FF9500"}]} onPress={handleClick}>
      <Text style={[styles.title, !isActive && {color: "white"}]}>{day}</Text>
      <Text style={[styles.description, !isActive && {color: "white"}, !training && {color: "grey"}]}>{training ?? "(Sem treino)"}</Text>
    </Pressable>
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
