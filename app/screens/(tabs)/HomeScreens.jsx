import { View, Text, ImageBackground, ScrollView, TextInput, Image, Pressable, StatusBar, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bell, Search } from 'lucide-react-native'
import AdsBg from '../../components/AdsBg'
import AddBtn from '../../components/AddBtn'
import { useRouter } from "expo-router";
import BASE_URL from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreens = () => {
  const [ads, setads] = useState([])
  const [loading, setloading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const fetchAds = async () => {
    try {
      setloading(true)
      const response = await fetch(`http://192.168.43.96:1234/secrets`, {
        method: 'GET'
      })
      if (!response.ok) {
        console.log("Resp: ", await response.json())
        setloading(false)
        return
      }
      const resp2 = await response.json()
      console.log("Resp2Secrets: ", resp2)
      if (resp2.status === 200) {
        await AsyncStorage.setItem("ads", JSON.stringify(resp2.secrets || []))
        setads(resp2.secrets || [])
      } else if (resp2.status === 404) {
        setads([])
      }
    } catch (error) {
      console.error("Error Fetching Ads: ", error)
    } finally {
      setloading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAds()
  }, [])

  useEffect(() => {
    const loadAds = async () => {
      try {
        const storedAds = await AsyncStorage.getItem("ads")
        if (storedAds != null) {
          setads(JSON.parse(storedAds))
        } else {
          setads([])
        }
      } catch (error) {
        console.error("Error Loading Ads: ", error)
        setads([]) 
      }
    }
    loadAds()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchAds()
  }

  const goToComments = async (secret_id, ad) => {
    router.push({
      pathname: '/screens/Comments',
      params: {
        secret_id: secret_id,
        ad: ad
      }
    })
  }

  return (
    <SafeAreaView className='w-full'>
      <StatusBar barStyle="dark-content" translucent={true}/>
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
            <Text className="text-white text-[48px] text-center mt-[20px] font-skeletonf">Secret Feed</Text>
            <Pressable className="fixed absolute top-9 right-5" onPress={() => router.push("screens/Messages")}>
              <Bell color="white" size={26}/>
            </Pressable>
          </View>
          <View className="flex flex-row items-center justify-center mt-[20px]">
            <View className="flex flex-row items-center justify-between px-5 py-2 border-2 border-white rounded-lg w-[90%]">
              <Search color='gray' size={25}/>
              <TextInput 
                placeholder='Search for juicy secrets'
                placeholderTextColor='gray'
                className="w-[80%] font-skeletonf text-[23px]"
              />
            </View>
          </View>

          {loading ? (
            <View className="flex flex-col items-center justify-center h-full mt-[-100]">
              <Image source={require("../../../assets/images/icon.png")} className="w-30 h-20" style={{resizeMode: 'contain'}}/>
              <Text className="text-white font-skeletonf text-[30px]">Loading Secrets</Text>
            </View>
          ) : ads.length > 0 ? (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {ads.map((ad, index) => (
                <Pressable
                  key={index}
                  onPress={() => goToComments(ad.secret_id, ad.secret_body)}
                  style={({ pressed }) => [
                    { 
                      width: '100%',
                      alignItems: 'center',
                    },
                    pressed && { opacity: 0.3 },
                  ]}
                >
                  <AdsBg
                    title={ad.secret_id}
                    comment_number="--"
                    body={ad.secret_body}
                    like_number="--"
                  />
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View className="flex flex-col items-center justify-center h-full mt-[-100]">
              <Image source={require("../../../assets/images/icon.png")} className="w-30 h-20" style={{resizeMode: 'contain'}}/>
              <Text className="text-white font-skeletonf text-[30px]">No new secrets</Text>
            </View>
          )}
        </ImageBackground>
      </View>
      <View className="fixed absolute bottom-20 right-8">
        <AddBtn/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreens
