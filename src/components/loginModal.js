import React,{useState} from 'react';
import { View, SafeAreaView, Text,AsyncStorage, Dimensions,BackHandler, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import LinearGradient from 'react-native-linear-gradient';
const {width,height}=Dimensions.get('window');
import Modal from 'react-native-modal';
import NetInfo from "@react-native-community/netinfo";
import PropTypes from "prop-types";

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


const LoginModal=({navigation,closeModal,close})=> {

 const [username,setusername] = useState('');
 const [email,setemail] = useState('');
 const [password,setpassword] = useState('');
 const [borderEmail,setBorderEmail] = useState('');
 const [borderPass,setBorderPass] = useState('');
 const [loading,setLoading] = useState('');
 const [userStatus,setUserStatus] = useState('');

 const emailValidation = value =>
 value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
   ? true
   : false;

const passValidation = value =>
 value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
   ? "Please provide a valid password"
   : undefined;
   const regex=value=> 
   value && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/i.test(value)?true:false;

 const CheckConnectivity=()=>{    
  NetInfo.fetch().then(state => {

    console.log("Connection type cheking", state.type);
    console.log("Is connected cheking?", state.isConnected);

    if(state.isConnected==true){

      login()
    }else{
      alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
    }
   
  });
}
const login=()=>{
  let userStatus;
  setLoading(true);
  let validation=email.includes('@')
  console.log('validation value',validation)
    {!validation?setUserStatus('2'):setUserStatus('1')}

    console.log('user status',userStatus);

  var json=JSON.stringify({
     'email':email,
     'Pwd': password,
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
        //  this.setState({ expl: responseJson,loading:false })
         console.warn(responseJson)

         if(responseJson.Msg==="Invalid EmailID" || responseJson.Msg==="Invalid Username" || responseJson.Msg ==="Invalid Password"){
        setTimeout(() => {
          Alert.alert(
            'Status',
            responseJson.Msg,
            [
                   {text: 'OK', onPress: () => 
                  //  this.props.navigation.navigate('loginSignup')
                  {
                    clearfunc('loginSignup');
                  }
                  },
            ]
        )
        }, 1000);
      
               }
         else if(responseJson.Msg==='Logedin successfully'){
          // alert(responseJson.Msg)
          // this.props.savelogin();
           AsyncStorage.setItem('userid', JSON.stringify(Number(responseJson.UserID)));
           AsyncStorage.setItem('profile_userid', JSON.stringify(Number(responseJson.UserID)));
           AsyncStorage.setItem('bookmarkUserid',JSON.stringify(Number(responseJson.UserID)));

           AsyncStorage.setItem('usertype',JSON.stringify(Number(responseJson.UserType)));
          // AsyncStorage.setItem('typeid', JSON.stringify(Number(responseJson.UserType)));
          AsyncStorage.setItem('explore_page',JSON.stringify(0));

          console.log('userid & usertype',responseJson.UserID,'',responseJson.UserType)
          // this.setState({ loginPopup: false});
          // closeModal();
          close();
          navigation.navigate('mainpage')
          


        // this.props.navigation.navigate('MainpageTabs')
         }else{
          setTimeout(() => {

          Alert.alert(
            'Status',
            responseJson.Msg,
            [
                   {text: 'OK', onPress: () => 
                  //  this.props.navigation.navigate('loginSignup')
                 {clearfunc('loginSignup')}
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

 const onChangeText = (key, val) => {
    // this.setState({ [key]: val })
    let header='set'+[key].toString();
    console.log('header value is ',header)
   header(val);

  }
 const clearfunc = (pagename) => { 
    // this.props.changeNavRec();
    // navigation.navigate(pagename)
    close();
    setemail('');
    setpassword('');
  }
  const signUp = () => {
    console.log('email', email, ' password', password);
    if ((!emailValidation(email == '')) && (!passValidation(password == ''))) {
    }
  }
  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
     setemail(text)
      return false;
    }
    else {
      setemail(text)
      console.log("Email is Correct");
    }
  }
  const termsClick=()=>{
   
    AsyncStorage.setItem('login', JSON.stringify(1));
    navigation.navigate('TermsAndCondition');
  }
  const privacyClick=()=>{
    AsyncStorage.setItem('loginPrivacy', JSON.stringify(2));
    navigation.navigate('privacyPolicy');
    }
 

    return (

      <SafeAreaView
        style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor="#fff" hidden={false} />

        {/* <TouchableOpacity
          style={styles.exploreBtn}
          onPress={()=>  alert("Under Developing") }
          >
          <Image
            source={require('../assets/img/explore.png')}
          />
        </TouchableOpacity> */}

        <View style={{ alignContent: 'center', alignItems: 'center',marginTop:'7%' }}>
          <Image style={{
            width: 300,
            resizeMode: 'contain', marginBottom: 15
          }}
            source={require('../assets/img/welc.png')}
          />
           <TextInput
            style={[email==''?styles.input:styles.input1,{borderColor: !borderEmail?'#CCCCCC28':'#27A291' }]}
            onFocus={()=>setBorderEmail(true)}
            onBlur={()=>setBorderEmail(true)}
            onSubmitEditing={()=>setBorderEmail(false)}
            placeholder='Email'
            autoCapitalize='none'
            placeholderTextColor='#CCCCCC'
            onChangeText={val => setemail(val)}
            value={email}
          />
         <TextInput
            style={[password==''?styles.input:styles.input1,{borderColor: !borderPass?'#CCCCCC28':'#27A291' }]}
            onFocus={()=>setBorderPass(true)}
            onBlur={()=>setBorderPass(true)}
            onSubmitEditing={()=>setBorderPass(false)}
            placeholder='Password'
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor='#CCCCCC'
            onChangeText={val => setpassword(val)}
            value={password}
            onSubmitEditing={()=>CheckConnectivity()}

          />
            <TouchableOpacity
            onPress={()=>CheckConnectivity()}>
           <LinearGradient style={styles.btnview} colors={
            ((!emailValidation(email === '')) && (!passValidation(password === ''))) ? ['#24D4BC', '#27A291'] : ['#CCCCCC', '#CCCCCC']} >

          
              <Text style={{ color: 'white', fontSize: 19 }}>Login</Text>
          </LinearGradient>
          </TouchableOpacity>

          <Text
            onPress={() => {
              navigation.navigate('forgotpwd')
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
          <TouchableOpacity onPress={()=>clearfunc('newSignup')}>
          <View style={styles.btnview1}>
              <Text style={{color:'#24d4bc',fontSize:17,alignSelf:'center'}}>Don't Have an account?</Text>
            <TouchableOpacity  onPress={()=>clearfunc('newSignup')}>
                <Text style={styles.boldText}>Sign Up</Text>
                </TouchableOpacity>
                </View>
          </TouchableOpacity>
            <Text style={styles.smallText}> By continuing you indicate that you have agree to </Text>
            <View style={{ flexDirection: 'row',justifyContent:'center' ,alignItems:'center'}}>
            <Text>PageVio's </Text>
            <Text
                onPress={() => termsClick()}
                style={styles.TextStyle}
                >Terms of service</Text><Text style={styles.smallText}> & </Text>
                <Text
                onPress={
                    () =>
                    privacyClick()
                }
                style={styles.TextStyle}>privacy Policy</Text>
            </View>

        </View>
        <Modal isVisible={loading}
                  >
                <Image source={require('../assets/gif/logo.gif')} style = {styles.gif} />
                 </Modal>
      </SafeAreaView >
    );
  
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
    // flex: 0.9,
    // flex:1,
    height:height/1.2,
    backgroundColor: "#fff",
    borderRadius:10
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

    LoginModal.defaultProps = {
        width: width-60,
        height:height/18,
        color:'#fff',
        backgroundColor: '#27A291',
        margin:'2%',
        buttonText:'Next',
        borderColor:'#27A299',
        borderWidth:0,
        isGradient:false,
        gradientColors:[null],
        textSize:18,
        marginTop:'1%',
        textBold:'200',
        bottom:'0%',
        position:'relative'
    }
    
    LoginModal.propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        margin: PropTypes.string,
        marginLeft: PropTypes.string,
        marginRight: PropTypes.string,
        marginTop:PropTypes.string,
        color:PropTypes.string,
        backgroundColor: PropTypes.string,
        buttonText: PropTypes.string,
        borderColor:PropTypes.string,
        borderWidth:PropTypes.number,
        isGradient:PropTypes.bool,
        gradientColors:PropTypes.array,
        textSize:PropTypes.number,
        textBold:PropTypes.string,
        bottom:PropTypes.string,
        position:PropTypes.string
    };
export default LoginModal;



// import React,{Component} from 'react';
// import { View, StyleSheet,TouchableOpacity,Text,Dimensions} from 'react-native';
// import PropTypes from "prop-types";
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from "react-native-modal";

// const {width1,height1} = Dimensions.get('window');

// const LoginModal = ({width,buttonText,textSize,textBold,height,color,margin,marginTop,backgroundColor,customClick,borderWidth,borderColor,isGradient,gradientColors,
//     bottom,position})=>{
    
//             return(
//                 <TouchableOpacity
//                 onPress={customClick} 
//                 style = {!isGradient?[styles.container,{backgroundColor,width,height,margin,marginTop,borderWidth,borderColor,position,bottom}]:null}>
//                  {!isGradient?
//                     <Text style={[styles.textStyle,{color,fontSize:textSize,fontWeight:textBold}]}>{buttonText}</Text>
//                     :
//                    <LinearGradient style={[styles.container,{backgroundColor,width,height,margin,marginTop,borderWidth,borderColor,position,bottom}]} colors={gradientColors}  start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
//                    <Text style={[styles.textStyle,{color,fontSize:textSize,fontWeight:textBold}]}>{buttonText}</Text>
//                    </LinearGradient>
//                 }
//                 </TouchableOpacity>
//             );
//          }
    
//      const styles=StyleSheet.create({
//             container:{
//                 alignItems:'center',
//                 justifyContent:'center',
//                 alignSelf:'center',
//                 borderRadius:5
            
//             },
//             textStyle:{
//               color:'#000',
//               alignSelf:'center',
//               fontSize:12,
//               margin:'5%'
//             },
//             leftTextStyle:{
//               color:'#000',
//               alignSelf:'center',
//               margin:'8%',
//               marginTop:'10%',
//               fontSize: 39,
//               fontWeight:'bold' 
//             },
//             smallText:{
//               color:'#000',
//               textAlign:'center',
//               marginLeft:'8%',
//               marginRight:'8%',
//               marginBottom:'3%',
//               fontSize: 20,
//               fontWeight:'bold' 
//             }
//     });
    
//     LoginModal.defaultProps = {
//         width: width1-60,
//         height:height1/18,
//         color:'#fff',
//         backgroundColor: '#27A291',
//         margin:'2%',
//         buttonText:'Next',
//         borderColor:'#27A299',
//         borderWidth:0,
//         isGradient:false,
//         gradientColors:[null],
//         textSize:18,
//         marginTop:'1%',
//         textBold:'200',
//         bottom:'0%',
//         position:'relative'
//     }
    
//     LoginModal.propTypes = {
//         width: PropTypes.number,
//         height: PropTypes.number,
//         margin: PropTypes.string,
//         marginLeft: PropTypes.string,
//         marginRight: PropTypes.string,
//         marginTop:PropTypes.string,
//         color:PropTypes.string,
//         backgroundColor: PropTypes.string,
//         buttonText: PropTypes.string,
//         borderColor:PropTypes.string,
//         borderWidth:PropTypes.number,
//         isGradient:PropTypes.bool,
//         gradientColors:PropTypes.array,
//         textSize:PropTypes.number,
//         textBold:PropTypes.string,
//         bottom:PropTypes.string,
//         position:PropTypes.string
//     };
// export default LoginModal;