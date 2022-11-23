import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';

const fetch = require("node-fetch");



import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import * as Location from 'expo-location';



// Component to Show Restaurants quickly


function RestaurantCard({navigation, data, userInfo}) {

  return (
      <TouchableOpacity className='border-2 border-gray-300 rounded-2xl w-[85vw] pb-2 mt-8' 
        onPress={() => navigation.navigate('Restaurant', {
          data: data,
          userInfo: userInfo
        })}
      >
        <ImageBackground
            className='w-[85vw] h-[150px] ml-[-2px] mt-[-2px] overflow-hidden rounded-t-2xl'
            source={{uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg'}}
        />
        <View className="flex flex-row justify-between">

            <Text className="pl-4 pt-2 text-2xl font-medium my-auto">{data.name}</Text>
            <View>
              <Text className="pr-4 pt-2 text-md font-medium text-right">4.7 [stars]</Text>
              <Text className="pr-4 text-md font-medium text-right">2 mi [*] 10 min</Text>
            </View>
        </View>
      </TouchableOpacity>
  )
}

function HomeScreen({navigation, route}) {

  const { userInfo } = route.params;
  const [text, setText] = useState('have not called');

  const [restaurants, setRestaurants] = useState([]);

  const getText = () => {
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/4')
    .then(async(res) => await res.json())
    .then((data) => {
      console.log(data);
      setText(data[0].xCor);
    })
  }

  const getRestaurants = () => {
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/4')
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurants(restaurants => [...restaurants, data[0]])
    })
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/5')
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurants(restaurants => [...restaurants, data[0]])
      console.log(data[0]);
    })
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/6')
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurants(restaurants => [...restaurants, data[0]])
    })
    
  }

  useEffect(() => {
    getRestaurants();
  }, [])

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let texte = 'Waiting..';
  if (errorMsg) {
    texte = errorMsg;
  } else if (location) {
    texte = JSON.stringify(location);
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-white">

        
        {/* Render all restaurants */}
        <View className='h-8'/>
        {
          restaurants.map((e, i) => {
            return (
              <RestaurantCard navigation={navigation} data={restaurants[i]} userInfo={userInfo} />
            )
          })
        }

        {/* Dev Nav Buttons */}
        <Pressable onPress={() => navigation.navigate('Order', {
          userInfo: userInfo
        })} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Active Order</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Initial')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Sign Out</Text>
        </Pressable>
        <Pressable onPress={() => getText()} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">{texte}</Text>
        </Pressable>

        {/* Testing Map View for use in Order Screen and thumbnail view on Home Screen. These coords map to a Taco Bell. */}
        <MapView
            initialRegion={{
            latitude: 33.12783688178995,
            longitude: -96.72796024170364,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            }}
            className='w-full h-[400px]'
        >
            <Marker
                coordinate={{ latitude : 33.12783688178995 , longitude : -96.72796024170364 }}
            />
        </MapView>
            

      </View>
    </ScrollView>
  )
}

export default HomeScreen