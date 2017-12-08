import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const bottomTubeImage = require('../../../../../assets/utilities/bottom_tube.png');

class ControlPanel extends Component {
	_renderBottomTube(){
		return (
			<Image
				source={bottomTubeImage}
				style={styles.image}
				resizeMode={'stretch'}	
			/>
		)
	}
	render(){
		return (
			<View style={styles.container}>
				<Text>Panel</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		backgroundColor : 'blue',
		alignItems : 'center',
		justifyContent : 'center'
	},
	image : {
		bottom : 0,
		position : 'absolute',
		width	: Dimensions.get('window').width,
		height : Dimensions.get('window').height * 0.18
	}
});

export default connect(null,null)(ControlPanel)
