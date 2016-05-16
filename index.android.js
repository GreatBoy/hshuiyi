/**
 * Sample React Native App
 * https://github.com/hanks-zyh
 */

 'use strict';

//var React = require('react-native');
//var {
//  AppRegistry,
//} =  React;

//var hshuiyi = require('./hshuiyi.js');

//AppRegistry.registerComponent('hshuiyi', () => hshuiyi);



import React, {
	AppRegistry,
	Component,
} from 'react-native';
import MainScreen from './hshuiyi';

class Hshuiyi extends Component {
	render() {
		return (<MainScreen/>);
	}
}

AppRegistry.registerComponent('hshuiyi', () => Hshuiyi);