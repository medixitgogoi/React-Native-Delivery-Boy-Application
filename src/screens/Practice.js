import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../auth/SplashScreen";
import Login from "../auth/Login";
import Home from "../screens/Home";
import TaskDetails from "../screens/TaskDetails";
import Profile from "../screens/Profile";
import Delivery from "../screens/Delivery";
import DeliveredOrders from "../screens/DeliveredOrders";
import TaskHistory from "../screens/TaskHistory";
import NewClientForm from "../screens/NewClientForm";
import Quotation from "../screens/Quotation";
import AddQuotation from "../screens/AddQuotation";
import Invoice from "../screens/Invoice";
import NewTask from "../screens/NewTask";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = "https://superlite.webinfoghy.co.in/";

const StackNavigation = () => {

    const dispatch = useDispatch();

    const [initialRoute, setInitialRoute] = useState("SplashScreen");

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const userToken = await AsyncStorage.getItem("userDetails");
                console.log('userToken: ', userToken);

                if (userToken) {
                    setInitialRoute("Home");

                    dispatch(addUser(JSON.parse(userToken)));
                } else {
                    setInitialRoute("Login");
                }
            } catch (error) {
                console.error("Error checking user status:", error);
                setInitialRoute("Login"); // Default to Login on error
            }
        };

        checkUserStatus();
    }, []);

    if (!initialRoute) {
        // Display a fallback (e.g., a loading screen) while determining the initial route
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="TaskDetails" component={TaskDetails} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Delivery" component={Delivery} />
                <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} />
                <Stack.Screen name="TaskHistory" component={TaskHistory} />
                <Stack.Screen name="NewClientForm" component={NewClientForm} />
                <Stack.Screen name="Quotation" component={Quotation} />
                <Stack.Screen name="AddQuotation" component={AddQuotation} />
                <Stack.Screen name="Invoice" component={Invoice} />
                <Stack.Screen name="NewTask" component={NewTask} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;