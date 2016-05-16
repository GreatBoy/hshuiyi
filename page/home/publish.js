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
    ScrollView,
    RefreshControl
} from 'react-native';


var Refresh = require('./refresh.js');
class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: 'now'}
    }

    render(){
        var status = this.props.status;
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <Refresh status={status} navigator={_navigator} route={_route}/>
            </View>
        )
    }
}




import SlidableTabBar from '../../utils/tab.js';
var _navigator;
var _route;
export default class PublishPage extends Component {

    constructor(props) {
        _navigator = props.navigator;
        _route = props.route;
        super(props);
        this.state = {selectedTab: 'now'}
    }

    render() {
        return (
            <SlidableTabBar scroll={true}>
                <Publish status="2" title="正在进行" color="#2ab1ff"/>
                <Publish status="0" title="未发布" color="#2ab1ff"/>
                <Publish status="4" title="已结束" color="#2ab1ff"/>
            </SlidableTabBar>
        );
    }
}

const styles = StyleSheet.create({
    
});