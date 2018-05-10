import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , Image , 
         ActivityIndicator, StyleSheet , 
         Dimensions, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { positioningItems , navigateToGameRoom } from '../../actions';
import { playUISound } from '../../../../utils/sound';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';
import Poster from '../miniGamePoster/posterList';

class ListContainer extends Component {
	shouldComponentUpdate(nextProps){
		const { tag , products } = this.props;
		return tag !== nextProps.tag || products !== nextProps.products;
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderItems(products){
		const { 
			navigator , 
			navigateToGameRoom ,
			playUISound 
		} = this.props;
		return positioningItems(products).map((item,key)=>
			<ItemContainer 
				{...item}
				key={key}
				onPressFunction={(productId,status)=>{
					playUISound('click2');
					navigateToGameRoom(productId,status,navigator);
				}}
			/>)
	}
	render(){
		const { products , tag, navigator } = this.props;
		return (
			<View style={styles.container}>
				<Orbit/>
				{(tag !== null && products[tag.id]) ? this._renderItems(products[tag.id]) : null }
        <Poster navigator={navigator}/>
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
		navigateToGameRoom,
		playUISound
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListContainer)
