import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

//Import assets
import AddImage from "@assets/images/ic_add_photo.png";
import styles from "./styles";
import config from "@src/config";
import { withNamespaces } from "react-i18next";

function RegisterPhoto(props) {
  const [imageSource, setImageSource] = useState(props.imageSource ? props.imageSource : "");

  function openGallery() {
    const options = {
      title: props.t("regsiterPhoto:selectImage"),
      storageOptions: {
        skipBackup: true,
        path: "images"
      },
      quality: 0.4
    };

    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert(props.t("common:app.error"), props.t("common:app.errorGallery"));
      } else {
        const resizedResponse = await ImageResizer.createResizedImage(response.uri, 200, 200, "JPEG", 100);
        const source = { uri: resizedResponse.uri };
        if (props.isVibe) {
          setImageSource(source);
          const image = {
            uri: resizedResponse.uri,
            name: resizedResponse.name,
            type: "image/jpeg"
          };
          props.changedVibeImage(image);
        } else {
          props.setPhoto(resizedResponse.uri).then(function(response) {
            //alert(JSON.stringify(response.data.Body));
            if (response.status != 400) {
              if (response.data.Body === "PROFILE_IMAGE_UPDATE_REQUEST_REGISTERED") {
                Alert.alert(`${props.t("common:app.verifyImg")}`);
              } else if (response.data.Body === "PROFILE_UPDATED_SUCCESSFULLY") {
                setImageSource(source);
                props.updateCounter();
                alert(props.t("common:app.profileUpdate"));
              } else {
                setImageSource(source);
                props.updateCounter();
              }
            } else {
              //PROFILE_IMAGE_UPDATE_REQUEST_REGISTERED 200
              //ALREADY_REQUESTED 400
              //PROFILE_UPDATED_SUCCESSFULLY 200
              //DUPLICATE_IMAGE_NOT_ALLOWED 400

              if (response.data.Body === "DUPLICATE_IMAGE_NOT_ALLOWED") {
                setImageSource("");
                Alert.alert(props.t("common:app.errorDuplicate"));
              } else if (response.data.Body === "ALREADY_REQUESTED") {
                Alert.alert(props.t("common:app.alreadyRequested"));
              }
            }
          });

          // Alert.alert(JSON.stringify(data));
        }
      }
    });
  }

  return (
    <TouchableOpacity style={{ flex: 1, margin: 0, ...props.containerStyle }} onPress={() => openGallery()}>
      {imageSource !== "" && (
        <Image
          source={imageSource}
          resizeMethod="scale"
          resizeMode="cover"
          style={[props.isVibe ? styles.component_width : styles.half_width, styles.uploadButton]}
        />
      )}
      {!imageSource && (
        <View
          style={[
            props.isVibe ? styles.component_width : styles.half_width,
            styles.uploadButton,
            {
              borderColor: props.tintColor ? props.tintColor : config.charcoal_grey
            }
          ]}
        >
          <Image
            source={AddImage}
            style={[
              styles.addIcon,
              {
                tintColor: props.tintColor ? props.tintColor : config.charcoal_grey
              }
            ]}
          />
          {props.title ? props.title : null}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default withNamespaces(["common", "regsiterPhoto"], {
  wait: true
})(RegisterPhoto);
