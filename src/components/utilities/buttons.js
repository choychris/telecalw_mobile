import React, { PropTypes, Component } from 'react';
import { View , Image , StyleSheet , TouchableHighlight , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Button extends Component {
	constructor(props){
		super(props);
		this.state = { pressIn : false };
	}
	render(){
		const { text , textColor , btnColor , borderColor , onPressFunction } = this.props;
		const { pressIn } = this.state;
		const btnTextColor = { color : textColor };
		const btnBackgroundColor = { backgroundColor : btnColor };
		const btnBorder = (pressIn === false) ? styles.nonPressBorder : {};
		const btnBorderColor = (pressIn === false && borderColor) ? { borderColor : borderColor  } : {};
		return(
			<TouchableHighlight
				onPressIn={()=>this.setState({ pressIn : true })}
				onPressOut={()=>this.setState({ pressIn : false })}
				onPress={()=>(onPressFunction) ? onPressFunction() : null}
				style={[styles.container,btnBorder,btnBackgroundColor,btnBorderColor]}
				underlayColor={btnColor}
			>
				<Text 
					style={[styles.text,btnTextColor]}
				>
					{text}
				</Text>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'center',
		borderRadius : 30
	},
	nonPressBorder : {
		borderBottomWidth : 3,
		borderRightWidth : 6
	},
	text : {
		margin : 10,
		paddingVertical : 5,
		paddingHorizontal : 20,
		textAlign :'center',
		fontSize : 25,
		fontWeight : 'bold',
		fontFamily : 'Bauhaus 93'
	}
});

export default connect(null, null)(Button);
