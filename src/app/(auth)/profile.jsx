import { View, Text, Button } from 'react-native'
import React from 'react'
import { useSession } from '../../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
    const {signOut} = useSession()

  return (
    <SafeAreaView>
        <View>
            <Text>Profile</Text>
            <Button title='Sair' onPress={signOut}/>
        </View>
    </SafeAreaView>
  )
}