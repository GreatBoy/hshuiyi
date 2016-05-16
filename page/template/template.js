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
  AsyncStorage,
  WebView
} = React;


import Header from '../common/header.js'; 
import Ajax from '../../utils/ajax.js';
import Config from '../../config.js';


var _navigator ;
var _route;

var TemplateView = React.createClass({

    getInitialState: function(){
        _navigator = this.props.navigator;
        _route = this.props.route;
        return {
            title: _route.title,
            url: _route.url,
            status: '没有数据~',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: false,
        };
    },
    
    loginFunc: function(){
        
//        Alert.alert(
//          '请求结果',
//          Config.host+'test啦啦啦',
//          [
//            {text: '取消', onPress: () => console.warn('Cancel Pressed'), style: 'cancel'},
//            {text: '确定', onPress: () => console.warn('OK Pressed')},
//          ]
//        )
        
    },
    onNavigationStateChange: function(navState) {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: false
        });
    },
    onShouldStartLoadWithRequest: function(event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    },
    render: function(){
        return (
            <View style={{flex:1}}>
                <Header navigator={_navigator} route={_route} title={this.state.title}/>
                <View style={{flex:1,backgroundColor:'#f7f8f8'}}>
                    <WebView
                        ref={'webview'}
                        automaticallyAdjustContentInsets={true}
                        style={styles.webView}
                        source={{uri: this.state.url}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        //onNavigationStateChange={this.onNavigationStateChange}
                        //onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                        startInLoadingState={true}
                        scalesPageToFit={this.state.scalesPageToFit}
                      />
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
    },
    webView: {
        backgroundColor: 'white',
        height: 350,
        flex:1
    },
});

module.exports = TemplateView;