
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useMemberStore from '../../../store/useMemberStore';
import usePaymentStore from '../../../store/usePaymentStore';
import type { Member, Payment } from '../../../types/global';

export default function MemberDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { members } = useMemberStore();
  const { payments } = usePaymentStore();

  // ✅ Fixed TS7006: added explicit parameter type
  const member = members.find((m: Member) => m.id.toString() === id);
  // ✅ Fixed TS7006: added explicit parameter type
  const memberPayments = payments.filter((p: Payment) => p.memberId.toString() === id);

  if (!member) {
    return <Text>Member not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: member.avatar }} style={styles.avatar} />
        <Text style={styles.memberName}>{member.name}</Text>
      </View>

      <Text style={styles.sectionTitle}>Payment History</Text>
      <FlatList
        data={memberPayments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
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
  profileHeader: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
  memberName: { fontSize: 24, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  paymentItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  status: { color: 'green' },
});
