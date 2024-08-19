import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react'
import { View, Text, Pressable } from 'react-native'


const AddBtn = () => {
    const router = useRouter()
    return(
        <Pressable onPress={() => router.push("screens/AddSecret")} className="p-[10px] border-2 border-red-600 rounded-lg bg-red-600">
            <Plus color="white" size={35}/>
        </Pressable>
    )
}

export default AddBtn;