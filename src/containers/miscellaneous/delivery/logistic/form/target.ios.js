import React, { PropTypes, Component } from 'react';
import { View , Text , Switch , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TargetForm extends Component { 
	render(){
		const { 
			target,
			dispatchFunction 
		} = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{'To Others'}
				</Text>
				<Switch
					value={(target === 'user')}
					onValueChange={(value)=>{
						const updateTarget = (value === true) ? 'user' : 'logistic';
						//console.warn(updateTarget);
						dispatchFunction(updateTarget);
					}}
				/>
				<Text style={styles.text}>
					{'To MySelf'}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flexDirection : 'row',
		justifyContent : 'center',
		alignItems : 'center',
		paddingVertical : 5,
		marginVertical : 5,
		backgroundColor : 'white'
	},
	text : {
		paddingHorizontal : 10,
		fontFamily : 'Silom',
		fontSize : 18
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		target : state.mis.logistic.target
	}
}

export default connect(mapStateToProps,null)(TargetForm)
