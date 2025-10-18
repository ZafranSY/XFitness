import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native'; // <-- IMPORT ActivityIndicator & StyleSheet
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useLoadedResources } from '../hooks/useLoadedResources';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setNavigationReady] = useState(false);
  const isLoading = useLoadedResources();

  useEffect(() => {
    // Only set navigation ready and hide splash screen once resources are loaded
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

    // LOGIC: If a user exists AND we are in the auth group (e.g., /login), redirect to dashboard.
    if (user && inAuthGroup) {
      router.replace('/(main)/dashboard');
      return;
    }

    // LOGIC: If no user exists AND we are NOT in the auth group, redirect to login.
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
      return;
    }
    // Note: If (user exists AND we are not in auth group) OR (no user exists AND we are in auth group), do nothing - the navigation is correct.

  }, [user, segments, router, isNavigationReady]);

  if (!isNavigationReady) {
    // 💡 FIX: Return a visual loading component during the waiting period to prevent perceived stalling.
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Slot />;
}

// Add necessary styles to ensure the loading view covers the screen
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}