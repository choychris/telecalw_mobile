import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Timer extends Component {
	constructor(props){
		super(props);
		this.state = { time : 5 };
    this.countDownFunction;
	}

	componentDidMount(){
		this._countDown();
	}

	shouldComponentUpdate(nextProps,nextState){
		const { time } = this.props;
		return (nextState.time !== time);
	}

	_countDown(){
		this.countDownFunction = setInterval(()=>{
			const { time } = this.state;
			const nextTime = time - 1 ;
			this.setState({ time : nextTime });
			if(nextTime === 0) {
				clearInterval(this.countDownFunction)
			};
		},1000);
	}

  componentWillUnmount(){
    //console.log(this.countDownFunction);
    clearInterval(this.countDownFunction);
  }

	render(){
		const { time } = this.state;
		return(
			<Text>{` (${time})`}</Text>
		)
	}
}

export default connect(null,null)(Timer);
