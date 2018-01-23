import React, { PropTypes, Component } from 'react';
import { Image , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const teleufoImages = {
	normal : require('../../../assets/telebuddies/teleufo/ufo.png'),
}

class Teleufo extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { status , height , width , style } = this.props;
		const imageStyle= { width : width , height : height };
		return(
			<Image
			 source={teleufoImages[status]}
			 style={[imageStyle,style]}
			 resizeMode="contain"
			/>
		)
	}
}

export default connect(null,null)(Teleufo)
