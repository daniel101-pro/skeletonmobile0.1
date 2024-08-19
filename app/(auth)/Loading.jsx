import React from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function LoadingScreen(){
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View className="bg-primary -z-1 w-full h-full flex flex-col items-center justify-center">
                <ImageBackground source={require("../../assets/images/Bg.png")} className="w-full h-full flex flex-col items-center justify-center" imageStyle={{
                    resizeMode: 'cover'
                }}>
                    <Image source={require("../../assets/images/icon.png")} className="w-50 h-30" style={{resizeMode: 'contain'}}/>
                    <Text className="text-white font-skeletonf text-[38px]">Unlocking hidden worlds...</Text>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}