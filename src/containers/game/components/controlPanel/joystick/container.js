import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Direction from './direction';

class JoyStick extends Component {
	shouldComponentUpdate(){
		return false
	}
	render(){
		const { string , ws , did } = this.props;
		return (
			<View style={styles.container}>
				<Direction 
					action={'MoveUp'} 
					icon={'caret-up'}
					ws={ws}
					did={did}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						top : (Platform.OS === 'ios') ? -27 : 0,
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
					did={did}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						bottom : (Platform.OS === 'ios') ? -30 : 0,
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
					did={did}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						paddingVertical : 6,
						paddingHorizontal : 10,
						position : 'absolute',
						left : (Platform.OS === 'ios') ? -28 : 5,
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
					did={did}
					btnStyle={{
						backgroundColor : '#4C4C4C',
						position : 'absolute',
						right : (Platform.OS === 'ios') ? -28 : 5,
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
		justifyContent : 'center',
		...Platform.select({
			android: {
				height : 100,
				width : 100
			}   
		})
	},
	center : {
		backgroundColor : '#4C4C4C',
		height : 35,
		width : 35
	}
});

export default connect(null,null)(JoyStick)
