import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList } from "react-native";
import axios from "axios";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      console.log(response.data);
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

  return isLoading ? (
    <Text>en cour de chargement</Text>
  ) : (
    <View>
      <View>
        <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
          keyExtractor={(item) => item.price}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          console.log(item.photos.url);
          return (
            <Text>
              {item.photos.url} {item.price} {item.title}
            </Text>
          );
        }}
      />
    </View>
  );
}
