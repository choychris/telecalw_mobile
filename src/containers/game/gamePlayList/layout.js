import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../utilities/actions';
import { loadGameList , networkChecking , productStatus ,reserveStatus , getCheckinReward } from '../actions';
import { playBackgroundMusic } from '../../../utils/sound';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarsImage from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import LocationBar from './location/bar';
import ListContainer from './gameList/listContainer';
import BarContainer from './bottomBar/barContainer';

class GamePlayList extends Component {
	shouldComponentUpdate(){
		return false;
	}
	componentDidMount(){
		const { 
			navigator , 
			loadGameList , 
			networkChecking ,
			productStatus,
			reserveStatus,
			getCheckinReward,
			playBackgroundMusic
		} = this.props;
		// Initial Function of Game Play List
		loadGameList(navigator);
		// Initial Netwrok Checking Listener
		networkChecking(navigator);	
		// Initiate Pusher Product Status Listener
		productStatus();
		// Initiate Pusher Reservation Listener 
		reserveStatus(navigator);
		// Play Background Music
		this.background = playBackgroundMusic();
	}
	componentWillUnmount(){
		this.background.stop(()=>this.background.release());
	}
	render(){
		const { navigator } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<StarsImage/>
				<NavBar 
					coins={true} 
					location={true} 
					signal={true}
					navigator={navigator}
				/>
				<LocationBar/>
				<ListContainer navigator={navigator}/>
				<BarContainer navigator={navigator}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		loadGameList,
		networkChecking,
		productStatus,
		reserveStatus,
		getCheckinReward,
		playBackgroundMusic
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(GamePlayList);
