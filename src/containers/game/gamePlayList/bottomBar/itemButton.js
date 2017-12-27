import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemButton extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { 
			name , 
			icon , 
			navigate , 
			navigator ,
			string
		} = this.props;
		return (
			<TouchableOpacity 
				style={styles.container}
				onPress={()=>{
					navigator.push({
						screen : navigate,
						navigatorStyle : {
							navBarHidden : true
						}
					});
				}}
			>
				<Icon name={icon} size={25} color='white'/>
				<Text style={styles.text}>{string[name]}</Text>
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

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(ItemButton);
