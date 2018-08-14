import React, { Component } from 'react';
import { Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserWallet } from '../../containers/auth/actions';
import styles from './styles';


const single = require('../../../assets/utilities/coins/telecoins_single.png');
const ticket = require('../../../assets/utilities/ticket.png');
// const coins = {
//   single: require('../../../assets/utilities/coins/telecoins_single.png'),
//   multi: require('../../../assets/utilities/coins/telecoins_multi.png'),
// };

class Coins extends Component {
  constructor() {
    super();
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  componentDidMount() {
    const { getUserWallet, navigator } = this.props;
    getUserWallet(navigator);
  }
  shouldComponentUpdate(nextProps) {
    const { wallet, version } = this.props;
    return nextProps.wallet !== wallet || version !== nextProps.version;
  }

  onButtonPress() {
    const { navigator, version } = this.props;
    if (version.release) {
      navigator.push({
        screen: 'app.TopUp',
        navigatorStyle: {
          navBarHidden: true,
        },
        animationType: 'fade',
      });
    }
  }

  render() {
    const { wallet, disabled } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        disabled={(disabled === true)}
        onPress={this.onButtonPress}
      >
        <Image
          style={styles.image}
          source={single}
          resizeMode="contain"
        />
        {(wallet.balance !== undefined) ?
          <Text style={styles.text}>{Math.round(wallet.balance)} |</Text> :
          <ActivityIndicator size="small" color="white" />}
        <Image
          style={styles.ticket}
          source={ticket}
          resizeMode="contain"
        />
        {(wallet.ticket !== undefined) ?
          <Text style={styles.text}>{Math.round(wallet.ticket)}</Text> :
          <ActivityIndicator size="small" color="white" />}
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.auth.wallet,
    version: state.mis.version,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserWallet,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
