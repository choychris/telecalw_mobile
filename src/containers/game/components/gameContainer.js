import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const tubeImage = require('../../../../assets/utilities/sific_tube.png');
import FastImage from 'react-native-fast-image'
import ControlPanel from './controlPanel/container';

class GameContainer extends Component {
	componentWillMount(){
		const { height , width } = Dimensions.get('window');
		this._itemPosition = new Animated.ValueXY({ x : 0 , y : height });
		Animated.spring(this._itemPosition,{
			toValue : { x : 0 , y : 0  }
		}).start();
	}
	_renderUpperTube(){
		return (
			<Animated.Image 
				source={tubeImage}
				style={[styles.image,this._itemPosition.getLayout()]}
				resizeMode={'contain'}	
			/>
		)
	}
	render(){
		return (
			<View style={styles.container}>
				{this._renderUpperTube()}	
				<ControlPanel mode={'room'}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'flex-end'
	},
	image : {
		top : 0,
		position : 'absolute',
		width	: Dimensions.get('window').width,
		height : Dimensions.get('window').height
	}
});

export default connect(null,null)(GameContainer);
