import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
const boardImg = require('../../../../../assets/utilities/board.png');

class ProductDetailContainer extends Component {
	componentWillMount(){
		const { height , width } = Dimensions.get('window');
		this._itemPosition = new Animated.ValueXY({ x : 0 , y : height });
	}
	componentDidMount(){
		Animated.spring(this._itemPosition,{
			toValue : { x : 0 , y : 0  }
		}).start();
	}
	_renderBoard(){
		return (
			<Image
				source={boardImg}	
				style={styles.image}
				resizeMode={'stretch'}	
			/>
		)
	}
	render(){
		const { navigator , slideDownAnimation } = this.props;
		return (
			<View style={styles.container}>
				<Animated.View style={[styles.container,this._itemPosition.getLayout()]}>
					{this._renderBoard()}
					<TouchableOpacity
						style={styles.button}
						onPress={()=>{
							navigator.dismissModal({ animationType : 'slide-down' });
							slideDownAnimation();
						}}
					>
						<Icon name="hand-o-up" size={18} />
						<Text style={styles.btnText}>
							{'Product Detail'}
						</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignSelf : 'stretch',
		alignItems : 'center',
		backgroundColor : '#263E50'
	},
	image : {
		position : 'absolute',
		width	: Dimensions.get('window').width * 0.95,
		height : Dimensions.get('window').height
	},
	button : {
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center',
		marginVertical : 15,
		backgroundColor : 'transparent'
	},
	btnText : {
		marginHorizontal : 5,
		fontFamily : 'Silom',
		fontSize : 20
	}
});

export default connect(null,null)(ProductDetailContainer);
