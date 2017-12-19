import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../../../../components/navBar/styles';

class Location extends Component {
	shouldComponentUpdate(nextProps){
		const { tag } = this.props;
		return nextProps.tag !== tag;
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	_renderDisplay(tag){
		const { locale } = this.props;
		const { name } = tag;
		return <Text style={styles.text}>{(name[locale]) ? name[locale] : name['en']}</Text>
	}
	render(){
		const { string , tag } = this.props;
		return(
			<View	style={styles.container}>
				{(tag && tag !== null) ? this._renderDisplay(tag) : this._renderLoading()}
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		locale : state.preference.language.locale,
		tag : state.game.tag
	}
}

export default connect(mapStateToProps,null)(Location);
