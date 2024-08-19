import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TextInput, Pressable, Image, ImageBackground, StylSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function HowToChat(){
    const router = useRouter()
    return(
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground source={require("../../assets/images/Bg.png")} className="w-full h-full" style={{ resizeMode: 'cover'}}>
                    <Text className="text-white font-skeletonf text-[36px] text-center mt-5">How to use Skeleton</Text>
                    <View className="absolute top-5 left-4">
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                        >
                            <Image source={require("../../assets/images/back.png")} className="w-12 h-10" style={{ resizeMode: 'contain'}}/>
                        </Pressable>
                    </View>
                    <View className="flex flex-col items-center justify-center mt-[-40]">
                        <Image source={require("../../assets/images/chat.png")} className="w-[50%] h-auto" style={{resizeMode: 'contain'}}/>
                    </View>
                    <View className="w-full flex flex-col items-center justify-center mt-[-70]">
                        <Text className="text-center w-[80%] font-skeletonf text-[30px] text-white">Chatting On Skeleton: Meet new people</Text>
                    </View>
                    <ScrollView className="px-5 mt-10">
                        <Text className="text-left text-white font-pthin text-[15px]">Chatting on skeleton, lets you start conversations and connect with potential matches from meetup requests.</Text>
                        <View className="mt-5">
                            <Text className="text-white font-skeletonf text-[25px]">Initiating Messages:</Text>
                            <Text className="text-white font-pmedium text-[12px] mt-5">1. Posting or Replying to Dating Requests:</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Start a conversation by posting a dating request or replying to others'</Text>
                            </View>
                            <Text className="text-white font-pmedium text-[12px] mt-5">2. Your Messages are Organized Into Two Sections:</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Replies to your request</Text>
                            </View>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Your responses to others request</Text>
                            </View>
                        </View>
                        <View className="mt-5">
                            <Text className="text-white font-skeletonf text-[25px]">Managing Conversations:</Text>
                            <Text className="text-white font-pmedium text-[12px] mt-5">1. Single Message Threads:</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Start a conversation by posting a dating request or replying to others'</Text>
                            </View>
                            <Text className="text-white font-pmedium text-[12px] mt-5">2. Accept or Reject Conversations:</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Replies to your request</Text>
                            </View>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Your responses to others request</Text>
                            </View>
                            <Text className="text-white font-pmedium text-[12px] mt-5">3. Waiting for Acceptance:</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">After replying to an ad, await acceptance from the user to continue the conversation</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
                
            </View>
        </SafeAreaView>
    )
}