
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const notifications = [
  { id: 1, title: 'New Member Signup', message: 'Alice Johnson just signed up.' },
  { id: 2, title: 'Payment Received', message: 'Received $50 from Bob Williams.' },
  { id: 3, title: 'Upcoming Class', message: 'Yoga class starts in 1 hour.' },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => alert('UI only')}>
        <Text style={styles.buttonText}>Create Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  notificationItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  button: { height: 48, width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', marginTop: 16 },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
