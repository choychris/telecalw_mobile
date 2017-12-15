import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Direction from './direction';
import Request from '../../../../../utils/fetch';
import { initiate } from '../../../../../common/api/request/gizwits';

class JoyStick extends Component {
	shouldComponentUpdate(){
		return false
	}
	componentDidMount(){
		initiate(
			{
				did : 'bnyXLPJWNpoumbKUYKA78V',
				appId : '20a365a7564142d3a342916f6d6df937',
				userToken : 'db7e4ed6c30849cabaeb0207ba5a5e5c',
				value : '1E200202020404040C000001'
			},
			Request
		);
		var ws = new WebSocket('wss://sandbox.gizwits.com:8880/ws/app/v1');
		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					cmd: "login_req",
					data: {
						appid : "20a365a7564142d3a342916f6d6df937",
						uid : "a0d461f5c7e34a8ea96f13c87888a4fd",
						token : "db7e4ed6c30849cabaeb0207ba5a5e5c",
						p0_type: "attrs_v4",
						heartbeat_interval : 40,
						auto_subscribe : false
					}
				})
			)
		};
		ws.onmessage = e => {
			  // a message was received
			 if(JSON.parse(e.data).cmd === 'login_res' && JSON.parse(e.data).data.success === true){
				 ws.send(
					 JSON.stringify({
							cmd: "subscribe_req",
							data:[{
								did : "bnyXLPJWNpoumbKUYKA78V"
							}]
					 })
				 )
			 }
			 if(JSON.parse(e.data).cmd === 's2c_noti' && JSON.parse(e.data).data.attrs.GameResult !== 0){

					 console.warn(e.data);
			 }
		};

		ws.onerror = e => {
			  // an error occurred
					 console.warn(e.message);
				//
		};

		ws.onclose = e => {
			  // connection closed
					 console.warn(e.code, e.reason);
				//
		};
	}
	render(){
		const { string } = this.props;
		return (
			<View style={styles.container}>
				<Direction 
					action={'MoveUp'} 
					icon={'caret-up'}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						top : -27,
						borderTopLeftRadius : 10,
						borderTopRightRadius : 10,
						borderBottomLeftRadius : 0,
						borderBottomRightRadius : 0
					}}
				/>
				<Direction 
					action={'MoveDown'} 
					icon={'caret-down'}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						bottom : -30,
						borderBottomRightRadius : 10,
						borderTopLeftRadius : 0,
						borderTopRightRadius : 0,
						borderBottomLeftRadius : 10
					}}
				/>
				<Direction 
					action={'MoveLeft'} 
					icon={'caret-left'}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						left : -28,
						borderBottomRightRadius : 0,
						borderTopLeftRadius : 10,
						borderTopRightRadius : 0,
						borderBottomLeftRadius : 10
					}}
				/>
				<Direction 
					action={'MoveRight'} 
					icon={'caret-right'}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						position : 'absolute',
						right : -28,
						paddingVertical : 6,
						paddingHorizontal : 10,
						borderBottomRightRadius : 10,
						borderTopLeftRadius : 0,
						borderTopRightRadius : 10,
						borderBottomLeftRadius : 0
					}}
				/>
				<View style={styles.center}></View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container : {
		marginHorizontal : 50,
		flexDirection : 'row',
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'center'
	},
	center : {
		backgroundColor : '#4C4C4C',
		height : 35,
		width : 35
	}
});

export default connect(null,null)(JoyStick)
