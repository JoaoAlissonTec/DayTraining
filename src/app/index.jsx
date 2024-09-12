import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { useSession } from '../contexts/AuthContext';

export default function index() {
  const {session, isLoading} = useSession()

    if(isLoading){
        return <Text>Carregando...</Text>
    }
    
    if(!session){
        return <Redirect href="/sign-in"/>
    }

  return <Redirect href="(auth)" />;
}