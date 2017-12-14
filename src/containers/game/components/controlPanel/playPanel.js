import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwitchCameraButton from './swicthCameraButton';
import JoyStick from './joystick/container';

class PlayPanel extends Component {
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.column}>
					<JoyStick/>
				</View>
				<View style={styles.column}>
					<SwitchCameraButton/>	
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		height : Dimensions.get('window').height * 0.16,	
		flexDirection : 'row',
		alignSelf : 'stretch',
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'center'
	},
	column : {
		paddingHorizontal : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

export default connect(null,null)(PlayPanel);
