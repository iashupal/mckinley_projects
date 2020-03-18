import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import config from '@src/config';

export default (Comp: ReactClass<*>) => {
  return ({ active, text = "", children, ...props }: Object) => (
    <View style={{ flex: 1 }}>
      <Comp {...props}>
        {children}
      </Comp>
      {active ?
        <View
          style={[
            { position: "absolute", width: "100%", bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' }
          ]}
        >
          <View style={{ 
              width: "100%",
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
              lineHeight: 24,
              letterSpacing: 0,
              textAlign: "center",
              color: config.black,
              ...props.textStyle
              }}>
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