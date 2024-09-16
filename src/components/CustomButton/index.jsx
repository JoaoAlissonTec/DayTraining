import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ title, onPress, isSecondary }) {

    if(isSecondary){
        return (
            <TouchableOpacity style={styles.button_secondary} onPress={onPress}>
                <Text style={styles.button_label_secondary}>{title}</Text>
            </TouchableOpacity>
        );
    }

	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.button_label}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		backgroundColor: "#FF9500",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		borderRadius: 10,
	},
    button_secondary: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		borderRadius: 10
	},
	button_label: {
		color: "#171717",
		fontSize: 20,
	},
    button_label_secondary: {
		color: "white",
		fontSize: 16
	},
});
