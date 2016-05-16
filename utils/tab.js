var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableHighlight,
    TouchableOpacity,
	Animated,
} = React;

var deviceWidth = require('Dimensions').get('window').width;

var SlidableTabBar = React.createClass({
	getInitialState: function(){
		return {
			selectedTopic: 0,
		};
	},
	selectTopic: function(index){
		this.setState({selectedTopic: index});
	},
	renderCenterView: function(thisView, index){
		if(this.state.selectedTopic === index){
			return (
				thisView
			);
		}
	},
	renderTabBarOption: function(title, color, index, width){
        if(width > 0){
            return(
                <TouchableOpacity key={index} style={styles.tabBarOptionWrapper}
                    onPress={() => this.selectTopic(index)}
                    underlayColor='black'>
                    <View style={[styles.tabBarOption, {width:width,backgroundColor: '#ffffff', borderColor: (this.state.selectedTopic === index) ? color : '#e5e5e5'}]}>
                        <Text style={{letterSpacing: 3, color: (this.state.selectedTopic === index)? '#2ab1ff': '#202426', fontWeight: '300',textAlign:'center'}}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return(
                <TouchableOpacity key={index} style={styles.tabBarOptionWrapper}
                    onPress={() => this.selectTopic(index)}
                    underlayColor='black'>
                    <View style={[styles.tabBarOption, {backgroundColor:'#ffffff', borderColor: (this.state.selectedTopic === index) ? color : '#e5e5e5'}]}>
                        <Text style={{letterSpacing: 3, color: (this.state.selectedTopic === index)? '#2ab1ff': '#202426', fontWeight: '300',textAlign:'center'}}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
		
	},
	render: function() {
        var width = 0;
        if(this.props.children.length <= 4){
            var length = this.props.children.length;
            width =  deviceWidth/length;
        }
        
		return(
			<View style={{flex:1}}>
				
				<View style={{flexDirection:'row'}}>
					<ScrollView
						automaticallyAdjustContentInsets={false}
						horizontal={true}
						bounces={false}
						showsHorizontalScrollIndicator={false} 
						style={styles.tabBar}>
						{this.props.children.map((child, i) => this.renderTabBarOption(child.props.title, child.props.color, i, width))}
					</ScrollView>
				</View>

				<View style={{flex:1}}>
					{this.props.children.map((child, i) => this.renderCenterView(child, i))}
				</View>

			</View>
		);
	},
});

var styles = StyleSheet.create({
    tabBarOptionWrapper: {
        flex:1,
    },
	tabBarOption: {
		justifyContent: 'center',
		paddingLeft:23,
		paddingRight:23,
		paddingBottom:14,
		paddingTop:12,
        borderBottomWidth:1
	},
	tabBar: {
		position: 'relative',
        flexDirection:'row',
	},
});

module.exports = SlidableTabBar