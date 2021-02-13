import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  BackHandler,
  FlatList,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import ViewMoreText from 'react-native-view-more-text';
// import ReadMore from 'react-native-read-more-text';
import ReadMore from 'react-native-read-more-text';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import ModalBox from 'react-native-modalbox';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';

console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
 
class ProfileCollection extends Component {
  constructor() {
    super();
    this.state = {   
      getuserid:'',
      followHighlight:false,
      profil:[],
      proflname:'',
      followers:'',
      share:'',
      about:'',
      loading:false,
      getuserid:'',
      avatar:'',
      collection:'',
      headline:'',
      shareModal:false,
      loginUserid:'',
      Is_Follow:'',
      publicCollections:''
      
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  async componentDidMount() {
    AsyncStorage.getItem('profile_userid').then((value)=>{this.setState({getuserid:value})});
    AsyncStorage.getItem('userid').then((val) => this.setState({ loginUserid: val })).done();
    console.log('user id in profile coll ',this.state.getuserid);
    // {this.getData()}
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('profile_userid').then((val) => this.setState({ getuserid: val })).done();
      AsyncStorage.getItem('userid').then((val) => this.setState({ loginUserid: val })).done();  
      this.CheckConnectivity();
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener.remove()
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
  
  handleBackButtonClick() {
    this.backpress()
        return true;
  } 
  getData(){
    setTimeout(() => {
      {this.exploredata()}
      {this.exploredataCol(this.state.getuserid)}
    }, 1000);
  }
exploredata(){
  var json=JSON.stringify({"UserID":this.state.getuserid,"View_UserID":this.state.loginUserid});

    fetch("http://162.250.120.20:444/Login/ViewProfile_About",
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
          this.setState({profil: responseJson,loading:false})
          if(this.state.profil!=[]){
            this.setState({
              proflname: this.state.profil[0].username,
              followers: this.state.profil[0].followsubs,
              avatar:this.state.profil[0].avatar,
             // share: responseJson[0].,
             headline:this.state.profil[0].headline,
              about: this.state.profil[0].about,
              cover:this.state.profil[0].cover,
              Is_Follow:this.state.profil[0].Is_Follow
 
            })
          }
          console.log('profile service ',responseJson);
          //alert(this.state.profil[0].username)  
      })
      .catch((error) => {
          console.warn(error);
      });
}
followService(userid, follower_id) {
  // this.setState({ loading: true })
  var json = JSON.stringify({"followingID":follower_id,"followerID":userid,"Action_For":"Add"}
  );
  console.log('follow data ',json)
  fetch("http://162.250.120.20:444/Login/FollowAddGet",
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
      this.setState({ loading: false });
      console.warn(responseJson);
      { this.exploredata() }
      console.log('follow insert service called');
      // if(responseJson.MSGS == "Added successfully" || responseJson.MSGS == "Already Exist"){
      // }

    })
    .catch((error) => {
      console.warn(error);
    });
}
fb = () => {
  this.setState({ shareModal: false,});
  let shareOptions2 = {
    url: 'https://pagevio.com/author-profile/'+this.state.getuserid,
    social: Share.Social.FACEBOOK,
  };
  console.log('share click ',Share.Social.FACEBOOK,this.state.getuserid)
  Share.shareSingle(shareOptions2);
}
insta = () => {
  this.setState({ shareModal: false,});
  let shareOptions2 = {
    url: 'https://pagevio.com/author-profile/'+this.state.getuserid,
    social: Share.Social.INSTAGRAM,
  };
  console.log('share click ',Share.Social.INSTAGRAM,this.state.getuserid)
  Share.shareSingle(shareOptions2);
}
pinterest = () => {
  this.setState({ shareModal: false});
  let shareOptions2 = {
    url: 'https://pagevio.com/author-profile/'+this.state.getuserid,
    social: Share.Social.PINTEREST,
  };
  console.log('share click ',Share.Social.PINTEREST,this.state.getuserid)
  Share.shareSingle(shareOptions2);
}
twitter = () => {
  this.setState({ shareModal: false});
  let shareOptions2 = {
    url: 'https://pagevio.com/author-profile/'+this.state.getuserid,
    social: Share.Social.TWITTER,
  };
  console.log('share click ',Share.Social.TWITTER,this.state.getuserid)
  Share.shareSingle(shareOptions2);
}
tumblr = () => {
  this.setState({ shareModal: false});
  let shareOptions2 = {
    url: 'https://pagevio.com/author-profile/'+this.state.getuserid,
    social: Share.Social.TUMBLR,
  };
  console.log('share click ',Share.Social.TUMBLR,this.state.getuserid)
  Share.shareSingle(shareOptions2);
}
// pressIcon = (item) => {
//   let { collection } = this.state;
//   collection = collection.map(e => {
//       if (item.collectionsID === e.collectionsID) {
//           // item.like = !e.like;
//           return this.props.navigation.navigate('collectionDetail');
//           //   } else if(item.id === 1){
//           //     return this.props.navigation.navigate('filter', {
//           //       item: item});
//           //     }else if(item.id === 2){
//           //       return this.props.navigation.navigate('bookmarks', {
//           //         item: item});
//       } else {
//           return e;
//       }
//   });
// }
pressIcon = (item) => {
  console.log('entered ', item)
  let { collection } = this.state;
  collection = collection.map(e => {
      //     if (item.collectionsID === e.collectionsID) {
        AsyncStorage.setItem('profile_coll_userid',JSON.stringify(Number(this.state.loginUserid)))

      // AsyncStorage.setItem('collectionId',item.collectionsID);
      // AsyncStorage.setItem('col_id',item.collectionsID);
      AsyncStorage.setItem('coll_name', item.Title);
      AsyncStorage.setItem('coll_desc', item.Description);
     {this.state.loginUserid!=this.state.getuserid? AsyncStorage.setItem('profileCollection',JSON.stringify(true)): AsyncStorage.setItem('profileCollection',JSON.stringify(false))}
      console.log('collection id ', item.collectionsID)
      // item.like = !e.like;
      return this.state.loginUserid!=this.state.getuserid? this.props.navigation.navigate('profileSection', { 'collId': item.collectionsID.toString() + "" }):this.props.navigation.navigate('collectionDetail', { 'collId': item.collectionsID.toString() + "" });
      // this.props.navigation.navigate('collectionDetail', { 'collId': item.collectionsID.toString() + "" });
      // this.props.navigation.navigate('collectionDetail',{'collId':item.collectionsID});
      // } else {
      //     return e;
      // }
  });
}

backpress=()=>{
  //    console.log('before set',this.props.nav)
    //  this.props.changeNavNews();
    //  this.props.navigation.navigate('MainpageTabs')
    AsyncStorage.setItem('profileCollection',JSON.stringify(false));
    this.props.navigation.goBack();

  //    console.log('after set',this.props.nav);
 }
 imgPress=()=>{
   this.props.navigation.navigate('socialmedia')
 }
 renderItem_card({ item }) {
  // const value = item;
  return (
      <View style={{
          // flex:1,
          width: '50%',
          padding: '2%',
          backgroundColor: '#ffff'
      }}>
          <TouchableOpacity
              onPress={() => this.pressIcon(item)}>
               <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff',elevation:2,borderRadius:10 }}
                >
                    <Image resizeMode={'contain'} style={{ width: '75%', elevation: 1, height: height / 6.5, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                        source={{ uri: item.Image1!=""?item.Image1:null }} />
                    <View style={{ flex:1, flexDirection: 'column', marginLeft: '1%', elevation: 1 }}>
                        <View >
                            <Image
                                style={{ height: height / 13, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                                source={{ uri: item.Image2!=""?item.Image2:null}} />
                        </View>
                        <View>
                            <Image
                                style={{ height: height / 13, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                                source={{ uri: item.Image3!=""?item.Image3:null }} />
                        </View>
                    </View>
                </View>
                <View style={{ padding: '2%', margin: '1%' }}>
                <Text style={{  color: "#000000",
      fontSize: 16,
    fontFamily:'AzoSans-Medium'}}>{item.Title}</Text>
                    <Text style={{ color: '#707070',
      fontSize: 12,
    fontFamily:'AzoSans-Light' }}>{item.PublicationCount} publications</Text>
                   {item.PageCount>0 || item.PageCount!=""? <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>:null}
                </View>
            </TouchableOpacity>
        </View>
  )
}
    renderViewMore(onPress){
        return(
          <Text onPress={onPress}>View more</Text>
        )
        }
      renderViewLess(onPress){
        return(
          <Text onPress={onPress}>View less</Text>
        )
      }
 
      _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: 'blue', marginTop: 5,alignSelf:"flex-end"}} onPress={handlePress}>
            Read more
          </Text>
        );
      }
    
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: 'blue', marginTop: 5,alignSelf:"flex-end"}} onPress={handlePress}>
            Show less
          </Text>
        );
      }
      exploredataCol(userid) {
        this.setState({loading:true})
        var json = JSON.stringify({
            'UserId': userid,
            "SortBy":"DESC"
        });
        console.log('json ',json)
        fetch("http://162.250.120.20:444/Login/Collection",
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
                this.setState({ collection: responseJson, loading: false })
                const filteredList = this.state.collection.filter((item) => item.privacy == "Public");
                this.setState({publicCollections:filteredList})
                console.warn(responseJson)
                console.warn("collection")
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
      return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
          {/* <View style={styles.staticheader}> */}
          <View style={styles.staticheader}>
            <View style={{flexDirection:'row',width:width-40,justifyContent:'center',alignItems:'center'}}>
  
            <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.navigation.navigate('profileAbout')}>
            <Text style={styles.headerText}
              
              >About</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={{ borderRadius: 10,backgroundColor:'#27A291'}}
              onPress={this.headerBtnClk}>
  <Text style={{ padding: '5%',
  color: "#fff",
  fontSize: 14,
fontFamily:'AzoSans-Medium'}}
              onPress={() => this.props.navigation.navigate('profileCollection')}
            >Collection</Text>
  
              </TouchableOpacity>
            {/* <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.navigation.navigate('profileShelves')}>
            <Text style={styles.headerText}
              
              >Shelves</Text>
            </TouchableOpacity> */}
          
            {/* </View> */}
          {/* </View> */}
        </View>
        <TouchableOpacity onPress={()=>this.backpress()}>
        <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />
        </TouchableOpacity>
        </View>
          {/* </View> */}
          <ScrollView>
          <View style={styles.containerStyle} >
              <ImageBackground style={styles.sliderContainerStyle}
                source={{uri:this.state.cover!=""?this.state.cover:null}}
                >
                {/* <Slider/> */}
              </ImageBackground>
            </View> 
   
            <Image style={styles.avatar} source={{uri:this.state.avatar}}/>
            <View style={styles.socialBarContainer2}>
                <View style={styles.socialBarContainer3}>
                    
                {this.state.loginUserid==this.state.getuserid?null:
                    <LinearGradient style={styles.buttonContainer} colors={this.state.Is_Follow=="Followed"?['#24D4BC', '#27A291']:['#fff','#fff']} >
                    <TouchableOpacity 
                    // style={styles.buttonContainer}
                    onPress={()=>this.followService(this.state.loginUserid,this.state.getuserid)}
                    // onPress={()=>this.setState({followHighlight:!this.state.followHighlight})}
                    >
                      <Text style={{color:this.state.Is_Follow=="Followed"?'#fff':'#27A291',fontSize:16,fontWeight:'AzoSans-Regular'}}>{this.state.Is_Follow}</Text>                
                    </TouchableOpacity>  
                    </LinearGradient>
                  }
                </View>
                <View>
                  <View style={styles.socialBarContainer3}> 
                <TouchableOpacity  style={styles.buttonContainer2} 
                onPress={()=>this.setState({shareModal:!this.state.shareModal})}>
              <Text style={{color:'#fff',fontSize:16,fontFamily:'AzoSans-Regular'}}>Share</Text> 
                </TouchableOpacity>
                </View> 
                </View>   
                
                </View>
                
            <View style={styles.body}>
            
              <View style={styles.bodyContent}>
             
                <Text style={styles.name}>{this.state.proflname}</Text>
                <Text style={styles.info}>{this.state.headline}</Text>
              
                <View style={styles.socialBarContainer}>
                    
                    <TouchableOpacity style={styles.socialBarButton}
                     >
                    <Text  style={{color:'#707070',fontSize: 12,marginRight:5,
  fontFamily:'AzoSans-Regular'}}>{this.state.followers}</Text>
                      <Image 
                      // style={{width:18,height:18}}
                      // style={styles.icon}
                       source={require('../assets/img/profile.png')}/>
                    </TouchableOpacity>
                    <View style={styles.divider}/>
                    <TouchableOpacity 
                    // onPress={()=>this.refs.modal6.open()}
                     style={styles.socialBarButton}>
                    <Text style={{color:'#707070',fontSize: 12,
  fontFamily:'AzoSans-Regular'}}></Text>
                    {/* <TouchableOpacity onPress={()=>this.refs.modal6.open()}> */}
                    <Image style={{width:50,height:40}} source={require('../assets/img/share.png')}/>
                    {/* </TouchableOpacity> */}
                      
                    </TouchableOpacity>
                  
                </View>
                  <View
                >
                    <Text
                     style={styles.name1}
                    >Collection</Text>
                    <View style={{width:width-30,height:1,marginTop:'2%', backgroundColor:'#24D4BC',alignSelf:'flex-start'}}/>
                    <FlatList
                                  contentContainerStyle={{
                                      flex: 0.5,
                                      marginTop: '5%',
                                      // marginLeft:'5%'
                                  }}
                                  data={this.state.loginUserid==this.state.getuserid?this.state.collection:this.state.publicCollections}
                                  extraData={this.state}
                                  renderItem={this.renderItem_card.bind(this)}
                                  numColumns={2}
                                  removeClippedSubviews={false}
                                  enableEmptySections={false}
                                  keyExtractor={(item, index) => index.toString()}
                              />
                  </View>
              </View>
           </View>   
          </ScrollView>
          <Modal isVisible={this.state.shareModal}
            onBackdropPress={() => this.setState({ shareModal: false })}>
            <View style={{ flex: 0.5, backgroundColor: '#fff', borderRadius: 30, margin: '8%' }}>
              {/* <View> */}
              <Text style={{ fontWeight: 'bold', fontSize: 20, margin: '5%', textAlign: 'center' }}>Share Via</Text>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', margin: '3%', alignItems: 'center' }}>
  
                  <TouchableOpacity onPress={()=> this.fb()}>
                    <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Image source={require('../assets/img/fb2.png')} />
                      <Text style={{ margin: '2%' }}>Facebook</Text>
                    </View>
  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.twitter()
                  }>
                    <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Image source={require('../assets/img/twitter.png')} />
                      <Text style={{ margin: '2%' }}>Twitter</Text>
                    </View>
  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.insta()}>
                    <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Image source={require('../assets/img/insta.png')} />
                      <Text style={{ margin: '2%' }}>Instagram</Text>
                    </View>
  
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', margin: '3%', alignItems: 'center' }}>
  
                  <TouchableOpacity onPress={()=> this.pinterest()}>
                    <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Image source={require('../assets/img/pinterest.png')} />
                      <Text style={{ margin: '2%' }}>Pinterest</Text>
                    </View>
  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this.tumblr()}>
                    <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Image source={require('../assets/img/tumblr.png')} />
                      <Text style={{ margin: '2%' }}>Tumblr</Text>
                    </View>
  
                  </TouchableOpacity>
  
                </View>
  
              </View>
  
              {/* </View> */}
            </View>
          </Modal>
          <Modal isVisible={this.state.loading}
                 // onBackdropPress={() => this.setState({ loading: true })}
                 >
                     <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                   width: 140,           
                         height: 140
                         }} />
                         </Modal>
        </SafeAreaView>
      );
    }
  }
   
  const styles = StyleSheet.create({
    containerStyle: {
      alignSelf: 'center',
      width: width,
      overflow: 'hidden',
      height: width / 2.5,
    },
    sliderContainerStyle: {
      borderRadius: width,
      width: width * 2,
      height: width * 2,
      marginLeft: -(width / 2),
      position: 'absolute',
      bottom: 0,
      overflow:'hidden',
      elevation:1,
      backgroundColor:'#fff',
      resizeMode:'cover'
      },
    // containerStyle: {
    //   alignSelf: 'center',
    //   width: width,
    //   overflow: 'hidden',
    //   height: width / 2.2,
    // },
    // sliderContainerStyle: {
    //   borderRadius: width,
    //   width: width * 2,
    //   height: width * 2,
    //   marginLeft: -(width / 2),
    //   position: 'absolute',
    //   bottom: 0,
    //   overflow: 'hidden',
    //   elevation:1,
    //   backgroundColor:'#fff',
    //   resizeMode:'cover'
  
    //   },
    headerText: {
      padding: '5%',
      color: "#707070",
    fontSize: 14,
  fontFamily:'AzoSans-Medium'
    },
    header:{
      backgroundColor: "#00BFFF",
      height:180,
    },
    staticheader:{
      flexDirection:'row',
      // justifyContent: 'center', 
      alignItems: 'center',
      // height: '8%',
      backgroundColor: '#ffff',
       elevation:1,
       borderBottomColor:'#707070'
  
  
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "white",
      marginBottom:10,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent:'center',
      alignSelf:'center',
      alignItems: 'center',
      marginTop:width /4 //actual marginTop:130
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'transparent',
      marginTop:30
    },
    // name:{
    //   fontSize:22,
    //   color:"#FFFFFF",
    //   fontWeight:'600',
    // },
    body:{
      marginTop:'5%',
    },
    bodyContent: {
      alignItems: 'center',
       padding:10,
      // backgroundColor:'skyblue'
    },
  name:{
      color:"#000",
      fontSize: 18,
      fontFamily:'Montserrat-Bold'
    },
    name1:{
      fontSize:24,
      color: "#000",
      // fontWeight: "bold",
      textAlign:'left',
      fontFamily:'Montserrat-Light'
    },
    info:{
      color: "#000000",
      fontSize: 14,
    fontFamily:'AzoSans-Medium'
    },
    description:{
      fontSize:15,
    },
    buttonContainer: {
      marginTop:20,
      height:35,
      justifyContent: 'center',
      alignItems: 'center',
      width:100,
      borderRadius:30,
      marginLeft:10,
      marginRight:10,
      backgroundColor: "#FFFF",
      elevation:3
    },
    buttonContainer1: {
      marginTop:20,
      height:45,
      marginLeft:100,
      marginRight:10,
      alignItems: 'center',
      justifyContent: 'center',
      width:100,
      borderRadius:30,
      backgroundColor: "#ffff",
     
    },
    buttonContainer2: {
      marginTop:20,
      height:35,
      marginLeft:100,
      marginRight:10,
      alignItems: 'center',
      justifyContent: 'center',
      width:100,
      borderRadius:30,
      backgroundColor: "#27A291",
     
    },
    socialBarContainer3: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    socialBarContainer: {
      flexDirection: 'row',
      flex: 1,
      marginTop:5
    },
    socialBarContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginTop:-20
   },
    socialBarSection: {
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    socialBarlabel: {
      marginLeft: 8,
      alignSelf: 'flex-end',
      justifyContent: 'center',
    },
    socialBarButton:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // padding:'2%'
      marginBottom:'1%'
    },
    divider:{
      width:2,
      height:25,
      marginLeft:10,
      marginRight:5,
      marginTop:'2%',
      backgroundColor:'#707070'
    },
    icon: {
      width:30,
      marginLeft:5,
      height:30,
      resizeMode:'contain'
    },
    icon1: {
      width:20,
      marginLeft:5,
      height:20,
    },
    icon4: {
      width:20,
      marginLeft:5,
      height:20,
    },
    btnAction: {
      height:45,
      width:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:22,
      backgroundColor: "#fff",
    },
  });
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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileCollection);
