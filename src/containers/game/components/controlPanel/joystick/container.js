import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Direction from './direction';
import Request from '../../../../../utils/fetch';
import { initiate } from '../../../../../common/api/request/gizwits';

class JoyStick extends Component {
	componentDidMount(){
		initiate(
			{
				did : 'bnyXLPJWNpoumbKUYKA78V',
				appId : '20a365a7564142d3a342916f6d6df937',
				userToken : 'db7e4ed6c30849cabaeb0207ba5a5e5c',
				value : '1E231E0A0A06060628000001'
			},
			Request
		)
	}
	render(){
		const { string } = this.props;
		return (
			<View style={styles.container}>
				<Direction 
					action={'MoveUp'} 
					icon={'arrow-up'}
					btnStyle={{
						backgroundColor : '#D10B9D',
						paddingVertical : 8,
						paddingHorizontal : 8,
						position : 'absolute',
						top : -50,
						borderBottomRightRadius : 0,
						borderTopLeftRadius : 30,
						borderTopRightRadius : 30,
						borderBottomLeftRadius : 0
					}}
				/>
				<Direction 
					action={'MoveDown'} 
					icon={'arrow-down'}
					btnStyle={{
						backgroundColor : '#D10B9D',
						paddingVertical : 8,
						paddingHorizontal : 8,
						position : 'absolute',
						bottom : -50,
						borderBottomRightRadius : 30,
						borderTopLeftRadius : 0,
						borderTopRightRadius : 0,
						borderBottomLeftRadius : 30
					}}
				/>
				<Direction 
					action={'MoveLeft'} 
					icon={'arrow-left'}
					btnStyle={{
						backgroundColor : '#D10B9D',
						paddingVertical : 8,
						paddingHorizontal : 8,
						position : 'absolute',
						left : -50,
						borderBottomRightRadius : 0,
						borderTopLeftRadius : 30,
						borderTopRightRadius : 0,
						borderBottomLeftRadius : 30
					}}
				/>
				<Direction 
					action={'MoveRight'} 
					icon={'arrow-right'}
					btnStyle={{
						backgroundColor : '#D10B9D',
						position : 'absolute',
						right : -50,
						paddingVertical : 8,
						paddingHorizontal : 8,
						borderBottomRightRadius : 30,
						borderTopLeftRadius : 0,
						borderTopRightRadius : 30,
						borderBottomLeftRadius : 0
					}}
				/>
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
});

export default connect(null,null)(JoyStick)
