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
		const { version, token } = this.props;
		return version !== nextProps.version || token !== nextProps.token;
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
		const renderMenu = [
	
      { icon : 'rocket' , name : 'delivery' , navigate : 'app.Delivery' },
      { icon : 'dollar' , name : 'wallet' , navigate : 'app.TopUp' },
      { icon : 'gift' , name : 'reward' , navigate : 'app.Reward' },
      { icon : 'question-circle' , name : 'support' , navigate : 'app.Support' },
			
		];
		//if(version.release !== true){
			//renderMenu = [
				//{ icon : 'rocket' , name : 'delivery' , navigate : 'app.Delivery' },
				//{ icon : 'question-circle' , name : 'support' , navigate : 'app.Support' },
				//{ icon : 'gift' , name : 'reward' , navigate : 'app.Reward' }
			//]
		//} else {
			//renderMenu = [
				//{ icon : 'rocket' , name : 'delivery' , navigate : 'app.Delivery' },
				//{ icon : 'question-circle' , name : 'support' , navigate : 'app.Support' },
				//{ icon : 'gift' , name : 'reward' , navigate : 'app.Reward' },
				//{ icon : 'money' , name : 'wallet' , navigate : 'app.TopUp' }
			//]
		//};
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
		const { navigator , token } = this.props;
		const screenWidth = Dimensions.get('window').width * 0.25;
		return (
			<View style={styles.container}>
				{(token.lbToken !== undefined) ? this._renderTabItems() : null}
				<Animated.View style={this._floating.getLayout()}>
					<TouchableOpacity
						disabled={(token.lbToken !== undefined) ? false : true}
						onPress={()=>{
							if(token.lbToken !== undefined){
								navigator.push({
									screen : 'app.Setting',
									navigatorStyle : {
										navBarHidden : true
									}
								});
							}
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
		version : state.mis.version,
		token : state.auth.token
	}
}

export default connect(mapStateToProps,null)(BarContainer);
