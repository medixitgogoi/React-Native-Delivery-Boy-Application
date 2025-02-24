import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { addUser } from '../redux/UserSlice';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';

axios.defaults.baseURL = "https://superlite.webinfoghy.co.in/";

const StackNavigation = () => {

    const dispatch = useDispatch();

    const loginDetails = useSelector(state => state.user);

    const [isAppLoading, setIsAppLoading] = useState(true);

    const isUserLoggedIn = loginDetails?.length > 0 && loginDetails.some(item => item.accessToken);

    // loadLoginDetails
    useEffect(() => {
        const loadLoginDetails = async () => {
            try {
                const storedLoginDetails = await AsyncStorage.getItem('userDetails');

                if (storedLoginDetails) {
                    dispatch(addUser(JSON.parse(storedLoginDetails)));
                }
            } catch (error) {
                Alert.alert(error.message);
            } finally {
                setIsAppLoading(false);
            }
        };

        loadLoginDetails();
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isAppLoading) {
        return (
            <NavigationContainer>
                <AuthStackNavigator initialRoute="SplashScreen" />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <GuestStackNavigator /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;