import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Button, TextInput, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


function SignUpScreen({navigation}) {

    navigation.setOptions({
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
        headerMode: "screen",
        headerLeft: () => {
          return (
          <TouchableWithoutFeedback 
              onPress={() => navigation.navigate('Initial')}
          >
            <Icon name="ios-arrow-back" size={56} color="#fff" />
          </TouchableWithoutFeedback>
          )
        }
      })

  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [decision, setDecision] = useState(0); // 0 = email, 1 = phone
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const signUp = () => {
    if (firstName && lastName) {
        if (password && repassword) {
            if (password != repassword) {
                //setErrorMessage("Passwords Do Not Match") Already Displayed
            }
            else if (!decision) { // email
                fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/createUserByEmail/${email}/${password}`)
                    .then(async(res) => await res.json())
                    .then((data) => {
                        if (data == "success")
                        {
                            fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getUserByEmail/${email}`)
                            .then(async(res) => await res.json())
                            .then((data) => {
                                let name = firstName + " " + lastName
                                fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/updateUserName/${data[0].id}/${name}`)
                                .then(async(res) => await res.json())
                                .then((data) => {
                                    fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/loginUserByEmail/${email}/${password}`)
                                    .then(async(res) => await res.json())
                                    .then(async (data) => {
                                        navigation.navigate('Home', {
                                            userInfo: data
                                        })
                                    })
                                })
                            })
                        }
                        else
                        {
                            setErrorMessage("Server Error, Account Failed to be Created")
                        }
                    })
            } else { // phone
                fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/createUserByEmail/${phoneNumber}/${password}`)
                    .then(async(res) => await res.json())
                    .then((data) => {
                        if (data == "success")
                        {
                            fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getUserByEmail/${phoneNumber}`)
                            .then(async(res) => await res.json())
                            .then((data) => {
                                let name = firstName + " " + lastName
                                fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/updateUserName/${data[0].id}/${name}`)
                                .then(async(res) => await res.json())
                                .then((data) => {
                                    fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/loginUserByEmail/${email}/${password}`)
                                    .then(async(res) => await res.json())
                                    .then(async (data) => {
                                        navigation.navigate('Home', {
                                            userInfo: data
                                        })
                                    })
                                })
                            })
                        }
                        else
                        {
                            setErrorMessage("Server Error, Account Failed to be Created")
                        }
                    })
            }
        }
        else if (password)
        {
            setErrorMessage("Re-Enter Password")
        }
        else
        {
            setErrorMessage("Enter Password")
        }
    }
    else
    {
        setErrorMessage("Enter Name")
    }
  }

  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">
      <View className="flex-1 items-center mt-[30vh]">
        {errorMessage &&
        <View className="bg-red-500 rounded-2xl w-[80vw] p-4 items-center justify-center mb-4">
            <Text className="text-lg text-white font-bold">
                Error: {errorMessage}
            </Text>
        </View>
        }
        {/* Display error message if password and repassword do not match */}
        {password && repassword && password != repassword &&
        <View className="bg-red-500 rounded-2xl w-[80vw] p-4 items-center justify-center mb-4">
            <Text className="text-lg text-white font-bold">
                Error: Passwords Do Not Match
            </Text>
        </View>
        }
        <View className="flex flex-row justify-between w-[80vw]">
            <TextInput className="w-[39vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="First Name" 
                onChangeText={(text) => {
                    setFirstName(text)
                }}
            />
            <TextInput className="w-[39vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Last Name" 
                onChangeText={(text) => {
                    setLastName(text)
                }}
            />
        </View>
        <TextInput autoCapitalize="none" className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Email or Phone Number" 
            onChangeText={(text) => {
                if (text.includes("@")) {
                    setEmail(text.toLowerCase());
                    setDecision(0);
                } else {
                    setPhoneNumber(text);
                    setDecision(1);
                }
            }}
        />
        <View className="bg-orange-400 rounded-3xl w-[80vw] p-4 items-center justify-center mb-4">
            <Text className="text-white font-bold">Passwords must contain at least one capital letter and one special character</Text>
        </View>
        <TextInput autoCapitalize="none" className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Password" 
        onChangeText={(text) => {
            setPassword(text);
        }}
        />
        <TextInput autoCapitalize="none" className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-8 text-red-300" placeholder="Re-Enter Password" 
        onChangeText={(text) => {
            setRepassword(text);
        }}
        />
        <Pressable onPress={() => signUp('Login')} className="bg-white w-[80vw] items-center py-5 mb-5 rounded-full">
          <Text className="font-medium text-xl">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignUpScreen