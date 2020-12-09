import React, { Component } from 'react';
import {SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';


// eslint-disable-next-line react/prefer-stateless-function
class Example extends Component {

  render() {
    return (
      <SafeAreaView
      style={{flex:1}}>
        <Text >
          Snackbar Examples
        </Text>

        <TouchableOpacity
          onPress={() => Snackbar.show({ title: 'Hello, World!' })}
        >
          <Text >
            Simple Snackbar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.show({
            title: 'Hello, World! How are you doing today? Enjoying the sun?! This should wrap to two lines.',
            duration: Snackbar.LENGTH_LONG,
          })}
        >
          <Text >
            Simple Snackbar - two lines
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.show({
            title: 'Please agree to this.',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: 'AGREE',
              onPress: () => Snackbar.show({ title: 'Thank you!' }),
              color: 'green',
            },
          })}
        >
          <Text >
            Snackbar with action
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.show({
            title: 'Please agree to this.',
            duration: Snackbar.LENGTH_INDEFINITE,
            backgroundColor: 'silver',
            action: {
              title: 'AGREE',
              onPress: () => Snackbar.show({ title: 'Thank you!' }),
              color: 'gold',
            },
          })}
        >
          <Text >
            Snackbar with style
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Snackbar.dismiss()}
        >
          <Text >
            Dismiss active Snackbar
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

}

export default Example;