import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchTag , getPlanetImageSource } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

class Planet extends Component {
	shouldComponentUpdate(nextProps){
		const { tag } = this.props;
		return nextProps.tag !== tag;
	}
	componentWillMount(){
		this._position = new Animated.ValueXY();
		this._spinAnimation = new Animated.Value(0);
		this._blinkAnimation = new Animated.Value(0.2);
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) =>true,
			onPanResponderMove: (evt, gestureState) => {
				const { dx , dy } = gestureState
				this._position.setValue({ x : dx , y : dy });
			},
			onPanResponderRelease: (evt, gestureState) => {
				const swipeThreshold = Dimensions.get('window').width * 0.2;
				const { dx , dy } = gestureState;
				if(dx > swipeThreshold){
					this._forceSwipe('right');
					this._resetPosition();
				} else if(dx < -swipeThreshold){
					this._forceSwipe('left');
					//console.warn('Left');
					this._resetPosition();
				} else {
					//console.warn('Reset')
					this._resetPosition();
				}
			}
		});
	}
	componentDidMount(){
		Animated.loop(
			Animated.timing(
				this._spinAnimation,
				{
					toValue: 1,
					duration: 80000,
					easing: Easing.linear
				}
			)
		).start();
		Animated.loop(
			Animated.sequence([
				Animated.timing(this._blinkAnimation, {
					toValue: 1,
					duration: 1000,
					easing : Easing.linear
				}),
				Animated.timing(this._blinkAnimation, {
					toValue: 0.2,
					duration: 1000,
					easing : Easing.linear
				})
			])
		).start();
	}
	_forceSwipe(direction){
		const action = (direction === 'left') ? 'back' : 'next' ;
		const { switchTag } = this.props;
		const screenWidth = Dimensions.get('window').width;
		switchTag(action);
		Animated.timing(this._position,{
			toValue : { x : screenWidth , y : 0 },
			duration : 200
		}).start();
	}
	_resetPosition(){
		Animated.spring(this._position,{
			toValue : { x : 0 , y : 0 }
		}).start();
	}
	_planetStyle(){
		const screenWidth = Dimensions.get('window').width;
		const rotate = this._position.x.interpolate({
			inputRange: [-screenWidth * 1.5, 0 , screenWidth *1.5],
			outputRange: ['-120deg', '0deg' , '120deg']
		});
		const spin = this._spinAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		})
		return {
			...this._position.getLayout(),
			transform : [{ rotate : rotate },{ rotate : spin }]
		}
	}
	_blinkStyle(){
		return {
			opacity: this._blinkAnimation.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			})
		}
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderSwipeIndicator(direction){
		const { tag , tags } = this.props;
		const { index } = tag;
		const next = (direction == 'right') ? 1 : -1;
		const swipeExist = (tags[index+next] !== undefined);
		return (swipeExist === true) ? (
			<Animated.View 
				style={[styles[direction+'SwipeIndicator'],this._blinkStyle()]}
			>
				<Icon 
					name={'angle-double-'+direction} 
					size={55} 
					color='white'
				/>
			</Animated.View>
		) : null;
	}
	_renderDisplay(tag){
		return (
			<View style={styles.innerContainer}>
				{this._renderSwipeIndicator('left')}
				<Animated.Image
					{...this._panResponder.panHandlers}
					source={getPlanetImageSource(tag.name.en.toLowerCase(),tag.picture)}
					style={[styles.image,this._planetStyle()]}
					resizeMode={'contain'}
				/>
				{this._renderSwipeIndicator('right')}
			</View>
		)
	}
	render(){
		const { tag } = this.props;
		return(
			<View style={styles.container}>
				{(tag !== null) ? this._renderDisplay(tag) : this._renderLoading()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		position : 'absolute',
	},
	innerContainer : {
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center',
		...Platform.select({
			ios : {
				backgroundColor : 'transparent'
			}
		})
	},	
	rightSwipeIndicator : {
		position : 'absolute',
		left : Dimensions.get('window').width * 0.5,
	},
	leftSwipeIndicator : {
		position : 'absolute',
		right : Dimensions.get('window').width * 0.5
	},
	image : {
		width : Platform.OS === 'ios' ? 150 : 150,
		height : Platform.OS === 'ios' ? 150 : 150
	}
});

function mapStateToProps(state) {
	return {
		tag : state.game.tag,
		tags : state.game.tags
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		switchTag
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Planet)
