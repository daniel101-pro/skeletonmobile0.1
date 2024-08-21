import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Paystack } from 'react-native-paystack-webview';

const BuySkulls = () => {
    const [selected, setSelected] = useState(null);
    const [loading, setloading] = useState(false)
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [startPayment, setStartPayment] = useState(false);

    const skullOptions = [
        { id: 1, label: '50 skulls', price: 'NGN 2500.00', amount: 2500 },
        { id: 2, label: '100 skulls', price: 'NGN 5000.00', amount: 5000 },
        { id: 3, label: '150 skulls', price: 'NGN 7500.00', amount: 7500 },
        { id: 4, label: '200 skulls', price: 'NGN 10000.00', amount: 10000 },
    ];

    useEffect(() => {
        fetchBal();
    }, []);

    useEffect(() => {
        if (selected !== null) {
            setStartPayment(true);
        }
    }, [selected]);

    const fetchBal = async () => {
        const email = await AsyncStorage.getItem("email");
        setEmail(email);
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
        if (resp2.status === 200) {
            AsyncStorage.setItem("balance", JSON.stringify(resp2.balance));
            setBalance(resp2.balance);
        } else if (resp2.status === 404) {
            AsyncStorage.setItem("balance", '-');
        } else {
            AsyncStorage.setItem("balance", null);
        }
    };

    const handlePaymentSuccess = async (transaction) => {
        Alert.alert("Payment Successful", `Transaction Reference: ${transaction.transactionRef}`);
        
        // Reset payment initiation
        setStartPayment(false);
        setloading(true)
    
        // Extract amount from selected skull option
        const selectedOption = skullOptions.find(option => option.id === selected);
        const paymentAmount = selectedOption ? selectedOption.label.split(" ")[0] : 0;
    
        // Prepare form data for the API request
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("amount", paymentAmount);
    
        try {
            // Make the API request to update balance
            const response = await fetch(`http://192.168.43.96:1234/addBalance`, {
                method: 'POST',
                body: formdata,
            });
    
            if (!response.ok) {
                throw new Error('Failed to update balance');
            }
    
            const resp2 = await response.json();
    
            if (resp2.status === 200) {
                // Retrieve balance from AsyncStorage
                const balanceString = await AsyncStorage.getItem('balance');
            
                // Parse the balance string to a number, defaulting to 0 if it's invalid
                const currentBalance = parseFloat(balanceString) || 0;
            
                // Calculate the updated balance
                const updatedBalance = currentBalance + paymentAmount;
            
                // Store the updated balance as a string in AsyncStorage
                await AsyncStorage.setItem('balance', updatedBalance.toString());
            
                // Update balance in state
                setBalance(updatedBalance);
            }
             else {
                console.log("resp2: 0", resp2)
                Alert.alert('Error', resp2.message || 'Failed to update balance');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'An unexpected error occurred');
        } finally{
            setloading(false)
        }
    };
    

    const handlePaymentFailure = (error) => {
        Alert.alert("Payment Failed", error.message);
        setStartPayment(false); // Reset payment initiation
        // Handle failure logic such as showing an error message
    };

    if (loading){
        return(
            <View className="flex flex-col items-center justify-center">
                <Image source={require("../../assets/images/icon.png")} className="w-20 h-18" style={{resizeMode: 'contain'}}/>
                <Text className="text-white font-skeletonf text-[36px]">Loading</Text>
            </View>
        )
    }

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
                                    <Text className="text-white font-skeletonf text-[26px]">{balance === 0 ? '...' : balance}</Text>
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
                                        onPress={() => setSelected(option.id)}
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

                        {startPayment && selected !== null && (
                            <Paystack
                                buttonText="Proceed to Payment"
                                showPayButton={false} // Hide the default button since we're using a custom button
                                paystackKey='pk_test_125e1a8f899c7c463dfd6313fdf6eea76129cfea'
                                paystacksecretKey='sk_test_93d49f232c81c7693495a4597977ef0714fea8df'
                                amount={skullOptions.find(option => option.id === selected).amount}
                                billingEmail={email !== null ? email : 'SkullBuyer@gmail.com'}
                                activityIndicatorColor="red"
                                onSuccess={handlePaymentSuccess}
                                onCancel={handlePaymentFailure}
                                autoStart={true}
                                currency="NGN"
                                billingName={email !== null ? email.split("@")[0] : 'Sk'}
                            />
                        )}

                        {/* Custom Button to Trigger Payment */}
                        {selected !== null && !startPayment && (
                            <Pressable
                                onPress={() => setStartPayment(true)}
                                className="mt-5 bg-blue-500 px-6 py-3 rounded-full"
                            >
                                <Text className="text-white font-bold text-lg">Pay Now</Text>
                            </Pressable>
                        )}

                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default BuySkulls;
