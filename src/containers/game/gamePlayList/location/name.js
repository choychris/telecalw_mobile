import React, { PropTypes, Component } from 'react';
import { View , Text , Image , ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../../../../components/navBar/styles';

class Location extends Component {
	render(){
		const { string } = this.props;
		return(
			<View	style={styles.container}>
				<Text style={styles.text}>{string['earth']}</Text>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(Location);
