import React, { PropTypes, Component } from 'react';
import { Image , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const teletarsImages = {
	normal : require('../../../assets/telebuddies/teletars/teletars.png'),
}

class Teletars extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { status , height , width , style } = this.props;
		const imageStyle= { width : width , height : height };
		return(
			<Image
			 source={teletarsImages[status]}
			 style={[imageStyle,style]}
			 resizeMode="contain"
			/>
		)
	}
}

export default connect(null,null)(Teletars)
