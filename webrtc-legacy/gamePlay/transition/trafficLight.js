import React, { PropTypes, Component } from 'react';
import { StyleSheet , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const trafficLight = require('../../../../../assets/utilities/traffic_light.png');

class TrafficLight extends Component {
	shouldComponentUpdate(nextProps){
		return false;
	}
	render(){
		return(
			<Image
				source={trafficLight}
				style={[styles.image]}
				resizeMode={'contain'}
			/>
		)
	}
}

const styles = StyleSheet.create({
	image : {
		width : 300,
		height : 300
	}
});

export default connect(null,null)(TrafficLight)
