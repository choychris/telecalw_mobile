import React, { PropTypes, Component } from 'react';
import { View , Image , StyleSheet , TouchableHighlight , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class Button extends Component {
	constructor(props){
		super(props);
		this.state = { pressIn : false };
	}
	_renderIcon(){
		const { icon } = this.props;
		return <Icon {...icon}/>
	}
	_renderText(displayText,textStyle){
		return(
			<Text style={[styles.text,textStyle]}>
				{displayText}
			</Text>
		)
	}
	render(){
		const { 
			textStyle,
			btnStyle,
			borderColor , 
			onPressFunction , 
			onPressInFunction,
			onPressOutFunction,
			text, 
			string , 
			icon
		} = this.props;
		const { pressIn } = this.state;
		const btnBorder = (pressIn === false) ? styles.nonPressBorder : {};
		const btnBorderColor = (pressIn === false && borderColor) ? { borderColor : borderColor  } : {};
		const displayText = (string[text]) ? string[text] : text;
		return(
			<TouchableHighlight
				onPressIn={()=>{
					if(onPressInFunction) onPressInFunction();
					this.setState({ pressIn : true });
				}}
				onPressOut={()=>{
					if(onPressOutFunction) onPressOutFunction();
					this.setState({ pressIn : false });
				}}
				onPress={()=>(onPressFunction) ? onPressFunction() : null}
				style={[styles.container,btnBorder,btnStyle,btnBorderColor]}
				underlayColor={borderColor}
			>
				<View style={styles.innerContainer}>
					{(icon) ? this._renderIcon() : null}
					{(text) ? this._renderText(displayText,textStyle) : null}
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'center',
		borderRadius : 30
	},
	innerContainer : {
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center'
	},
	nonPressBorder : {
		borderBottomWidth : 3,
		borderRightWidth : 1,
		borderLeftWidth : 1
	},
	text : {
		marginHorizontal : 5,
		textAlign :'center',
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps, null)(Button);
