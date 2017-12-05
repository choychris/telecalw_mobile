import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserWallet } from '../../containers/auth/actions';
import styles from './styles';
const coins = {
	single : require('../../../assets/utilities/coins/telecoins_single.png'),
	multi : require('../../../assets/utilities/coins/telecoins_multi.png')
};

class Coins extends Component {
	componentDidMount(){
		const { getUserWallet , navigator } = this.props;
		getUserWallet(navigator);
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(balance){
		return <Text style={styles.text}>{balance}</Text>
	}
	render(){
		const { wallet } = this.props;
		return (
			<TouchableOpacity style={styles.container}>
				<Image
					style={styles.image}
					source={coins.single}
					resizeMode={'contain'}
				/>
				{(wallet.balance) ? this._renderDisplay(wallet.balance) : this._renderLoading()}
			</TouchableOpacity>
		)
	}
}

function mapStateToProps(state) {
	return {
		wallet : state.auth.wallet
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		getUserWallet
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Coins);
