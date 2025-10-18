
import { useState, useEffect, SetStateAction } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';

const mockUser = {
  name: 'Demo User',
  token: 'mock-token',
};

export function useMockAuth() {
  // ✅ Fixed TS2345: added explicit null type to state
  const [currentUser, setCurrentUser] = useState<typeof mockUser | null>(mockUser);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const signIn = (email: string, password: string) => {
    console.log('Signing in with:', email, password);
    setCurrentUser(mockUser);
    router.replace('/(main)/dashboard');
  };

  const signUp = (email: string, password: string) => {
    console.log('Signing up with:', email, password);
    router.push('/(auth)/success');
  };

  const resetPassword = (email: string) => {
    console.log('Resetting password for:', email);
    alert('Password reset link sent! (mock)');
  };

  const signOut = () => {
    setCurrentUser(null);
    router.replace('/(auth)/login');
  };

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!currentUser && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
    if (currentUser && inAuthGroup) {
      router.replace('/(main)/dashboard');
    }
  }, [currentUser, segments, navigationState]);

  return { currentUser, signIn, signUp, resetPassword, signOut };
}
