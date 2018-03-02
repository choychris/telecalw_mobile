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
				textStyle={{
					color : '#3F3F3F',
					fontSize : 20,
					fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
				}}
				btnStyle={{
					backgroundColor : '#FFFF00',
					paddingVertical : 6,
					paddingHorizontal : 15,
					marginVertical : 3
				}}
				borderColor={'#726E1D'}
				icon={{ name : 'money' , size : 18 , color : '#3F3F3F' }}
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

function mapStateToProps(state) {
	return {
		version : state.mis.version
	}
}

export default connect(mapStateToProps,null)(TopUpButton)
