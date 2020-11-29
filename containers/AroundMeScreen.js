import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import MapView from "react-native-maps";

export default function AroundMeScreen() {
  const [coords, setCoords] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //const [data, setData] = useState();
  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        //   demander la permission d'accès à la localisation
        const { status } = await Location.requestPermissionsAsync();
        // console.log(status);

        let response;

        if (status === "granted") {
          // Récupérer les coordonnées GPS de l'utilisateur

          const location = await Location.getCurrentPositionAsync();
          //   console.log(location);

          const lat = location.coords.latitude;
          const lng = location.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);

          // requête en indiquant latitude et longitude

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${lat}&longitude=${lng}`
          );
          console.log(response.data.length);
        } else {
          // requête sans indiquer latitude et longitude
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
          //   console.log(response.data.length);
        }

        // On stocke dans le state coords un tableau contenant seulement les localisations des annonces
        const coordsTab = [];
        for (let i = 0; i < response.data.length; i++) {
          //   console.log(response.data[i].location);
          coordsTab.push({
            latitude: response.data[i].location[1],
            longitude: response.data[i].location[0],
          });
        }
        // console.log(coordsTab);
        setCoords(coordsTab);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("ERROR");
      }
    };
    getLocationAndData();
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
        // latitude: latitude,
        // longitude: longitude,
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
    >
      {coords.map((item, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          />
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
