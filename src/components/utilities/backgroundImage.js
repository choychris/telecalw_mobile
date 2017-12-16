import React, { PropTypes, Component } from 'react';
import { View , Image , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const backgroundImages = [
	require('../../../assets/background/background1.png') , 
	require('../../../assets/background/background2.png') , 
	require('../../../assets/background/background3.png')
];

class BackgroundImage extends Component {
	shouldComponentUpdate(){
		return false
	}
	render() {
		const { type } = this.props;
		const backgroundSetting = (type === 'auth') ? 
			require('../../../assets/background/background_auth.png') : 
			backgroundImages[Math.floor(Math.random() * (2 - 0 + 1)) + 0];
		return(
			<View style={styles.container}>
				<Image
					source={backgroundSetting}
					style={styles.image}
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
		backgroundColor : '#263E50'
	},
	image : {
		height : Dimensions.get('window').height,
		width : Dimensions.get('window').width
	}
});

export default connect(null, null)(BackgroundImage);
