import { ScrollView, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function InitialScreen({navigation}) {
  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className='text-xl'>[Customer App]</Text>
        <Text className='text-xl'>Logo Goes Here</Text>
      </View>
      {/* Login and Sign Up with pull up different forms, but for now, skip to Home page */}
      <View className="w-[80vw] mb-20">
        <Pressable onPress={() => navigation.navigate('Login')} className="bg-white w-full items-center py-5 mb-5 rounded-full">
          <Text className="font-medium text-xl">Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUp')} className="bg-white w-full items-center py-5 rounded-full">
          <Text className="font-medium text-xl">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default InitialScreen