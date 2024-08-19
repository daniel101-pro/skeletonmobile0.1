import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Pressable, Image, ImageBackground,  } from 'react-native'
import { useRouter } from 'expo-router'

export default function ConfirmAd(){
    const router = useRouter()
    return(
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground 
                    source={require("../../assets/images/Bg.png")}
                    className="w-full h-full"
                    style={{
                        resizeMode: 'cover'
                    }}    
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
                    <View>
                        <View className="flex flex-row items-center justify-center mt-20">
                            <Image
                                source={require("../../assets/images/icon.png")}
                                style={{
                                    resizeMode: 'contain',
                                    width: 120,
                                    height: 120,
                                }}
                            />
                        </View>
                        <View className="flex flex-col items-center justify-center text-center mt-10 ">
                            <Text className="text-white font-skeletonf text-[30px]">Nice! Ad Sent for Review</Text>
                            <Text className="text-white font-pmedium text-[12px] text-center mt-5">Once approved by the admin, your ad will be live. Keep an eye on your notifications for updates.</Text>
                        </View>
                        <View className="mt-10 w-[100%]">
                            <Pressable
                                onPress={() => router.back()}
                                style={({ pressed }) => [
                                    { 
                                    },
                                    pressed && { opacity: 0.3 },
                                ]}
                            >
                                <Image 
                                    source={require("../../assets/images/exploring.png")}
                                    className="w-full"
                                    style={{
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}