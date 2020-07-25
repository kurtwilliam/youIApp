import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const API_KEY = "AIzaSyCdv2KFnYJWbo0LvwQ2BxXb-D0EHJM3MRM";

const Main = () => {
  const [searchText, setSearchText] = useState("");
  const [video, setVideo] = useState({});
  const [playing, setPlaying] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState([0, 0]);
  const playerRef = useRef(null);

  const getVideo = () =>
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&maxResults=1&key=${API_KEY}`
    )
      .then(response => response.json())
      // if length of results array is 0 (no results)
      // make object error
      .then(jsonObj =>
        setVideo(
          jsonObj.items.length > 0
            ? jsonObj.items[0]
            : { error: "Error: no results for this search." }
        )
      )
      .catch(error => {
        console.error(error);
      });

  useEffect(() => {
    setScreenDimensions([
      Dimensions.get("window").width,
      Dimensions.get("window").height
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={() => getVideo()}
          placeholder={"Search"}
        />
        <View style={styles.videoContainer}>
          {typeof video === "object" &&
          Object.keys(video).length > 0 &&
          !video.error ? (
            <YoutubePlayer
              ref={playerRef}
              height={(screenDimensions[0] * 9) / 16}
              width={screenDimensions[0]}
              videoId={video.id && video.id.videoId ? video.id.videoId : ""}
              play={playing}
              onChangeState={event =>
                event === "paused" ? setPlaying(false) : setPlaying(true)
              }
              onReady={() => console.log("ready")}
              onError={e => console.log(e)}
              playbackRate={1}
              initialPlayerParams={{
                cc_lang_pref: "us",
                showClosedCaptions: false
              }}
            />
          ) : (
            <View
              style={[
                styles.videoNull,
                {
                  height: (screenDimensions[0] * 9) / 16,
                  width: screenDimensions[0]
                }
              ]}
            >
              <Text>
                {video && video.error
                  ? video.error
                  : "Please search for a video above."}
              </Text>
            </View>
          )}

          {typeof video === "object" && Object.keys(video).length === 0 ? (
            <View></View>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => (playing ? setPlaying(false) : setPlaying(true))}
            >
              <View
                style={{
                  paddingTop: 4,
                  paddingBottom: 4,
                  marginLeft: 4,
                  backgroundColor: "white"
                }}
              >
                {playing ? (
                  <AntDesign name="pause" size={24} color="#21272f" />
                ) : (
                  <AntDesign name="caretright" size={24} color="#21272f" />
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {typeof video === "object" && Object.keys(video).length === 0 ? (
          <View></View>
        ) : (
          <View style={styles.videoInfoCont}>
            <Text
              numberOfLines={4}
              style={(styles.videoInfo, styles.videoTitle)}
            >
              {typeof video === "object" &&
              Object.keys(video).length > 0 &&
              !video.error
                ? video.snippet.title
                : "Title"}
            </Text>
            <Text
              numberOfLines={4}
              style={(styles.videoInfo, styles.videoDesc)}
            >
              {typeof video === "object" &&
              Object.keys(video).length > 0 &&
              !video.error
                ? video.snippet.description
                : "Description"}
            </Text>
            <Text
              numberOfLines={4}
              style={(styles.videoInfo, styles.videoChannelTitle)}
            >
              {typeof video === "object" &&
              Object.keys(video).length > 0 &&
              !video.error
                ? video.snippet.channelTitle
                : "Channel Name"}
            </Text>
          </View>
        )}
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
    paddingTop: Platform.OS === "android" ? 25 : 0, // android status bar padding,
    backgroundColor: "#f9f9fb"
  },
  search: {
    paddingLeft: 8,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "white"
  },
  videoContainer: { width: "100%", marginTop: 8, marginLeft: -8 },
  videoInfo: {
    width: "100%",
    marginTop: 8,
    borderColor: "grey"
  },
  videoTitle: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 24,
    color: "#21272f"
  },
  videoDesc: {
    color: "#586271",
    fontSize: 14
  },
  videoChannelTitle: {
    color: "#21272f",
    fontSize: 14
  },
  videoNull: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "grey"
  }
});

export default Main;
