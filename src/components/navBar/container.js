import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Coins from './coins';
import Signal from './signal';
import Location from '../../containers/game/gamePlayList/location/name';

class NavBar extends Component {
	render(){
		const { back , coins , location , signal , timer , navigator } = this.props;
		return(
			<View style={styles.container}>	
				{(coins === true) ? <Coins navigator={navigator}/>  : null}
				{(location === true) ? <Location/> : null}
				{(signal === true) ? <Signal navigator={navigator}/> : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		padding : 10
	}
});

export default connect(null,null)(NavBar);


