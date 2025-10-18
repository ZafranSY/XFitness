import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function MainLayout() {
  const { signOut } = useAuth();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#151515',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#151515',
        },
        tabBarActiveTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarLabel: 'Dashboard',
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Pressable onPress={signOut}>
              <Ionicons name="log-out-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarLabel: 'Workouts',
          title: 'Workouts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          tabBarLabel: 'Members',
          title: 'Members',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
