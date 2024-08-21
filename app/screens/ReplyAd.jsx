import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, ImageBackground, Image, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReplyAd() {
    const router = useRouter();
    const { request } = useLocalSearchParams();
    const [reply, setreply] = useState("")
    const [success, setsuccess] = useState(false)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    const [parsedRequest, setParsedRequest] = useState([]);

    useEffect(() => {
        if (request) {
            try {
                // Parse the JSON string into an array
                const requestArray = JSON.parse(request);
                setParsedRequest(requestArray);
                console.log("Parsed Request:", requestArray);
            } catch (error) {
                console.error("Failed to parse request:", error);
            }
        }
    }, [request]);

    const replyAd = async () => {
        setloading(true)
        try{
            const formdata = new FormData()
            const requestArray = JSON.parse(request);
            formdata.append("ads_id", requestArray[1])
            formdata.append("reply", reply)
            const email = await AsyncStorage.getItem("email")
            formdata.append('email', email)
            formdata.append("receiver_email", requestArray[2])
            const response = await fetch(`http://192.168.43.96:1234/send_ads_replyy`, {
                method: 'POST',
                body: formdata
            })
            if (!response.ok){
                console.log("Response type shi: ", response)
                console.log("Resp2JSON: ", await response.json())
                seterror(true)
                return
            }
            const resp2 = await response.json()
            if (resp2.status === 200){
                console.log("Reply posted success")
                setsuccess(true)
            }
            else{
                seterror(true)
            }
        } catch(error){
            console.log("Error: ", error)
            seterror(true)
        } finally{
            setloading(false)
        }
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" translucent={true} />
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
                                        <Text className="text-left text-[38px] font-skeletonf text-white">Reply to this request</Text>
                                    </View>
                                    {/* Ensure the index is within bounds */}
                                    <Text className="text-white font-skeletonf text-[25px] w-[90%] mt-5">
                                        "{parsedRequest[3] || 'No data available'}"
                                    </Text>
                                </View>
                                <View className="flex flex-row items-center justify-between w-[90%] fixed h-full bottom-20">
                                    {/* Ensure the index is within bounds */}
                                    <Text className="text-white font-skeletonf text-[20px]">
                                        {parsedRequest[5] || 'No data available'}, 23. {parsedRequest[6] || 'No data available'}, {parsedRequest[7] || 'No data available'}
                                    </Text>
                                    <Image
                                        source={require("../../assets/images/sendbtn.png")}
                                        className="w-20 h-20"
                                        style={{ resizeMode: 'contain' }}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View className="mt-5 p-8 w-full">
                        <Text className="font-pmedium text-white text-[14px]">Reply to this ad</Text>
                        {success && <Text className="text-white font-skeletonf text-[26px]">Reply sent successfully</Text>}
                        {error && <Text className="text-red-600 font-skeletonf text-[26px]">Error sending reply</Text>}
                        <View className="flex flex-col items-center justify-center mt-3">
                            <ImageBackground
                                source={require("../../assets/images/bg_ad.png")}
                                className="w-[100%] h-60 p-4" // Increase height here
                                style={{
                                    resizeMode: 'stretch'
                                }}
                            >
                                <TextInput
                                    placeholder='What would you like to say?'
                                    placeholderTextColor="white"
                                    className="font-skeletonf text-white text-[28px]"
                                    style={{
                                        width: '100%'
                                    }}
                                    value={reply}
                                    onChangeText={setreply}
                                />
                            </ImageBackground>
                        </View>
                        {loading ? (
                            <View className="w-[90%] flex flex-row items-center justify-center">
                                <ActivityIndicator color='white' size={30}/>
                            </View>
                        ) : (
                            <Pressable
                            onPress={replyAd}
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
                        )}
                        
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        width: "100%",
        height: 200, // Increased height to fit the content
        justifyContent: "space-between", // Align content and footer with space between them
        paddingVertical: 20, // Adjusted vertical padding
        paddingHorizontal: 15, // Adjusted horizontal padding
    },
});
