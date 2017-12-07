import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const testProductImage = require('../../../../../../assets/utilities/bear.png');

class ProductImage extends Component {
	render(){
		return (
			<TouchableOpacity style={styles.container}>
				<Image
					style={styles.image}
					source={testProductImage}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		top : 76,
		position : 'absolute'
	},
	image : {
		width : 60,
		height : 60
	}
});

export default connect(null,null)(ProductImage)
