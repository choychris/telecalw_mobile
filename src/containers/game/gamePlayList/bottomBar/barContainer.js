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
				{ icon : 'rocket' , name : 'delivery' , navigate : 'app.Delivery' },
				{ icon : 'share' , name : 'reward' , navigator : 'app.Reward' },
				{ icon : 'money' , name : 'topUp' , navigate : 'app.TopUp' },
				{ icon : 'question-circle' , name : 'support' , navigate : 'app.Support' }
			]
		};
	}
	shouldComponentUpdate(){
		return false;
	}
	_renderTabItems(menu){
		const { navigator } = this.props;
		return (
			<FlatList
				horizontal={true}
				data={menu}
				renderItem={({item})=>
					<ItemButton 
						{...item}
						navigator={navigator}
					/>}
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
