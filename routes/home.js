import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/Main";
import FormStack from "./form";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen
        name="FormStack"
        component={FormStack}
        options={{ headerTitle: "Formulário" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
