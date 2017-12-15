import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwitchCameraButton from './swicthCameraButton';
import CatchButton from './catchButton';
import JoyStick from './joystick/container';

class PlayPanel extends Component {
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<JoyStick/>
				</View>
				<View style={styles.rightContainer}>
					<CatchButton/>
					<SwitchCameraButton/>	
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		height : Dimensions.get('window').height * 0.18,	
		flexDirection : 'row',
		alignSelf : 'stretch',
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'space-around'
	},
	leftContainer : {
		flex : 1,
		flexDirection : 'row',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	},
	rightContainer : {
		flex : 1,
		flexDirection : 'column',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

export default connect(null,null)(PlayPanel);
