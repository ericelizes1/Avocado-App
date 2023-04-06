import { StyleSheet, View, Text } from 'react-native';

export default function NotificationsHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Text style={styles.text}>Notifications</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});