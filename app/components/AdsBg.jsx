import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

const AdsBg = ({ title, comment_number, body, like_number }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/ads_bg.png")}
        style={styles.imageBackground}
        resizeMode="stretch" // Changed to "cover" for better scaling
      >
        <View style={styles.content}>
          <Text style={styles.title} className="text-white font-skeletonf">Runaway</Text>
          <Text style={styles.body} className="text-white text-[28px] font-skeletonf">
            I want to run away from home. I feel my family doesn't appreciate me enough.
          </Text>
        </View>
        <View style={styles.footer} className="font-skeletonf flex flex-row items-center mt-[30px] p-4">
          <Image source={require("../../assets/images/group8.png")} className="w-auto h-auto"/>
          <Text style={styles.comments} className="font-skeletonf text-white">12.3k Comments</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 'full',
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBackground: {
    width: "100%",
    height: 250, // Increased height to fit the content
    justifyContent: "space-between", // Align content and footer with space between them
    paddingVertical: 20, // Adjusted vertical padding
    paddingHorizontal: 15, // Adjusted horizontal padding
  },
  content: {
    marginBottom: 10, // Space between content and footer
    display: 'flex',
    padding: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 10, // Margin between title and body
  },
  body: {
    color: "#fff",
    fontSize: 24, // Adjusted font size for better readability
  },
  footer: {
    alignItems: "center",
    marginBottom: 30 // Adjusted padding for the footer
  },
  comments: {
    fontSize: 30,
    color: "#fff",
  },
});

export default AdsBg;
