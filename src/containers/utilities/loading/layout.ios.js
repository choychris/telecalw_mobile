import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Loading extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={require('../../../../assets/utilities/sand_clock.png')}
					resizeMode="contain"
				/>
				<Text style={styles.text}>Loading ...</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	image : {
		width : 80 ,
		height : 80,
		margin : 10
	},
	container : {
		alignItems : 'center',
		justifyContent : 'center'
	},
	text : {
		color : 'white',
		fontFamily : 'Silom'
	}
});


export default connect(null,null)(Loading)
