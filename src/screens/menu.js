import React, { Component } from 'react'
import { View,SafeAreaView,Platform, FlatList,TouchableHighlight,AsyncStorage,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider,ListItem } from 'react-native-elements';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
// import Svg from 'react-native-svg';
import FollowSvg from '../assets/img/followsub.svg';
import Icons from 'react-native-vector-icons/Fontisto';
console.disableYellowBox = true;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class MenuPage extends Component {
  constructor(props){
    super(props);
  this.state={
    list : [
      {
        id:1,
        title:'Followed/Subscribed',
        img:require('../assets/img/followsub1.png')
      },
      {
        id:2,
        title:'QR Code Reader',
        img:require('../assets/img/qrcode1.png')
    
      },
      {
        id:3,
        title:`Request Creator's Account`,
        img:require('../assets/img/reqcreators.png')
      },
      // {
      //   id:4,
      //   title:'Offline',
      //   img:require('../assets/img/offline1.png')
    
      // },
      // {
      //   id:5,
      //   title:'Help',
      //   img:require('../assets/img/helpicon.png')
      // },
      {
        id:5,
        title:'Settings',
        img:require('../assets/img/settings1.png')
      },
    ],
    list1: [
      {
        id:1,
        title:'Followed/Subscribed',
        img:require('../assets/img/followsub1.png')
      },
      {
        id:2,
        title:'QR Code Reader',
        img:require('../assets/img/qrcode1.png')
      },
      // {
      //   id:4,
      //   title:'Offline',
      //   img:require('../assets/img/offline1.png')
      // },
      // {
      //   id:5,
      //   title:'Help',
      //   img:require('../assets/img/helpicon.png')
      // },
      {
        id:5,
        title:'Settings',
        img:require('../assets/img/settings1.png')
      },
    ],
    profileGetData:'',
    profileGetData:'',
    avatar:'',
    username:'',
    getuserid:'',
    // loading:true,
    getusertype:'',
    profile_img:'',
    user_name:'',
    notificationCount:0,
    explore_page:'0'
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
  componentDidMount() {
    AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();
    AsyncStorage.getItem('usertype').then((value)=>{this.setState({getusertype:value})}).done();
    AsyncStorage.getItem('profile_img').then((value)=>{this.setState({profile_img:value})}).done();
    AsyncStorage.getItem('user_name').then((value)=>{this.setState({user_name:value})}).done();
    console.log('profile img & username ',this.state.user_name,this.state.profile_img);
    AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();

    // {this.getData()}
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      // {this.getData()}
      AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();
      AsyncStorage.getItem('usertype').then((value)=>{this.setState({getusertype:value})}).done();
      AsyncStorage.getItem('profile_img').then((value)=>{this.setState({profile_img:value})}).done();
      AsyncStorage.getItem('user_name').then((value)=>{this.setState({user_name:value})}).done();
      console.log('profile img & username ',this.state.user_name,this.state.profile_img);
      AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();
  
      this.CheckConnectivity();

  })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener.remove();
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
      // alert(this.state.explore_page)
      {this.exploredata(this.state.getuserid)}
      // {this.exploredata1(this.state.getuserid)}
    }, 1000);
  }
  handleBackButtonClick() {
    this.props.navigation.closeDrawer();
    // BackHandler.exitApp();
      return true;
  }
  _renderItem=({ item,index }) => (
    <View style={{flex:1,margin:'2%',}}>
      
    
     <TouchableOpacity
      // onPress={this.pressIcon(item)}
      >
        <View style={{flexDirection:'row',alignItems:'center'}}
   >
     <FollowSvg width="20"
    height="30" />
       {/* <Image
            style={{margin:'2%',padding:'2%'}} source={item.img}/> */}
            <Text style={{marginLeft:'5%',color:'#707070'}}>{item.title}</Text>
            </View>

     </TouchableOpacity>
      </View>
    // <ListItem
    //   roundAvatar
    //   title={`${item.name.first} ${item.name.last}`}
    //   subtitle={item.email}
    //   avatar={{ uri: item.picture.thumbnail }}
    // />
  )
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
            this.setState({profileGetData:responseJson,loading:false})
            console.warn(responseJson)
            for (let i = 0; i <this.state.profileGetData.length; i++) {
              // alert(this.state.bookdetail[0].Image)
               this.setState({ 
                 username: responseJson[i].username,
                 avatar:responseJson[i].avatar,
                 notificationCount:responseJson[i].notifycnt,
                })
              }
            //alert(this.state.data.status)  
        })
        .catch((error) => {
            console.warn(error);
        });
  }
 
  pressIcon = (item) => {
    let { list } = this.state;
    list = list.map(e => {
      if (item.id == 1) {
        // item.like = !e.like;
        return this.props.navigation.navigate('followsubscribe') && this.props.navigation.closeDrawer();
      } else if(item.id ==2){
        return this.props.navigation.navigate('qrcode') && this.props.navigation.closeDrawer();
        }else if(item.id ==3){
          return this.props.navigation.navigate('requestCreator') && this.props.navigation.closeDrawer();

          // }else if(item.id==4){
          //   return this.props.navigation.navigate('offline') && this.props.navigation.closeDrawer();         
        // }else if(item.id==5){
        //   return this.props.navigation.navigate('viewBook', {
        //     item: item}) && this.props.navigation.closeDrawer();
        
      }else if(item.id==5){
        return this.props.navigation.navigate('settings') && this.props.navigation.closeDrawer();

      }else{
        return e;
      }
    });
  }

  profileClick=()=>{
    this.props.navigation.closeDrawer();
    AsyncStorage.setItem('profile_userid',this.state.getuserid);
    this.props.navigation.navigate('profileAbout');
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
    this.props.navigation.navigate('loginSignup');
  }
  renderItem=(item,index)=>{
    
    return(
      
      <TouchableOpacity
    style={{padding:'3%'}}
      onPress={() => this.pressIcon(item)}
      // onShowUnderlay={separators.highlight}
      // onHideUnderlay={separators.unhighlight}
      >
      {/* <View style={{}}> */}
      <View style={{flexDirection:'row',alignItems:'center'}}
   >
     {/* <FollowSvg/> */}
       <Image 
            style={{
              marginLeft:
              // item.id==1?'1%':
              '5%',
              width:30,height:30}} resizeMode='contain' source={item.img}/>
            <Text style={{
              marginLeft:
              // item.id==1?'3%':
              '9%',
              color:'#707070',fontSize:12,fontFamily:'AzoSans-Regular',}}>{item.title}</Text>
            </View>

      {/* </View> */}
    </TouchableOpacity>
    )
  }
  render() {

    const { navigate } = this.props.navigation;
    if(this.state.getusertype==4){
      return (
        <View style={{ flex: 4,
          backgroundColor:'rgba(0,0,0,0.5)',
           }}>
              <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} style={{height:STATUSBAR_HEIGHT}}/>
            <View style={{flex:3,backgroundColor:'white',borderBottomEndRadius:40,}}>
              <View style={styles.shadow}>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',}}>
                <TouchableOpacity style={{width:width/8,height:50,alignItems:'center',justifyContent:'center'}}
                  onPress={()=>this.profileClick()}>
                 <Image
                 style={{width:50,height:50,borderRadius:50/2,borderWidth:1,borderColor:'#27A291'}}
                    source={{uri:this.state.explore_page=='0'? this.state.avatar:'http://pagevio.com/uploads/profile/noimage.jpg'}}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                  onPress={()=>this.profileClick()}>
                  <View style={{flexDirection:'column',width:width/2.2,height:50,justifyContent:'center',marginLeft:'2%'}}>
                  <Text numberOfLines={this.state.username.length>30?1:1} style={{color:'#27A291',fontSize:16,fontFamily:'Montserrat-Bold'}}>{this.state.username}</Text>
                  <Text
                  onPress={()=>this.profileClick()}
                  style={{color:'#27A291',textDecorationLine:'underline',
                  margin:'1%',marginTop:'3%',
                  fontSize:14,fontFamily:'AzoSans-Regular',
                  textDecorationColor:'#27A291'}}>View Profile</Text>
    
                  </View>
                  </TouchableOpacity>
  
                  <TouchableOpacity
                  style={{
                   height:50,alignItems:'center',justifyContent:'center'
                    // marginLeft:'3%',marginRight:'3%',marginTop:'3%'
                  }}
                  onPress={()=>this.props.navigation.navigate('notification') && this.props.navigation.closeDrawer()}>
                  {/* <Image
                  source={require('../assets/img/bell.png')}/> */}
                    <Icons
                    style={{marginLeft:15}}
                  color={'#27A291'}
                  size={27}
                    name={'bell-alt'}
                  />
                {this.state.notificationCount!=0?
              <View style={{alignItems:'center',width:20,height:20,borderRadius:20/2,borderWidth:0.5,borderColor:'#27A291',position:'absolute',left:25,top:20,backgroundColor:'#fff',}}>
              <Text style={{color:'#27A291',fontSize:12,fontFamily:'AzoSans-Regular',alignSelf:'center',marginTop:'5%'}}>{this.state.notificationCount}</Text>
          </View>
                  :null}
                  </TouchableOpacity>
                </View>
              </View>
              {/* <Divider style={{ backgroundColor:'#707070' }} /> */}
              <View>
            <FlatList
              style={{height:'90%'}}
    
    data={this.state.list}
    renderItem={(({item,index})=>this.renderItem(item,index))
    }
  />
            {/* <FlatList
          extraData={this.props.selectedOptions}
            style={{height:'85%'}}
          data={this.state.list}
          renderItem={this._renderItem.bind(this)}
           keyExtractor={(item, index) => index.toString()}
        /> */}
        
          {/* <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} ></LinearGradient> */}
         <View style={styles.bottomLine}>
           <TouchableOpacity
           onPress={()=>this.logoutpress()}>
                      <View style={{ flexDirection: 'row',padding:'3%',justifyContent:'space-evenly',alignItems:'center' }}>     
                        
                          {/* <Icon
                          style={{color:'white'}}
                          size={30}
                          name='logout'/> */}
                          <Image style={{width:30,height:30,marginLeft:'6%'}} source={require('../assets/img/logout.png')}/> 
                         <Text style={{color:'white',fontSize:16,fontFamily:'AzoSans-Bold',textAlign:'center',width:width/1.6,}}>Log Out</Text>
                      </View>
                      </TouchableOpacity>
                  </View>    
              </View>

                  </View>
                  <Modal1 isVisible={this.state.loading}>
                  <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                   width: 140,           
                         height: 140
                         }} />
                   </Modal1>
                 
        </View>
      )
  
    }else if(this.state.explore_page=='1'){
      
        return(
          <View style={{ flex: 4,
            backgroundColor:'rgba(0,0,0,0.5)',
             }}>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} style={{height:STATUSBAR_HEIGHT}}/>
              <View style={{flex:3,backgroundColor:'white',borderBottomEndRadius:40,}}>
              <View style={styles.shadow}>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',}}>
                <TouchableOpacity style={{width:width/8,height:50,alignItems:'center',justifyContent:'center'}}
                  onPress={()=>this.profileClick()}>
                 <Image
                 style={{width:50,height:50,borderRadius:50/2,borderWidth:1,borderColor:'#27A291'}}
                    source={{uri:this.state.explore_page=='0'? this.state.avatar:'http://pagevio.com/uploads/profile/noimage.jpg'}}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                  onPress={()=>this.profileClick()}>
                  <View style={{flexDirection:'column',width:width/2.2,height:50,justifyContent:'center',marginLeft:'2%'}}>
                  <Text numberOfLines={this.state.username.length>30?1:1} style={{color:'#27A291',fontSize:16,fontFamily:'Montserrat-Bold'}}>{this.state.username}</Text>
                  <Text
                  onPress={()=>this.profileClick()}
                  style={{color:'#27A291',textDecorationLine:'underline',
                  margin:'1%',marginTop:'3%',fontSize:14,fontFamily:'AzoSans-Regular',
                  textDecorationColor:'#27A291'}}>View Profile</Text>
    
                  </View>
                  </TouchableOpacity>
  
                  {/* <TouchableOpacity
                  style={{
                   height:50,alignItems:'center',justifyContent:'center'
                  }}
                  onPress={()=>this.props.navigation.navigate('notification') && this.props.navigation.closeDrawer()}>
               
                    <Icons
                  color={'#27A291'}
                  size={27}
                    name={'bell-alt'}
                  />
                {this.state.notificationCount!=0?
                  <View style={{alignItems:'center',width:20,height:20,borderRadius:20/2,borderWidth:0.5,borderColor:'#27A291',position:'absolute',right:0,top:12,backgroundColor:'#fff'}}>
                    <Text style={{color:'#27A291',fontSize:12,fontFamily:'AzoSans-Regular',}}>{this.state.notificationCount}</Text>
                  </View>:null}
                  </TouchableOpacity> */}

<TouchableOpacity
                  style={{
                   height:50,alignItems:'center',justifyContent:'center'
                    // marginLeft:'3%',marginRight:'3%',marginTop:'3%'
                  }}
                  onPress={()=>this.props.navigation.navigate('notification') && this.props.navigation.closeDrawer()}>
                  {/* <Image
                  source={require('../assets/img/bell.png')}/> */}
                    <Icons
                    style={{marginLeft:15}}
                  color={'#27A291'}
                  size={27}
                    name={'bell-alt'}
                  />
                {this.state.notificationCount!=0?
               <View style={{alignItems:'center',width:20,height:20,borderRadius:20/2,borderWidth:0.5,borderColor:'#27A291',position:'absolute',left:25,top:20,backgroundColor:'#fff',}}>
               <Text style={{color:'#27A291',fontSize:12,fontFamily:'AzoSans-Regular',alignSelf:'center',marginTop:'5%'}}>{this.state.notificationCount}</Text>
           </View>
                  :null}
                  </TouchableOpacity>
                </View>
              </View>
              {/* <Divider style={{ backgroundColor:'#707070' }} /> */}
              <View>
                  </View>
                  </View>
            </View>
        )
      }else {
      return (
        <View style={{ flex: 4,
        backgroundColor:'rgba(0,0,0,0.5)',
         }}>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} style={{height:STATUSBAR_HEIGHT}}/>
          <View style={{flex:3,backgroundColor:'white',borderBottomEndRadius:40,}}>
          <View style={styles.shadow}>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',}}>
                <TouchableOpacity style={{width:width/8,height:50,alignItems:'center',justifyContent:'center'}}
                  onPress={()=>this.profileClick()}>
                 <Image
                 style={{width:50,height:50,borderRadius:50/2,borderWidth:1,borderColor:'#27A291'}}
                    source={{uri:this.state.explore_page=='0'? this.state.avatar:'http://pagevio.com/uploads/profile/noimage.jpg'}}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                  onPress={()=>this.profileClick()}>
                  <View style={{flexDirection:'column',width:width/2.2,height:50,justifyContent:'center',marginLeft:'2%'}}>
                  <Text numberOfLines={this.state.username.length>30?1:1} style={{color:'#27A291',fontSize:16,fontFamily:'Montserrat-Bold'}}>{this.state.username}</Text>
                  <Text
                  onPress={()=>this.profileClick()}
                  style={{color:'#27A291',textDecorationLine:'underline',
                  margin:'1%',marginTop:'3%',fontSize:14,fontFamily:'AzoSans-Regular',
                  textDecorationColor:'#27A291'}}>View Profile</Text>
    
                  </View>
                  </TouchableOpacity>
  
                  {/* <TouchableOpacity
                  style={{
                   height:50,alignItems:'center',justifyContent:'center'
                  }}
                  onPress={()=>this.props.navigation.navigate('notification') && this.props.navigation.closeDrawer()}>
                
                    <Icons
                  color={'#27A291'}
                  size={27}
                    name={'bell-alt'}
                  />
                {this.state.notificationCount!=0?
                  <View style={{alignItems:'center',width:20,height:20,borderRadius:20/2,borderWidth:0.5,borderColor:'#27A291',position:'absolute',right:0,top:12,backgroundColor:'#fff'}}>
                    <Text style={{color:'#27A291',fontSize:12,fontFamily:'AzoSans-Regular',}}>{this.state.notificationCount}</Text>
                  </View>:null}
                  </TouchableOpacity> */}

<TouchableOpacity
                  style={{
                   height:50,alignItems:'center',justifyContent:'center'
                    // marginLeft:'3%',marginRight:'3%',marginTop:'3%'
                  }}
                  onPress={()=>this.props.navigation.navigate('notification') && this.props.navigation.closeDrawer()}>
                  {/* <Image
                  source={require('../assets/img/bell.png')}/> */}
                    <Icons
                    style={{marginLeft:15}}
                  color={'#27A291'}
                  size={27}
                    name={'bell-alt'}
                  />
                {this.state.notificationCount!=0?
                    <View style={{alignItems:'center',width:20,height:20,borderRadius:20/2,borderWidth:0.5,borderColor:'#27A291',position:'absolute',left:25,top:20,backgroundColor:'#fff',}}>
                    <Text style={{color:'#27A291',fontSize:12,fontFamily:'AzoSans-Regular',marginTop:'5%'}}>{this.state.notificationCount}</Text>
                </View>
                  :null}
                  </TouchableOpacity>
                </View>
              </View>
              {/* <Divider style={{ backgroundColor:'#707070' }} /> */}
              <View>
            <FlatList
              style={{height:'90%'}}
    data={this.state.list1}
    renderItem={(({item,index})=>this.renderItem(item,index))
    }
  />
            {/* <FlatList
          extraData={this.props.selectedOptions}
            style={{height:'85%'}}
          data={this.state.list}
          renderItem={this._renderItem.bind(this)}
           keyExtractor={(item, index) => index.toString()}
        /> */}
        
          {/* <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} ></LinearGradient> */}
          <View style={styles.bottomLine}>
           <TouchableOpacity
           onPress={()=>this.logoutpress()}>
                      <View style={{ flexDirection: 'row',padding:'3%',justifyContent:'space-evenly',alignItems:'center' }}>     
                        
                          {/* <Icon
                          style={{color:'white'}}
                          size={30}
                          name='logout'/> */}
                          <Image style={{width:30,height:30,marginLeft:'6%'}} source={require('../assets/img/logout.png')}/> 
                         <Text style={{color:'white',fontSize:16,fontFamily:'AzoSans-Bold',textAlign:'center',width:width/1.6,}}>Log Out</Text>
                      </View>
                      </TouchableOpacity>
                  </View>    
                   
              </View>
     
                  </View>
                  {/* <Modal1 isVisible={this.state.loading}>
                  <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                   width: 140,           
                         height: 140
                         }} />
                   </Modal1> */}
                 
        </View>
      )
                  }
      }

}
const styles = StyleSheet.create({
  bottomLine: {
  height:'15%',
  bottom:0,
  left: 0,
  right: 0,
  justifyContent:'center',
  position: 'absolute',
  backgroundColor:'#27A291',
  borderBottomEndRadius:40,
 
},
  logo: {
    width: 30, height: 30, margin: 10
  },
  headerContainer: {
    // height: '10%',
    // flex:1,
    // marginTop: 20,
    justifyContent: 'center',
    // marginTop: '2%',
  },
  icon: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10,
    marginRight: '4%'
  },
  headerText:
  {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    // padding:10,
    fontSize: 18,
    // marginRight:100,
  },
  headerText1:
  {
    color: 'white',
    textAlign: 'left',
    // padding:10,
    fontSize: 16,
    // marginRight:100,
  },
  scrollView: {
    // backgroundColor:'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: '2%',
    marginLeft: '2%'
  },
  container_card: {
    flex: 1,
    // flex: 1,
    // paddingTop: 5,
  },
  shadow:{
    shadowColor: 'rgba(0,0,0, .5)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 5, // Android
    height:'10%',
    justifyContent:'center'
  },
  cardStyle: {
    margin: 5,
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',

  },
  // cardStyle1: {
  //   width:width-100,
  //   margin: 5,
  // },
  cardTitle: {
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: "center",
    color: 'black',
  },
  cardTitle3: {
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 18,
    margin: '3%',
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: "center",
    color: 'black',
  },
  subtitle: {
    paddingLeft: 10,
    fontSize: 14,
    color: '#919090',
    alignItems: "center",
    justifyContent: "center"
  },
  projectText: {
    flex: 1,
    marginLeft: '10%',
    flexDirection: 'column'
  },

  projectRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },

  itemName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },

  itemDetails: {
    fontSize: 12,
    color: '#BBBBBB',
  },

  moreContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  moreIcon: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: "black"
  }
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

export default connect(mapStateToProps,mapDispatchToProps)(MenuPage);