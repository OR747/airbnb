import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, ActivityIndicator } from "react-native";
import axios from "axios";

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    //console.log("Rentre dans le useEffect");
    fetchData();
  }, [id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="#FFBAC0" />
  ) : (
    <View>
      <Text>user id : {route.params._id}</Text>
      <Text>{item.title}</Text>
    </View>
  );
}
