import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Pressable, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import RequestsBg from '../../components/RequestsBg';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Requests() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setLoading(false);
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);

            const geocode = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            });

            if (geocode && geocode.length > 0) {
                const { city, region, country } = geocode[0];
                AsyncStorage.setItem("geolocation", JSON.stringify(geocode[0]));
                Alert.alert('Location', `City: ${city}, State: ${region}, Country: ${country}`);
                console.log(`City: ${city}, State: ${region}, Country: ${country}`);
            }
        };

        getLocation();

        const fetchAds = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://192.168.43.96:1234/ads`, {
                    method: 'GET'
                });
                console.log("Fetch Response: ", response);
                if (!response.ok) {
                    console.log("Resp: ", await response.json());
                    setLoading(false);
                    return;
                }
                const resp2 = await response.json();
                console.log("Resp2Secrets: ", resp2);
                if (resp2.status === 200) {
                    await AsyncStorage.setItem("ads", JSON.stringify(resp2.ads || []));
                    console.log('resp2: ', resp2)
                    setAds(resp2.ads || []);
                } else if (resp2.status === 404) {
                    setAds([]);
                }
            } catch (error) {
                console.error("Error Fetching Ads: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    return (
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
                            <Bell color="white" size={26} />
                        </Pressable>
                    </View>
                    <ScrollView contentContainerStyle={{
                        paddingHorizontal: 5,
                        paddingTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        flex: 1
                    }}>
                        {loading ? (
                            <View className="flex-1 flex flex-col items-center justify-center mt-[-50]">
                                <Image source={require("../../../assets/images/icon.png")} className="w-30 h-20" style={{ resizeMode: 'contain' }} />
                                <Text className="text-white font-skeletonf text-[30px]">Loading Requests</Text>
                            </View>
                        ) : ads.length === 0 ? (
                            <View className="flex-1 flex flex-col items-center justify-center mt-[-50]">
                                <Image source={require("../../../assets/images/icon.png")} className="w-30 h-20" style={{ resizeMode: 'contain' }} />
                                <Text className="text-white text-[30px] font-skeletonf">No requests found</Text>
                            </View>
                        ) : (
                            ads.map((ad, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => router.push({
                                        pathname: 'screens/ReplyAd',
                                        params: {
                                            request: JSON.stringify(ad)
                                        }
                                    })}
                                    style={({ pressed }) => [
                                        {
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 10,
                                        },
                                        pressed && { opacity: 0.3 },
                                    ]}
                                >
                                    <RequestsBg request={ad} />
                                </Pressable>
                            ))
                        )}
                    </ScrollView>
                    <Pressable
                        className="absolute fixed bottom-0 right-2"
                        style={({ pressed }) => [
                            {
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10,
                            },
                            pressed && { opacity: 0.3 },
                        ]}
                        onPress={() => router.push("screens/PostAd")}
                    >
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
