import { Redirect, Tabs } from "expo-router"
import { useSession } from "../../contexts/AuthContext"
import { Text } from "react-native"
import CustomTabBar from "../../components/CustomTabBar"

export default function Root() {
    const {session, isLoading} = useSession()

    if(isLoading){
        return <Text>Carregando...</Text>
    }

    if(!session){
        return <Redirect href="/sign-in"/>
    }
    
  return (
    <Tabs initialRouteName="index" tabBar={(props) => <CustomTabBar {...props}/>}>
        <Tabs.Screen name="workout" options={{headerShown: false, title: "Workout", tabBarIcon: "dumbbell"}}/>
        <Tabs.Screen name="home" options={{headerShown: false, title: "Home", tabBarIcon: "home"}}/>
        <Tabs.Screen name="profile" options={{headerShown: false, title: "Profile", tabBarIcon: "user-circle"}}/>
        <Tabs.Screen name="index" options={{href: null}}/>
    </Tabs>
  )
}