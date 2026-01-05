import { StyleSheet, Text, View } from 'react-native';

export default function LeaveRequests() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave Requests</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});