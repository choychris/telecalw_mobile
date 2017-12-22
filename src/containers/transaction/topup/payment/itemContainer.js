import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;

class RateItem extends Component {
	render(){
		const { coins } = this.props;
		return (
			<TouchableOpacity
				style={{
					backgroundColor : 'red',
					width : width / 2 - 50,
					margin : 10
				}}
			>
				<Text>{coins}</Text>
			</TouchableOpacity>	
		)
	}
}

function mapStateToProps(state) {
	return {
		rate : state.transaction.rate
	}
}

export default connect(mapStateToProps,null)(RateItem);
