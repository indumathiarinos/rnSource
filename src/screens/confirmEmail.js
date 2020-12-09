import React, { Component } from 'react';
import { View,SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ height: '8%', justifyContent: 'center', paddingLeft: '5%' }}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('newSignup')}>
          <Image style={{ alignSelf: 'flex-start', }} source={require('../assets/img/backarrow.png')} />
          </TouchableOpacity>
        </View>
        <Image style={{ alignSelf: "center", marginTop: '5%', width: 50, height: 50 }} source={require('../assets/img/logo1.png')} />
        <Text style={{ color: '#27A291', fontSize: 24, alignSelf: 'center', margin: '3%' }}>Sign Up</Text>
        <Text style={{ color: '#707070', fontSize: 17, width: width / 1.5, alignSelf: 'center', }} numberOfLines={3}>You will receive a confirmation email. Please enter the code provided in the email to continue</Text>
        <TextInput
          style={[this.state.code == '' ? styles.input : styles.input1]}
          placeholder='Code'
          placeholderTextColor='#CCCCCC'
          onChangeText={val => this.setState({ code: val })}
          value={this.state.code}
        />
        <LinearGradient style={styles.confirmBtn} colors={
          this.state.code ? ['#24D4BC', '#27A291'] : ['#CCCCCC', '#CCCCCC']} >

          <TouchableOpacity
           onPress={() => this.props.navigation.navigate('MainpageTabs')}
          >
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Confirm</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* <TouchableOpacity style={styles.confirmBtn}>
          </TouchableOpacity> */}
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  confirmBtn: {
    width: width - 80,
    height: height / 14,
    borderRadius: 24,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width - 80,
    height: height / 16,
    alignSelf: 'center',
    marginTop: '15%',
    marginBottom: '5%',
    fontFamily: 'Azo Sans',
    paddingLeft: '5%',
    borderRadius: 18,
    borderColor: '#27A291',
    backgroundColor: '#CCCCCC28',
    fontSize: 18,
    fontWeight: '500',
  },
  input1: {
    width: width - 80,
    height: height / 14,
    alignSelf: 'center',
    fontFamily: 'Azo Sans',
    marginTop: '15%',
    marginBottom: '5%',
    paddingLeft: '5%',
    color: '#fff',
    borderRadius: 18,
    borderColor: '#27A291',
    backgroundColor: '#27A291',
    fontSize: 18,
    fontWeight: '500',
  },
})
export default ConfirmEmail;