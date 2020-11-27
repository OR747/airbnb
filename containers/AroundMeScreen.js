import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

// console.log(width);
// console.log(height);

export default function ArrounMeScreen() {
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms/around",
        { latitude, longitude }
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const askPermissionAndGetLocation = async () => {
      // console.log("ask permission");
      const { status } = await Location.requestPermissionsAsync();
      console.log(status);

      if (status === "granted") {
        console.log("Permission acceptée");

        const location = await Location.getCurrentPositionAsync();
        // console.log(location);
        // console.log(location.coords.latitude);
        // console.log(location.coords.longitude);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } else {
        console.log("Permission refusée");
      }
    };
    askPermissionAndGetLocation();
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#FFBAC0" />
  ) : (
    <MapView
      style={styles.map}
      // provider={PROVIDER_GOOGLE}
      initialRegion={{
        // latitude: 37.785834,
        // longitude: -122.406417,
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
    >
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
            />
          </TouchableOpacity>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
