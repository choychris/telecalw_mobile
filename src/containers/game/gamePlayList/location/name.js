import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../../components/navBar/styles';

class Location extends Component {
  shouldComponentUpdate(nextProps) {
    const { tag, locale } = this.props;
    return nextProps.tag !== tag || locale !== nextProps.locale;
  }

  renderDisplay(tag) {
    const { locale } = this.props;
    const { name } = tag;
    return <Text style={styles.text}>{(name[locale]) ? name[locale] : name.en}</Text>;
  }

  render() {
    const { tag } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        {(tag && tag !== null) ?
          this.renderDisplay(tag) :
          <ActivityIndicator size="small" color="white" />}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    locale: state.preference.language.locale,
    tag: state.game.tag,
  };
}

export default connect(mapStateToProps, null)(Location);
