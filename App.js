import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import List from './pages/List';
import Register from './pages/Register';
import Home from './pages/Home'
import DrawerNav from './pages/DrawerNav'
import Welcome from './pages/Welcome'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}> */}
      <Stack.Navigator >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  }
})