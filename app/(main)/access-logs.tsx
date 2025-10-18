
import { Text, View, FlatList, StyleSheet } from 'react-native';

const accessLogs = [
  { id: 1, member: 'Alice Johnson', timestamp: '2023-10-26 08:00:12', type: 'Entry' },
  { id: 2, member: 'Bob Williams', timestamp: '2023-10-26 08:05:34', type: 'Entry' },
  { id: 3, member: 'Alice Johnson', timestamp: '2023-10-26 09:02:51', type: 'Exit' },
  { id: 4, member: 'Charlie Brown', timestamp: '2023-10-26 09:15:00', type: 'Entry' },
];

export default function AccessLogsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Logs</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Member</Text>
        <Text style={styles.headerText}>Timestamp</Text>
        <Text style={styles.headerText}>Type</Text>
      </View>
      <FlatList
        data={accessLogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.member}</Text>
            <Text style={styles.rowText}>{item.timestamp}</Text>
            <Text style={styles.rowText}>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  headerText: { fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowText: { flex: 1 },
});
