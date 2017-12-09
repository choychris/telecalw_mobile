import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class RoomPanel extends Component {
	render(){
		const { mode , navigator , slideUpAnimation , slideDownAnimation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.column}>
					<Button
						text={'play'}
						textStyle={{
							color : 'white',
							fontSize : 25,
							fontFamily : 'Silom',
							fontWeight : 'bold'
						}}
						btnStyle={{
							backgroundColor : '#5DD39E',
							paddingVertical : 16,
							paddingHorizontal : 35
						}}
						borderColor={'#31845C'}
						icon={{ name : 'play' , size : 18 , color : 'white' }}
						onPressFunction={()=>{}}
					/>
					<TouchableOpacity 
						style={styles.detailBtn}
						onPress={
							()=>{
								navigator.showModal({
									screen : 'app.ProductDetail',
									animationType : 'slide-up',
									passProps : {
										slideDownAnimation : slideDownAnimation
									},
									navigatorStyle: {
										navBarHidden: true
									}
								});
								slideUpAnimation();
							}
						}
					>
						<Icon name="hand-o-down" size={18} />
						<Text style={styles.detailText}>{'Prize Detail'}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.column}>
					<Button
						text={'switch'}
						textStyle={{
							color : '#3F3F3F',
							fontSize : 20,
							fontFamily : 'Silom',
							fontWeight : 'bold'
						}}
						btnStyle={{
							backgroundColor : '#FFFF00',
							paddingVertical : 8,
							paddingHorizontal : 15,
							marginVertical : 3
						}}
						borderColor={'#726E1D'}
						icon={{ name : 'exchange' , size : 18 , color : '#3F3F3F' }}
						onPressFunction={()=>{}}
					/>
					<Button
						text={'topUp'}
						textStyle={{
							color : '#3F3F3F',
							fontSize : 20,
							fontFamily : 'Silom',
							fontWeight : 'bold'
						}}
						btnStyle={{
							backgroundColor : '#FFFF00',
							paddingVertical : 8,
							paddingHorizontal : 15,
							marginVertical : 3
						}}
						borderColor={'#726E1D'}
						icon={{ name : 'money' , size : 18 , color : '#3F3F3F' }}
						onPressFunction={()=>{}}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		height : Dimensions.get('window').height * 0.16,	
		flexDirection : 'row',
		alignSelf : 'stretch',
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'center'
	},
	column : {
		paddingHorizontal : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	},
	detailBtn : {
		marginVertical : 5,
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center'
	},
	detailText : {
		marginHorizontal : 5,
		fontSize : 18,
		fontWeight : 'bold',
		fontFamily : 'Silom'
	}
});

export default connect(null,null)(RoomPanel)
