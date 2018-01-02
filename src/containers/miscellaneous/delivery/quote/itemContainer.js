import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectQuote } from '../../actions';
const coinsImg = require('../../../../../assets/utilities/coins/telecoins_single.png')

class QuoteItem extends Component {
	render(){
		const { 
			courier_id,
			courier_name , 
			coins_value ,
			min_delivery_time,
			max_delivery_time,
			total_charge,
			courier_does_pickup,
			string,
			quote,
			selectQuote
		} = this.props;
		//console.warn(JSON.stringify(quote));
		const selectedStyle = (quote !== null && quote.courier_id == courier_id) ? styles.selected : null;
		return (
			<TouchableOpacity
				style={[styles.container,selectedStyle]}
				onPress={()=>selectQuote({
					courier_id,
					courier_name,
					coins_value,
					total_charge,
					courier_does_pickup,
					min_delivery_time,
					max_delivery_time
				})}
			>
				<View>
					<Text style={styles.text}>
						{courier_name}
					</Text>
					<Text style={styles.text}>
						{`${min_delivery_time}-${max_delivery_time} ${string['days']}`}
					</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.text}>
						{coins_value}
					</Text>
					<Image
						source={coinsImg}
						style={styles.image}
						resizeMode={'contain'}
					/>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : 'row',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'space-between',
		borderRadius : 10,
		backgroundColor : 'black',
		padding : 10,
		margin : 5
	},
	text : {
		fontFamily : 'Silom',
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
	},
	selected : {
		borderColor : '#CF333F',
		borderWidth : 5
	}	
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		quote : state.mis.logistic.quote
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		selectQuote
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(QuoteItem);
