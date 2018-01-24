import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';
import { restartWebrtc } from '../../../../utils/webrtc';
const { height , width } = Dimensions.get('window');

class RefreshButton extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { string ,restartWebrtc } = this.props;
		return (
			<Button
				btnStyle={{
					backgroundColor : 'white',
					paddingVertical : 5,
					paddingHorizontal : 5,
					position : 'absolute',
					bottom : height * 0.57 ,
					left: width * 0.1
				}}
				borderColor={'grey'}
				icon={{ name : 'refresh' , size : 20 , color : 'black' }}
				onPressFunction={()=>restartWebrtc()}
			/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		restartWebrtc
	}, dispatch)
}
export default connect(null,mapDispatchToProps)(RefreshButton)
