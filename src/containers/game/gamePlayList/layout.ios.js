import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../utilities/actions';
import { loadGameList , networkChecking } from '../actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import LocationBar from './location/bar';
import ListContainer from './gameList/listContainer';
import BarContainer from './bottomBar/barContainer';
import { firebaseCredentials } from '../../../config/env';
import * as firebase from 'firebase';

class GamePlayList extends Component {
	componentDidMount(){
		const { navigator , loadGameList , networkChecking } = this.props;
		// Initial Function of Game Play List
		loadGameList(navigator);
		// Initial Netwrok Checking Listener
		networkChecking(navigator);	
		// Initiate Firsbase Product Status Listener
		firebase.initializeApp(firebaseCredentials());
		let initialData = false;
		const productStatus = firebase.database().ref('messages/product');
		productStatus
			.limitToLast(1)
			.on('child_added', (snapshot)=>{
				if(initialData === true) console.warn(JSON.stringify(snapshot.val()));
			});
		productStatus.once('value',()=>initialData = true);
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
		networkChecking
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(GamePlayList);
