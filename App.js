import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./routes/home";
import AboutStack from "./routes/about";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { LogBox } from "react-native";
import Login from "./screens/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useEffect } from "react/cjs/react.development";

LogBox.ignoreLogs(["Setting a timer"]);

const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default function App() {
  const [login, setLogin] = useState(false);
  // const { state } = useContext(AuthContext);

  useEffect(() => {
    // console.log(state.user);
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AuthProvider setLogin={setLogin}>
          <Drawer.Navigator initialRouteName={login ? "Home" : "Login"}>
            {login ? (
              <Drawer.Screen
                name="Home"
                options={{ headerTitle: "Home" }}
                component={HomeStack}
              />
            ) : (
              <Drawer.Screen name="Login" component={Login} />
            )}
            <Drawer.Screen
              name="About"
              options={{ headerTitle: "About" }}
              component={AboutStack}
            />
          </Drawer.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("main", () => App);
