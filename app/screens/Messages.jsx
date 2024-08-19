import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import { Search } from 'lucide-react-native'
import { useRouter } from 'expo-router'

export default function Messages(){
    const router = useRouter()
    return(
        <SafeAreaView>
            <ScrollView className="w-full h-full bg-primary -z-1" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }} horizontal={false}>
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    contentContainerStyle={{
                        width: "100%",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <View className="flex flex-row items-center justify-between px-4 mt-5">
                        <View>
                            <Pressable>
                                <Image
                                    source={require("../../assets/images/back.png")}
                                    className="w-12 h-12"
                                    style={{
                                        resizeMode: 'contain'
                                    }}
                                    />
                            </Pressable>
                        </View>
                        <View>
                            <Text className="text-white font-skeletonf text-[36px]">Messages</Text>
                        </View>
                        <View>
                            <Search color='white' size={35}/>
                        </View>
                    </View>
                    <Text className="text-white text-[28px] font-skeletonf mt-10 px-4">Your ads</Text>
                    <View className="px-4 mt-5">
                        <View className="w-full flex flex-col items-center justify-center">
                            <ImageBackground
                                source={require("../../assets/images/pinttt.png")}
                                className="w-[100%] h-[30vh] flex flex-col items-center justify-between"
                                style={{
                                    resizeMode: 'cover'
                                }}
                            >
                                <View className="w-full px-4 mt-[30px]">
                                    <Text className="text-white font-pmedium text-[16px] text-center">
                                        "I am a sweet and affectionate soul searching...
                                    </Text>
                                </View>
                                <View className="w-[90%] mb-20 pt-20">
                                    <ImageBackground 
                                        source={require("../../assets/images/bgbg.png")} 
                                        className="w-full h-20 object-contain"
                                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ImageBackground 
                                            source={require("../../assets/images/messagebg.png")} 
                                            className="w-full h-20 flex items-center justify-center object-contain"
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Text className="text-white font-skeletonf text-[24px] text-center mt-5">
                                                View all replies to your request
                                            </Text>
                                        </ImageBackground>
                                    </ImageBackground>
                                </View>
                            </ImageBackground>
                        </View>
                        <View className="w-full flex flex-col items-center justify-center mt-10">
                            <ImageBackground
                                source={require("../../assets/images/pinttt.png")}
                                className="w-[100%] h-[30vh] flex flex-col items-center justify-between"
                                style={{
                                    resizeMode: 'cover'
                                }}
                            >
                                <View className="w-full px-4 mt-[30px]">
                                    <Text className="text-white font-pmedium text-[16px] text-center">
                                        "I am a sweet and affectionate soul searching...
                                    </Text>
                                </View>
                                <View className="w-[90%] mb-20 pt-20">
                                    <ImageBackground 
                                        source={require("../../assets/images/bgbg.png")} 
                                        className="w-full h-20 object-contain"
                                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ImageBackground 
                                            source={require("../../assets/images/messagebg.png")} 
                                            className="w-full h-20 flex items-center justify-center object-contain"
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Text className="text-white font-skeletonf text-[24px] text-center mt-5">
                                                There are no replies to this
                                            </Text>
                                        </ImageBackground>
                                    </ImageBackground>
                                </View>
                            </ImageBackground>
                        </View>

                    </View>
                    <Text className="text-white text-[28px] font-skeletonf mt-10 px-4">Your Messages</Text>
                    <View className="px-4 mt-5">
                        <View>
                            <ImageBackground
                                    source={require("../../assets/images/pinttt.png")}
                                    className="w-[100%] h-[30vh] flex flex-col items-center justify-between"
                                    style={{
                                        resizeMode: 'cover'
                                    }}
                                >
                                    <View className="w-full px-4 mt-[30px]">
                                        <Text className="text-white font-pmedium text-[16px] text-center">
                                            "My freaking ad was posted here
                                        </Text>
                                    </View>
                                    <Pressable className="w-[90%] mb-20 pt-20" onPress={() => router.push("screens/MessageScreen")}>
                                        <ImageBackground 
                                            source={require("../../assets/images/bgbg.png")} 
                                            className="w-full h-20 object-contain"
                                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <ImageBackground 
                                                source={require("../../assets/images/messagebg.png")} 
                                                className="w-full h-20 flex items-center justify-center object-contain"
                                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <Text className="text-white font-skeletonf text-[24px] text-center mt-5">
                                                    Check all messages from ads
                                                </Text>
                                            </ImageBackground>
                                        </ImageBackground>
                                    </Pressable>
                            </ImageBackground>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}