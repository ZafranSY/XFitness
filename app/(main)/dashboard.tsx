
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

// Mock data for recent workouts
const mockWorkouts = [
  { id: '1', name: 'Full Body Strength', date: '2024-07-28', duration: '60 min' },
  { id: '2', name: 'Morning Run', date: '2024-07-27', duration: '30 min' },
  { id: '3', name: 'Yoga & Meditation', date: '2024-07-26', duration: '45 min' },
  { id: '4', name: 'HIIT Cardio', date: '2024-07-25', duration: '20 min' },
];

// A reusable component for displaying a single statistic
const StatCard = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <LinearGradient colors={['#000000', '#1E1E1E', '#2c3e50']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header with Title and Log Out button */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Pressable onPress={signOut}>
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <StatCard label="Workouts" value="12" />
            <StatCard label="Time" value="10h 30m" />
            <StatCard label="Calories" value="5,400" />
          </View>

          {/* Recent Activity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <FlatList
              data={mockWorkouts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.workoutItem}>
                  <View>
                    <Text style={styles.workoutName}>{item.name}</Text>
                    <Text style={styles.workoutDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.workoutDuration}>{item.duration}</Text>
                </View>
              )}
              scrollEnabled={false} // Since it's inside a ScrollView
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFD700', // Yellow color for emphasis
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#B0B0B0',
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  workoutItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  workoutDate: {
    fontSize: 12,
    color: '#B0B0B0',
    marginTop: 4,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
