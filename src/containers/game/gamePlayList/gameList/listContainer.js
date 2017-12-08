import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';

class ListContainer extends Component {
	_navigateToGameRoom(productId){
		const { navigator } = this.props;
		//console.warn(productId);
		navigator.push({
			screen : 'app.GameRoom',
			navigatorStyle : {
				navBarHidden : true
			}
		});
	}
	_renderItems(){
		const { navigator } = this.props;
		const screenWidth = Dimensions.get('window').width;
		const screenHeight = Dimensions.get('window').height;
		const sampleList = [
			{ position : { x : -screenWidth/3 , y : -screenHeight*0.1 } },
			{ position : { x : 0 , y : -screenHeight*0.24 } },
			{ position : { x : screenWidth/3 , y : -screenHeight*0.2 } },
			{ position : { x : -screenWidth/3 , y : 0 } },
			{ position : { x : 0 , y : screenHeight*0.07 } },
			{ position : { x : screenWidth/3 , y : -screenHeight*0.1 } },
		];
		return sampleList.map((item,key)=>
			<ItemContainer 
				position={item.position} 
				key={key}
				onPressFunction={(productId)=>this._navigateToGameRoom(productId)}
			/>)
	}
	render(){
		const { tag , list } = this.props;
		//console.warn(JSON.stringify(tag));
		//console.warn(JSON.stringify(list));
		return (
			<View style={styles.container}>
				<Orbit/>
				{this._renderItems()}
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
		tag : state.game.tag,
		list : state.game.list
	}
}

export default connect(mapStateToProps,null)(ListContainer)
