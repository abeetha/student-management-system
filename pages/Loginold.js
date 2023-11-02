import { View, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import Hyperlink from 'react-native-hyperlink'
import { TextInput, Text } from 'react-native-paper';

export default function Login({ navigation }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        console.log(username + " " + password);
        fetch('http://192.168.1.52:3000/api/login/login', {
            method: 'POST',
            body: JSON.stringify({
                // username: username,
                // password: password,
                username: 'abeetha',
                password: '1234asdf',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((json) => {
                console.log('=========', json);
                if (json == "Login Success") {
                    // navigation.navigate('List');
                    navigation.navigate('DrawerNav');
                }
                else {
                    Alert.alert('Login Failed', 'Your username or password is incorrect.');
                }
            });
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 2, }}>
                <Text style={styles.text} variant="displayLarge">LOGIN</Text>
            </View>
            <View style={{ flex: 6, }}>
                <View style={{ flex: 2, }}>
                    <TextInput style={{ borderRadius: 80, height: 75 }} placeholder="UserName" value={username} onChangeText={(val) => { setUserName(val) }} label="UserName" mode='outlined' />
                </View>
                <View style={{ flex: 2, }}>
                    <TextInput style={{ borderRadius: 80, height: 75 }} value={password} secureTextEntry={true} onChangeText={(val) => { setPassword(val) }} label="Password" mode='outlined' />
                </View>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => login()}
                    >
                        <Text style={{ fontSize: 22, }}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 2, }}>
                <View style={{ flex: 2, }}>
                    <Hyperlink linkStyle={{ color: 'red', fontSize: 22 }} linkDefault={true}>
                        <Text style={{ fontSize: 15 }}>
                            Don't have an account.
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { navigation.navigate('Register') }}
                        >
                            <Text style={{ fontSize: 22, }}>Sign Up</Text>
                        </TouchableOpacity>
                    </Hyperlink>
                </View>
            </View>
        </View>
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
        alignItems: 'center',
        backgroundColor: 'lightblue',
        height: 50,
        width: 200,
        // marginTop: 20,
        left: 100,
        justifyContent: 'center',
        borderRadius: 10
    },
})