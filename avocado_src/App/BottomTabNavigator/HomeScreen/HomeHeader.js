import { StyleSheet, View, Text, Image } from 'react-native';

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Image source={require('../../../assets/logo.png')} style={styles.image}/>
        <Text style={styles.text}>Home</Text>
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