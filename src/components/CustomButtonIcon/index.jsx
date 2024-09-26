import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function CustomButtonIcon({onPress, label, iconType: Icon, iconName}) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: pressed ? "#3C3C3C" : "#242424" },
			]}
		>
			<Icon
				style={styles.button_icon}
				name={iconName}
			/>
			<Text style={styles.button_label}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#242424",
		elevation: 10,
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderRadius: 15,
		gap: 25,
	},
	button_label: {
		color: "white",
		fontSize: 16,
	},
	button_icon: {
		color: "#FF9500",
		backgroundColor: "rgba(255, 149, 0, 0.2)",
		paddingVertical: 5,
		paddingHorizontal: 10,
		fontSize: 16,
		borderRadius: 5,
	}
});
