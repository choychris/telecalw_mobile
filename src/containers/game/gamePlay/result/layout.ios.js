import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../../utilities/actions';
import Telebot from '../../../../components/telebuddies/telebot';

class GameResult extends Component {
	shouldComponentUpdate(){
		return false;
	}
	componentDidMount(){
		const { navigator } = this.props;
		this.gameResultTimer = setTimeout(()=>{
			navigator.resetTo({
				screen : 'app.GamePlayList',
				navigatorStyle : {
					navBarHidden : true
				}
			});
		},5000)
	}
	render(){
		const { result , string } = this.props;
		const resultColor = (result === 2) ? { color : '#CF333F' } : { color : '#2ECC71' };
		const title = (result === 2) ? string['fail'] : string['congratulations'];
		return(
			<View>
				<Text style={[styles.title,resultColor]}>{title}</Text>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

const styles = StyleSheet.create({
	container : {
	},
	title : {
		fontFamily : 'Silom',
		fontSize : 30
	}
});

export default connect(mapStateToProps,null)(GameResult);
