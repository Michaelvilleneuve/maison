import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import React from 'react';

export const Touchable = (props) => {
  if (Platform.OS === 'android') {
    return (
      <View style={props.containerStyle}>
        <TouchableNativeFeedback
          {...props}
          background={TouchableNativeFeedback.Ripple(props.circleColor || '#999', true)}
        >
          <View style={props.style}>
            {props.children}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
  return <TouchableOpacity {...props} />;
};
