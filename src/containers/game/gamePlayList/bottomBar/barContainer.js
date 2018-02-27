import React, { PropTypes, Component } from 'react';
import { Easing , Animated , FlatList , View , Text , StatusBar , StyleSheet , Dimensions ,TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemButton from './itemButton';
import Telebot from '../../../../components/telebuddies/telebot';

class BarContainer extends Component {
	constructor(props){
		super(props);
		this._floating = new Animated.ValueXY({
			x : 0,
			y : 0
		});
	}
	componentDidMount(){
		this._floatingAnimation();
	}
	shouldComponentUpdate(nextProps){
		const { version } = this.props;
		return version !== nextProps.version;
	}
	_floatingAnimation(){
		Animated.loop(
			Animated.sequence([
				Animated.timing(this._floating, {
					duration : 1000,
					toValue : { 
						x : 0, 
						y : -5
					},
					easing : Easing.linear
				}),
				Animated.timing(this._floating, {
					duration : 1000,
					toValue : { 
						x : 0, 
						y : 0
					},
					easing : Easing.linear
				})
			])
		).start();
	}
	_renderTabItems(){
		const { navigator , version } = this.props;
		let renderMenu;
		if(version.release !== true){
			renderMenu = [
				{ icon : 'rocket' , name : 'delivery' , navigate : 'app.Delivery' },
				{ icon : 'question-circle' , name : 'support' , navigate : 'app.Support' }
			]
		} else {
			renderMenu = [
				{ icon : 'rocket' , name : 'delivery' , navigate : 'app.Delivery' },
				{ icon : 'question-circle' , name : 'support' , navigate : 'app.Support' },
				{ icon : 'money' , name : 'wallet' , navigate : 'app.TopUp' },
				{ icon : 'gift' , name : 'reward' , navigate : 'app.Reward' }
			]
		};
		return (
			<FlatList
				style={{ paddingHorizontal : 10  }}
				horizontal={true}
				data={renderMenu}
				renderItem={({item})=>
					<ItemButton 
						{...item}
						navigator={navigator}
					/>}
				keyExtractor={(item, index) => index}
			/>
		)
	}
	render(){
		const { navigator } = this.props;
		const screenWidth = Dimensions.get('window').width * 0.25;
		return (
			<View style={styles.container}>
				{this._renderTabItems()}
				<Animated.View style={this._floating.getLayout()}>
					<TouchableOpacity
						onPress={()=>{
							navigator.push({
								screen : 'app.Setting',
								navigatorStyle : {
									navBarHidden : true
								}
							});
						}}
					>
						<Telebot
							status={'setting'}
							style={{ margin : 5 }}
							height={screenWidth}
							width={screenWidth}
						/>
					</TouchableOpacity>
				</Animated.View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		version : state.mis.version
	}
}

export default connect(mapStateToProps,null)(BarContainer);
