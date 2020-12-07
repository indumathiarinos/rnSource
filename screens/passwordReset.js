import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet, Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import TextInputPassword from './TextInputPassword';
import TextInputLayout from './TextInputLayout';
import { Form, Field } from "react-native-validate-form";
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class PasswordReset extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <View style={{
          alignItems: 'center',
          marginTop: '15%',
          justifyContent: 'center'
        }}>
          <Image

            source={require('../assets/img/forgotpwd.png')}
            //   title="CR"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7} />
        </View>
        <Text style={{ margin: '3%', fontSize: 20, fontWeight: 'bold', color: '#27A291' }}>Password Reset</Text>
        <Text style={{ fontSize: 18, color: '#707070', textAlign: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
          We have send you an email with instructions to reset your password              </Text>

        <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >

          <TouchableOpacity
            onPress={this.signUp}
          //  onPress={this.submitForm.bind(this)}
          >
            <Text style={{ color: 'white', fontSize: 19 }}>Back</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  input: {
    width: width - 100,
    height: height / 16,
    backgroundColor: '#CCCCCC28',
    margin: '3%',
    // left:10,
    // padding: '3%',
    paddingLeft: '5%',
    // paddingLeft:20,
    color: 'black',
    borderRadius: 28,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  underlinetxt: {
    marginTop: '10%',
    textAlign: 'center',
    color: '#27A291',
    fontSize: 16,
    marginBottom: '3%',
    textDecorationLine: 'underline',
  },
  btnview: {
    // backgroundColor: '#24D4BC',
    // padding: '2%',
    width: width / 2,
    height: height / 13,
    maxWidth: 'auto',
    position: 'absolute',
    bottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  inputing: {
    backgroundColor: 'transparent',
    color: 'red', //Expecting this to change input text color
    borderBottomColor: 'red',
  },

})
