import React, { useState } from 'react';
import { View, Text, Pressable, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import { useRouter } from 'expo-router';

const BuySkulls = () => {
    const [selected, setSelected] = useState(null);
    const router = useRouter()

    const handlePress = (id) => {
        setSelected(id);
    };

    const skullOptions = [
        { id: 1, label: '50 skulls', price: 'NGN 2500.00' },
        { id: 2, label: '100 skulls', price: 'NGN 5000.00' },
        { id: 3, label: '150 skulls', price: 'NGN 7500.00' },
        { id: 4, label: '200 skulls', price: 'NGN 10000.00' },
    ];

    return (
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    contentContainerStyle={{
                        width: "100%",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <Text className="font-skeletonf text-white text-[30px] text-center mt-10">Purchase Skull Tokens</Text>
                    <View className="absolute fixed top-10 left-0">
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => {
                                return { opacity: pressed ? 0.3 : 1 };
                            }}
                        >
                            <Image
                                source={require("../../assets/images/back.png")}
                                className="w-12 h-12 ml-5"
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>
                    <View className="flex flex-col items-center justify-center mt-[30px]">
                        <View className="w-[90%] mt-5">
                            <ImageBackground
                                source={require("../../assets/images/skullbalancebg.png")}
                                className="w-[100%] flex flex-row items-center justify-between px-4 py-2"
                                style={{
                                    resizeMode: 'contain',
                                }}
                            >
                                <View>
                                    <Text className="text-white font-pmedium text-[12px]">Skull Token Balance</Text>
                                </View>
                                <View className="flex flex-row items-center">
                                    <Image 
                                        source={require("../../assets/images/icon.png")}
                                        className="w-10 h-10"
                                        style={{
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Text className="text-white font-skeletonf text-[26px]">0</Text>
                                </View>
                            </ImageBackground>
                        </View>


                        <View className="mt-10">
                            <ImageBackground 
                                source={require("../../assets/images/buyskullbg.png")}
                                className="w-full flex flex-col items-center justify-center"
                                style={{
                                    resizeMode: 'contain',
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                }}
                            >
                                {skullOptions.map((option) => (
                                    <Pressable
                                        key={option.id}
                                        onPress={() => handlePress(option.id)}
                                        className={`mt-3 w-[90%] flex flex-row items-center justify-between p-2 ${
                                            selected === option.id ? 'border-2 border-red-500' : ''
                                        }`}
                                    >
                                            <View className="flex flex-row items-center justify-center">
                                                <Image source={require("../../assets/images/icon.png")} className="w-12 h-10" style={{ resizeMode: 'contain' }} />
                                                <Text className="font-skeletonf text-white text-[26px]">{option.label}</Text>
                                            </View>
                                            <View>
                                                <ImageBackground source={require("../../assets/images/nairabg.png")} style={{ resizeMode: 'contain', paddingVertical: 8, paddingHorizontal: 8 }}>
                                                    <Text className="text-white font-pmedium text-[15px]">{option.price}</Text>
                                                </ImageBackground>
                                            </View>
                                    </Pressable>
                                ))}
                            </ImageBackground>
                        </View>


                        
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default BuySkulls;
