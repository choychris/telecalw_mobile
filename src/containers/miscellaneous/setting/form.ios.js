import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SettingForm extends Component {
	render(){
		const { user } = this.props;
		return (
			<View>
				<Text>{user.name}</Text>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		user : state.auth.user
	}
}

export default connect(mapStateToProps,null)(SettingForm);
