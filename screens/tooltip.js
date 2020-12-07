import React, { Component } from 'react';
//import React

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
//import Basic Component from React Native

import Tooltip from 'react-native-walkthrough-tooltip';
//Import Tooltip

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      toolTipVisible: false,
      //state to control the visibility of Tooltip
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.largeText}>www.aboutreact.com</Text>
        <Text style={styles.largeText}>Example of Tooltip</Text>
        <Tooltip
          animated={true}
          tooltipStyle={{alignItems:'flex-end'}}
          //(Optional) When true, tooltip will animate in/out when showing/hiding
          arrowSize={{ width: 16, height: 8 }}
          //(Optional) Dimensions of arrow bubble pointing to the highlighted element
          backgroundColor="rgba(0,0,0,0.5)"
          //(Optional) Color of the fullscreen background beneath the tooltip.
          isVisible={this.state.toolTipVisible}
          //(Must) When true, tooltip is displayed
          content={<Text>Hello! AboutReact</Text>}
        //   contentStyle={{alignItems:'center',justifyContent:'center'}}
          //(Must) This is the view displayed in the tooltip
          placement="bottom"
          //(Must) top, bottom, left, right, auto.
          onClose={() => this.setState({ toolTipVisible: false })}
          //(Optional) Callback fired when the user taps the tooltip
        >
          <TouchableHighlight
            style={styles.touchable}
            onPress={() => this.setState({ toolTipVisible: true })}>
            <Text style={styles.touchableText}>Say Hi to AboutReact</Text>
          </TouchableHighlight>
        </Tooltip>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#307ecc',
    padding: 16,
  },
  touchable: {
    width: '50%',
    height: 40,
    padding: 10,
    backgroundColor: '#f5821f',
    marginTop: 30,
    alignSelf:'flex-end'
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
  },
  largeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});