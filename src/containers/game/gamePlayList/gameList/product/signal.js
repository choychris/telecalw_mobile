import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Signal extends Component {
	_signalColor(status){
		switch(status){
			case false:
				return '#E63946'
			break;
			case true:
				return '#7ED881'
			break;
			default:
		   return '#D8D8D8'
			break;
		}
	}
	render(){
		let { machineStatus , maintainStatus } = this.props;
		if(maintainStatus === true) machineStatus = null ;
		const signalColor = this._signalColor(machineStatus);
		return (
			<View style={[styles.container,{ backgroundColor : signalColor }]}>
			</View>
		)	
	}
}

const styles = StyleSheet.create({
	container : {
		borderRadius : 30,
		height : 8,
		width : 8,
		margin : 5
	}
});

export default connect(null,null)(Signal)
