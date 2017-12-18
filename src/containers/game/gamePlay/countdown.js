import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Image , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetTimer } from '../actions';

class GameCountDown extends Component {
	constructor(props){
		super(props);
		this.state = { time : null };
	}
	shouldComponentUpdate(nextProps,nextState){
		const { webrtcUrl } = this.props;
		const { time } = this.state;
		return webrtcUrl !== nextProps.webrtcUrl || nextState.time !== time;
	}
	componentDidUpdate(prevProps){
		const { navigator , webrtcUrl } = this.props;
		if(prevProps.webrtcUrl['front'] === undefined && webrtcUrl['front']){
			this._countDown();
		}
	}	
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_countDown(){
		const { navigator , resetTimer } = this.props;
		this.countDownFunction = setInterval(()=>{
			const { time } = this.state;
			const nextTime = (time) ? time - 1 : 5 ;
			this.setState({ time : nextTime });
			if(nextTime === 0) {
				resetTimer(30);
				navigator.dismissLightBox();
				clearInterval(this.countDownFunction);
			};
		},1000);
	}
	render(){
		const { time } = this.state;
		return(
			<View>
				{(time && time !== null) ? <Text style={styles.text}>{time}</Text> : this._renderLoading()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text : {
		fontFamily : 'Silom',
		fontSize : 50,
		color : 'white'
	}
});

function mapStateToProps(state) {
	return { 
		webrtcUrl : state.game.play.webrtcUrl
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
			resetTimer
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameCountDown);
