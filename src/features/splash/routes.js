import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Splash from './screen';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="splash" component={Splash} />
        </Scene>
      </Router>
    );
  }
}

export default App;
