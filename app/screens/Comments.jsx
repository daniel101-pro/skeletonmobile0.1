import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Pressable, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdsBg from '../components/AdsBg';
import { images } from "../../constants";
import { useLocalSearchParams, useRouter } from 'expo-router';
import Send from '../components/Send';

const Comments = () => {
    const router = useRouter();
    const { secret_id, ad } = useLocalSearchParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newComment, setNewComment] = useState('');

    const getComments = async (secret_id) => {
        try {
            const response = await fetch(`http://192.168.43.96:1234/secret_comments?secret_id=${secret_id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.error('Failed to fetch comments');
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
        const email = await AsyncStorage.getItem('email'); // Get the email from AsyncStorage
        try {
            const response = await fetch('http://192.168.43.96:1234/secret_comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret_id,
                    comment: newComment,
                    email,
                }),
            });

            const result = await response.json();

            if (result.status === 200) {
                setNewComment('');
                getComments(secret_id); // Refresh comments
            } else {
                Alert.alert('Error', result.message || 'Failed to add comment');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while adding the comment.');
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
        return (
            <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Error loading comments.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#0D203B", flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/Bg.png")}
                style={{ flex: 1 }}
                resizeMode="cover"
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <AdsBg ad={ad} /> {/* Pass ad as a prop */}
                </View>

                <View 
                    style={{ borderWidth: 2, flex: 1, marginTop: 10, borderColor: "#0D203B", borderRadius: 40, backgroundColor: "white" }}
                >
                    <View style={{ width: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                        <Image source={require("../../assets/images/rect.png")} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4, spaceX: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>3k Reactions</Text>
                        <Text style={{ fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>12.3k Comments</Text>
                    </View>
                    <View style={{ marginTop: 20, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}>Add Reaction</Text>
                        <Image 
                            source={require("../../assets/images/reactions_frame.png")} 
                            style={{ width: '100%', marginTop: 2, height: 50, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}>Comments</Text>
                    </View>

                    {/* ScrollView now displays actual comments */}
                    <ScrollView style={{ paddingHorizontal: 5, marginTop: 4, maxHeight: '40vh' }}>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <View key={index} style={{ marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'semibold', color: 'black' }}>
                                        {comment.comment}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ fontWeight: 'semibold', color: 'black' }}>No comments available.</Text>
                        )}
                    </ScrollView>

                    {/* Comment input and submission */}
                    <View style={{ paddingHorizontal: 5, marginTop: 20 }}>
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
