import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActionSheetIOS,
  TouchableOpacity,
  Platform,
  Picker,
  Switch,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setUserLanguage, setUserPreference } from '../actions';

const { height } = Dimensions.get('window');

class SettingForm extends Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    const { language, preference, version } = this.props;
    const lang = nextProps.language.locale !== language.locale;
    const pref = nextProps.preference !== preference;
    const ver = nextProps.version !== version;
    return (lang || pref || ver);
    // return this.props !== nextProps;
  }

  navigate() {
    this.props.navigator.push({
      screen: 'app.Support',
      navigatorStyle: {
        navBarHidden: true,
      },
      animationType: 'fade',
    });
  }

  renderLanguageIOSPicker(avaLanguage, locale, string) {
    // console.warn(JSON.stringify(avaLanguage));
    const { setUserLanguage, navigator } = this.props;
    const langDis = Object.keys(avaLanguage)
      .map(langCode => avaLanguage[langCode])
      .concat(string.cancel);
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: langDis,
                cancelButtonIndex: langDis.length - 1,
              },
              (buttonIndex) => {
                const setLang = Object.keys(avaLanguage)[buttonIndex];
                if (setLang !== undefined) setUserLanguage(setLang, navigator);
              },
            );
          }}
      >
        <Text style={styles.langText}>
          {`${string.language} : ${avaLanguage[locale]} `}
        </Text>
      </TouchableOpacity>
    );
  }
  renderLanguageAndroidPicker(avaLanguage, locale) {
    const { setUserLanguage, navigator } = this.props;
    return (
      <Picker
        style={styles.picker}
        selectedValue={locale}
        onValueChange={itemValue => setUserLanguage(itemValue, navigator)}
      >
        {
          Object.keys(avaLanguage).map(langCode =>
            <Picker.Item
              key={langCode}
              label={avaLanguage[langCode]}
              value={langCode}
            />)
        }
      </Picker>
    );
  }
  renderMusicSetting(string, { sound }) {
    const { setUserPreference, navigator } = this.props;
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          {string.sound}
        </Text>
        <Switch
          value={sound}
          onValueChange={value => setUserPreference(navigator, 'sound', value)}
        />
      </View>
    );
  }
  renderVibrationSetting(string, { vibration }) {
    const { setUserPreference, navigator } = this.props;
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          {string.vibration}
        </Text>
        <Switch
          value={vibration}
          onValueChange={value => setUserPreference(navigator, 'vibration', value)}
        />
      </View>
    );
  }

  render() {
    const {
      user,
      language,
      preference,
      version,
    } = this.props;
    const { avaLanguage, locale, string } = language;

    // console.warn(JSON.stringify(user.picture));
    // console.warn(locale)
    // console.warn(JSON.stringify(version))
    return (
      <View style={{ height: height * 0.45 }}>
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <Text style={styles.text}>
            {user.name}
          </Text>
          <Text style={styles.text}>
            {user.contactEmail || user.email}
          </Text>
          {
            (Platform.OS === 'ios') ?
            this.renderLanguageIOSPicker(avaLanguage, locale, string) :
            this.renderLanguageAndroidPicker(avaLanguage, locale, string)
          }
          {this.renderMusicSetting(string, preference)}
          {this.renderVibrationSetting(string, preference)}
          <TouchableOpacity
            style={[
              styles.innerContainer,
              { backgroundColor: 'rgba(39, 93, 173, 0.8)' },
            ]}
            onPress={this.navigate}
          >
            <Text style={[styles.text, { color: 'white' }]}>
              Contact Support
            </Text>
            <Icon name="question-circle" size={25} color="white" />
          </TouchableOpacity>
          <Text style={styles.text}>
            {`${string.version} : ${version.version}`}
          </Text>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 10,
    height: height * 0.6,
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  text: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    fontSize: 18,
    paddingVertical: 5,
  },
  btn: {
    paddingVertical: 10,
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  langText: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    fontSize: 18,
    color: '#008CFF',
  },
  picker: {
    alignSelf: 'stretch',
  },
  // avatar: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  // },
});

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    language: state.preference.language,
    preference: state.preference.preference,
    version: state.mis.version,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserLanguage,
    setUserPreference,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingForm);
