import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, SafeAreaView, TextInput } from "react-native";

export default function Register() {
    const [pin, setPin] = useState(Array(4).fill(""));
    const [loading, setloading] = useState(false);
    const router = useRouter()
    const pinRefs = useRef([]);

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
                        <Text className="text-white text-[36px] font-skeletonf">Verify Your Email</Text>
                        <Text className="text-white font-pmedium text-[15px] mt-20">Enter the verification code sent to your mail.</Text>
                        
                        <View className="flex flex-col items-center justify-center mt-10">
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
                            <Pressable className="w-full mt-20" onPress={() => router.push('register3')} style={({ pressed }) => {
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
