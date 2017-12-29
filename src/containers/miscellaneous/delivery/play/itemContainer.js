import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
import { formatTimeStamp } from '../../../../utils/format';

class PlayItem extends Component {
	_productName(name){
		const { locale } = this.props;
		return (name[locale]) ? name[locale] : name['en'];
	}
	render(){
		const { product , created , ended } = this.props;
		const { name } = product;
		//console.warn(JSON.stringify(product));
		return (
			<TouchableOpacity
				style={[styles.container]}
			>
				<Text style={styles.text}>
					{formatTimeStamp(ended)}
				</Text>
				<Text style={styles.text}>
					{this._productName(name)}
				</Text>
			</TouchableOpacity>	
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center',
		borderRadius : 10,
		backgroundColor : 'black',
		width : width / 2 - 35,
		padding : 10,
		margin : 5
	},
	text : {
		fontFamily : 'Silom',
		color : '#30D64A',
		fontSize : 16,
		marginVertical : 2
	},
	image : {
		width : 30,
		height : 30,
		marginRight : 10
	},
	selectedBorder : {
		borderColor : '#CF333F',
		borderWidth : 5
	}
});

function mapStateToProps(state) {
	return {
		locale : state.preference.language.locale
	}
}

export default connect(null,null)(PlayItem)
