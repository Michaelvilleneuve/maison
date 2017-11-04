import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { Device } from './components';
import API from './api';

export default class App extends Component {
  state = { devices: [] };

  componentWillMount() {
    AsyncStorage.getItem('devices')
      .then(devicesJson => JSON.parse(devicesJson))
      .then(devices => this.setState({ devices }));

    API.get('/api/devices.json')
      .then(({ data }) => {
        this.setState({ devices: data });
        AsyncStorage.setItem('devices', JSON.stringify(data));
      });
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>Maison</Text>
        <View style={s.devices}>
          {this.state.devices.map(device =>
            <Device {...device} />
          )}
        </View>
      </View>
    );
  }
}

const s = {
  container: {
    backgroundColor: '#9691FF',
    flex: 1,
    paddingTop: 64,
  },
  title: {
    fontWeight: '600',
    fontSize: 40,
    color: '#FFF',
    padding: 30,
  },
  devices: {
    backgroundColor: '#252C4B',
    flex: 1,
    borderRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 30,
  }
}
