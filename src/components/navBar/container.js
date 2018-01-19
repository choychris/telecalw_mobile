import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Coins from './coins';
import Signal from './signal';
import Location from '../../containers/game/gamePlayList/location/name';
import Back from './back';
import Viewers from './viewers';
import Timer from './timer';
const DeviceInfo = require('react-native-device-info');

class NavBar extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { 
			back , 
			coins , 
			location , 
			signal , 
			timer , 
			viewers ,
			navigator ,
			coinsDisable
		} = this.props;
		const spaceStyle = (timer === true) ? { justifyContent : 'space-between' } : null;
		return(
			<View style={[styles.container,spaceStyle]}>	
				{(back === true) ? <Back navigator={navigator}/> : null }
				{(coins === true) ? <Coins navigator={navigator} disabled={coinsDisable}/>  : null}
				{(timer === true) ? <Timer/> : null}
				{(location === true) ? <Location/> : null}
				{(viewers === true) ? <Viewers/> : null}
				{(signal === true) ? <Signal navigator={navigator}/> : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		paddingHorizontal : 10,
		paddingTop : (DeviceInfo.getModel() === 'iPhone X') ? 35 : 8,
		paddingBottom : 5
	}
});

export default connect(null,null)(NavBar);


