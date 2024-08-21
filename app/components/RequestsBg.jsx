import React from 'react'
import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native'


export default function RequestsBg({ request }){
    console.log("REs: ", request)
    return(
        <View className="mx-auto ml-5 w-[100%] flex flex-col items-center justify-center">
            <ImageBackground
                source={require("../../assets/images/ads_bg.png")}
                style={styles.imageBackground}
                resizeMode="stretch" // Changed to "cover" for better scaling
            >
                <View className="flex flex-col items-center justify-between mx-auto h-full">
                    <View className="flex flex-col items-center w-[90%]">
                        <View className="w-full">
                            <Text className="text-left text-[38px] font-skeletonf text-white">New Request</Text>
                        </View>
                        <Text className="text-white font-skeletonf text-[25px] w-[90%]">"{request[3]}"</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between w-[90%] fixed bottom-0 h-full mb-10">
                        <Text className="text-white font-skeletonf text-[20px]">{request[5]}, 23. {request[6]}, {request[7]}</Text>
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
        height: 200, // Increased height to fit the content
        justifyContent: "space-between", // Align content and footer with space between them
        paddingVertical: 20, // Adjusted vertical padding
        paddingHorizontal: 15, // Adjusted horizontal padding
      },
})