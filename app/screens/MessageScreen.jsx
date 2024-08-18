import React from 'react'
import { Pressable, View, Text, StyleSheet, Image, ImageBackground, TextInput, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function MessageScreen(){
    const messages = [
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Hello ml',
            'id': 1
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'How are you?',
            'id': 2
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'I am good, how about you?',
            'id': 3
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Doing well, thanks!',
            'id': 4
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'What’s up?',
            'id': 5
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Just working on a project.',
            'id': 6
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'Nice! Need any help?',
            'id': 7
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Sure, could use another pair of eyes.',
            'id': 8
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'Count me in!',
            'id': 9
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Awesome, let’s meet up later.',
            'id': 10
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'Sure thing, see you then!',
            'id': 11
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Hey, are you free now?',
            'id': 12
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'Yes, I am.',
            'id': 13
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Let’s get started on that project.',
            'id': 14
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'On it!',
            'id': 15
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Thanks for the help!',
            'id': 16
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'No problem, happy to help.',
            'id': 17
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Catch you later.',
            'id': 18
        },
        {
            'sender': 'idgaf',
            'receiver': 'emmanuelhudson355@gmail.com',
            'message': 'Bye!',
            'id': 19
        },
        {
            'sender': 'emmanuelhudson355@gmail.com',
            'receiver': 'idgaf',
            'message': 'Talk to you soon.',
            'id': 20
        }
    ];
    
    const renderItem = ({ item }) => (
        <View key={item.id} style={styles.messageContainer}>
            <ImageBackground
                source={item.sender === 'emmanuelhudson355@gmail.com' ? require("../../assets/images/Vector.png") : require("../../assets/images/vector2.png")}
                style={[
                    styles.messageBackground,
                ]}
                imageStyle={{ resizeMode: 'stretch' }}
            >
                <Text className="text-white font-pmedium text-[12px] mt-7">
                    {item.message}
                </Text>
            </ImageBackground>
        </View>
    );


    return(
        <SafeAreaView>
            <View className="w-full h-full bg-primary -z-1 flex flex-col items-center justify-center">
                <ImageBackground source={require("../../assets/images/Bg.png")} className="w-full h-full" style={{ resizeMode: 'cover'}}>
                    <View className="flex flex-row items-center justify-between px-4 mt-5">
                        <View>
                            <Pressable>
                                <Image source={require("../../assets/images/back.png")} className="w-10 h-10" style={{resizeMode: 'contain'}}/>
                            </Pressable>
                        </View>
                        <View>
                            <Text className="text-white font-skeletonf text-[36px]">Anonymous</Text>
                        </View>
                        <View>
                            <Image source={require("../../assets/images/icon.png")} className="w-14 h-14" style={{ resizeMode: 'contain' }}/>
                        </View>
                    </View>
                    <View className="w-full h-16 flex flex-row items-center absolute fixed bottom-0 left-0 right-0 px-3">
                        <ImageBackground source={require("../../assets/images/secrettitle.png")} className="w-[80%] h-full px-5" style={{ resizeMode: 'contain' }}>
                            <TextInput placeholder='Input message here' placeholderTextColor="gray" className="w-[80%] py-5 font-pmedium text-[13px]"/>
                        </ImageBackground>
                        <Pressable
                            onPress={() => console.log("Hello world")}
                            style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                        >
                            <Image source={require("../../assets/images/sendbtn.png")} className="w-30 h-20" style={{ resizeMode: 'contain' }}/>
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, width: '100%', paddingHorizontal: 4 }}>
                        <FlatList
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        />
                    </View>
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
                                    className="w-full py-3 font-pmedium text-[13px] text-white" 
                                />
                            </ImageBackground>
                        </View>
                        <View className="w-20 h-18 ml-2">
                            <Pressable
                                onPress={() => console.log("Hello world")}
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
    messageBackground: {
        maxWidth: '75%',
        padding: 10,
    },
    invertedBackground: {
        transform: [{ scaleX: -1 }],
        alignSelf: 'flex-end',
    },
    messageText: {
        transform: [{ scaleX: -1 }],
    },
});