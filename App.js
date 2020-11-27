import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//components
import Logo from "./components/Logo";
//icônes

//containers
import HomeScreen from "./containers/HomeScreen";
import MyProfilScreen from "./containers/MyProfilScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";

import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("UserId");
    }
  };
  setUserId(id);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserId(userId);
      setUserToken(userToken);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>

          <Stack.Screen name="SignIn">
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitle: () => <Logo />,
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitle: () => <Logo />,
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/*AroundMe*/}

                <Tab.Screen
                  name="Around Me"
                  options={{
                    headerTitle: () => <Logo />,
                    // permet d'ajouter dans le header le logo du components Logo pour l'afficher
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-pin"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around Me"
                        options={{
                          headerTitle: () => <Logo />,
                        }}
                      >
                        {() => <AroundMeScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="MyProfil"
                  options={{
                    tabBarLabel: "MyProfil",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="MyProfil"
                        options={{
                          headerTitle: () => <Logo />,
                        }}
                      >
                        {() => <MyProfilScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
