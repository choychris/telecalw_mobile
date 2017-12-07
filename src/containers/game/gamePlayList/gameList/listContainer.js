import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';

class ListContainer extends Component {
	_renderItems(){
		const screenWidth = Dimensions.get('window').width;
		const sampleList = [
			{ position : { x : -screenWidth/3 , y : -100 } },
			{ position : { x : 0 , y : -180 } },
			{ position : { x : screenWidth/3 , y : -140 } },
			{ position : { x : -screenWidth/3 , y : 0 } },
			{ position : { x : 0 , y : 45 } },
			{ position : { x : screenWidth/3 , y : -40 } },
		];
		return sampleList.map((item,key)=><ItemContainer position={item.position} key={key}/>)
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
