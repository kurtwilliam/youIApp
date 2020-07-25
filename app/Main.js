import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";

const Main = () => {
  const [searchText, setSearchText] = useState("Search");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  safeArea: {
    flex: 1
  },
  search: {
    paddingLeft: 4,
    borderColor: "grey",
    borderWidth: 1
  }
});

export default Main;
