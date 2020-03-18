import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';

import ReplyIcon from '@assets/images/ic_comment.png';
import LikeIcon from '@assets/images/ic_like_outline.png';
import gradientBG from '@assets/images/ic_gradient_bg.png';
import MoreIcon from '@assets/images/ic_more.png';

import styles from './styles';
import { getAge, getSex } from '@utils/utility';
import Level from '@components/Level';

export default function Vibe(props) {
  const user = props.user || { sex: '', dob: '', username: '' };
  const vibeDetails = props.vibeDetails;
  return (
    <TouchableOpacity {...props} style={{ ...styles.vibeContainer, margin: 1 }}>
      {/* <View style={styles.vibeHeader}> */}
      {/* <View style={styles.userLevel}>
					<Text style={styles.userLevelText}>2</Text>
				</View> */}
      {/* <Level level={user.level} levelType={user.levelType} /> */}
      {/* <Text style={styles.userInfo}>{getAge(user.dob)}, {getSex(user.sex)}, {user.username}</Text> */}
      {/* </View> */}
      <Image
        style={styles.vibeImage}
        source={{
          uri: props.image
        }}
      />
      <ImageBackground
        style={styles.gradientImage}
        source={gradientBG}
        resizeMode='cover'
      >
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, alignItems: 'center' }}>
					<View style={styles.vibeAction}>
						<View style={styles.vibeComment}>
							<Image style={styles.replyIcon} source={ReplyIcon} />
							<Text style={styles.commentCount}>
								{vibeDetails.numberOfComments}
							</Text>
						</View>
						<View style={styles.vibeLikes}>
							<Image style={styles.likeIcon} source={LikeIcon} />
							<Text style={styles.likeCount}>
								{vibeDetails.numberOfFollowers}
							</Text>
						</View>
					</View>
					<Image style={styles.likeIcon} source={MoreIcon} />
				</View> */}
        <View style={styles.vibeHeader}>
          {/* <View style={styles.userLevel}>
					<Text style={styles.userLevelText}>2</Text>
				</View> */}
          <Level level={user.level} levelType={user.levelType} />
          <Text style={styles.userInfo}>
            {getAge(user.dob)}, {getSex(user.sex)}
            {/* , {user.username} */}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
