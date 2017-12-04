import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
const coins = {
	single : require('../../../assets/utilities/coins/telecoins_single.png'),
	multi : require('../../../assets/utilities/coins/telecoins_multi.png')
};

class Coins extends Component {
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(){
		return <Text style={styles.text}>90</Text>
	}
	render(){
		return (
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={coins.single}
					resizeMode={'contain'}
				/>
				{this._renderDisplay()}
			</View>
		)
	}
}

export default connect(null,null)(Coins);
