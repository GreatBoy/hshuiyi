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
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage
} = React;


import Header from '../common/header.js'; 
import Ajax from '../../utils/ajax.js';
import Config from '../../config.js';


var _navigator ;
var _route;

var SendView = React.createClass({

    getInitialState: function(){
        _navigator = this.props.navigator;
        _route = this.props.route;
        return {
            mobile:'aa',
            password:'ddd'
        };
    },
    
    loginFunc: function(){
        
        Ajax.post( 
            Config.host+'/mobile/login/login', 
            {
                username: this.state.mobile,
                password: this.state.password
            }, function(data){
                if(data.status == 0){
                    AsyncStorage.setItem('mobile',data.data, function(){
                        _navigator.pop();
                    });
                }
                //console.warn(JSON.stringify(data));
            }
        );
            
//        Alert.alert(
//          '请求结果',
//          Config.host+'test啦啦啦',
//          [
//            {text: '取消', onPress: () => console.warn('Cancel Pressed'), style: 'cancel'},
//            {text: '确定', onPress: () => console.warn('OK Pressed')},
//          ]
//        )
        
    },
  
    render: function(){
        return (
            <View style={{flex:1}}>
                <Header navigator={_navigator} route={_route} title="登陆"/>
                <View style={{flex:1,backgroundColor:'#f7f8f8'}}>
                    <Text>发布会议</Text>
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

module.exports = SendView;