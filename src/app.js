import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, AppState, Dimensions, AsyncStorage, View, Text } from 'react-native';
import { Device, Action, Sensor } from './components';
import API from './api';

export default class App extends Component {
  state = { devices: [], actions: [], sensors: [] };

  componentWillMount() {
    AsyncStorage.getItem('devices')
      .then(devicesJson => JSON.parse(devicesJson))
      .then(devices => this.setState({ devices }));
    AsyncStorage.getItem('actions')
      .then(actionsJson => JSON.parse(actionsJson))
      .then(actions => this.setState({ actions }));
    AsyncStorage.getItem('sensors')
      .then(sensorsJson => JSON.parse(sensorsJson))
      .then(sensors => this.setState({ sensors }));
  }

  componentDidMount() {
    AppState.addEventListener('change', state =>
      this.fetchDatas());
  }

  fetchDatas() {
    API.get('/api/devices.json')
      .then(({ data }) => {
        this.setState({ devices: data });
        AsyncStorage.setItem('devices', JSON.stringify(data));
      });
    API.get('/api/actions.json')
      .then(({ data }) => {
        this.setState({ actions: data });
        AsyncStorage.setItem('actions', JSON.stringify(data));
      });
    API.get('/api/sensors.json')
      .then(({ data }) => {
        console.log(data);
        this.setState({ sensors: data });
        AsyncStorage.setItem('sensors', JSON.stringify(data));
      });
  }

  reload(slug, statut) {
    devices = this.state.devices.map(device => {
      if (device.title_slug === slug) return { ...device, statut };
      return device;
    });
    this.setState({ devices });
  }

  render() {
    return (
      <View style={s.container}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          colors={['#9691FF', '#5D74F8']}
          style={s.containerGradient}
        >
          <Text style={s.title}>Maison</Text>
          <ScrollView style={s.actions} horizontal={true}>
            {this.state.actions.map(action => <Action {...action} /> )}
          </ScrollView>
        </LinearGradient>
        <ScrollView style={s.devicesC} contentContainerStyle={s.devices}>
          {this.state.devices.map(device =>
            <Device reload={this.reload.bind(this)} {...device} />
          )}
        </ScrollView>
        <View style={s.sensors}>
          {this.state.sensors.map(sensor => <Sensor {...sensor} />)}
        </View>
      </View>
    );
  }
}

const s = {
  container: {
    backgroundColor: '#252C4B',
    flex: 1,
  },
  sensors: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
  },
  containerGradient: {
    paddingTop: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 40,
    color: '#FFF',
    padding: 30,
  },
  devicesC: {
    top: -40,
    borderRadius: 30,
    flex: 1,
    backgroundColor: '#252C4B',
  },
  devices: {
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  actions: {
    elevation: 1,
    paddingHorizontal: 30,
  }
}
