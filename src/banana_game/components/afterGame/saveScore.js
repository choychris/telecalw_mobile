import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import BonusButtons from './bonusButtons';
import {
  saveScoreToDb,
  scoreBonus,
  addTime,
} from '../../actions/afterGameActions';
import locale from '../../utils/i18n/language';

const leaderboard = require('../../images/leaderboard.png');

class SaveScore extends Component {
  constructor() {
    super();
    this.state = {
      bonusIsShown: false,
      increaseScore: false,
    };
    this.saveAgain = this.saveAgain.bind(this);
    this.getBonus = this.getBonus.bind(this);
  }

  componentDidMount() {
    this.props.getBonus(this.props.score);
  }

  getBonus(yes) {
    this.setState({
      increaseScore: yes,
      bonusIsShown: true,
    }, this.saveAgain);
    if (yes) {
      this.props.addTime(20);
    }
  }

  saveAgain() {
    const score = this.state.increaseScore ?
      Math.floor(this.props.score * 1.5) : this.props.score;
    this.props.startSave(score, true);
  }

  render() {
    const { lang, bonus, enoughForBonus } = this.props;
    const { bonusIsShown } = this.state;
    if (this.props.saved) {
      return (
        <View style={styles.warpperStyle}>
          <Text style={styles.textStyle}>{locale(lang, 'saved')}</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.props.showBoard}
          >
            <Image
              source={leaderboard}
              style={styles.imageStyle}
            />
            <Text style={styles.buttonText}>{'Leader\nboard'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (this.props.saveError) {
      return (
        <View style={styles.warpperStyle}>
          <Text style={styles.textStyle}>{locale(lang, 'failSave')}</Text>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                paddingVertical: 12,
                backgroundColor: '#F45B69',
              },
            ]}
            onPress={this.saveAgain}
          >
            <Text style={[styles.buttonText, { textAlign: 'center' }]}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (bonus && !bonusIsShown) {
      return <BonusButtons
        disable={!enoughForBonus}
        lang={lang}
        onPress={yes => this.getBonus(yes)}
      />;
    }
    return (
      <View style={styles.warpperStyle}>
        <Text style={styles.textStyle}>{locale(lang, 'saving')}</Text>
        <ActivityIndicator color="#0000ff" />
      </View>
    );
  }
}
const shadow = (Platform.OS === 'ios') ?
  {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  } : { elevation: 2 };

const styles = StyleSheet.create({
  warpperStyle: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textStyle: {
    fontSize: 22,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'PixelOperator8-Bold',
  },
  imageStyle: {
    flex: 0.8,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#4A66FF',
    marginVertical: 30,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    maxWidth: 170,
    ...shadow,
  },
  buttonText: {
    flex: 1,
    color: 'white',
    textAlign: 'left',
    fontSize: 12,
    paddingLeft: 10,
    fontFamily: 'PixelOperator8-Bold',
  },
});

const mapStateToProps = state => ({
  saved: state.bananaGame.afterGame.scoreSaved,
  bonus: state.bananaGame.afterGame.bonus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    startSave: saveScoreToDb,
    getBonus: scoreBonus,
    addTime,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SaveScore);
