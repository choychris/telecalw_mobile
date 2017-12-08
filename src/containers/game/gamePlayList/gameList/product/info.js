import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const coinImage = require('../../../../../../assets/utilities/coins/telecoins_single.png');
import Signal from './signal';

class ProductInfo extends Component {
	render(){
		const { onPressFunction } = this.props;
		return (
			<TouchableOpacity onPress={()=>onPressFunction()}>
				<View style={styles.row}>
					<Signal status={'avaliable'}/>
					<Text style={styles.text}>{'Little Bear'}</Text>
				</View>
				<View style={styles.row}>
					<Image
						style={styles.image}
						source={coinImage}
						resizeMode={'contain'}
					/>
					<Text style={styles.text}>{'19'}</Text>
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

export default connect(null,null)(ProductInfo)
