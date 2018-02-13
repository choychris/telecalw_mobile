import React, { PropTypes, Component } from 'react';
import { Animated , Image , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductImage extends Component {
	constructor(props){
		super(props);
		this._animation = new Animated.Value(0);
	}
	shouldComponentUpdate(){
		return false;
	}
	_startAnimation(){
		Animated.timing(this._animation,{
			toValue : 1,
			duration : 2000
		}).start();
	}
	render(){
		const { image } = this.props;
		const { height , width } = Dimensions.get('window');
		return (image) ? (
			<Animated.Image
				source={{ uri : image  }}
				style={[
					{ opacity : this._animation },
					{ width : width*0.8 , height : 180 , marginVertical : 10 }
				]}
				onLoad={this._startAnimation()}
				resizeMode={'contain'}
			/>
		) : null
	}
}

export default connect(null,null)(ProductImage);
