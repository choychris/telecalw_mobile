import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , TextInput , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputRedeemCode } from '../actions';

class Redeem extends Component {
	componentWillUnmount(){
		const { inputRedeemCode } = this.props;
		inputRedeemCode(null);
	}
	shouldComponenetUpdate(nextProps){
		const { reward } = this.props;
		return reward !== nextProps.reward;
	}
	render(){
		const { 
			string , 
			reward ,
			inputRedeemCode
		} = this.props;
		return(
			<View style={styles.container}>
				<Text style={styles.title}>
					{string['redeem']}
				</Text>
				<TextInput
					style={styles.input}
					value={(reward && reward !== null) ? reward : ''}
					placeholder={string['inputRedeemCode']}
					onChangeText={(text)=>inputRedeemCode(text)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center',
		paddingVertical : 5,
		marginVertical : 5
	},
	title : {
		marginVertical : 5,
		textAlign : 'center',
		fontFamily : 'Silom',
		color : 'black',
		fontSize : 20,
		fontWeight : 'bold'
	},
	input : {
		alignSelf : 'stretch',
		backgroundColor : 'white',
		height: 40,
		marginTop : 5,
		marginBottom : 5,
		paddingHorizontal : 10,
		fontSize : 15
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		reward : state.transaction.reward
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		inputRedeemCode
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Redeem);
