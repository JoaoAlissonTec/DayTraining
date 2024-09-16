import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import CustomTextInput from "../components/CustomTextInput";
import { registerUser } from "../services/firebaseAuth";
import { writeData } from "../services/firebaseDatabase";

export default function Register() {
	const router = useRouter();

	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	async function handleRegister() {
		const response = await registerUser(email, password);
		
		if (response.status === 400) {
			return
		}

		writeData("users/" + response.user.uid, {
			username: user,
			email: email,
		});
		router.dismissAll();
		router.replace("(auth)");
	}

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<CustomTextInput
					label="Usuário"
					placeholder="Digite seu nome de usuário"
					value={user}
					onChangeText={setUser}
				/>
				<CustomTextInput
					label="Email"
					placeholder="Digite seu email"
					value={email}
					onChangeText={setEmail}
				/>
				<CustomTextInput
					label="Senha"
					placeholder="Digite sua senha"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<CustomTextInput
					label="Confirme sua senha"
					placeholder="Digite a mesma senha"
					value={confirm}
					onChangeText={setConfirm}
					secureTextEntry
				/>
				<View style={{ marginTop: 30 }}>
					<CustomButton title="Cadastrar" onPress={handleRegister} />
				</View>
				<View style={styles.question_container}>
					<Text style={{ color: "white" }}>Já tem conta?</Text>
					<Pressable onPress={() => router.replace("login")}>
						<Text style={styles.link}>Login</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#242424",
		paddingHorizontal: 20,
		justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 20,
		color: "white",
		borderRadius: 5,
	},
	label: {
		color: "white",
		marginVertical: 10,
	},
	question_container: {
		flexDirection: "row",
		marginTop: 20,
		gap: 5,
	},
	link: {
		color: "#FF9500",
		fontWeight: "bold",
	},
});
