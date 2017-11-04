import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import API from 'api';

export default class Splash extends Component {
  componentWillMount() {
    AsyncStorage.getItem('devices')
      .then(devicesJson => JSON.parse(devicesJson))
      .then(devices => this.setState({ devices }));

    API.get('/api/devices.json')
      .then(devices => console.log(devices));
  }

  render() {
    console.log(this.state);
    return (
      <View>
        <Text>Lol</Text>
      </View>
    );
  }
}
