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
  TextInput,
  TouchableOpacity,
  
} = React;


import Header from '../common/header.js'; 


var _navigator ;
var _route;

var RegView = React.createClass({

    getInitialState: function(){
        _navigator = this.props.navigator;
        _route = this.props.route;
        return {

        };
    },
  
    render: function(){
        return (
            <View style={{flex:1}}>
                <Header navigator={_navigator} route={_route} title="注册"/>
                <View style={{flex:1,backgroundColor:'#f7f8f8'}}>
                    <View style={styles.wrapper}>
                        <View>
                            <TextInput
                            keyboardType='default'
                            placeholder='手机'
                            style={styles.inputText}/>
                        </View>
                
                        <View style={styles.searchBox}>
                            <TextInput
                            keyboardType='default'
                            placeholder='密码'
                            style={styles.inputText}/>
                        </View>
                    </View>
                    <TouchableOpacity  onPress={() => _navigator.pop()}>
                        <View style={styles.button}>
                            <Text style={{color: 'white'}}>登陆</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    wrapper:{
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        marginTop: 20,
        width: 320
    },
    button: {
        width: 320,
        height: 40,
        backgroundColor:'#ff9900',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 3,
        marginTop: 20
    },
    searchBox: {
        marginTop: 10 
    }
});

module.exports = RegView;