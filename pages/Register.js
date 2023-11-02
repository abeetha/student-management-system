import { View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Text } from 'react-native-paper';

export default function Register({ navigation }) {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatpassword, setRepeatPassword] = useState('');

    const saveStudent = () => {
        fetch('http://192.168.1.52:3000/api/login/register', {
            method: 'POST',
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                username: username,
                password: password,
                repeatpassword: repeatpassword,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <Text style={styles.text} variant="displayLarge">Register</Text>
            </View>
            <View style={{ flex: 6, }}>
                <View style={{ flex: 2, }}>
                    <TextInput value={fullname} onChangeText={(val) => { setFullName(val) }} label="FullName" mode='outlined' />
                </View>
                <View style={{ flex: 2, }}>
                    <TextInput value={email} onChangeText={(val) => { setEmail(val) }} label="Email" mode='outlined' />
                </View>
                <View style={{ flex: 2, }}>
                    <TextInput value={username} onChangeText={(val) => { setUserName(val) }} label="UserName" mode='outlined' />
                </View>
                <View style={{ flex: 2, }}>
                    <TextInput value={password} secureTextEntry={true} onChangeText={(val) => { setPassword(val) }} label="Password" mode='outlined' />
                </View>
                <View style={{ flex: 2, }}>
                    <Text variant="labelMedium">I Agree To The Terms Of User</Text>
                    <TextInput value={repeatpassword} secureTextEntry={true} onChangeText={(val) => { setRepeatPassword(val) }} label="Repeat Password" mode='outlined' />
                </View>
            </View>
            <View style={{ flex: 1, gap: 8, flexDirection: 'row' }}>
                {/* <Button onPress={() => { navigation.navigate('Login') }} title="Register" /> */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Text style={{ fontSize: 22, }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate('Register') }}
                >
                    <Text style={{ fontSize: 22, }}>Register</Text>
                </TouchableOpacity>
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
        top: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        height: 50,
        width: 180,
        // marginTop: 20,
        left: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
})