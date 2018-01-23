import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image , Dimensions , Animated , Easing } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const moon = require('../../../../assets/planet/moon.png');
const { height , width } = Dimensions.get('window');

class Planet extends Component {
	constructor(props){
		super(props);
		this._spinAnimation = new Animated.Value(0);
	}
	componentDidMount(){
		Animated.loop(
			Animated.timing(
				this._spinAnimation,
				{
					toValue : 1,
					duration : 30000,
					easing : Easing.linear	
				}
			)
		).start();
	}
	shouldComponentUpdate(){
		return false;
	}
	_spinAction(){
		const spin = this._spinAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		});
		return {
			transform : [{ rotate : spin }]
		}
	}
	render(){
		return(
			<Animated.Image
				source={moon}
				style={[
					styles.planet,
					this._spinAction()
				]}
				resizeMode={'contain'}
			/>
		)
	}
}

const styles = StyleSheet.create({
	planet : {
		position : 'absolute',
		width : 460,
		top : height * 0.155
	}
});

export default connect(null, null)(Planet);
