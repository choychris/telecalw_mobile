import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayButton from './playButton';
import ReserveButton from './reserveButton';
import DetailButton from './detailButton';
import SwitchButton from './switchButton';
import TopUpButton from './topUpButton';

class RoomPanel extends Component {
	_renderActionButton(status){
		switch(status){
			case 'open':
				return <PlayButton {...this.props}/>
			break;
			case 'playing':
				return <ReserveButton {...this.props}/>
			break;
		}
	}
	render(){
		const { machine } = this.props;
		const { status } = machine;
		return (status !== 'close') ? (
			<View style={styles.container}>
				<View style={styles.column}>
					{this._renderActionButton(status)}
					<DetailButton {...this.props}/>
				</View>
				<View style={styles.column}>
					<SwitchButton/>
					<TopUpButton/>
				</View>
			</View>
		) : null;
	}
}

const styles = StyleSheet.create({
	container : {
		height : Dimensions.get('window').height * 0.16,	
		flexDirection : 'row',
		alignSelf : 'stretch',
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'center'
	},
	column : {
		paddingHorizontal : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		machine : state.game.machine
	}
}

export default connect(mapStateToProps,null)(RoomPanel)