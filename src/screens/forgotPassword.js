import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet, Text,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Image,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const required = value => (value ? undefined : "This is a required field.");
const email1 = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
    ? "Please provide a valid email address."
    : undefined;
const pass = value =>
  value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
    ? "Please provide a valid password"
    : undefined;
const cnfrmpass = value =>
  value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
    ? "Please provide a valid password"
    : undefined;
    console.disableYellowBox = true;

export default class ForgotPassword extends React.Component {
  constructor(){
    super();
  this.state = {
    username: '', password: '',
    boolean: false,
    behavior: 'position' 
    // btnbgcolor:false
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
    // this.props.navigation.navigate('loginSignup');
    this.props.navigation.goBack();
      return true;
} 
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
    if(email1(this.state.username)){
      this.setState({
        boolean:true
      })
      console.log('option 1 ',this.state.username)
    }else{
      console.log('option 2 ',this.state.username)
    }

  }
  btnpress=()=>{
    this.props.navigation.navigate('resetpwd')
  }
  validate=(value)=>{
    if(email1(value)){
      this.setState({
        boolean:true
      })
      console.log('option 1 ',this.state.username)
    }else{
      console.log('option 2 ',this.state.username)
    }
  }
  render() {
    const { boolean } = this.state;
    const { username } = this.state;
    // const condition = this.state.username != '';
    // const {btnbgcolor}=this.state;
    // const bgclr=btnbgcolor?true:false;
    // if(this.state.username!=''){
    //     this.setState({btnbgcolor:''})
    // }
    return (
      <SafeAreaView style={styles.container}>

        <Image
          style={{ top: '2%' }}
          resizeMode={'cover'}
          source={require('../assets/img/forgotpwd.png')}
          //   title="CR"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7} />
        <Text style={{ margin: '3%', fontSize: 26,  color: '#27A291' }}>Forgot Password?</Text>
        <Text style={{ fontSize: 18, color: 'black', textAlign: 'center', paddingLeft: '10%', paddingRight: '10%' }}>We just need your registered email address to send you password reset</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#CCCCCC'
          onChangeText={val => this.onChangeText('username', val)}
        />

        <LinearGradient 
        style={styles.btnview} colors={
                      
                      // !email1(this.state.username) ? ['#CCCCCC', '#CCCCCC'] : ['#24D4BC', '#27A291']

          email1(this.state.username=='') ? ['#CCCCCC', '#CCCCCC'] : ['#24D4BC', '#27A291']
        } >

          <TouchableOpacity
          onPress={this.btnpress}
            //  onPress={this.validate(this.state.username)}
            // onPress={
            //   this.resetbtn(this.state.username)
            //   //  ()=>this.props.navigation.navigate('resetpwd')
            // }
          >
            <Text style={{ color: 'white', fontSize: 19 }}>Reset Password</Text>
          </TouchableOpacity>
        </LinearGradient>

        </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({

  input: {
    width: width - 100,
    height: height / 14,
    backgroundColor: '#CCCCCC28',
    margin: '3%',
    // left:10,
    // padding: '3%',
    paddingLeft: '5%',
    // paddingLeft:20,
    backgroundColor:'#CCCCCC28',
    // color: 'black',
    borderRadius: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // marginTop: '5%',
    // justifyContent: 'center'
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
 
    width: width / 2,
    height: height / 13,
    position: 'absolute',
    bottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor:'#CCCCCC'
  },
  inputing: {
    backgroundColor: 'transparent',
    color: 'red', //Expecting this to change input text color
    borderBottomColor: 'red',
  },

})
