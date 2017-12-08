import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const tubeImage = require('../../../../assets/utilities/sific_tube.png');

class GameContainer extends Component {
	_renderUpperTube(){
		return (
			<Image
				source={tubeImage}
				style={styles.image}
				resizeMode={'contain'}	
			/>
		)
	}
	render(){
		return (
			<View style={styles.container}>
				{this._renderUpperTube()}	
				<Text>Tube</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignSelf : 'stretch',
		backgroundColor : 'red',
		alignItems : 'center',
		justifyContent : 'center'
	},
	image : {
		top : 0,
		position : 'absolute',
		width	: Dimensions.get('window').width ,
		height : Dimensions.get('window').height
	}
});

export default connect(null,null)(GameContainer);
