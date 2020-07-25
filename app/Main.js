import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Platform,
  Button,
  TouchableHighlight,
  Dimensions
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const API_KEY = "AIzaSyCdv2KFnYJWbo0LvwQ2BxXb-D0EHJM3MRM";

const Main = () => {
  const [searchText, setSearchText] = useState("Search");
  const [video, setVideo] = useState({});
  const [playing, setPlaying] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState([0, 0]);
  const playerRef = useRef(null);

  const getVideo = () => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/search?part=${searchText}&key=[${API_KEY}])`
    )
      .then(response => response.json())
      .then(jsonObj => setVideo(jsonObj))
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setScreenDimensions([
      Dimensions.get("window").width,
      Dimensions.get("window").height
    ]);

    console.log("fetch", getVideo());
    console.log(video);
  }, []);
  console.log("video", video);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <View style={styles.videoContainer}>
          <YoutubePlayer
            ref={playerRef}
            height={(screenDimensions[0] * 9) / 16 - 16}
            width={screenDimensions[0] - 16}
            videoId={"AVAc1gYLZK0"}
            play={playing}
            onChangeState={event => console.log(event)}
            onReady={() => console.log("ready")}
            onError={e => console.log(e)}
            // volume={100}
            playbackRate={1}
            initialPlayerParams={{
              cc_lang_pref: "us",
              showClosedCaptions: false
            }}
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
        <View style={styles.videoInfoCont}>
          <Text style={styles.videoInfo}>Title</Text>
          <Text style={styles.videoInfo}>Description</Text>
          <Text style={styles.videoInfo}>Channel Name</Text>
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
  videoContainer: { width: "100%", marginTop: 8 },
  videoInfo: {
    width: "100%",
    marginTop: 8,
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 4
  }
});

export default Main;
