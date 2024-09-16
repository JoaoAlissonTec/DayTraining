import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useSession } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import CustomTextInput from "../components/CustomTextInput";
import { loginUser } from "../services/firebaseAuth";

export default function Login() {
	const { signIn } = useSession();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleClick() {
		const response = await signIn(email, password)
        if (response) {
			router.dismissAll();
			router.replace("(auth)");
		}
	}
	return (
		<View style={styles.container}>
			<View style={styles.form}>
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
				<View style={styles.question_container}>
					<Pressable>
						<Text style={styles.link}>Esqueceu sua senha?</Text>
					</Pressable>
				</View>
				<View style={{ marginTop: 30 }}>
					<CustomButton title="Entrar" onPress={handleClick} />
				</View>
				<View style={styles.question_container}>
					<Text style={{ color: "white" }}>Não tem conta?</Text>
					<Pressable onPress={()=>router.replace("register")}>
						<Text style={styles.link}>Cadastre-se</Text>
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
