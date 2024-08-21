import React, { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet, Image, ImageBackground, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io } from 'socket.io-client';
import { useLocalSearchParams } from 'expo-router';

const SOCKET_SERVER_URL = 'ws://192.168.43.96:1234'; // Replace with your server URL

export default function MessageScreen() {
    const { reply, email, receiver } = useLocalSearchParams();
    const [socket, setSocket] = useState(null);
    const [loading, setloading] = useState(true)
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([
        {
            'sender': 'hddr@gmail.com',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'Hello ml',
            'id': 1
        },
        // ... other messages
    ]);

    useEffect(() => {
        // Set up the socket connection
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        const getMessages = async (email, receiver) => {
            try {
                // Replace with your actual endpoint URL
                console.log("Receiver: ", receiver)
                const formdata = new FormData()
                formdata.append("email", email)
                formdata.append("receiver", receiver)
                const response = await fetch('http://192.168.43.96:1234/get_messages', {
                    method: 'POST',
                    body: formdata
                });
        
                const data = await response.json();
                console.log("Data: ", data)
                if (response.ok) {
                    // Check if messages are present in the response
                    if (data.messages && Array.isArray(data.messages)) {
                        // Update state with fetched messages
                        setMessages(data.messages);
                    } else {
                        console.error('No messages found or wrong format');
                    }
                } else {
                    console.error('Failed to fetch messages:', data.message);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally{
                setloading(false)
            }
        };
        
        getMessages(email, receiver)
        // Listen for incoming messages
        newSocket.on('new_message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup on unmount
        return () => newSocket.disconnect();
    }, []);

    const sendMessage = () => {
        if (socket && messageInput.trim() !== '') {
            const newMessage = {
                sender: email,
                receiver: receiver,
                message: messageInput,
                id: new Date().getTime(), // Use timestamp or UUID for unique ID
            };
            console.log("New Message: ", newMessage);
            console.log("Receiver: ", receiver)
            console.log("Email: ", email)
    
            socket.emit('send_anonymous_message', newMessage);
            setMessageInput(''); // Clear the input field
        }
    };
    

    const renderItem = ({ item }) => (
        <View 
            key={item.message_id} 
            style={[
                styles.messageContainer,
                item.sender === email 
                    ? styles.messageFromSender 
                    : styles.messageFromReceiver
            ]}
        >
            <ImageBackground
                source={item.sender === email 
                    ? require("../../assets/images/Vector.png") 
                    : require("../../assets/images/vector2.png")}
                className="flex flex-col items-start justify-center p-8"
                imageStyle={{ resizeMode: 'stretch' }}
            >
                <Text className="font-skeletonf text-white text-[22px] mt-10">
                    {item.message}
                </Text>
            </ImageBackground>
        </View>
    );

    return (
        <SafeAreaView className="w-full">
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground source={require("../../assets/images/Bg.png")} className="w-full h-full" style={{ resizeMode: 'cover'}}>
                    <View className="flex flex-row items-center justify-between px-4 mt-5">
                        <Pressable>
                            <Image source={require("../../assets/images/back.png")} className="w-10 h-10" style={{resizeMode: 'contain'}}/>
                        </Pressable>
                        <Text className="text-white font-skeletonf text-[36px]">Anonymous</Text>
                        <Image source={require("../../assets/images/icon.png")} className="w-14 h-14" style={{ resizeMode: 'contain' }}/>
                    </View>
                    {loading ? (
                        <View className="w-full h-full">
                            <ActivityIndicator color='red' size={30}/>
                        </View>
                    ) : (
                        <View className="w-full h-full">
                            <FlatList
                                data={messages}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{
                                    width: '100%',
                                    paddingHorizontal: 10,
                                }}
                            />
                        </View>
                    )}

                    

                    <View className="bg-primary w-full h-20 flex flex-row items-center absolute bottom-0 left-0 right-0 px-3">
                        <View className="w-[80%] h-16">
                            <ImageBackground 
                                source={require("../../assets/images/secrettitle.png")} 
                                className="w-full h-full px-5 pt-2" 
                                style={{ resizeMode: 'contain' }}
                            >
                                <TextInput 
                                    placeholder='Input message here' 
                                    placeholderTextColor="gray" 
                                    value={messageInput}
                                    onChangeText={setMessageInput}
                                    className="w-full py-3 font-pmedium text-[13px] text-white" 
                                />
                            </ImageBackground>
                        </View>
                        <View className="w-20 h-18 ml-2">
                            <Pressable
                                onPress={sendMessage}
                                className="w-full h-full"
                                style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                            >
                                <Image 
                                    source={require("../../assets/images/sendbtn.png")} 
                                    className="w-full h-full" 
                                    style={{ resizeMode: 'contain' }}
                                />
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    messageFromSender: {
        alignItems: 'flex-end',
    },
    messageFromReceiver: {
        alignItems: 'flex-start',
    },
});
