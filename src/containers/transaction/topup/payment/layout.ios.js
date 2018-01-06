import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../../utilities/actions';
import { payment , selectRate } from '../../actions';
import Telebot from '../../../../components/telebuddies/telebot';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import NavBar from '../../../../components/navBar/container';
import MessageBox from '../../../../components/messageBox/container';
import RateListContainer from './listContainer';
import TransactionListContainer from '../record/listContainer';
const height = Dimensions.get('window').height;

class TopUp extends Component {
	constructor(props){
		super(props);
		const { payment , navigator } = props;
		this.state = {
			tabs : [
				{ 
					name : 'topUp' , 
					content : <RateListContainer/> ,
					buttons : [
						{
							text : 'confirmText',
							textStyle : {
								color : 'white',
								fontSize : 25,
								fontFamily : 'Silom',
								fontWeight : 'bold'
							},
							btnStyle : {
								backgroundColor : '#4C4C4C',
								paddingVertical : 10,
								paddingHorizontal : 15
							},
							onPressFunction : ()=>payment(navigator)
						}
					]
				},
				{ 
					name : 'transactions',
					content : <TransactionListContainer/>
				}
			]
		}
	}
	shouldComponentUpdate(){
		return false;
	}
	componentWillUnmount(){
		const { selectRate } = this.props;
		// Reset Rate Selection
		selectRate(null);
	}
	render(){
		const { 
			navigator 
		} = this.props;
		const { tabs } = this.state;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					coinsDisable={true}
					navigator={navigator}
				/>
				<MessageBox 
					type={'right'}
					tabs={tabs}
					promptString={'topUpPrompt'}
				/>
				<Telebot 
					style={styles.telebot}
					status={'money'} 
					height={height * 0.13} 
					width={height * 0.13}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		backgroundColor : '#263E50'
	},
	telebot : {
		position : 'absolute',
		bottom : 0,
		right : 0,
		margin : 10
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		payment,
		selectRate
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(TopUp);
