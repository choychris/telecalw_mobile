import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions , KeyboardAvoidingView ,ActivityIndicator ,WebView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDeliveryData } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get('window').height;

class Receipt extends Component {
	componentDidMount(){
		const { deliveryId ,getDeliveryData , navigator } = this.props;
		//console.warn(JSON.stringify(deliveryId));
		getDeliveryData(navigator,deliveryId);
	}
	componentWillUnmount(){

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
	_renderTrackingView(tracking){
		return(
			<WebView
				source={{ uri : tracking }}	
				style={styles.webView}
			/>
		)
	}
	_renderDisplayAddress(address){
		let displayAddress = '';
		displayAddress += Object.keys(address).map((key)=>address[key])
		return displayAddress;
	}
	render(){
		const { delivery , string } = this.props;
		const { tracking , address } = delivery;
		//console.warn(JSON.stringify(delivery));
		return (delivery.id) ? (
			<View style={styles.container}>
				<View style={styles.header}>
					<Icon name="map-marker" size={20}/>
					<Text style={styles.headerText}>{string['address']}</Text>
				</View>
				<Text style={styles.address}>
					{this._renderDisplayAddress(address)}
				</Text>
				<View style={styles.header}>
					<Icon name="truck" size={20}/>
					<Text style={styles.headerText}>{string['tracking']}</Text>
				</View>
				{(tracking) ? this._renderTrackingView(tracking) : null}
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
	webView : {
		width: Dimensions.get('window').width * 0.92 ,
		alignSelf : 'stretch',
		overflow : 'hidden',
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
		padding : 5,
		fontSize : 15,
		fontWeight : 'bold',
		backgroundColor : 'white'
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
