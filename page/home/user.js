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
    RefreshControl,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Ajax from '../../utils/ajax.js';
import Config from '../../config.js';

var _navigator;
var _route;
var _nav;
export default class UserPage extends Component {
    constructor(props) {
        super(props);
        _navigator = props.navigator;
        _route = props.route;
        this.state = {
            mobile: '',
            qrcode: ''
        };
        
        var self = this;
        AsyncStorage.getItem('mobile', function(error, data){
            if(error){
                console.warn(JSON.stringify(error));
                return;
            }
            if(!data){
                _navigator.push({title:'LoginView',id:'login'});
                return;
            }
            var mobile = data.split(',');
            self.setState({
                mobile: mobile[0],
                qrcode: mobile[1]
            });
        });
    }
    

    logout(){
        Ajax.post(Config.host+'/mobile/login/logout?from=app',{}, function(data){
            AsyncStorage.removeItem('mobile', function(){
                _navigator.pop();
            });
        });
    }
    

    render() {
        
        return (
            <View style={[{flex:1,backgroundColor:'white'}]}>
                <View style={styles.bg}>
                    <Image style={styles.img} source={{uri: 'http://www.huiyi.com/qrcode/getCode/qrcode/2323'}}/>
                    <Image style={styles.imagebg} source={require('../../images/common/qrcode.png')} />
                    <Text style={styles.mobile}>{this.state.mobile}</Text>
                </View>
                <View style={styles.list}>
                    <TouchableOpacity style={styles.tabBarOptionWrapper}
                        onPress={() => _navigator.replace({title:'我的发布',id:'publish'})}
                        underlayColor='gray'>
                        <Image style={styles.listimage} source={require('../../images/user/publish.png')}/>
                        <View style={{flex:1}}>
                            <Text style={{color:'#202426'}}>我的会议</Text>
                        </View>
                        <Image style={styles.rightimage} source={require('../../images/user/arrow_right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarOptionWrapper}
                        onPress={() => _navigator.replace({title:'我的订单',id:'order'})}
                        underlayColor='gray'>
                        <Image style={styles.listimage} source={require('../../images/user/order.png')}/>
                        <View style={{flex:1}}>
                            <Text style={{color:'#202426'}}>我的订单</Text>
                        </View>
                        <Image style={styles.rightimage} source={require('../../images/user/arrow_right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarOptionWrapper}
                        onPress={() => _navigator.push({title:'修改账户信息',id:'changeinfo'})}
                        underlayColor='gray'>
                        <Image style={styles.listimage} source={require('../../images/user/my.png')}/>
                        <View style={{flex:1}}>
                            <Text style={{color:'#202426'}}>修改账户信息</Text>
                        </View>
                        <Image style={styles.rightimage} source={require('../../images/user/arrow_right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarOptionWrapper}
                        onPress={() => _navigator.push({title:'修改密码',id:'changepassword'})}
                        underlayColor='gray'>
                        <Image style={styles.listimage} source={require('../../images/user/password.png')}/>
                        <View style={{flex:1}}>
                            <Text style={{color:'#202426'}}>修改密码</Text>
                        </View>
                        <Image style={styles.rightimage} source={require('../../images/user/arrow_right.png')}/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.bottom}>
                    <TouchableOpacity
                        onPress={() => this.logout()}
                    >
                            <Text style={{color:'#202426',alignSelf:'center'}}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg:{
        marginTop: 30,
        width: 140,
        height: 170,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent'
    },
    imagebg: {
        width: 138,
        height: 170,
        position: 'absolute',
        top: 0,
        left: 0
    },
    img:{
        width: 120,
        height: 120,
        marginTop: 10,
        marginBottom: 10
    },
    mobile: {
        color: 'white',
        height: 40,
        alignSelf:'center',
        justifyContent:'center',
        marginTop: 3
    },
    list:{
        flex: 1,
        marginTop: 30
    },
    tabBarOptionWrapper:{
        flexDirection:'row',
        height: 45,
        alignItems:'center',
        marginRight: 15,
        marginLeft: 15,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle:'solid'
    },
    listimage:{
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginRight: 5,
        resizeMode:'contain'
    },
    rightimage:{
        width: 14,
        height: 14,
        alignSelf: 'center',
        resizeMode:'contain'
    },
    bottom:{
        height: 40,
        marginTop: 20
    }
});