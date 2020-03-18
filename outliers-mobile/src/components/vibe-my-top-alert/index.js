import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

class VibeMyTopAlert extends Component {
  render() {
    return class ModalExample extends Component {
      state = {
        modalVisible: false
      };

      setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }

      render() {
        return (
          <View style={{ marginTop: 22 }}>
            <Modal
              animationType='slide'
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <View style={{ marginTop: 22 }}>
                <View>
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text>Show Modal</Text>
            </TouchableHighlight>
          </View>
        );
      }
    };
  }
}

export default VibeMyTopAlert;
