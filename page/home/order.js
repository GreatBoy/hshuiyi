/**
 * Created by yuanguozheng on 16/1/19.
 */
'use strict';

import React, {
    Component,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var _navigator;
var _route;
export default class OrderPage extends Component {

    constructor(props) {
        _navigator = props.navigator;
        _route = props.route;
        super(props);
        this.state = {selectedTab: HOME}
    }

    _renderTabItem( tag, childView, titles) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <View style={styles.tabwrapper}><Text style={styles.tabText}>{titles}</Text></View>}
                renderSelectedIcon={() => <View style={styles.tabwrapper}><Text style={styles.tabText}>{titles}</Text></View>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    static _createChildView(tag) {
        
        if(tag == 'publish'){
            return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>ddddddd</Text>
            </View>
            )
        } else {
            return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>
            </View>)
        } 
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(EDIT, OrderPage._createChildView(EDIT),'发布')}
                    {this._renderTabItem(ORDER, OrderPage._createChildView(ORDER),'订单')}
                    {this._renderTabItem(USER, OrderPage._createChildView(USER),'我的')}
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