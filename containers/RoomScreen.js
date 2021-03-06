import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
export default function RoomScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("Rentre dans le useEffect");

    fetchData();
  }, []);

  const displayStars = (ratingValue) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push(<FontAwesome name="star" size={24} color="#F5CC0B" key={i} />);
      } else {
        tab.push(<FontAwesome name="star" size={24} color="grey" key={i} />);
      }
    }

    return tab;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="#FFBAC0" />
  ) : (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: data.photos[0].url,
        }}
        resizeMode="cover"
        style={styles.img}
      ></Image>

      <View style={styles.price}>
        <Text style={{ color: "white", fontSize: 20 }}>{data.price}€</Text>
      </View>
      <View style={styles.container3}>
        <View style={styles.container2}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}{" "}
          </Text>
          <View style={styles.rating}>
            <View style={styles.ratingValue}>
              {displayStars(data.ratingValue)}
              <Text style={styles.review}>{data.reviews} reviews</Text>
            </View>
          </View>
        </View>
        <Image
          source={{
            uri: data.user.account.photo.url,
          }}
          resizeMode="cover"
          style={styles.img2}
        ></Image>
      </View>
      <TouchableOpacity
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        <Text
          numberOfLines={displayAllText === false ? 3 : null}
          style={styles.descirption}
        >
          {data.description}
        </Text>
      </TouchableOpacity>
      {/* <Text>{data.location}</Text> */}

      <MapView
        style={styles.map}
        initialRegion={{
          //   latitude: 37.785834,
          //   longitude: -122.406417,
          latitude: data.location[1],
          longitude: data.location[0],
          // latitude: 48.856614,
          // longitude: 2.3522219,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  conatiner: { flex: 1 },
  img: {
    height: 300,
    width: 450,
  },
  price: {
    //borderWidth: 2,
    //borderColor: "#FC8083",
    width: 90,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    top: -60,
  },
  //container2//
  container2: {
    top: -30,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    width: 280,
  },
  //title//
  title: { fontSize: 20 },
  //reviews//
  review: { fontSize: 14 },
  ratingValue: {
    flexDirection: "row",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "space-between",
    width: 220,
    marginTop: 10,
  },
  //container3//
  container3: {
    flexDirection: "row",
    //borderWidth: 2,
    //borderColor: "#FC8083",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomColor: "#FFBAC0",
    // borderBottomWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  img2: {
    height: 85,
    width: 85,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    top: -30,
  },
  descirption: {
    fontSize: 16,
    paddingHorizontal: 20,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    marginTop: -30,
  },
  map: {
    paddingHorizontal: 20,
    marginTop: 30,
    height: 300,
    width: 450,
  },
});
