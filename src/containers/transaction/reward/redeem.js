import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , TextInput , StyleSheet , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputRedeemCode } from '../actions';

class Redeem extends Component {
	componentWillUnmount(){
		const { inputRedeemCode } = this.props;
		inputRedeemCode(null);
	}
	shouldComponenetUpdate(nextProps){
		const { reward ,version } = this.props;
		return reward !== nextProps.reward || version !== nextProps.version;
	}
	render(){
		const { 
			string , 
			reward ,
			inputRedeemCode,
			version
		} = this.props;
		const { release } = version;
		return (version.release === true) ? (
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
		) : null;
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
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		color : 'black',
		fontSize : 20
	},
	input : {
		alignSelf : 'stretch',
		marginTop : 5,
		marginBottom : 5,
		paddingHorizontal : 10,
		fontSize : 15,
		...Platform.select({
			ios : {
				backgroundColor : 'white',
				height: 40
			}
		})
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		reward : state.transaction.reward,
		version : state.mis.version
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		inputRedeemCode
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Redeem);
