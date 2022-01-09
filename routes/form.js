import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PurchaseForm from "../components/PurchaseForm";
import Form from "../components/Form";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const FormStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Form"
        component={Form}
        options={{
          tabBarIcon: () => <MaterialIcons name="contacts" size={24} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PurchaseForm"
        component={PurchaseForm}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="currency-brl" size={24} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default FormStack;
