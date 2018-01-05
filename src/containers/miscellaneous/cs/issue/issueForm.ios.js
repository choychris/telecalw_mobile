import React, { PropTypes, Component } from 'react';
import { TextInput , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputIssue } from '../../actions';

class IssueForm extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { string , inputIssue } = this.props;
		return(
			<View>
				<TextInput
					style={[styles.input,{ height : 35 }]}
					placeholder={string['inputEmail']}
					keyboardType={'email-address'}
					autoCapitalize={'none'}
					onChangeText={(text)=>inputIssue(['email'],text)}
				/>
				<TextInput
					multiline={true}
					autoCorrect={false}
					style={[styles.input,{ height : 100 }]}
					placeholder={string['inputMsg']}
					onChangeText={(text)=>inputIssue(['message'],text)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	header : {
		flexDirection : 'row',
		alignItems : 'center',
		paddingHorizontal : 10
	},
	headerText : {
		marginHorizontal : 5,
		fontSize : 15,
		fontWeight : 'bold'
	},
	input : {
		backgroundColor : 'white',
		marginTop : 5,
		marginBottom : 10,
		paddingHorizontal : 10,
		fontSize : 13
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		inputIssue
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(IssueForm);
