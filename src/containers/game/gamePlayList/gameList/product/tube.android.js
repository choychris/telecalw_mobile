import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const tubeImage = require('../../../../../../assets/utilities/tube.png');

class Tube extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { 
			onPressFunction , 
			status ,
			id
		} = this.props;
		return (
			<TouchableOpacity 
				disabled={status.maintainStatus}
				style={styles.container}
				onPress={()=>onPressFunction(id,status.maintainStatus)}
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
		top : Dimensions.get('window').height * -0.05,
	},
	image : {
		width : Dimensions.get('window').width * 0.4,
		height : Dimensions.get('window').width * 0.4
	}
});

export default connect(null,null)(Tube)
