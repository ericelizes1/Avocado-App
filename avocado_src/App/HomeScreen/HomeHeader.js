import { StyleSheet, View, Text, Image } from 'react-native';

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.image}/>
        <Text style={styles.text}>Home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 25,
    paddingLeft: 10,
    fontWeight: 'bold',
  }
});