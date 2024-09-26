import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtonIcon from "../../../components/CustomButtonIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomTextInput from "../../../components/CustomTextInput";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { getData, writeData } from "../../../services/firebaseDatabase";
import { useSession } from "../../../contexts/AuthContext";
import WorkoutCard from "../../../components/WorkoutCard";

export default function Workout() {
	const [showTextEdit, setShowTextEdit] = useState(false);
	const [workout, setWorkout] = useState("");
	const [workoutList, setWorkoutList] = useState([]);
	const { session } = useSession();

	function closeTextEdit() {
		setShowTextEdit(false);
		setWorkout("");
	}

	function submitTextEdit() {
		if (!workout) {
			return;
		}

		if (workoutList && workoutList.find((value) => value === workout.toLowerCase())) {
			return;
		}

		const formatText = workout.toLowerCase().replaceAll(" ", "_");

		writeData("/workout/" + session.uid + "/list/" + formatText, {
			title: workout,
			exercises: "",
		});
		closeTextEdit();
	}

	const data = getData("/workout/" + session.uid);

	useEffect(() => {
		if (!data) {
			return
		}

		if(!data.list){
			return
		}

		setWorkoutList(Object.keys(data.list));
	}, [data]);

	return (
		<SafeAreaView style={{ backgroundColor: "#242424", flex: 1 }}>
			<View style={styles.container}>
				{showTextEdit && (
					<View style={styles.new}>
						<View style={{ flex: 20 }}>
							<CustomTextInput
								placeholder="Digite o nome do novo treino"
								value={workout}
								onChangeText={(value) => setWorkout(value)}
							/>
						</View>
						<Pressable
							style={({ pressed }) => [
								styles.controller_button,
								{ backgroundColor: pressed ? "#3C3C3C" : "#171717" },
							]}
							onPress={closeTextEdit}
						>
							<FontAwesome name="close" size={16} color="white" />
						</Pressable>
						<Pressable
							style={({ pressed }) => [
								styles.controller_button,
								{ backgroundColor: pressed ? "orange" : "#FF9500" },
							]}
							onPress={submitTextEdit}
						>
							<FontAwesome5 name="check" size={16} />
						</Pressable>
					</View>
				)}
				{!showTextEdit && (
					<CustomButtonIcon
						label="Adicionar treino"
						iconType={MaterialCommunityIcons}
						iconName="arm-flex"
						onPress={() => setShowTextEdit((state) => !state)}
					/>
				)}
				<View style={styles.workout_list}>
					{workoutList &&
						workoutList.map((value) => (
							<WorkoutCard
								key={value}
								title={data.list[value]?.title}
								qtd={data.list[value]?.exercises?.length}
								isChecked={data.active_workout === value}
								value={value}
							/>
						))}
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	new: {
		flexDirection: "row",
		gap: 10,
	},
	controller_button: {
		flex: 2,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		elevation: 10,
	},
	workout_list: {
		marginTop: 20,
		gap: 5,
	},
});
