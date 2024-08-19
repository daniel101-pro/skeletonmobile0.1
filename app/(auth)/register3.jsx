import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, Pressable, Text, View, Image, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Register3(){
    const router = useRouter()
    const [random, setrandom] = useState()

    return(
        <SafeAreaView style={{flex: 1}} className="bg-primary w-full h-full">
            <StatusBar style="transparent"/>
            <View className="bg-primary -z-1 w-full h-full" style={{ paddingHorizontal: 10}}>
                <ImageBackground source={require("../../assets/images/Bg.png")} className="w-full h-full">
                    <Pressable 
                        style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.3 : 1 }]}
                        onPress={() => router.back()}
                    >
                        <Image 
                            source={require("../../assets/images/back.png")} 
                            style={styles.backImage}
                        />
                    </Pressable>
                    <View style={styles.iconContainer}>
                        <Image 
                            source={require("../../assets/images/icon.png")} 
                            style={styles.iconImage}
                        />
                    </View>

                    <View className="mt-20">
                        <Text className="text-white font-skeletonf text-[36px]">Generate Username</Text>

                        <Text className="text-white pmedium text-[15px] mt-10">Random username just for you</Text>

                        <View>
                            <ImageBackground source={require("../../assets/images/email.png")} className="w-full h-20 flex flex-row items-center justify-between px-5" imageStyle={{resizeMode: 'contain'}}>
                                <TextInput placeholder="Username" placeholderTextColor='white' className="text-white font-pmedium text-[13px] w-[90%]"/>
                                <Image source={require("../../assets/images/refresh.png")} className="w-12 h-12" style={{resizeMode: 'contain'}}/>
                            </ImageBackground>
                        </View>

                        <Pressable className="mt-20" style={({ pressed }) => {
                            return { opacity: pressed ? 0.3 : 1 };
                            }} onPress={() => router.push("register4")}>
                            <Image source={require("../../assets/images/continue.png")} className="w-full" style={{resizeMode: 'contain'}}/>
                        </Pressable>

                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
    backgroundImage: {
        flex: 1,
        paddingHorizontal: 12, // px-3 in Tailwind is 12 units
    },
    pressable: {
        marginTop: 20, // mt-5 in Tailwind is 20 units
    },
    backImage: {
        width: 36, // w-18 in Tailwind is 72 units
        height: 36, // h-18 in Tailwind is 72 units
        resizeMode: 'contain',
        marginTop: 20,
    },
    iconContainer: {
        position: 'absolute',
        top: 20, // top-5 in Tailwind is 20 units
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    iconImage: {
        width: 80, // w-20 in Tailwind is 80 units
        height: 72, // h-18 in Tailwind is 72 units
        resizeMode: 'contain',
    },
});