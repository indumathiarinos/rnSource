import React, { Component } from 'react'
import {SafeAreaView,
    View,AsyncStorage,ImageBackground,BackHandler,TextInput,LayoutAnimation,StyleSheet, Text, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
const width = Dimensions.get('window').width;

console.disableYellowBox = true;

const height = Dimensions.get('window').height;
class EditCreateSection extends Component {
    constructor(){
        super()
  this.state = { 
      expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Public',
            title:'',
            backBtnActive:false,
            section:[],
            descdata:'',
            loading:false,
            getuserid:'',
            descLength:0,
            getcolId:'',
            gotoSectionEdit:false
            
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {

        AsyncStorage.getItem('EditCreateSec').then(val =>this.setState({ gotoSectionEdit: val })).done;
        AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
        AsyncStorage.getItem('collectionId').then((value) => this.setState({ getcolId : value })).done();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
      this.backpress();
      return true;
    }   
    getData() {
        setTimeout(() => {
            console.log('user id is  in create sec ',this.state.getuserid)
            // { this.exploredata(this.state.gettypeid, this.state.getpostid) }
        }, 10)
    }
    
    exploredata(userid,title,privacy,desc,colId){
        var json=JSON.stringify({
          'S_user_id': userid,
          "S_title":title,
          "S_privacy":privacy,
          "S_description":desc,
          "S_collection_id":colId,
          "S_section_id":""
          });
          console.warn(json+" create section")
          fetch("http://162.250.120.20:444/Login/SectionCollectionAdd",
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
                console.log('fsdadfasdfasdr',responseJson)
                this.setState({section: responseJson,loading:false})
                console.warn(responseJson)
                console.warn("sec")
                // AsyncStorage.setItem('loading',JSON.stringify(true))
                if(responseJson[0].msg=='Success'){
                  this.props.navigation.navigate('sectionEdit')
                        // this.props.navigation.goBack();
                }
       
            })
            .catch((error) => {
                console.warn(error);
            });
      }

      CheckConnectivity(){    
        NetInfo.fetch().then(state => {
            alert('edit  create section page');
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
          {this.exploredata(this.state.getuserid,this.state.title,this.state.dropdownText,this.state.descdata,this.state.getcolId)}
            }else{
                alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
            }
         
        });
      }
      createsection(){
        //   this.CheckConnectivity();
        this.setState({loading:true})
        {this.exploredata(this.state.getuserid,this.state.title,this.state.dropdownText,this.state.descdata,this.state.getcolId)}
      }
        changeLayout = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ expanded: !this.state.expanded });
          }
        nextBtn=()=>{
            console.log('title text is ',this.state.title)
            if(this.state.title!=''){
                this.setState({backBtnActive:true})
            }
        }
        backpress=()=>{         
           
                this.props.navigation.navigate('sectionEdit')
            
           }
    render() {
        const { navigate } = this.props.navigation;
        var imgSource=(this.state.dropdownText=='Public')?require('../assets/img/dropdown.png'):null;
        var imgSource1=(this.state.dropdownText=='Private')?require('../assets/img/dropdown.png'):null;

        return (
            <SafeAreaView style={{ flex: 2,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Create Section</Text>
                     <TouchableOpacity
                     onPress={()=>this.backpress()}
                >
 <Image style={{paddingRight:'5%'}}
                        
                        source={require('../assets/img/close.png')}/>
                     </TouchableOpacity>
                       
                      {/* </View> */}
                       
                </View>
                
                <ScrollView>
                <View style={{paddingLeft:'5%',paddingRight:'5%',flex:2}}>
                
                <Text style={styles.textTitle}>Section Title</Text>
                <TouchableOpacity style={styles.touchableBtn}>
                <TextInput
                textAlignVertical={'top'}
                onChangeText={(text)=>this.setState({title:text})}
                placeholder="Add a Title" style={{ textAlign:'center',fontSize:18,justifyContent:'center',padding:10,height: 50,borderRadius:20,backgroundColor:'#F9F9F9',width:width/2 }} />

                </TouchableOpacity>
                <Text style={styles.textTitle1}>Privacy</Text>
                {/* <TouchableOpacity style={styles.touchableBtn1}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#CCCCCC',fontSize:18,width:width-100,textAlign:'center'}}>Public</Text>
                    <Image 
                    source={require('../assets/img/dropdown.png')}/>
                    </View>     
                </TouchableOpacity> */}
                  <TouchableOpacity style={{  backgroundColor:'#ffff',
    justifyContent:'center',
    // alignItems:'center',
    // width:width-50,
    height:!this.state.expanded?50:100,
    elevation:3,
    borderRadius:30}} 
                onPress={this.changeLayout}>
                 <View>
                        
                    {!this.state.expanded?<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#707070',textAlign:'center',fontSize:18,width:width-120,}}>{this.state.dropdownText}</Text>
                    <Image 
                    source={require('../assets/img/dropdown.png')}/>
                    </View>:
                    (
                        <View
                     style={{flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text 
                    onPress={()=>this.setState({dropdownText:'Public',expanded:!this.state.expanded})}
                    style={{color:'#707070',fontSize:18,width:width-120,textAlign:'center'}}>Public</Text>
                    <Image 
                    style={{width:20}}
                    source={imgSource}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    <Text 
                    onPress={()=>this.setState({dropdownText:'Private',expanded:!this.state.expanded})}
                    style={{color:'#707070',fontSize:18,width:width-120,textAlign:'center'}}>Private</Text>
                    <Image 
                    style={{width:20}}
                    source={imgSource1}/>
                    </View>
                    </View>
                    // <View
                    //  style={{flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    // <Text onPress={()=>this.setState({dropdownText:'Public',expanded:!this.state.expanded})}
                    //  style={{color:'#707070',fontSize:18,width:width-100,textAlign:'center',padding:'2%'}}>Public</Text>
                    // <Text onPress={()=>this.setState({dropdownText:'Private',expanded:!this.state.expanded})}
                    // style={{color:'#707070',fontSize:18,width:width-100,textAlign:'center',padding:'2%'}}>Private</Text>
                    // </View>
                    )}
                    </View>                  
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={styles.descTextTitle}>Description</Text>
                <Text style={{color:'#707070',fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
        marginLeft:'-5%',
        marginTop:'5%'
        }}>(Optional)</Text>
                </View>
                <TextInput multiline textAlignVertical={'top'}
              maxLength={250}
                placeholder="Add Description" 
                onChangeText={(text)=>this.setState({descdata:text})}

                style={{ padding:'5%',textAlign: 'left' ,justifyContent:'center',height: 150,borderRadius:20,backgroundColor:'#F9F9F9' }} />

               
                    {/* <Text 
                     style={styles.desctouchableBtn}
                    // style={{justifyContent:'center',color:'#CCCCCC',fontSize:18}}
                    >Add Title</Text> */}
                   
            <Text style={{ color: '#707070', textAlign: 'right', paddingRight: '2%',marginBottom:'10%' }}>{this.state.descdata.length}/250</Text>

                    
                {/* <Text style={{padding:'3%'}}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Text> */}                                     
                </View>
                </ScrollView>
                <View style={styles.bottomLine}>
                {/* <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} /> */}
                   {/* {!this.state.backBtnActive?(   <TouchableOpacity
                   onPress={this.nextBtn}>
                   <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:'5%'}}>
                    <Text style={{color:'#707070',textAlign:'right',fontSize:18,paddingRight:'4%'}}>Next</Text>
                    <Image source={require('../assets/img/right_arrow.png')} />
                      
                    </View>
                   </TouchableOpacity>):(<View style={{flexDirection:'row',paddingRight:'5%',paddingLeft:'5%',justifyContent:'space-between'}}>
                   <TouchableOpacity
                   onPress={()=>this.setState({backBtnActive:false})}>
                   <View style={{flexDirection:'row',}}>
                   <Image source={require('../assets/img/left_arrow.png')} />
                    <Text style={{color:'#707070',textAlign:'right',fontSize:18,paddingLeft:'4%'}}>Back</Text>
                      
                    </View>
                   </TouchableOpacity> */}
                    <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'4%'}}
                                       onPress={()=>this.createsection()}>

                   {/* onPress={()=>this.props.navigation.navigate('collection')}> */}
                   <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#707070',alignSelf:'center',textAlign:'right',fontSize:18,paddingRight:'2%'}}>Save</Text>
                    <Image style={{width:30,height:30,alignSelf:'center'}} source={require('../assets/img/saveIcon.png')} />
                      
                    </View>
                   </TouchableOpacity>
                       {/* </View>)
                   } */}
                
                  
                    {/* <View style={styles.headerRow}> */}
                     
                       
                </View>
                <Modal isVisible={this.state.loading}
         // onBackdropPress={() => this.setState({ loading: true })}
         >
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
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
        position: 'absolute',
        backgroundColor:'#fff',
        // paddingRight:'10%'
       
      },
    desctouchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        padding:'1%',
        // alignSelf:'center',
        // width:width-50,
        height:150,
    
        color:'#CCCCCC',fontSize:18,
        borderRadius:30
    },
    touchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        alignItems:'center',
        // width:width-50,
        height:50,
        borderRadius:30
,    },
touchableBtn1:{
    backgroundColor:'#ffff',
    justifyContent:'center',
    // alignItems:'center',
    // width:width-50,
    height:50,
    elevation:3,
    borderRadius:30
,    },
    headerRow:{
        height: '8%',
        // flex:0.1,
        // paddingTop:'5%',
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
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
    },
    textTitle1:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
        marginTop:'10%'
    },
    descTextTitle:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
        marginTop:'5%'
    },
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: '25%',
        left: 0,
        right: 0,
    },
    backdrop: {
        //   flex:0.5,
        //   marginTop:'5%'

    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
    }
})
function mapStateToProps(state){
    return{
    nav:state.apiReducer.nav,
    }
  }
  
  
  function mapDispatchToProps(dispatch){
    return{
        changeNavRec:()=>dispatch({type:'CHANGE_NAV_REC'}),
        changeNavNews:()=>dispatch({type:'CHANGE_NAV_NEWS'})
    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditCreateSection);


// import React from 'react';
// import { View, SafeAreaView, Text,AsyncStorage, Dimensions,BackHandler, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ImageBackground, TouchableOpacityBase } from 'react-native';
// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);
// import { SimpleAnimation } from 'react-native-simple-animations';
// import LinearGradient from 'react-native-linear-gradient';
// // import apiCall from "../redux/ActionCreator";
// // import { connect } from "react-redux";


// console.disableYellowBox = true;
// const options = {
//   headers: {
//     //     'Accept': 'application/json',
//     // 'content-type':'multipart/form-data'
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   }
// };
// const formData = new FormData()
// formData.append('email', 'Testing@gmail.com');
// formData.append('password', 'password');
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
//     ? "Please provide a valid email address."
//     : undefined;

// const pass = value =>
//   value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
//     ? "Please provide a valid password"
//     : undefined;
    
// class SignIn extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       email: '',
//       password: '',
//       boolean: false,
//       animating: false,
//       align: 'center',
//       alignsecond: false,
//       data: '',
//       borderEmail:false,
//       borderPass:false
//     };

//     setTimeout(
//       () =>
//         this.setState({ align: 'flex-start' }, function () {
//           this.setState({
//             alignsecond: true,
//           });
//         }),
//       3000
//     );
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//   }
// componentDidMount() {
//   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
// }
// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
// }
// handleBackButtonClick() {
//   BackHandler.exitApp();

//   return true;
// }
//   onChangeText = (key, val) => {
//     this.setState({ [key]: val })
//     this.state.email!=''?this.setState({borderEmail:true}):this.setState({borderEmail:false});
//     this.state.password!=''?this.setState({borderPass:true}):this.setState({borderPass:false})

//     if ((email(this.state.email == '')) && (pass(this.state.password == ''))) {
//       this.setState({ boolean: true })
//     } else {
//       this.setState({ boolean: false })
//     }
//   }
//   signUp = () => {
//     console.log('email', this.state.email, ' password', this.state.password);

//     // if(this.state.boolean==true){
//     if ((!email(this.state.email == '')) && (!pass(this.state.password == ''))) {

//       // console.log('email',this.state.email,' password',this.state.password)
//       this.props.navigation.navigate('mainpage');
//     }
//     // }

//   }
//   validate = (text) => {
//     console.log(text);
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (reg.test(text) === false) {
//       console.log("Email is Not Correct");
//       this.setState({ email: text })
//       return false;
//     }
//     else {
//       this.setState({ email: text })
//       console.log("Email is Correct");
//     }
//   }
//   termsClick=()=>{
   
//     AsyncStorage.setItem('signupTerms', JSON.stringify(2));
//     this.props.navigation.navigate('TermsAndCondition');
//   }
//   privacyClick=()=>{
 
//     AsyncStorage.setItem('signupPrivacy', JSON.stringify(2));
//     this.props.navigation.navigate('privacyPolicy');
//     }
//   // componentDidMount(){
//   //   var json=JSON.stringify({
//   //     'email': email,
//   //     'password': pass,
//   //     });
//   //   this.props
//   //   .apiCall("http://162.250.120.20:555/Service1.svc/register1",
//   //    json
//   //   ,options)
//   //   .then(() => {
//   //     const data = this.props.data;
//   //     console.log(data);
//   //   })
//   //   .catch(error => {
//   //     // console.log(error);
//   //   });

//   // }


//   render() {
//     const js1 = JSON.stringify(this.props.data)

//     return (


//       <View
//         style={styles.container}>
//         <TouchableOpacity
//           style={{ width: 130, height: 130, alignSelf: 'flex-end',top:0,right:0}}
//           onPress={() => this.props.navigation.navigate('MainpageTabs')}>
//           <Image
//             source={require('../assets/img/explore.png')}
//           />
//         </TouchableOpacity>

//         <View style={{ alignContent: 'center', alignItems: 'center',flex:1 }}>


//           <Image style={{
//             width: 300,
//             resizeMode: 'contain', marginBottom: 15
//           }}
//             source={require('../assets/img/welc.png')}
//           />

//           <TextInput
//             style={[!this.state.borderEmail?styles.input:styles.input1]}
//             placeholder='Email'
//             autoCapitalize="none"
//             placeholderTextColor='#CCCCCC'
//             onChangeText={val => this.onChangeText('email', val)}
//             value={this.state.email}

//           />
//           <TextInput
//             style={[!this.state.borderPass?styles.input:styles.input1]}
//             placeholder='Password'
//             autoCapitalize="none"
//             secureTextEntry={true}
//             placeholderTextColor='#CCCCCC'
//             // onChangeText={(text) => this.validate(text)}

//             onChangeText={val => this.onChangeText('password', val)}
//             value={this.state.password}
//           />


//           <Text
//             onPress={() => {
//               this.props.navigation.navigate('forgotpwd')
//             }}
//             // style={{ textAlign: 'center' }}
//                       style={styles.TextStyle1}
//           >
//             Forgot Password
//               </Text>


//           <View style={styles.logoContainer}>
            
//             <Image style={{ width: 60, height: 60, marginRight: 20 }}
//               source={require('../assets/img/fb.png')}
//             />
//           <Image style={{ width: 60, height: 60, marginLeft: 20 }}
//               source={require('../assets/img/google.png')}
//             />
//           </View>

//           <LinearGradient style={styles.btnview} colors={
//             ((!email(this.state.email === '')) && (!pass(this.state.password === ''))) ? ['#24D4BC', '#27A291'] : ['#00000028', '#00000028']} >

//             <TouchableOpacity
//               onPress={() => this.props.navigation.navigate('MainpageTabs')}
//             >

//               <Text style={{ color: 'white', fontSize: 19 }}>Sign In</Text>
//             </TouchableOpacity>
//           </LinearGradient>

//           <Text style={{ color: 'black', fontSize: 13, marginTop: 20 }}> By continuing you indicate that you have agree to </Text>
//           <View style={{ flexDirection: 'row',justifyContent:'center' ,alignItems:'center'}}>
//           <Text>PageVio's </Text>
//           <Text
//               onPress={() => this.termsClick()}
//               style={styles.TextStyle}
//               >Terms of service</Text><Text style={{ color: 'black', fontSize: 12, marginTop: 5 }}> & </Text>
//             <Text
//               onPress={
//                 () =>
//                   this.privacyClick()
//               }
//               style={styles.TextStyle}>privacy Policy</Text>
//           </View>

//         </View>
//       </View>

//     );
//   }
// }

// var styles = StyleSheet.create({
//   TextStyle: {
//     textAlign: 'center',
//     fontSize: 13,
//     textDecorationLine: 'underline',
//     color:'#27A291'
//   },
//   TextStyle1: {
//     color: '#27A291',
//     alignSelf: 'flex-end',
//     marginRight: '5%',
//     fontFamily: 'Azo Sans',
//     // textAlign: 'flex-end',
//     fontSize: 12,
//     textDecorationLine: 'underline',
//     marginTop: 5
//   },
//   container: {
//     // fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     // marginBottom:10
//   },
//   logoContainer: {
//     flexDirection: 'row',
//     alignItems: "center",
//     marginTop: 10
//   },
//   logoText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//     marginTop: 15,
//     marginBottom: 15
//   },
//   logoDescription: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: 'black'
//   },
//   input: {
//     width: screenWidth - 80,
//     height: screenHeight / 12,
//     fontFamily: 'Azo Sans',
//     margin: '2%',
//     // left:10,
//     // padding: '3%',
//     paddingLeft: '5%',
//     // paddingLeft:20,
//     // color: 'black',
//     borderRadius: 18,
//     // borderWidth: 1,
//     borderColor: '#27A291',
//     backgroundColor: '#CCCCCC28',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   input1: {
//     width: screenWidth - 80,
//     height: screenHeight / 12,
//     fontFamily: 'Azo Sans',
//     margin: '2%',
//     // left:10,
//     // padding: '3%',
//     paddingLeft: '5%',
//     // paddingLeft:20,
//     color: '#fff',
//     borderRadius: 18,
//     // borderWidth: 1,
//     borderColor: '#27A291',
//     backgroundColor: '#27A291',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   btnview: {
//     height: screenHeight / 12,

//     // padding: '2%',
//     width: screenWidth / 1.3,
//     height: screenHeight / 14,
//     justifyContent: 'center',
//     marginTop: 30,
//     alignItems: 'center',
//     borderRadius: 23,
//   }

// });

// // const mapDispatchToProps = dispatch => ({
// //   apiCall: (url,data,config) => dispatch(apiCall(url,data,config))
// // });

// // const mapStateToProps = state => ({
// //   data: state.apiReducer.data,
// //   //data2:state.apiReducer.data,
// //   error: state.apiReducer.error,
// // });

// export default SignIn;
// // connect(
// //   mapStateToProps,
// //   mapDispatchToProps
// // )(Signup);