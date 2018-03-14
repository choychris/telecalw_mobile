import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , TouchableOpacity , ActivityIndicator , ScrollView , Image } from 'react-native';
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
		return (
			<Text style={styles.text}>
				{viewers}
			</Text>
		)
	}
	_renderMemberList(members){
		return (
			<ScrollView 
				horizontal={true}
			>
				{Object.keys(members).map((key,index)=>(index <= 2) ? <Image
					key={key}
					style={styles.avatar}
					source={{ uri : members[key]['picture'] }}			
				/> : null)}	
			</ScrollView>
		)
	}
	render(){
		const { machine } = this.props;
		return (
			<View	style={styles.container}>
				<Icon 
					name="gamepad"
					size={20} 
					color={'white'}
					style={styles.icon}
				/>
				{(machine && machine.views) ? this._renderDisplay(machine.views) : this._renderLoading()}
				{(machine && machine.members) ? this._renderMemberList(machine.members) : null}
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
