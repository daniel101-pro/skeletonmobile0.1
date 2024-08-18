import React from 'react'
import { View, Text, TextInput, Pressable, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function MeetupRequestInfo(){
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
                    <View className="w-full flex flex-col items-center justify-center mt-20 px-5">
                        <Text className="text-white font-skeletonf text-[30px] w-[80%] text-center">Everything About Meetup Requests</Text>
                        <ScrollView className="w-full mt-10 mb-20">
                            <Text className="text-white font-skeletonf text-[25px]">Putting up a meetup request:</Text>
                            <View className="mt-5">
                                <Text className="text-white font-pthin text-[13px]">Ready to meet someone new? Putting up a meet-up request on skeleton is simple:</Text>
                                <View>
                                    <Text className="text-white font-pmedium text-[15px] mt-10">1. Fill out the form: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Select your gender, age and the gender you're interested in</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Choose your preferred age range and purpose for the meetup</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Set your location and visibility radius</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-white font-pmedium text-[15px] mt-10">2. Provide details: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Share additional details about your preferences</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-white font-pmedium text-[15px] mt-10">3. Duration and cost: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Choose the duration</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Pay with skeleton skulls according to your request</Text>
                                    </View>
                                </View>
                                
                            </View>
                            <Text className="text-white font-skeletonf text-[25px] mt-20">Viewing Nearby Requests:</Text>
                            <View className="">
                                <Text className="text-white font-pthin text-[13px]">Interested in meeting people nearby? Here's how:</Text>
                                <View className="mt-5 space-y-2">
                                    <Text className="text-white font-pmedium text-[15px]">1. Location Filters: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Adjust filters by location size to see nearby requests</Text>
                                    </View>

                                    <Text className="text-white font-pmedium text-[15px]">2. Accepting Requests: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Accept multiple requests without limits</Text>
                                    </View>
                                    <View className="flex flex-row items-start mb-10">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Respond with offers to connect with interesting individuals</Text>
                                    </View>
                                </View>
                            </View>
                            <Text className="text-white font-skeletonf text-[25px] mt-10">Viewing Meet-Up Offers:</Text>
                            <View className="mb-10">
                                <Text className="text-white font-pthin text-[13px]">Here's how to view and interact with meet-up offers once your request is live:</Text>
                                <View className="mt-5 space-y-2">
                                    <Text className="text-white font-pmedium text-[15px]">1. Explore Offers: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Browse through offers received on your request</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Review details from potential matches</Text>
                                    </View>

                                    <Text className="text-white font-pmedium text-[15px]">2. Initiate Chats: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Start conversations by initiating chats with up to 3 people per request</Text>
                                    </View>

                                    <Text className="text-white font-pmedium text-[15px]">3. Accept Offers: </Text>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">If an offer aligns with your preferences, accept it</Text>
                                    </View>
                                    <View className="flex flex-row items-start">
                                        <Text className="text-white">•</Text>
                                        <Text className="ml-2 text-white font-pthin text-[14px]">Once accepted, the request will close, allowing you to connect further with your chosen match</Text>
                                    </View>

                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}