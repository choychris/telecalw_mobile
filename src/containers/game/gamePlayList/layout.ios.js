import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../utilities/actions';
import { loadGameList , networkChecking , productStatus } from '../actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import LocationBar from './location/bar';
import ListContainer from './gameList/listContainer';
import BarContainer from './bottomBar/barContainer';

class GamePlayList extends Component {
	componentDidMount(){
		const { 
			navigator , 
			loadGameList , 
			networkChecking ,
			productStatus
		} = this.props;
		// Initial Function of Game Play List
		loadGameList(navigator);
		// Initial Netwrok Checking Listener
		networkChecking(navigator);	
		// Initiate Firsbase Product Status Listener
		productStatus();
	}
	render(){
		const { navigator } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					coins={true} 
					location={true} 
					signal={true}
					navigator={navigator}
				/>
				<LocationBar/>
				<ListContainer navigator={navigator}/>
				<BarContainer/>
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
		productStatus
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(GamePlayList);
