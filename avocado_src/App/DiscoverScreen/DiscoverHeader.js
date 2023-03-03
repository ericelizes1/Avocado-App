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
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        onCancel={() => setSearchText('')}
        onClear={() => setSearchText('')}
        onSubmitEditing={handleSearch}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        cancelButtonTitle="Cancel"
        cancelButtonProps={{ color: '#008080', width: '100%'}}
        containerStyle={{ backgroundColor: '#fff' }}
        inputContainerStyle={{ backgroundColor: '#f2f2f2' }}
        inputStyle={{ fontSize: 14 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
});