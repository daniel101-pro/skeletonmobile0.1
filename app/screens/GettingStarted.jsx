import { useRouter } from 'expo-router'
import React from 'react'
import { ImageBackground, View, Text, Pressable, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function GettingStarted(){
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
                    <View className="flex flex-col items-center justify-center">
                        <Image
                            source={require("../../assets/images/gettingstarted.png")} className="w-50 h-70" style={{ resizeMode: 'contain'}}/>
                    </View>
                    <ScrollView>
                        <View className="px-5">
                            <Text className="text-white font-skeletonf text-[30px]">Welcome To Skeleton!</Text>
                            <View className="w-full flex flex-col items-start justify-center mt-5">
                                <Text className="text-[15px] font-pthin text-white">Everyone has skeletons in their cupboard. This is where you reveal yours. Speak your truth, find your tribe, retain your privacy</Text>
                            </View>
                        </View>
                        <View className="px-5 mt-10">
                            <Text className="text-white font-skeletonf text-[30px]">User Sign Up</Text>
                            <View className="mt-4">
                                <Text className="text-white font-pthin text-[16px]">Email Verification:</Text>
                                <View className="space-y-2">
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Enter your email for account verification</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Check your inbox for a verification code</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">If needed, request to resend the code.</Text>
                                    </View>
                                </View>
                                <Text className="text-white font-pthin text-[16px] mt-5">Generate a username:</Text>
                                <View className="space-y-2">
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Get an AI-generated username for anonymity</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Change it if you're not happy with the first one</Text>
                                    </View>
                                </View>
                                <Text className="text-white font-pthin text-[16px] mt-5">Set pin and recovery phrase:</Text>
                                <View className="space-y-2">
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Choose a secure 4 digit pin</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Confirm it for accuracy</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Save your recovery phrase securely</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    
                    

                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}