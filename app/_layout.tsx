
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useLoadedResources } from '../hooks/useLoadedResources';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setNavigationReady] = useState(false);
  const isLoading = useLoadedResources();

  useEffect(() => {
    if (!isLoading) {
      setNavigationReady(true);
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }
    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      router.replace('/(main)/dashboard');
    } else if (!user && inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [user, segments, router, isNavigationReady]);

  if (!isNavigationReady) {
    return <View />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
