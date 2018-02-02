import React, { Component } from 'react';
import { View, Text, Image, Avatar, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { logoutUser, navigate, navigateBack } from '../../actions';
import { logoutStorage } from '../../localStorage'

import navNew from '../../assets/icons/nav_new.png';
import navBack from '../../assets/icons/nav_back.png';
import navProfile from '../../assets/icons/nav_profile.png';
import navLogout from '../../assets/icons/nav_logout.png';
import navClose from '../../assets/icons/nav_close.png';
import logo from '../../assets/logo/logo2x.png';
import style from './styles.js';
import PropTypes from 'prop-types';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {screen: this.props.screen}
  }

  handleNavBack = () => {
    this.props.navigateBack();
  }

  handleMyProfile = () => {
    this.props.navigate('Profile');
  }

  handleCreate = () => {
    this.props.navigate('CreateEvent');
  }

  handleLogout = () => {
    const serializedState = JSON.stringify({});
    Expo.SecureStore.setItemAsync('state', serializedState);
    this.props.logoutState();
    this.props.navigate('Login');
  }

  renderButton = (button) => {
    return (
      <TouchableOpacity
        onPress={button.onPress}
      >
        <Image
          style={style.navbar_icon}
          source={button.icon}

        />
      </TouchableOpacity>
    )
  }


  render () {
    const allButtons = {
      create: {
        onPress:this.handleCreate,
        icon: navNew
      },
      profile: {
        onPress:this.handleMyProfile,
        icon: navProfile
      },
      back: {
        onPress:this.handleNavBack,
        icon: navBack
      },
      close: {
        onPress:this.handleNavBack,
        icon:navClose
      },
      logout: {
        onPress:this.handleLogout,
        icon:navLogout
      }
    };

    const buttons = {};
    if (this.state.screen==='Home') {buttons.center = <Image source={logo} style={style.navbar_logo}/>}
    else {
      buttons.center = <View><Text style={style.navbar_title}>{this.state.screen}</Text></View>
    };

    if (this.state.screen === 'Home') {
      buttons.left = this.renderButton(allButtons.create);
      buttons.right = this.renderButton(allButtons.profile);
    } else if (this.state.screen === 'Profile') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = this.renderButton(allButtons.logout);
    } else if (this.state.screen === 'User') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = this.renderButton(allButtons.logout);
    } else if (this.state.screen === 'CreateEvent') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = null;
    } else {
      buttons.left = null;
      buttons.right = null;
    }
    return (
      <View>
      <Header
        leftComponent={buttons.left}
        centerComponent={buttons.center}
        rightComponent={buttons.right}
        outerContainerStyles={style.navbar_container}
      />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav:state.nav,
  screen:state.pages.currentScreen,
  user:state.authentication
});

const mapDispatchToProps = dispatch => ({
  logoutState:() => dispatch(logoutUser()),
  navigate: (screen) => dispatch(navigate(screen)),
  navigateBack: () => dispatch(navigateBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);