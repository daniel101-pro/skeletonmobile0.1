import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Pressable, StyleSheet, TextInput, ImageBackground, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function ReplyAd({ props }){
    const router = useRouter()
    return(
        <SafeAreaView>
            <StatusBar barStyle="dark-content" translucent={true}/>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
            <ImageBackground
                source={require("../../assets/images/Bg.png")}
                contentContainerStyle={{
                    width: "100%",
                }}
                className="w-full h-full"
                resizeMode="cover"
                >
                    <Pressable
                        onPress={() => router.back()}
                        style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1, paddingHorizontal: 8, paddingVertical: 10 })}
                    >
                        <Image 
                            source={require("../../assets/images/back.png")}
                            className="w-12 h-12"
                            style={{
                                resizeMode: 'contain'
                            }}
                        />
                    </Pressable>
                    <View className="mx-auto ml-5 w-[100%] flex flex-col items-center justify-center">
                        <ImageBackground
                            source={require("../../assets/images/ads_bg.png")}
                            style={styles.imageBackground}
                            resizeMode="stretch" // Changed to "cover" for better scaling
                        >
                            <View className="flex flex-col items-center justify-between mx-auto">
                                <View className="flex flex-col items-center w-[90%]">
                                    <View className="w-full">
                                        <Text className="text-left text-[38px] font-skeletonf text-white">Seeking a Gentleman</Text>
                                    </View>
                                    <Text className="text-white font-skeletonf text-[25px] w-[90%]">"I am a sweet and affectionate soul searching for a confident, tall gentleman. Chemistry is key when we meet. Let's discover a special connection together"</Text>
                                </View>
                                <View className="flex flex-row items-center justify-between w-[90%]">
                                    <Text className="text-white font-skeletonf text-[20px]">Female, 23. Romance, Abuja, Nigeria</Text>
                                    <Image
                                        source={require("../../assets/images/sendbtn.png")}
                                        className="w-20 h-20"
                                        style={{ resizeMode: 'contain'}}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View className="mt-5 p-8 w-full">
                        <Text className="font-pmedium text-white text-[14px]">Reply to this ad</Text>
                        <View className="flex flex-col items-center justify-center mt-3">
                            <ImageBackground
                                source={require("../../assets/images/bg_ad.png")}
                                className="w-[100%] h-60 p-4" // Increase height here
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
                            onPress={() => router.back()}
                            contentContainerStyle={{
                                width: '90%'
                            }}
                            style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1, marginTop: 40 })}
                        >
                            <Image
                                source={require("../../assets/images/sendreply.png")}
                                className="w-full"
                                style={{
                                    resizeMode: 'contain'
                                }}
                            />
                        </Pressable>
                    </View>
            </ImageBackground>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    imageBackground: {
        width: "100%",
        height: 250, // Increased height to fit the content
        justifyContent: "space-between", // Align content and footer with space between them
        paddingVertical: 20, // Adjusted vertical padding
        paddingHorizontal: 15, // Adjusted horizontal padding
      },
})