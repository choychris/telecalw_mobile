import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , TouchableOpacity , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class Viewers extends Component {
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(timer){
		const { string } = this.props;
		return (
			<Text style={styles.text}>
				{timer}
			</Text>
		)
	}
	render(){
		const { machine , timer } = this.props;
		return (
			<View	style={styles.container}>
				<Icon 
					name="clock-o"
					size={20} 
					color={'white'}
					style={styles.icon}
				/>
				{(timer !== null) ? this._renderDisplay(timer) : this._renderLoading()}
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

export default connect(mapStateToProps,null)(Viewers);
