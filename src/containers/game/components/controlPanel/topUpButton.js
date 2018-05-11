import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class TopUpButton extends Component {
	shouldComponentUpdate(nextProps){
		const { version } = this.props;
		return version !== nextProps.version;
	}
	render(){
		const { navigator , version } = this.props;
		return (version.release === true) ? (
			<Button
				text={'topUp'}
				textStyle={styles.textStyle}
				btnStyle={styles.btnStyle}
				borderColor={'#726E1D'}
				icon={{ name : 'heart' , size : 22 , color : 'red' }}
				onPressFunction={()=>{
					navigator.push({
						screen : 'app.TopUp',
						navigatorStyle : {
							navBarHidden : true
						}
					});
				}}
			/>
		) : null
	}
}

const styles = StyleSheet.create({
  btnStyle : {
    backgroundColor : '#F9A115',
    paddingVertical : 6,
    paddingHorizontal : 15,
    marginVertical : 3
  },
  textStyle : {
    color : 'white',
    fontSize : 22,
    fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
  }
})

function mapStateToProps(state) {
	return {
		version : state.mis.version
	}
}

export default connect(mapStateToProps,null)(TopUpButton)
