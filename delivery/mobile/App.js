import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store';
import { Provider } from 'react-redux';
import OrdersScreen from './screens/OrdersScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Заказы' component={OrdersScreen} />
                    <Stack.Screen name='Заказ' component={OrderScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
