import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

export default function CustomTextInput({label, placeholder, value, onChangeText, secureTextEntry, refer}) {

	const [isFocused, setIsFocused] = useState(false)

	return (
		<View>
			{label && <Text style={[styles.label, isFocused && {color: "#FF9500"}]}>{label}</Text>}
			<TextInput
				style={[styles.input, isFocused && {borderColor: "#FF9500"}]}
				selectionColor="#FF9500"
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				placeholderTextColor="grey"
				value={value}
				onChangeText={onChangeText}
				onFocus={()=>setIsFocused(true)}
				onBlur={()=>setIsFocused(false)}
				ref={refer}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
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
})
