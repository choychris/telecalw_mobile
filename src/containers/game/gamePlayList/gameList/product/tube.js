import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const tubeImage = require('../../../../../../assets/utilities/tube.png');

class Tube extends Component {
	render(){
		const { onPressFunction , status } = this.props;
		return (
			<TouchableOpacity 
				disabled={status.maintainStatus}
				style={styles.container}
				onPress={()=>onPressFunction()}
			>
				<Image
					style={styles.image}
					source={tubeImage}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		top : Dimensions.get('window').height * 0.01,
		position : 'absolute'
	},
	image : {
		width : Dimensions.get('window').width * 0.45,
		height : Dimensions.get('window').width * 0.45
	}
});

export default connect(null,null)(Tube)

