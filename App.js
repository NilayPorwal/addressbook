import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { RootStack } from './assets/Navigation'



type Props = {};
export default class App extends Component<Props> {
    render() {
    console.disableYellowBox = true;
    return(
	       <RootStack />  
     );
  }
}

const styles = StyleSheet.create({
  
});
   