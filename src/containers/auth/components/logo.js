import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const logos = {
	en : require('../../../../assets/logo/logo_en.png'),
	zhHant : require('../../../../assets/logo/logo_zhHant.png')
};

class Logo extends Component {
	shouldComponentUpdate(nextProps){
		const { locale } = this.props;
		return locale !== nextProps.locale;
	}
	render(){
		const { locale } = this.props;
		return(
			<Image
				source={logos[locale]}
				style={styles.logo}
				resizeMode={'contain'}
			/>
		)
	}
}

const styles = StyleSheet.create({
	logo : {
		position : 'absolute',
		top : 0,
		width : '86%',
		height : '30%'
	}
});

export default connect(null, null)(Logo);
