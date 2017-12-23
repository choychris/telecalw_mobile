import React, { PropTypes, Component } from 'react';
import { View , Image , StyleSheet , Dimensions , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from'../utilities/buttons';

class Buttons extends Component {
	render(){
		const { buttons } = this.props;
		return(
			<View style={styles.container}>
				{buttons.map((button,index)=>
					<Button
						key={index}
						{...button}
					/>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		paddingVertical : 5,
		flexDirection : 'row',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'
	}
})
	
export default connect(null,null)(Buttons)
