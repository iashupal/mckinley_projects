import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native";
import config from "@src/config";
import ActionButton from "@components/ActionButton";
import ImageSlider from "@components/ImageSlider";
import Divider from "@components/Divider";
import SeatTab from "@components/SeatTab";
import Markdown from "react-native-markdown-renderer";

const data = {
  images: [
    "https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
    "https://images.unsplash.com/photo-1562102010-6818eb07712c?ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80",
    "https://images.unsplash.com/photo-1571525030628-dbccfb5223b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80"
  ],
  numOfSeatsLeft: 3,
  subtitle: "이베리코전문 Chef가 준비하는 프라이벳 디너",
  title: "Fine dining by a private chef; Ibérico",
  originalPrice: "195,000",
  discountedPrice: "105,000",
  discount: "오프닝할인",
  dateTime: "10월 06일 (일)오후 06:30",
  location: "서울 강남구 역삼동 201 이베리코식당",
  people: "모집인원 10명 (남5, 여5)",
  host: {
    avatar:
      "https://images.unsplash.com/photo-1571525030628-dbccfb5223b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
    introduction: "호스트 소개",
    name: "레귤러 식스",
    description:
      "강남N타워 지하 2층에 위치판 레스토랑 레귤러 식스입니다. 월향, 평화옥, 조선횟집, 그릴룸, 라운지 엑스, 알코브 6개의 매장을 운영하고있습니다. 강남N타워 지하 2층에 더보기 강남N타워 지하 2층에 위치판 레스토랑 레귤러 식스입니다. 월향, 평화옥, 조선횟집, 그릴룸,라운지 엑스, 알코브 6개의 매장을 운영하고있습니다. 강남N타워 지하 2층에 더보기"
  },
  rating: {
    average: "0.0",
    total: "0",
    reviews: []
  }
};

const copy = `
### 이벤트소개

서울 속 유럽, 스위스 산장 가스트로통에서 토요일 오후, 여유와 힐링을 경험하세요.

**1인당 1메뉴 + 와인 2잔 + 디저트** 거기에, 가스트로통 대표님이자 소믈리에의 와인 TIP까지 한 번에 즐기실 수 있어요!

![alt text](https://images.unsplash.com/photo-1571525030628-dbccfb5223b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80 "Logo Title Text 1")

서울 속 유럽, 스위스 산장 가스트로통에서 토요일 오후, 여유와 힐링을 경험하세요.

**1인당 1메뉴 + 와인 2잔 + 디저트** 거기에, 가스트로통 대표님이자 소믈리에의 와인 TIP까지 한 번에 즐기실 수 있어요!

![alt text](https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80 "Logo Title Text 1")
`;

function Event2DetailScreen(props) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <ImageSlider images={data.images} />
        <View style={[styles.content, styles.header]}>
          <SeatTab color="#fd4a5a">{data.numOfSeatsLeft}명 남음</SeatTab>
          <Text style={styles.subtitle}>{data.subtitle}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.money}>
            <View style={styles.left}>
              <Text style={styles.priceOriginal}>{data.originalPrice}원</Text>
              <Text style={styles.priceDiscounted}>
                {data.discountedPrice}원{" "}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.discount}>-{data.discount}</Text>
            </View>
          </View>
        </View>
        <Divider />
        <View style={[styles.content, styles.details]}>
          <View style={styles.detail}>
            <Image
              source={require("../assets/images/ic_pass_30.png")}
              style={{ width: 18, height: 18, marginRight: 6 }}
            />
            <Text style={styles.detailText}>{data.dateTime}</Text>
          </View>
          <View style={styles.detail}>
            <Image
              source={require("../assets/images/ic_location.png")}
              style={{ width: 18, height: 18, marginRight: 6 }}
            />
            <Text style={styles.detailText}>{data.location}</Text>
          </View>
          <View style={styles.detail}>
            <Image
              source={require("../assets/images/ic_nick.png")}
              style={{ width: 18, height: 18, marginRight: 6 }}
            />
            <Text style={styles.detailText}>{data.people}</Text>
          </View>
        </View>
        <Divider />
        <View style={[styles.content, styles.host]}>
          <View style={styles.hostHeader}>
            <Image
              source={{
                uri: data.host.avatar
              }}
              style={{ width: 48, height: 48, borderRadius: 48 }}
            />
            <View style={styles.hostInfo}>
              <Text style={styles.hostIntroduction}>
                {data.host.introduction}
              </Text>
              <Text style={styles.hostName}>{data.host.name}</Text>
            </View>
          </View>
          <View style={styles.hostTextContainer}>
            {!expanded ? (
              <Fragment>
                <Text
                  style={styles.hostText}
                  ellipsizeMode="tail"
                  numberOfLines={3}
                >
                  {data.host.description}
                </Text>
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.expand}>더보기</Text>
                </TouchableOpacity>
              </Fragment>
            ) : (
                <Fragment>
                  <Fragment>
                    <Text style={styles.hostText}>{data.host.description}</Text>
                    <View style={{ marginTop: 20 }}>
                      <Markdown style={markdownStyles}>{copy}</Markdown>
                    </View>
                  </Fragment>
                </Fragment>
              )}
            {expanded && (
              <Fragment>
                <Divider />
                <Text style={styles.disclaimer}>신청시 유의사항</Text>
                <View style={{ marginTop: 10 }}>
                  <Text>
                    - 최소 인원 미달로 인한 취소 시 프립 마감 시간 24시간 전에
                    안내를 드리며 참가비는 전액 환불해 드립니다.
                  </Text>
                  <Text>
                    - 알러지가 있는 특정 재료에 대해 미리 알려주시기 바랍니다. -
                    해당 프립은 일정에 따라 커리큘럼이 상이합니다.
                  </Text>
                  <Text>
                    - 음주를 하실 경우, 성인 확인이 필요하오니 신분증을 같이
                    지참 해 주십시오.
                  </Text>
                  <Text>
                    - 음주를 못 하시는 경우 커피 또는 차로 대체 가능합니다.
                  </Text>
                  <Text>- 술을 드실 경우 대중교통 이용을 권장합니다.</Text>
                </View>

                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.expand}>더보기</Text>
                </TouchableOpacity>
              </Fragment>
            )}
          </View>
        </View>
        <Divider />
        <View style={[styles.content, styles.ratings]}>
          <Text style={styles.ratingTitle}>
            평점 {data.rating.average}{" "}
            <Text style={styles.ratingCount}>({data.rating.total})</Text>
          </Text>
          {data.rating.reviews.length > 0 ? (
            <View style={styles.noRatings}>
              <Text style={styles.noRatingsText}>평가가 없습니다</Text>
            </View>
          ) : (
              <View style={styles.noRatings}>
                <Text style={styles.noRatingsText}>평가가 없습니다</Text>
              </View>
            )}

          <TouchableOpacity style={styles.newReviewButton}>
            <Text style={styles.newReviewButtonText}>리뷰를 남겨주세요</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ActionButton
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        onPress2={() => props.onActionClick()}
        text={props.paid ? "환불하다" : "참여하기"}
      />
    </Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 0
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  subtitle: {
    paddingVertical: 5,
    color: "#aaaaaa",
    fontSize: 14,
    fontWeight: "600"
  },
  title: {
    color: "#222222",
    fontSize: 20,
    fontWeight: "600"
  },
  priceOriginal: {
    color: "#aaaaaa",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  priceDiscounted: {
    color: "#5ba1ff",
    fontSize: 28,
    fontWeight: "600"
  },
  discount: {
    color: "#fd4a5a",
    fontSize: 16
  },

  money: {
    flex: 1,
    flexDirection: "row",
    marginTop: 8
  },
  right: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1
  },

  details: {
    flex: 1
  },
  detail: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row"
  },
  detailText: {
    fontSize: 14,
    color: "#222222"
  },

  hostHeader: {
    flex: 1,
    flexDirection: "row"
  },
  hostInfo: {
    marginLeft: 10,
    alignSelf: "center"
  },
  hostIntroduction: {
    fontSize: 11,
    color: "#222222"
  },
  hostName: {
    fontSize: 18,
    color: "#222222",
    fontWeight: "600"
  },
  hostText: {
    fontSize: 13,
    color: "#666666",
    marginTop: 15,
    lineHeight: 18
  },
  expand: {
    fontSize: 13,
    color: "#3085f9",
    lineHeight: 18
  },
  ratingTitle: {
    fontSize: 14,
    color: "#222222",
    fontWeight: "600"
  },
  ratingCount: {
    fontSize: 14,
    color: "#888888"
  },
  noRatings: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  newReviewButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: "#3a424b"
  },
  newReviewButtonText: {
    fontSize: 14,
    color: "#222222",
    fontWeight: "600"
  },
  disclaimer: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "600"
  }
});

const markdownStyles = StyleSheet.create({
  heading3: {
    color: "#222222"
  }
});

export default Event2DetailScreen;
