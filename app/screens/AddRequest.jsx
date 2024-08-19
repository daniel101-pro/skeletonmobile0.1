import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Pressable, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export default function AddRequest() {
    const router = useRouter();
    const [age, setage] = useState(18)
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedGender2, setSelectedGender2] = useState(null);


    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    }
    const handleGenderSelect2 = (gender) => {
        setSelectedGender2(gender);
    }

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const countries = ["Nigeria", "South Africa", "Egypt", "Kenya"];
    const states = ["Lagos", "Abuja", "Kano", "Rivers", "Oyo", "Kaduna", /* all 36 states */];
    const cities = {
        Lagos: ["Ikeja", "Lekki", "Yaba"],
        Abuja: ["Gwarinpa", "Maitama", "Wuse"],
        Kano: ["Nasarawa", "Sabon Gari", "Fagge"],
        // Add more cities per state
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <View style={styles.header}>
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && { opacity: 0.5 },
                            ]}
                        >
                            <Image
                                source={require("../../assets/images/back.png")}
                                style={styles.backIcon}
                            />
                        </Pressable>
                        <Image
                            source={require("../../assets/images/icon.png")}
                            style={styles.icon}
                        />
                    </View>
                    <ScrollView
                            horizontal={false}
                    >
                        <View className="flex flex-col items-center justify-center mt-10">
                            <View className="text-left w-[90%]">
                                <Text className="text-white text-[26px] font-skeletonf">What is your gender?</Text>
                            </View>
                            <View className="flex-row items-center justify-between w-[90%] mr-3 mt-5">
                                <Pressable
                                    onPress={() => handleGenderSelect('male')}
                                    className={`border-2 rounded-lg ${
                                        selectedGender === 'male' ? 'border-red-600' : 'border-transparent'
                                    }`}
                                >
                                    <Image
                                        source={require("../../assets/images/male.png")}
                                        className="w-30 h-20"
                                        style={{ resizeMode: 'contain' }}
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={() => handleGenderSelect('female')}
                                    className={`border-2 rounded-lg ${
                                        selectedGender === 'female' ? 'border-red-600' : 'border-transparent'
                                    }`}
                                >
                                    <Image
                                        source={require("../../assets/images/female.png")}
                                        className="w-30 h-20"
                                        style={{ resizeMode: 'contain' }}
                                    />
                                </Pressable>
                            </View>
                            <View className="flex flex-col justify-center mt-10">
                                <View className="w-[90%]">
                                    <Text className="text-left text-white text-[26px] font-skeletonf">How old are you?</Text>
                                </View>
                                <View className="flex flex-row items-center justify-center w-[90%] mr-3 mt-5">
                                    <ImageBackground
                                        source={require("../../assets/images/agelooking.png")}
                                        className="w-full"
                                        style={{
                                            resizeMode: 'contain'
                                        }}
                                    >
                                        <View className="flex flex-row items-center py-5 pl-4">
                                            <Text className="text-white text-[18px]">I am</Text>
                                            <TextInput className="font-skeletonf text-white text-[22px] px-4" placeholder="18" value={age} onChangeText={setage} placeholderTextColor="white"/>
                                            <Text className="text-white text-[18px]">Years old</Text>
                                        </View>  
                                    </ImageBackground>
                                </View>
                            </View>
                            <View className="flex flex-col justify-center mt-10">
                                <View className="w-[90%] pl-4">
                                    <Text className="text-left text-white text-[26px] font-skeletonf">Looking for?</Text>
                                </View>
                                <View className="flex-row items-center justify-between w-[90%] mr-3 mt-5">
                                    <Pressable
                                        onPress={() => handleGenderSelect2('male')}
                                        className={`border-2 rounded-lg ${
                                            selectedGender2 === 'male' ? 'border-red-600' : 'border-transparent'
                                        }`}
                                    >
                                        <Image
                                            source={require("../../assets/images/male.png")}
                                            className="w-30 h-20"
                                            style={{ resizeMode: 'contain' }}
                                        />
                                    </Pressable>
                                    <Pressable
                                        onPress={() => handleGenderSelect2('female')}
                                        className={`border-2 rounded-lg ${
                                            selectedGender2 === 'female' ? 'border-red-600' : 'border-transparent'
                                        }`}
                                    >
                                        <Image
                                            source={require("../../assets/images/female.png")}
                                            className="w-30 h-20"
                                            style={{ resizeMode: 'contain' }}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <View className="mt-10">
                                <View className="pl-4">
                                    <Text className="text-white text-[26px] font-skeletonf">Dating purpose</Text>
                                    <Text className="text-white font-pmedium text-[8px]">Specify your dating purpose</Text>
                                </View>
                                <View className="grid grid-cols-2 mt-5">
                                    <View className="flex flex-row items-center justify-between w-full">
                                        <View className="flex flex-row items-center justify-center w-[50%]">
                                            <ImageBackground
                                                source={require("../../assets/images/pinttt.png")}
                                                className="w-[90%] py-2 px-4"
                                                style={{
                                                    resizeMode: 'contain'
                                                }}
                                            >
                                                <Text className="text-white font-pmedium text-[14px]">Any</Text>
                                            </ImageBackground>
                                        </View>
                                        <View className="flex flex-row items-center justify-center w-[50%]">
                                            <ImageBackground
                                                source={require("../../assets/images/pinttt.png")}
                                                className="w-[90%] py-2 px-4"
                                                style={{
                                                    resizeMode: 'contain'
                                                }}
                                            >
                                                <Text className="text-white font-pmedium text-[14px]">Travelling</Text>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                    <View className="flex flex-row items-center justify-between w-full mt-3">
                                        <View className="flex flex-row items-center justify-center w-[50%]">
                                            <ImageBackground
                                                source={require("../../assets/images/pinttt.png")}
                                                className="w-[90%] py-2 px-4"
                                                style={{
                                                    resizeMode: 'contain'
                                                }}
                                            >
                                                <Text className="text-white font-pmedium text-[14px]">Friendship</Text>
                                            </ImageBackground>
                                        </View>
                                        <View className="flex flex-row items-center justify-center w-[50%]">
                                            <ImageBackground
                                                source={require("../../assets/images/pinttt.png")}
                                                className="w-[90%] py-2 px-4"
                                                style={{
                                                    resizeMode: 'contain'
                                                }}
                                            >
                                                <Text className="text-white font-pmedium text-[14px]">Virtual Conversation</Text>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                    <View className="flex flex-row items-center justify-between w-full mt-3">
                                        <View className="flex flex-row items-center justify-center w-[50%]">
                                            <ImageBackground
                                                source={require("../../assets/images/pinttt.png")}
                                                className="w-[90%] py-2 px-4"
                                                style={{
                                                    resizeMode: 'contain'
                                                }}
                                            >
                                                <Text className="text-white font-pmedium text-[14px]">Serious Relationship</Text>
                                            </ImageBackground>
                                        </View>
                                        <View className="flex flex-row items-center justify-center w-[50%]">
                                            <ImageBackground
                                                source={require("../../assets/images/pinttt.png")}
                                                className="w-[90%] py-2 px-4"
                                                style={{
                                                    resizeMode: 'contain'
                                                }}
                                            >
                                                <Text className="text-white font-pmedium text-[14px]">Sex And Kinks</Text>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View className="mt-10 px-3">
                                <View>
                                    <Text className="font-skeletonf text-[28px] text-white">Location</Text>
                                    <Text className="font-pmedium text-[12px] text-white">
                                        Select your location. This would improve clarity when others respond to your ad
                                    </Text>
                                </View>

                                <View className="mt-5">
                                    <ImageBackground source={require("../../assets/images/pinttt.png")} style={[styles.dropdownContainer, { width: '90%' }]}>
                                        <Picker
                                            selectedValue={selectedCountry}
                                            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select a country" value={null} />
                                            {countries.map((country, index) => (
                                                <Picker.Item key={index} label={country} value={country} />
                                            ))}
                                        </Picker>
                                    </ImageBackground>

                                    <ImageBackground source={require("../../assets/images/pinttt.png")} style={[styles.dropdownContainer, { width: '90%' }]}>
                                        <Picker
                                            selectedValue={selectedState}
                                            onValueChange={(itemValue) => setSelectedState(itemValue)}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select a state" value={null} />
                                            {states.map((state, index) => (
                                                <Picker.Item key={index} label={state} value={state} />
                                            ))}
                                        </Picker>
                                    </ImageBackground>

                                    <ImageBackground source={require("../../assets/images/pinttt.png")} style={[styles.dropdownContainer, { width: '90%' }]}>
                                        <Picker
                                            selectedValue={selectedCity}
                                            onValueChange={(itemValue) => setSelectedCity(itemValue)}
                                            style={styles.picker}
                                            enabled={!!selectedState && !!selectedCountry}
                                        >
                                            <Picker.Item label="Select a city" value={null} />
                                            {selectedState && cities[selectedState]?.map((city, index) => (
                                                <Picker.Item key={index} label={city} value={city} />
                                            ))}
                                        </Picker>
                                    </ImageBackground>
                                </View>
                            </View>
                        
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D203B', // assuming this is bg-primary
    },
    background: {
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        position: 'fixed',
        top: 5,
        left: 10,
        right: 10,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        marginRight: 20, // Add some spacing between the back button and the skull icon
    },
    backIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    dropdownContainer: {
        backgroundColor: 'transparent',
        marginTop: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        color: 'white',
        paddingLeft: 10,
    },
});
