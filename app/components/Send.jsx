import React from 'react';
import { View, TextInput, Pressable, Image } from 'react-native';

const Send = ({ comment, onCommentChange, onSend }) => {
    return(
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            width: '100%', // Makes sure the component takes the full width of the container
        }}>
            <TextInput 
                value={comment}
                onChangeText={onCommentChange}
                placeholder='Add a comment' 
                placeholderTextColor="gray" 
                style={{
                    borderWidth: 1,
                    borderColor: '#D1D1D1',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    width: '85%', // TextInput takes up 85% of the width
                    marginRight: 10, // Adds some space between the TextInput and the Pressable
                }}
            />
            <Pressable
                onPress={onSend}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.6 : 1,
                    width: 50,
                    height: 50,
                })}
            >
                <Image 
                    source={require("../../assets/images/send_btn.png")} 
                    style={{ width: 50, height: 50, resizeMode: 'contain' }} 
                />
            </Pressable>
        </View>
    );
}

export default Send;
