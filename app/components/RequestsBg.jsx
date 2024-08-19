import React from 'react'
import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native'


export default function RequestsBg(){
    return(
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