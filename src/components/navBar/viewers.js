import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , TouchableOpacity , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class Viewers extends Component {
	shouldComponentUpdate(nextProps){
		const { machine } = this.props;
		return nextProps.machine !== machine;
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(viewers){
		const { string } = this.props;
		return (
			<Text style={styles.text}>
				{viewers}
			</Text>
		)
	}
	render(){
		const { machine } = this.props;
		return (
			<View	style={styles.container}>
				<Icon 
					name="eye"
					size={20} 
					color={'white'}
					style={styles.icon}
				/>
				{(machine && machine.views) ? this._renderDisplay(machine.views) : this._renderLoading()}
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		machine :state.game.machine
	}
}

export default connect(mapStateToProps,null)(Viewers);
