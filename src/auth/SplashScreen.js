import { useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Animated, Image } from 'react-native';
import { purple, green } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
    
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        // Start the fade-in animation when the component is mounted
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade to opacity 1
            duration: 1800, // Duration of animation in ms
            useNativeDriver: true, // Use native driver for better performance
        }).start(() => {
            // After the animation completes, navigate to the Login screen
            navigation.navigate('Login');
        });
    }, [fadeAnim]);

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <StatusBar
                animated={true}
                backgroundColor={green}
                barStyle="light-content"
            />

            <LinearGradient
                colors={[green, purple]}
                style={{ height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >

                <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Image
                            source={require("../assets/splashLogo.png")}
                            style={{
                                width: 270,
                                height: 270,
                                resizeMode: 'contain',
                            }}
                        />
                    </Animated.View>
                </View>

            </LinearGradient>
        </SafeAreaView>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({});
