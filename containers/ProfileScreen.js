import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import axios from "axios";

export default function ProfileScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
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
      <Text>user id : {params.userId}</Text>
    </View>
  );
}
