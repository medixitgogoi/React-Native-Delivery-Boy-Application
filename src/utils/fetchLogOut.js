import axios from "axios";
import { Alert } from "react-native"; // Import Alert if you're using React Native

export const fetchLogOut = async (userDetails) => { // Pass userDetails as a parameter
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails?.[0]?.accessToken}`;
        const response = await axios.get('/api/user/logout');

        console.log('logout: ', response);

        // return response?.data?.grocery; // Return data inside the try block after receiving the response
    } catch (error) {
        Alert.alert("Error", error.message); // Add a title to the alert
        return null; // Return null in case of error
    }
};