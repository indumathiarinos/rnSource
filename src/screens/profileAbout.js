import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import ViewMoreText from 'react-native-view-more-text';
// import ReadMore from 'react-native-read-more-text';
import ReadMore from './Readmore';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import Modal from "react-native-modal";
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';

console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
 
class ProfileAbout extends Component {
  constructor() {
    super();
    this.state = {  
      followHighlight:false,
      profil:[],
      proflname:'',
      followers:'',
      share:'',
      about:'',
      loading:true,
      getuserid:'',
      avatar:'',
      headline:'',
      cover:'',
      shareModal:'',
      Is_Follow:'',
      loginUserid:'',     
      
}
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  AsyncStorage.getItem('profile_userid').then((val) => this.setState({ getuserid: val })).done();
  AsyncStorage.getItem('userid').then((val) => this.setState({ loginUserid: val })).done();
  // {this.getData()} 
  this.CheckConnectivity();
  this.focusListener = this.props.navigation.addListener('willFocus', () => {
    this.CheckConnectivity();
  });
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  this.focusListener.remove();
}
handleBackButtonClick() {
  this.backpress()
      return true;
} 
CheckConnectivity(){    
  NetInfo.fetch().then(state => {

    console.log("Connection type cheking", state.type);
    console.log("Is connected cheking?", state.isConnected);

    if(state.isConnected==true){
      {this.getData()}
    }else{
      alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
    }
   
  });
}
getData(){
  setTimeout(() => {
    { this.exploredata() }

  }, 2000);
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
          <Text style={{color: '#27A291',textDecorationLine:'underline',marginTop: -18, alignSelf:"flex-end",backgroundColor:'#fff',paddingLeft:5}} onPress={handlePress}>
            Read more
          </Text>
        );
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
      exploredata(){
        var json=JSON.stringify({"UserID":this.state.getuserid,"View_UserID":this.state.loginUserid});
        console.log('json view profile ',json)
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
              console.log('profile service ',responseJson);
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
      backpress=()=>{
        //    console.log('before set',this.props.nav)
          //  this.props.changeNavNews();
          //  this.props.navigation.navigate('MainpageTabs')
          this.props.navigation.goBack();
        //    console.log('after set',this.props.nav);
       }
       _renderRevealedFooter = (handlePress) => {
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('report')}>
          <View style={styles.info1}>
            <Image style={{ marginRight: '10%' }} source={require('../assets/img/flag.png')} />
            <Text style={styles.text1}>Report</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        // onPress={() => this.state.hidePic?this.setState({ hidePic: false}):this.setState({hidePic:true})}
        >
          <Text style={{ color: '#27A291',textDecorationLine:'underline', alignSelf: "flex-end", backgroundColor: '#fff', marginTop: 0, padding: '2%', }} onPress={handlePress}>
            See less
          </Text>
        </TouchableOpacity>
      </View>
        );
      }
      clickEventListener=()=>{
        this.props.navigation.navigate('socialmedia');
      }
      imgPress=()=>{
   this.props.navigation.navigate('socialmedia')
 }
 goToAuthorProfile(){
  AsyncStorage.setItem('profile_userid',JSON.stringify(this.state.getuserid));
  this.props.navigation.navigate('profileAbout')

}
  render() {
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
        {/* <View style={styles.staticheader}> */}
        <View style={styles.staticheader}>
          <View style={{flexDirection:'row',width:width-40,justifyContent:'center',alignItems:'center'}}>
          <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
          <TouchableOpacity
            onPress={this.headerBtnClk}>
<Text style={{ padding: '5%',
  fontSize: 16,
  color:'white',
  fontWeight: 'bold'}}
            onPress={() =>this.goToAuthorProfile()}
          >About</Text>
            </TouchableOpacity>
            </LinearGradient>
          <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.navigation.navigate('profileCollection')}>
          <Text style={styles.headerText}
            
            >Collection</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.navigation.navigate('profileShelves')}>
          <Text style={styles.headerText}
            
            >Shelves</Text>
          </TouchableOpacity>
        
          {/* </View> */}
        {/* </View> */}
      </View>
      <TouchableOpacity onPress={()=>this.backpress()}>
          <Image source={require('../assets/img/close.png')}/>
      </TouchableOpacity>
      </View>
          {/* <View style={styles.header}>
          </View> */}
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
              {/* {!this.state.followHighlight?(  
              <TouchableOpacity style={styles.buttonContainer}
              onPress={()=>this.setState({followHighlight:!this.state.followHighlight})}
              >
                <Text style={{color:'#27A291',fontWeight:'bold',fontSize:18}}>Follow</Text>                
              </TouchableOpacity>  
              ):( */}
               {this.state.loginUserid==this.state.getuserid?null:
                  <LinearGradient style={styles.buttonContainer} colors={this.state.Is_Follow=="Followed"?['#24D4BC', '#27A291']:['#fff','#fff']} >
                  <TouchableOpacity 
                  // style={styles.buttonContainer}
                  //following id userid, follower id whom going to follow
                  onPress={()=>this.followService(this.state.loginUserid,this.state.getuserid)}
                  // onPress={()=>this.setState({followHighlight:!this.state.followHighlight})}
                  >
                    <Text style={{color:this.state.Is_Follow=="Followed"?'#fff':'#27A291',fontSize:17,fontWeight:'bold'}}>{this.state.Is_Follow}</Text>                
                  </TouchableOpacity>  
                  </LinearGradient>
                }
                {/* )} */}
              </View>
              <View>
                <View style={styles.socialBarContainer3}> 
                <LinearGradient style={styles.buttonContainer2} colors={['#24D4BC', '#27A291']} >
              <TouchableOpacity
              onPress={()=>this.setState({shareModal:!this.state.shareModal})}>
                <Text style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>Share</Text> 
              </TouchableOpacity>
              </LinearGradient>
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
                    <Text  style={{color:'#707070'}}>{this.state.followers}</Text>
                      <Image style={{marginLeft:5}}
                      // style={styles.icon}
                       source={require('../assets/img/profile.png')}/>
                    </TouchableOpacity>
                    <View style={styles.divider}>
                    </View>      
                    <TouchableOpacity 
                    // onPress={()=>this.refs.modal6.open()}
                     style={styles.socialBarButton}>
                    <Text style={{color:'#707070'}}>80.1k(SN)</Text>
                    {/* <TouchableOpacity onPress={()=>this.refs.modal6.open()}> */}
                    <Image style={styles.icon} source={require('../assets/img/share.png')}/>
                    {/* </TouchableOpacity> */}
                      
                    </TouchableOpacity>
                  
                </View>
                <View
                style={{marginTop:30}}>
                <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
             <Text style={styles.description}>
               {this.state.about}
            {/* Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos. */}
          </Text>
            </ReadMore>
                </View>

              
           
            
              {/* <Text style={styles.description}>
                  Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
                

            </View>
 
           
        </View>   
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
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> this.clickEventListener()}>
          <Image source={require('../assets/img/world.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> this.clickEventListener()}>
          <Image style={styles.icon} source={require('../assets/img/insta.png')}/>
            {/* <Image style={styles.icon} source={{uri: "https://img.icons8.com/material-outlined/48/000000/topic.png"}}/> */}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> this.clickEventListener()}>
          <Image style={styles.icon} source={require('../assets/img/fb2.png')}/>

            {/* <Image style={styles.icon} source={{uri: "https://img.icons8.com/material-outlined/48/000000/block-microphone.png"}}/> */}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={()=> this.clickEventListener()}>
          <Image style={styles.icon} source={require('../assets/img/twitter.png')}/>

            {/* <Image style={styles.icon} source={{uri: "https://img.icons8.com/material-outlined/48/000000/block-microphone.png"}}/> */}
          </TouchableOpacity>
        </View>
    </ScrollView>
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 1.8,
    
  },
  sliderContainerStyle: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    elevation:1,
    backgroundColor:'#fff',
    overflow: 'hidden',
    resizeMode:'cover'

    // backgroundColor: 'pink'
  },
  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header:{
    backgroundColor: "#00BFFF",
    height:180,
  },
  staticheader:{
    flexDirection:'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    height: '8%',
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
    marginTop:width / 2.6 //actual marginTop:130
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // marginTop:10
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    // marginTop:5,
  },
  bodyContent: {
    alignItems: 'center',
    padding:20,
  },
  name:{
    fontSize:22,
    color: "#000",
    fontWeight: "700"
  },
  info:{
    fontSize:16,
    color: "#000000",
  },
  info1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#000',
    padding: '0.5%'
    // alignItems: 'center',
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
    // backgroundColor: "#27A291",
   
  },
  socialBarContainer3: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  socialBarContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop:10
  },
  socialBarContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
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
    padding:'2%'
  },
  divider:{
    width:2,
    height:20,
    marginLeft:5,
    marginRight:5,
    marginTop:'3%',
    backgroundColor:'#707070'
  },
  icon: {
    width:25,
    marginLeft:5,
    height:25,
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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileAbout);