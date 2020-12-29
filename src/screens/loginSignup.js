import React from 'react';
import { View, SafeAreaView, Text,AsyncStorage, Dimensions,BackHandler, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ImageBackground, TouchableOpacityBase, Alert } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import { SimpleAnimation } from 'react-native-simple-animations';
import LinearGradient from 'react-native-linear-gradient';
const {width,height}=Dimensions.get('window');
import Modal from 'react-native-modal';
import mainpageTabs from './mainpageTabs';
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

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
    ? true
    : false;

const pass = value =>
  value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
    ? "Please provide a valid password"
    : undefined;
    const regex=value=> 
    value && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/i.test(value)?true:false;

class LoginSignUp extends React.Component {
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
      borderPass:false,
      loading:false,
      isConnected:false,
      type:''
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
clear=(pagename)=>{
  this.props.changeNavRec();
  this.props.navigation.navigate(pagename)
  this.setState({email:'',password:''})
}
CheckConnectivity(){    
  NetInfo.fetch().then(state => {

    console.log("Connection type cheking", state.type);
    console.log("Is connected cheking?", state.isConnected);

    if(state.isConnected==true){

      this.login()
    }else{
      alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
    }
   
  });
}
login=()=>{
  let userStatus;
  this.setState({loading:true})
  // var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
  let validation=this.state.email.includes('@')
  console.log('validation value',validation)
    {!validation?this.setState({userStatus:'2'}):this.setState({userStatus:'1'})}
  // if(validation==true){
  //   this.setState({userStatus:'1'})
    console.log('user status',this.state.userStatus);
  // }else{
  //   this.setState({userStatus:'2'})
  //   console.log('false',this.state.userStatus)
  // }
  // var hasS = new RegExp("^[s\s]+$").test(a);
  // this.state.email.includes('@')?this.setState({userStatus:1}):this.setState({userStatus:2})
  
  var json=JSON.stringify({
     'email': this.state.email,
     'Pwd': this.state.password,
     'UserIDStatus':!validation?'2':'1'
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
      // alert('Log In Successfully')
         //alert(responseText);
         this.setState({ expl: responseJson,loading:false })
         console.warn(responseJson)

         if(responseJson.Msg==="Invalid EmailID" || responseJson.Msg==="Invalid Username" || responseJson.Msg ==="Invalid Password"){
        setTimeout(() => {
          Alert.alert(
            'Status',
            responseJson.Msg,
            [
                   {text: 'OK', onPress: () => 
                  //  this.props.navigation.navigate('loginSignup')
                  {this.clear('loginSignup')}
                  },
            ]
        )
        }, 1000);
      
               }
         else if(responseJson.Msg==='Logedin successfully'){
          // alert(responseJson.Msg)
          this.props.savelogin();
           AsyncStorage.setItem('userid', JSON.stringify(Number(responseJson.UserID)));
           AsyncStorage.setItem('profile_userid', JSON.stringify(Number(responseJson.UserID)));
           AsyncStorage.setItem('bookmarkUserid',JSON.stringify(Number(responseJson.UserID)));

           AsyncStorage.setItem('usertype',JSON.stringify(Number(responseJson.UserType)));
          AsyncStorage.setItem('typeid', JSON.stringify(Number(responseJson.UserType)));
          AsyncStorage.setItem('explore_page',JSON.stringify(0));

          console.log('userid & usertype',responseJson.UserID,'',responseJson.UserType)
          setTimeout(() => {
          Alert.alert(
            'Status',
            "Logged In Successfully",
            [
                   {text: 'OK', onPress: () => 
                    {this.clear('mainpage')}                   
                  },
            ]
        )
      }, 1000);

        // this.props.navigation.navigate('MainpageTabs')
         }else{
          setTimeout(() => {

          Alert.alert(
            'Status',
            responseJson.Msg,
            [
                   {text: 'OK', onPress: () => 
                  //  this.props.navigation.navigate('loginSignup')
                 {this.clear('loginSignup')}
                  },
            ]
        )
      }, 1000);

         }
     })
     .catch((error) => {
         console.warn(error);
     });
 }
  // onChangeText = (key, val) => {
  //   this.setState({ [key]: val })
  //   this.state.email!=''?this.setState({borderEmail:true}):this.setState({borderEmail:false});
  //   this.state.password!=''?this.setState({borderPass:true}):this.setState({borderPass:false})

  //   if ((email(this.state.email == '')) && (pass(this.state.password == ''))) {
  //     this.setState({ boolean: true })
  //   } else {
  //     this.setState({ boolean: false })
  //   }
  // }
  
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = () => {
    console.log('email', this.state.email, ' password', this.state.password);
    if ((!email(this.state.email == '')) && (!pass(this.state.password == ''))) {
    }
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
  termsClick=()=>{
   
    AsyncStorage.setItem('login', JSON.stringify(1));
    this.props.navigation.navigate('TermsAndCondition');
  }
  privacyClick=()=>{
    AsyncStorage.setItem('loginPrivacy', JSON.stringify(2));
    this.props.navigation.navigate('privacyPolicy');
    }
 
  render() {
    const js1 = JSON.stringify(this.props.data)

    return (

      <SafeAreaView
        style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor="#fff" hidden={false} />

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={()=>  alert("Under Developing") }
          >
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
            style={[this.state.email==''?styles.input:styles.input1,{borderColor: !this.state.borderEmail?'#CCCCCC28':'#27A291' }]}
            onFocus={()=>this.setState({borderEmail:true})}
            onBlur={()=>this.setState({borderEmail:true})}
            onSubmitEditing={()=>this.setState({borderEmail:false})}
            placeholder='Email'
            autoCapitalize='none'
            placeholderTextColor='#CCCCCC'
            onChangeText={val => this.onChangeText('email',val)}
            value={this.state.email}
          />
         <TextInput
            style={[this.state.password==''?styles.input:styles.input1,{borderColor: !this.state.borderPass?'#CCCCCC28':'#27A291' }]}
            onFocus={()=>this.setState({borderPass:true,})}
            onBlur={()=>this.setState({borderPass:true})}
            onSubmitEditing={()=>this.setState({borderPass:false})}
            placeholder='Password'
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor='#CCCCCC'
            onChangeText={val => this.onChangeText('password', val)}
            value={this.state.password}
            onSubmitEditing={()=>this.CheckConnectivity()}

          />
            <TouchableOpacity
            onPress={()=>this.CheckConnectivity()}>
           <LinearGradient style={styles.btnview} colors={
            ((!email(this.state.email === '')) && (!pass(this.state.password === ''))) ? ['#24D4BC', '#27A291'] : ['#CCCCCC', '#CCCCCC']} >

          
              <Text style={{ color: 'white', fontSize: 19 }}>Login</Text>
          </LinearGradient>
          </TouchableOpacity>

          <Text
            onPress={() => {
              this.props.navigation.navigate('forgotpwd')
            }}
                      style={styles.TextStyle1}
          >
            Forgot Password
              </Text>
            <View style={styles.row}>
                <View style={styles.logText}/>
                <Text style={{color:'#707070',fontSize:17}}>or Log In with</Text>
                <View style={styles.logText}/>
            </View>
          <View style={styles.logoContainer}>
            <Image style={styles.avatar}
              source={require('../assets/img/fb.png')}
            />
          <Image style={styles.avatar}
              source={require('../assets/img/google.png')}
            />
          </View>
          <TouchableOpacity onPress={()=>this.clear('newSignup')}>
          <View style={styles.btnview1}>
              <Text style={{color:'#24d4bc',fontSize:17,alignSelf:'center'}}>Don't Have an account?</Text>
            <TouchableOpacity  onPress={()=>this.clear('newSignup')}>
                <Text style={styles.boldText}>Sign Up</Text>
                </TouchableOpacity>
                </View>
          </TouchableOpacity>
            <Text style={styles.smallText}> By continuing you indicate that you have agree to </Text>
            <View style={{ flexDirection: 'row',justifyContent:'center' ,alignItems:'center'}}>
            <Text>PageVio's </Text>
            <Text
                onPress={() => this.termsClick()}
                style={styles.TextStyle}
                >Terms of service</Text><Text style={styles.smallText}> & </Text>
                <Text
                onPress={
                    () =>
                    this.privacyClick()
                }
                style={styles.TextStyle}>privacy Policy</Text>
            </View>

        </View>
        <Modal isVisible={this.state.loading}
                  >
                <Image source={require('../assets/gif/logo.gif')} style = {styles.gif} />
                 </Modal>
      </SafeAreaView >
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
  boldText:{
    color:'#000',
    fontWeight:'900',
    fontSize:20,
    textAlign:'center'
  },
  logText:{
    backgroundColor:'#CCCCCC', 
    height:1,
    width:screenWidth/4,
    marginRight:'5%'
  },
  gif:{
    alignSelf:'center',
    width: 140,           
    height: 140
  },
  avatar:{
    width: 60, 
    height: 60, 
    marginRight: 20 
  },
  smallText:{
    color: 'black', 
    fontSize: 13,
    marginTop: 5 
  },
  TextStyle1: {
    color: '#24d4bc',
    alignSelf: 'center',

    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 5
  },
  exploreBtn:{
    width: 130, 
    height: 130,
     alignSelf: 'flex-end',
     top:0,
     right:0
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 5
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
    width: width - 80,
    height: height / 14,
    alignSelf:'center',
    margin:'3%',
    // fontFamily: 'Azo Sans',
    paddingLeft: '5%',
    borderRadius:18,
    borderWidth:0.5,
    borderColor:'#CCCCCC28',
    backgroundColor: '#CCCCCC28',
    fontSize: 18,
    fontWeight: '500',
  },
  input1: {
    width: width - 80,
    height: height / 14,
    alignSelf:'center',
    // fontFamily: 'Azo Sans',
    margin: '2%',
    paddingLeft: '5%',
    color: '#fff',
    borderRadius: 18,
    borderColor: '#27A291',
    backgroundColor: '#27A291',
    fontSize: 18,
    fontWeight: '500',
  },
  btnview: {
    height: screenHeight / 12,
    width: screenWidth / 1.3,
    height: screenHeight / 14,
    justifyContent: 'center',
    marginTop: '2%',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnview1: {
      margin:'1%',
    width: screenWidth / 1.3,
    height: screenHeight / 14,
    // justifyContent: 'center',
    // marginTop: '2%',
    // alignItems: 'center',
    borderRadius: 23,
    borderColor:'#24d4bc',
    borderWidth:1
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:'2%'
  }
});
function mapStateToProps(state) {
  return {
    nav: state.apiReducer.nav,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
    savelogin: ()=> dispatch({type:'CHECKLOGIN'})

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp);
