import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const testProductImage = require('../../../../../../assets/utilities/bear.png');

class ProductImage extends Component {
	shouldComponentUpdate(nextProps){
		const { images , status } = this.props;
		return images !== nextProps.images || status !== nextProps.status;
	}
	render(){
		const { 
			status , 
			id , 
			onPressFunction ,
			images
		} = this.props;
		return (
			<TouchableOpacity 
				disabled={status.maintainStatus}
				style={styles.container}
				onPress={()=>onPressFunction(id,status.maintainStatus)}
			>
				<Image
					style={styles.image}
					source={(images && images.thumbnail) ? { uri : images.thumbnail } : testProductImage}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		top : Dimensions.get('window').height * 0.11,
		position : 'absolute'
	},
	image : {
		width : Dimensions.get('window').width * 0.15,
		height : Dimensions.get('window').width * 0.15
	}
});

export default connect(null,null)(ProductImage)
