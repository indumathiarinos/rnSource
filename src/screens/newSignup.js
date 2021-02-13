import React,{Component} from 'react';
import {View,Text,SafeAreaView,AsyncStorage,Alert,Image,TouchableOpacity,BackHandler,StyleSheet,Dimensions,TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width,height}=Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import { connect } from "react-redux";
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
    ? "Please provide a valid email address."
    : undefined;

const pass = value =>
  value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
    ? "Please provide a valid password"
    : undefined;

    class NewSignup extends Component{
      constructor(props){
          super(props);
          this.state={
              email:'',
              pwd:'',
              re_pwd:'',
              borderEmail:'',
              borderPass:'',
              borderUser:'',
              border:false,
              borderPwd:false,
              borderRpwd:false
          }
          this.backPress=this.backPress.bind(this);
      }
      componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this.backPress);
      }
      componentWillUnMount(){
        BackHandler.removeEventListener('hardwareBackPress',this.backPress);
      }
      backPress(){
        this.props.navigation.navigate('loginSignup')
        // this.props.navigation.goBack();
        // BackHandler.exitApp();
        return true;
      }
      CheckConnectivity(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
            // {this.getData();}
           {this.state.email!="" && this.state.pwd !="" && this.state.re_pwd !=""?this.signUp():
          alert('Please fill all the fields')
          } 
          }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
          }
         
        });
      }
      clear=(pagename)=>{
        this.props.changeNavRec();
        this.props.navigation.navigate(pagename)
        this.setState({email:'',pwd:'',re_pwd:''})
      }
signUp=()=>{
  
 if(email(this.state.email) && pass(this.state.pwd) && this.state.pwd==this.state.re_pwd){
 var json=JSON.stringify({
    'Email': this.state.email,
    'Password': this.state.pwd,
    });
console.warn(json+"")
    fetch("http://162.250.120.20:444/Login/SignUp",
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
    //     if(responseJson.message==="Invalid EmailID" || responseJson.message==="Invalid Username" || responseJson.message ==="Invalid Password"){
    //       Alert.alert(
    //         'Status',
    //         responseJson.message,
    //         [
    //                {text: 'OK', onPress: () => 
    //               //  this.props.navigation.navigate('loginSignup')
    //               this.clear('newSignup')
    //               },
    //         ]
    //     )
    //            }
    //      else if(responseJson.message==='sign up successful'){
    //       // alert(responseJson.Msg)
        
    //        AsyncStorage.setItem('userid', responseJson.UserID);
    //        AsyncStorage.setItem('usertype', responseJson.UserType);
    //       AsyncStorage.setItem('typeid', responseJson.UserType);

    //       console.log('userid & usertype',responseJson.UserID,' ',responseJson.UserType)
        //   Alert.alert(
        //     'Status',
        //     "Signup Successfully",
        //     [
        //            {text: 'OK', onPress: () => 
        //             this.clear('MainpageTabs')                   
        //           },
        //     ]
        // )
    //      }else{
    //       Alert.alert(
    //         'Status',
    //         responseJson.message,
    //         [
    //                {text: 'OK', onPress: () => 
    //               //  this.props.navigation.navigate('loginSignup')
    //               this.clear('newSignup')
    //               },
    //         ]
    //     )
    //      }
    //  })
        if(responseJson.Msg==='Invalid EmailID'){
          alert(responseJson.Msg)
        }
        else{
          AsyncStorage.setItem('userid', responseJson.UserID);
         // AsyncStorage.setItem('typeid', item.TypeID);
         Alert.alert(
          'Status',
          "Signup Successfully",
          [
                 {text: 'OK', onPress: () => 
                  this.clear('loginSignup')                   
                },
          ]
      )
        //   alert('Signup Successfully')
        //  { this.props.navigation.navigate('MainpageTabs')}
        }
        //alert(this.state.data.status)
    })
    .catch((error) => {
        console.warn(error);
    });
 }

}
signupdata(){
 
}
termsClick=()=>{
   
  AsyncStorage.setItem('login', JSON.stringify(1));
  this.props.navigation.navigate('TermsAndCondition');
}
privacyClick=()=>{
  AsyncStorage.setItem('loginPrivacy', JSON.stringify(2));
  this.props.navigation.navigate('privacyPolicy');
  }
onChangeText = (key, val) => {
  this.setState({ [key]: val })
  // this.state.email!=''?this.setState({borderEmail:true}):this.setState({borderEmail:false});
  // this.state.pwd!=''?this.setState({borderPass:true}):this.setState({borderPass:false})
  // this.state.user!=''?this.setState({borderUser:true}):this.setState({borderUser:false})

}
render(){
  return(
      <SafeAreaView style={styles.container}>
          <View style={{height:'8%',justifyContent:'center',paddingLeft:'5%'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('loginSignup')}>
          <Image 
           style={{width:50,height:50,alignSelf:'flex-start',}} source={require('../assets/img/backarrow.png')} />
            </TouchableOpacity>
          </View>
          <Image style={{alignSelf:"center",marginTop:'5%',width:50,height:50}} source={require('../assets/img/logo1.png')}/>
          <Text style={{color:'#27A291',fontSize:24,alignSelf:'center',margin:'3%'}}>Sign Up</Text>
          <TextInput
          style={[this.state.email==''?styles.input:styles.input1,{borderColor: !this.state.border?'#CCCCCC28':'#27A291' }]}
          onFocus={()=>this.setState({border:true})}
          onBlur={()=>this.setState({border:true})}
          onSubmitEditing={()=>this.setState({border:false,borderUser:true})}
          placeholder='Email'
          placeholderTextColor='#CCCCCC'
          onChangeText={val => this.onChangeText('email',val)}
          value={this.state.email}
        />
       <TextInput
          style={[this.state.pwd==''?styles.input:styles.input1,{borderColor: !this.state.borderPwd?'#CCCCCC28':'#27A291' }]}
          onFocus={()=>this.setState({borderPwd:true,borderUser:true})}
          onBlur={()=>this.setState({borderPwd:true,borderUser:true})}
          onSubmitEditing={()=>this.setState({borderPwd:false,borderEmail:true})}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='#CCCCCC'
          onChangeText={val => this.onChangeText('pwd', val)}
          value={this.state.pwd}

        />
        <TextInput
          style={[this.state.re_pwd==''?styles.input:styles.input1,{borderColor: !this.state.borderRpwd?'#CCCCCC28':'#27A291' }]}
          onFocus={()=>this.setState({borderRpwd:true,borderEmail:true})}
          onBlur={()=>this.setState({borderRpwd:true,borderEmail:true})}
          onSubmitEditing={()=>this.setState({borderRpwd:false, borderPass:true})}
          placeholder='Retype Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='#CCCCCC'
          // onChangeText={(text) => this.validate(text)}
          onChangeText={val => this.onChangeText('re_pwd', val)}
          value={this.state.re_pwd}
        />
        <View style={{marginTop:'2%'}}>
        <LinearGradient style={styles.confirmBtn} colors={
                      (this.state.email != ''&& this.state.pwd != ''&& this.state.re_pwd != '')? ['#24D4BC', '#27A291'] : ['#CCCCCC', '#CCCCCC']} >

          {/* (!email(this.state.email == ''))&&(!pass(this.state.pwd == ''))&& (!pass(this.state.pwd == ''))? ['#24D4BC', '#27A291'] : ['#CCCCCC', '#CCCCCC']} > */}

          <TouchableOpacity
           onPress={() => this.CheckConnectivity()}
          >
          <Text style={{textAlign:'center',color:'#fff',fontSize: 16,fontFamily:'AzoSans-Regular'}}>Sign Up</Text>
          </TouchableOpacity>
        </LinearGradient>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:'15%',alignSelf:'center'}}>
              <View style={{backgroundColor:'#CCCCCC',height:1,width:width/4,marginRight:'5%'}}/>
              <Text style={{color:'#707070',fontSize:15,fontFamily:'AzoSans-Regular'}}>or Sign Up with</Text>
              <View style={{backgroundColor:'#CCCCCC',height:1,width:width/4,marginLeft:'5%'}}/>
          </View>
          <View style={styles.logoContainer}>
          
          <Image style={{ width: 60, height: 60, marginRight: 20 }}
            source={require('../assets/img/fb.png')}
          />
        <Image style={{ width: 60, height: 60, marginLeft: 20 }}
            source={require('../assets/img/google.png')}
          />
        </View>
        <Text style={styles.smallText}> By continuing you indicate that you have agree to </Text>
        <View style={{ flexDirection: 'row',justifyContent:'center' ,alignItems:'center'}}>
            <Text style={{fontSize:12,fontFamily:'AzoSans-Regular'}}>PageVio's </Text>
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

        {/* <TouchableOpacity style={styles.confirmBtn}>
        </TouchableOpacity> */}
      </SafeAreaView>
  )
}


}
const styles=StyleSheet.create({
 
  container:{
      flex:1,
      backgroundColor:'#fff'
  },
 confirmBtn:{
  width:width-80,
  height:height/14,
  borderRadius:24,
  backgroundColor:'#CCCCCC',
  alignSelf:'center',
  justifyContent:'center',
 },
input: {
  width: width - 80,
  height: height / 14,
  alignSelf:'center',
  margin:'3%',
  fontFamily: 'AzoSans-Regular',
  paddingLeft: '5%',
  borderRadius:18,
  borderWidth:0.5,
  borderColor:'#CCCCCC28',
  backgroundColor: '#CCCCCC28',
  fontSize: 14,
},
input1: {
  width: width - 80,
  height: height / 14,
  alignSelf:'center',
  fontFamily: 'AzoSans-Regular',
  margin: '2%',
  paddingLeft: '5%',
  color: '#fff',
  borderRadius: 18,
  borderColor: '#27A291',
  backgroundColor: '#27A291',
  fontSize: 14,
},
logoContainer: {
  flexDirection: 'row',
  alignItems: "center",
  alignSelf:'center',
  marginTop: 10
},
TextStyle: {
  textAlign: 'center',
  fontSize: 12,
  textDecorationLine: 'underline',
  color:'#27A291',
  fontFamily:'AzoSans-Regular'
},
smallText:{
  color: 'black', 
  fontSize: 12,
  fontFamily:'AzoSans-Regular',
  marginTop: 5,
  alignSelf:'center'
},
})

function mapStateToProps(state) {
  return {
    nav: state.apiReducer.nav,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSignup);