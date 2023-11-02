import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
export default function Welcome({ navigation }) {
    setTimeout(()=>{
       navigation.replace('Home')
    },5000)
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#7474FF' }}>
            <Image source={require('../assets/icons/icons8-student-80.png')} style={{ width: 150, height: 150 }} />
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 25, color: 'white' }}>Student Management System</Text>
        </View>
    )
}