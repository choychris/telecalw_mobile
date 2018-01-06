import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { transactions } from '../../actions';
import TransactionItem from './itemContainer';
const height = Dimensions.get('window').height;

class TransactionListContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ds :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}
	componentDidMount(){
		// Fetch Remote Backend API to Get List of Transactions
		const { transactions } = this.props;
		transactions();
	}
	shouldComponentUpdate(nextProps){
		const { transactionsData } = this.props;
		return (transactionsData.length !== nextProps.transactionsData.length);
	}
	_renderLoading(){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" color={'black'}/>
			</View>
		)
	}
	_renderList(transactions){
		const { ds } = this.state;
		const dataSource =  ds.cloneWithRows(transactions);
		return (
			<ListView
				style={styles.listWrapper}
				contentContainerStyle={styles.listContainer}
				dataSource={dataSource}
				renderRow={(rowData)=><TransactionItem {...rowData}/>}
			/>
		)
	}
	render(){
		const { transactionsData } = this.props;
		return (transactionsData &&  transactionsData.length > 0) ? this._renderList(transactionsData) : this._renderLoading();
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
		height : height * 0.4,
		marginBottom : 50
	},
	listContainer : {
		padding : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		transactionsData : state.transaction.transactions
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		transactions
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionListContainer);
