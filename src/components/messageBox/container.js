import React, { PropTypes, Component } from 'react';
import { FlatList , KeyboardAvoidingView , View , Image , StyleSheet , Dimensions , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const messageBoxImage = {
	none : require('../../../assets/messagebox/none.png'),
	left : require('../../../assets/messagebox/left.png'),
	right : require('../../../assets/messagebox/right.png')
};
import Prompt from './promopt';
import Buttons from './buttons';
import Tab from './tab';

class MessageBox extends Component {
	constructor(props){
		super(props);
		const { tabs  , selectedTab } = props;
		if(tabs){
			if(selectedTab){
				this.state = { selectedTab : selectedTab };
			} else {
				this.state = { selectedTab : 0 };
			}
		}
	}
	_renderTabs(tabs){
		const { string } = this.props;
		const { selectedTab } = this.state;
		return (
			<FlatList
				style={styles.tabs}
				contentContainerStyle={styles.tabContent}
				horizontal={true}
				data={tabs}
				renderItem={({ item , index })=>
					<Tab 
						string={string}
						index={index} 
						{...item} 
						selected={index === selectedTab}
						onPress={()=>this.setState({ selectedTab : index })}
					/>
				}
				extraData={selectedTab}
				keyExtractor={(item, index) => index}
			/>
		)	
	}
	render(){
		const { 
			type , 
			promptString , 
			buttons , 
			content ,
			title,
			string,
			tabs
		} = this.props;
		const { selectedTab } = this.state;
		return(
			<View style={styles.container}>
				<Image
					source={messageBoxImage[type]}
					style={styles.image}
					resizeMode='stretch'
				/>	
				<KeyboardAvoidingView 
					behavior="padding" 
					style={styles.formView}
					keyboardVerticalOffset={35}
				>
					{(title) ? <Text style={styles.title}>{string[title]}</Text> : null}
					{(tabs) ? this._renderTabs(tabs) : null }
					{(promptString) ? <Prompt promptString={promptString}/> : null }
					{(content) ? content : null }
					{(tabs && tabs[selectedTab] && tabs[selectedTab]['content']) ? tabs[selectedTab]['content'] : null}
					{(buttons) ? <Buttons buttons={buttons}/> : null }
				</KeyboardAvoidingView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		height: Dimensions.get('window').height * 0.85 ,
		width: Dimensions.get('window').width * 0.9 ,
		marginVertical : 5
	},
	image : {
		position : 'absolute',
		width : '100%',
		height : '95%'
	},
	formView : { 
		backgroundColor : '#EAEAEA' , 
		borderRadius : 30 , 
		alignItems : 'flex-start'
	},
	title : {
		color : '#011627',
		fontFamily : 'Silom',
		fontSize : 20,
		paddingVertical : 10,
		textAlign : 'center'
	},
	tabContent : {
		flex : 1,
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'space-around',
		paddingVertical : 10
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(MessageBox);
