import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const tubeImage = require('../../../../../../assets/utilities/tube.png');

class Tube extends Component {
	render(){
		return (
			<TouchableOpacity style={styles.container}>
				<Image
					style={styles.image}
					source={tubeImage}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		top : 10,
		position : 'absolute'
	},
	image : {
		width : 170,
		height : 170
	}
});

export default connect(null,null)(Tube)

