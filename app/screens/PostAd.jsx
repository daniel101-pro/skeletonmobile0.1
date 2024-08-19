import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, ImageBackground, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAd = () => {
    const router = useRouter()
    return (
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    contentContainerStyle={{
                        width: "100%",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <View className="w-full flex flex-row items-center justify-between px-5 mt-5">
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                { 
                                },
                                pressed && { opacity: 0.3 },
                            ]}
                            >
                            <Image
                                source={require("../../assets/images/back.png")}
                                className="w-12 h-12"
                                style={{ resizeMode: 'contain' }}
                            />
                        </Pressable>
                        <Text className="text-white text-[48px] text-center font-skeletonf">Post An Ad</Text>
                        <View className="flex flex-row items-center">
                            <Pressable onPress={() => router.push("screens/BuySkulls")}>
                                <Image
                                    source={require("../../assets/images/icon.png")}
                                    className="w-12 h-12"
                                    style={{
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Pressable>
                            <Text className="text-white font-skeletonf text-[24px]">0</Text>
                        </View>
                    </View>
                    <View className="flex flex-col items-center justify-center mt-10">
                        <View className="flex flex-col items-center justify-center">
                            <ImageBackground
                                source={require("../../assets/images/bg_ad.png")}
                                className="w-[90%] h-60 p-4" // Increase height here
                                style={{
                                    resizeMode: 'stretch'
                                }}
                            >
                                <TextInput
                                    placeholder='What are you looking for?'
                                    placeholderTextColor="white"
                                    className="font-skeletonf text-white text-[28px]"
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </ImageBackground>
                        </View>
                        <Pressable
                            onPress={() => router.push('screens/ConfirmAd')}
                            style={({ pressed }) => [
                                { 
                                marginTop: 100,
                                width: '90%', // Make sure it doesn't stretch full width, and stays centered
                                alignItems: 'center', // Center the content inside Pressable
                                },
                                pressed && { opacity: 0.3 },
                            ]}
                            >
                            <Image
                                source={require("../../assets/images/padbtn.png")}
                                style={{
                                    resizeMode: 'contain',
                                    width: '100%'
                                }}
                            />
                        </Pressable>
                        <View className="w-[90%] flex flex-col items-center justify-center text-center mt-5">
                            <Text className="text-center font-pmedium text-[14px] text-white">By posting this ad, you ensure that you have read and agreed with <Text className="font-pmedium text-red-400 text-[14px]">Skeleton's Terms and Policies</Text></Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default PostAd;
