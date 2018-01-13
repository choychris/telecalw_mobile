import React, { PropTypes, Component } from 'react';
import { Image , ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatTimeStamp } from '../../../../utils/format';
const coinsImg = require('../../../../../assets/utilities/coins/telecoins_single.png')

class TransactionItem extends Component {
	render(){
		const { 
			created , 
			action , 
			status ,
			string ,
			amount , 
			transactionType
		} = this.props;
		const actionSign = (action === 'plus') ? '+' : '-';
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>
						{`${string['date']} : ${formatTimeStamp(created)}`}
					</Text>
					<Text style={styles.text}>
						{(transactionType) ? string[transactionType] : null }
					</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.text}>
						{`${actionSign}${amount}`}
					</Text>
					<Image
						source={coinsImg}
						style={styles.image}
						resizeMode={'contain'}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'space-between',
		alignSelf : 'stretch',
		borderRadius : 10,
		backgroundColor : 'black',
		padding : 10,
		margin : 5
	},
	text : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		color : '#30D64A',
		fontSize : 16,
		marginVertical : 2
	},
	rightContainer : {
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center'
	},
	image : {
		marginLeft : 5,
		width : 20,
		height : 20
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(TransactionItem);
