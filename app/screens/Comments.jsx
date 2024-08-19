import React from 'react'
import { View, Text, ImageBackground, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdsBg from '../components/AdsBg'
import { images } from "../../constants";
import { useRouter } from 'expo-router';
import Send from '../components/Send';

const Comments = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/Bg.png")}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                >
                    <Image
                        source={images.arrowback}
                        className="w-[82px] h-[84px] ml-5"
                        resizeMode="contain"
                    />
                </Pressable>
                <View className="flex flex-col items-center justify-center">
                    <AdsBg />
                </View>

                <View 
                    className="border-2 flex flex-col items-center justify-start flex-1 mt-[10px]"
                    style={{ borderColor: "#0D203B", borderRadius: 40, backgroundColor: "white" }}
                >
                    <View className="w-[30%] flex flex-row items-center justify-center mt-4">
                        <Image source={require("../../assets/images/rect.png")} />
                    </View>
                    <View className="flex flex-row items-center justify-center space-x-5 mt-4">
                        <Text className="font-pbold text-black">3k Reactions</Text>
                        <Text className="font-pbold text-black pl-10">12.3k Comments</Text>
                    </View>
                    <View className="mt-[20px] w-full px-5">
                        <Text className="font-pbold text-lg text-left">Add Reaction</Text>
                        <Image 
                            source={require("../../assets/images/reactions_frame.png")} 
                            className="w-full mt-2"
                            style={{ height: 50, resizeMode: 'contain' }}
                        />
                    </View>
                    <View className="flex flex-row items-start mt-[20px] w-full px-5">
                        <Text className="font-pbold text-lg text-left">Comments</Text>
                    </View>

                    {/* ScrollView now has limited height */}
                    <ScrollView className="w-full px-5 mt-4 space-y-5" style={{ maxHeight: '40vh' }}>
                        {Array(20).fill().map((_, index) => (
                            <View key={index} className="mb-5">
                                <Text className="font-psemibold text-black">
                                    This is a random comment.
                                </Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Additional content is now visible */}
                    <View className="w-full py-5">
                        <Send />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Comments;
