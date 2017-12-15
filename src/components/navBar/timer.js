import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , TouchableOpacity , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetTimer } from '../../containers/game/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class Timer extends Component {
	constructor(props){
		super(props);
		this.state = { time : null };
	}
	shouldComponentUpdate(nextProps,nextState){
		const { timer } = this.props;
		const { time } = this.state;
		return (timer !== nextProps.timer || time !== nextState.time);
	}
	componentDidUpdate(prevProps){
		if(prevProps.timer === null){
			this._countDown();
		}
	}
	componentWillUnmount(){
		const { resetTimer } = this.props;
		resetTimer();
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_countDown(){
		const countDownFunction = setInterval(()=>{
			const { time } = this.state;
			const { timer } = this.props;
			const nextTime = (time !== null) ? time - 1 : timer;
			this.setState({ time : nextTime });
			if(nextTime === 0) {
				clearInterval(countDownFunction)
			};
		},1000);
	}
	_changeIcon(time,timer){
		if(time === 0){
			return 'hourglass-end';
		} else if(time > 0 && Math.round(timer/2) > time){
			return 'hourglass-half';
		} else {
			return 'hourglass-start';
		}
		//switch(time){
			//case 0 :
				//return 'hourglass-end';
			//break;
			//case :
				//return 'hourglass-half';
			//break;
			//default:
				//return 'hourglass-start';
			//break;
		//}	
	}
	_renderDisplay(time){
		return (
			<Text style={styles.text}>
				{time}
			</Text>
		)
	}
	render(){
		const { machine , timer } = this.props;
		const { time } = this.state;
		const icon = this._changeIcon(time,timer);
		return (
			<View	style={styles.container}>
				<Icon 
					name={icon}
					size={18} 
					color={'white'}
					style={styles.icon}
				/>
				{(timer !== null && time !== null) ? this._renderDisplay(time) : this._renderLoading()}
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		timer : state.game.play.timer
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		resetTimer
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
