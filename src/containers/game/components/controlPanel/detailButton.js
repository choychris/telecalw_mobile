import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class DetailButton extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { 
			mode , 
			navigator , 
			slideUpAnimation , 
			slideDownAnimation ,
			string
		} = this.props;
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
				<Icon color='white' name="hand-o-down" size={18} />
				<Text style={styles.detailText}>
					{string['prizeDetail']}
				</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	detailBtn : {
		marginVertical : 10,
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center',
    borderWidth : 1,
    borderColor : '#3184C2',
    borderRadius : 20,
    backgroundColor : '#3184C2',
    padding : 5,
	},
	detailText : {
    marginTop : 5,
		marginHorizontal : 5,
		fontSize : 20,
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    color : 'white'
  }
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(DetailButton)
