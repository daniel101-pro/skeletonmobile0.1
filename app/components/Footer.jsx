import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footerContainer} className="bg-primary">
            <View style={styles.footerContent}>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/images/skeleton.png")} style={styles.image} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/images/fire.png")} style={styles.image} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/images/user.png")} style={styles.image} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingVertical: 16,
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        width: '100%',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
});

export default Footer;
