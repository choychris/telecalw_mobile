import React, { PropTypes, Component } from 'react';
import { ListView , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuoteItem from './itemContainer';
const height = Dimensions.get('window').height;

class QuoteSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			ds :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}
	shouldComponentUpdate(nextProps){
		return false;
	}
	_renderLoading(){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" color={'black'}/>
			</View>
		)
	}
	_renderList(quotes){
		const { ds } = this.state;
		const dataSource = (Array.isArray(quotes) === true) ? ds.cloneWithRows(quotes) : ds.cloneWithRows([quotes]);
		return(
			<ListView
				style={styles.listWrapper}
				dataSource={dataSource}
				renderRow={(rowData)=><QuoteItem {...rowData}/>}
			/>
		)
	}
	render(){
		const { quotes } = this.props;
		//console.warn(JSON.stringify(quotes));
		return (quotes.length > 0) ? this._renderList(quotes) : this._renderLoading();
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
		marginVertical : 10
	}
});

function mapStateToProps(state) {
	return {
		quotes : state.mis.logistic.quotes
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(QuoteSelect);
