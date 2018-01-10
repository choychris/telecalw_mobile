import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class TopUpButton extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { navigator } = this.props;
		return (
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
				onPressFunction={()=>{
					navigator.push({
						screen : 'app.TopUp',
						navigatorStyle : {
							navBarHidden : true
						}
					});
				}}
			/>
		)
	}
}

export default connect(null,null)(TopUpButton)
