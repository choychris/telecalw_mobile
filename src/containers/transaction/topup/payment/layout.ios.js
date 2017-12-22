import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../../utilities/actions';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import NavBar from '../../../../components/navBar/container';
import MessageBox from '../../../../components/messageBox/container';
import RateListContainer from './listContainer';

class TopUp extends Component {
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
					tabs={[
						{ name : 'purchase' , content : <RateListContainer/> },
						{ name : 'transactions' }
					]}
					promptString={'topUpPrompt'}
					buttons={[
					]}
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

export default connect(null,null)(TopUp);
