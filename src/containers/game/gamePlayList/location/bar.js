import React, { PropTypes, Component } from 'react';
import { ScrollView , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPlanetImageSource } from '../../actions';

class LocationBar extends Component {
	_renderPlanets(planets){
		const { tag } = this.props;
		return planets.map((planet,index)=>{
			let imageStyle = [styles.image];
			if(planet.id !== tag.id) imageStyle.push({ opacity : 0.4 })
			return (
				<Image
					key={index}
					source={getPlanetImageSource(planet.name.en.toLowerCase(),planet.picture)}
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
		const { tags, tag } = this.props;
		return(
			<View style={styles.container}>
				<ScrollView horizontal={true}>
					{(tags.length > 0 && tag !== null) ? 
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
		tags : state.game.tags,
		tag : state.game.tag
	}
}

export default connect(mapStateToProps,null)(LocationBar);
