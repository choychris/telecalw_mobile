import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProductInfo from './product/info';
import ProductImage from './product/image';
import Tube from './product/tube';

class ItemContainer extends Component {
	componentWillMount(){
		const { position } = this.props;
		const { x , y } = position;
		this._itemPosition = new Animated.ValueXY();
		Animated.spring(this._itemPosition,{
			toValue : { x : x , y : y }
		}).start();
	}
	render(){
		return(
			<Animated.View style={this._itemPosition.getLayout()}>
				<View style={styles.container}>
					<Tube/>
					<ProductImage/>
					<ProductInfo/>
				</View>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center',
		backgroundColor : 'transparent'
	}
});

export default connect(null,null)(ItemContainer)

