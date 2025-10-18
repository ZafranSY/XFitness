import { Redirect } from 'expo-router';

// This file serves as the initial route entry point, but all authentication
// and loading logic is handled in app/_layout.tsx. This Redirect ensures
// that we immediately defer control to the main logic in the parent router.
export default function Index() {
  // The RootLayoutNav will handle redirecting to /(auth)/login or /(main)/dashboard.
  return <Redirect href="/(main)/dashboard" />;
}