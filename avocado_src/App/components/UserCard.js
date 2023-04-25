import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function UserCard() {
  return (
    <View style={styles.container}>
      <Text>UserCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});