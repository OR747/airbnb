import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    // vérifier que tous les champs sont bien remplis
    // vérifier que les 2 MDP sont identiques
    // envoyer les données vers le back

    if (email && password) {
      console.log("on passe à la suite");

      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,

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
          setId(response.data.id);
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
          <Text style={styles.titre}>Sign in</Text>
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
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.errorView}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <View style={styles.button}>
          <Button title="Sign in" color="grey" onPress={handleSubmit} />
        </View>
        <View style={styles.touche}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.touchstyle}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //justifyContent: "center",
  },
  img: { height: 160, width: 160 },
  logo: { paddingLeft: 120, marginTop: 140 },
  titre: { fontSize: 30, marginLeft: 35, color: "grey" },
  input1: {
    marginTop: 120,
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
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "white",

    width: 210,
    height: 65,
    marginTop: 90,
    borderColor: "red",
    borderRadius: 90,
    marginLeft: 105,
    color: "black",
    borderWidth: 2,
    borderColor: "#FFBAC0",
    justifyContent: "center",
    alignContent: "center",
  },
  textb: { color: "black" },

  touche: { marginLeft: 135, marginTop: 20 },
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
