import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppState, AsyncStorage, View, Text } from 'react-native';
import { Device } from './components';
import API from './api';

export default class App extends Component {
  state = { devices: [] };

  componentWillMount() {
    AsyncStorage.getItem('devices')
      .then(devicesJson => JSON.parse(devicesJson))
      .then(devices => this.setState({ devices }));
  }

  componentDidMount() {
    AppState.addEventListener('change', state =>
      this.fetchDevices());
  }

  fetchDevices() {
    console.log('fetching');
    API.get('/api/devices.json')
      .then(({ data }) => {
        this.setState({ devices: data });
        AsyncStorage.setItem('devices', JSON.stringify(data));
      });
  }

  reload(slug, statut) {
    devices = this.state.devices.map(device => {
      if (device.title_slug === slug) return { ...device, statut };
      return device;
    });
    setTimeout(() => this.setState({ devices }), 350);
  }

  render() {
    return (
      <LinearGradient colors={['#9691FF', '#5D74F8']} style={s.container}>
        <Text style={s.title}>Maison</Text>
        <View style={s.devices}>
          {this.state.devices.filter(device => device.title).map(device =>
            <Device reload={this.reload.bind(this)} {...device} />
          )}
        </View>
      </LinearGradient>
    );
  }
}

const s = {
  container: {
    backgroundColor: '#9691FF',
    flex: 1,
    paddingTop: 84,
  },
  title: {
    fontWeight: '600',
    fontSize: 40,
    color: '#FFF',
    padding: 30,
  },
  devices: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 30,
    backgroundColor: '#252C4B',
  }
}
