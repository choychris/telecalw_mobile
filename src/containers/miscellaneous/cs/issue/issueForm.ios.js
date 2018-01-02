import React, { PropTypes, Component } from 'react';
import { TextInput , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IssueForm extends Component {
	render(){
		const { string } = this.props;
		return(
			<View>
				<TextInput
					style={[styles.input,{ height : 35 }]}
					placeholder={string['inputEmail']}
					keyboardType={'email-address'}
					autoCapitalize={'none'}
					onChangeText={(text)=>{}}
				/>
				<TextInput
					multiline={true}
					autoCorrect={false}
					style={[styles.input,{ height : 100 }]}
					placeholder={string['inputMsg']}
					onChangeText={(text)=>{}}
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
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(IssueForm);
