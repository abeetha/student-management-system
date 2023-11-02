import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper';

export default function About() {
    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo}
                source={require('../assets/images/Abeetha3.jpg')}
            />
            <TouchableOpacity style={styles.button} >
                <Text variant="displaySmall">Abeetha Abeysundera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text variant="titleLarge">abeethaabeysundera@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text variant="titleLarge">+940770400134</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    tinyLogo: {
        width: 200,
        height: 200,
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        padding: 20,
        top: 50
    },
})