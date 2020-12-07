// import React, { Component } from 'react';
// import { View, Text, Animated, Image, TouchableOpacity, StyleSheet, Platform, AppRegistry } from 'react-native';
// import SnackBar from './components/snackbar';
// import PropTypes from 'prop-types';
// console.disableYellowBox = true;

// class App extends Component
// {
//    constructor()
//    {
//       super();
//    }

//    showSnackBar = () =>
//    {
//       this.refs.mySnackBar.show("Welcome to TutorialsCapital");
//    }

//    render()
//    {
//       return(
//          <View style = { styles.container }>
//             <TouchableOpacity activeOpacity = { 0.8 } onPress = { this.showSnackBar } style = { styles.button }>
//               <Text style = { styles.btnText }>Show Snack Bar</Text>
//             </TouchableOpacity>
//             <SnackBar 
//                 ref = "mySnackBar"
//                 closeText = "close"/>
//          </View>
//       );
//    }
// }

// const styles = StyleSheet.create(
// {
//   container:
//   {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingTop: (Platform.OS) === 'ios' ? 20 : 0
//   },

//   button:
//   {
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     padding: 10,
//     alignSelf: 'stretch'
//   },

//   btnText:
//   {
//     alignSelf: 'stretch',
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center'
//   },

//   animatedView:
//   {
//     position: 'absolute',
//     left: 0,
//     bottom: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: 'rgba(0,0,0,0.8)', 
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 10,
//     paddingRight: 55
//   },

//   snackBarText:
//   {
//     color: 'white',
//     fontSize: 15
//   },

//   closeBtn:
//   {
//     position: 'absolute',
//     right: 10,
//     justifyContent: 'center',
//     padding: 5
//   },

//   closeBtnImage:
//   {
//     resizeMode: 'contain',
//     width: 23,
//     height: 23
//   }
// });

// export default App;


import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./redux/Store";
// import Store from "./redux/store1";
// import Home from "./MainNavigator";
import Home from "./App";

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Home />
      </Provider>
    );
  }
}

