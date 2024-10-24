import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';

const StackNavigation = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"Login"}
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;