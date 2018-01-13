import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Dimensions , WebView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const { height , width } = Dimensions.get('window');

class Tracking extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { tracking } = this.props;
		return(
			<WebView
				source={{ uri : tracking }}	
				style={styles.webView}
			/>
		)
	}
}

const styles = StyleSheet.create({
	webView : {
		height : height * 0.8,
		width: width * 0.92 ,
		alignSelf : 'stretch',
		overflow : 'hidden',
		marginVertical : 5
	}
});

export default connect(null,null)(Tracking);
