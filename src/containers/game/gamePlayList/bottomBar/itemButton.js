import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions , TouchableOpacity , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class ItemButton extends Component {
	shouldComponentUpdate(nextProps){
		const { language } = this.props;
		return language.locale !== nextProps.language.locale;
	}
	render(){
		const { 
			name , 
			icon , 
			navigate , 
			navigator ,
			language
		} = this.props;
		const { string } = language;
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
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
	}
});

function mapStateToProps(state) {
	return {
		language : state.preference.language
	}
}

export default connect(mapStateToProps,null)(ItemButton);
