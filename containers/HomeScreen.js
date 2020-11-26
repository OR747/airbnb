import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    //console.log("Rentre dans le useEffect");
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
    <View style={styles.container0}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                navigation.navigate("Room", {
                  id: item._id,
                  //room: item,
                });
              }}
            >
              <View style={styles.container1}>
                <View style={styles.image}>
                  <Image
                    source={{
                      uri: item.photos[0].url,
                    }}
                    resizeMode="cover"
                    onPress={() => {
                      navigation.navigate("Profile", { userId: item._id });
                    }}
                    style={styles.img}
                  ></Image>
                </View>
                <View style={styles.price}>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    {item.price}€
                  </Text>
                </View>
              </View>
              <View style={styles.container3}>
                <View style={styles.container2}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.rating}>
                    <View style={styles.ratingValue}>
                      {displayStars(item.ratingValue)}
                      <Text style={styles.review}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                </View>
                <Image
                  source={{
                    uri: item.user.account.photo.url,
                  }}
                  resizeMode="cover"
                  style={styles.img2}
                ></Image>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  //container0//
  container0: {
    paddingHorizontal: 20,
  },

  //logo//
  logo: { justifyContent: "center", alignItems: "center" },
  img1: { height: 60, width: 60 },
  img: {
    height: 230,
    width: 450,
  },
  //container1//
  container1: { position: "relative" },
  image: { justifyContent: "center", alignItems: "center" },
  //price//
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
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  img2: {
    height: 85,
    width: 85,
    borderRadius: 50,
    //borderWidth: 2,
    // borderColor: "#FC8083",
    top: -30,
  },
});
