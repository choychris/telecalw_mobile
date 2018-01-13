import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const orbitImg = require('../../../../../assets/planet/orbit.png');
const { width , height } = Dimensions.get('window');

class Orbit extends Component {
	componentWillMount(){
		this._spinAnimation = new Animated.Value(0);
	}
	componentDidMount(){
		Animated.loop(
			Animated.timing(
				this._spinAnimation,
				{
					toValue : 1,
					duration : 80000,
					easing : Easing.linear
				}
			)
		).start();
	}
	shouldComponentUpdate(){
		return false;
	}
	_orbitSpinAnimation(){
		const spin = this._spinAnimation.interpolate({
			inputRange : [0,1],
			outputRange : ['0deg','-360deg']
		})
		return {
			transform	: [{ rotate : spin }]
		}
	}
	render(){
		return(
			<Animated.Image
				source={orbitImg}
				style={[styles.image,this._orbitSpinAnimation()]}
				resizeMode={'contain'}	
			/>
		)
	}
}

const styles = StyleSheet.create({
	image : {
		position : 'absolute',
		height : Platform.OS === 'ios' ? width : width * 0.9,
		width : Platform.OS === 'ios' ? width : width * 0.9
	}
});


export default connect(null,null)(Orbit)
