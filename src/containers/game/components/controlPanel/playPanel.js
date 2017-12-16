import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwitchCameraButton from './swicthCameraButton';
import CatchButton from './catchButton';
import JoyStick from './joystick/container';
import { websockeInitialize } from '../../../../common/api/request/gizwits';

class PlayPanel extends Component {
	constructor(props){
		super(props);
		this.ws = new WebSocket('wss://sandbox.gizwits.com:8880/ws/app/v1');
	}
	shouldComponentUpdate(){
		return false;
	}
	componentDidMount(){
		this.ws.onopen = () => websockeInitialize({ 
			appid : '20a365a7564142d3a342916f6d6df937',
			token : 'db7e4ed6c30849cabaeb0207ba5a5e5c',
			uid : 'a0d461f5c7e34a8ea96f13c87888a4fd',
			heartbeat_interval : 40,
			did : "bnyXLPJWNpoumbKUYKA78V",
			machine_init : [0x1E,0x20,0x02,0x02,0x02,0x04,0x04,0x04,0x0C,0x00,0x00,0x01]
		},this.ws);
	}
	componentWillUnmount(){
		this.ws.close();
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<JoyStick ws={this.ws}/>
				</View>
				<View style={styles.rightContainer}>
					<CatchButton ws={this.ws}/>
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
