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

class NavBar extends Component {
	render(){
		const { 
			back , 
			coins , 
			location , 
			signal , 
			timer , 
			viewers ,
			navigator 
		} = this.props;
		const spaceStyle = (timer === true) ? { justifyContent : 'space-between' } : null;
		return(
			<View style={[styles.container,spaceStyle]}>	
				{(back === true) ? <Back navigator={navigator}/> : null }
				{(coins === true) ? <Coins navigator={navigator}/>  : null}
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
		paddingTop : 8,
		paddingBottom : 5
	}
});

export default connect(null,null)(NavBar);


