import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lastMachineMove } from '../../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../../components/utilities/buttons';
import { websocketControl } from '../../../../../common/api/request/gizwits';

class Direction extends Component {
	shouldComponentUpdate(nextProps){
		const { lastAction } = this.props;
		return (lastAction !== nextProps.lastAction);
	}
	render(){
		const { 
			lastAction,
			lastMachineMove,
			icon,
			action,
			btnStyle,
			ws
		} = this.props;
		return (
			<Button
				disable={(lastAction === 'CatchGift')}
				btnStyle={btnStyle}
				borderColor={'#212121'}
				icon={{ 
					name : icon , 
					size : 20 , 
					color : 'white' 
				}}
				onPressInFunction={()=>{
					websocketControl({ 
						direction : action ,   
						value : true ,
						did : "bnyXLPJWNpoumbKUYKA78V"
					},ws);
					lastMachineMove(action);
				}}
				onPressOutFunction={()=>{
					websocketControl({ 
						direction : action ,   
						value : false ,
						did : "bnyXLPJWNpoumbKUYKA78V"
					},ws);
					lastMachineMove(null);
				}}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		lastAction : state.game.play.lastAction
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		lastMachineMove
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Direction)
