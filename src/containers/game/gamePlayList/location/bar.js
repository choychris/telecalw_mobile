import React, { PropTypes, Component } from 'react';
import { ScrollView , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LocationBar extends Component {
	_renderPlanets(planets){
		return planets.map((planet,index)=>{
			let imageStyle = [styles.image];
			if(index !== 0) imageStyle.push({ opacity : 0.4 })
			return (
				<Image
					key={index}
					source={planet.picture}	
					style={imageStyle}
					resizeMode={'contain'}
				/>
			)
		});
	}
	_renderLoading(){
		return <ActivityIndicator size="small" color={'white'}/>
	}
	render(){
		const { tags } = this.props;
		return(
			<View style={styles.container}>
				<ScrollView horizontal={true}>
					{(tags.length > 0) ? 
						this._renderPlanets(tags) : 
						this._renderLoading()}
				</ScrollView>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
	container : {
		width : Dimensions.get('window').width * 0.95,
		paddingVertical : 2,
		borderRadius : 30,
		flexDirection : 'row',
		backgroundColor : 'black',
		opacity : 0.4,
		overflow : 'hidden'
	},
	image : {
		width : 25,
		height : 25,
		marginHorizontal : 10
	}
});


function mapStateToProps(state) {
	return {
		tags : state.game.tags
	}
}

export default connect(mapStateToProps,null)(LocationBar);
