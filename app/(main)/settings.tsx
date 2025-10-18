
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useMockAuth } from '../../hooks/useMockAuth';

export default function SettingsScreen() {
  const { currentUser, signOut } = useMockAuth();

  const handleSignOut = () => {
    signOut();
  };

  const SettingItem = ({ label, value }: { label: string; value: string | undefined }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <SettingItem label="Name" value={currentUser?.name} />
        <SettingItem label="Email" value="demo@example.com" />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  section: { marginBottom: 24 },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { fontSize: 16, color: '#333' },
  value: { fontSize: 16, color: '#888' },
  signOutButton: { marginTop: 32, padding: 16, backgroundColor: '#ff3b30', borderRadius: 8, alignItems: 'center' },
  signOutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
