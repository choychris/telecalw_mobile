import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , StatusBar , StyleSheet , Dimensions , ActivityIndicator , TouchableOpacity , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectIssueType } from '../../actions';

class IssueType extends Component {
	constructor(props){
		super(props);
		this.state = {
			types : [
				{ name : 'gameAppeal' , icon : 'gamepad' },
				{ name : 'deliveryProblem' , icon : 'truck' },
				{ name : 'coinsPurchase' , icon : 'money' },
				{ name : 'bugsReport' , icon : 'bug' },
				{ name : 'others' , icon : 'commenting' }
			]
		};
	}
	_renderIssueType(item){
		const { string , issue ,selectIssueType } = this.props;
		const { name , icon } = item;
		const selectedStyle = (name === issue.type) ? { borderColor : '#CF333F' , borderWidth : 5 , borderRadius : 5 } : null;
		return (
			<TouchableOpacity
				style={[styles.button,selectedStyle]}
				onPress={()=>selectIssueType(name)}
			>
				<Icon 
					name={icon}
					size={25}
					color="black"
				/>
				<Text 
					style={styles.text}
				>
					{string[name]}
				</Text>
			</TouchableOpacity>
		)
	}
	render(){
		const { issue } = this.props;
		const { types } = this.state;
		return (
			<FlatList
				style={styles.container}
				extraData={issue.type}
				contentContainerStyle={styles.listContainer}
				data={types}
				renderItem={({item})=>this._renderIssueType(item)}
				numColumns={2}
				keyExtractor={(item, index) => index}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch'
	},
	listContainer : {
		paddingVertical : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	},
	text : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 15,
		marginHorizontal : 5
	},
	button : {
		alignItems : 'center',
		justifyContent : 'center',
		flexDirection : 'row',
		padding : 5,
		marginVertical : 5,
		marginHorizontal : 20
	}
});

function mapStateToProps(state) {
	return {
		issue : state.mis.issue,
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		selectIssueType
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(IssueType);
