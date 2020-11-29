import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import { useNavigation } from "@react-navigation/core";
//package
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//icons et colors
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors";
import Message from "../components/Message";

export default function MyProfilScreen({ setToken, userId }) {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);

  // new data
  const [newEmail, setNewEmail] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPicture, setNewPicture] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);

  useEffect(() => {
    console.log("Rentre dans le useEffect");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const id = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      console.log(userId);
      console.log(token);

      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setUserName(response.data.username);
      setEmail(response.data.email);
      setDescription(response.data.description);
      setNewUserName(response.data.username);
      setNewEmail(response.data.email);
      setNewDescription(response.data.description);

      if (response.data.photo) {
        setPicture(response.data.photo.url);
        setNewPicture(response.data.photo.url);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // update informations

  const editInformations = async () => {
    setIsLoading(true);

    if (
      newEmail !== email ||
      newUserName !== username ||
      newDescription !== description ||
      newPicture !== picture
    ) {
      try {
        // update picture
        if (newPicture !== picture) {
          const uri = newPicture;
          const uriParts = uri.split(".");
          const fileType = uriParts[1];

          const formData = new FormData();
          formData.append("photo", {
            uri,
            name: `userPicture`,
            type: `image/${fileType}`,
          });

          const response = await axios.put(
            `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
            // "http://localhost:3000/user/upload_picture",
            formData,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(response.data);
          if (response.data) {
            setPicture(response.data.photo[0].url);
            setIsLoading(false);
          }
        }

        // update email / username / description
        if (
          newEmail !== email ||
          newUserName !== username ||
          newDescription !== description
        ) {
          const obj = {};
          if (newEmail !== email) {
            obj.email = newEmail;
          }
          if (newUserName !== username) {
            obj.username = newUserName;
          }
          if (newDescription !== description) {
            obj.description = newDescription;
          }

          const response = await axios.put(
            `https://express-airbnb-api.herokuapp.com/user/update`,
            // "http://localhost:3000/user/update",
            obj,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          if (response.data) {
            setUserName(response.data.username);
            setEmail(response.data.email);
            setDescription(response.data.description);
          } else {
            setDisplayMessage({
              message: "An error occurred",
              color: "error",
            });
          }
        }

        setDisplayMessage({
          message: "Your profile has been updated",
          color: "success",
        });
        setIsLoading(false);
      } catch (error) {
        setDisplayMessage({
          message: "error",
          color: "error",
        });
        setIsLoading(false);
        fetchData();
      }
    } else {
      setDisplayMessage({
        message: "Please change at least one information",
        color: "error",
      });
      setIsLoading(false);
    }
  };

  // get picture from image library

  const uploadPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setNewPicture(result.uri);
      }
    }
    setDisplayMessage(false);
  };

  // get picture from camera

  const takePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setNewPicture(result.uri);
      }
    }
    setDisplayMessage(false);
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="#FFBAC0" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.pictureView}>
          {newPicture ? (
            <Image
              source={{ uri: newPicture }}
              style={styles.picture}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5 name="user-alt" size={100} color={colors.lightGrey} />
          )}
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              uploadPicture();
            }}
          >
            <MaterialIcons name="photo-library" size={30} color={colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              takePicture();
            }}
          >
            <FontAwesome5 name="camera" size={30} color={colors.grey} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.input1}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="usurname"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
      </View>
      <View style={styles.input3}>
        <TextInput
          placeholder="Describe yourself in a few words..."
          value={description}
          multiline={true}
          numberOfLines={10}
          maxLength={200}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <View style={styles.view}>
        {displayMessage && (
          <Message
            message={displayMessage.message}
            color={displayMessage.color}
          />
        )}
      </View>
      <View style={styles.button0}>
        <Button title="Update" color="black" onPress={editInformations} />
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  //images et photos
  picture: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  pictureView: {
    marginVertical: 20,
    width: 170,
    height: 170,
    borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.lightPink,
    borderWidth: 2,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  icons: {
    marginLeft: 20,
  },
  iconButton: {
    marginTop: 40,
  },
  view: {
    height: 30,
  },
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
