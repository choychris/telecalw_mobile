import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Image , ActivityIndicator , Dimensions , Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const { height , width } = Dimensions.get('window');

class LightBulb extends Component{
	shouldComponentUpdate(nextProps){
		const { time , lightup } = this.props;
		return lightup == nextProps.time
	}
	render(){
		const { 
			bottom , 
			backgroundColor , 
			borderColor ,
			time,
			lightup
		} = this.props;
		const bulbStyle = { bottom : bottom ,  backgroundColor : backgroundColor , borderColor : borderColor , left : 8 };
		const opacity = (time === lightup) ? { opacity : 1 } : { opacity : 0.1 };
		return(
			<View style={[styles.container,bulbStyle,opacity]}/>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		width : 48,
		height : 48,
		borderRadius : 30,
		borderTopWidth : 1,
		borderLeftWidth : 5,
		marginHorizontal : 4
	}
});

export default connect(null,null)(LightBulb)
