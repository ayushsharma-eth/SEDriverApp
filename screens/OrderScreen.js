import { Image, Text, View, Pressable, Animated, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import {useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';

import banana from './banana.png'
import Icon from 'react-native-vector-icons/Ionicons';

import MapView from 'react-native-maps';
import {StyleSheet, Polyline, Dimensions} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

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
  let [toggled2, setToggled2] = useState(false);
  let [delayToggle, setDelayToggle] = useState(false);
  let [expandMessage, setExpandMessage] = useState("View Order");
  let [completionMessage, setCompletionMessage] = useState("Complete Order");
  let [deliveryTime, setDeliveryTime] = useState(0);
  let [deliveryDistance, setDeliveryDistance] = useState(0);

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

  const handlePress2 = () => {
    setToggled2((prev) => !prev)
    if (completionMessage === "Complete Order")
        //insert call to update status
        setCompletionMessage("Delivery Complete")
    else
        navigation.navigate('Home', {
            userInfo: userInfo
          })
  }


  const handlePress = () => {
    setToggled((prev) => !prev)
    if (expandMessage === "View Order")
        //insert call to update status
        setExpandMessage("Minimize Order")
    else
        setExpandMessage("View Order")
  }

  const statusMessage = "Out for Delivery" // get from Server
  const ETA = "10:15 am" // get from Server
  const [coordinates] = useState ([
    {
        latitude: 33.12783688178995,
        longitude: -96.72796024170364,
      },
      {
        latitude: 33.165510,
        longitude: -96.743950,
      },
  ]);
  //const apiKey = process.env.NODE_ENV[GOOGLE_API_KEY];

  return (
    <View>
        {/* Nav (white bar with back button) */}
        {/* Full Screen Map, centered on restaurant initially */}
        
        <MapView
            initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
            }}
            className='w-full h-[100vh] relative'
        >
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={'API_KEY'} // insert your API Key here
          strokeWidth={4}
          strokeColor="#33A5FF"
          onReady={result => {
            //MapData.distance = result.distance
            //MapData.duration = result.duration
            setDeliveryDistance(result.distance * 0.621371)
            setDeliveryTime(result.duration)
            console.log(`Distance: ${result.distance} km`)
            console.log(`Distance: ${result.distance * 0.621371} miles`)
            console.log(`Duration: ${result.duration} min.`)
            //forceUpdate()
          }}
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        </MapView>

        {/* Dev Nav */}
        {/* <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Home</Text>
        </Pressable> */}

        <View style={{position: 'absolute',  bottom: 85, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View 
                id="main-bow" 
                style={{height: height.interpolate({inputRange: [0, 1], outputRange: [400, 600]})}}
                className="w-[85vw] bg-[#FAF9F6] mx-auto rounded-3xl border-[1px]"
            >
                <Text className='text-3xl text-black font-bold pl-5 pt-7 mb-[-20px]'>{statusMessage}</Text>
                <Text className='text-lg text-black font-medium pl-5 pt-7 pb-3'>{parseFloat(deliveryDistance).toFixed(2)} miles, {parseFloat(deliveryTime).toFixed(2)} mins </Text>
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
                {toggled2 ? <TouchableOpacity onPress={() => handlePress2()} className="bg-green-500 w-[75vw] mx-auto items-center py-5 rounded-xl mb-5">
                    <Text className="font-medium text-white text-xl">{completionMessage}</Text>
                </TouchableOpacity>
                : <TouchableOpacity onPress={() => handlePress2()} className="bg-blue-500 w-[75vw] mx-auto items-center py-5 rounded-xl mb-5">
                <Text className="font-medium text-white text-xl">{completionMessage}</Text>
            </TouchableOpacity>}
            </Animated.View>
        </View>
    </View>
  )
}
