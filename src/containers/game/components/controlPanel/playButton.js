import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigateToGamePlay } from '../../actions';
import Button from '../../../../components/utilities/buttons';


class PlayButton extends Component {
	render(){
		const { navigator , navigateToGamePlay } = this.props;
		return (
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
				onPressFunction={()=>navigateToGamePlay(navigator)}
			/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		navigateToGamePlay
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(PlayButton)
