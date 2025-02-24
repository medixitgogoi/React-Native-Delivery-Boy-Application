import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from '../screens/TaskDetails';
import Delivery from '../screens/Delivery';
import DeliveredOrders from '../screens/DeliveredOrders';
import TaskHistory from '../screens/TaskHistory';
import NewClientForm from '../screens/NewClientForm';
import Quotation from '../screens/Quotation';
import AddQuotation from '../screens/AddQuotation';
import Invoice from '../screens/Invoice';
import NewTask from '../screens/NewTask';
import QuotationDetails from '../screens/QuotationDetails';
import Clients from '../screens/Clients';

const GuestStackNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
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
            <Stack.Screen name="Clients" component={Clients} />
            <Stack.Screen name="NewTask" component={NewTask} />
            <Stack.Screen name="QuotationDetails" component={QuotationDetails} />
        </Stack.Navigator>
    )
}

export default GuestStackNavigator;