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
	shouldComponentUpdate(nextProps){
		const { machine } = this.props;
		return machine !== nextProps.machine;
	}
	_renderActionButton(status,currentUser){
		if(status === 'open' && currentUser === null){
			return <PlayButton {...this.props}/>
		} else {
			return <ReserveButton {...this.props}/>
		}
	}
	render(){
		const { machine, navigator, lbToken } = this.props;
		const { status , currentUser } = machine;
		return (status !== 'close') ? (
			<View style={styles.container}>
				<View style={styles.column}>
					{this._renderActionButton(status,currentUser)}
					<DetailButton {...this.props}/>
				</View>
				<View style={styles.column}>
					<SwitchButton navigator={navigator}/>
					{ (lbToken === undefined) ? null : <TopUpButton navigator={navigator}/> }
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
		machine : state.game.machine,
    lbToken : state.auth.token.lbToken
	}
}

export default connect(mapStateToProps,null)(RoomPanel)
