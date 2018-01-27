import React, { PropTypes, Component } from 'react';
import { ListView , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { winResult , clearPlays } from '../../actions';
import PlayItem from './itemContainer';
const height = Dimensions.get('window').height;

class GamePlaySelect extends Component {
	shouldComponentUpdate(nextProps){
		const { plays } = this.props;
		return JSON.stringify(plays) !== JSON.stringify(nextProps.plays)
	}
	componentDidMount(){
		const { winResult , navigator } = this.props;
		// Fetch Play Result from Backend
		winResult(navigator);
	}
	componentWillUnmount(){
		const { clearPlays } = this.props;
		clearPlays();
	}
	_renderLoading(){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" color={'black'}/>
			</View>
		)
	}
	_renderList(plays){
		const { nextState } = this.props;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		const dataSource =  ds.cloneWithRows(plays);
		return (
			<ListView
				style={styles.listWrapper}
				contentContainerStyle={styles.listContainer}
				dataSource={dataSource}
				renderRow={(rowData)=><PlayItem {...rowData} nextState={nextState}/>}
			/>
		)
	}
	_renderNoRecord(){
		const { string } = this.props;
		return (
			<View style={[styles.container,styles.listWrapper]}>
				<Text style={styles.text}>{string['noRecord']}</Text>
			</View>
		)
	}
	render(){
		const { plays } = this.props;
		//console.warn(JSON.stringify(plays));
		return (plays !== undefined) ? 
			((plays.length > 0) ? this._renderList(plays) : this._renderNoRecord()) : 
			this._renderLoading();
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center',
		paddingVertical : 50
	},
	listWrapper : {
		alignSelf : 'stretch',
		height : height * 0.4,
		marginVertical : 5
	},
	listContainer : {
		paddingVertical : 10,
		alignSelf : 'stretch',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems : 'center',
		justifyContent : 'center'
	},
	text : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		plays : state.mis.plays
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		winResult,
		clearPlays
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GamePlaySelect);
