import { Image, Text, View, Pressable, Animated, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import {useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';

import banana from './banana.png'
import Icon from 'react-native-vector-icons/Ionicons';

import MapView from 'react-native-maps';

import { Marker } from 'react-native-maps';

// Phone Icon: https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png
// images/text_icon.png

export default function OrderScreen({navigation, route}) {

  const { userInfo } = route.params;

  navigation.setOptions({
    headerShown: true,
    headerTitle: "",
    headerTransparent: true,
    headerMode: "screen",
    headerLeft: () => {
      return (
      <TouchableWithoutFeedback 
          onPress={() => navigation.navigate('Home', {
            userInfo: userInfo
          })}
      >
        <Icon name="ios-arrow-back" size={56} color="#000" />
      </TouchableWithoutFeedback>
      )
    }
  })
  
  let [toggled, setToggled] = useState(false);
  let [delayToggle, setDelayToggle] = useState(false);
  let [expandMessage, setExpandMessage] = useState("View Order");
  const height = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: toggled ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [toggled]);

  useDidMountEffect(() => {
    if(!delayToggle) {
        const timer = setTimeout(() => {
            setDelayToggle(true)
        }, 300);
        return () => clearTimeout(timer);
    }
    else
        setDelayToggle(false)
  }, [toggled]);


  const handlePress = () => {
    setToggled((prev) => !prev)
    if (expandMessage === "View Order")
        setExpandMessage("Minimize Order")
    else
        setExpandMessage("View Order")
  }

  const statusMessage = "Driving to Restaurant" // get from Server
  const ETA = "10:15 am" // get from Server

  return (
    <View>
        {/* Nav (white bar with back button) */}
        {/* Full Screen Map, centered on restaurant initially */}
        
        <MapView
            initialRegion={{
            latitude: 33.12783688178995,
            longitude: -96.72796024170364,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            }}
            className='w-full h-[100vh] relative'
        >
            <Marker
                coordinate={{ latitude : 33.12783688178995 , longitude : -96.72796024170364 }}
            />
        </MapView>

        {/* Dev Nav */}
        {/* <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Home</Text>
        </Pressable> */}

        <View style={{position: 'absolute',  bottom: 85, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View 
                id="main-bow" 
                style={{height: height.interpolate({inputRange: [0, 1], outputRange: [300, 500]})}}
                className="w-[85vw] bg-[#FAF9F6] mx-auto rounded-3xl border-[1px]"
            >
                <Text className='text-3xl text-black font-bold pl-5 pt-7 mb-[-20px]'>{statusMessage}</Text>
                <Text className='text-lg text-black font-medium pl-5 pt-7 pb-3'>Estimated Arrival Time: {ETA}</Text>
                {delayToggle && <Text className='text-lg text-black font-medium pl-5'>Order Details</Text>}
                {/* Show Order if Expanded */}
                {delayToggle && 
                <View className='ml-5 mt-3'>
                    <FlatList
                        data={[
                        {key: '1x Diet Coke'},
                        {key: '3x 3 Taco Meal'},
                        {key: '1x 2 Taco Meal'},
                        {key: '3x Burrito'},
                        {key: '1x Number 7'},
                        ]}
                        renderItem={({item}) => <Text className="ml-5 text-bold text-lg">{item.key}</Text>}
                    />
                </View>}
                
                {/* Spacer */}
                <View className="flex-1"></View>
                {/* Driver Card (Picture, Name, Contact Buttons) */}
                <View className='w-full flex flex-row px-[5vw] justify-between'>
                    <View className="flex flex-row">
                        <Image 
                            className='w-[60px] h-[60px] rounded-full mb-4 mr-2'
                            source={{uri: 'https://image.shutterstock.com/image-photo/stock-photo-close-up-headshot-portrait-of-smiling-s-caucasian-man-look-at-camera-posing-in-own-flat-or-250nw-1936610998.jpg'}}
                        />
                        <Text className='mx-auto text-2xl mt-3'>
                            John Smith
                        </Text>
                    </View>
                    <View className="flex flex-row">
                        <Pressable className="bg-blue-500 w-[45px] h-[45px] mt-2 justify-center items-center mr-2 rounded-full">
                            <Image 
                                className='w-[25px] h-[25px]'
                                source={{uri: 'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png'}}
                            />
                        </Pressable>
                        <Pressable className="bg-blue-500 w-[45px] h-[45px] mt-2 justify-center items-center rounded-full">
                            <Image 
                                className='w-[25px] h-[25px]'
                                source={require('../images/text_icon.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                {/* View Order Button */}
                <TouchableOpacity onPress={() => handlePress()} className="bg-blue-500 w-[75vw] mx-auto items-center py-5 rounded-xl mb-5">
                    <Text className="font-medium text-white text-xl">{expandMessage}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    </View>
  )
}