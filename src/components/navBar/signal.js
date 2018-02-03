import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator , NetInfo } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { errorMessage } from '../../containers/utilities/actions';

class Signal extends Component {
	shouldComponentUpdate(nextProps,nextState){
		const { status , language } = this.props;
		return status !== nextProps.status || language.locale !== nextProps.language.locale;
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(status){
		const { language } = this.props;
		const { string } = language;
		const displayString = (status === true) ? 'online' : 'offline';
		return (
			<Text style={styles.text}>
				{string[displayString]}
			</Text>
		)
	}
	render(){
		const { language , status } = this.props;
		const { string } = language;
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
		language : state.preference.language,
		status : state.game.network.status
	}
}

export default connect(mapStateToProps,null)(Signal)
