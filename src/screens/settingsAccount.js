import React, { Component } from 'react'
import {
    View,AsyncStorage, ImageBackground,TextInput,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid,SafeAreaView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import Modal from 'react-native-modalbox';
import Modal1 from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import NetInfo from'@react-native-community/netinfo';
const width = Dimensions.get('window').width;

console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class SettingsAccount extends Component {
  constructor(props) {
      super(props)
      this.state = {
                  boolean:false,
                  fb:false,
                  google:false,
                  twitter:false,
                  selfdestruct:false,
                  getuserid:'',
                  email:'',
                  Password:'',
                  loading:true
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // {this.getData()}
  this.CheckConnectivity();
}
CheckConnectivity(){    
    NetInfo.fetch().then(state => {
  
      console.log("Connection type cheking", state.type);
      console.log("Is connected cheking?", state.isConnected);
  
      if(state.isConnected==true){
        {this.getData();}
      }else{
        alert('Not Connected')
      }
     
    });
  }
  
getData() {
  setTimeout(() => {
      { this.exploredata(this.state.getuserid) }
  }, 1000)
}
exploredata(userid){
var json=JSON.stringify({
  'userid':userid
  });
  fetch("http://162.250.120.20:444/Login/ProfileUpdateGet",
    {
        method: 'POST',
        headers:  {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: json
    }
)
    .then((response) => response.json())
    .then((responseJson) => {
        //alert(responseText);
        this.setState({profileGetData: responseJson,loading:false})
        console.warn(responseJson)
        for (let i = 0; i <this.state.profileGetData.length; i++) {
          // alert(this.state.bookdetail[0].Image)
           this.setState({ 
             email: responseJson[i].email,
             password:responseJson[i].password.length>8?'':responseJson[i].password,
            })
          }
        //   console.log('username is ',this.state.username)
        //alert(this.state.data.status)  
    })
    .catch((error) => {
        console.warn(error);
    });
}
selfDestructService(userid){
  var json=JSON.stringify({
    'UserID':userid
    });
    console.log('json ',json)
    fetch("http://162.250.120.20:444/Login/UserDestruct",
      {
          method: 'POST',
          headers:  {
              'Accept': 'application/json',
              'content-type': 'application/json'
          },
          body: json
      }
  )
      .then((response) => response.json())
      .then((responseJson) => {
          //alert(responseText);
         this.logoutpress();
            console.log('username is ',responseJson)
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
  }
  logoutpress=()=>{
    AsyncStorage.setItem('userid',JSON.stringify(""));
    AsyncStorage.setItem('typeid',JSON.stringify(""));
    AsyncStorage.setItem('profile_img',JSON.stringify(""));
    AsyncStorage.setItem('user_name',JSON.stringify(""));
    AsyncStorage.setItem('postid',JSON.stringify(""));
    AsyncStorage.setItem('collectionId',JSON.stringify(""));
    AsyncStorage.setItem('sectionId',JSON.stringify(""));
    AsyncStorage.setItem('usertype',JSON.stringify(""));
    AsyncStorage.setItem('bookmarkUserid',JSON.stringify(""));
    AsyncStorage.setItem('loginData', JSON.stringify(false));
    this.props.savelogout();
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('newSignup');
  }
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.backpress();
  return true;
}
profileUpdateService(userid,col_Name,value){
    // this.setState({loading:true})
    var json=JSON.stringify({
      "UserID":userid,"ColumnName":col_Name,"Value":value
      });
      console.log(json)
      fetch("http://162.250.120.20:444/Login/ProfilesUpdate",
        {
            method: 'POST',
            headers:  {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: json
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading:false})
                      console.warn(responseJson)
         
              console.log('responsejson is ',responseJson)
        })
        .catch((error) => {
            console.warn(error);
        });
  }
  emailUpdate=(val)=>{
    if(this.state.email!=val){
   this.setState({email:val})
   {this.profileUpdateService(this.state.getuserid,'Email',val)}
    }
  }
  passwordUpdate=(val)=>{
    if(this.state.password!=val){
   this.setState({password:val})
   {this.profileUpdateService(this.state.getuserid,'Password',val)}
    }
  }
  backpress=()=>{
    //    console.log('before set',this.props.nav)
      //  this.props.changeNavNews();
      //  this.props.navigation.navigate('MainpageTabs')
      this.props.navigation.goBack();

    //    console.log('after set',this.props.nav);
   }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff'}}>
          <View style={styles.staticheader}>
         
          <View style={{ flexDirection: 'row', width: width-60, justifyContent: 'center', alignItems: 'center' }}>
        
            <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('settings')}
            >
              <Text style={styles.headerText}

              >Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
             style={{ borderRadius: 10,backgroundColor:'#27A291'}}
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 14,
                color: 'white',
                fontFamily: 'AzoSans-Medium'
              }}
              >Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('emailNotification')}
            >
              <Text style={styles.headerText}

              >Email Notifications</Text>
            </TouchableOpacity>

            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity onPress={()=>this.backpress()}>
                       <Image
                            style={{ alignSelf: 'center',width:50,height:50 }} 
                            source={require('../assets/img/close.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={{flex:1,paddingLeft:'5%',paddingRight:'5%', marginBottom:'5%',
}}>
        <Text style={styles.textTitle}>Email</Text>
           
                <TextInput style={styles.touchableBtn}
                placeholder='Email'
                placeholderTextColor='#cccccc'
                onChangeText={(val)=>this.emailUpdate(val)}
                value={this.state.email}
            />
  <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
                    <TouchableOpacity>
                    <Text style={{color:'#ffff', fontSize:16,
        fontFamily:'AzoSans-Regular',textAlign:'center'}}>Edit Email</Text>
                </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.textTitle}>Password</Text>
           
           <TextInput style={styles.touchableBtn}
           secureTextEntry={true}
           placeholder='Password'
           placeholderTextColor='#cccccc'
           onChangeText={(val)=>this.passwordUpdate(val)}
           value={this.state.password}
       />
<LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
               <TouchableOpacity>
               <Text style={{color:'#ffff', fontSize:16,
        fontFamily:'AzoSans-Regular',textAlign:'center'}}>Change Password</Text>
           </TouchableOpacity>
           </LinearGradient>
            <View style={{marginBottom:'10%'}}>

            <View style={{flexDirection:'column',flex:1,marginTop:'7%',marginBottom:'1%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:'2%'}}>
                    <Image style={{marginLeft:'5%'}} source={require('../assets/img/fb1.png')} />
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-around',height:height/9,paddingRight:'6%'}}>
                    <Text style={[styles.socialmediaText,
                      ]}>Connect to Facebook</Text>
                    <Text style={styles.socialDesc}>Connecting with Facebook allows you to login with one click. We will never post to Facebook or message your friends without your permission.</Text>
                    </View>
                </View>
                {this.state.fb?( 
               <TouchableOpacity style={styles.btnview} onPress={()=>this.setState({fb:!this.state.fb})}>
               <Text style={styles.connectedText}>Connected</Text>
           </TouchableOpacity>
          ):( <TouchableOpacity style={styles.touchableBtn1}
                onPress={()=>this.setState({fb:!this.state.fb})}>
                    <Text style={[styles.connectedText,{color:'#27A291'}]}>Connect</Text>
                </TouchableOpacity>)
                }
               
               
            </View>
            <View style={{flexDirection:'column',flex:1,marginTop:'3%',marginBottom:'2%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:'1%'}}>
                    <Image style={{marginLeft:'5%'}} source={require('../assets/img/google1.png')} />
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-around',height:height/9,paddingRight:'6%',}}>
                    <Text style={styles.socialmediaText}>Connect to Google</Text>
                    <Text style={styles.socialDesc}>Connecting with Google allows you to login with one click. We will never post to Google or message your friends without your permission.</Text>
                    </View>
                </View>
                {this.state.google?( 
               <TouchableOpacity style={styles.btnview}  onPress={()=>this.setState({google:!this.state.google})}>
               <Text style={styles.connectedText}>Connected</Text>
           </TouchableOpacity>
           ):( <TouchableOpacity style={styles.touchableBtn1}
                onPress={()=>this.setState({google:!this.state.google})}>
                    <Text style={[styles.connectedText,{color:'#27A291'}]}>Connect</Text>
                </TouchableOpacity>)
                }
               
               
            </View>
            <View style={{flexDirection:'column',flex:1,marginTop:'3%',marginBottom:'2%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:'1%'}}>
                    <Image style={{marginLeft:'5%'}} source={require('../assets/img/twitter.png')} />
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-around',height:height/9,paddingRight:'6%',}}>
                    <Text style={styles.socialmediaText}>Connect to Twitter</Text>
                    <Text style={styles.socialDesc}>Connecting with Twitter allows you to login with one click. We will never post to Twitter or message your friends without your permission.</Text>
                    </View>
                </View>
                {this.state.twitter?( 
               <TouchableOpacity style={styles.btnview}  onPress={()=>this.setState({twitter:!this.state.twitter})}>
               <Text style={styles.connectedText}>Connected</Text>
           </TouchableOpacity>
          ):( <TouchableOpacity style={styles.touchableBtn1}
                onPress={()=>this.setState({twitter:!this.state.twitter})}>
                    <Text style={[styles.connectedText,{color:'#27A291',}]}>Connect</Text>
                </TouchableOpacity>)
                }
               
               
            </View>
            <View style={{flexDirection:'column',flex:1,marginTop:'3%',marginBottom:'2%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:'1%'}}>
                    <Image style={{marginLeft:'5%'}} source={require('../assets/img/selfDestruct.png')} />
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-around',height:height/9,paddingRight:'6%',}}>
                    <Text style={styles.socialmediaText}>Self-Destruct</Text>
                    <Text style={styles.socialDesc}>Self-destruct will permanently remove your profile, comments, and posts, along with any pages, publications, series and periodicals you created.</Text>
                    </View>
                </View>
                {/* {this.state.selfdestruct?( 
               <TouchableOpacity style={styles.btnview}  onPress={()=>this.selfDestructService(this.state.getuserid)}>
               <Text style={styles.connectedText}>Self Destruted</Text>
           </TouchableOpacity>
          ):(  */}
          <TouchableOpacity style={styles.touchableBtn1}
              onPress={()=>this.selfDestructService(this.state.getuserid)}>
                    <Text style={[styles.connectedText,{color:'#27A291'}]}>Self Destruct</Text>
                </TouchableOpacity>
                {/* )
                } */}
               
               
            </View>

            </View>

                               <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('loginSignup')}>
                    <Text style={styles.connectedText}>Logout</Text>
                </TouchableOpacity>
                </LinearGradient>
                  
        </View>
        </ScrollView>
        <Modal1 isVisible={this.state.loading}>
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal1>
      
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    btnview: {
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderRadius:30,
        backgroundColor:'#27A291'

      },
    logoutBtn:{
    },
    roundImg:{
        width:100,
        height:100,
        borderRadius:100/2,
        alignSelf:'center',    
        marginBottom:'5%',

        // backgroundColor:'blue'

    },
    staticheader: {
        paddingLeft: '2%',
        // paddingRight:'2%',
        flexDirection: 'row',
        // justifyContent: 'center', 
        alignItems: 'center',
        // height: '10%',
        // width:width-40,
        backgroundColor: '#ffff',
        elevation: 1,
        borderBottomColor:'#707070'
    
      },
    bottomLine: {
      
        height:'8%',
        bottom:0,
        left: 0,
        // elevation:3,
        right: 0,
        borderTopColor:'gray',
        borderTopWidth:0.5,
      
        // opacity:0.5,
        justifyContent:'center',
        // position: 'absolute',
        backgroundColor:'#fff',
        // paddingRight:'10%'
       
      },
    desctouchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        // alignItems:'center',
        textAlign:'left',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingTop:'2%',
        paddingBottom:'2%',
        // alignSelf:'center',
        // width:width-50,
        height:150,
        // marginBottom:'5%',
    
        color:'#CCCCCC',fontSize:18,
        borderRadius:30
    },
    touchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        alignItems:'flex-start',
        // width:width-50,
        paddingLeft:'8%',
        paddingRight:'8%',
        height:50,
        fontSize:16,
        fontFamily:'AzoSans-Regular',
        borderRadius:30,
        marginBottom:'5%',
  },
  socialmediaText:{
    justifyContent:'center',
    textAlign:'left',
    fontSize:16,
    fontFamily:'Montserrat-Bold',
    marginLeft:'4%'
  },
  socialDesc:{
    color:'#707070',
    marginLeft:'5%',
    fontSize:12,
    fontFamily:'AzoSans-Regular',
  },
  connectedText:{
    color:'#ffff',
    fontSize:16,
    fontFamily:'AzoSans-Regular',
    textAlign:'center'
  },
touchableBtn1:{
    backgroundColor:'#ffff',
    justifyContent:'center',
    // alignItems:'center',
    // width:width-50,
    // height:'2.5%',
    height:50,
    elevation:3,
    borderRadius:30
    },
    headerRow:{
        height: '11%',
        // flex:0.1,
        paddingTop:'5%',
        flexDirection:'row',
         backgroundColor: '#ffff',
         justifyContent: 'space-around',
         alignItems: 'center', 
         elevation:1,
         borderBottomColor:'#707070'
     
    },
    heading:{
        width:width-50,
        paddingLeft:50,
        // backgroundColor:'pink',
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'#27A291'
    },
    textTitle:{
        fontSize:16,
        textAlign:'center',
        fontFamily:'Montserrat-Bold',
        padding:'3%',
       
    },
    textTitle1:{
        fontSize:18,
        textAlign:'center',
        // fontWeight:'600',
        fontWeight:'bold',
        padding:'5%',
        // marginTop:'1%'
    },
    descTextTitle:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
        marginTop:'5%'
    },
    headerText: {
        padding: '2%',
        fontSize: 14,
        fontFamily: 'AzoSans-Medium',
        color:'#707070'
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
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
    savelogout: ()=> dispatch({type:'CHECKLOGOUT'})
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SettingsAccount);