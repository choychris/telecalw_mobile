import React, { PropTypes, Component } from 'react';
import { View , Image , StyleSheet , TouchableHighlight , Text , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { playUISound } from '../../utils/sound';
import Icon from 'react-native-vector-icons/FontAwesome';

class Button extends Component {
	constructor(props){
		super(props);
		this.state = { pressIn : false };
	}
	shouldComponentUpdate(nextProps,nextState){
		const { disable , btnStyle , loading } = this.props;
		const { pressIn } = this.state;
		return (disable !== nextProps.disable ||pressIn !== nextState.pressIn || btnStyle !== nextProps.btnStyle || loading !== nextProps.loading)
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
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
	_renderInnerContainer(icon,text,displayText,textStyle){
		return(
			<View style={styles.innerContainer}>
				{(icon) ? this._renderIcon() : null}
				{(text) ? this._renderText(displayText,textStyle) : null}
			</View>
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
			icon ,
			disable,
			loading,
			playUISound
		} = this.props;
		const { pressIn } = this.state;
		const btnBorder = (pressIn === false) ? styles.nonPressBorder : {};
		const btnBorderColor = (pressIn === false && borderColor) ? { borderColor : borderColor  } : {};
		const displayText = (string[text]) ? string[text] : text;
		return(
			<TouchableHighlight
				disabled={disable}
				onPressIn={()=>{
					if(onPressInFunction) onPressInFunction();
					this.setState({ pressIn : true });
				}}
				onPressOut={()=>{
					if(onPressOutFunction) onPressOutFunction();
					this.setState({ pressIn : false });
				}}
				onPress={()=>{
					if(onPressFunction){
						playUISound('click2');
						onPressFunction();
					}
				}}
				style={[styles.container,btnBorder,btnStyle,btnBorderColor]}
				underlayColor={borderColor}
			>
				{(loading === true) ? this._renderLoading() : this._renderInnerContainer(icon,text,displayText,textStyle)}
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		playUISound
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
