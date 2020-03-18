import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

export default function PhotoSelection(props) {
  const photos = props.photos ? props.photos : [];
  const currentSelectedImage = props.currentSelectedImage ? props.currentSelectedImage : 0;

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.profileList}>
        {photos.map((photo, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => props.changedSelectedImage(i)}>
              <Image
                style={currentSelectedImage == i ? [styles.profileImage, styles.selectedImage] : styles.profileImage}
                source={{
                  uri: photo.url
                }}
                imageStyle={{
                  borderRadius: 48
                }}
                indicator={Progress.Circle}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
