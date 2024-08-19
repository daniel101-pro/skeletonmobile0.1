import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, View, Pressable, Image, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Skulls(){
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
                        <Image  source={require("../../assets/images/skulltokens.png")} className="w-70 h-80" style={{ resizeMode: 'contain'}}/>
                    </View>
                    <View className="px-5 mt-[-10]">
                        <Text className="text-white font-skeletonf text-[30px]">Skulls: Skeleton's Currency</Text>
                        <View className="mt-3">
                            <Text className="text-white font-pthin text-[15px]">Skulls are the currency for publishing meetup ads and accessing premium features on skeleton</Text>
                        </View>

                        <Text className="text-white font-skeletonf text-[25px] mt-5">Purchasing Skull Tokens</Text>
                        <View className="mt-5">
                            <Text className="text-white font-pmedium text-[12px]">1. Go to your profile</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Head to the skull tokens section</Text>
                            </View>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Select the amount you want (minimum 50 skulls)</Text>
                            </View>
                        </View>
                        <View className="mt-2">
                            <Text className="text-white font-pmedium text-[12px]">2. Payment Processing</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Complete the purchase with your preferred method</Text>
                            </View>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">You may be charged processing fees</Text>
                            </View>
                        </View>
                        <View className="mt-2">
                            <Text className="text-white font-pmedium text-[12px]">3. Skull Balance</Text>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Your balance updates after purchase</Text>
                            </View>
                            <View className="flex flex-row items-start">
                                <Text className="text-white font-bold">•</Text>
                                <Text className="ml-2 text-white font-pthin text-[14px]">Monitor your balance to track spending</Text>
                            </View>
                        </View>

                    </View>

                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}