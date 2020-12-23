import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Book from "../screens/Book";
import Loan from "../screens/Loan";
import Reader from "../screens/Reader";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Book"
      tabBarOptions={{
        activeTintColor: "#009FE6",
        inactiveTintColor: "#BEC0D2",
        tabStyle: {
          maxHeight: 80,
        },
        labelStyle: {
          fontSize: 14,
          paddingTop: 0,
        },
        iconStyle: {
          paddingBottom: 0,
          backgroundColor: 'red'
        },
      }}
    >
      <Tab.Screen
        name="Book"
        component={Book}
        options={{
          tabBarLabel: "Livre",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Loan"
        component={Loan}
        options={{
          tabBarLabel: "Prets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reader"
        component={Reader}
        options={{
          tabBarLabel: "Lecteur",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
