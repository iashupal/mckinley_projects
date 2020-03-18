import React, { Component } from "react";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import styles from "./styles";

function Events({ eventImg, eventHeading, eventTime, eventTag }) {
  return (
    <View style={styles.events}>
      <Text style={styles.eventImg}>{eventImg}</Text>
      <View style={styles.eventPartyContent}>
        <Text style={styles.eventHeading}>{eventHeading}</Text>
        <Text style={styles.eventHeading}>{eventTime}</Text>
        <Text style={styles.eventHashtag}>{eventTag}</Text>
      </View>
    </View>
  );
}
export default Events;
