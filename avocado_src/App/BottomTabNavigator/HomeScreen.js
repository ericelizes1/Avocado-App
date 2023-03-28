import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReviewCard from '../components/ReviewCard';

export default function HomeScreen() {
  const data = [
    { id: '1', title: 'Review 1', description: 'This is review 1' },
    { id: '2', title: 'Review 2', description: 'This is review 2' },
    { id: '3', title: 'Review 3', description: 'This is review 3' },
    { id: '4', title: 'Review 4', description: 'This is review 4' },
    { id: '5', title: 'Review 5', description: 'This is review 5' },
    { id: '6', title: 'Review 6', description: 'This is review 6' },
    { id: '7', title: 'Review 7', description: 'This is review 7' },
    { id: '8', title: 'Review 8', description: 'This is review 8' },
    { id: '9', title: 'Review 9', description: 'This is review 9' },
    { id: '10', title: 'Review 10', description: 'This is review 10' },
  ];

  const renderItem = ({ item }) => (
    <ReviewCard/>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
      />
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
});