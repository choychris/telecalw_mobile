import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Direction from './direction';

class JoyStick extends Component {
	shouldComponentUpdate(){
		return false
	}
	render(){
		const { string , ws } = this.props;
		return (
			<View style={styles.container}>
				<Direction 
					action={'MoveUp'} 
					icon={'caret-up'}
					ws={ws}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						top : -27,
						borderTopLeftRadius : 10,
						borderTopRightRadius : 10,
						borderBottomLeftRadius : 0,
						borderBottomRightRadius : 0
					}}
				/>
				<Direction 
					action={'MoveDown'} 
					icon={'caret-down'}
					ws={ws}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						bottom : -30,
						borderBottomRightRadius : 10,
						borderTopLeftRadius : 0,
						borderTopRightRadius : 0,
						borderBottomLeftRadius : 10
					}}
				/>
				<Direction 
					action={'MoveLeft'} 
					icon={'caret-left'}
					ws={ws}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						left : -28,
						borderBottomRightRadius : 0,
						borderTopLeftRadius : 10,
						borderTopRightRadius : 0,
						borderBottomLeftRadius : 10
					}}
				/>
				<Direction 
					action={'MoveRight'} 
					icon={'caret-right'}
					ws={ws}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						position : 'absolute',
						right : -28,
						paddingVertical : 6,
						paddingHorizontal : 10,
						borderBottomRightRadius : 10,
						borderTopLeftRadius : 0,
						borderTopRightRadius : 10,
						borderBottomLeftRadius : 0
					}}
				/>
				<View style={styles.center}></View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container : {
		marginHorizontal : 50,
		flexDirection : 'row',
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'center'
	},
	center : {
		backgroundColor : '#4C4C4C',
		height : 35,
		width : 35
	}
});

export default connect(null,null)(JoyStick)
