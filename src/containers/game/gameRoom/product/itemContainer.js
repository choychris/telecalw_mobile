import React, { PropTypes, Component } from 'react';
import { Image , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductImage extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { image } = this.props;
		const { height , width } = Dimensions.get('window');
		return (image) ? (
			<Image
				source={{ uri : image  }}
				style={{ width : width*0.8 , height : 180 , marginVertical : 10 }}
				resizeMode={'contain'}
			/>
		) : null
	}
}

export default connect(null,null)(ProductImage);
