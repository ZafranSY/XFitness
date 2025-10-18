
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Successful!</Text>
      <Text style={styles.message}>You can now log in with your new account.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 16 },
  message: { fontSize: 16, color: '#666', marginBottom: 32, textAlign: 'center' },
  button: { height: 48, width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
