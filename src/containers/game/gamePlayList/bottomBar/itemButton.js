import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemButton extends Component {
	render(){
		const { name , icon } = this.props;
		return (
			<TouchableOpacity style={styles.container}>
				<Icon name={icon} size={25} color='white'/>
				<Text style={styles.text}>{name}</Text>
			</TouchableOpacity>	
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center',
		height : 55,
		width : 55,
		marginHorizontal : Dimensions.get('window').width / 70,
		backgroundColor : '#5AA1AD',
		borderRadius : 10
	},
	text : {
		color : 'white',
		fontFamily : 'Silom'
	}
});

export default connect(null,null)(ItemButton);
