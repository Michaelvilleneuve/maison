import { Scene, Router } from 'react-native-router-flux';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home}/>
        </Scene>
      </Router>
    )
  }
}
