import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ExerciseCard({
	data,
	dataUser,
	isSelected,
	update,
	select,
}) {
	const repsData =
		dataUser && dataUser.filter((value) => value.name === data.name)[0]?.reps;
	const seriesData =
		dataUser && dataUser.filter((value) => value.name === data.name)[0]?.series;

	const [reps, setReps] = useState(repsData);
	const [series, setSeries] = useState(seriesData);
    const [editable, setEditable] = useState(false)

	function execute() {
        if(editable){
            setEditable(false)
            update(data.name, reps, series);
        }else{
            setEditable(true)
        }
	}

	return (
		<View style={styles.card}>
			<View style={styles.texts}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
					<Pressable
						style={[
							styles.checkbox,
							{ backgroundColor: isSelected ? "#ff9500" : "#171717" },
						]}
						onPress={select}
					>
						{isSelected && <FontAwesome5 name="check" color="#171717" />}
					</Pressable>
					<Text style={styles.title}>{data.name}</Text>
				</View>
			</View>

			{isSelected && (
				<>
					<View style={styles.input_group}>
						<View style={styles.input_container}>
							<Text style={{ color: "white" }}>Serie</Text>
							<TextInput
								placeholder="0"
								value={series}
								onChangeText={(value) => setSeries(value)}
                                editable={editable}
								style={[styles.input, { color: editable ? "white" : "grey" }]}
								placeholderTextColor="gray"
							/>
						</View>
						<View style={styles.input_container}>
							<Text style={{ color: "white" }}>Reps</Text>
							<TextInput
								placeholder="0"
								value={reps}
								onChangeText={(value) => setReps(value)}
								editable={editable}
								style={[styles.input, { color: editable ? "white" : "grey" }]}
								placeholderTextColor="gray"
							/>
						</View>
						<Pressable onPress={execute} style={styles.edit_button}>
							<FontAwesome5 name={!editable ? "edit" : "check"} color="#FF9500" />
						</Pressable>
					</View>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		backgroundColor: "#242424",
		elevation: 10,
		padding: 10,
	},
	title: {
		color: "white",
		fontSize: 16,
	},
	checkbox: {
		width: 20,
		height: 20,
		backgroundColor: "#171717",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
    input:{
        width: 50
    },
	input_group: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	input_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
        marginTop: 10
	},
    edit_button: {
        color: "#FF9500",
		backgroundColor: "rgba(255, 149, 0, 0.2)",
		padding: 10,
		fontSize: 16,
		borderRadius: 5,
        marginLeft: "auto"
    }
});
