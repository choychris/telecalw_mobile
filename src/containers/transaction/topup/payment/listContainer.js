import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { exchangeRate } from '../../actions';
import RateItem from './itemContainer';
const height = Dimensions.get('window').height;

class RateListContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ds :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}
	componentDidMount(){
		// Fetch Remote Backend API to Get List of Exchage Rate
		const { exchangeRate , navigator } = this.props;
		//exchangeRate(navigator);
	}
	shouldComponentUpdate(nextProps){
		return nextProps.rates.length > 0;
	}
	_renderLoading(){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" color={'black'}/>
			</View>
		)
	}
	_renderList(rates){
		const { ds } = this.state;
		const dataSource =  ds.cloneWithRows(rates);
		return (
			<ListView
				style={styles.listWrapper}
				contentContainerStyle={styles.listContainer}
				dataSource={dataSource}
				renderRow={(rowData)=><RateItem {...rowData}/>}
			/>
		)
	}
	render(){
		const { rates } = this.props;
		return (
			<View style={[styles.container,styles.listWrapper]}>
				<Text style={styles.text}>{'Coming Soon ...'}</Text>		
			</View>
		)
		//return (rates && rates.length > 0) ? this._renderList(rates) : this._renderLoading();
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center',
		paddingVertical : 50
	},
	listWrapper : {
		alignSelf : 'stretch',
		height : height * 0.4
	},
	listContainer : {
		paddingVertical : 10,
		alignSelf : 'stretch',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems : 'center',
		justifyContent : 'center'
	},
	text : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
	}
});

function mapStateToProps(state) {
	return {
		rates : state.transaction.rates
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		exchangeRate
	}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(RateListContainer);
