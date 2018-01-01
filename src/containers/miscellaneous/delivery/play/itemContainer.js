import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View ,  StyleSheet , Text , TouchableOpacity , Dimensions , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
import { formatTimeStamp } from '../../../../utils/format';
import { selectPlay , unselectPlay } from '../../actions';

class PlayItem extends Component {
	_productName(name){
		const { locale } = this.props;
		return (name[locale]) ? name[locale] : name['en'];
	}
	_checkSelected(play,id){
		let selected = false;
		play.map((item)=>(item.playId === id) ? selected = true : null);
		return selected;
	}
	_selectedAction(selected,id,productId){
		const { selectPlay , unselectPlay } = this.props;
		(selected) ? unselectPlay(id) : selectPlay(id,productId);
	}
	render(){
		const { product , created , ended , play , id } = this.props;
		const { name , images } = product;
		const selected = this._checkSelected(play,id);
		const selectedBorder = (selected === true) ? styles.selectedBorder : null;
		//console.warn(JSON.stringify(images));
		return (
			<TouchableOpacity
				style={[styles.container,selectedBorder]}
				onPress={()=>this._selectedAction(selected,id,product.id)}
			>
				<Text style={styles.text}>
					{formatTimeStamp(ended)}
				</Text>
				<Image
					style={styles.image}
					source={(images && images.thumbnail) ? { uri : images.thumbnail } : null}
					resizeMode={'contain'}
				/>
				<Text style={styles.text}>
					{this._productName(name)}
				</Text>
			</TouchableOpacity>	
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center',
		borderRadius : 10,
		backgroundColor : 'black',
		width : width / 2 - 35,
		padding : 10,
		margin : 5
	},
	text : {
		fontFamily : 'Silom',
		color : '#30D64A',
		fontSize : 16,
		marginVertical : 2
	},
	image : {
		width : 30,
		height : 30,
		marginRight : 10
	},
	selectedBorder : {
		borderColor : '#CF333F',
		borderWidth : 5
	},
	image : {
		width : width * 0.15,
		height : width * 0.15,
		marginVertical : 5
	}
});

function mapStateToProps(state) {
	return {
		locale : state.preference.language.locale,
		play : state.mis.play
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		selectPlay,
		unselectPlay
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayItem)
