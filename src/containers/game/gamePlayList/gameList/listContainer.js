import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { positioningItems , navigateToGameRoom } from '../../actions';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';

class ListContainer extends Component {
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderItems(products){
		const { navigator , navigateToGameRoom } = this.props;
		return positioningItems(products).map((item,key)=>
			<ItemContainer 
				{...item}
				key={key}
				onPressFunction={(productId,status)=>navigateToGameRoom(productId,status,navigator)}
			/>)
	}
	render(){
		const { products , tag } = this.props;
		return (
			<View style={styles.container}>
				<Orbit/>
				{(tag !== null && products[tag.id]) ? this._renderItems(products[tag.id]) : null }
				<Planet/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		products : state.game.products,
		tag : state.game.tag
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		navigateToGameRoom
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListContainer)
