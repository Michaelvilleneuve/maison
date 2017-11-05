import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class Sensor extends Component {
  render() {
    return (
      <View style={s.container}>
        <Icon name={this.props.icon} style={s.icon} />
        <Text style={s.value}>{this.props.value}</Text>
      </View>
    );
  }
}

const s = {
  value: {
    fontSize: 20,
    color: '#FFF',
  },
  container: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#FFF',
    fontSize: 18,
    paddingRight: 5,
  },
};
