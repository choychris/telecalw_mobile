import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwitchCameraButton from './swicthCameraButton';
import CatchButton from './catchButton';
import JoyStick from './joystick/container';
import { sendGameResult , webSocketUrl } from '../../actions';
import { websockeInitialize } from '../../../../common/api/request/gizwits';
import { errorMessage } from '../../../utilities/actions';

class PlayPanel extends Component {
	constructor(props){
		super(props);
		const { webSocketUrl , config } = this.props;
		this.ws = new WebSocket(webSocketUrl(config));
	}
	_displayGameResult(result){
		const { navigator , sendGameResult } = this.props;
		navigator.showLightBox({
			screen : 'app.GameResult',
			animationType : 'fade',
			navigatorStyle: {
				navBarHidden: true
			},
			style: {
				flex : 1,
				height : Dimensions.get('window').height,
				backgroundBlur: "x-light",
				backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
				tapBackgroundToDismiss: false
			},
			passProps : {
				result : result,
				navigator : navigator
			}
		});
		sendGameResult(result);
	}
	shouldComponentUpdate(){
		return false;
	}
	componentDidMount(){
		const { config } = this.props;
		this.ws.onopen = () => websockeInitialize(
			config.gizwits,
			this.ws,
			(result)=>this._displayGameResult(result),
			()=>errorMessage('show',navigator,{ title : 'error'})
		);
	}
	//appid : '20a365a7564142d3a342916f6d6df937',
	//token : 'db7e4ed6c30849cabaeb0207ba5a5e5c',
	//uid : 'a0d461f5c7e34a8ea96f13c87888a4fd',
	//heartbeat_interval : 40,
	//did : "bnyXLPJWNpoumbKUYKA78V",
	//InitCatcher : [35,28,2,2,2,4,4,4,12,0,0,1]
	componentWillUnmount(){
		this.ws.close();
	}
	render(){
		const { config } = this.props;
		const { did } = config.gizwits.control;
		return(
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<JoyStick ws={this.ws} did={did}/>
				</View>
				<View style={styles.rightContainer}>
					<CatchButton ws={this.ws} did={did}/>
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

function mapStateToProps(state) {
	return { 
		config : state.game.play.config
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		sendGameResult,
		webSocketUrl
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayPanel);
