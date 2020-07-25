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
  TouchableWithoutFeedback,
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

  const getVideo = () =>
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&maxResults=1&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(jsonObj => setVideo(jsonObj.items[0]))
      .catch(error => {
        console.error(error);
      });

  useEffect(() => {
    setScreenDimensions([
      Dimensions.get("window").width,
      Dimensions.get("window").height
    ]);
  }, []);
  console.log("video", video);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={() => getVideo()}
        />
        <View style={styles.videoContainer}>
          {Object.keys(video).length === 0 ? (
            <View style={styles.videoNull(screenDimensions[0])}>
              <Text>Please search for a video above.</Text>
            </View>
          ) : (
            <YoutubePlayer
              ref={playerRef}
              height={(screenDimensions[0] * 9) / 16 - 16}
              width={screenDimensions[0] - 16}
              videoId={video.id && video.id.videoId ? video.id.videoId : ""}
              play={playing}
              onChangeState={event =>
                event === "playing" ? setPlaying(true) : setPlaying(false)
              }
              onReady={() => console.log("ready")}
              onError={e => console.log(e)}
              playbackRate={1}
              initialPlayerParams={{
                cc_lang_pref: "us",
                showClosedCaptions: false
              }}
            />
          )}

          <TouchableWithoutFeedback
            onPress={() => (playing ? setPlaying(false) : setPlaying(true))}
          >
            <View>
              {playing ? (
                <AntDesign name="pause" size={24} color="black" />
              ) : (
                <AntDesign name="caretright" size={24} color="black" />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.videoInfoCont}>
          <Text numberOfLines={4} style={styles.videoInfo}>
            {Object.keys(video).length === 0 ? "Title" : video.snippet.title}
          </Text>
          <Text numberOfLines={4} style={styles.videoInfo}>
            {Object.keys(video).length === 0
              ? "Description"
              : video.snippet.description}
          </Text>
          <Text numberOfLines={4} style={styles.videoInfo}>
            {Object.keys(video).length === 0
              ? "Channel Name"
              : video.snippet.channelTitle}
          </Text>
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
  },
  videoNull: screenWidth => ({
    justifyContent: "center",
    alignItems: "center",
    height: (screenWidth * 9) / 16 - 16,
    width: screenWidth - 16
  })
});

export default Main;
