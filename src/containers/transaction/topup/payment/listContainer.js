import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RateItem from './itemContainer';

class RateListContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ds :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}
	componentDidMount(){
		// Fetch Remote Backend API to Get List of Exchage Rate
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderList(rates){
		const { ds } = this.state;
		const dataSource =  ds.cloneWithRows(rates);
		return (
			<ListView
				contentContainerStyle={{ 
					paddingVertical : 20,
					alignSelf : 'stretch',
					flexDirection: 'row',
			   	flexWrap: 'wrap',
					alignItems : 'center',
					justifyContent : 'center'
				}}
				dataSource={dataSource}
				renderRow={(rowData,index)=><RateItem {...rowData} index={index}/>}
			/>
		)
	}
	render(){
		const { rates } = this.props;
		return (rates) ? this._renderList(rates) : this._renderLoading();
	}
}

function mapStateToProps(state) {
	return {
		rates : state.transaction.rates
	}
}

export default connect(mapStateToProps,null)(RateListContainer);
