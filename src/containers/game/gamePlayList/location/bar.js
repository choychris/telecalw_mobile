import React, { Component } from 'react';
import { ScrollView, View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const planetImage = require('../../../../../assets/planet/earth.png');

class LocationBar extends Component {
  shouldComponentUpdate(nextProps) {
    const { tag, tags } = this.props;
    return tag !== nextProps.tag || tags !== nextProps.tags;
  }
  renderPlanets(planets) {
    const { tag } = this.props;
    
    return planets.map((planet, i) => {
      const imageStyle = [styles.image];
      const source = (typeof planet.images === 'string') ? { uri: planet.images } : planet.images;
      if (planet.id !== tag.id) imageStyle.push({ opacity: 0.4 });
      return (
        <Image
          key={i}
          source={source || planetImage}
          style={imageStyle}
          resizeMode="contain"
        />
      );
    });
  }

  render() {
    const { tags, tag } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {(tags.length > 0 && tag !== null) ?
            this.renderPlanets(tags) :
            <ActivityIndicator size="small" color="white" />}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.95,
    paddingVertical: 2,
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: 'black',
    opacity: 0.4,
    overflow: 'hidden',
  },
  image: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});


function mapStateToProps(state) {
  return {
    tags: state.game.tags,
    tag: state.game.tag,
  };
}

export default connect(mapStateToProps, null)(LocationBar);
