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
				{ icon : 'gift' , name : 'reward' , navigate : 'app.Reward' },
				{ icon : 'money' , name : 'wallet' , navigate : 'app.TopUp' },
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
				style={{ paddingHorizontal : 10  }}
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
		const { navigator } = this.props;
		const { menu } = this.state;
		const screenWidth = Dimensions.get('window').width * 0.25;
		return (
			<View style={styles.container}>
				{this._renderTabItems(menu)}
				<TouchableOpacity
					onPress={()=>{
						navigator.push({
							screen : 'app.Setting',
							navigatorStyle : {
								navBarHidden : true
							}
						});
					}}
				>
					<Telebot
						status={'setting'}
						style={{ margin : 5 }}
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
