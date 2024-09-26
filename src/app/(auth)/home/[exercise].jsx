import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData } from "../../../services/firebaseDatabase";
import ExerciseCard from "../../../components/ExerciseCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSession } from "../../../contexts/AuthContext";

export default function Exercise() {
	const {session} = useSession()
	const { exercise } = useLocalSearchParams();
	const router = useRouter();

	const data = getData("/workout/" + session.uid);
	
	
	const returnList = () => {

		if(!data){
			return
		}

		if(!data.list[data.active_workout].exercises){
			return
		}

		const active_workout = data.active_workout;
		const list = data.list[active_workout];
		const exercises = list.exercises


		return exercises.filter(ex => ex.group === exercise.toLowerCase())
	}

	const exercisesFiltered = returnList()

	return (
		<SafeAreaView style={{ backgroundColor: "#242424", flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Pressable
						onPress={() => router.dismiss()}
						style={({ pressed }) => [
							styles.back,
							{ backgroundColor: pressed ? "#3C3C3C" : "transparent" },
						]}
					>
						<FontAwesome5 name="angle-left" color="white" size={20} />
					</Pressable>
					<Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
						Treino de {exercise}
					</Text>
				</View>
				<View style={{ gap: 10 }}>
					{exercisesFiltered &&
						exercisesFiltered.map((value) => (
							<ExerciseCard
								key={value.name}
								data={value}
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
	header: { 
    flexDirection: "row", 
    gap: 15, 
    alignItems: "center",
    marginBottom: 20 
  },
	back: {
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "grey",
	},
});
