import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { getAge, getSex } from '@utils/utility';
import styles from './styles';
import Level from '../Level';
const { width } = Dimensions.get('window');
export default function UserBasicInfo(props) {
  const user = props.user || { age: 0, sex: '', username: '', level: 1 };
  const college = props.college || false;
  return (
    <View
      style={{
        ...styles.vibeHeader,
        maxWidth: '70%'
      }}
    >
      <Level level={user.level} levelType={user.levelType} />
      <Text numberOfLines={1} style={styles.userInfo}>
        {`${getAge(user.dob)}, ${getSex(user.sex)}, ${
          college ? user.college : user.college
        }`}
      </Text>
    </View>
  );
}
