import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const Data = async () => {
    try {
      const response = await axios.get(
        " https://express-airbnb-api.herokuapp.com/rooms"
      );
      //console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <View>
        <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
      <FlatList
        data={Data}
        renderItem={({ item }) => {
          console.log(item.price);
          return <Text>{item.price}</Text>;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
