import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image , Dimensions, Animated , Easing } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import Teleufo from '../../../components/telebuddies/teleufo';
import Teletars from '../../../components/telebuddies/teletars';
const { height , width } = Dimensions.get('window');

class Characters extends Component {
	constructor(props){
		super(props);
		this._telebot = new Animated.ValueXY();
		this._teleufo = new Animated.ValueXY();
		this._teletars = new Animated.ValueXY();
	}
	componentDidMount(){
		Animated.parallel([
			Animated.loop(
				Animated.sequence([
					Animated.timing(this._telebot, {
						duration : 1000,
						toValue : { 
							x : 0, 
							y : 30
						},
						easing : Easing.linear
					}),
					Animated.timing(this._telebot, {
						duration : 1000,
						toValue : { 
							x : 0, 
							y : 0
						},
						easing : Easing.linear
					}),
				])
			),
			Animated.loop(
				Animated.sequence([
					Animated.delay(1000),
					Animated.timing(this._teleufo, {
						duration : 800,
						toValue : { 
							x : 0, 
							y : 25
						},
						easing : Easing.linear
					}),
					Animated.timing(this._teleufo, {
						duration : 800,
						toValue : { 
							x : 0, 
							y : 0
						},
						easing : Easing.linear
					})
				])
			),
			Animated.loop(
				Animated.sequence([
					Animated.timing(this._teletars, {
						duration : 1000,
						toValue : { 
							x : 0, 
							y : 20
						},
						easing : Easing.linear
					}),
					Animated.timing(this._teletars, {
						duration : 1000,
						toValue : { 
							x : 0, 
							y : 0
						},
						easing : Easing.linear
					}),
					Animated.delay(500),
				])
			)
		])
		.start();
	}
	shouldComponentUpdate(){
		return false;
	}
	render(){
		return (
			<View style={styles.container}>
				<Animated.View style={this._telebot.getLayout()}>
					<Telebot
						status={'front'}
						width={100}
						height={100}
						style={{
							top : 10,
							transform: [{ rotate: '-15deg' }]
						}}
					/>
				</Animated.View>
				<Animated.View style={this._teleufo.getLayout()}>
					<Teleufo
						status={'normal'}
						width={90}
						height={90}
						style={{
							top : -10
						}}
					/>
				</Animated.View>
				<Animated.View style={this._teletars.getLayout()}>
					<Teletars
						status={'normal'}
						width={120}
						height={120}
						style={{
							top : 30
						}}
					/>
				</Animated.View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		position : 'absolute',
		flexDirection : 'row',
		alignItems : 'center',
		top : height * 0.48
	}
});

export default connect(null,null)(Characters)

