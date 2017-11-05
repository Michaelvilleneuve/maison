import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API from '../api';
import { Touchable } from './';

export class Action extends Component {
  toggle() {
    API.post(`/actions/${this.props._id}`);
  }


  render() {
    return (
      <Touchable
        containerStyle={s.touchable}
        circleColor="#9691FF"
        onPress={this.toggle.bind(this)}
        style={s.container}
      >
        <Text style={s.actionName}>{this.props.title}</Text>
        <Icon name={this.props.icon} style={s.actionIcon} />
      </Touchable>
    );
  }
}

const s = {
  container: {
    alignSelf: 'center',
    width: 120,
    borderRadius: 15,
    backgroundColor: '#27325F',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  touchable: {
    height: 140,
    borderRadius: 15,
    marginBottom: 15,
    marginRight: 20,
    overflow: 'hidden',
  },
  actionName: {
    color: '#9691FF',
    fontWeight: '400',
    paddingBottom: 10,
    fontSize: 20,
  },
  actionIcon: {
    fontSize: 30,
    color: '#9691FF',
  },
};
