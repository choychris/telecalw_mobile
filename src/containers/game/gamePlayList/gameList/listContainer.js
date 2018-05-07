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
const { height, width } = Dimensions.get('window');
//const forthPosition = (Platform.OS === 'ios') ? { x : -width/3 , y : 0 } : {x : 0 - 20 , y : height / 2.7};
const fifthPosition = (Platform.OS === 'ios') ? { x : 0 , y : height*0.04 } : {x : width / 3 - 10 , y : height * 0.46};

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
        <Poster position={fifthPosition} navigator={navigator}/>
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
