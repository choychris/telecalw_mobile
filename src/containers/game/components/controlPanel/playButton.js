import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initGamePlay } from '../../actions';
import Button from '../../../../components/utilities/buttons';

class PlayButton extends Component {
	constructor(props){
		super(props);
		this.state = { loading : false  , disable : false };
	}
	shouldComponentUpdate(nextProps,nextState){
		const { loading , disable } = this.state;
		return nextState.loading !== loading || nextState.disable !== disable;	
	}
	render(){
		const { loading , disable } = this.state;
		const { navigator , initGamePlay } = this.props;
		return (
			<Button
				disable={disable}
				loading={loading}
				text={'play'}
				textStyle={{
					color : 'white',
					fontSize : 25,
					fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
				}}
				btnStyle={{
					backgroundColor : '#5DD39E',
					paddingVertical : 16,
					paddingHorizontal : 35
				}}
				borderColor={'#31845C'}
				icon={{ name : 'play' , size : 18 , color : 'white' }}
				onPressFunction={()=>{
					this.setState({ loading : true , disable : true });
					initGamePlay(navigator);
				}}
			/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		initGamePlay
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(PlayButton)
