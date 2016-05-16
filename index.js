/**
 * Sample React Native App
 * https://github.com/hanks-zyh
 */

'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Navigator,
  Image
} =  React;

var _navigator;
var HttpView = require('./util/http.js');
var ShopView = require('./shop.android.js');
var ViewPager = require('./viewpager.android.js');
var UserInfoView = require('./userinfo.js');
var NewsView = require('./news.js');


import TabNavigator from 'react-native-tab-navigator';



var Hshuiyi = React.createClass({

  getInitialState: function(){
    return {};
  },

  configureScenceAndroid: function(){
    return Navigator.SceneConfigs.FadeAndroid;
  },


  renderSceneAndroid: function(route, navigator){
    _navigator = navigator;
    if(route.id === 'main'){
      return (
        <View>
          <TouchableOpacity onPress={ () => _navigator.push({title:'Http',id:'http'}) }  style={ styles.button }>
            <Text>NetWork</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _navigator.push({title:'Shop',id:'shop'})} style={ styles.button }>
            <Text>SHOP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _navigator.push({title:'ViewPager',id:'viewpager'})} style={ styles.button }>
            <Text>ViewPager</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _navigator.push({title:'UserInfoView',id:'userinfo'})} style={ styles.button }>
            <Text>Userinfo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _navigator.push({title:'NewsView',id:'news'})} style={ styles.button }>
            <Text>News</Text>
          </TouchableOpacity>


          <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="首页"
              renderIcon={() => <Image style={styles.tabIcon} source={require('./img/list4.png')} ></Image>}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'home' })}>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="我的发布"
              renderIcon={() => <Image style={styles.tabIcon}  source={require('./img/search.png')} ></Image>}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="发布"
              renderIcon={() => <Image style={styles.tabIcon}  source={require('./img/search.png')} ></Image>}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="订单"
              renderIcon={() => <Image style={styles.tabIcon}  source={require('./img/search.png')} ></Image>}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="我的"
              renderIcon={() => <Image style={styles.tabIcon}  source={require('./img/search.png')} ></Image>}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
            </TabNavigator.Item>
        </TabNavigator>
        </View>
       );
    }

    if(route.id === 'http'){
      return (
        <HttpView navigator={navigator} route={route} />
       );
    }

    if(route.id === 'shop'){
      return (
        <ShopView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'viewpager'){
      return (
        <ViewPager navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'userinfo'){
      return (
        <UserInfoView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'news'){
      return (
        <NewsView navigator={navigator} route={route}/>
      );
    }


  },
  render: function(){
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{ title: 'Main', id:'main'}}
        configureScence={{ configureScence }}
        renderScene={renderScene}
      />
    );
  }
});

var styles = StyleSheet.create({
  button:{
    height:56,
    margin:10,
    backgroundColor:'#cad6c5',
    justifyContent:'center',
    alignItems:'center',
  },
  tab: {  
        height: 52,  
        backgroundColor: '#333333',  
        alignItems: 'center'  
  },
  tabIcon: {  
    width: 30,  
    height: 35,  
    resizeMode: 'stretch',  
    marginTop: 10  
  }    
});

module.exports = Hshuiyi