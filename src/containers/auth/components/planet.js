import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const moon = require('../../../../assets/planet/moon.png');
const { height , width } = Dimensions.get('window');

class Planet extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		return(
			<Image
				source={moon}
				style={styles.logo}
				resizeMode={'contain'}
			/>
		)
	}
}

const styles = StyleSheet.create({
	logo : {
		bottom : -height * 0.2,
		right : -width * 0.1,
		width : '120%'
	}
});

export default connect(null, null)(Planet);
