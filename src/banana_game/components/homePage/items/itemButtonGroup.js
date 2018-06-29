import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleItem } from '../../../actions/startGameAction';
import { playUISound } from '../../../../utils/sound';
import locale from '../../../utils/i18n/language';
import Item from './item';

const ItemButtonGroup = ({
  startGame, selectItem, sound, lang,
}) => {
  const renderButtons = () => {
    const itemsList = [
      {
        id: 'addTime',
        title: '+ 10s',
        details: locale(lang, 'addTime'),
        coin: 10,
      },
      {
        id: 'positive',
        title: '+ve only',
        details: locale(lang, 'positive'),
        coin: 15,
      },
      {
        id: 'upOnly',
        title: '^^^ only',
        details: locale(lang, 'upOnly'),
        coin: 20,
      },
    ];

    return itemsList.map((each) => {
      const {
        id, title, details, coin,
      } = each;
      return (
        <Item
          key={id}
          title={title}
          details={details}
          coin={coin}
          onPress={() => {
            selectItem(id, coin);
            sound('start');
          }}
          selected={startGame[id]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.13 }} />
      <View style={{ flex: 2 }}>
        <Text style={styles.textStyle}>
          {locale(lang, 'items')}
        </Text>
        { renderButtons() }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 3,
    maxWidth: 100,
    backgroundColor: 'transparent',
    fontFamily: 'PixelOperator8-Bold',
  },
});

const mapStateToProps = state =>
  ({
    startGame: state.bananaGame.startGame,
    lang: state.preference.language.locale,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectItem: toggleItem,
    sound: playUISound,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemButtonGroup);
