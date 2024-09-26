import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	deleteData,
	getData,
	writeData,
} from "../../../services/firebaseDatabase";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import ExerciseCard from "../../../components/ExerciseCard";
import CustomButton from "../../../components/CustomButton";
import { useSession } from "../../../contexts/AuthContext";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

export default function WorkoutId() {
	const router = useRouter();

	const { session } = useSession();
	const { id } = useLocalSearchParams();

	const [exercises, setExercises] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [showSaveButton, setShowSaveButton] = useState(false);

	const data = getData("/exercise");
	const dataUser = getData("/workout/" + session.uid);

	useEffect(() => {
		if (!data) {
			return;
		}
		setExercises(Object.keys(data));
	}, [data]);

	useEffect(() => {
		if (!dataUser) {
			return;
		}

		if (!dataUser.list[id].exercises) {
			return;
		}

		setSelectedItems(Object.values(dataUser.list[id].exercises));
	}, [dataUser]);

	const select = (item) => {
		if (!showSaveButton) {
			setShowSaveButton(true);
		}
		if (selectedItems.findIndex((fields) => fields.name === item.name) >= 0) {
			const aux = selectedItems;
			const newData = aux.filter((items) => items.name != item.name);
			setSelectedItems(newData);

			return;
		}

		setSelectedItems([item, ...selectedItems]);
	};

	function update (name, reps, series) {
		const id = selectedItems.findIndex((fields)=> fields.name === name)
		const aux = [...selectedItems]
		
		aux[id].reps = reps
		aux[id].series = series
		
		if(aux[id] === selectedItems[id]){
			return	
		}
		
		setSelectedItems(aux)

		if (!showSaveButton) {
			setShowSaveButton(true);
		}
	}

	const active = () => {
		writeData("/workout/" + session.uid, { active_workout: id });
	};

	const save_data = () => {
		writeData("/workout/" + session.uid + "/list/" + id, {
			exercises: selectedItems,
		})
		setShowSaveButton(false)
	}

	const delete_data = () => {
		router.back();
		deleteData("/workout/" + session.uid + "/list/" + id);
	};

	return (
		<SafeAreaView style={{ backgroundColor: "#242424", flex: 1 }}>
			<View style={styles.container}>
				{dataUser && !(dataUser.active_workout === id) && (
					<View style={styles.controllers}>
						<Pressable
							style={({ pressed }) => [
								styles.button_controller,
								{ backgroundColor: pressed ? "orange" : "#FF9500" },
							]}
							onPress={active}
						>
							<Fontisto name="checkbox-active" />
							<Text>Selecionar treino</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) => [
								styles.button_controller,
								{ backgroundColor: pressed ? "#3C3C3C" : "#242424" },
							]}
							onPress={delete_data}
						>
							<FontAwesome5 name="trash" color="#FF9500" size={16} />
						</Pressable>
					</View>
				)}
				<View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ marginBottom: 200 }}>
							{exercises &&
								exercises.map((value) => (
									<View style={{ paddingHorizontal: 10 }} key={value}>
										<Text style={styles.title}>
											{capitalizeFirstLetter(value)}
										</Text>
										<View style={{ gap: 10 }}>
											{Object.values(data[value]).map((value2) => (
												<ExerciseCard
												key={value2.name}
												data={value2}
												isSelected={
													selectedItems.findIndex(
														(fields) => fields.name === value2.name
													) >= 0
												}
												update={update}
												select={() => select(value2)}
												dataUser={dataUser.list[id].exercises}
											/>
											))}
										</View>
									</View>
								))}
						</View>
					</ScrollView>
				</View>

				{showSaveButton && (
					<View
						style={{
							marginTop: "auto",
							marginHorizontal: 30,
							paddingBottom: 120,
						}}
					>
						<CustomButton
							title="Salvar treino"
							onPress={save_data}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	controllers: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "space-between",
	},
	button_controller: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		backgroundColor: "#242424",
		elevation: 10,
	},
});
