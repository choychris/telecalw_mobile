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
		const { navigator , onPressFunction , name , status , gamePlayRate , id , images } = this.props;
		const disableStyle = (status.maintainStatus === true) ? { opacity : 0.3 } : null;
		return (status.visible === true) ?(
			<Animated.View style={this._itemPosition.getLayout()}>
				<View style={[styles.container,disableStyle]}>
					<Tube 
						id={id}
						status={status}
						onPressFunction={onPressFunction}
					/>
					<ProductImage 
						id={id}
						status={status}
						images={images}
						onPressFunction={onPressFunction}
					/>
					<ProductInfo 
						id={id}
						name={name}
						status={status}
						gamePlayRate={gamePlayRate}
						onPressFunction={onPressFunction}
					/>
				</View>
			</Animated.View>
		) : null ;
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

