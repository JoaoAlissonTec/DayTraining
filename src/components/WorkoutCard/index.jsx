import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WorkoutCard({ title, qtd, isChecked, value}) {

    const router = useRouter()

	return (
		<Pressable style={styles.container} onPress={()=>router.push({pathname: `/workout/${value}`})}>
            <View style={styles.checkbox}>
                <View style={isChecked ? styles.checkbox_checked : {}}/>
            </View>
			<Text style={styles.title}>{title}</Text>
			<Text style={{ color: "white" }}>{qtd ?? 0}</Text>
            <FontAwesome name="angle-right" color="white" size={16}/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#242424",
		flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        gap: 10
	},
	title: {
		color: "white",
		marginRight: "auto",
	},
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 99,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171717",
        padding: 5
    },
    checkbox_checked: {
        width: "100%",
        height: "100%",
        borderRadius: 99,
        backgroundColor: "#ff9500"
    }
});
