import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
                translucent={true}
            />
            
        </SafeAreaView>
    );
};

export default LoginScreen;