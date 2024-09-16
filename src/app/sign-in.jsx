import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

export default function App() {
	const router = useRouter();

	return (
		<SafeAreaView style={{ backgroundColor: "#242424", flex: 1 }}>
			<View style={styles.container}>
				<Text style={styles.title}>DayTraining</Text>
				<Text style={styles.slogan}>Seu treino merece atenção!</Text>
				<View style={styles.button}>
					<CustomButton
						title="Começar"
						onPress={() => router.navigate("login")}
					/>
				</View>
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 24,
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 40,
		letterSpacing: 5,
		textTransform: "uppercase",
		fontWeight: "bold",
		marginTop: "auto",
		color: "#FF9500",
		alignSelf: "flex-start",
	},
	slogan: {
		color: "white",
		alignSelf: "flex-start",
		fontSize: 20,
	},
	button: {
		width: "100%",
		marginTop: "auto",
		marginBottom: 20,
	},
});
