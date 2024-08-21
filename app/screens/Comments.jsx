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
    const { secret_id, ad } = useLocalSearchParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [addingComment, setaddingComment] = useState(false)

    const getComments = async (secret_id) => {
        try {
            const response = await fetch(`http://192.168.43.96:1234/secret_comments?secret_id=${secret_id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.error('Failed to fetch comments');
                console.log("Response: ", response);
                console.log("ResponseJSON: ", await response.json());
                setError(true);
                return;
            }

            const resp2 = await response.json();

            if (resp2.status === 200) {
                setComments(resp2.comments);
            } else {
                console.error('Error fetching comments:', resp2.message || 'Unknown error');
                setError(true);
            }
        } catch (error) {
            console.error('An error occurred while fetching comments:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const addComment = async () => {
        setaddingComment(true)
        const email = await AsyncStorage.getItem('email'); // Get the email from AsyncStorage
        const formdata = new FormData()
        formdata.append("comment", newComment)
        console.log("Ne: ", newComment)
        formdata.append("email", email)
        formdata.append('secret_id', secret_id)
        try {
            const response = await fetch('http://192.168.43.96:1234/secret_comments', {
                method: 'POST',
                body: formdata
            });
            if (!response.ok){
                console.log("Response: ", response)
                console.log("REsponseJSON: ", await response.json())
                return
            }

            const result = await response.json();

            if (result.status === 200) {
                console.log("REsult: ", result)
                setNewComment('');
                getComments(secret_id); // Refresh comments
                console.log("Comments type shii: ", comments)
            } else {
                Alert.alert('Error', result.message || 'Failed to add comment');
            }
        } catch (error) {
            console.log("Er", error)
            Alert.alert('Error', 'An error occurred while adding the comment.');
        } finally{
            setaddingComment(false)
        }
    };

    useEffect(() => {
        if (secret_id) {
            getComments(secret_id);
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
        console.log("Error happened: ", error);
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
                        <AdsBg title={secret_id} body={ad} like_number='--' comment_number='--'/>
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

                    {/* ScrollView now displays actual comments */}
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
                                            {comment.comment || 'No content'} {/* Handle undefined or null comments */}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ fontWeight: 'semibold', color: 'black' }}>No comments available.</Text>
                            )}
                        </ScrollView>
                    )

                    }
                    

                    {/* Comment input and submission */}
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
}

export default Comments;
