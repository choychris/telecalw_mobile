import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadGamePlay , refund } from '../actions';
import { loading } from '../../utilities/actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import GameContainer from '../components/gameContainer';
import { trackScreen } from '../../../utils/analytic';

class GamePlay extends Component {
	componentWillMount(){
		const { trackScreen } = this.props;
		trackScreen('GamePlay');
	}
	componentDidMount(){
		const { loadGamePlay , navigator , refund } = this.props;
		loadGamePlay(navigator);
		this.refundTimer = setTimeout(()=>refund(navigator),26000);
	}
	shouldComponentUpdate(){
		return false;
	}
	componentWillUnmount(){
		clearTimeout(this.refundTimer);
	}
	render(){
		const { navigator } = this.props;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					timer={true}
					signal={true}
					navigator={navigator}
				/>
				<GameContainer
					mode={'play'}
					navigator={navigator}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		backgroundColor : '#263E50'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		loadGamePlay,
		trackScreen,
		refund
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(GamePlay);
