import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image , Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const logos = {
	en : require('../../../../assets/logo/logo_en.png'),
	zhHant : require('../../../../assets/logo/logo_zhHant.png')
};

class Logo extends Component {
	constructor(props){
		super(props);
		this._neon = new Animated.Value(0.5);
	}
	componentDidMount(){
		Animated.loop(
			Animated.sequence([
				Animated.timing(this._neon,{
					toValue : 1,
					duration : 100
				}),
				Animated.timing(this._neon,{
					toValue : 0.2,
					duration : 100
				}),
				Animated.delay(100),
				Animated.timing(this._neon,{
					toValue : 1,
					duration : 100
				})
			]),
			{
				iterations: 3
			}
		).start();
	}
	shouldComponentUpdate(nextProps){
		const { locale } = this.props;
		return locale !== nextProps.locale;
	}
	_neonAction(){
		const neonEffect = this._neon.interpolate({
			inputRange : [0,1],
			outputRange : [0,1]
		})
		return {
			opacity : neonEffect
		}
	}
	render(){
		const { locale } = this.props;
		return(
			<Animated.Image
				source={logos[locale]}
				style={[styles.logo,this._neonAction()]}
				resizeMode={'contain'}
			/>
		)
	}
}

const styles = StyleSheet.create({
	logo : {
		position : 'absolute',
		top : 0,
		width : '86%',
		height : '30%'
	}
});

export default connect(null, null)(Logo);
