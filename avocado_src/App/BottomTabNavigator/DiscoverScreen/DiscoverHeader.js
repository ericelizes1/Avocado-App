import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function DiscoverHeader() {
  const [searchText, setSearchText] = React.useState('');

  const handleSearch = () => {
    // handle search logic here
  };

  return (
    <View style={styles.header}>
        <SearchBar
          placeholder='Search "avocado"'
          onChangeText={setSearchText}
          value={searchText}
          onCancel={() => setSearchText('')}
          onClear={() => setSearchText('')}
          onSubmitEditing={handleSearch}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.text}
        />
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
  inputContainer: {
    backgroundColor: '#f2f2f2',
    height: 40,
    top: 7,
    borderRadius: 15,
  },
  text: {
    fontSize: 15,
  }
});