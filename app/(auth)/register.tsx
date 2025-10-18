
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMockAuth } from '../../hooks/useMockAuth';

export default function RegisterScreen() {
  const { signUp } = useMockAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (email && password) {
      signUp(email, password);
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 32, textAlign: 'center' },
  input: { height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, marginBottom: 16 },
  button: { height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
