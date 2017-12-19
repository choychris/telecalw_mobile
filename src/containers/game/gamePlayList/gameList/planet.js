import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchTag , getPlanetImageSource } from '../../actions';

class Planet extends Component {
	shouldComponentUpdate(nextProps){
		const { tag } = this.props;
		return nextProps.tag !== tag;
	}
	componentWillMount(){
		this._position = new Animated.ValueXY();
		this._spinAnimation = new Animated.Value(0);
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
	}
	_forceSwipe(direction){
		const action = (direction === 'left') ? 'next' : 'back' ;
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
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(tag){
		//,{ transform : [{ rotate : spin }]  }
		return (
			<Animated.Image
				{...this._panResponder.panHandlers}
				source={getPlanetImageSource(tag.name.en.toLowerCase(),tag.picture)}
				style={[styles.image,this._planetStyle()]}
				resizeMode={'contain'}
			/>
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
		position : 'absolute'
	},
	image : {
		width : 150,
		height : 150
	}
});

function mapStateToProps(state) {
	return {
		tag : state.game.tag
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		switchTag
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Planet)
