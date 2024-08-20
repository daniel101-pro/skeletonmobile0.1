import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Pressable, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import { Search } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Messages() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [adReplies, setAdReplies] = useState([])
    const [messageReplies, setMessageReplies] = useState([])
    const [loadingAds, setLoadingAds] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(true)

    useEffect(() => {
        const fetchDeets = async () => {
            const email = await AsyncStorage.getItem('email')
            setEmail(email)
            console.log("Email: ", email)
        }
        fetchDeets()
    }, [])

    useEffect(() => {
        const fetchAdsReplies = async () => {
            if (!email) return;
            
            setLoadingAds(true)
            const formData = new FormData()
            formData.append("email", email)
            try {
                const response = await fetch("http://192.168.43.96:1234/get_replies_to_ads", {
                    method: 'POST',
                    body: formData
                })
                if (!response.ok) {
                    setError(true)
                    console.log("Response: ", await response.json())
                    return
                }
                const respData = await response.json()
                console.log("REspData: ", respData)
                if (respData.status === 200) {
                    setAdReplies(respData.request_replies)
                } else {
                    setAdReplies([])
                }
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoadingAds(false)
            }
        }

        const fetchFromReplies = async () => {
            if (!email) return;
            
            setLoadingMessages(true)
            const formData = new FormData()
            formData.append("email", email)
            try {
                const response = await fetch("http://192.168.43.96:1234/get_replies_from_ads", {
                    method: 'POST',
                    body: formData
                })
                if (!response.ok) {
                    setError(true)
                    console.log("Response: ", await response.json())
                    return
                }
                const respData = await response.json()
                if (respData.status === 200) {
                    setMessageReplies(respData.request_replies)
                } else {
                    setMessageReplies([])
                }
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoadingMessages(false)
            }
        }

        fetchAdsReplies()
        fetchFromReplies()
    }, [email])

    const startMessaging = async (ads_id, email, email_a) => {
        router.push({
            pathname: '/MessageScreen',
            params: {
                ads_id: ads_id,
                email: email,
                email_a: email_a
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView 
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} 
                className="bg-primary" // Adjust background color as needed
            >
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 10 }}>
                        <Pressable onPress={() => router.back()}>
                            <Image
                                source={require("../../assets/images/back.png")}
                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                            />
                        </Pressable>
                        <Text style={{ color: 'white', fontSize: 36 }} className="text-white font-skeletonf text-[36px]">Messages</Text>
                        <Search color='white' size={28} />
                    </View>

                    <Text style={{ color: 'white', fontSize: 28, marginTop: 10, paddingHorizontal: 16 }} className='font-skeletonf'>
                        Your ads
                    </Text>
                    <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                        {loadingAds ? (
                            <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        ) : (
                            adReplies.length > 0 ? (
                                <View style={{ width: '100%' }}>
                                    {adReplies.map((reply, index) => (
                                        <ImageBackground
                                            key={index}
                                            source={require("../../assets/images/pinttt.png")}
                                            style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}
                                            resizeMode="cover"
                                        >
                                            <View style={{ width: '100%', padding: 16, marginTop: 30 }}>
                                                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} className="font-pmedium">
                                                    {reply.reply}
                                                </Text>
                                            </View>
                                            <Pressable 
                                                style={{ width: '90%', marginBottom: 20, paddingTop: 20 }} 
                                                onPress={() => startMessaging(reply.ads_id, reply.email, reply.email_ads)}
                                            >
                                                <ImageBackground 
                                                    source={require("../../assets/images/bgbg.png")} 
                                                    style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}
                                                    resizeMode="contain"
                                                >
                                                    <ImageBackground 
                                                        source={require("../../assets/images/messagebg.png")} 
                                                        style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}
                                                        resizeMode="contain"
                                                    >
                                                        <Text style={{ color: 'white', fontSize: 24, fontFamily: 'skeletonf', textAlign: 'center', marginTop: 5 }}>
                                                            View replies to your request
                                                        </Text>
                                                    </ImageBackground>
                                                </ImageBackground>
                                            </Pressable>
                                        </ImageBackground>
                                    ))}
                                </View>
                            ) : (
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <ImageBackground
                                        source={require("../../assets/images/pinttt.png")}
                                        style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center' }}
                                        resizeMode="cover"
                                    >
                                        <View style={{ width: '100%', padding: 16, marginTop: 30 }} className="font-pmedium">
                                            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} className="font-pmedium">
                                                "No messages from ads"
                                            </Text>
                                        </View>
                                        <Pressable 
                                            style={{ width: '90%', marginBottom: 20, paddingTop: 20 }} 
                                            onPress={() => console.log("Hehn, Nothing dey")}
                                            className="flex flex-col items-center justify-center"
                                        >
                                            <ImageBackground 
                                                source={require("../../assets/images/bgbg.png")} 
                                                style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                                resizeMode="contain"
                                            >
                                                <ImageBackground 
                                                    source={require("../../assets/images/messagebg.png")} 
                                                    style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                                    resizeMode="contain"
                                                >
                                                    <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', marginTop: 25 }} className="mt-20 font-skeletonf">
                                                        Post an ad to get started
                                                    </Text>
                                                </ImageBackground>
                                            </ImageBackground>
                                        </Pressable>
                                    </ImageBackground>
                                </View>
                            )
                        )}
                    </View>

                    {/* Message Replies Section */}
                    <Text style={{ color: 'white', fontSize: 28, marginTop: 10, paddingHorizontal: 16 }} className='font-skeletonf'>
                        Messages you received
                    </Text>
                    <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                        {loadingMessages ? (
                            <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        ) : (
                            messageReplies.length > 0 ? (
                                <View style={{ width: '100%' }}>
                                    {messageReplies.map((reply, index) => (
                                        <ImageBackground
                                            key={index}
                                            source={require("../../assets/images/pinttt.png")}
                                            style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}
                                            resizeMode="cover"
                                        >
                                            <View style={{ width: '100%', padding: 16, marginTop: 30 }}>
                                                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} className="font-pmedium">
                                                    {reply.reply}
                                                </Text>
                                            </View>
                                            <Pressable 
                                                style={{ width: '90%', marginBottom: 20, paddingTop: 20 }} 
                                                onPress={() => startMessaging(reply.reply, reply.email, reply.email_ads)}
                                            >
                                                <ImageBackground 
                                                    source={require("../../assets/images/bgbg.png")} 
                                                    style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}
                                                    resizeMode="contain"
                                                >
                                                    <ImageBackground 
                                                        source={require("../../assets/images/messagebg.png")} 
                                                        style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}
                                                        resizeMode="contain"
                                                    >
                                                        <Text style={{ color: 'white', fontSize: 24, fontFamily: 'skeletonf', textAlign: 'center', marginTop: 5 }}>
                                                            View all messages you received
                                                        </Text>
                                                    </ImageBackground>
                                                </ImageBackground>
                                            </Pressable>
                                        </ImageBackground>
                                    ))}
                                </View>
                            ) : (
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <ImageBackground
                                        source={require("../../assets/images/pinttt.png")}
                                        style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center' }}
                                        resizeMode="cover"
                                    >
                                        <View style={{ width: '100%', padding: 16, marginTop: 30 }} className="font-pmedium">
                                            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} className="font-pmedium">
                                                "No messages received"
                                            </Text>
                                        </View>
                                        <Pressable 
                                            style={{ width: '90%', marginBottom: 20, paddingTop: 20 }} 
                                            onPress={() => console.log("No messages yet")}
                                            className="flex flex-col items-center justify-center"
                                        >
                                            <ImageBackground 
                                                source={require("../../assets/images/bgbg.png")} 
                                                style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                                resizeMode="contain"
                                            >
                                                <ImageBackground 
                                                    source={require("../../assets/images/messagebg.png")} 
                                                    style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                                    resizeMode="contain"
                                                >
                                                    <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', marginTop: 25 }} className="mt-20 font-skeletonf">
                                                        Start a conversation
                                                    </Text>
                                                </ImageBackground>
                                            </ImageBackground>
                                        </Pressable>
                                    </ImageBackground>
                                </View>
                            )
                        )}
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}
