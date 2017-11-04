import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import API from '../api';
import { Touchable } from './';

export class Device extends Component {
  toggle() {
    API.post(`/devices/${this.props.statut ? 'off' : 'on'}/${this.props.title_slug}`);
    this.props.reload(this.props.title_slug, !this.props.statut);
  }


  render() {
    return (
      <Touchable
        containerStyle={s.touchable}
        circleColor={this.props.statut ? '#27325F' : '#9691FF'}
        onPress={this.toggle.bind(this)}
        style={s.container(this.props.statut)}
      >
        <Text style={s.deviceName(this.props.statut)}>{this.props.title}</Text>
        <Text style={s.deviceName(this.props.statut)}>{this.props.statut ? 'Allumé' : 'Éteint'}</Text>
      </Touchable>
    );
  }
}

const s = {
  container: status => ({
    alignSelf: 'center',
    width: Dimensions.get('window').width - 60,
    borderRadius: 15,
    backgroundColor: status ? '#9691FF' : '#27325F',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
  }),
  touchable: {
    height: 75,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  deviceName: status => ({
    color: status ? '#27325F' : '#9691FF',
    fontWeight: '600',
    fontSize: 20,
  }),
};
