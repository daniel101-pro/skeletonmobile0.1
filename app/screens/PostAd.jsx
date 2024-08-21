import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostAd = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();
    const [balance, setbalance] = useState(0)
    const [adsbody, setadsbody] = useState("")


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        fetchBal()
        saveGeolocationData()
    }, [])

    const saveGeolocationData = async () => {
        try {
          const geolocationData = await AsyncStorage.getItem("geolocation");
          const { city, region, country } = JSON.parse(geolocationData);
      
          await AsyncStorage.setItem("city", city);
          await AsyncStorage.setItem("region", region);
          await AsyncStorage.setItem("country", country);
          console.log("JSON: ", city, region, country)
        } catch (error) {
          console.error("Error handling geolocation data:", error);
        }
      };
      
      // Call the function
      

      const postAd = async () => {
        try {
            // Retrieve balance from AsyncStorage
            const balanceString = await AsyncStorage.getItem("balance");
            console.log("Balance String: ", balanceString);
    
            // Parse the balanceString. If it's an array, extract the first element
            let balance = parseFloat(balanceString);
    
            // Check if balance is a number and greater than 10
            if (balance <= 10) {
                console.log("Not enough skulls");
                console.log("Skulls: ", balance);
                return;
            }
    
            // Create a new FormData object
            console.log("Heuy")
            const formdata = new FormData();
            formdata.append("email", await AsyncStorage.getItem('email')); // Get email from AsyncStorage
            formdata.append("ads_body", adsbody); // The ad content passed as a parameter
            formdata.append("city", await AsyncStorage.getItem("city")); // Get city from AsyncStorage
            formdata.append("state", await AsyncStorage.getItem("region")); // Get state/region from AsyncStorage
            formdata.append("country", await AsyncStorage.getItem('country')); // Get country from AsyncStorage
            console.log("Form: ", formdata)
            // Make the POST request
            const response = await fetch(`http://192.168.43.96:1234/ads`, {
                method: "POST",
                body: formdata,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            // Check if the response is okay
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Error posting ad: ", errorResponse);
                return;
            }
    
            // Parse the response
            const responseData = await response.json();
            console.log("Ad posted successfully: ", responseData);
    
            if (responseData.status === 200) {
                console.log("Ad Posted Successfully");
                // Navigate to the desired screen after successful posting
                router.push("screens/(tabs)");
            } else {
                console.error("Failed to post ad: ", responseData.message);
            }
    
        } catch (error) {
            console.error("Error posting ad: ", error);
        }
    };
    
    const fetchBal = async () => {
        try {
            const email = await AsyncStorage.getItem("email");
            const formdata = new FormData();
            formdata.append("email", email);
            const response = await fetch(`http://192.168.43.96:1234/fetch_balance`, {
                method: 'POST',
                body: formdata
            });
    
            if (!response.ok) {
                return;
            }
    
            const resp2 = await response.json();
            console.log("Response: ", resp2);
    
            if (resp2.status === 200) {
                console.log("Resp2: ", resp2);
                await AsyncStorage.setItem("balance", resp2.balance.toString()); // Ensure balance is saved as a string
                setbalance(resp2.balance); // Update state with the balance
            } else if (resp2.status === 404) {
                console.log("No such user found");
                await AsyncStorage.setItem("balance", '-');
            } else {
                await AsyncStorage.setItem("balance", '0'); // Provide a default value if needed
            }
        } catch (error) {
            console.error("Error fetching balance: ", error);
        }
    };
    

    return (
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    contentContainerStyle={{ width: "100%" }}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <View className="w-full flex flex-row items-center justify-between px-5 mt-5">
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [pressed && { opacity: 0.3 }]}
                        >
                            <Image
                                source={require("../../assets/images/back.png")}
                                className="w-12 h-12"
                                style={{ resizeMode: 'contain' }}
                            />
                        </Pressable>
                        <Text className="text-white text-[48px] text-center font-skeletonf">Post An Ad</Text>
                        <View className="flex flex-row items-center">
                            <Pressable onPress={() => router.push("screens/BuySkulls")}>
                                <Image
                                    source={require("../../assets/images/icon.png")}
                                    className="w-12 h-12"
                                    style={{ resizeMode: 'contain' }}
                                />
                            </Pressable>
                            <Text className="text-white font-skeletonf text-[24px]">{balance}</Text>
                        </View>
                    </View>
                    <View className="flex flex-col items-center justify-center mt-10">
                        <View className="flex flex-col items-center justify-center">
                            <ImageBackground
                                source={require("../../assets/images/bg_ad.png")}
                                className="w-[90%] h-60 p-4" // Increase height here
                                style={{ resizeMode: 'stretch' }}
                            >
                                <TextInput
                                    placeholder='What are you looking for?'
                                    placeholderTextColor="white"
                                    className="font-skeletonf text-white text-[28px]"
                                    style={{ width: '100%' }}
                                    value={adsbody}
                                    onChangeText={setadsbody}
                                />
                            </ImageBackground>
                        </View>
                        <Pressable
                            onPress={toggleModal} // Show the modal
                            style={({ pressed }) => [
                                { marginTop: 100, width: '90%', alignItems: 'center' },
                                pressed && { opacity: 0.3 },
                            ]}
                        >
                            <Image
                                source={require("../../assets/images/padbtn.png")}
                                style={{ resizeMode: 'contain', width: '100%' }}
                            />
                        </Pressable>
                        <View className="w-[90%] flex flex-col items-center justify-center text-center mt-5">
                            <Text className="text-center font-pmedium text-[14px] text-white">
                                By posting this ad, you ensure that you have read and agreed with{' '}
                                <Text className="font-pmedium text-red-400 text-[14px]">Skeleton's Terms and Policies</Text>
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Modal */}
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <ImageBackground
                            source={require("../../assets/images/backcancel.png")}
                            className="w-full flex flex-col items-center justify-center px-4 py-3"
                            imageStyle={{resizeMode: 'cover'}}
                        >
                            <View className="flex flex-col items-center justify-center">
                                <View className="flex flex-row items-center justify-center">
                                    <Image source={require("../../assets/images/icon.png")} className="w-12 h-12" style={{resizeMode: 'contain'}}/>
                                    <Text className="text-white font-skeletonf text-[34px]">Post Ad?</Text>
                                </View>
                                <Text className="text-white font-skeletonf text-[25px] text-center">It would cost<Text className="text-red-600 font-skeletonf text-[25px]"> -10 skulls</Text> to post an ad request</Text>
                            </View>
                            <View style={styles.modalButtons} className="pb-5">
                                <Pressable
                                    onPress={() => {
                                        // Handle posting ad
                                        postAd();
                                    }}
                                    style={styles.modalButton}
                                    className="pt-10"
                                >
                                    <Image
                                        source={require("../../assets/images/post.png")}
                                        className="w-30 h-25"
                                        style={{resizeMode: 'contain'}}
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={toggleModal}
                                    style={styles.modalButton}
                                    className="pt-10"
                                >
                                    <Image
                                        source={require("../../assets/images/cancel.png")}
                                        className="w-30 h-25"
                                        style={{resizeMode: 'contain'}}
                                    />
                                </Pressable>
                            </View>
                        </ImageBackground>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'transparent',
        padding: 0,
        height: '50%'
    },
    modalBackground: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
    },
    buttonImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
});

export default PostAd;
