import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions , KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Telebot from '../../../components/telebuddies/telebot';
import MessageBox from '../../../components/messageBox/container';
import NavBar from '../../../components/navBar/container';
import GamePlaySelect from './play/listContainer';
import LogisticForm from './logistic/layout';
import { getUserInfo } from '../../auth/actions';
import { getLogisticQuote , resetLogistic , confirmDelivery , confirmPlaySelect , showTracking } from '../actions';
import QuoteSelect from './quote/listContainer';
import Receipt from './receipt/layout';
const { width } = Dimensions.get('window');

class Delivery extends Component {
	constructor(props){
		super(props);
		// Possible State of Display :
		// 1. gamePlaySelect
		// 2  logisticForm
		// 3. quoteSelect
		// 4. deliveryReceipt
		this.state = { display : 'gamePlaySelect' };
	}
	componentDidMount(){
		const { getUserInfo } = this.props;
		getUserInfo();
	}
	shouldComponentUpdate(nextProps,nextState){
		const { display , data } = this.state;
		return display !== nextState.display || data !== nextState.data;
	}
	componentWillUnmount(){
		// Clear Selected Play / Reset 
		const { resetLogistic } = this.props;
		resetLogistic();
	}
	_renderContent(display){
		const { navigator } = this.props;
		const { data } = this.state;
		switch(display){
			case 'gamePlaySelect':
				return <GamePlaySelect 
					navigator={navigator}
					nextState={(data)=>this.setState({ display : 'deliveryReceipt' , data : data })}
				/>
			break;
			case 'logisticForm':
				return <LogisticForm/>
			break;
			case 'quoteSelect':
				return <QuoteSelect/>
			break;
			case 'deliveryReceipt':
				return <Receipt 
					{...data}
					navigator={navigator}
				/>
			break;
		}
	}
	_renderBtn(display){
		const { 
			confirmPlaySelect,
			getLogisticQuote ,
			confirmDelivery,
			showTracking,
			navigator
		} = this.props;
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
							paddingVertical : 10,
							paddingHorizontal : 15
						},
						onPressFunction : ()=>confirmPlaySelect(()=>this.setState({ display : 'logisticForm' }))
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
						paddingVertical : 10,
						paddingHorizontal : 15,
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
						paddingVertical : 10,
						paddingHorizontal : 15,
						marginHorizontal : 5
					},
					onPressFunction : ()=>{
						getLogisticQuote(navigator,()=>this.setState({ display : 'quoteSelect' }))
					}	
				}
			]
			break;
			case 'quoteSelect':
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
						paddingVertical : 10,
						paddingHorizontal : 15,
						marginHorizontal : 5
					},
					onPressFunction : ()=>this.setState({ display : 'logisticForm'  })
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
						paddingVertical : 10,
						paddingHorizontal : 15,
						marginHorizontal : 5
					},
					onPressFunction : ()=>confirmDelivery(navigator,()=>this.setState({ display : 'gamePlaySelect' }))
				}
			]
			break;
			case 'deliveryReceipt':
			return [
				{
					text : 'back',
					textStyle : {
						color : 'white',
						fontSize : 25,
						fontFamily : 'Silom',
						fontWeight : 'bold'
					},
					btnStyle : {
						backgroundColor : '#4C4C4C',
						paddingVertical : 10,
						paddingHorizontal : 15,
						marginHorizontal : 5
					},
					onPressFunction : ()=>this.setState({ display : 'gamePlaySelect'  })
				},
				{
					text : 'tracking',
					textStyle : {
						color : 'white',
						fontSize : 25,
						fontFamily : 'Silom',
						fontWeight : 'bold'
					},
					btnStyle : {
						backgroundColor : '#E63946',
						paddingVertical : 10,
						paddingHorizontal : 15,
						marginHorizontal : 5
					},
					borderColor : '#8E2633',
					icon : {
						name : 'truck' , 
						size : 20 , 
						color : 'white' 
					},
					onPressFunction : ()=>showTracking(navigator)
				}
			]
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
				<KeyboardAvoidingView 
					behavior="position" 
					style={styles.keyboardView}
				>
					<MessageBox 
						title={'delivery'}
						type={'left'}
						promptString={'deliveryPrompt'}
						content={displayContent}
						buttons={displayBtn}
					/>
					<Telebot 
						style={styles.telebot}
						status={'fly'} 
						height={width*0.3} 
						width={width*0.3}
					/>
				</KeyboardAvoidingView>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center'
	},
	keyboardView: {
		flex : 1,
		alignSelf : 'stretch' , 
		justifyContent : 'flex-start' , 
		alignItems : 'center'
	},
	telebot : {
		bottom : 60,
		left : 0
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		confirmPlaySelect,
		getUserInfo,
		getLogisticQuote,
		resetLogistic,
		confirmDelivery,
		showTracking
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Delivery);
