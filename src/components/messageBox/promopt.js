import React, { PropTypes, Component } from 'react';
import { View , Image , StyleSheet , Dimensions , Text , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Prompt extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { string , promptString } = this.props;
		return(
			<View style={styles.container}>
				<Text style={styles.text}>
					{string[promptString]}
				</Text>	
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		backgroundColor : 'black',
		padding : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	},
	text : {
		color : '#30D64A',
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 15
	}
})

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps, null)(Prompt);

