import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../utilities/actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import GameContainer from '../components/gameContainer';
import { trackScreen } from '../../../utils/analytic';

class GameRoom extends Component {
	componentWillMount(){
		const { trackScreen } = this.props;
		trackScreen('GameRoom');
	}
	componentDidMount(){
		const { navigator } = this.props;
		loading('hide',navigator);
	}
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { navigator , machine } = this.props;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					signal={true}
					viewers={true}
					navigator={navigator}
				/>
				{(machine !== null) ? <GameContainer 
					mode={'room'} 
					navigator={navigator}
				/> : null }
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

function mapStateToProps(state) {
	return {
		machine : state.game.machine
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		trackScreen
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameRoom);
