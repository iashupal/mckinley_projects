import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import config from '@src/config';
import DotSlider from '../DotSlider';

const { width } = Dimensions.get('window');

class UserPhotoCarousel extends Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0
    };
  }

  get pagination() {
    const { data, activeSlide } = this.props;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          zIndex: 600,
          alignSelf: 'center',
          position: 'absolute',
          top: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.0)'
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: -5,
          backgroundColor: config.white
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: -5,
          backgroundColor: '#000000'
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={1}
      />
    );
  }

  _renderItem({ item, index }) {
    return (
      <View
        key={index}
        style={{
          // borderColor: 'red',
          // borderWidth: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 4,
            height: 10
          },
          shadowOpacity: 1,
          shadowRadius: 50,
          elevation: 20
        }}
      >
        {item.image ? (
          <Image
            source={item.image}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Image
            source={{ uri: item.url }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>
    );
  }

  render() {
    const {
      data,
      containerStyle,
      onSnapToItem,
      pagination,
      activeSlide
    } = this.props;
    return (
      <View>
        {pagination && this.pagination}
        <Carousel
          inactiveSlideScale={1}
          contentContainerStyle={{ ...styles.container, ...containerStyle }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={width}
          onSnapToItem={index => onSnapToItem(index)}
          itemWidth={width}
        />
        {/* <View style={{ zIndex: 2442, position: "absolute", top: 50, alignSelf: "center" }} >
        <DotSlider 
          containerStyle={{ backgroundColor: "transparent" }} 
          numberOfSteps={data.length} 
          active={activeSlide} />
      </View> */}
      </View>
    );
  }
}

export default UserPhotoCarousel;

const styles = StyleSheet.create({
  container: {
    // height: 300,
    // width,
    alignSelf: 'center'
  }
});
