import React, { PropTypes, Component } from 'react';
import { BackHandler , ScrollView , Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
const boardImg = require('../../../../../assets/utilities/board.png');
import ProductImage from './itemContainer';
const DeviceInfo = require('react-native-device-info');

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
	componentWillUnmount(){
		const { navigator , slideDownAnimation } = this.props;
		navigator.dismissModal({ animationType : 'slide-down' });
		slideDownAnimation();
	}
	shouldComponentUpdate(){
		return false;
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
	_renderProductImage(images){
		return(
			<ScrollView style={styles.scrollView}>
				{images.map((image,index)=><ProductImage image={image} key={index}/>)}
			</ScrollView>
		) 
	}
	render(){
		const { 
			navigator , 
			slideDownAnimation ,
			product,
			locale,
			string
		} = this.props;
		const { 
			name ,
			description ,
			size ,
			weight,
			images
		} = product;
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
							{string['prizeDetail']}
						</Text>
					</TouchableOpacity>
					<View style={styles.detailContainer}>
						<Text style={styles.title}>{(name[locale]) ? name[locale] : name['en']}</Text>
						{(description['en']) ? <Text style={styles.desc}>{(description[locale]) ? description[locale] : description['en'] }</Text>: null}
						<View style={styles.infoContainer}>
							<Text style={styles.info}>
								{`${string['width']}:${size.width}${size.unit}`}
							</Text>
							<Text style={styles.info}>
								{`${string['height']}:${size.height}${size.unit}`}
							</Text>
							<Text style={styles.info}>
								{`${string['weight']}:${weight.value}${weight.unit}`}
							</Text>
						</View>
						{(images && images.product) ? this._renderProductImage(images.product) : null}
					</View>
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
	detailContainer : {
		flex : 1,
		backgroundColor : 'transparent',
		alignSelf : 'stretch',
		alignItems : 'center',
		paddingVertical : 10
	},
	infoContainer : {
		flexDirection : 'row',
		backgroundColor : 'transparent'
	},
	scrollView : {
		flex : 1
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
		alignSelf : 'stretch',
		marginVertical : 5,
		backgroundColor : 'transparent',
		paddingVertical : (DeviceInfo.getModel() === 'iPhone X') ? 30 : 10
	},
	btnText : {
		marginHorizontal : 5,
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 20
	},
	title : {
		marginVertical : 10,
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 30
	},
	desc : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 18
	},
	info : {
		marginVertical : 5,
		marginHorizontal : 8,
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 16,
		color : 'grey'
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		locale : state.preference.language.locale,
		product : state.game.product
	}
}

export default connect(mapStateToProps,null)(ProductDetailContainer);
