import React from 'react';
import { Image } from 'react-native';
import { Tabs } from 'expo-router';

export default function Footer() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'red', // Set your active tab color here
                tabBarStyle: {
                    backgroundColor: '#0D203B', // Background color of the tab bar
                    paddingVertical: 0, // Adjust padding for height
                    borderTopWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderTopColor: '#0D203B', // Border color at the top of the tab bar
                },
            }}
        >
            <Tabs.Screen
                name="HomeScreens"
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/images/skeleton.png')}
                            style={{ width: 30, height: 30, tintColor: color, resizeMode: 'contain' }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Requests"
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/images/fire.png')}
                            style={{ width: 30, height: 30, tintColor: color, resizeMode: 'contain' }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/images/user.png')}
                            style={{ width: 30, height: 30, tintColor: color, resizeMode: 'contain' }}
                        />
                    ),
                }}
            />
            
        </Tabs>
    );
}
