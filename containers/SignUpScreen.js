import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async () => {
    // vérifier que tous les champs sont bien remplis
    // vérifier que les 2 MDP sont identiques
    // envoyer les données vers le back

    if (email && username && description && password && confirmPassword) {
      console.log("on passe à la suite");
      if (password === confirmPassword) {
        console.log("on passe à la suite 2");

        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log(response.data);
          if (response.data.token) {
            setToken(response.data.token);
            navigation.navigate("Home");
          } else {
            alert("An error occurred");
          }
        } catch (error) {
          alert("catch");
          console.log(Object.keys(error)); // affiche les clés de l'objet error
          console.log(error.response.data.error); // Message du type : This email already has an account.
          console.log(error.response.status); // 400 par exemple

          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("mdp doivent êtres identiques");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.logo}>
          <Image
            source={require("../assets/airbnb_logo.png")}
            resizeMode="cover"
            style={styles.img}
          ></Image>
          <Text style={styles.titre}>Sign up</Text>
        </View>

        <View style={styles.input1}>
          <TextInput
            placeholder="email"
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
        <View style={styles.input2}>
          <TextInput
            placeholder="password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.input2}>
          <TextInput
            placeholder="confirm password"
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.errorView}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>

        <View style={styles.button}>
          <Button title="Sign up" color="grey" onPress={handleSubmit} />
        </View>
        <View style={styles.touche}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.touchstyle}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
  },
  img: { height: 160, width: 160, marginTop: 30 },
  logo: { justifyContent: "center", alignItems: "center" },
  titre: { fontSize: 30, color: "grey" },
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
  button: {
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

  touche: { marginLeft: 100, marginTop: 20 },
  touchstyle: { color: "grey" },
  error: {
    fontSize: 15,
    color: "red",
    marginLeft: 50,
  },
  errorView: {
    height: 30,
    backgroundColor: "white",
    width: 300,
    marginTop: 60,
    marginLeft: 60,
  },
});
