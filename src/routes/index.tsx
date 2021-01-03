import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import AddBook from "../screens/AddBook";
import CreateReader from "../screens/CreateReader";
import CreateLoan from "../screens/CreateLoan";
import UpdateBook from "../screens/UpdateBook";
import UpdateReader from "../screens/UpdateReader";
import UpdateLoan from "../screens/UpdateLoan";

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomNavigation} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="CreateReader" component={CreateReader} />
        <Stack.Screen name="CreateLoan" component={CreateLoan} />
        <Stack.Screen name="UpdateBook" component={UpdateBook} />
        <Stack.Screen name="UpdateReader" component={UpdateReader} />
        <Stack.Screen name="UpdateLoan" component={UpdateLoan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
