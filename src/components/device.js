import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import { Touchable } from './';

export class Device extends Component {
  render() {
    return (
      <Touchable containerStyle={s.touchable} circleColor="#9691FF" style={s.container}>
        <Text style={s.deviceName}>{this.props.title}</Text>
      </Touchable>
    );
  }
}

const s = {
  container: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 60,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#27325F',
    padding: 20,
    height: 75,
  },
  touchable: {
    height: 75,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  deviceName: {
    color: '#9691FF',
    fontWeight: '600',
    fontSize: 20,
  }
};
