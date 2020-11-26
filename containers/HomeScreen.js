import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList, Image, StyleSheet } from "react-native";
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

  return isLoading ? (
    <Text>en cour de chargement</Text>
  ) : (
    <View>
      <View style={styles.logo}>
        <Image
          source={require("../assets/airbnb_logo.png")}
          resizeMode="cover"
          style={styles.img1}
        ></Image>
      </View>
      {/* <View>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View> */}
      <View style={styles.container0}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            // console.log(item.photos.url);
            return (
              <View>
                <View style={styles.container1}>
                  <View style={styles.image}>
                    <Image
                      source={{
                        uri:
                          "https://a2.muscache.com/im/pictures/a560cdc0-425d-4d7b-ab8a-f98481eeb23f.jpg",
                      }}
                      resizeMode="cover"
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
                    <Text style={styles.title}>{item.title} </Text>
                    <View style={styles.rating}>
                      <View style={styles.ratingValue}>
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <Text style={styles.review}>
                          {item.reviews} reviews
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Image
                    source={{
                      uri:
                        "https://a1.muscache.com/im/users/4654829/profile_pic/1410285266/original.jpg?aki_policy=profile_x_medium",
                    }}
                    resizeMode="cover"
                    style={styles.img2}
                  ></Image>
                </View>
              </View>
            );
          }}
        />
      </View>
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
    borderWidth: 2,
    borderColor: "#FC8083",
    top: -30,
  },
});
