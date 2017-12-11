import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class DetailButton extends Component {
	render(){
		const { mode , navigator , slideUpAnimation , slideDownAnimation } = this.props;
		return(
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
		)
	}
}

const styles = StyleSheet.create({
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

export default connect(null,null)(DetailButton)
