import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';

import styles from './styles';
import config from '@src/config';
// import { Dimensions } from 'Dimensions';
export default class HorizontalFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      filterList: [
        { name: 'All', value: '' },
        { name: 'Female', value: 'Female' },
        { name: 'Male', value: 'Male' },
        { name: 'Others', value: 'Others' },
        { name: 'Following', value: 'Following' }
      ]
    };
  }

  render() {
    var { width, height } = Dimensions.get('window');
    return (
      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          alignContent: 'space-between',
          width: '100%'
        }}
        data={this.state.filterList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        extraData={this.state.selectedIndex}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ index, item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedIndex: index });
                this.props.applySexFilter(item.value);
              }}
            >
              <Text
                style={[
                  styles.itemTitle,
                  {
                    borderColor:
                      index === this.state.selectedIndex
                        ? config.navyBlack
                        : config.whiteTwo,
                    color:
                      index === this.state.selectedIndex
                        ? config.navyBlack
                        : config.hintText,
                    borderRadius: 14,
                    paddingLeft: 0.03 * width,
                    paddingRight: 0.03 * width
                  }
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}
