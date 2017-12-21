import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Timer from '../gamePlay/result/timer';
import Button from '../../../components/utilities/buttons';
import { rejectReserve , acceptReserve } from '../actions';

class Reservation extends Component {
	constructor(props){
		super(props);
		this.state = { disable : false };
	}
	componentDidMount(){
		const { navigator } = this.props;
		this.countDown = setTimeout(()=>navigator.dismissLightBox(),5000);
	}
	componentWillUnmount(){
		clearInterval(this.countDown);
	}
	shouldComponentUpdate(nextProps,nextState){
		const { disable } = this.state;
		return disable !== nextState.disable;
	}
	_btnAction(action){
		const { 
			navigator , 
			data ,
			rejectReserve,
			acceptReserve
		} = this.props;
		this.setState({ disable : true });
		if(action === 'play'){
			acceptReserve(data,navigator);
		} else if(action === 'leave'){
			rejectReserve(data.machineId,navigator);
		}
	}
	_renderActionButton(){
		const { string } = this.props;
		const { disable } = this.state;
		const actionButtons = [
			{ text : 'play' , function : ()=>this._btnAction('play') },
			{ text : 'leave' , function : ()=>this._btnAction('leave') }
		]
		return  actionButtons.map((btn,key)=>(
			<View key={key}>
				<Button
					disable={disable}
					btnStyle={{
						backgroundColor : '#545555',
						borderRadius : 10,
						paddingHorizontal : 30,
						paddingVertical : 12,
						marginVertical : 5
					}}
					borderColor={'#2D2D2E'}
					onPressFunction={btn.function}
				/>
				<Text style={styles.btnText}>
					{string[btn.text]}
					{(key === 0) ? <Timer/> : null }
				</Text>
			</View>
		));
	}
	render(){
		const { string } = this.props;
		return(
			<View style={styles.container}>
				<Text style={styles.title}>{string['yourTurn']}</Text>
				<View style={styles.btnContainer}>
					{this._renderActionButton()}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center'
	},
	btnContainer : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'space-around',
		paddingVertical : 20
	},
	btnText : {
		textAlign : 'center',
		color : '#4A6CFF',
		fontFamily : 'Silom',
		fontSize : 20
	},
	title : {
		textAlign : 'center',
		color : 'white',
		fontFamily : 'Silom',
		fontSize : 30,
		paddingHorizontal : 20
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		rejectReserve,
		acceptReserve
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Reservation);

