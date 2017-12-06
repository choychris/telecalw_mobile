import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const orbitImg = require('../../../../../assets/planet/orbit.png');

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
		height : 400,
		width : 400
	}
});


export default connect(null,null)(Orbit)
