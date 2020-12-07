import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AppNavigator from './AppNavigator';
// import AppNavigator from './router';
import SplashScreen from './screens/splash';
import MainNavigator from './AppNavigator';

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: MainNavigator
    // App: MainNavigator
  });
export default createAppContainer(InitialNavigator);
