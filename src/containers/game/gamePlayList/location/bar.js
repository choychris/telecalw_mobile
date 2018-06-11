import React, { Component } from 'react';
import { ScrollView, View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { getPlanetImageSource } from '../../actions';

class LocationBar extends Component {
  shouldComponentUpdate(nextProps) {
    const { tag, tags } = this.props;
    return tag !== nextProps.tag || tags !== nextProps.tags;
  }
  renderPlanets(planets) {
    const { tag } = this.props;
    return planets.map((planet) => {
      const imageStyle = [styles.image];
      if (planet.id !== tag.id) imageStyle.push({ opacity: 0.4 });
      return (
        <Image
          key={planet.name.en}
          source={getPlanetImageSource(planet.name.en.toLowerCase(), planet.images)}
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
    width: 25,
    height: 25,
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
