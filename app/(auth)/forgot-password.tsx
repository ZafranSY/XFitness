
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMockAuth } from '../../hooks/useMockAuth';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useMockAuth();
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (email) {
      resetPassword(email);
    } else {
      Alert.alert('Error', 'Please enter your email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
