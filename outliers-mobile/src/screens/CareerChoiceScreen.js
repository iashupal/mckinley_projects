import React, { Component } from 'react';
import {
  View,
  Text,
  SectionList,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native';

// Import components and images
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/InputWithTitle';

import DownArrowIcon from '@assets/images/ic_open_list.png';
import RadioOnIcon from '@assets/images/btn_radio_on.png'
import RadioOffIcon from '@assets/images/btn_radio_off.png'

import config from '@src/config';

const listData = [
  { title: 'General', data: ['Entrepreneur', 'Part-time', 'none'] },
  { title: 'Medical/Health', data: ['Medical Doctor', 'Dentist', 'Psychologist'] },
  { title: 'Medical/Health', data: ['Medical Doctor', 'Dentist', 'Psychologist'] }
]

export default class CareerChoiceScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedSection: -1,
      selectedRow: -1,
      selectedValue: ''
    }
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  renderListItem = ({ item, index, section }) => {
    const { selectedRow, selectedSection } = this.state;
    return (
      <TouchableOpacity style={styles.listItemContainer}
        onPress={() => { this.setState({ selectedRow: index, selectedSection: section, selectedValue: section.title }) }}>
        <Text style={styles.listItem}>
          {item}
        </Text>
        <Image source={(selectedRow === index && selectedSection === section) ? RadioOnIcon : RadioOffIcon} style={styles.radioButton} />
      </TouchableOpacity>
    );
  }

  renderFlatListFooter = ({ section }) => {
    return (
      <TouchableOpacity style={styles.listFooterContainer}>
        <Text style={styles.footerText}>More</Text>
        <Image source={DownArrowIcon} style={styles.arrowImage} />
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <TopBarHeader action={'back'} sectionTitle="직업 선택" />
        <Text style={styles.headerTitle}>1개 선택할 수 있음</Text>
        <View style={styles.container}>
          <InputWithTitle
            placeholder="입력해주세요"
            containerStyle={{ marginTop: 10, marginHorizontal: 20 }}
          />
          <SectionList
            style={styles.list}
            sections={listData}
            renderItem={this.renderListItem}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => `${index}`}
            renderSectionFooter={this.renderFlatListFooter}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <Text style={styles.listHeaderText}>
                  {title}
                </Text>
              );
            }}
          />
        </View>
        <ActionButton
          text="선택 완료"
          customStyle={{
            touchableStyle: styles.buttonStyle
          }}
          onPress1={() => {
            this.props.navigation.navigate('SelectOccupation', {
              career: this.state.selectedValue
            })
          }}
        />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: config.regularFont,
    fontSize: 15,
    color: config.black,
    alignSelf: 'center'
  },
  container: {
    flex: 1
  },
  listHeaderText: {
    fontSize: 16,
    fontFamily: config.regularFont,
    fontWeight: 'bold',
    color: config.black,
    paddingVertical: 7,
  },
  list: {
    // borderBottomColor: config.whiteTwo,
    // borderTopColor: config.whiteTwo,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingHorizontal: 20,
    flex: 1
  },
  listItem: {
    fontSize: 16,
    fontFamily: config.regularFont,
    color: config.black,
    paddingVertical: 7,
  },
  footerText: {
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: "bold",
    color: config.lightGrey,
    paddingVertical: 7
  },
  arrowImage: {
    height: 10,
    width: 10,
    marginLeft: 4
  },
  listFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  radioButton: {
    width: 24,
    height: 24
  }
});
