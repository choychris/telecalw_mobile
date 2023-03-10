import React, { PropTypes, Component } from 'react';
import { TextInput , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator , TouchableOpacity , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputIssue } from '../../actions';

class IssueForm extends Component {
	shouldComponentUpdate(nextProps){
		return (this.props.warn !== nextProps.warn);
	}
	render(){
		const { string , inputIssue, warn } = this.props;
    let warningStyleMsg = (warn == 'NoMsg') ? styles.warning : {};
    let warningStyleEmail = (warn == 'email') ? styles.warning : {};
		return(
			<View style={styles.container}>
				<TextInput
					style={[styles.input,{ height : 35 }, warningStyleEmail]}
					placeholder={string['inputEmail']}
					keyboardType={'email-address'}
					autoCapitalize={'none'}
          autoCorrect={false}
					onChangeText={(text)=>inputIssue(['email'],text)}
				/>
				<TextInput
					multiline={true}
					autoCorrect={false}
					style={[styles.input,{ height : 100}, warningStyleMsg]}
					placeholder={string['inputMsg']}
					onChangeText={(text)=>inputIssue(['message'],text)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		...Platform.select({
			android : {
				borderColor : '#C9C9C9',
				borderTopWidth : 1
			}
		})
	},
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
		marginTop : 5,
		marginBottom : 10,
		paddingHorizontal : 10,
		fontSize : 13,
		...Platform.select({
			ios : {
				backgroundColor : 'white'
			}
		})
	},
  warning:{
    borderColor : '#CF333F' , 
    borderWidth : 1.5 , 
    borderRadius : 5 
  }
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
    warn : state.mis.issue.warn
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		inputIssue
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(IssueForm);
