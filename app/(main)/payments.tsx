
import { Text, View, FlatList, StyleSheet } from 'react-native';
import usePaymentStore from '../../store/usePaymentStore';

export default function PaymentsScreen() {
  const { payments } = usePaymentStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text>Member ID: {item.memberId}</Text>
            <Text>{item.date}</Text>
            <Text>${item.amount}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  paymentItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  status: { color: 'green' },
});
