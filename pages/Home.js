import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, }}>
      <ImageBackground source={require('../assets/images/handshake.jpg')} resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} >
        {/* <View style={{ flex: 3, flexDirection: "column", backgroundColor: '#ddd' }}>
        <ImageBackground source={require('../assets/images/handshake.jpg')} style={{ flex: 1, width: '100%', backgroundColor: '#fff' }} />
      </View> */}
        <View style={{ flex: 5, }}>
          <View style={{
            flex: 1, flexDirection: 'column', top: 40,
            justifyContent: 'flex-start', alignItems: 'center',

          }}>
            <Text style={{
              fontFamily: 'OpenSans-Bold', color: 'black',
              fontSize: 40
            }}>Student</Text>
            <Text style={{
              fontFamily: 'OpenSans-Bold', color: 'black',
              fontSize: 40
            }}>Management</Text>
            <Text style={{
              fontFamily: 'OpenSans-Bold', color: 'black',
              fontSize: 40
            }}>System</Text>

          </View>
        </View>
        <View>
          <Text style={{
            fontFamily: 'OpenSans-Medium',
            color: 'black', fontSize: 24,padding:25
          }}>All Student Details In One Place</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity style={{
            justifyContent: 'center', width: '90%',
            backgroundColor: 'blue', height: 50, marginBottom: 30, borderRadius: 10
          }}
            onPress={() => navigation.navigate("Login")}>
            <Text style={{
              fontSize: 15, letterSpacing: 1.5,
              textAlign: 'center', position: 'relative', fontFamily: 'OpenSans-SemiBold', color: 'white'
            }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}