import React, { PropTypes, Component } from 'react';
import { FlatList , View , Text , StatusBar , StyleSheet , Dimensions ,TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemButton from './itemButton';
import Telebot from '../../../../components/telebuddies/telebot';

class BarContainer extends Component {
	constructor(props){
		super(props);
		this.state = { 
			menu : [
				{ icon : 'rocket' , name : 'delivery'},
				{ icon : 'share' , name : 'reward' },
				{ icon : 'money' , name : 'topUp' },
				{ icon : 'question-circle' , name : 'support' }
			]
		};
	}
	shouldComponentUpdate(){
		return false;
	}
	_renderTabItems(menu){
		return (
			<FlatList
				horizontal={true}
				data={menu}
				renderItem={({item})=>
					<ItemButton name={item.name} icon={item.icon}/>}
				keyExtractor={(item, index) => index}
			/>
		)
	}
	render(){
		const { menu } = this.state;
		const screenWidth = Dimensions.get('window').width * 0.28;
		return (
			<View style={styles.container}>
				{this._renderTabItems(menu)}
				<TouchableOpacity>
					<Telebot
						status={'setting'}
						height={screenWidth}
						width={screenWidth}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

export default connect(null,null)(BarContainer);
