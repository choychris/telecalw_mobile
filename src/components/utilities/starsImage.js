import React, { PropTypes, Component } from 'react';
import { Easing , Animated , View , Image , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const startsImages = [
	require('../../../assets/background/stars2.png') , 
];
const backgroundImg = require('../../../assets/background/background_img.png');

class StarsImage extends Component {
	constructor(props){
		super(props);
		this._animation = new Animated.Value(0);
	}
	componentDidMount(){
		Animated.loop(
			Animated.sequence([
				Animated.timing(this._animation, {
					toValue: 1,
					duration: 5000,
					easing : Easing.linear
				}),
				Animated.timing(this._animation, {
					toValue: 0,
					duration: 5000,
					easing : Easing.linear
				})
			])
		).start();
	}
	shouldComponentUpdate(){
		return false
	}
	_opacityAnimation(){
		return {
			opacity: this._animation.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			})
		}
	}
	render() {
		const { type } = this.props;
		//const backgroundSetting = (type === 'auth') ? 
			//require('../../../assets/background/background_auth.png') : 
			//backgroundImages[Math.floor(Math.random() * (2 - 0 + 1)) + 0];
		return(
			<View style={styles.container}>
				<Animated.Image
					source={startsImages[0]}
					style={[styles.image,this._opacityAnimation()]}
					resizeMode={'cover'}
				/>
			</View>																				      
		)
	}
}

const styles = StyleSheet.create({
	container : {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor : 'transparent'
	},
	image : {
		height : Dimensions.get('window').height,
		width : Dimensions.get('window').width
	}
});

export default connect(null, null)(StarsImage);
