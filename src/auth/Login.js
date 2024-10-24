import { Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator, ImageBackground, Alert, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { green, purple } from '../utils/colors';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [show, setShow] = useState(true);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: "#fff", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={'#b3f1f4'}
                barStyle="dark-content"
            />
            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#b3f1f4', '#fff']}
                style={{ flex: 1 }}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'padding'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ height: "100%" }}>
                            {/* Image */}
                            <View style={{ height: "42%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("../assets/logo.png")} style={{ width: 280, height: 280, }} resizeMode='contain' />
                                <Text style={{ color: purple, textTransform: 'uppercase', fontSize: responsiveFontSize(3.2), fontWeight: '600' }}>Dr. mall</Text>
                            </View>

                            {/* Content */}
                            <View style={{ height: "58%", paddingVertical: 5, flexDirection: 'column', gap: 15, justifyContent: 'flex-end' }}>

                                {/* Headline */}
                                <Text style={{ color: "#000", textAlign: "center", color: '#1ec7ce', fontSize: responsiveFontSize(3.2), fontWeight: "700", textTransform: "uppercase", marginBottom: 10 }}>Welcome Back!</Text>

                                {/* Email */}
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: "88%", alignSelf: 'center', borderRadius: 8, display: loading ? 'none' : "flex", gap: 5 }}>
                                        <Icon name="email-outline" size={23} color={'#363636'} />
                                        <Text style={{ color: '#5f5f5f', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Email</Text>
                                    </View>

                                    <View style={{ alignSelf: "center", width: "88%", paddingHorizontal: 14, backgroundColor: "#f1f3f6", elevation: 8, borderRadius: 8, borderColor: isEmailFocused ? purple : "", borderWidth: isEmailFocused ? 1.5 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ height: 40, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: "88%", alignSelf: 'center', borderRadius: 8, display: loading ? 'none' : "flex", gap: 3 }}>
                                        <Icon name="lock-outline" size={23} color={'#363636'} />
                                        <Text style={{ color: '#5f5f5f', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Password</Text>
                                    </View>

                                    <View style={{ alignSelf: "center", width: "88%", paddingHorizontal: 15, backgroundColor: "#f1f3f6", elevation: 8, borderRadius: 8, borderColor: isPasswordFocused ? purple : "", borderWidth: isPasswordFocused ? 1.5 : 0, marginTop: 2 }}>
                                        <TextInput
                                            style={{ fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", height: 40 }}
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
                                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignSelf: "center", width: "88%", height: 55, marginBottom: 20, marginTop: errors.password ? 0 : 10 }}>
                                    <LinearGradient
                                        colors={[green, purple]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            flexDirection: 'row',
                                            gap: 5
                                        }}
                                    >
                                        <Text style={{ color: "#000", fontWeight: "700", fontSize: responsiveFontSize(2.5) }}>
                                            LOGIN
                                        </Text>
                                        <Icon3 name="login" size={23} color={'#000'} />
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* Error Message */}
                                {errors.api && <Text style={{ color: purple, textAlign: 'center', fontSize: responsiveFontSize(2) }}>{errors.api}</Text>}
                            </View>

                            {/* Loading Spinner */}
                            {loading && (
                                <View style={styles.loadingOverlay}>
                                    <BlurView
                                        style={styles.absolute}
                                        blurType="light"
                                        blurAmount={10}
                                        reducedTransparencyFallbackColor="#818181"
                                    />
                                    <View style={styles.loadingContainer}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Logging you in ...</Text>
                                        <ActivityIndicator size="large" color={purple} />
                                    </View>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
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