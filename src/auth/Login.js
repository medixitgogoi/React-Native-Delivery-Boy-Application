import { Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { green, purple } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

    // const userDetails = useSelector(state => state.user);
    // console.log('userDetails: ', userDetails);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [show, setShow] = useState(true);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    // Login
    const handleLoginSubmit = async () => {
        // Ensure all fields are filled
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Missing Information',
                text2: !email
                    ? 'Email is required.'
                    : 'Password is required.',
                position: 'top',
                topOffset: 5,
            });

            return;
        }

        try {
            setLoading(true);

            // Data object as per the API requirement
            const data = {
                email: email,
                password: password,
            };

            // API Call using axios
            const response = await axios.post(`/api/user/login`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('login response: ', response);

            // Handle success response
            if (response.data.status) {

                Toast.show({
                    type: 'success',
                    text1: 'Login successful',
                    text2: response?.data?.message,
                    position: 'top',
                    topOffset: 5,
                });

                const userInfo = {
                    name: response?.data?.data,
                    // email: response?.data?.data?.email,
                    // mobileNumber: response?.data?.data?.mobile,
                    accessToken: response?.data?.access_token,
                    // password: password,
                    // gender: response?.data?.data?.gender,
                };

                dispatch(addUser(userInfo));
                await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));

                // Reset the navigation stack so the user cannot go back to the Login screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });

                setEmail('');
                setPassword('');
            } else {
                Toast.show({
                    type: 'error',
                    text1: response?.data?.message || 'Something went wrong.',
                    text2: 'Please check your credentials and try again.',
                    position: 'top',
                    topOffset: 5,
                });
            }

            setLoading(false);
        } catch (error) {
            // Handle error response
            console.log('Error: ', error?.response);

            if (error?.response) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.response?.data?.message || 'Something went wrong. Please try again.',
                    position: 'top',
                    topOffset: 5,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Network error. Please check your internet connection and try again.',
                    position: 'top',
                    topOffset: 5,
                });
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={'#d4ecc8'}
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
            <View style={{ flex: 1, backgroundColor: '#d6edcb' }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'padding'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ height: "100%" }}>
                            {/* Image */}
                            <View style={{ height: "50%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("../assets/logo.png")} style={{ width: 280, height: 280, }} resizeMode='contain' />
                            </View>

                            {/* Content */}
                            <View style={{ height: "48%", paddingVertical: 5, flexDirection: 'column', gap: 15, justifyContent: 'flex-end' }}>
                                {/* Headline */}
                                <Text style={{ color: green, textAlign: "center", fontSize: responsiveFontSize(3.2), fontWeight: "700", textTransform: "uppercase", marginBottom: 10 }}>Welcome Back!</Text>

                                {/* Email */}
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: "88%", alignSelf: 'center', borderRadius: 8, gap: 5 }}>
                                        <Icon name="email-outline" size={23} color={'#363636'} />
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Email</Text>
                                    </View>

                                    <View style={{ alignSelf: "center", width: "88%", paddingHorizontal: 14, backgroundColor: "#F8F8F8", elevation: 8, borderRadius: 12, borderColor: isEmailFocused ? purple : "", borderWidth: isEmailFocused ? 1.5 : 0, marginVertical: 4 }}>
                                        <TextInput
                                            style={{ height: 45, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setEmail}
                                            value={email}
                                            placeholderTextColor="#abb0ba"
                                            keyboardType='email-address'
                                            onFocus={() => setIsEmailFocused(true)}
                                            onBlur={() => setIsEmailFocused(false)}
                                        />
                                    </View>
                                    {errors.email && <Text style={{ color: purple, fontSize: responsiveFontSize(1.6), paddingLeft: 35 }}>{errors.email}</Text>}
                                </View>

                                {/* Password */}
                                <View style={{ marginBottom: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: "88%", alignSelf: 'center', borderRadius: 8, gap: 3 }}>
                                        <Icon name="lock-outline" size={23} color={'#363636'} />
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Password</Text>
                                    </View>

                                    <View style={{ alignSelf: "center", width: "88%", paddingHorizontal: 15, backgroundColor: "#F8F8F8", elevation: 8, borderRadius: 12, borderColor: isPasswordFocused ? purple : "", borderWidth: isPasswordFocused ? 1.5 : 0, marginTop: 4 }}>
                                        <TextInput
                                            style={{ fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", height: 45 }}
                                            onChangeText={setPassword}
                                            value={password}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            secureTextEntry={show}
                                        />
                                        <View style={{ position: 'absolute', right: 5, top: 12 }}>
                                            <Icon2
                                                name={show ? 'eye-off' : 'eye'}
                                                onPress={() => setShow(!show)}
                                                style={{
                                                    color: purple,
                                                    fontSize: responsiveFontSize(2.2),
                                                    width: 30,
                                                    height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            />
                                        </View>
                                    </View>

                                    {errors.password && <Text style={{ color: purple, fontSize: responsiveFontSize(1.6), paddingLeft: 35 }}>{errors.password}</Text>}
                                </View>

                                {/* Log in button */}
                                <TouchableOpacity onPress={handleLoginSubmit} style={{ alignSelf: "center", width: "88%", height: 55, marginBottom: 20, marginTop: errors.password ? 0 : 10, backgroundColor: green, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, elevation: 1 }}>
                                    {loading ? (
                                        <ActivityIndicator size='small' color={'#fff'} />
                                    ) : (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: "#000", fontWeight: "700", fontSize: responsiveFontSize(2.5) }}>
                                                LOGIN
                                            </Text>
                                            <Icon3 name="login" size={23} color={'#000'} />
                                        </View>
                                    )}
                                </TouchableOpacity>

                                {/* Error Message */}
                                {errors.api && <Text style={{ color: purple, textAlign: 'center', fontSize: responsiveFontSize(2) }}>{errors.api}</Text>}
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
    },
    loadingContainer: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderRadius: 3,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 15,
    },
});