import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const coinImage = require('../../../../../../assets/utilities/coins/telecoins_single.png');
import Signal from './signal';

class ProductInfo extends Component {
	_productName(){
		const { locale , name } = this.props;
		return (name[locale]) ? name['locale'] : name['en'];
	}
	render(){
		const { 
			onPressFunction ,
			status,
			gamePlayRate
		} = this.props;
		const { maintainStatus } = status;
		return (
			<TouchableOpacity 
				onPress={()=>onPressFunction()}
				disabled={maintainStatus}
			>
				<View style={styles.row}>
					<Signal {...status}/>
					<Text style={styles.text}>
						{this._productName()}
					</Text>
				</View>
				<View style={styles.row}>
					<Image
						style={styles.image}
						source={coinImage}
						resizeMode={'contain'}
					/>
					<Text style={styles.text}>
						{gamePlayRate}
					</Text>
				</View>
			</TouchableOpacity>
		)	
	}
}

const styles = StyleSheet.create({
	text : {
		fontSize : 15,
		color : 'white',
		fontFamily : 'Silom'
	},
	row : {
		flexDirection : 'row',
		alignItems : 'center'
	},
	image : {
		width : 18,
		height : 18,
		marginHorizontal : 5
	}
});

function mapStateToProps(state) {
	return {
		locale : state.preference.language.locale,
	}
}

export default connect(null,null)(ProductInfo)
