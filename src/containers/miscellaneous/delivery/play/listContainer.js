import React, { PropTypes, Component } from 'react';
import { ListView , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { winResult } from '../../actions';
import PlayItem from './itemContainer';
const height = Dimensions.get('window').height;

class GamePlaySelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			ds :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}
	componentDidMount(){
		const { winResult } = this.props;
		// Fetch Play Result from Backend
		winResult();
	}
	_renderLoading(){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" color={'black'}/>
			</View>
		)
	}
	_renderList(plays){
		const { ds } = this.state;
		const dataSource =  ds.cloneWithRows(plays);
		return (
			<ListView
				style={styles.listWrapper}
				contentContainerStyle={styles.listContainer}
				dataSource={dataSource}
				renderRow={(rowData)=><PlayItem {...rowData}/>}
			/>
		)
	}
	render(){
		const { plays } = this.props;
		return (plays.length > 0) ? this._renderList(plays) : this._renderLoading();
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
		marginVertical : 10
	},
	listContainer : {
		paddingVertical : 10,
		alignSelf : 'stretch',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		plays : state.mis.plays
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		winResult
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GamePlaySelect);
