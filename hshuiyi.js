/**
 * Created by yuanguozheng on 16/1/19.
 */
'use strict';

import React, {
    Component,
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Navigator,
    ScrollView,
    BackAndroid,
    Platform
} from 'react-native';

var _navigator;

var IndexView = require('./page/home/index.js');
var LoginView = require('./page/login/login.js');
var RegView = require('./page/login/reg.js');
var InfoView = require('./page/user/changeinfo.js');
var PasswordView = require('./page/user/changepassword.js');
var TemplateView = require('./page/template/template.js');



var SearchView = require('./page/search/search.js');
//var SendView = require('./page/send/send.js');

//var ShopView = require('./page/test/shop.android.js');
//var ViewPager = require('./page/test/viewpager.android.js');
//var UserInfoView = require('./page/test/userinfo.js');
//var NewsView = require('./page/test/news.js');


BackAndroid.addEventListener('hardwareBackPress', function() {
    console.warn('test');
    if(_navigator == null){
      return false;
    }
    if(_navigator.getCurrentRoutes().length === 1){
      return false;
    }
    _navigator.pop();
    return true;
});


export default class MainScreen extends Component {

    constructor(props) {
        super(props);
    }
    
    configureScenceAndroid(){
        if(Platform.OS == 'ios'){
            return Navigator.SceneConfigs.HorizontalSwipeJump;
        } else {
            return Navigator.SceneConfigs.PushFromRight;
        }
    }
    
    renderSceneAndroid(route, navigator){
        _navigator = navigator;
        if(route.id === 'main'){
            return (
                <View style={{flex: 1,backgroundColor: '#f7f8f8'}}>
                    <View>
                        <Image style={styles.logo} source={require('./images/common/logo1.png')} />
                    </View>
                    <View style={styles.searchBox}>
                        <TextInput
                        keyboardType='web-search'
                        placeholder='请输入关键字搜索会议'
                        style={styles.inputText}/>
                        <Image source={require('./images/header/icon_search.png')} style={styles.searchIcon}/>
                    </View>
                    <View style={{flex:1,width:330,alignSelf:'center',marginTop:30}}>
                        <ScrollView>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={ () => _navigator.push({title:'我的发布',id:'publish'}) }  style={[ styles.button,{backgroundColor:'#f0c518'}]}>
                                    <Text style={{color: '#ffffff'}}>管理会议</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _navigator.push({title:'搜索会议',id:'search'})} style={[ styles.button,{backgroundColor:'#e7505a'}]}>
                                    <Text style={{color: '#ffffff'}}>搜索会议</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _navigator.push({title:'查看门票',id:'order'})} style={[ styles.button,{backgroundColor:'#32c5d2'}]}>
                                    <Text style={{color: '#ffffff'}}>查看门票</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => _navigator.push({title:'个人中心',id:'user'})} style={[ styles.button,{backgroundColor:'#10c878'}]}>
                                    <Text style={{color: '#ffffff'}}>个人中心</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _navigator.push({title:'我的订单',id:'order'})} style={[ styles.button,{backgroundColor:'#3598dc'}]}>
                                    <Text style={{color: '#ffffff'}}>订单管理</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _navigator.push({title:'发布会议',id:'send'})} style={[ styles.button,{backgroundColor:'#8e44ad'}]}>
                                    <Text style={{color: '#ffffff'}}>发布会议</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.bottom}>
                        <Image style={styles.bottomImage} source={require('./images/common/bottom.png')} />
                    </View>
                </View>
            );
        }
        
        
        if(route.id === 'publish' || route.id === 'user' || route.id === 'order' || route.id === 'send'){
            return (
                <IndexView navigator={navigator} route={route} />
            );
        }
        
        
        if(route.id === 'search'){
            return (
              <SearchView navigator={navigator} route={route}/>
            );
        }
      
        if(route.id === 'login'){
            return (
                <LoginView navigator={navigator} route={route}/>
            );
        }
        if(route.id === 'reg'){
            return (
                <RegView navigator={navigator} route={route}/>
            );
        }
        if(route.id === 'changeinfo'){
            return (
                <InfoView navigator={navigator} route={route}/>
            );
        }
        if(route.id === 'changepassword'){
            return (
                <PasswordView navigator={navigator} route={route}/>
            );
        }
        
        if(route.id === 'template'){
            return (
                <TemplateView navigator={navigator} route={route}/>
            );
        }
        
    }

    render() {
        var renderScene = this.renderSceneAndroid;
        return (
            <Navigator
                debugOverlay={false}
                initialRoute={{title: 'Main', id:'main'}}
                configureScene={this.configureScenceAndroid}
                renderScene={renderScene}
              />
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: 52,
        width: 150,
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40
    },
    bottom: {
        alignSelf: 'center',
        height: 100
    },
    bottomImage:{
        resizeMode: 'contain',
        flex:1
    },
    
    searchBox:{
        height: 40,
        flexDirection: 'row',
        borderRadius: 2,  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        width: 320,
        marginTop: 30,
        alignSelf:'center',
        borderColor:'#c6c7c7',
        borderStyle:'solid',
        borderWidth:1
    },
    searchIcon: {
        marginLeft: 6,
        marginRight: 6,
        width: 16.7,
        height: 16.7,
        resizeMode: 'stretch'
    },
    inputText: {
        flex: 1,
        fontSize: 14,
        backgroundColor: 'transparent',
    },
    button:{
        height:100,
        margin:5,
        backgroundColor:'#cad6c5',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width: 100,
        borderRadius: 2 
    },
});