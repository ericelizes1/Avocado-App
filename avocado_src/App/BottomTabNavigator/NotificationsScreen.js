import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NewPostButton from '../components/NewPostButton';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text>No new notifications</Text>
      <StatusBar style="auto" />
      <View style={styles.floatingButtonContainer}>
        <NewPostButton/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    center: 0,
  },
});