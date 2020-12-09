import React from 'react';
import { View, AsyncStorage, SafeAreaView, Text, Dimensions,BackHandler, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ImageBackground, TouchableOpacityBase } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import { SimpleAnimation } from 'react-native-simple-animations';
import LinearGradient from 'react-native-linear-gradient';
// import apiCall from "../redux/ActionCreator";
// import { connect } from "react-redux";


console.disableYellowBox = true;
const options = {
  headers: {
    //     'Accept': 'application/json',
    // 'content-type':'multipart/form-data'
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};
const formData = new FormData()
formData.append('email', 'Testing@gmail.com');
formData.append('password', 'password');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
    ? "Please provide a valid email address."
    : undefined;

const pass = value =>
  value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
    ? "Please provide a valid password"
    : undefined;
    
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      boolean: false,
      animating: false,
      align: 'center',
      alignsecond: false,
      data: '',
      borderEmail:false,
      borderPass:false

    };
    setTimeout(
      () =>
        this.setState({ align: 'flex-start' }, function () {
          this.setState({
            alignsecond: true,
          });
        }),
      3000
    );
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  BackHandler.exitApp();

  return true;
}

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
    this.state.email!=''?this.setState({borderEmail:true}):this.setState({borderEmail:false});
    this.state.password!=''?this.setState({borderPass:true}):this.setState({borderPass:false})
    // if(email1(this.state.username)){
    //   this.setState({
    //     boolean:true
    //   })
    //   console.log('option 1 ',this.state.username)
    // }else{
    //   console.log('option 2 ',this.state.username)
    // }
    if ((email(this.state.email == '')) && (pass(this.state.password == ''))) {
      this.setState({ boolean: true })
    } else {
      this.setState({ boolean: false })
    }
  }
  termsClick=()=>{
    AsyncStorage.setItem('signupTerms', JSON.stringify(1));
    this.props.navigation.navigate('TermsAndCondition');
  }
  privacyClick=()=>{
    AsyncStorage.setItem('signupPrivacy', JSON.stringify(1));
    this.props.navigation.navigate('privacyPolicy');
    }
  signUp = () => {
    console.log('email', this.state.email, ' password', this.state.password);

    // if(this.state.boolean==true){
    if ((!email(this.state.email == '')) && (!pass(this.state.password == ''))) {

      // console.log('email',this.state.email,' password',this.state.password)
      this.props.navigation.navigate('mainpage');
    }
    // }

  }
  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      console.log("Email is Correct");
    }
  }
  // componentDidMount(){
  //   var json=JSON.stringify({
  //     'email': email,
  //     'password': pass,
  //     });
  //   this.props
  //   .apiCall("http://162.250.120.20:555/Service1.svc/register1",
  //    json
  //   ,options)
  //   .then(() => {
  //     const data = this.props.data;
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     // console.log(error);
  //   });

  // }

  login(){
   var json=JSON.stringify({
      'email': this.state.email,
      'Pwd': this.state.password,
      'UserIDStatus':1
      });
console.warn(json+"")
      fetch("http://162.250.120.20:444/Login/Login",
      {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'content-type': 'application/json'
          },
          body: json
      }
  )
      .then((response) => response.json())
      .then((responseJson) => {
          //alert(responseText);
          this.setState({ expl: responseJson })
          console.warn(responseJson)

          if(responseJson.Msg==='Invalid EmailID'){
            alert(responseJson.Msg)

          }
          else{
            AsyncStorage.setItem('userid', responseJson.UserID);
           // AsyncStorage.setItem('typeid', item.TypeID);

            alert('login')
           { this.props.navigation.navigate('MainpageTabs')}
          }
          //alert(this.state.data.status)


      })



      .catch((error) => {
          console.warn(error);
      });

  }


  render() {
    const js1 = JSON.stringify(this.props.data)

    return (


      <View
        style={styles.container}>
        <TouchableOpacity
          style={{ width: 130, height: 130, alignSelf: 'flex-end',top:0,right:0}}
          onPress={() => this.props.navigation.navigate('MainpageTabs')}>
          <Image
            source={require('../assets/img/explore.png')}
          />
        </TouchableOpacity>

        <View style={{ alignContent: 'center', alignItems: 'center',flex:1 }}>


          <Image style={{
            width: 300,
            resizeMode: 'contain', marginBottom: 15
          }}
            source={require('../assets/img/welc.png')}
          />
          <TextInput
            style={[!this.state.borderEmail?styles.input:styles.input1]}
            placeholder='Email'
            autoCapitalize="none"
            placeholderTextColor='#CCCCCC'
            onChangeText={val => this.onChangeText('email', val)}
            value={this.state.email}
          />
          <TextInput
            style={[!this.state.borderPass?styles.input:styles.input1]}
            placeholder='Password'
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor='#CCCCCC'
            onChangeText={val => this.onChangeText('password', val)}
            value={this.state.password}
          />
          <Text
            onPress={() => {this.props.navigation.navigate('forgotpwd')}}
            style={{textAlign:'center'}}
          >OR</Text>
          <View style={styles.logoContainer}>    
            <Image style={{ width: 60, height: 60, marginRight: 20 }}
              source={require('../assets/img/fb.png')}
            />
          <Image style={{ width: 60, height: 60, marginLeft: 20 }}
              source={require('../assets/img/google.png')}
            />
          </View>

          <LinearGradient style={styles.btnview} colors={
            ((!email(this.state.email === '')) && (!pass(this.state.password === ''))) ? ['#24D4BC', '#27A291'] : ['#00000028', '#00000028']} >
            <TouchableOpacity
            //  onPress={() => this.props.navigation.navigate('MainpageTabs')}
              onPress={() => this.login()}
            >
              <Text style={{ color: 'white', fontSize: 19 }}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={{ color: 'black', fontSize: 13, marginTop: 20 }}> By continuing you indicate that you have agree to </Text>
          <View style={{ flexDirection: 'row',justifyContent:'center' ,alignItems:'center'}}>
          <Text>PageVio's </Text>
            <Text
              onPress={() => this.termsClick()}
              style={styles.TextStyle}
              >Terms of service</Text><Text style={{ color: 'black', fontSize: 12, marginTop: 5 }}> & </Text>
            <Text
              onPress={
                () =>
                  this.privacyClick()
              }
              style={styles.TextStyle}>privacy Policy</Text>
          </View>

        </View>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  TextStyle: {
    textAlign: 'center',
    fontSize: 13,
    textDecorationLine: 'underline',
    color:'#27A291'
  },
  TextStyle1: {
    color: '#27A291',
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontFamily: 'Azo Sans',
    // textAlign: 'flex-end',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 5
  },
  container: {
    // fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // marginBottom:10
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 10
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
    marginBottom: 15
  },
  logoDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black'
  },
  input: {
    width: screenWidth - 80,
    height: screenHeight / 12,
    fontFamily: 'Azo Sans',
    margin: '2%',
    // left:10,
    // padding: '3%',
    paddingLeft: '5%',
    // paddingLeft:20,
    // color: 'black',
    borderRadius: 18,
    // borderWidth: 1,
    borderColor: '#27A291',
    backgroundColor: '#CCCCCC28',
    fontSize: 18,
    fontWeight: '500',
  },
  input1: {
    width: screenWidth - 80,
    height: screenHeight / 12,
    fontFamily: 'Azo Sans',
    margin: '2%',
    // left:10,
    // padding: '3%',
    paddingLeft: '5%',
    // paddingLeft:20,
    color: '#fff',
    borderRadius: 18,
    // borderWidth: 1,
    borderColor: '#27A291',
    backgroundColor: '#27A291',
    fontSize: 18,
    fontWeight: '500',
  },
  // container: {
  //     flex: 1,
  //     justifyContent:'center',
  //     // alignItems:'center'

  // },

  btnview: {
    height: screenHeight / 12,

    // padding: '2%',
    width: screenWidth / 1.3,
    height: screenHeight / 14,
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 23,
  }

});

// const mapDispatchToProps = dispatch => ({
//   apiCall: (url,data,config) => dispatch(apiCall(url,data,config))
// });

// const mapStateToProps = state => ({
//   data: state.apiReducer.data,
//   //data2:state.apiReducer.data,
//   error: state.apiReducer.error,
// });

export default SignUp;
// connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Signup);