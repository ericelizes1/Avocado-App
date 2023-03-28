import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ReviewCard() {
  return (
    <View style={styles.container}>
      {/*Profile Bar*/}
      <View style={styles.profileBarContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('./ReviewCard/guyfieri.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      {/*Tag Bar*/}
      <View>
        <Text>Tag Bar</Text>
      </View>

      {/*Review Content*/}
      <Text>Review Content</Text>

      {/*Image*/}
      <Text>Image</Text>

      {/*Interact Bar*/}
      <View>
        <Text>Interact Bar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  profileBarContainer: {
    color: 'blue',
    flexDirection: 'row',
    height: 300,
    width: '100%',
  }
});