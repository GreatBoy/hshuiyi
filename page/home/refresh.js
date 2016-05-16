'use strict';

const React = require('react-native');
const {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    View,
    ToastAndroid,
    ListView,
    Platform,
    TouchableHighlight,
    Image
} = React;

import Config from '../../config.js';
import Ajax from '../../utils/ajax.js';


var _navigator;
var _route;
var _status;
var GiftedListView = require('react-native-gifted-listview');
var GiftedSpinner = require('react-native-gifted-spinner');
const RefreshControlExample = React.createClass({
    statics: {
        title: '<RefreshControl>',
        description: 'Adds pull-to-refresh support to a scrollview.'
    },

    getInitialState() {
        _navigator = this.props.navigator;
        _route = this.props.route;
        _status = this.props.status;
        
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return {
            isRefreshing: false,
            loaded: 0,
            total: 1,
            page: 0,
            rowData:[],
            dataSource: ds.cloneWithRows([]),
        };
        
    },
    componentDidMount(){

    },
    componentWillMount(){

    },

    render() {
        return (
//            <ScrollView
//                style={styles.scrollview}
//                    refs='listview'
//                    onScroll={this.onScroll}
//                    scrollEventThrottle={0}
//                    refreshControl={
//                        <RefreshControl
//                            refreshing={this.state.isRefreshing}
//                            onRefresh={this._onRefresh}
//                            tintColor="#2ab1ff"
//                            title="加载中..."
//                            colors={['#2ab1ff']}
//                            progressBackgroundColor="white"
//                        />
//                    }>
//                <ListView
//                    ref="listview"
//                  dataSource={this.state.dataSource} initialListSize={10}
//                  enableEmptySections={true}
//                  renderFooter={()=>this.renderFooter()}
//                  onEndReachedThreshold={10}
//                  onEndReached={this.loadMoreData}
//                  renderRow={(rowData,rowHasChanged) => <Text style={{height: 100}}>{rowData.conf_name +':'+ rowHasChanged}</Text>}
//                />
//            </ScrollView>

                <View style={styles.container}>
                    <GiftedListView
                        rowView={this._renderRowView}
                        
                        onFetch={this._onFetch}
                        
                        
                        initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

                        firstLoader={true} // display a loader for the first fetching
                        
                        pagination={true} // enable infinite scrolling using touch to load more
                        paginationFetchigView={this._renderPaginationFetchigView}
                        paginationAllLoadedView={this._renderPaginationAllLoadedView}
                        paginationWaitingView={this._renderPaginationWaitingView}

                        refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                        refreshableViewHeight={50} // correct height is mandatory
                        refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
                        refreshableFetchingView={this._renderRefreshableFetchingView}
                        refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
                        refreshableWaitingView={this._renderRefreshableWaitingView}

                        emptyView={this._renderEmptyView}
                        enableEmptySections={true}
                        //renderSeparator={this._renderSeparatorView}

                        withSections={true} // enable sections
                       // sectionHeaderView={this._renderSectionHeaderView}

                        refreshableTintColor={'#2ab1ff'}
                        refreshableColors={['#2ab1ff']}
                        
                        PullToRefreshViewAndroidProps={{
                            colors: ['#fff'],
                            progressBackgroundColor: '#2ab1ff',
                           
                        }}
                    />
                </View>
        );
    },
    
    
     /**
      * 获取数据的逻辑
      * @param {number} page Requested page to fetch
      * @param {function} callback Should pass the rows
      * @param {object} options Inform if first load
      */
    _onFetch(page = 1, callback, options) {
        var self = this;
        var url = Config.host+'/mobile/user/publish?page='+(this.state.page+1)+'&display=json&from=app&status='+_status;
        setTimeout(function(){
            Ajax.get(url,{}, function(data){
                // 没有登录,就跳转登录页面
                if(data.status == 10){
                    _navigator.push({title:'LoginView',id:'login'});
                    return;
                }
                var header = 'Header '+page;
                var rows = {};
                rows[header] = data.data;
                if (page === data.pages) {
                    callback(rows, {
                      allLoaded: true, // the end of the list is reached
                    });        
                } else {
                    callback(rows);
                }
            });
        },500);
        
    },


     /**
      * 单行数据被点击的回调
      * @param {object} rowData Row data
      */
    _onPress(rowData) {
       //console.log(rowData+' pressed');
       _navigator.push({
           title: rowData.conf_name,
           id:'template',
           url: Config.host+'/mobile/conf/index/info/' + rowData.id
       });
    },

    /**
      * 渲染单行数据
      * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        var images = Config.host;
        if( rowData.banner_mobile && rowData.banner_mobile.url ){
            images += rowData.banner_mobile.url;
        } else {
            images += rowData.banner_pc.url;
        }
        return (
            <View style={[{flex:1},customStyles.rowView,styles.rowlist]}>
                <TouchableHighlight 
                  underlayColor='#c8c7cc'
                  onPress={() => this._onPress(rowData)}
                >  
                    <View style={{flex:1,flexDirection:'row',paddingBottom: 10,borderColor:'#e5e5e5',borderBottomWidth: 1,borderStyle:'dashed'}}>
                        <Image style={styles.listImage} source={{uri:images}}/>
                        <View style={{flex:1,marginLeft: 15}}>
                            <View style={styles.listtxt}>
                                <Text style={styles.conf_name}>{rowData.conf_name}</Text>
                            </View>
                            <View style={styles.listtxt}>
                                <Image style={styles.listimage} source={require('../../images/publish/timer_icon.png')}/><Text style={styles.conf_time}>{rowData.start_time}</Text>
                            </View>
                            <View style={styles.listtxt}>
                                <Image style={styles.listimage} source={require('../../images/publish/map_icon.png')}/><Text style={styles.site_name}>{rowData.site_name}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={[{flex:1},styles.bottom]}>
                    <TouchableHighlight 
                        style={styles.bottombtn} 
                        underlayColor='#c8c7cc'
                        onPress={() => this._onPress(rowData)}
                    >
                        <Text style={styles.bottomtxt}>管理</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.bottombtn} 
                        underlayColor='#c8c7cc'
                        onPress={() => this._onPress(rowData)}
                    >
                        <Text style={styles.bottomtxt}>删除</Text>
                    </TouchableHighlight>

                </View>
            </View>
        );
    },

     /**
      * 渲染一个头部的行
      * @param {object} rowData Row data
      */
    _renderSectionHeaderView(sectionData, sectionID) {
        return (
            <View style={customStyles.header}>
                <Text style={customStyles.headerTitle}>
                    {sectionID}
                </Text>
            </View>
        );
    },

     /**
      * Render 渲染刷新
      * Android, andriod可以被触摸刷新
      * @param {function} 
      */
     _renderRefreshableWaitingView(refreshCallback) {
       if (Platform.OS !== 'android') {
         return (
           <View style={customStyles.refreshableView}>
                <Text style={customStyles.actionsLabel}>
                  ↓
                </Text>
           </View>
         );
       } else {
         return (
            <TouchableHighlight 
              underlayColor='#c8c7cc'
              onPress={refreshCallback}
              style={customStyles.refreshableView}
            >
                 <Text style={customStyles.actionsLabel}>
                   ↻
                 </Text>
            </TouchableHighlight>
         );
       }
     },

     /**
      *  刷新时候的ios动作图
      * @platform ios
      */
    _renderRefreshableWillRefreshView() {
        return (
            <View style={customStyles.refreshableView}>
              <Text style={customStyles.actionsLabel}>
                ↻
              </Text>
            </View>
        );
    },

     /**
      * 刷新渲染的loadding图
      */
     _renderRefreshableFetchingView() {
        return (
            <View style={customStyles.refreshableView}>
              <GiftedSpinner />
            </View>
        );
     },

     /**
      * Render 点击加载更多
      * @param {function} paginateCallback 函数为加载更多的回调
      */
     _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableHighlight 
              underlayColor='#c8c7cc'
              onPress={paginateCallback}
              style={customStyles.paginationView}
            >
                <Text style={[customStyles.actionsLabelMore, {fontSize: 13}]}>
                    点击加载更多
                </Text>
            </TouchableHighlight>
        );
     },


     /**
      * Fetch加载的时候的loadding  
      */
     _renderPaginationFetchigView() {
       return (
            <View style={customStyles.paginationView}>
                <GiftedSpinner />
            </View>
       );
     },

     /**
      * 加载完毕的时候
      */
     _renderPaginationAllLoadedView() {
        return (
            <View style={customStyles.paginationView}>
                <Text style={customStyles.actionsLabel}>
                    已加载完成
                </Text>
            </View>
        );
     },

     /**
      * 第一次获取没有数据的时候
      * @param {function} refreshCallback 刷新的回调
      */
    _renderEmptyView(refreshCallback) {
        return (
            <View style={customStyles.defaultView}>
                <Text style={customStyles.defaultViewTitle}>
                    抱歉, 没有数据哦
                </Text>
                <TouchableHighlight 
                  underlayColor='#c8c7cc'
                  onPress={refreshCallback}
                >
                    <Text>
                      ↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
     },

    /**
     * 分割线
     */ 
    _renderSeparatorView() {
        return (
          <View style={customStyles.separator} />
        );
     },
    
    
    
    
    
    
    refreshData() {
        this.setState({isRefreshing: true});
        var self = this;
        var url = Config.host+'/mobile/user/publish?page='+(this.state.page+1)+'&display=json&from=app';
        Ajax.get(url,{}, function(data){
            // 没有登录,就跳转登录页面
            if(data.status == 10){
                _navigator.push({title:'LoginView',id:'login'});
            }
            
            self.state.total = data.pages;
            self.state.page = data.page;
            
            //console.warn(JSON.stringify(data));
            
            // prepend 10 items
            const rowData = data.data.map((val, i) => ({
                text: 'Loaded row' + (+self.state.loaded + i),
                clicks: 0,
            }))
            .concat(self.state.rowData);
            
            self.setState({
                loaded: self.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        });
    },
    
    _onRefresh() {
        if(this.state.page < this.state.total){
            // 获取数据
            this.refreshData();
        } else {
            ToastAndroid.show('数据加载完毕', ToastAndroid.SHORT);
        }
    },
});


var customStyles = {
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    refreshableView: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsLabel: {
        fontSize: 13,
        color: '#CCC',
    },
    actionsLabelMore: {
       fontSize: 13,
       color: 'black', 
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    rowView: {
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'#e5e5e5',
    },
    header: {
        backgroundColor: '#50a4ff',
        padding: 10,
    },
    headerTitle: {
        color: '#fff',
    },
};


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f2f2f3',
    },
    row: {
        padding: 10,
    },
    listImage: {
        width: 110,
        height: 66
    },
    rowlist: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 10,
    },
    conf_name: {
        fontSize: 14,
        color: '#2f2725',
        marginTop: 3,
        justifyContent:'center'
    },
    conf_time: {
        fontSize: 12,
        color: '#4c4948',
        marginTop: 5,
        justifyContent:'center'
    },
    site_name: {
        fontSize: 12,
        color: '#4c4948',
        justifyContent:'center'
    },
    listtxt:{
        flexDirection:'row'
    },
    listimage:{
        width: 12,
        height: 12,
        alignSelf:'center',
        marginTop: 3,
        marginRight: 5
    },
    bottom:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    bottombtn:{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        borderStyle:'solid',
        borderWidth: 1,
        borderColor:'#ccc',
        marginLeft: 10,
        borderRadius:3,
    },
    bottomtxt:{
        fontSize: 13,
    }
    
};
module.exports = RefreshControlExample;