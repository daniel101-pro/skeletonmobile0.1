import React from 'react'
import { Text, View, ImageBackground, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Search } from 'lucide-react-native'
import RequestsBg from '../../components/RequestsBg';
import { useRouter } from 'expo-router';


export default function Requests(){
    const router = useRouter()
    return(
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
            <ImageBackground
                source={require("../../../assets/images/Bg.png")}
                contentContainerStyle={{
                    width: "100%",
                }}
                className="w-full h-full"
                resizeMode="cover"
                >
                <View className="relative flex flex-row items-center justify-center">
                    <Text className="text-white text-[39px] text-center mt-[20px] font-skeletonf">Requests In Your Area</Text>
                    <Pressable className="fixed absolute top-9 right-5" onPress={() => router.push("screens/AddRequest")}>
                        <Bell color="white" size={26}/>
                    </Pressable>
                </View>
                <ScrollView contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                    }}>
                    {Array(5).fill().map((_, index) => (
                        <Pressable
                        key={index}
                        onPress={() => router.push("screens/ReplyAd")}
                        style={({ pressed }) => [
                            { 
                            width: '100%', // Make sure it doesn't stretch full width, and stays centered
                            alignItems: 'center', // Center the content inside Pressable
                            justifyContent: 'center',
                            marginTop: 10,
                            },
                            pressed && { opacity: 0.3 },
                        ]}
                        >
                        <RequestsBg />
                        </Pressable>
                    ))}

                </ScrollView>
                <Pressable className="absolute fixed bottom-0 right-2" style={({ pressed }) => [
                            { 
                            width: '100%', // Make sure it doesn't stretch full width, and stays centered
                            alignItems: 'center', // Center the content inside Pressable
                            justifyContent: 'center',
                            marginTop: 10,
                            },
                            pressed && { opacity: 0.3 },
                        ]} onPress={() => router.push("screens/PostAd")}>
                    <Image 
                        source={require("../../../assets/images/post_ad.png")}
                        className="w-40 h-40"
                        style={{
                            resizeMode: 'contain'
                        }}
                    />
                </Pressable>
        </ImageBackground>
            </View>
        </SafeAreaView>
    );
}