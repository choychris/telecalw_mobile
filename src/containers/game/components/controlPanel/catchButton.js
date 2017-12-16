import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lastMachineMove } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';
import { websocketControl } from '../../../../common/api/request/gizwits';

class CatchButton extends Component {
	constructor(props){
		super(props);
		this.state = { 
			disable : false
		};
	}
	shouldComponentUpdate(nextProps,nextState){
		const { disable } = this.state;
		return disable !== nextState.disable;
	}
	render(){
		const { 
			string , 
			lastMachineMove,
			ws
		} = this.props;
		const { disable } = this.state;
		const backgroundColor = (disable === true) ? '#D8D8D8' : '#D10B9D';
		const borderColor = (disable === true) ? '#95989A' : '#890E6F' ;

		return (
			<Button
				disable={disable}
				text={'catch'}
				textStyle={{
					color : 'white',
					fontSize : 20,
					fontFamily : 'Silom',
					fontWeight : 'bold'
				}}
				btnStyle={{
					backgroundColor : backgroundColor,
					paddingVertical : 18,
					top : 10,
					left : 20
				}}
				borderColor={borderColor}
				onPressFunction={()=>{
					this.setState({ disable : true });
					websocketControl({
						direction : 'CatchGift',
						value : true,
						did : "bnyXLPJWNpoumbKUYKA78V"
					},ws);
					lastMachineMove('CatchGift');
				}}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		lastMachineMove
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CatchButton)