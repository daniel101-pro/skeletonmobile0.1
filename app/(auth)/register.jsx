import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, SafeAreaView, TextInput } from "react-native";
import LoadingScreen from "./Loading";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
    const router = useRouter()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState("")
    const [email, setemail] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 3000)
    }, [])

    if (loading){
        return <LoadingScreen/>
    }

    const check = async () => {
        try {
            setloading(true)
            const formdata = new FormData()
            formdata.append("email", email)
            const response = await fetch(`${BASE_URL}/verify`, {
                method: 'POST',
                body: formdata
            })
            console.log("Response: ", response)
            if (!response.ok){
                return
            }
            const resp2 = await response.json()
            console.log("Resp2Hehe: ", resp2)
            if (resp2.status === 200){
                console.log("Success")
                console.log("Resp2: ", resp2)
                AsyncStorage.setItem("otp", resp2.otp)
                AsyncStorage.setItem("email", email)
                setTimeout(() => {
                    router.push('register2')
                    setloading(false)
                }, 2000)
            }
            else{
                console.log("Resp2: ", resp2)
                seterror("Email already exists")
                return
            }
        } catch (error) {
            console.error("Error: ", error)
            seterror(error)
        } finally{
            setloading(false)
        }
    }


    return (
        <SafeAreaView style={styles.safeArea} className="bg-primary">
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    style={styles.backgroundImage}
                    imageStyle={{ resizeMode: 'cover' }}
                >
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

                    <View className="mt-10">
                        <Text className="text-white text-[36px] font-skeletonf">Enter your email</Text>
                        <Text className="text-white font-pmedium text-[15px] mt-10">We just want to confirm it's you</Text>
                        
                        <View className="flex flex-col items-center justify-center">
                            <View className="w-full">
                                {error && <Text className="text-red-600 text-[30px] font-skeletonf">{error}</Text>}
                                <ImageBackground source={require("../../assets/images/email.png")} className="w-full h-20 flex flex-col items-start justify-center px-3" imageStyle={{resizeMode: 'contain'}}>
                                    <TextInput placeholder="Email Address" placeholderTextColor='white' className="text-white font-pmedium text-[12px]" value={email} onChangeText={setemail}/>
                                </ImageBackground>
                            </View>
                            <Pressable className="w-full mt-20" onPress={check} style={({ pressed }) => {
                                return { opacity: pressed ? 0.3 : 1 };
                                }}>
                                <Image source={require('../../assets/images/continue.png')} className="w-full" style={{resizeMode: 'contain'}}/>
                            </Pressable>
                        </View>
                        
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
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
