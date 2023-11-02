import { View, Text, StatusBar, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login({ navigation }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
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
    return (
        <ScrollView style={{ flex: 2, backgroundColor: '#fff', flexDirection: 'column' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={{ flex: 4, flexDirection: 'column', backgroundColor: '#fff', paddingTop: 10, paddingHorizontal: '3%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'OpenSans-semiBold', fontSize: 30, color: 'black' }}>Welcome Back</Text>
                </View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 14, padding: 10, color: "#777" }}>I am happy to see you again .You can continue where you left off by logging in</Text>

                <View style={{ flexDirection: 'column', paddingTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 25 }}>
                        <Icon name="envelope-o" size={22} color="#818181" />
                        <TextInput onChangeText={(text) => {
                            setformData((prevState) => ({
                                prevState, email: text
                            }))
                        }} style={styles.input} placeholder="Enter Email" placeholderTextColor="#818181" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 25, marginTop: 20 }}>
                        <Icon name="lock" size={22} color="#818181" />
                        <TextInput onChangeText={(text) => {
                            setformData((prevState) => ({
                                prevState, password: text
                            }))
                        }} style={styles.input} placeholder="Enter Password" placeholderTextColor="#818181" />
                    </View>
                    <View style={{ width: '95%' }}>
                        <Text style={{ fontSize: 17, fontFamily: 'OpenSans-SemiBold', color: '#818181', alignSelf: 'flex-end', paddingTop: 10 }} >Forgot Password?</Text>
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}> */}
                    <TouchableOpacity style={{
                        justifyContent: 'center', width: '90%',
                        backgroundColor: 'blue', height: 50, marginBottom: 30, borderRadius: 10
                    }}
                        onPress={() => navigation.navigate("DrawerNav")}>
                        <Text style={{
                            fontSize: 15, letterSpacing: 1.5,
                            textAlign: 'center', position: 'relative', fontFamily: 'OpenSans-SemiBold', color: 'white'
                        }}>Get Started</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>

            </View>

            <View style={{ flex: 4, flexDirection: 'column', backgroundColor: '#fff', paddingHorizontal: '3%' }}>
                <Text style={{
                    fontFamily: "openSans-Bold", textAlign: 'center',
                    marginVertical: 35, color: '#818181', fontSize: 20
                }}>Or</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '95%' }}>
                    <TouchableOpacity onPress={() => console.log("google login")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/google.png')} />
                        <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, fontFamily: 'OpenSans-Medium' }}>Sign in with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log("facebook login")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/facebook.png')} />
                        <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, fontFamily: 'OpenSans-Medium' }}>Sign in with facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 2, flexDirection: 'row', justifyContent: 'center', top: 20,
                    alignItems: 'flex-end', backgroundColor: '#fff', marginBottom: 100
                }}>
                    <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 17, color: '#818181' }}>Don't have a account?</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: 'black' }}>Sign Up</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        height: '100%',
        width: '90%',
        fontFamily: 'OpenSans-Medium',
        paddingLeft: 20,
    },
    social_btn: {
        height: 55,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center'
    },
    social_img: {
        width: 25,
        height: 25,
        marginLeft: 15
    }
})