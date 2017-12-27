import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../../utilities/actions';
import { payment , exchangeRate } from '../../actions';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import NavBar from '../../../../components/navBar/container';
import MessageBox from '../../../../components/messageBox/container';
import RateListContainer from './listContainer';

class TopUp extends Component {
	constructor(props){
		super(props);
		const { payment } = props;
		this.state = {
			tabs : [
				{ 
					name : 'purchase' , 
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
								paddingVertical : 15,
								paddingHorizontal : 20
							},
							onPressFunction : ()=>payment()
						}
					]
				},
				{ name : 'transactions' }
			]
		}
	}
	componentWillMount(){
		const { exchangeRate } = this.props;
		exchangeRate();
	}
	shouldComponentUpdate(){
		return false;
	}
	componentWillUnmount(){
		// Reset Rate Selection
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
					navigator={navigator}
				/>
				<MessageBox 
					type={'right'}
					tabs={tabs}
					promptString={'topUpPrompt'}
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
	}
});

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		payment,
		exchangeRate
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(TopUp);
