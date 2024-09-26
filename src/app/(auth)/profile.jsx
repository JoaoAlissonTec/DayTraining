import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	TouchableOpacity,
	Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSession } from "../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { getData, writeData } from "../../services/firebaseDatabase";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../utils/uploadImage";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomButtonIcon from "../../components/CustomButtonIcon";

export default function Profile() {
	const { signOut, session } = useSession();
	const user = getData("users/" + session.uid);
	const [gender, setGender] = useState();
	const [image, setImage] = useState(null);

	async function handleSave() {
		writeData("users/" + session.uid, {
			username: user?.username,
			email: session.email,
			gender,
		});
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);

			const imageProfile = await uploadImage(
				result.assets[0].uri,
				user?.username + "_profile"
			);
			writeData("users/" + session.uid, {
				image: imageProfile,
			});
		}
	};

	useEffect(() => {
		if (!user) {
			return;
		}
		setGender(user?.gender);
	}, [user]);

	useEffect(() => {
		if (!user || user?.image === image) {
			return;
		}

		setImage(user?.image);
	}, [user]);

	return (
		<SafeAreaView style={{ backgroundColor: "#242424", flex: 1 }}>
			<View style={styles.container}>
				<LinearGradient style={styles.card_profile} colors={["#ffb300", "#ff9500"]}>
					<Pressable style={styles.image_content} onLongPress={pickImage}>
						<View style={{ marginTop: 10 }}>
							{image ? (
								<Image source={{ uri: image }} style={styles.image} />
							) : (
								<View style={styles.image}>
									<FontAwesome5 name="user-alt" size={50} />
								</View>
							)}
						</View>
					</Pressable>
					<Text style={{ color: "#242424", fontSize: 24, fontWeight: "bold" }}>
						{user?.username}
					</Text>
					<Text style={{ color: "#242424", fontSize: 12 }}>
						{session.email}
					</Text>
				</LinearGradient>
				<Text style={styles.subtitle}>Sobre mim</Text>
				<Text style={{ color: "white", fontSize: 16 }}>Sexo</Text>
				<Picker
					mode="dropdown"
					style={styles.picker}
					selectedValue={gender}
					onValueChange={(value) => setGender(value)}
					dropdownIconColor="white"
					themeVariant="dark"
				>
					<Picker.Item style={styles.item} label="Masculino" value="M" />
					<Picker.Item style={styles.item} label="Feminino" value="F" />
				</Picker>
				<View style={styles.buttons}>
					<CustomButtonIcon onPress={handleSave} label="Salvar" iconType={FontAwesome6} iconName="floppy-disk"/>
					<CustomButtonIcon onPress={signOut} label="Sair" iconType={FontAwesome6} iconName="arrow-right-from-bracket"/>
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
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 24,
	},
	subtitle: {
		color: "white",
		fontWeight: "semibold",
		fontSize: 20,
		marginVertical: 10,
	},
	item: {
		backgroundColor: "#242424",
		color: "white",
		fontSize: 16,
	},
	image_content: {
		position: "absolute",
		top: -50,
		marginLeft: "auto",
		elevation: 15,
		borderRadius: 99,
		width: 115,
		height: 115,
		backgroundColor: "#242424",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 115,
		height: 115,
		borderRadius: 99,
		alignItems: "center",
		justifyContent: "center",
	},
	card_profile: {
		marginVertical: 40,
		position: "relative",
		width: "100%",
		paddingTop: 80,
		paddingBottom: 20,
		paddingHorizontal: 20,
		alignItems: "center",
		backgroundColor: "#FF9500",
		borderRadius: 15,
	},
	buttons: {
		marginTop: 15,
		gap: 10,
	},
});
