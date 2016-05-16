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
    Platform,
    BackAndroid,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

var _navigator;
var _route;
var _title;
export default class Header extends Component {

    constructor(props) {
        _navigator = props.navigator;
        _route = props.route;
        console.warn(props.title);
        _title = props.title;
        super(props);
    }

    renderRight(right){
        if(right == 'reg'){
            return (
                <TouchableHighlight  onPress={() => _navigator.push({title:'RegView',id:'reg'})} style={styles.reg}>
                    <Text style={{color:'#2f2725',fontSize: 14}}>注册</Text>
                </TouchableHighlight>  
            );
        }
    }

    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity  onPress={() => _navigator.pop()} style={{flexDirection:'row',width: 80}}>
                    <Image style={styles.logo} source={require('../../images/common/back.png')} />
                </TouchableOpacity>
                <View style={{flex:1,alignItems:'center',marginRight:40}}>
                    <Text style={styles.titleWrapper}>{_title}</Text>
                </View>
                <View style={{width: 40}}>
                    {this.renderRight(this.props.right)}
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏  
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏,
        alignItems:'center',
        backgroundColor: 'white',
        flexDirection:'row',
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
        borderStyle: 'solid'
    },
    logo: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        resizeMode:'contain',
        marginLeft:10
    },
    back: {
        width: 30,
        alignSelf: 'center',
    },
    title:{
        alignSelf:'center',
        backgroundColor: 'black',
        fontSize:17,
        width:100,
    },
    titleWrapper:{
        color:'#2f2725',
        fontSize:17,
    },
    wrapper:{
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: 5,  // 设置圆角边
        backgroundColor: 'white',
        alignSelf: 'center',
        marginLeft: 0,
        marginRight: 0,
        fontSize:14,
        width:100,
        color:'#2f2725'
    },
    reg: {
        width: 40,
        alignSelf: 'center',
        justifyContent:'center',
        marginRight:8
    }
});