import React, { PropTypes, Component } from 'react';
import { Easing , Animated , View , Text , StyleSheet , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Loading extends Component {
	constructor(props){
		super(props);
		this._spinAnimation = new Animated.Value(0);
	}
	componentDidMount(){
		Animated.loop(
			Animated.sequence([
				Animated.timing(
					this._spinAnimation,
					{
						toValue: 1,
						duration: 500,
						easing: Easing.linear
					}
				),
				Animated.delay(500)
			])
		).start();
	}
	shouldComponentUpdate(){
		return false;
	}
	_spin(){
		const spin = this._spinAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '180deg']
		})
		return {
			transform : [{ rotate : spin }]
		}
	}
	render(){
		return(
			<View style={styles.container}>
				<Animated.Image
					style={[styles.image,this._spin()]}
					source={require('../../../../assets/utilities/sand_clock.png')}
					resizeMode="contain"
				/>
				<Text style={styles.text}>Loading ...</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	image : {
		width : 50 ,
		height : 50,
		margin : 20
	},
	container : {
		alignItems : 'center',
		justifyContent : 'center'
	},
	text : {
		color : 'white',
		fontFamily : 'Silom'
	}
});


export default connect(null,null)(Loading)
