import React, { Component } from 'react'
import { View,Button,AsyncStorage, SafeAreaView,ImageBackground,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,TouchableOpacity, PermissionsAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-picker';
import Modal1 from 'react-native-modal';
import ImgToBase64 from 'react-native-image-base64';
import NetInfo from '@react-native-community/netinfo';
const width = Dimensions.get('window').width;
console.disableYellowBox = true;
const height = Dimensions.get('window').height;
const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacinia sapien, in bibendum est. "
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boolean: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      ImageSource: null,
      getuserid:'',
      profileGetData:'',
      username:'',
      avatar:'',
      coverImg:'',
      headline:'',
      about:'',
      loading:true,
      photo:{},
      filePath:{},
      devicePic:false,
      coverimgfilePath:{},
      coverimgDevicePic:false,
      baseuri:'',
      website:'',
      fb:'',
      insta:'',
      twitter:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  // upload(base64String,colName){
  //   var basebyte=`data:image/jpeg;base64,`+base64String;
  //   this.setState({baseuri:basebyte})
  //   // alert(JSON.stringify(basebyte)) 
  //   var json={
  //     "UserID":this.props.userInfo.UserID,"ColumnName":colName,"Value":basebyte
  //     }
  //     console.log('profile data to change pics json',json)
  //   this.props.profileUpdateService('ProfilesUpdate',json)
       
  //               setTimeout(() => {
  //                 this.setState({loading:true})
  //                 {this.exploredata(this.props.userInfo.UserID)}
  //               }, 3000);
  //   }
  upload(base64String,colName){
    this.setState({loading:true})
    var basebyte=`data:image/jpeg;base64,`+base64String;
    this.setState({baseuri:basebyte})
    // alert(JSON.stringify(basebyte)) 
    var json=JSON.stringify({
      "UserID":this.state.getuserid,"ColumnName":colName,"Value":basebyte
      });
      console.log('json',json)
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
                      console.warn(responseJson)
         
              // console.log('responsejson is ',responseJson)
              // if(responseJson.Msg=="Success"){
                AsyncStorage.setItem('profileChanged',JSON.stringify(true))
                this.setState({loading:true})
                {this.exploredata(this.state.getuserid)}

              // }
        })
        .catch((error) => {
            console.warn(error);
        });
    // {this.profileUpdateService(this.state.getuserid,"UserImage",basebyte)}
  }
  avatarTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: false
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });

    ImgToBase64.getBase64String(this.state.filePath.uri)
    // console.log('img byte is ', ImgToBase64.getBase64String(this.state.filePath))
  .then(base64String =>   
    this.upload(base64String,"UserImage")
       
    // { this.onImageupload(base64String) } 
  // console.log('base string is ',base64String)
  )
  .catch(err => console.log(err));
      }

    });
  }
//   onImageupload(filePath,colName) {
//     console.log('file path is ',filePath)
//     const formData = new FormData()
//     console.log('userid is ',this.state.getuserid)
//     formData.append("UserID", this.state.getuserid)
//     formData.append("ColumnName",colName)
//     formData.append("Value", filePath
//     // ImgToBase64.getBase64String(filePath)
//     // filePath.uri
//     // {
//     //     name: filePath.fileName,
//     //     type:filePath.type,
//     //     uri:
//     //         Platform.OS === "android" ?filePath.uri : filePath.replace("file://", "")
//     // }
//     );
//     // console.log('formdata uri is ',this.state.filePath.uri);
//     // console.log('formdata name is ',this.state.filePath.fileName)
//     // console.log('formdata type is ',this.state.filePath.type)

//     fetch("http://162.250.120.20:444/Login/ProfilesUpdate",
//     {
//       method: 'POST',
//       headers: {
//           'content-type': 'multipart/form-data'
//       },
//       body: formData,
//     }
// )
//     .then((response) => response.json())
//     .then((responseJson) => {
//                   console.warn(responseJson)
     
//           console.log('responsejson is ',responseJson)
//     })
//     .catch((error) => {
//         console.warn(error);
//     });
   
// }
  coverimgTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: false
      }
    };

    ImagePicker.z(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          coverimgfilePath: source,
        });

    ImgToBase64.getBase64String(this.state.coverimgfilePath.uri)
    // console.log('img byte is ', ImgToBase64.getBase64String(this.state.filePath))
  .then(base64String =>   
    this.upload(base64String,"CoverImage")
       
    // { this.onImageupload(base64String) } 
  // console.log('base string is ',base64String)
  )
  .catch(err => console.log(err));
      }

    });
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
        alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
      }
     
    });
  }
  
  getData() {
    setTimeout(() => {
        { this.exploredata(this.state.getuserid) }
    }, 5)
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
          // for (let i = 0; i <this.state.profileGetData.length; i++) {
            // alert(this.state.bookdetail[0].Image)
             this.setState({ 
               username: responseJson[0].username,
               avatar:responseJson[0].avatar,
               coverImg:responseJson[0].cover,
               headline:responseJson[0].headline,
               about:responseJson[0].about,
              })
            // }
            console.log('username is ',this.state.username)
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.backpress();
    return true;
  }
  profileUpdateService(userid,col_Name,value){
    var json=JSON.stringify({
      "UserID":userid,"ColumnName":col_Name,"Value":value
      });
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
                      console.warn(responseJson)
         
              console.log('responsejson is ',responseJson)
        })
        .catch((error) => {
            console.warn(error);
        });
  }
  
  onClose() {
    //called on modal closed
    console.log('Modal just closed');
  }

  onOpen() {
    //called on modal opened
    console.log('Modal just opened');
  }

  onClosingState(state) {
    //called on modal close/open of the swipe to close change
    console.log('Open/Close of the SwipeToClose just changed');
  }
  backpress=()=>{
    //    console.log('before set',this.props.nav)
      //  this.props.changeNavNews();
      //  this.props.navigation.navigate('MainpageTabs')
      this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
   }
   headlineUpdate=(val)=>{
     if(this.state.headline!=val){
       console.log('enters in headline onchange text',val);
    this.setState({headline:val})
    {this.profileUpdateService(this.state.userid,'HeadLine',val)}
     }
   }
   usernameUpdate=(val)=>{
    if(this.state.username!=val){
   this.setState({username:val})
   {this.profileUpdateService(this.state.userid,'UserName',this.state.username)}
    }
  }
  aboutUpdate=(val)=>{
    if(this.state.about!=val){
   this.setState({about:val})
   {this.profileUpdateService(this.state.userid,'About',this.state.about)}
    }
  }
  webUpdate=(val)=>{
    if(this.state.website!=val){
   this.setState({website:val})
   {this.profileUpdateService(this.state.userid,'Website',this.state.website)}
    }
  }
  fbUpdate=(val)=>{
    if(this.state.fb!=val){
   this.setState({fb:val})
   {this.profileUpdateService(this.state.userid,'Facebook',this.state.fb)}
    }
  }
  instaUpdate=(val)=>{
    if(this.state.insta!=val){
   this.setState({insta:val})
   {this.profileUpdateService(this.state.userid,'Instagram',this.state.insta)}
    }
  }
  twitterUpdate=(val)=>{
    if(this.state.twitter!=val){
   this.setState({twitter:val})
   {this.profileUpdateService(this.state.userid,'Twitter',this.state.twitter)}
    }
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  
  render() {
    let text;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={styles.staticheader}>

            <View style={{ flexDirection: 'row', width: width - 40, justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
              <TouchableOpacity >
                <Text style={{
                  padding: '5%',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold'
                }}
                >Profile</Text>
              </TouchableOpacity>
                </LinearGradient>
              <TouchableOpacity style={{ alignItems: 'center' }}
                onPress={() => this.props.navigation.navigate('settingsAccount')}
              >
                <Text style={styles.headerText}

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
            <TouchableOpacity onPress={() =>this.backpress()}>
              <Image source={require('../assets/img/close.png')} />
            </TouchableOpacity>
          </View>
          <View>
          <View style={styles.containerStyle} >
            <ImageBackground style={[styles.sliderContainerStyle,{backgroundColor:this.state.coverImg==null?'#24d4bc':null}]}
              source={{uri:this.state.coverImg!=""?this.state.coverImg:null}}>
              {/* <Slider/> */}
            </ImageBackground>
            <TouchableOpacity style={{borderColor:'#fff',borderWidth:0.5,right:10,marginTop:80, position:'absolute',backgroundColor:'#24d4bc',width:30,height:30,borderRadius:30/2,alignItems:'center',justifyContent:'center'}}
              // onPress={() => this.refs.modal4.open()}
              onPress={this.coverimgTapped.bind(this)}
              >
            <Image source={require('../assets/img/pencil.png')}/>

            </TouchableOpacity>

          </View> 
                <View style={{ marginBottom:10,
 width: 110,
 height: 110,
 borderRadius: 63,
 borderWidth:1,
 borderColor:'#27a291', 
    position: 'absolute',
    flexDirection: 'row',
    alignSelf:'center',
    marginTop:width/3.4}}>
        {this.state.photo && (
                <Image  style={styles.avatar} 
                source={{uri:this.state.avatar
                }}
                // source={{ uri: this.state.photo.uri }}
                />
        )}
                <TouchableOpacity style={{marginLeft:80,borderColor:'#fff',borderWidth:0.5, position: 'absolute',marginTop:70,padding:'1%',backgroundColor:'#24d4bc',width:30,height:30,borderRadius:30/2,alignItems:'center',justifyContent:'center'}}
              // onPress={() => this.refs.modal4.open()}
              onPress={this.avatarTapped.bind(this)}
              >
            <Image source={require('../assets/img/pencil.png')}/>

            </TouchableOpacity>
                </View>
              
            {/* <Text style={styles.textTitle}>Profile Image</Text>
            <Image style={styles.roundImg}
              source={require('../assets/img/user.png')} /> */}
            {/* <TouchableOpacity style={styles.touchableBtn1}
              onPress={() => this.refs.modal4.open()}
            // onPress={()=>this.props.navigation.navigate('upload_pic')}
            >
              <Text style={{ color: '#27A291', fontSize: 18, textAlign: 'center' }}>Upload Profile Image</Text>
            </TouchableOpacity> */}

           <View style={{flex:1,margin:'2%',marginTop:'15%'}}>
            <Text style={styles.textTitle1}>Username</Text>
            <TextInput style={styles.touchableBtn}
              placeholderTextColor='#707070'
              onChangeText={(val)=>this.usernameUpdate(val)}
              value={this.state.username}
            />
            {/* <Text style={{ color: '#646464', fontSize: 15, textAlign: 'center', margin: '2%' }}>(JPG, PNG, TIF or GIF recommended)</Text> */}
            <Text style={styles.textTitle1}>Headline</Text>
            {/* <TouchableOpacity style={styles.touchableBtn}>
                    <Text style={{
                        alignSelf:'center',
                        // backgroundColor:'pink',
                        width:width-80,
                        color:'#000',fontSize:18}}>Editor, GraTiFi</Text>
                </TouchableOpacity> */}
            <TextInput style={styles.touchableBtn}
              placeholderTextColor='#707070'
              onChangeText={(val)=>this.headlineUpdate(val)}
              value={this.state.headline}
            />
            {/* <TextInput multiline textAlignVertical={'top'}
              maxLength={2000}
              value={this.state.baseuri} style={{ height: 170, textAlign: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#F9F9F9', paddingLeft: '8%', textAlign: 'left' }} /> */}

 
         
            {/* <Text style={styles.textTitle1}>Banner</Text>

            <TouchableOpacity style={styles.touchableBtn1}
              onPress={() => this.refs.modal4.open()}
            >
              <Text style={{ color: '#27A291', fontSize: 18, textAlign: 'center' }}>Upload Banner Image</Text>
            </TouchableOpacity> */}

            {/* <Text style={{ color: '#646464', fontSize: 15, textAlign: 'center', margin: '2%' }}>(JPG, PNG, TIF or GIF recommended)</Text> */}
            {/* <SelectableText
              selectable
              multiline
              contextMenuHidden
              scrollEnabled={false}
              editable={false}
              onSelectionChange={(event) => {
                const {
                  nativeEvent: {
                    selection: { start, end },
                  },
                } = event
                const str = text.substring(start, end)
                onSelectionChange({ str, start, end })
              }}
              style={{
                color: "#BAB6C8",
              }}
              value={text}
            /> */}

            <Text style={styles.descTextTitle}>About</Text>
            <TextInput multiline textAlignVertical={'top'}
              maxLength={2000}
              // placeholder={!this.state.about?"tell us more about yourself":null}
              onChangeText={(val)=>this.aboutUpdate(val)}
              value={this.state.about} style={{ height: 170, textAlign: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#F9F9F9', paddingLeft: '8%', textAlign: 'left' }} />
            {/* <TextInput textAlignVertical={'top'}
                style={[styles.lorem,styles.input]} multiline={true} placeholder="tell us more about yourself" /> */}
            {/* <Text 
                     style={styles.desctouchableBtn}
                    // style={{justifyContent:'center',color:'#CCCCCC',fontSize:18}}
                    >tell us more about yourself</Text> */}

            <Text style={{ color: '#707070', textAlign: 'right', paddingRight: '2%' }}>{this.state.about.length}/2000</Text>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:'2%'}}>
             <Image source={require('../assets/img/world.png')}/>
            <Text style={styles.textTitle1}>Website</Text>
            </View>
            <TextInput style={styles.touchableBtnpics}
              placeholder='enter your website'
              placeholderTextColor='#707070'
              onChangeText={(val)=>this.webUpdate(val)}
              value={this.state.website}
            />
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:'2%'}}>
             <Image source={require('../assets/img/fb.png')}/>
            <Text style={styles.textTitle1}>Facebook</Text>
            </View>
            <TextInput style={styles.touchableBtnpics}
              placeholder='enter your Facebook'
              placeholderTextColor='#707070'
              onChangeText={(val)=>this.fbUpdate(val)}
              value={this.state.fb}
            />
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:'2%'}}>
             <Image source={require('../assets/img/insta.png')}/>
            <Text style={styles.textTitle1}>Instagram</Text>
            </View>
            <TextInput style={styles.touchableBtnpics}
              placeholder='enter your Instagram'
              placeholderTextColor='#707070'
              onChangeText={(val)=>this.instaUpdate(val)}
              value={this.state.insta}
            />
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:'2%'}}>
             <Image source={require('../assets/img/twitter.png')}/>
            <Text style={styles.textTitle1}>Twitter</Text>
            </View>
            <TextInput style={styles.touchableBtnpics}
              placeholder='enter your Twitter'
              placeholderTextColor='#707070'
              onChangeText={(val)=>this.twitterUpdate(val)}
              value={this.state.twitter}
            />
            <View style={{ marginTop:'10%',marginBottom:'10%'}}>   
    
            <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('loginSignup')}>
                <Text style={{ color: '#ffff', fontSize: 18, textAlign: 'center' }}>Logout</Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>
            </View> 
          </View>
        </ScrollView>
        <Modal1 isVisible={this.state.loading}>
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal1>
        <Modal
          style={[styles.modal, styles.modal4]}
          position={'bottom'}
          ref={'modal4'}>
          <View>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={()=>this.selectPhotoTapped.bind(this)}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={()=>this.handleChoosePhoto()}>
              <Text style={styles.text}>Choose Photo</Text>

            </TouchableOpacity>

          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 2.2,
  },
  sliderContainerStyle: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    borderWidth:0.3,
    borderBottomColor:'#CCCCCC',
    resizeMode:'cover'

    // elevation:1
    // backgroundColor: 'pink'
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 108/2,
    alignSelf:'center'
    // borderColor:'#27A291',
    // borderWidth:1,
    // borderWidth: 2,
    // borderColor: "white",
    // marginBottom:10,
    // position: 'absolute',
    // flexDirection: 'row',
    // justifyContent:'center',
    // alignSelf:'center',
    // alignItems: 'center',
    // marginTop:120  //actual marginTop:130
  },
  lorem: {
    textAlign: 'left',
    color: '#000',
    fontSize: 19,
    marginBottom: 5,
    lineHeight: 50,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  },
  input: {
    marginTop: 50,
    padding: 5,
    height: 150,
    width: 300,
    borderColor: 'purple',
    borderWidth: 2,
  },
  text: {
    fontSize: 18,
    padding: '5%',
    textAlign: 'center'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal4: {
    flex:0.18
  },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', height: Dimensions.get('window').height, width: Dimensions.get('window').width }, capture: { flex: 0, backgroundColor: '#fff', borderRadius: 5, color: '#000', padding: 10, margin: 40 },
  btnview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 30,

  },
  logoutBtn: {
  },
  roundImg: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginBottom: '5%',
  },
  staticheader: {
    paddingLeft: '2%',
    height:'5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    elevation: 1,
    borderBottomColor:'#707070'
  },
  bottomLine: {

    height: '8%',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  desctouchableBtn: {
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    textAlign: 'left',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    height: 150,
    color: '#CCCCCC', fontSize: 18,
    borderRadius: 30
  },
  touchableBtn: {
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '8%',
    paddingRight: '8%',
    height: 50,
    fontSize: 17,
    borderRadius: 30
    ,
  },
  touchableBtnpics: {
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '8%',
    paddingRight: '8%',
    marginBottom: '2%',
    marginTop: '2%',
    height: 50,
    fontSize: 17,
    borderRadius: 30
    ,
  },
  touchableBtn1: {
    backgroundColor: '#ffff',
    justifyContent: 'center',
    // alignItems:'center',
    // width:width-50,
    // height:'2.5%',
    height: 50,
    elevation: 3,
    borderRadius: 30
    ,
  },
  headerRow: {
    height: '11%',
    // flex:0.1,
    paddingTop: '5%',
    flexDirection: 'row',
    backgroundColor: '#ffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 1,
    borderBottomColor: '#707070'

  },
  heading: {
    width: width - 50,
    paddingLeft: 50,
    // backgroundColor:'pink',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27A291'
  },
  textTitle: {
    fontFamily: 'Azo Sans,Medium',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '3%',
  },
  textTitle1: {
    fontSize: 18,
    textAlign: 'center',
    // fontWeight:'600',
    fontWeight: 'bold',
    padding: '3%',
    // marginTop:'1%'
  },
  descTextTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '5%',
    // marginTop: '5%'
  },
  headerText: {
    padding: '2%',
    fontSize: 16,
    fontWeight: 'bold'
  },
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

export default connect(mapStateToProps,mapDispatchToProps)(Settings);