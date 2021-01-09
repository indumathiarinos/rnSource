import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from '../screens/splash';
import MainNavigator from './StackNavigator';
// console.disableYellowBox = ["Unable to symbolicate"];
console.disableYellowBox=true;

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: MainNavigator
    // App: MainNavigator
  });
export default createAppContainer(InitialNavigator);