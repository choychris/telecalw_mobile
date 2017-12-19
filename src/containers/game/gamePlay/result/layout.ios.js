import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../../components/telebuddies/telebot';
import Button from '../../../../components/utilities/buttons';
import Timer from './timer';
import { navigateToGamePlay , resetTimer , loadGamePlay , closeAllWebrtc } from '../../actions';

class GameResult extends Component {
	constructor(props){
		super(props);
		this.state = { btnDisable : false };
	}
	shouldComponentUpdate(nextProps,nextState){
		return nextState.btnDisable !== this.state.btnDisable;
	}
	componentDidMount(){
		const { navigator } = this.props;
		this.gameResultTimer = setTimeout(()=>this._exitGame(),8000);
		this.btnDisableTimer = setTimeout(()=>this.setState({ btnDisable : true }),5000);
	}
	componentWillUnmount(){
		clearInterval(this.btnDisableTimer);
	}
	_renderProductImage(result){
		const { product } = this.props;
		return (result === 1 && product.images && product.images.thumbnail) ? (
			<Image
				style={{ width : 100 , height : 100 , marginHorizontal : 5 }}
				source={{ uri : product.images.thumbnail}}
				resizeMode={'contain'}
			/>
		) : null;
	}
	_exitGame(){
		const { 
			navigator ,
			closeAllWebrtc,
			resetTimer
		} = this.props;
		navigator.resetTo({
			screen : 'app.GamePlayList',
			navigatorStyle : {
				navBarHidden : true
			}
		});
		closeAllWebrtc();
		this.setState({ btnDisable : true });
		clearInterval(this.gameResultTimer);
	}
	_replay(){
		const { 
			navigator , 
			navigateToGamePlay , 
			resetTimer , 
			loadGamePlay ,
			closeAllWebrtc
		} = this.props;
		this.setState({ btnDisable : true });
		clearInterval(this.gameResultTimer);
		closeAllWebrtc();
		navigator.dismissLightBox();
		navigateToGamePlay(navigator);
		resetTimer(null);
		setTimeout(()=>{
			loadGamePlay(navigator);
		},2000);
	}
	_renderActionButton(){
		const { string } = this.props;
		const { btnDisable } = this.state;
		const actionButtons = [
			{ text : 'playAgain' , function : ()=>this._replay() },
			{ text : 'leaving' , function : ()=>this._exitGame() }
		]
		return  actionButtons.map((btn,key)=>(
			<View key={key}>
				<Button
					disable={btnDisable}
					btnStyle={{
						backgroundColor : '#545555',
						borderRadius : 10,
						paddingHorizontal : 30,
						paddingVertical : 12,
						marginVertical : 5
					}}
					borderColor={'#2D2D2E'}
					onPressFunction={btn.function}
				/>
				<Text style={styles.btnText}>
					{string[btn.text]}
					{(key === 0) ? <Timer/> : null }
				</Text>
			</View>
		));
	}
	render(){
		const { result , string } = this.props;
		const resultColor = (result === 2) ? { color : '#CF333F' } : { color : '#2ECC71' };
		const title = (result === 2) ? string['fail'] : string['congratulations'];
		const desc = (result === 2) ? string['failSlogan'] : string['congratulationsSlogan'];
		const botStatus = (result === 2) ? 'sad' : 'happy';
		return(
			<View style={styles.container}>
				<Text style={[styles.title,resultColor]}>{title}</Text>
				<View style={styles.innerContainer}>
					<Telebot status={botStatus} width={180} height={180}/>
					{this._renderProductImage(result)}
				</View>
				<Text style={styles.slogan}>{desc}</Text>
				<View style={styles.btnContainer}>
					{this._renderActionButton()}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center'
	},
	innerContainer : {
		flexDirection : 'row',
		paddingVertical : 20,
		alignItems : 'center',
		justifyContent : 'center'
	},
	title : {
		fontFamily : 'Silom',
		fontSize : 30
	},
	slogan : {
		color : 'white',
		fontSize : 20,
		fontFamily : 'Silom'
	},
	btnContainer : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'space-around',
		paddingVertical : 20
	},
	btnText : {
		textAlign : 'center',
		color : '#4A6CFF',
		fontFamily : 'Silom',
		fontSize : 20
	}
});
function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		product : state.game.product
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		navigateToGamePlay,
		resetTimer,
		loadGamePlay,
		closeAllWebrtc
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameResult);
