import { View, Text, StyleSheet } from 'react-native';

export default function Members() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Members</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
