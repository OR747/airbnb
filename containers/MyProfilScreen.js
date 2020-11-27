import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

export default function MyProfilScreen({ setToken, setId, userId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log(response.data);

      setUserName(response.data.username);

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
    <ActivityIndicator size="large" color="#FFBAC0" />
  ) : (
    <View style={styles.container}>
      <View style={styles.input1}>
        <TextInput
          placeholder="email"
          //value={data.email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="usurname"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
      </View>
      <View style={styles.input3}>
        <TextInput
          placeholder="Describe yourself in a few words..."
          multiline={true}
          numberOfLines={10}
          maxLength={200}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <View style={styles.button0}>
        <Button title="Update" color="black" onPress={""} />
      </View>
      <View style={styles.button}>
        <Button
          title="Log Out"
          color="gray"
          onPress={() => {
            setToken(null);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  //inputs//

  input1: {
    marginTop: 30,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  input3: {
    height: 100,

    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "white",
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#FFBAC0",
  },
  button0: {
    backgroundColor: "white",

    width: 210,
    height: 65,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 90,
    marginLeft: 105,
    borderWidth: 2,
    borderColor: "#FC8083",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    backgroundColor: "lightgray",

    width: 210,
    height: 65,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 90,
    marginLeft: 105,
    borderWidth: 2,
    borderColor: "#FC8083",
    justifyContent: "center",
    alignContent: "center",
  },
});
