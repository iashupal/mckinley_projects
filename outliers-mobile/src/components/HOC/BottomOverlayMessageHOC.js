import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import config from '@src/config';
import ShadowDetail from '@assets/images/shadowDetail.png';

export default (Comp: ReactClass<*>) => {
  return ({ active, text = "", children, ...props }: Object) => (
    <View style={{ flex: 1 }}>
      <Comp {...props}>
        {children}
      </Comp>
      {active ?
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0, 0, 0, 0.0)', justifyContent: 'flex-end' }
          ]}
        >
        <Image 
          style={{ 
            position: "absolute", 
            width: "100%", 
            height: "100%"
            }} 
          source={ShadowDetail}
        />
          <View style={{ 
              width: "100%",
              height: 28,
              justifyContent: "center",
              backgroundColor: config.paleGold,
              opacity: 0.9,
              ...props.textContainerStyle
            }}>
            {text && <Text style={{ 
              fontFamily: config.regularFont,
              fontSize: 14,
              fontWeight: "600",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "center",
              color: config.black,
              ...props.textStyle
              }} >
              {text}
            </Text>}
          </View>
        </View>
        :
        <View />
        }
    </View>
  );
};