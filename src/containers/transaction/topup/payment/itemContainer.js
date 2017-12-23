import React, { PropTypes, Component } from 'react';
import { Image , ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectRate } from '../../actions';
const coinsImg = {
	single : require('../../../../../assets/utilities/coins/telecoins_single.png'),
	multi : require('../../../../../assets/utilities/coins/telecoins_multi.png')
};
const width = Dimensions.get('window').width;

class RateItem extends Component {
	render(){
		const { 
			coins , 
			rate , 
			string ,
			currency,
			userCurrency,
			selectRate,
			index
		} = this.props;
		const rateImg = (coins >= 300) ? coinsImg['multi'] : coinsImg['single'];
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={()=>selectRate(index)}
			>
				<Image
					source={rateImg}
					style={styles.image}
					resizeMode={'contain'}
				/>
				<View>
					<Text style={styles.text}>
						{`${coins} ${string['coins']}`}
					</Text>
					<Text style={styles.text}>
						{`${currency[userCurrency]['value']} ${userCurrency}`}
					</Text>
				</View>
			</TouchableOpacity>	
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flexDirection : 'row',
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
	}
});

function mapStateToProps(state) {
	return {
		rate : state.transaction.rate,
		string : state.preference.language.string,
		userCurrency : state.preference.currency
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		selectRate
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RateItem);
