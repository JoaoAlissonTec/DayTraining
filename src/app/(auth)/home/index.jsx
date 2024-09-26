import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CardTips from "../../../components/CardTips";
import CardWeek from "../../../components/CardWeek";
import { useSession } from "../../../contexts/AuthContext";
import { getData } from "../../../services/firebaseDatabase";

export default function Home() {
	const todayDate = new Date();
	const { session } = useSession();

  const week = getData("week/" + session.uid)

	const weekTitle = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

  const date = new Date()

	return (
		<SafeAreaView style={{ backgroundColor: "#242424", flex: 1 }}>
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.title}>Inicio</Text>
						<Text style={{ fontSize: 16, color: "white" }}>
							{todayDate.toLocaleDateString()}
						</Text>
					</View>
					<Pressable style={styles.today}>
						<Text style={{ color: "white" }}>Treino de hoje</Text>
						<FontAwesome name="angle-right" size={16} color="white" />
					</Pressable>
					<View
						style={{
							height: 250,
							width: "100%",
							backgroundColor: "#171717",
							marginVertical: 20,
							borderRadius: 10,
						}}
					></View>
					<Text style={styles.subtitle}>Semana</Text>
					<View style={{ width: "100%" }}>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{weekTitle.map((value, index) => (
								<CardWeek key={value} day={value} training={week ? week[value] : ""} isActive={date.getDay() === index}/>
							))}
						</ScrollView>
					</View>
					<Text style={styles.subtitle}>Dicas</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<CardTips
							description="Refeição"
							image="https://th.bing.com/th/id/R.368daaa1224f816de4f4cc51a8ceb162?rik=adI6GKE3P07d7A&riu=http%3a%2f%2f3.bp.blogspot.com%2f-KbCmqT3Q3Ww%2fUzcgtoBY1oI%2fAAAAAAAAAbg%2fl5is0dEEeY8%2fs1600%2falimenta%c3%a7ao-saudavel11.jpg&ehk=us3GxnGxAMztYf74afXcHX1RdOj4yuxY0083VOLmEBU%3d&risl=&pid=ImgRaw&r=0"
						/>
						<CardTips
							description="Sono"
							image="https://th.bing.com/th/id/R.08f4a95e3ca96f15829d18bc57ca4e93?rik=iRR2tiMuizIp3Q&pid=ImgRaw&r=0"
						/>
						<CardTips
							description="Treino"
							image="https://th.bing.com/th/id/R.b5a5d5aeac37e597055c0301af0a1052?rik=giooqIYR2Fgw2Q&pid=ImgRaw&r=0"
						/>
					</ScrollView>
				</View>
				<View style={{ height: 100, width: "100%" }} />
			</ScrollView>
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
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "white",
		letterSpacing: 5,
	},
	subtitle: {
		fontSize: 20,
		marginVertical: 10,
		fontWeight: "semibold",
		color: "white",
	},
	today: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});
