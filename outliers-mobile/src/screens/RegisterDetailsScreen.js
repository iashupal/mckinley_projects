import React, { Fragment, useEffect } from "react";
import { ScrollView, FlatList, StyleSheet, BackHandler } from "react-native";

//Import Components
import TopBarHeader from "@components/TopBarHeader";
import DotSlider from "@components/DotSlider";
import UserDetailsList from "@components/UserDetailsList";
import ActionButton from "@components/ActionButton";

export default function RegisterDetailsScreen(props) {
  const { t } = props;
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      <TopBarHeader sectionTitle="기본정보 입력" action={"back"} />
      <DotSlider numberOfSteps={2} active={2} />
      {/* Left ScrollView for performance comparison */}
      {/* <ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentStyle}
			>
				<UserDetailsList />
			</ScrollView> */}
      <FlatList
        data={["1"]}
        keyExtractor={item => item}
        style={styles.container}
        contentContainerStyle={styles.contentStyle}
        renderItem={key => <UserDetailsList key={key} />}
      />

      <ActionButton onPress1={() => props.navigation.navigate("VerifySchool")} text="다음" />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  contentStyle: { alignItems: "center" }
});
