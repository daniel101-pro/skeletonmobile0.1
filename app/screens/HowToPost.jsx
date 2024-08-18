import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, TextInput, Pressable, Image, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HowToPost(){
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
                    <View className="px-5 mt-20">
                        <Text className="font-skeletonf text-white text-[30px]">How to post and view secrets</Text>
                        <View>
                            <Text className="font-skeletonf text-white text-[25px] mt-10">Posting Secrets:</Text>
                            <View className="space-y-2">
                                <View className="flex flex-row items-start mt-5">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Navigate to the secrets feed</Text>
                                </View>
                                <View className="flex flex-row items-start">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Tap the red button with a plus icon at the bottom right corner</Text>
                                </View>
                                <View className="flex flex-row items-start">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Add a title and main content</Text>
                                </View>
                                <View className="flex flex-row items-start">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Click "reveal secret" to publish</Text>
                                </View>
                            </View>
                            <Text className="font-skeletonf text-white text-[25px] mt-5">Engagements and Interactions:</Text>
                            <View className="space-y-2">
                                <View className="flex flex-row items-start mt-5">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Check for comments and interactions on your post</Text>
                                </View>
                                <View className="flex flex-row items-start">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Read and interact with comments from other users</Text>
                                </View>
                                <View className="flex flex-row items-start">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Like or respond to comments</Text>
                                </View>
                                <View className="flex flex-row items-start">
                                    <Text className="text-white">•</Text>
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Report abusive or inappropriate comments for review</Text>
                                </View>
                            </View>
                            <Text className="font-skeletonf text-white text-[25px] mt-5">Search for specific secrets:</Text>
                            <View className="space-y-2">
                                <View className="flex flex-row items-start mt-5">
                                    <Text className="ml-2 text-white font-pthin text-[14px]">Use the search icon on the secrets feed to find secrets related to specific keywords or topics of interest</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}