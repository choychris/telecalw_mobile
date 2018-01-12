import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions , Image , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDeliveryData } from '../../actions';
const coinsImg = require('../../../../../assets/utilities/coins/telecoins_single.png')
import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get('window').height;

class Receipt extends Component {
	componentDidMount(){
		const { deliveryId ,getDeliveryData , navigator } = this.props;
		//console.warn(JSON.stringify(deliveryId));
		getDeliveryData(navigator,deliveryId);
	}
	shouldComponentUpdate(nextProps){
		return nextProps.delivery.id !== undefined;
	}
	_renderLoading(){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" color={'black'}/>
			</View>
		)
	}
	_renderDisplayAddress(address){
		let displayAddress = '';
		displayAddress += Object.keys(address).map((key)=>address[key])
		return displayAddress;
	}
	render(){
		const { delivery , string } = this.props;
		const { tracking , address , cost } = delivery;
		//console.warn(JSON.stringify(delivery));
		return (delivery.id) ? (
			<View style={styles.container}>
				<View style={styles.header}>
					<Icon name="map-marker" size={20}/>
					<Text style={styles.headerText}>
						{string['address']}
					</Text>
				</View>
				<Text style={styles.address}>
					{this._renderDisplayAddress(address)}
				</Text>
				<View style={styles.header}>
					<Icon name="money" size={20}/>
					<Text style={styles.headerText}>
						{string['cost']}
					</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.address}>
						{cost}
					</Text>
					<Image
						source={coinsImg}
						style={styles.image}
						resizeMode={'contain'}
					/>
				</View>
			</View>
		) : this._renderLoading();
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		height : height * 0.4,
		marginVertical : 5
	},
	header : {
		flexDirection : 'row',
		alignItems : 'center',
		padding : 10
	},
	headerText : {
		fontFamily : 'Silom',
		margin : 5,
		fontSize : 20,
		fontWeight : 'bold'
	},
	address : {
		fontFamily : 'Silom',
		padding : 8,
		fontSize : 15,
		fontWeight : 'bold',
		backgroundColor : 'white'
	},
	rightContainer : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		backgroundColor : 'white'
	},
	image : {
		width : 20,
		height : 20
	}
})

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		delivery : state.mis.delivery
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		getDeliveryData
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Receipt);
