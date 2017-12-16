import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator , NetInfo } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { errorMessage } from '../../containers/utilities/actions';

class Signal extends Component {
	shouldComponentUpdate(nextProps,nextState){
		const { status } = this.props;
		return status !== nextProps.status
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(status){
		const { string } = this.props;
		const displayString = (status === true) ? 'online' : 'offline';
		return (
			<Text style={styles.text}>
				{string[displayString]}
			</Text>
		)
	}
	render(){
		const { string , status } = this.props;
		const signalIcon = (status === true) ? 
			{ color : '#2ECC71' , name : 'signal' } :
		 	{ color : '#E63946' , name : 'times' }
		return(
			<View style={styles.container}>
				<Icon 
					name={signalIcon.name}
					size={20} 
					color={signalIcon.color}
					style={styles.icon}
				/>
				{(status !== null) ? this._renderDisplay(status) : this._renderLoading()}
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		status : state.game.network
	}
}

export default connect(mapStateToProps,null)(Signal)
