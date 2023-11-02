import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import List from './List'
import Login from './Login'
import About from './About'
import Home from './Home'
import { Text, Button } from 'react-native-paper';
import { red } from 'react-native-reanimated';
const Drawer = createDrawerNavigator();


export default function DrawerNav({ navigation }) {
    return (
        <Drawer.Navigator drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Home');
                    }} style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 100, width: '80%', marginTop: '220%', marginLeft: '3%' }}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="List" component={List} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontFamily: 'Lobster-Regular',
        textAlign: 'center',
        top: 50,
    },
    button: {
        // textAlign: 'center',
        // alignItems: 'center',
        backgroundColor: 'blue',
        height: 50,
        width: 100,
        // marginTop: 20,
        // left: 5,
        // justifyContent: 'center',
        borderRadius: 10,
        // position: 'absolute',
        // bottom: 0,
        // justifyContent: 'center'
    },
})