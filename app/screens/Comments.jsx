import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Pressable, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdsBg from '../components/AdsBg';
import { images } from "../../constants";
import { useLocalSearchParams, useRouter } from 'expo-router';
import Send from '../components/Send';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Comments = () => {
    const router = useRouter();
    const { secret_id, ad, secret_title, comment_count } = useLocalSearchParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [addingComment, setaddingComment] = useState(false);

    const getComments = async () => {
        try {
            console.log("GettingSID: ", secret_id)
            console.log("GettingSID: ", secret_id);
            const formData = new FormData();
            formData.append("secret_id", secret_id);
            console.log("FormData: ", formData)
            
            const response = await fetch(`http://192.168.43.96:1234/get_comments`, {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                console.log("REsponse: ", response)
                console.log("E: ", await response.json())
                return
            }
            const resp2 = await response.json();
            if (resp2.status === 200) {
                setComments(resp2.comments);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
            console.log("Error: ", error)
        } finally {
            setLoading(false);
        }
    };

    const addComment = async () => {
        setaddingComment(true);
        const email = await AsyncStorage.getItem('email');
        const formdata = new FormData();
        formdata.append("comment", newComment);
        formdata.append("email", email);
        formdata.append('secret_id', secret_id);
        console.log("Formdata: ", formdata)
        try {
            const response = await fetch('http://192.168.43.96:1234/secret_comments', {
                method: 'POST',
                body: formdata,
            });
            const result = await response.json();
            if (result.status === 200) {
                setNewComment('');
                getComments(secret_id); 
            } else {
                Alert.alert('Error', result.message || 'Failed to add comment');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while adding the comment.');
        } finally {
            setaddingComment(false);
        }
    };

    useEffect(() => {
        if (secret_id) {
            console.log("Se: ", secret_id)
            getComments();
        }
    }, [secret_id]);

    if (loading) {
        return (
            <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Error loading comments.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1, width: '100%' }}>
            <ImageBackground
                source={require("../../assets/images/Bg.png")}
                style={{ flex: 1 }}
                resizeMode="cover"
                className="w-full"
            >
                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
                >
                    <Image
                        source={images.arrowback}
                        style={{ width: 82, height: 84, marginLeft: 5 }}
                        resizeMode="contain"
                    />
                </Pressable>
                {ad ? (
                    <View className='flex flex-row items-center justify-center w-full'>
                        <AdsBg
                            title={secret_title ? secret_title : secret_id}
                            comment_number={comment_count}
                            body={ad}
                            like_number="--"
                        />
                    </View>
                ) : (
                    <View>
                        <Text>World</Text>
                    </View>
                )}

                <View 
                    style={{ borderWidth: 2, flex: 1, marginTop: 10, borderColor: "#0D203B", borderRadius: 40, backgroundColor: "white" }}
                >
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                        <Image source={require("../../assets/images/rect.png")} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4, spaceX: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}></Text>
                        <Text className="text-black font-pbold text-[20px]">{comments.length} Comments</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}>Comments</Text>
                    </View>

                    {addingComment ? (
                        <View className="flex flex-row items-center justify-center w-full">
                            <ActivityIndicator color='blue' size={30}/>
                        </View>
                    ) : (
                        <ScrollView style={{ paddingHorizontal: 20, marginTop: 20, maxHeight: '60vh' }}>
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <Text className="text-black font-pmedium text-[16px]">
                                            {comment.comment || 'No content'}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ fontWeight: 'semibold', color: 'black' }}>No comments available.</Text>
                            )}
                        </ScrollView>
                    )}

                    <View style={{ paddingHorizontal: 5 }} className="absolute fixed bottom-5 left-0 right-0 w-full bg-white pt-10">
                        <Send
                            comment={newComment}
                            onCommentChange={setNewComment}
                            onSend={addComment}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Comments;
