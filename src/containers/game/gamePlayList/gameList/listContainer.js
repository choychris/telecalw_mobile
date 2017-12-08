import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { positioningItems } from '../../actions';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';

class ListContainer extends Component {
	_navigateToGameRoom(productId,status){
		const { navigator } = this.props;
		//console.warn(productId);
		if(status === true){

		} else {
			navigator.push({
				screen : 'app.GameRoom',
				navigatorStyle : {
					navBarHidden : true
				}
			});
		}
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderItems(list){
		const { navigator } = this.props;
		return positioningItems(list).map((item,key)=>
			<ItemContainer 
				{...item}
				key={key}
				onPressFunction={(productId,status)=>this._navigateToGameRoom(productId,status)}
			/>)
	}
	render(){
		const { list , tag } = this.props;
		return (
			<View style={styles.container}>
				<Orbit/>
				{(tag !== null && list[tag.id]) ? this._renderItems(list[tag.id]) : null }
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
		list : state.game.list,
		tag : state.game.tag
	}
}

export default connect(mapStateToProps,null)(ListContainer)
