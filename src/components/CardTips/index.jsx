import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function CardTips({ description, image }) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.img}
      />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171717",
    marginLeft: 10,
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: "flex-end",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
    opacity: 0.5
  },
  description: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "white",
    position: "absolute",
    bottom: 5,
    left: 10
  },
});
