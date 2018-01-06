import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar , ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import IssueType from '../cs/issue/issueType';
import IssueForm from '../cs/issue/issueForm';
import { createIssue } from '../actions';
const height = Dimensions.get('window').height;

class CustomerSupport extends Component {
	shouldComponentUpdate(){
		return false;
	}
	_renderContainer(){
		return(
			<ScrollView style={styles.innerContainer}>
				<IssueType/>
				<IssueForm/>
			</ScrollView>
		)
	}
	render(){
		const { navigator , createIssue } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<KeyboardAvoidingView 
					behavior="position" 
					style={styles.keyboardView}
				>
					<MessageBox 
						title={'issueReport'}
						type={'right'}
						content={this._renderContainer()}
						promptString={'issuePrompt'}
						buttons={[
							{
								text : 'confirm',
								textStyle : {
									color : 'white',
									fontSize : 25,
									fontFamily : 'Silom',
									fontWeight : 'bold'
								},
								btnStyle : {
									backgroundColor : '#4C4C4C',
									paddingVertical : 10,
									paddingHorizontal : 15
								},
								onPressFunction : ()=>createIssue()
							}
						]}
					/>
					<Telebot 
						style={styles.telebot}
						status={'postal'} 
						height={height * 0.13} 
						width={height * 0.13}
					/>
				</KeyboardAvoidingView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		backgroundColor : '#263E50'
	},
	innerContainer : {
		height : height * 0.4,
		alignSelf : 'stretch'
	},
	keyboardView: {
		alignSelf : 'stretch' , 
		justifyContent : 'flex-start' , 
		alignItems : 'center' , 
		flex : 1
	},
	telebot : {
		position : 'absolute',
		bottom : -height*0.02,
		right : 0
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		createIssue
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(CustomerSupport);
