import { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import useMemberStore from '../../../store/useMemberStore';

// This is the actual Members list screen content, ensuring we show the correct UI.
export default function MembersScreen() {
  // Use the Zustand store to access and filter member data
  const { members, filteredMembers, filterMembers } = useMemberStore();

  useEffect(() => {
    filterMembers(''); // Initially display all members
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search members..."
        // Pass the input text directly to the filtering function
        onChangeText={filterMembers}
      />
      <FlatList
        // Determine which list to display: filtered list if populated, otherwise the full list
        data={filteredMembers.length > 0 ? filteredMembers : members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.memberName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: { height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, marginBottom: 16 },
  memberItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
  memberName: { fontSize: 16 },
});
