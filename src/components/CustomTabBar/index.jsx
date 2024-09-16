import { View, Text, TouchableOpacity, StyleSheet, Platform, } from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import React from 'react'

export default function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {state.routes.map((route, index)=>{
            const {options} = descriptors[route.key]

            const isFocused = state.index === index;

            const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                })

                if(!isFocused && !event.defaultPrevented){
                    navigation.navigate({name: route.name, merge: true})
                }
            }

            const onLongPress = () => {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                })
            }

            return (
                <TouchableOpacity
                key={index}
                accessibilityRole='button'
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.buttonTab}
                >
                    <View>
                        <View>
                            <FontAwesome5 name={options.tabBarIcon} size={20} color={ isFocused ? "#FF9500" : "white"}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        flexDirection: "row",
        marginBottom: Platform.OS === "ios" ? 38 : 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#171717",
        width: "85%",
        borderRadius: 10
    },
    buttonTab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 15
    }
})