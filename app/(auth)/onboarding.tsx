
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

// Mock authentication hook
const useAuthMock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMockSignIn = async (provider: 'email' | 'google') => {
    setIsLoading(true);
    console.log(`Attempting to sign in with ${provider}...`);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Sign in successful!');
    setIsLoading(false);
    router.push('/(auth)/success');
  };

  return { handleMockSignIn, isLoading };
};

export default function OnboardingScreen() {
  const { handleMockSignIn, isLoading } = useAuthMock();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to XFitness</Text>
      <Text style={styles.subtitle}>Your personalized fitness journey starts here.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => handleMockSignIn('email')}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Signing In...' : 'Sign in with Email'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => handleMockSignIn('google')}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            {isLoading ? 'Signing In...' : 'Sign in with Google'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // bg-background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // text-foreground
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // text-muted-foreground
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 48,
    borderColor: '#ccc', // border-border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#000', // text-foreground
    backgroundColor: '#fff', // bg-card
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#000', // bg-primary
  },
  secondaryButton: {
    backgroundColor: '#eee', // bg-secondary
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // text-primary-foreground
  },
  secondaryButtonText: {
    color: '#000', // text-secondary-foreground
  },
});
