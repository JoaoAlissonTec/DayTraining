import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSession } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function App() {

  const {signIn} = useSession()
  const router = useRouter()

  function handleClick(){
    if(signIn()){
      router.replace("(auth)")
    }
  }

  return (
    <View style={styles.container}>
      <Button title='teste' onPress={handleClick}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});