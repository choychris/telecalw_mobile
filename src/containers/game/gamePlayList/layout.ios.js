import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../utilities/actions';
import { loadGameList } from '../actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import LocationBar from './location/bar';
import ListContainer from './gameList/listContainer';

class GamePlayList extends Component {
	componentDidMount(){
		const { navigator , loadGameList } = this.props;
		// Initial Function of Game Play List
		loadGameList(navigator);
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
				<ListContainer/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center'
	},
	telebot : {
		position : 'absolute',
		bottom : 0,
		right : 0,
		padding : 5
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		loadGameList
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(GamePlayList);
