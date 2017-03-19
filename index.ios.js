import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import Login from './components/Login';
import AuthService from './services/AuthService';

export default class nativeiosapp extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }

  componentDidMount(){
     AuthService.getAuthStorage((err, authInfo) => {
      this.setState({checkingAuth: false, isLoggedIn: authInfo != null});
     });
  }

  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
                    style={styles.loader}
                    animating={this.state.loading}
                    size="large"/>
        </View>
      );
    }
    if(this.state.isLoggedIn){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}> wlecaahahhaome</Text>
        </View>
      );
    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativeiosapp', () => nativeiosapp);
