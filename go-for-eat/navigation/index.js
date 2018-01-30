import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { NavBar } from '../components/NavBar';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import User from '../screens/User';
import CreateEvent from '../screens/CreateEvent';
import LoadingPage from '../screens/LoadingPage';

const NavigatorWithRootScreen = (name) => {
  return StackNavigator({
    [name] : {
      screen:name,
      navigationOptions:{
        gesturesEnabled:false,
        header:(<NavBar/>),
      }
    }
  });
};

const NavigatorWithModal = (name) => {
  return StackNavigator({
    [name] : {
      screen:name,
      navigationOptions:{
        gesturesEnabled:false,
      }
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  });
};

const HomeStack = StackNavigator({
  Home: {
    screen: NavigatorWithRootScreen(Home),
    navigationOptions:{header:()=>null}
  },

  User: {
    screen: NavigatorWithRootScreen(User),
    navigationOptions:{header:()=>null}
  },
  CreateEvent: {
    screen: NavigatorWithModal(NavigatorWithRootScreen(CreateEvent)),
    navigationOptions:{header:()=>null}
  }
});

export const AppNavigator = StackNavigator({
    Login: {
      screen: Login
    },
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {
        gesturesEnabled: false,
      }
    },
    Loading:{
      screen:LoadingPage
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

class AppWithNavigationState extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
      navigation = {addNavigationHelpers({
        dispatch,
        state:nav,
      })}
      />
    )
  }
}

const mapStateToProps = state => ({
  nav:state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
