import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { playUISound } from '../../utils/sound';
import Icon from 'react-native-vector-icons/FontAwesome';

class Back extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { navigator , playUISound } = this.props;
		return (
			<TouchableOpacity 
				style={styles.button}
				onPress={()=>{
					playUISound('cancel');
					navigator.pop();
				}}
			>
				<Icon 
					name="angle-left" 
					size={40}
					color="white"
				/>
			</TouchableOpacity>	
		)
	}
}

const styles = StyleSheet.create({
	button : {
		backgroundColor : 'transparent',
		paddingHorizontal : 5
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		playUISound
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Back);
