import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, SafeAreaView, TextInput } from "react-native";
import LoadingScreen from "./Loading";
import Toast from "react-native-toast-message";

export default function Register() {
    const [pin, setPin] = useState(Array(4).fill(""));
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("")
    const router = useRouter()
    const pinRefs = useRef([]);

    const register = async () => {
        console.log("reached here")
        const email = await AsyncStorage.getItem('email')
        const username = await AsyncStorage.getItem('username')
        const pin = await AsyncStorage.getItem('pin')

        // Validate email and pin
    if (!email.trim()) {
        Toast.show({
          type: "error",
          text1: "Invalid Input",
          text2: "Email cannot be empty",
          position: "bottom",
        });
        return;
      }
  
      if (pin.includes(" ")) {
        Toast.show({
          type: "error",
          text1: "Invalid Input",
          text2: "PIN cannot contain spaces",
          position: "bottom",
        });
        return;
      }
  
      setloading(true); // Set loading to true when the process starts
  
      try {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("password", pin);
  
        const response = await fetch(`http://192.168.43.96:1234/signup`, {
          method: "POST",
          body: formdata,
        });
  
        if (!response.ok) {
          Toast.show({
            type: "error",
            text1: "Network Error",
            text2: "Please try again later",
            position: "bottom",
          });
          console.log("Response Error:", response);
          setloading(false); // Set loading to false if there's an error
          return;
        }
  
        const resp2 = await response.json();
        if (resp2.status === 200) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Registration successful",
            position: "bottom",
          });
          setTimeout(() => {
            router.push("screens/(tabs)");
            setloading(false)
          }, 3000);
        } else if (resp2.status === 404) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "User not found",
            position: "bottom",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error In Registering",
            text2: "Email already exists or Network Error",
            position: "bottom",
          });
          console.log("Response Data:", resp2);
        }
      } catch (error) {
        console.error("Error:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Registration failed",
          position: "bottom",
        });
      } finally {
        setloading(false); // Always set loading to false after the process completes
      }
    }

    const checkPin = async () => {
        const oldPin = await AsyncStorage.getItem("pin")
        console.log("OldPin: ", oldPin, pin.join(""))
        if (oldPin === pin.join("")){
            register()
        }
        else{
            seterror("Pin Mismatch, Please try again")
        }
    }

    const handlePinChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < pinRefs.current.length - 1) {
        pinRefs.current[index + 1].focus();
        }
    };

    const handlePinKeyPress = (index, key) => {
        if (key === "Backspace" && index > 0) {
        if (pin[index] === "") {
            pinRefs.current[index - 1].focus();
        } else {
            const newPin = [...pin];
            newPin[index] = "";
            setPin(newPin);
        }
        }
    };

    if (loading){
        return <LoadingScreen/>
    }

    const emailImage = require("../../assets/images/emailtt.png");
    const passwordImages = [
    require("../../assets/images/pinttt.png"),
    require("../../assets/images/pinttt.png"),
    require("../../assets/images/pinttt.png"),
    require("../../assets/images/pinttt.png"),
    ];


    return (
        <SafeAreaView style={styles.safeArea} className="bg-primary">
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    style={styles.backgroundImage}
                    imageStyle={{ resizeMode: 'cover' }}
                >
                    <Pressable 
                        style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.3 : 1 }]}
                        onPress={() => router.back()}
                    >
                        <Image 
                            source={require("../../assets/images/back.png")} 
                            style={styles.backImage}
                        />
                    </Pressable>
                    <View style={styles.iconContainer}>
                        <Image 
                            source={require("../../assets/images/icon.png")} 
                            style={styles.iconImage}
                        />
                    </View>

                    <View className="mt-10">
                        <Text className="text-white text-[36px] font-skeletonf">Confirm Your Password</Text>
                        <Text className="text-white font-pmedium text-[15px] mt-20">Ensure it's the correct password.</Text>
                        
                        <View className="flex flex-col items-center justify-center mt-10">
                            {error && <Text className="text-red-600 font-skeletonf text-[30px]">{error}</Text>}
                            <View className="flex flex-row flex-wrap justify-center items-center">
                                {passwordImages.map((image, index) => (
                                <View
                                    key={index}
                                    className="w-[80px] h-[50px] m-3 overflow-hidden rounded-lg"
                                >
                                    <Image
                                    source={image}
                                    className="absolute w-full h-full"
                                    style={StyleSheet.absoluteFill}
                                    resizeMode="contain"
                                    />
                                    <TextInput
                                    ref={(el) => (pinRefs.current[index] = el)}
                                    className="w-full h-full text-center text-lg text-white bg-transparent"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={pin[index]}
                                    onChangeText={(value) => handlePinChange(index, value)}
                                    onKeyPress={({ nativeEvent }) =>
                                        handlePinKeyPress(index, nativeEvent.key)
                                    }
                                    />
                                </View>
                                ))}
                            </View>
                            <Pressable className="w-full mt-20" onPress={checkPin} style={({ pressed }) => {
                                return { opacity: pressed ? 0.3 : 1 };
                                }}>
                                <Image source={require('../../assets/images/continue.png')} className="w-full" style={{resizeMode: 'contain'}}/>
                            </Pressable>
                        </View>
                        
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
    backgroundImage: {
        flex: 1,
        paddingHorizontal: 12, // px-3 in Tailwind is 12 units
    },
    pressable: {
        marginTop: 20, // mt-5 in Tailwind is 20 units
    },
    backImage: {
        width: 36, // w-18 in Tailwind is 72 units
        height: 36, // h-18 in Tailwind is 72 units
        resizeMode: 'contain',
        marginTop: 20,
    },
    iconContainer: {
        position: 'absolute',
        top: 20, // top-5 in Tailwind is 20 units
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    iconImage: {
        width: 80, // w-20 in Tailwind is 80 units
        height: 72, // h-18 in Tailwind is 72 units
        resizeMode: 'contain',
    },
});
