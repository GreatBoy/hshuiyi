'use strict'

var React = require('react-native');
var {
  Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  ScrollView,
} = React;

import Navigator from '../common/navigator.js'; 
 


var _navigator ;
var _route;
var IndexView = React.createClass({

    getInitialState: function(){
        _navigator = this.props.navigator;
        _route = this.props.route;
        return {
            
        };
    },

    render: function(){
        return (
            <View style={{flex:1}}>
                <Navigator navigator={_navigator} route={_route}/>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    
});
module.exports = IndexView;