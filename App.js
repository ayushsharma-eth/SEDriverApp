import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback, Text } from 'react-native'
// Import all screens
import InitialScreen from './screens/InitialScreen'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderScreen from './screens/OrderScreen';

import Icon from 'react-native-vector-icons/Ionicons';


// App navigation use stack system, pages are push on top of another and can be popped off with back button
const Stack = createNativeStackNavigator();

// NOTE: Never push Maps API key onto GitHub


// The Restaurant and Order Screens will be generalized with props
export default function App() {

  

  return (
    <NavigationContainer headerMode="screen">
      <Stack.Navigator initialRouteName='InitialScreen'>
        <Stack.Screen name='Initial' component={InitialScreen} options={({headerShown: false})}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name='Restaurant' component={RestaurantScreen} />
        <Stack.Screen name='Order' component={OrderScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}