import React, { useState } from 'react';
import { View, ImageBackground, StatusBar, Text, Image, TextInput, Pressable, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const AddSecret = () => {
    const router = useRouter();
    const [backPressed, setbackPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [secret, setSecret] = useState('');

    const handleBackPress = () => {
        if (title || secret) {
            setModalVisible(true);
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" translucent={true} />
            <View className="w-full h-full bg-primary flex flex-col items-center justify-center">
                <ImageBackground
                    source={require("../../assets/images/Bg.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <Pressable
                        onPress={handleBackPress}
                        className="w-[82px] h-[84px]"
                        style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                        >
                        <Image
                            source={require("../../assets/images/arrowback.png")} 
                            className="w-[82px] h-[84px]"
                            resizeMode="contain"
                        />
                    </Pressable>

                    <Text className="font-skeletonf text-[48px] text-center text-white">
                        Reveal Secret
                    </Text>
                    
                    <View className="mt-10 w-full flex flex-col items-center justify-center">
                        {/* Title with Background Image */}
                        <View className="w-[85%] mx-auto mr-5 flex flex-row items-center justify-between">
                            <Image source={require("../../assets/images/pfp.png")} className="w-10 h-10 mr-5"/>
                            <ImageBackground
                                source={require("../../assets/images/secrettitle.png")}
                                style={{ width: '100%', height: 80, justifyContent: 'center', paddingHorizontal: 10 }}
                                resizeMode="contain"
                            >
                                <TextInput 
                                    placeholder='Give your secret a title'
                                    placeholderTextColor="white"
                                    multiline={true}
                                    numberOfLines={1}
                                    className="text-white font-pbold text-[13px] w-full h-full p-3 py-2"
                                    style={{ textAlign: 'left' }}
                                    value={title}
                                    onChangeText={setTitle} // Track input state
                                />
                            </ImageBackground>
                        </View>

                        {/* Body with Background Image */}
                        <View className="w-[90%] mt-5 flex flex-row items-center justify-flex-start">
                            <ImageBackground
                                source={require("../../assets/images/secretbody.png")}
                                style={{ width: '100%', height: 250, justifyContent: 'flex-start', }}
                                resizeMode="stretch"
                            >
                                <TextInput 
                                    placeholder='Write your secret here...'
                                    placeholderTextColor="white"
                                    className="text-white font-skeletonf text-[28px] w-full h-full p-8"
                                    multiline={true}
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                    style={{ paddingTop: 20 }}
                                    value={secret}
                                    onChangeText={setSecret} // Track input state
                                />
                            </ImageBackground>
                        </View>

                        <TouchableOpacity
                            onPress={() => console.log("Hehehe")}
                            style={{ marginTop: 40, width: '90%', opacity: 1 }}
                        >
                            <Image 
                                source={require("../../assets/images/reveal_frame.png")} 
                                style={{ width: '100%', height: 150 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Modal Section */}
                {modalVisible && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <ImageBackground
                                    source={require("../../assets/images/backcancel.png")} 
                                    style={styles.modalImageBackground}
                                    resizeMode="stretch"
                                    contentContainerStyle={{
                                        width: '100%'
                                    }}
                                >
                                    <Text style={styles.modalText}>
                                        Are you sure you want to go back? Your changes will be lost.
                                    </Text>
                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(false)
                                                router.back()
                                            }}
                                        >
                                            <Image source={require('../../assets/images/delbtn.png')} style={{ width: 100, height: 80 }} resizeMode='contain' />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Image source={require('../../assets/images/savebtn.png')} style={{ width: 100, height: 80 }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>
                    </Modal>
                )}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',  // Center vertically
        alignItems: 'center',      // Center horizontally
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '100%',  // Adjust width to fit within the screen
        height: '40%', // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#444',
        borderRadius: 5,
        margin: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});


export default AddSecret;
