import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Platform,
  Button,
  TouchableHighlight
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Video } from "expo-av";

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
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
          />
          <TouchableHighlight
            onPress={() => {
              console.log("pressed");
            }}
          >
            <View>
              <AntDesign name="caretright" size={24} color="black" />
            </View>
          </TouchableHighlight>
        </View>
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
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0 // android status bar padding
  },
  search: {
    paddingLeft: 4,
    borderColor: "grey",
    borderWidth: 1
  },
  video: { width: "100%", minHeight: 250 },
  videoContainer: { width: "100%", marginTop: 8 }
});

export default Main;
