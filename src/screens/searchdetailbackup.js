import React, { Component } from 'react'
import { View,SafeAreaView,Platform,TextInput,AsyncStorage,ImageBackground,FlatList,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import {Avatar,Divider} from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
import ModalBox from 'react-native-modalbox';
import Modal from 'react-native-modal';
// import Share from 'react-native-share';
import Toast from 'react-native-easy-toast';
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';

console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class SearchDetail extends Component {
  constructor() {
    super();
    this.state = {   
         list: [
        {
            id: 0,
            bgcolor: "#569BE0",
            img: '',
            title: "Ainaini Rahin",
            subtitle: "starts following you"
        },
        {
            id: 1,
            bgcolor: "#7C3BD3",
            img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
            title: "Ainaini",
            subtitle: `starts following you`
        },
        {
            id: 2,
            bgcolor: "#EB9A17",
            img: '',
            title: "Ainaini Rahin",
            subtitle: `starts following you`
        },
        {
          id: 3,
          bgcolor: "#569BE0",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini Rahin",
          subtitle: `collects your page "Thinking Beyond the Scope - The Hard Truths of...`
      },
      {
          id: 4,
          bgcolor: "#7C3BD3",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini",
          subtitle: `shares your page "Riders of the Storm"`
      },
      {
          id: 5,
          bgcolor: "#EB9A17",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini Rahin",
          subtitle: `collects your page "Thinking Beyond the Scope - The Hard Truths of...`
      }
    ],
    profilepage: false,
    profileData:'',
    profileData1:'',
    loading:false,
    followed:false,
    selectedItemArray:[],
    loading:true,
    filterData:[],
    noData:true,
    text:'',
    getProfiles:'',
    getuserid:'',
    sortby:'DESC',
    profileSearch:'',
    explore_page:'0',
    loginPopup:false
    
}
this.arrayholder=[];
this.profileArrayholder=[];
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})})
  AsyncStorage.getItem('searchText').then((value) => this.setState({ text : value==null?"":value })).done();
  AsyncStorage.getItem('searchFilter').then((value)=>this.setState({sortby:value})).done();
  AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();
  this.CheckConnectivity();
  // alert(this.state.sortby)
  this.focusListener = this.props.navigation.addListener('willFocus', () => {
    AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})})
    AsyncStorage.getItem('searchText').then((value) => this.setState({ text : value==null?"":value,profileSearch:value==null?"":value })).done();
    AsyncStorage.getItem('searchFilter').then((value)=>this.setState({sortby:value})).done();
  AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();
  this.CheckConnectivity();

})
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
alertPopup(){
  // this.setState({loginPopup:true})
  // setTimeout(() => {
  //     this.setState({loginPopup:false})
  // }, 5000);
  this.logoutpress();
}
handleBackButtonClick() {
  this.props.navigation.navigate('search')
      return true;
}  
profilePress=()=>{
  this.setState({profilepage:true,loading:true});
  { this.exploredata() }

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
getData(){
  setTimeout(() => {
    console.log('get sectionid in sectionDetail book page ',this.state.sectionId)
    {this.profileService()}
      {this.exploredata()}
  }, 1000);
}
exploredata(){
  var json=JSON.stringify(
    {"SearchText":this.state.text,"SortBy":this.state.sortby}
    );
    console.log(' search page detail publication data json is ',json);
    fetch("http://162.250.120.20:444/Login/Search",
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
          this.setState({profileData: responseJson,profileData1:responseJson,loading:false})
          console.log('profileData data is ',this.state.profileData)
          this.arrayholder = responseJson; 
          // console.warn(responseJson)
          // console.warn("Notification")
          
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}

profileService(){
  // this.setState({loading:true});
  var json = JSON.stringify({"user_id":this.state.getuserid,"SearchText":this.state.text}
  );
  console.log('json profile ',json);
    fetch("http://162.250.120.20:444/Login/Profile_Follow",
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
          responseJson = responseJson.map(item => {
            item.isSelect = false
            return item;
          });
          this.profileArrayholder = responseJson; 
          this.setState({getProfiles: responseJson,loading:false})
          console.log('profileData get data is ',this.state.getProfiles)
          this.arrayholder = responseJson; 
          // console.warn(responseJson)
          // console.warn("Notification")
          
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}
// renderImage(){
//   // const like=require('../assets/img/like.png');
//   // const unlike=require('../assets/img/unlike.png');
//   // var imgSource = this.state.showlikeImg? like:unlike ;
//   return (
//     <Image
//       style={ homeStyles.optionsImage }
//       source={ imgSource }
//     />
//   );
// }
imgClick=(postid,typeid)=>{
  let { profileData } = this.state;
  profileData = profileData.map(e => {
    if (e.TypeID==typeid) {
      console.log('type id postid in search page profile ',typeid,postid)
      AsyncStorage.setItem('typeid',JSON.stringify(Number(e.TypeID)));
      AsyncStorage.setItem('postid', JSON.stringify(Number(e.Post_page_id)));
      if (e.TypeID == 4) {
        // AsyncStorage.setItem('pagefeedItem',JSON.stringify(item));
        return this.props.navigation.navigate('readingBook');
      } else if (e.TypeID == 1) {
            return this.props.navigation.navigate('viewBook');
      } else if (e.TypeID == 2) {
        return this.props.navigation.navigate('periodiViewBook');
      } else if (e.TypeID == 3) {
            return this.props.navigation.navigate('seriesViewBook');
      }
    } else {
      return e;
    }
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
      console.log('follow insert service called');
      { this.profileService() }
      // if(responseJson.MSGS == "Added successfully" || responseJson.MSGS == "Already Exist"){
      // }
    })
    .catch((error) => {
      console.warn(error);
    });
}
selectItem = data => {
  let getProfiles=[...this.state.getProfiles];
  for(let item of getProfiles){
    if(item.user_id==data.user_id){
         
        item.isFollowed=(item.isFollowed==null)?true:!item.isFollowed;      
      console.log("id isfollowed"+item.isFollowed);

      break;
    }
  }
 // console.log("array"+this.state.selectedItemArray);
 // MultiselectItems.push(selectedItemArray);
  this.setState({getProfiles});
  this.followService(this.state.getuserid, data.user_id)

}

SearchFilterFunction(text) {
  //passing the inserted text in textinput
  // if(!this.state.profilepage){
  {this.exploredata();}
    {this.profileService();}

  const newData1 = this.arrayholder.filter(function(item) {
    //applying filter for the inserted text in search bar
    const itemData = item.PostLinkTitle ? item.PostLinkTitle.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    profileData1: newData1,
    text: text,
  
  });
  {text==""?this.setState({profileData1:this.state.profileData}):null}
// }else{
  
//   {this.profileService();}
 
// }

  // console.log('profile data 1 value filtered ',this.state.profileData1)
}

  fullcard=({ item })=>{
    const like=require('../assets/img/like.png');
    const unlike=require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg? like:unlike ;
        return (
        
          <TouchableOpacity  onPress={()=>this.imgClick(item.Post_page_id,item.TypeID)}>

          <View style={{ flexDirection: 'row',paddingLeft:'5%',paddingRight:'5%',marginTop:'2%',marginBottom:'2%'
          ,justifyContent:'space-between'}}>

          <View style={{flexDirection:'column',width:width/1.8,marginTop:'3%' }}>

  <Text numberOfLines={1} style={{fontFamily:'AzoSans-Medium',fontSize:14,paddingLeft:'2%',width:width/2}}> {item.PostLinkTitle} </Text>
  <Text numberOfLines={1} style={{fontFamily:'AzoSans-Light',fontSize:12,marginTop:10,color:'#707070',paddingLeft:'3%',width:width/4}}>
       {item.Post_author} {/* Packaging Design - Bite Me: Packaging Insults Chewers as They... Grab a Piece of Tooth-Shaped Gum */}
    </Text>
  </View>
  {/* <TouchableOpacity onPress={()=>this.imgClick(item.Post_page_id,item.TypeID)}>
  <ImageBackground imageStyle={{borderRadius:10}} source={{uri:item.PostLinkImage!=""?item.PostLinkImage:null}} 
  style={{resizeMode:'cover',width:100,height:120,borderRadius:20,margin:'3%'}}>
  <TouchableOpacity style={{padding:'2%'}}
         onPress={() => this.refs.modal5.open()}
      >
<Image style={{alignSelf:'flex-end',marginRight:'5%',marginTop:'5%',}} source={require('../assets/img/3dots_white.png')}/>
</TouchableOpacity>
</ImageBackground>
</TouchableOpacity> */}
 <TouchableOpacity style={[{marginRight:'2%'},styles.button]} onPress={()=>this.imgClick(item.Post_page_id,item.TypeID)}>
 <ImageBackground source={{uri:item.PostLinkImage!=""?item.PostLinkImage:null}} 
          imageStyle={{ borderRadius: 8 }}
          style={[item.TypeID==1?styles.pubImgStyle:styles.pageImgStyle,{borderColor:!item.Image?'#fff':null}]}
             >
             <TouchableOpacity style={{padding:'2%'}}
         onPress={() => {this.state.explore_page=='0'? this.refs.modal5.open():this.alertPopup()}}
      >
              <Image style={{ alignSelf:'flex-end', marginRight:'8%', marginTop:'6%' }} source={require('../assets/img/3dots_white.png')} />
            </TouchableOpacity>
          </ImageBackground>
          </TouchableOpacity>
</View>
</TouchableOpacity>
);
  
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
  
  }
  onPressHandler(id) {
    // let selected;
     let list=[...this.state.profileData];
     for(let data of list){
       if(data.Post_page_id==id){
            
         data.abc=(data.abc==null)?true:!data.abc;
        
         (data.abc)?this.state.selectedItemArray.push(data):this.state.selectedItemArray.pop(data);
         console.log('selected item array ',this.state.selectedItemArray)
          console.log("data.selected"+data.abc,'id',data.id);
          
          // this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
         break;
       }
     }
    // console.log("array"+this.state.selectedItemArray);
    // MultiselectItems.push(selectedItemArray);
     this.setState({profileData:list});
   }
   goToAuthorProfile(id){
 
    AsyncStorage.setItem('profile_userid',id);
    AsyncStorage.setItem('pagefeed_userid',id);
    console.log(' profile userid ',id)
    this.props.navigation.navigate('profileAbout')
  
  }
  fullcard1=({item})=>{
    return (
      <View style={{ flexDirection: 'row',margin:'3%',justifyContent:'center' }}>
      <TouchableOpacity style={{marginRight:'3%',alignSelf:'center'}} onPress={()=>this.state.explore_page=='0'?this.goToAuthorProfile(item.user_id):this.alertPopup()}>
      <Image style={{width:60,height:60,borderRadius:60/2}} source={{uri:item.avatar!=""?item.avatar:null}}/>
      </TouchableOpacity>
{/* <Avatar
    rounded
    size='medium'
    overlayContainerStyle={{ borderColor: '#24D4BC', borderWidth: 1 }}
    // style={{ borderWidth: 2,  borderTopLeftRadius: 1, borderStyle:'solid' }}
    icon={{ name: 'user', type: 'font-awesome' }}
    onPress={() => console.log("Works!")}
    activeOpacity={0.7}
  // containerStyle={{marginLeft:'1%'}}
  /> */}
  <View style={{flexDirection:'column',width:width/2,alignItems:'flex-start',justifyContent:'center'}}>
  <Text numberOfLines={2} style={{ fontSize: 14, color: 'black', fontFamily: 'Montserrat-Bold',textAlign:'left',}}>{item.username}</Text>
  {/* <Text style={{ fontSize: 16, color: 'black',textAlign:'left'}}>{item.Post_author}</Text> */}
  </View>
  {item.user_id==this.state.getuserid?<View style={{width: width/2-90}}/>:
   <TouchableOpacity
   // style={{marginRight:10}}
   
   // onPress={()=>this.onPressHandler(item.Post_page_id)}
   onPress={()=>{this.state.explore_page=='0'?this.followService(this.state.getuserid,item.user_id):this.alertPopup()}}
   // onPress={()=>this.selectItem(item)}
   >
  <LinearGradient  style={[item.Is_Follow=='Followed'?styles.btnview1:styles.btnview]} colors={
             item.Is_Follow=="Followed"? ['#24D4BC', '#27A291']:['#fff','#fff']}>
 
      <Text style={{color:item.Is_Follow=='Followed'?'#fff':'#27A291',textAlign:'center',fontFamily:'AzoSans-Medium',fontSize:14}}>{item.Is_Follow}</Text>

      {/* {item.isFollowed==true?<Text style={{color:'#fff'}}>Followed</Text>:<Text style={{ color:'#27A291'}}>Follow</Text>} */}
{/* <TouchableOpacity onPress={() => this.tooltipPress()} style={[!this.state.visible ? styles.btnview : styles.activeBtnview]}>
                          <Text style={[!this.state.visible ? styles.inactive : styles.active]}>{!this.state.visible ? "Follow" : "Followed"}</Text>
                        </TouchableOpacity> */}
</LinearGradient>
</TouchableOpacity>

  }
  </View>);

  }
  // filter_page = () => {
  //   // let data = [ { id: 1, name: 'Mike', city: 'philps', state:'New York'}, { id: 2, name: 'Steve', city: 'Square', state: 'Chicago'}, { id: 3, name: 'Jhon', city: 'market', state: 'New York'}, { id: 4, name: 'philps', city: 'booket', state: 'Texas'}, { id: 5, name: 'smith', city: 'brookfield', state: 'Florida'}, { id: 6, name: 'Broom', city: 'old street', state: 'Florida'}, ]
  //   data_fav = this.state.articles.filter(function (item) {
  //     return item.like == true;
  //   }).map(function ({id,img,title,like,date,htmlContent} ) {
  //     return { id,img,title,like,date,htmlContent};
  //   });
  //   console.log(data_fav);
  //   console.log("state articles", this.state.articles);

  // }
  _toggleModal = () =>{
    // this.setState({ isModalVisible: !this.state.isModalVisible });
     this.refs.modal6.open()
  
  }
  // imgPress=()=>{
  
  //   this.setState({ isModalVisible: !this.state.isModalVisible });
  //   this.refs.modal5.close();
  //   this.refs.modal6.close();
  //   this.props.navigation.navigate('socialmedia')
  //   // Share.shareSingle(shareOptions);
  // }
  backpress=()=>{
    //    console.log('before set',this.props.nav)
      //  this.props.changeNavNews();
      //  this.props.navigation.navigate('MainpageTabs')
      
      this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
   }
  render() {
    const { list } = this.state;

    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
    
         {/* <View style={{flexDirection:'column',
           backgroundColor: '#ffff',
          elevation:1,}}>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:"center",marginLeft:'1%',marginRight:'1%' }}>
               <TouchableOpacity onPress={()=>{
                           AsyncStorage.setItem('searchText'," ")
                 this.props.navigation.navigate('searchFilter')}}>
          <Image
            style={{ alignSelf: 'center' }}
            source={require('../assets/img/filter.png')}>
          </Image>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around',margin:'2%' }}>
           <View>
            <TextInput
              style={styles.textInputStyle}
              value={!this.state.profilepage? this.state.text:this.state.profileSearch}
              underlineColorAndroid='black'
              placeholder="Search Here"
              onChangeText={(text)=>this.SearchFilterFunction(text)}
            />
                {Platform.OS=='ios'?<View style={{width:width/1.2,height:1,backgroundColor:'#707070',margin:'1%'}} />:null}
            </View>
            <TouchableOpacity  style={{marginLeft:'-10%'}} onPress={()=>this.SearchFilterFunction(this.state.text)}>
            <Image style={{width:20,height:20}} source={require('../assets/img/search.png')}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginRight:'2%',padding:'1%'}} onPress={()=>this.backpress()}>
          <Image
            style={{ alignSelf: 'center' }}
            source={require('../assets/img/close.png')}>

          </Image>
          </TouchableOpacity>
        
          </View> */}
          
              
      <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center', }}>
                <TouchableOpacity onPress={()=>{
                           AsyncStorage.setItem('searchText'," ")
                 this.props.navigation.navigate('searchFilter')}}>
          <Image
            style={{ alignSelf: 'center',width:50,height:50}}
            source={require('../assets/img/filter.png')}>
          </Image>
          </TouchableOpacity>
        <View style={{width:width/1.3,alignItems:'center',}}>
          <TextInput
           style={[styles.input]} 
           value={this.state.text}
           underlineColorAndroid={this.state.text!=""?'#27A291':'#707070'}
           placeholder="Search Here"
           onChangeText={(text)=>this.SearchFilterFunction(text)}
                />
                {Platform.OS=='ios'?<View style={{width:width/1.6,alignSelf:'center',height:1,backgroundColor:'#707070',marginBottom:'2%'}} />:null}
          </View>      
                <TouchableOpacity style={styles.touchableButton} 
              >
                <Image style={{width:20,height:20}}
                  source={this.state.text!=""?require('../assets/img/greensearch.png'):require('../assets/img/searchicon.png')}
                  />
               </TouchableOpacity>
               <TouchableOpacity
              onPress={()=>this.backpress()}>
      <Image
        style={{ alignSelf: 'center',width:50,height:50 }}
       source={require('../assets/img/close.png')}/>
      </TouchableOpacity>
      </View>
          <View style={{flexDirection:'row',width:width-40,justifyContent:'center'}}>
<TouchableOpacity 
onPress={()=>this.setState({profilepage:false})}
style={[!this.state.profilepage?styles.highlight:styles.highlight1]}
            // onPress={this.headerBtnClk}
            >
<Text 
style={[!this.state.profilepage?styles.headerText:styles.blacktext,{fontFamily:'AzoSans-Medium',fontSize:14}]}

// style={{ padding: '5%',
//   fontSize: 16,
//   color:'white',
//   fontWeight: 'bold'}}
          >Pages & Publications</Text>

            </TouchableOpacity>
          <TouchableOpacity
style={[!this.state.profilepage?styles.highlight1:styles.highlight,]}
// style={[!this.state.profilepage?styles.highlight:styles.highlight1]}
           onPress={()=>this.profilePress()}
           >
          <Text 
style={[!this.state.profilepage?styles.blacktext:styles.headerText,{fontFamily:'AzoSans-Medium',fontSize:14}]}
            
            >Profiles</Text>
          </TouchableOpacity>
      </View>
        </View>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={!this.state.profilepage? this.state.profileData:this.state.getProfiles}
            renderItem={(item) =>!this.state.profilepage?
              this.fullcard(item):  this.fullcard1(item)
            }
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}/>
{/*     
        <FlatList
        legacyImplementation={false}
        data={!this.state.profilepage?this.state.profileData:this.state.getProfiles}
        // data={!this.state.profilepage? this.state.profileData1:this.state.profileData}
        navigation={this.props.navigation}
        renderItem={!this.state.profilepage?this.fullcard.bind(this):this.fullcard1.bind(this)}
        enableEmptySections={false}
        // style={{ marginTop: '1%' }}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
      /> */}

   
    <ModalBox
          style={[styles.modal, styles.modal5]}
          position={'center'}
          ref={'modal5'}
          isDisabled={this.state.isDisabled}>
         {/* <View style={{flexDirection:'column',
         margin:'2%',height: 50,
      width: 300,alignItems:'center',justifyContent:'center'}}> */}
        {/* <TouchableOpacity  onPress={ this._toggleModal} >
        <Text style={styles.modaltext}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>{
           
          this.refs.toast.show('Copied link to clipboard'),
          this.refs.modal5.close()}}
        >

           <Text style={styles.modaltext}>Copy Link</Text>
           </TouchableOpacity> */}
         
           <TouchableOpacity  onPress={ ()=>{this.props.navigation.navigate('report')
          this.refs.modal5.close()}} >

           <Text style={styles.modaltext}>Report</Text>
           </TouchableOpacity>
         {/* </View> */}
        </ModalBox>
        {/* <Toast ref="toast"

           style={{backgroundColor:'#707070',fontSize:18,width:width-100,alignItems:'center',borderRadius:15}}
           />
            <ModalBox 
              style={{  alignItems: 'center',
              flex:0.55,
              borderRadius:20,
              // flex:!this.state.expanded?0.4:0.5,
              width: 300,}}
             position={'center'}
             ref={'modal6'}
             isDisabled={this.state.isDisabled}>
          <View style={{ flex: 0.6,backgroundColor:'#fff',borderRadius:30,margin:'8%' }}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:20,margin:'5%',textAlign:'center'}}>Share Via</Text>
              <View style={{flexDirection:'column',justifyContent:'center',alignSelf:'center'}}>
                 <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/fb2.png')}/>
         <Text style={{margin:'2%'}}>Facebook</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/twitter.png')}/>
         <Text style={{margin:'2%'}}>Twitter</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center', }}>
       <Image source={require('../assets/img/insta.png')}/>
         <Text style={{margin:'2%'}}>Instagram</Text>
       </View>

       </TouchableOpacity>
       </View>
       <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/pinterest.png')}/>
         <Text style={{margin:'2%'}}>Pinterest</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/tumblr.png')}/>
         <Text style={{margin:'2%'}}>Tumblr</Text>
       </View>

       </TouchableOpacity>
      
       </View>
   
   </View>
               
            </View>
           </View>
        </ModalBox> */}
      {/* <FlatList
          legacyImplementation={false}
          data={this.state.list}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          style={{ marginTop: '1%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        /> */}

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
  pubImgStyle:{ 
    // elevation:1,
    width:width/2.8, height: height/4,
    borderRadius: 15,
    
    // alignItems:'center',
    //  jsutifyContent: 'center'
     },
     pageImgStyle:{ 
      // elevation:1,
      width: width/2.8, height: height/7.5,
        borderRadius: 15,
      // alignItems:'center',
      //  jsutifyContent: 'center'
       },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
 modaltext:{
  fontSize:18,
  padding:'4%',
  color:'#707070'
 },
 
    modal5: {
      height: 40,
      width: 200,
    },
headerText: {
  padding: '5%',
  fontSize: 16,
  color:'white'
},
header: {
  // flexDirection: 'row',
  top: 0,
  left: 0,
  right: 0,
  width: width,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 3,
  backgroundColor: '#fff',
  borderBottomColor: '#707070'
},
button: {
  shadowColor: 'rgba(0,0,0, .4)', // IOS
  shadowOffset: { height: 1, width: 1 }, // IOS
  shadowOpacity: 1, // IOS
  shadowRadius: 1, //IOS
  backgroundColor: '#fff',
  elevation: 2, // Android
  borderRadius:10,
},
topview:{
  height: '10%',
  width:width,
   backgroundColor: '#ffff', 
  elevation:3,
  flex:0.5,
  flexDirection: 'row',
  alignItems:'center',
   justifyContent: 'space-around',
  //  top:0,
  //  left:0,
  //  right:0,
  //  flex:1,
   position:'absolute',
   padding:'2%'
},
touchableButton: {
  position: 'absolute',
  right: '20%',
  height: 40,
  width: 35,
  padding: 2,
  alignItems:'center',
  justifyContent:'center'
},
input:{
  width:width/1.6,
  backgroundColor:"#fff",
  fontFamily:'AzoSans-Regular',
  fontSize:16,
  // padding:10,
  margin:5
},

textInputStyle: {
    width: width - 100,
    alignSelf:'center'
  },
 highlight: {
    backgroundColor: '#27A291',
    borderRadius: 20,
  },
  highlight1: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  btnview: {
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
      width: width/2-90,
    height: height / 20,
    maxWidth: 'auto',
    alignSelf:"center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginTop:5,
    backgroundColor:'#fff'
  },
  btnview1: {
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    width: width/2-90,
    height: height / 20,
    maxWidth: 'auto',
    alignSelf:"center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginTop:5,
    backgroundColor:'#27A291'
  },
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 2.2,
  },
  blacktext:{
     padding: '5%',
  fontSize: 16,
  color:'#707070',
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
      changeNavNews:()=>dispatch({type:'CHANGE_NAV_NEWS'}),
      savelogout: ()=> dispatch({type:'CHECKLOGOUT'})

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchDetail);
