import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListContainer extends Component {
	render(){
		return (
			<View>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		tag : state.game.tag,
		list : state.game.list
	}
}

export default connect(mapStateToProps,null)(ListContainer)
