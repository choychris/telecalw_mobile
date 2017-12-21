import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initGamePlay , cancelReservation } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class ReserveButton extends Component {
	constructor(props){
		super(props);
		this.state = { loading : false  , disable : false };
	}
	shouldComponentUpdate(nextProps,nextState){
		const { reservation , machine } = this.props;
		const { loading , disable } = this.state;
		return nextState.loading !== loading || nextState.disable !== disable || machine !== nextProps.machine || reservation !== nextProps.reservation;	
	}
	_renderButtonStyle(isReserved){
		if(isReserved === true){
			return {
				backgroundColor : '#BC6B00',
				paddingVertical : 16,
				paddingHorizontal : 10
			}
		} else {
			return {
				backgroundColor : '#FF9700',
				paddingVertical : 16,
				paddingHorizontal : 10
			}
		}
	}
	componentDidUpdate(prevProps){
		const { reservation , machine } = this.props;
		if(prevProps.machine !== machine || prevProps.reservation !== reservation){
			this.setState({
				disable : false,
				loading : false
			});
		}
	}
	render(){
		const { 
			string , 
			machine , 
			initGamePlay ,
			reservation,
			navigator,
			cancelReservation,
		} = this.props;
		const {  
			disable,
			loading
	 	} = this.state;
		const { status , machineId } = reservation;
		//console.warn(JSON.stringify(reservation));
		//console.warn(machine.id);
		const displayString = `${machine.reservation} ${string['reserve']}`;
		const isReserved = (status === 'open' && machineId === machine.id);
		const btnStyle = this._renderButtonStyle(isReserved);
		return (
			<Button
				disable={disable}
				loading={loading}
				text={displayString}
				textStyle={{
					color : 'white',
					fontSize : 20,
					fontFamily : 'Silom',
					fontWeight : 'bold'
				}}
				btnStyle={btnStyle}
				borderColor={'#BC6B00'}
				icon={{ name : 'users' , size : 15 , color : 'white' }}
				onPressFunction={()=>{
					this.setState({
						disable : true,
						loading : true
					});
					if(isReserved === true){
						cancelReservation();
					} else {
						initGamePlay(navigator);
					}
				}}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		reservation : state.auth.reservation
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		initGamePlay,
		cancelReservation
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ReserveButton)
