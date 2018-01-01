import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Telebot from '../../../components/telebuddies/telebot';
import MessageBox from '../../../components/messageBox/container';
import NavBar from '../../../components/navBar/container';
import GamePlaySelect from './play/listContainer';
import LogisticForm from './logistic/layout';
import { getUserInfo } from '../../auth/actions';
import { getLogisticQuote , resetLogistic  } from '../actions';

class Delivery extends Component {
	constructor(props){
		super(props);
		// Possible State of Display :
		// 1. gamePlaySelect
		// 2  logisticForm
		// 3. quoteSelect
		this.state = { display : 'gamePlaySelect' };
	}
	componentDidMount(){
		const { getUserInfo } = this.props;
		getUserInfo();
	}
	componentWillUnmount(){
		// Clear Selected Play / Reset 
		const { resetLogistic } = this.props;
		resetLogistic();
	}
	_renderContent(display){
		switch(display){
			case 'gamePlaySelect':
				return <GamePlaySelect/>
			break;
			case 'logisticForm':
				return <LogisticForm/>
			break;
		}
	}
	_renderBtn(display){
		const { play , getLogisticQuote } = this.props;
		switch(display){
			case 'gamePlaySelect':
				return [
					{
						text : 'ship',
						textStyle : {
							color : 'white',
							fontSize : 25,
							fontFamily : 'Silom',
							fontWeight : 'bold'
						},
						btnStyle : {
							backgroundColor : '#4C4C4C',
							paddingVertical : 15,
							paddingHorizontal : 20
						},
						onPressFunction : ()=>(play.length > 0) ? this.setState({ display : 'logisticForm'  }) : null
					}
				]
			break;
			case 'logisticForm':
			return [
				{
					text : 'back',
					textStyle : {
						color : '#4C4C4C',
						fontSize : 25,
						fontFamily : 'Silom',
						fontWeight : 'bold'
					},
					borderColor : '#AFAFAF',
					btnStyle : {
						backgroundColor : '#EFEFEF',
						paddingVertical : 15,
						paddingHorizontal : 20,
						marginHorizontal : 5
					},
					onPressFunction : ()=>this.setState({ display : 'gamePlaySelect' })
				},
				{
					text : 'confirm',
					textStyle : {
						color : 'white',
						fontSize : 25,
						fontFamily : 'Silom',
						fontWeight : 'bold'
					},
					btnStyle : {
						backgroundColor : '#4C4C4C',
						paddingVertical : 15,
						paddingHorizontal : 20,
						marginHorizontal : 5
					},
					onPressFunction : ()=>{
						getLogisticQuote(()=>this.setState({ display : 'quoteSelect' }))
					}	
				}]
			break;
			case 'quoteSelect':
			break;
		}
	}
	render(){
		const { navigator } = this.props;
		const { display } = this.state;
		const displayContent = this._renderContent(display);
		const displayBtn = this._renderBtn(display);
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<MessageBox 
					title={'delivery'}
					type={'left'}
					promptString={'deliveryPrompt'}
					content={displayContent}
					buttons={displayBtn}
				/>
				<View style={styles.telebot}>
				</View>
			</View>
		)
	}
}

					//<Telebot 
						//status={'normal'} 
						//height={100} 
						//width={100}
					///>

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center'
	},
	telebot : {
		position : 'absolute',
		bottom : 0,
		left : 0,
		padding : 5
	}
});

function mapStateToProps(state) {
	return {
		play : state.mis.play
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		getUserInfo,
		getLogisticQuote,
		resetLogistic
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Delivery);
