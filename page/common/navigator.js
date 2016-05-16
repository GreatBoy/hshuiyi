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
    Alert
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Header from './header.js'; 
import PUBLISHPAGE from '../home/publish.js';
import USERPAGE from '../home/user.js';


const TITLE = {
    'home':  '首页',
    'publish': '我的发布',
    'send': '发布',
    'order': '订单',
    'user': '个人中心',
};

const HOME = 'home';
const HOME_NORMAL = require('../../images/common/index_icon_1.png');
const HOME_FOCUS = require('../../images/common/index_select_1.png');

const PUBLISH = 'publish';
const PUBLISH_NORMAL = require('../../images/common/publish_icon_1.png');
const PUBLISH_FOCUS = require('../../images/common/publish_select_1.png');

const EDIT = 'send';
const EDIT_NORMAL = require('../../images/common/edit_icon_1.png');
const EDIT_FOCUS = require('../../images/common/edit_select_1.png');

const ORDER = 'order';
const ORDER_NORMAL = require('../../images/common/order_icon_1.png');
const ORDER_FOCUS = require('../../images/common/order_select_1.png');

const USER = 'user';
const USER_NORMAL = require('../../images/common/user_icon_1.png');
const USER_FOCUS = require('../../images/common/user_select_1.png');

var _navigator;
var _route;
export default class Navigator extends Component {

    constructor(props) {
        _navigator = props.navigator;
        _route = props.route;
        super(props);
        this.state = {selectedTab: _route.id}
    }

    _renderTabItem(img, selectedImg, tag, childView, titles) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={img}/><Text style={styles.tabText}>{titles}</Text></View>}
                renderSelectedIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={selectedImg}/><Text style={styles.tabText}>{titles}</Text></View>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    static _createChildView(tag) {
        if(tag == PUBLISH){
            return (
                <View style={{flex:1}}>
                    <Header navigator={_navigator} route={_route} title={TITLE[tag]}/>
                    <PUBLISHPAGE navigator={_navigator} route={_route}/>
                </View>
            )
        } else if(tag == USER) {
            return (
                <View style={{flex:1}}>
                    <Header navigator={_navigator} route={_route} title={TITLE[tag]}/>
                    <USERPAGE navigator={_navigator} nav={this} route={_route}/>
                </View>
            );
        } else {
            
            return (
                <View style={{flex:1}}>
                    <Header navigator={_navigator} route={_route} title={TITLE[tag]}/>
                    <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:22}}>{tag}</Text>
                    </View>
                </View>
            )
        }
        
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === HOME}
                        renderIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={HOME_NORMAL}/><Text style={styles.tabText}>首页</Text></View>}
                        renderSelectedIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={HOME_FOCUS}/><Text style={styles.tabText}>首页</Text></View>}
                        onPress={() => _navigator.pop()}>
                        {Navigator._createChildView(HOME)}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === PUBLISH}
                        renderIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={PUBLISH_NORMAL}/><Text style={styles.tabText}>我的发布</Text></View>}
                        renderSelectedIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={PUBLISH_FOCUS}/><Text style={styles.tabText}>我的发布</Text></View>}
                        onPress={() => this.setState({ selectedTab: PUBLISH })}>
                        {Navigator._createChildView(PUBLISH)}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === EDIT}
                        renderIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={EDIT_NORMAL}/><Text style={styles.tabText}>发布</Text></View>}
                        renderSelectedIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={EDIT_FOCUS}/><Text style={styles.tabText}>发布</Text></View>}
                        onPress={() => this.setState({ selectedTab: EDIT })}>
                        {Navigator._createChildView(EDIT)}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === ORDER}
                        renderIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={ORDER_NORMAL}/><Text style={styles.tabText}>订单</Text></View>}
                        renderSelectedIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={ORDER_FOCUS}/><Text style={styles.tabText}>订单</Text></View>}
                        onPress={() => this.setState({ selectedTab: ORDER })}>
                        {Navigator._createChildView(ORDER)}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === USER}
                        renderIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={USER_NORMAL}/><Text style={styles.tabText}>我的</Text></View>}
                        renderSelectedIcon={() => <View style={styles.tabwrapper}><Image style={styles.tabIcon} source={USER_FOCUS}/><Text style={styles.tabText}>我的</Text></View>}
                        onPress={() => this.setState({ selectedTab: USER })}>
                        {Navigator._createChildView(USER)}
                    </TabNavigator.Item>
                </TabNavigator>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: 52,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    tabwrapper:{
        marginTop: 10,
        alignItems: 'center'
    },
    tabIcon: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    tabText:{
        width: 60,
        textAlign: 'center'
    }
});