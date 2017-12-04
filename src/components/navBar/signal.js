import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator , NetInfo } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { errorMessage } from '../../containers/utilities/actions';

class Signal extends Component {
	constructor(props){
		super(props);
		this.state = { status : null };
	}
	componentDidMount(){
		const { navigator , string } = this.props;
		NetInfo.isConnected.addEventListener(
			'connectionChange',
			(isConnected)=>{
				this.setState({ status : isConnected });
				if(isConnected === false) errorMessage('show',navigator,{ title : string['offline'] , message : string['internetProblem'] }) ;
			}
		);
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(status){
		const { string } = this.props;
		const displayString = (status === true) ? 'online' : 'offline';
		return (
			<Text style={styles.text}>
				{string[displayString]}
			</Text>
		)
	}
	render(){
		const { string } = this.props;
		const { status } = this.state;
		const signalIcon = (status === true) ? 
			{ color : '#2ECC71' , name : 'signal' } :
		 	{ color : '#E63946' , name : 'times' }
		return(
			<View style={styles.container}>
				<Icon 
					name={signalIcon.name}
					size={20} 
					color={signalIcon.color}
					style={styles.icon}
				/>
				{(status !== null) ? this._renderDisplay(status) : this._renderLoading()}
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(Signal)
