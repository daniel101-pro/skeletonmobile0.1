import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Settings(){
    const router = useRouter()
    return(
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground source={require("../../../assets/images/Bg.png")} className="w-full h-full" style={{ resizeMode: 'contain' }}>
                    <Text className="text-white font-skeletonf text-[36px] text-center mt-5">How to use Skeleton</Text>
                    <View className="absolute top-5 left-4">
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                        >
                            <Image source={require("../../../assets/images/back.png")} className="w-12 h-10" style={{ resizeMode: 'contain'}}/>
                        </Pressable>
                    </View>
                    <View className="w-full flex flex-col items-center justify-center">
                        <View className="w-full flex flex-col items-center justify-center mt-10">
                            <Image source={require("../../../assets/images/icon.png")} className="w-30 h-28" style={{ resizeMode: 'contain' }}/>
                        </View>
                        <View className="w-full flex flex-col items-center justify-center mt-10">
                            <Pressable className="w-full flex flex-col items-center justify-center" onPress={() => router.push("screens/GettingStarted")}>
                                <ImageBackground source={require("../../../assets/images/secrettitle.png")} className="w-[80%] h-20 flex flex-col items-start justify-center px-5" style={{ resizeMode: 'contain' }}>
                                    <Text className="text-white font-pthin text-[17px]">Getting Started</Text>
                                </ImageBackground>
                            </Pressable>
                            <Pressable className="w-full flex flex-col items-center justify-center mt-5" onPress={() => router.push("screens/HowToPost")}>
                                <ImageBackground source={require("../../../assets/images/secrettitle.png")} className="w-[80%] h-20 flex flex-col items-start justify-center px-5" style={{ resizeMode: 'contain' }}>
                                    <Text className="text-white font-pthin text-[17px]">Posting and Viewing Secrets</Text>
                                </ImageBackground>
                            </Pressable>
                            <Pressable className="w-full flex flex-col items-center justify-center mt-5" onPress={() => router.push("screens/MeetupRequestInfo")}>
                                <ImageBackground source={require("../../../assets/images/secrettitle.png")} className="w-[80%] h-20 flex flex-col items-start justify-center px-5" style={{ resizeMode: 'contain' }}>
                                    <Text className="text-white font-pthin text-[17px]">Meetup Request & Ads</Text>
                                </ImageBackground>
                            </Pressable>
                            <Pressable className="w-full flex flex-col items-center justify-center mt-5" onPress={() => router.push("screens/HowToChat")}>
                                <ImageBackground source={require("../../../assets/images/secrettitle.png")} className="w-[80%] h-20 flex flex-col items-start justify-center px-5" style={{ resizeMode: 'contain' }}>
                                    <Text className="text-white font-pthin text-[17px]">Chatting On Skeleton</Text>
                                </ImageBackground>
                            </Pressable>
                            <Pressable className="w-full flex flex-col items-center justify-center mt-5" onPress={() => router.push("screens/Skulls")}>
                                <ImageBackground source={require("../../../assets/images/secrettitle.png")} className="w-[80%] h-20 flex flex-col items-start justify-center px-5" style={{ resizeMode: 'contain' }}>
                                    <Text className="text-white font-pthin text-[17px]">Skull Tokens</Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}