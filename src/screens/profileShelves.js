import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  BackHandler,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from '@rhysforyou/react-native-carousel';
import PageCarousel from './pagesHorizontal';
import SeriesCarousel from './seriesCarousel';
import { Card } from "react-native-elements";
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import { ScrollView } from 'react-native-gesture-handler';
import CardView from 'react-native-cardview'
import { connect } from "react-redux";
import SnapCarousel from 'react-native-snap-carousel';
import Modal1 from 'react-native-modal';
import ModalBox from 'react-native-modalbox';
import { Divider } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';
import SnackBar from 'react-native-snackbar';
console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ProfileShelves extends Component {
  constructor() {
    super();
    this.state = {
      followHighlight: false,
      activeSection: 0,
      data1: '',
      expl: '',
      expl1: '',
      expl11: [],
      toppick: '',
      pub: '',
      pages: '',
      series: '',
      periodicals: '',
      rv: '',
      explSec: 0,
      pubSec: 0,
      pageSec: 0,
      seriesSec: 0,
      periodSec: 0,
      visible: false,
      collectionModal: false,
      loading: true,
      pubData: '',
      readlaterPopup:false,
      getuserid:'',
      profil:[],
      proflname:'',
      followers:'',
      share:'',
      about:'',
      avatar:'',
      headline:'',
      cover:'',
      noData:false,
      shareModal:false,
      exists:false,
      sectionExpand:false,
      section:'',
      secCollid:'',
      loginUserid:'',
      Is_Follow:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillUnmount() {
    this.focusListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.backpress()
    return true;
  }


  backpress = () => {
    //    console.log('before set',this.props.nav)
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs')
    this.props.navigation.goBack();

    //    console.log('after set',this.props.nav);
  }
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'blue', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'blue', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Show less
      </Text>
    );
  }
  snapItem = (index, paginationState) => {
    if (paginationState == 'expl') {
      this.setState({ explSec: index });
    } else if (paginationState == 'pub') {
      this.setState({ pubSec: index });
    } else if (paginationState == 'page') {

      this.setState({ pageSec: index });
    } else if (paginationState == 'series') {

      this.setState({ seriesSec: index });
    } else if (paginationState == 'period') {

      this.setState({ periodSec: index });

    }
  }
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image style={{ width: 100, resizeMode: 'cover' }} source={image.img} />
      </View>
    );
  }
  expllineItem({ item, index }) {
    // console.log('item',index)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
        <View style={[this.state.explSec == index ? styles.active : styles.inactive]} /></View>

    )
  }
  publineItem({ item, index }) {
    // console.log('item',index)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2, alignSelf: 'center' }}>
        <View style={[this.state.pubSec == index ? styles.active : styles.inactive]} /></View>

    )
  }
  pagelineItem({ item, index }) {
    // console.log('item',index)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
        <View style={[this.state.pageSec == index ? styles.active : styles.inactive]} /></View>

    )
  }
  serieslineItem({ item, index }) {
    // console.log('item',index)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
        <View style={[this.state.seriesSec == index ? styles.active : styles.inactive]} /></View>

    )
  }
  periodlineItem({ item, index }) {
    // console.log('item',index)
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
        <View style={[this.state.periodSec == index ? styles.active : styles.inactive]} /></View>

    )
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
 
  componentDidMount() {
    AsyncStorage.getItem('profile_userid').then((value)=>{this.setState({getuserid:value})});
    AsyncStorage.getItem('userid').then((val) => this.setState({ loginUserid: val })).done();
        // {this.getData()}
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('profile_userid').then((val) => this.setState({ getuserid: val })).done();
      AsyncStorage.getItem('userid').then((val) => this.setState({ loginUserid: val })).done();  
      this.CheckConnectivity();
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
        { this.exploredataPic() }
        console.log('follow insert service called');
        // if(responseJson.MSGS == "Added successfully" || responseJson.MSGS == "Already Exist"){
        // }

      })
      .catch((error) => {
        console.warn(error);
      });
  }
  getData(){
    setTimeout(() => {
      {this.exploredataPic()}
      { this.exData(this.state.getuserid) }

    }, 1000);
  }
  // getData(){
  //   setTimeout(() => {
  //     {this.exploredata(this.state.getuserid)}
  //   }, 5);
  // }
  exploredataPic(){
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
            console.log('profile service ',responseJson);
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
  exData(userid) {
    var json = JSON.stringify({
      "UserID": userid
    });
    
    fetch("http://162.250.120.20:444/Login/Shelf",
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
        this.setState({ pubData: responseJson, loading: false })
        console.warn(responseJson)
        console.log('dfskafdkdk ', this.state.pubData);
        //alert(this.state.data.status)
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  exploredata() {
    var json = JSON.stringify({
      'UserId': '21',
    });
    fetch("http://162.250.120.20:444/Login/Explore",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'content-type': 'multipart/form-data'
        },
        body: json
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(responseText);
        this.setState({ expl: responseJson })
        console.warn(responseJson)
       for(let i=0;i<responseJson.length;i++){
         if(responseJson[i].Msg=="No data"){
           this.setState({noData:true})

         }
       }
        //alert(this.state.data.status)
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  exploredata1() {
    var json = JSON.stringify({
      'UserId': '21',
    });
    fetch("http://162.250.120.20:444/Login/HomePage",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'content-type': 'multipart/form-data'
        },
        body: json
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(responseText);
        this.setState({
          expl1: responseJson,
          expl11: responseJson
        })
        console.warn(responseJson)
        //alert(this.state.data.status)
        for (let i = 0; i < this.state.expl11.length; i++) {

          //   alert(this.state.expl11.length+"df")


          if (this.state.expl11[i].Datafor === 'Publication') {
            let pub = [...this.state.pub];
            pub.push(this.state.expl11[i])
            this.setState({ pub });
          }
          else if (this.state.expl11[i].Datafor === 'page') {
            let rv = [...this.state.rv];
            rv.push(this.state.expl11[i])
            this.setState({ rv });
          }
          // else{
          //   let DATAS4 = [...this.state.DATAS4];
          //   DATAS4.push(this.state.DATAS[i])
          //   this.setState({DATAS4});
          // }

          // if(this.state.expl11[i].Datafor==='MV'){
          //   this.setState({toppick: this.state.expl11[i]
          //     })
          //      console.warn(this.state.expl11[i].Datafor+'fnjdnjv')

          // }
          // else if(this.state.expl11[i].Datafor==='Publication'){
          //   this.setState({pub: this.state.expl11[i]
          //   })
          // }
          // else if(this.state.expl11[i].Datafor==='page'){
          //   this.setState({rv: this.state.expl11[i]
          //   })
          // }
        }

        // if(this.state.expl11[0].Datafor==='MV'){
        //   console.warn(this.state.expl1[0].Datafor+'fnjdnjv')

        // }
        // else{
        //   console.warn("dkbhvbdbv")
        // }

      })



      .catch((error) => {
        console.warn(error);
      });
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    {this.collData(this.state.getuserid)};
}
  readlater=()=>{
    this.setState({
        collectionModal:false,
        readlaterPopup: true
    });
    setTimeout(() => {
        // this.props.changeRemove()
        this.setState({
            readlaterPopup: false,
            exists:false
        })
        //   this.props.changeRemove();
    }, 5000);
    // this.props.navigation.navigate('readlater');
  }
 
readlaterClick=()=>{
 
      let list=[this.state.currentItem];
      for(let item of list){
        AsyncStorage.setItem('typeid', item.type_id); 
        AsyncStorage.setItem('postid', item.post_id);
       this.readlaterAdd(this.state.getuserid,item.post_id,item.type_id)

      }
     
  // this.props.navigation.navigate('readlater');
}
readlaterAdd(userid,pageid,typeid){
  this.setState({loading:true})
  var json = JSON.stringify({
      'UserID': userid,
      "Post_PageID":pageid,
      "Type_ID":typeid
  });
  fetch("http://162.250.120.20:444/Login/ReadLaterAdd",
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
  if(responseJson[0].Message=="Already Exist"){
      this.setState({exists:true})
    }
  this.setState({ loading: false, collectionModal:false })
  this.readlater()
  // SnackBar.show({
  //   title: !this.state.exists?"Added to ReadLater":"Already Added in ReadLater",
  //   duration:SnackBar.LENGTH_LONG,
  //   backgroundColor: '#27A291',
  //   action: {
  //     title: 'Undo',
  //   //   onPress: () => SnackBar.show({ title: 'Thank you!' }),
  //     color: '#fff',
  //   },
  // })
//      setTimeout(() => {
//         SnackBar.dismiss()
//     // this.props.changeRemove()
//     this.setState({
//         // readlaterPopup: false,
//         exists:false
//     });
   
//     //   this.props.changeRemove();
// }, 5000);
  console.warn(responseJson)
  console.warn("readlateradd")
  //alert(this.state.data.status)  
})
.catch((error) => {
  console.warn(error);
});
}
collectionAdd(colid,secid,postid,pageid,userid,type,status){
  var json = JSON.stringify(
    {"collectionid":colid,
    "sectionid":secid,
    "postid":postid,
    "pageid":pageid,
    "userid":userid,
    "Type":type,
    "Status":status}
  )
fetch("http://162.250.120.20:444/Login/CollectionPostAdd",
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
this.setState({ loading: false })
console.warn(responseJson)
console.warn("readlateradd")
//alert(this.state.data.status)  
})
.catch((error) => {
console.warn(error);
});
}
secData(userid,collid) {
this.setState({loading:true})
var json = JSON.stringify({
    "CollectionID":collid,
    "User_ID":userid,
    "SortBy":"DESC"

});
fetch("http://162.250.120.20:444/Login/Section",
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
    const filteredList = responseJson.filter((item) => item.SectionID !== 0);
    this.setState({ section: filteredList, loading: false,secCollid:responseJson[0].CollectionsID })
          
    console.warn(responseJson)
    console.warn("section")
    //alert(this.state.data.status)  
})
.catch((error) => {
    console.warn(error);
});
}
collData(userid,colid,secid) {
this.setState({loading:true})
var json = JSON.stringify({
'UserID': userid,
"CollectionID":colid,
"SectionID":""
});
fetch("http://162.250.120.20:444/Login/CollectionSectionDD",
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
console.warn(responseJson)
console.warn("collection")
//alert(this.state.data.status)  
})
.catch((error) => {
console.warn(error);
});
}
collectionBook=(value,collid)=>{
this.setState({collectionModal:false});
console.log('collection book value is ',value)
let list=[this.state.currentItem];
for(let item of list){
 AsyncStorage.setItem('typeid', item.TypeID);
 AsyncStorage.setItem('postid', item.Post_Page_Id);
 console.log('type id postid ',item.TypeID,item.Post_Page_Id);
 if (item.TypeID ==4) {
    AsyncStorage.setItem('popup_name1',JSON.stringify(value));
     this.collectionAdd(collid,"","",item.Post_Page_Id,this.state.getuserid,item.TypeID,"")
     this.props.popupAddCol();
     AsyncStorage.setItem('colSec',JSON.stringify("Collection"));
     return this.props.navigation.navigate('readingBook');
     // return this.pressIcon();
 } else if(item.TypeID==1){
    AsyncStorage.setItem('3dots',JSON.stringify(1));
    AsyncStorage.setItem('popup_name',JSON.stringify(value));
    AsyncStorage.setItem('colSec',JSON.stringify("Collection"));
    this.collectionAdd(collid,"",item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
         return this.props.navigation.navigate('viewBook');
 } else if(item.TypeID==2){
    AsyncStorage.setItem('3dots',JSON.stringify(1));
    AsyncStorage.setItem('popup_name',JSON.stringify(value));
    AsyncStorage.setItem('colSec',JSON.stringify("Collection"));
    this.collectionAdd(collid,"",item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
         return this.props.navigation.navigate('periodiViewBook');
 }else if(item.TypeID==3){
    AsyncStorage.setItem('3dots',JSON.stringify(1));
    AsyncStorage.setItem('popup_name',JSON.stringify(value));
    AsyncStorage.setItem('colSec',JSON.stringify("Collection"));
    this.collectionAdd(collid,"",item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
           return this.props.navigation.navigate('seriesViewBook');
 }
}
// let gotoDescPage=this.state.curFuncName;
// if(this.state.curFuncName=="pressIcon"){
//     this.pressIcon(this.state.currentItem)
// }else if(this.state.funcName=="seriesPress"){
//     this.seriesPress(this.state.currentItem)
// }else if(this.state.funcName=="periodicalPress"){
//     this.periodicalPress(this.state.currentItem)
// }

}
sectionClick = (collid) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ sectionExpand: !this.state.sectionExpand });
    this.secData(this.state.getuserid,collid)
    console.log('section data collection ',this.state.section);
}
secBook=(value,collid,secid,item)=>{
    this.setState({collectionModal:false});
    console.log('section book value is ',value,item, collid,secid)
    let list=[this.state.currentItem];
    for(let item of list){
        AsyncStorage.setItem('typeid', item.TypeID);
        AsyncStorage.setItem('postid', item.Post_Page_Id);
        console.log('type id postid ',item.TypeID,item.Post_Page_Id);
        if (item.TypeID ==4) {
           AsyncStorage.setItem('popup_name1',JSON.stringify(value));
            this.collectionAdd(collid,secid,"",item.Post_Page_Id,this.state.getuserid,item.TypeID,"")
            this.props.popupAddCol();
            AsyncStorage.setItem('colSec',JSON.stringify("Section"));
            return this.props.navigation.navigate('readingBook');
            // return this.pressIcon();
        } else if(item.TypeID==1){
           AsyncStorage.setItem('3dots',JSON.stringify(1));
           AsyncStorage.setItem('popup_name',JSON.stringify(value));
           AsyncStorage.setItem('colSec',JSON.stringify("Section"));
           this.collectionAdd(collid,secid,item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
                return this.props.navigation.navigate('viewBook');
        } else if(item.TypeID==2){
           AsyncStorage.setItem('3dots',JSON.stringify(1));
           AsyncStorage.setItem('popup_name',JSON.stringify(value));
           AsyncStorage.setItem('colSec',JSON.stringify("Section"));
           this.collectionAdd(collid,secid,item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
                return this.props.navigation.navigate('periodiViewBook');
        }else if(item.TypeID==3){
           AsyncStorage.setItem('3dots',JSON.stringify(1));
           AsyncStorage.setItem('popup_name',JSON.stringify(value));
           AsyncStorage.setItem('colSec',JSON.stringify("Section"));
           this.collectionAdd(collid,secid,item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
                  return this.props.navigation.navigate('seriesViewBook');
        }
       
    }
    }
moreClick=(item,funcName)=>{
  // AsyncStorage.setItem('typeid', JSON.stringify(item.TypeID));
  // AsyncStorage.setItem('postid', JSON.stringify(item.Post_Page_Id));
  this.setState({collectionModal:!this.state.collectionModal,currentItem:item,curFuncName:funcName})
}
imgPress=()=>{
  this.props.navigation.navigate('socialmedia')
}
pressIcon = (item) => {
  let { pubData } = this.state;
  // console.log('top pick data ',item)
  // console.log('kjdsafksdfjsdka data is',toppick)
  // console.log('kjdsafksdfjsdka data is',item.TypeID)
  // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)

  pubData = pubData.map(e => {
    console.log('top pick type id is ', e.type_id)

    if (item.type_id === e.type_id) {
      AsyncStorage.setItem('typeid', JSON.stringify(item.type_id)); 
      AsyncStorage.setItem('postid',JSON.stringify(item.post_id));
      // AsyncStorage.setItem('EmailVer1', this.state.data.data.uid);
      if (item.type_id ==4) {
                return this.props.navigation.navigate('readingBook');
     } else if(item.type_id==1){
                      return this.props.navigation.navigate('viewBook');
     } else if(item.type_id==2){
             return this.props.navigation.navigate('periodiViewBook');
     }else if(item.type_id==3){
              return this.props.navigation.navigate('seriesViewBook');
     }        // }
      //  else if(item.id === 2){
      //   return this.props.navigation.navigate('filter', {
      //     item: item});
      //   }else if(item.id == 3){
      //     return this.props.navigation.navigate('bookmarks', {
      //       item: item});
    } else {
      return e;
    }
  });
}

ShareMessage = () => {
  //Here is the Share API
  Share.share({ message: "ddfjbdfjhbdf", title: "Sharing via react native" })
    //after successful share return result
    .then(result => console.log(result))
    //If any thing goes wrong it comes here
    .catch(errorMsg => console.log(errorMsg));
};
pressSearch = (item) => {
  let { data } = this.state;
  // console.log('items are', item)
  data = data.map(e => {
    if (item.id === e.id) {
      // item.like = !e.like;
      return this.props.navigation.navigate('search_explore', {
        item: item
      });
      // }
      //  else if(item.id === 2){
      //   return this.props.navigation.navigate('filter', {
      //     item: item});
      //   }else if(item.id == 3){
      //     return this.props.navigation.navigate('bookmarks', {
      //       item: item});
    } else {
      return e;
    }
  });
}

pressIcon1 = (item) => {
  let { expl } = this.state;
  console.log('top pick data ', item)
  console.log('kjdsafksdfjsdka data is', expl)
  // console.log('items are', item)
  expl = expl.map(e => {
    if (item.Category_name === e.Category_name) {
      // item.like = !e.like;
      return this.props.navigation.navigate('search', {
        item: item
      });
      // }
      // else if (item.id === 2) {
      //     return this.props.navigation.navigate('filter', {
      //         item: item
      //     });
      // } else if (item.id == 3) {
      //     return this.props.navigation.navigate('bookmarks', {
      //         item: item
      //     });
    } else {
      return e;
    }
  });
}
seriesPress = (item) => {
  let { data } = this.state;
  console.log('items are', item)
  data = data.map(e => {
    if (item.id === e.id) {
      // item.like = !e.like;
      AsyncStorage.setItem('typeid', JSON.stringify(item.type_id)); 
      AsyncStorage.setItem('postid',JSON.stringify(item.post_id));
      return this.props.navigation.navigate('seriesViewBook');

    } else {
      return e;
    }
  });
}
periodicalPress = (item) => {
  let { data } = this.state;
  // console.log('items are', item)
  data = data.map(e => {
    if (item.id === e.id) {
      // item.like = !e.like;
      AsyncStorage.setItem('typeid', JSON.stringify(item.type_id)); 
      AsyncStorage.setItem('postid',JSON.stringify(item.post_id));
      return this.props.navigation.navigate('periodiViewBook');

    } else {
      return e;
    }
  });
}
keyExtractor = (item, index) => {
  // console.log('item id is in carousel',index)
  item.id
}

// pressIcon = (item) => {
//   let { data } = this.state;
//   // console.log('items are', item)
//   data = data.map(e => {
//     if (item.id === e.id) {
//       // item.like = !e.like;
//       return this.props.navigation.navigate('viewBook', {
//         item: item
//       });
//       // }
//       //  else if(item.id === 2){
//       //   return this.props.navigation.navigate('filter', {
//       //     item: item});
//       //   }else if(item.id == 3){
//       //     return this.props.navigation.navigate('bookmarks', {
//       //       item: item});
//     } else {
//       return e;
//     }
//   });
// }
render() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <View style={styles.staticheader}> */}
      <View style={styles.staticheader}>
        <View style={{ flexDirection: 'row', width: width - 40, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('profileAbout')}>
            <Text style={styles.headerText}

            >About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('profileCollection')}>
            <Text style={styles.headerText}

            >Collection</Text>
          </TouchableOpacity>

         
            <TouchableOpacity style={{ borderRadius: 10,backgroundColor:'#27A291'}}
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 14,
                color: '#fff',
                fontFamily: 'AzoSans-Medium'
              }}
                onPress={() => this.props.navigation.navigate('profileShelves')}
              >Shelves</Text>
            </TouchableOpacity>
          {/* </View> */}
          {/* </View> */}
        </View>
        <TouchableOpacity onPress={() => this.backpress()}>
        <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
          <View style={styles.containerStyle} >
              <ImageBackground style={styles.sliderContainerStyle}
                source={{uri:this.state.cover!=""?this.state.cover:null}}
                >
                {/* <Slider/> */}
              </ImageBackground>
            </View> 
   
            <Image style={styles.avatar} source={{uri:this.state.avatar}}/>

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
                  <Text style={{color:this.state.Is_Follow=="Followed"?'#fff':'#27A291',fontSize:16,fontFamily:'AzoSans-Regular'}}>{this.state.Is_Follow}</Text>                
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
          </View>
          {!this.state.noData?null:
          <View>

          <Text style={styles.centerText}>Publications</Text>

          <FlatList
            data={this.state.pubData.length}
            horizontal={true}
            navigation={this.props.navigation}
            renderItem={this.publineItem.bind(this)}
            extraData={this.state}
            style={{ alignSelf: 'center' }}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={{ height: 1, width: width - 50, backgroundColor: '#27A291', alignSelf: 'center' }} />

          <SnapCarousel
            data={this.state.pubData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => this.pressIcon(item)}
              >
                <View>
                  <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <ImageBackground source={{ uri: item.CoverImg!=""?item.CoverImg:null }} style={{ width: 130, height: 150, jsutifyContent: 'center' }}>
                      <TouchableOpacity
                        onPress={() => this.moreClick(item)}>
                        <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </CardView>
                  <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126', textAlign: 'center' }}>
                    {item.Title}
                  </Text>
                  <Text style={{ marginBottom: 10, fontSize: 10, color: '#707070', textAlign: 'center' }}>
                    {item.subtitle}
                  </Text>
                </View>

              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            autoplay={false}
            enableMomentum={true}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={120}
            itemHeight={100}
            snapToInterval={20}
            contentContainerCustomStyle={{ marginLeft: -80, }}
            snapToAlignment={'start'}
            onSnapToItem={(index) => this.snapItem(index, 'pub')}
            containerCustomStyle={{ marginTop: 30 }}
          />
          </View>
            }

          {/*    
<Text style={styles.centerText}>Pages</Text>

<FlatList
  data={this.state.rv}
  horizontal={true}
  navigation={this.props.navigation}
  renderItem={this.pagelineItem.bind(this)}
  extraData={this.state}
  style={{alignSelf:'center'}}
  keyExtractor={(item, index) => index.toString()}
/>

<View style={{ height: 1, width: width - 50, backgroundColor: '#27A291',alignSelf:'center' }} />

<SnapCarousel
  data={this.state.rv}
  renderItem={({ item, index }) => (
      <TouchableOpacity
          onPress={() => this.pressIcon(item)}
      >
          <View>
              <CardView
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={5}>
                  <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 100, jsutifyContent: 'center' }}>
                      <TouchableOpacity
                          onPress={() => this.setState({collectionModal:!this.state.collectionModal})}>
                          <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                      </TouchableOpacity>
                  </ImageBackground>
              </CardView>
              <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center'}}>
                  {item.Title}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 10, color: '#707070',textAlign:'center' }}>
                  {item.subtitle}
              </Text>
          </View>

      </TouchableOpacity>
  )}
  keyExtractor={item => item.id}
  autoplay={false}
  enableMomentum={true}
  sliderWidth={Dimensions.get('window').width}
  itemWidth={130}
  itemHeight={100}
  snapToInterval={20}
  contentContainerCustomStyle={{marginLeft:-80}}
  snapToAlignment={'start'}
  onSnapToItem={(index) => this.snapItem(index, 'page')}
  containerCustomStyle={{ marginTop: 30,backgroundColor:"transparent" }}
/> */}
          {/* <Text style={styles.centerText}>Series</Text>
<FlatList
  data={this.state.data}
  horizontal={true}
  data={this.state.data}
  navigation={this.props.navigation}
  renderItem={this.serieslineItem.bind(this)}
  extraData={this.state}
 style={{alignSelf:'center'}}
  keyExtractor={(item, index) => index.toString()}
/>

<View style={{ height: 1, width: width - 50, backgroundColor: '#27A291',alignSelf:'center' }} />


<SnapCarousel
data={this.state.data}
  renderItem={({item,index}) => (
      <TouchableOpacity
          onPress={() => this.pressIcon(item)}
      >
          <View>
              <CardView
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={5}>
                  <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 150, jsutifyContent: 'center' }}>
                      <TouchableOpacity
                             onPress={() => this.setState({collectionModal:!this.state.collectionModal})}>
                          <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                      </TouchableOpacity>
                  </ImageBackground>
              </CardView>
              <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center'  }}>
                  {item.Title}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 10, color: '#707070',textAlign:'center' }}>
                  {item.subtitle}
              </Text>
          </View>

      </TouchableOpacity>
  )}
  keyExtractor={item => item.id}
  autoplay={false}
  enableMomentum={true}
  sliderWidth={Dimensions.get('window').width}
  itemWidth={120}
  itemHeight={80}
  snapToInterval={20}
    contentContainerCustomStyle={{marginLeft:-80}}
  snapToAlignment={'start'}
  onSnapToItem={(index) => this.snapItem(index, 'series')}
  containerCustomStyle={{ marginTop: 30 }}
/>
<Text style={styles.centerText}>Periodicals</Text>
<FlatList
  data={this.state.data}
  horizontal={true}
  data={this.state.data}
  navigation={this.props.navigation}
  renderItem={this.periodlineItem.bind(this)}
  extraData={this.state}
  style={{alignSelf:'center'}}
  keyExtractor={(item, index) => index.toString()}
/>

<View style={{ height: 1, width: width - 50, backgroundColor: '#27A291',alignSelf:'center' }} />

<SnapCarousel
data={this.state.data}
  renderItem={({item,index}) => (
      <TouchableOpacity
          onPress={() => this.pressIcon(item)}
      >
          <View>
              <CardView
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={5}>
                  <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 150, jsutifyContent: 'center' }}>
                      <TouchableOpacity
                           onPress={() => this.setState({collectionModal:!this.state.collectionModal})}>
                          <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                      </TouchableOpacity>
                  </ImageBackground>
              </CardView>
              <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center' }}>
                  {item.Title}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 10, color: '#707070',textAlign:'center' }}>
                  {item.subtitle}
              </Text>
          </View>

      </TouchableOpacity>
  )}
  keyExtractor={item => item.id}
  autoplay={false}
  enableMomentum={true}
  sliderWidth={Dimensions.get('window').width}
  itemWidth={120}
  itemHeight={80}
  snapToInterval={20}
    contentContainerCustomStyle={{marginLeft:-80}}
  snapToAlignment={'start'}
  onSnapToItem={(index) => this.snapItem(index, 'period')}
  containerCustomStyle={{ marginTop: 30 }}
/> */}

        </View>


      </ScrollView>
      <Modal1 isVisible={this.state.collectionModal}
onBackdropPress={() => this.setState({ collectionModal: false })}>
        <View 
        style={{backgroundColor:'#fff', alignItems: 'center',
        justifyContent:'center',
        alignSelf:'center',
        flex: !this.state.expanded ? 0.3 : 0.5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomEndRadius: 5,
        width: 300,}}
        >
        <TouchableOpacity
                style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: 200,height:30, }}
                onPress={() => {this.props.navigation.navigate('createCollection')
                this.setState({collectionModal:false})}}>
                <View style={{
                  flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,height:30,
                  justifyContent: 'center', alignSelf: 'center'
                }}>
                  <Image  source={require('../assets/img/createCol.png')} />
                  <Text style={{ fontSize: 17, color: '#27A291', marginLeft: '5%', width: width / 2.5, }}>Create Collection</Text>
  
                </View>
              </TouchableOpacity>
  
              <Divider style={{ backgroundColor: '#707070', marginTop: '5%',borderWidth:0.3,width: 300 }} />
              {!this.state.expanded ? (
                <TouchableOpacity
                  onPress={this.changeLayout}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '4%',
                    width:300,
                    justifyContent: 'space-between',
                  }}>
                    <View 
                    style={{
                      flexDirection: 'row',
                     width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                    }}
                    >
                 <Image  source={require('../assets/img/colliconnew1.png')} />
                      <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 2.9  }}>Collections</Text>
                    </View>
  
                    <Image style={{ alignSelf: 'center',  }} source={require('../assets/img/down_arrow.png')} />
                  </View>
                </TouchableOpacity>
              ) : (
                  <View style={{ height: !this.state.expanded ? 50 : 145, }}>
  
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '4%',
                      backgroundColor: '#27A291',
                      width: 300,
                      justifyContent: 'space-between',
                    }}>
                      <View style={{
                        flexDirection: 'row', width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                      }}>
                  <Image source={require('../assets/img/coll_white1.png')} />
                      <Text style={{ fontSize: 17, color: '#fff', marginLeft: '5%', width: width / 2.9  }}>Collections</Text>
                      </View>
                      <TouchableOpacity
                        // style={{ marginLeft: '-15%', }}
                        onPress={this.changeLayout}>
                        <Image style={{ alignSelf: 'center', }} source={require('../assets/img/up_arrow_white.png')} />
                      </TouchableOpacity>
                    </View>
                <ScrollView persistentScrollbar={this.state.collection.length>2?true:false}>
                 <FlatList
                      data={this.state.collection}
                      keyExtractor={(item,index)=>index.toString()}
                      renderItem={({item})=>(
                          <View>
                          <TouchableOpacity
                             style={{backgroundColor:'#f0f0f0',width:300,}}
                               onPress={() => this.collectionBook(item.title,item.id)}>
                               <View style={{
                                 flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                               }}>
                                 <Text numberOfLines={1} style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.title}</Text>
                                 <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} />
                     <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                             <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                     </TouchableOpacity> 
                     </View>
                     </TouchableOpacity>
                             <Divider style={{ backgroundColor: '#707070',borderWidth:0.2 }} />
                     { item.id==this.state.secCollid
                  //    item.SectionStatus==1
                     ?
                  <FlatList
                  data={this.state.section}
                  keyExtractor={(item,index)=>index.toString()}
                  renderItem={({item})=>(
                      <View>
                       {item.SectionID!=0? 
                       <View>
                       <TouchableOpacity
                         style={{backgroundColor:'#f0f0f0',width:300,}}
                           onPress={() => this.secBook(item.Title,item.CollectionsID,item.SectionID,item)}
                           >
                         <View style={{
                             flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                           }}>
                             <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.Title}</Text>
                             {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                 {/* <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                         <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                 </TouchableOpacity>  */}
                 </View>
                 </TouchableOpacity>
                         <Divider style={{ backgroundColor: '#707070',borderWidth:0.2 }} />
                         </View>
                         :null}
                         </View> )}/>:null}
                   </View>
                      )}/>
             </ScrollView>
              </View>
            )}

          <TouchableOpacity
            onPress={() => this.readlaterClick()}>

            <View style={{
              flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
              justifyContent: 'center', alignSelf: 'center'
            }}>
                  <Image source={require('../assets/img/readlaternew1.png')} />
              <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 3 }}>Read Later</Text>
              <Divider style={{ backgroundColor: '#707070' }} />

            </View>
          </TouchableOpacity>

        </View>
      </Modal1>
 <Modal1 isVisible={this.state.loading}
       
       // onBackdropPress={() => this.setState({ loading: true })}
       >
              <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
               width: 140,           
                     height: 140
                     }} />
               </Modal1>
               <Modal
           animationType="slide"
           transparent
            visible={this.state.readlaterPopup}
                      onRequestClose={() => {
                          console.log('Modal has been closed.');
                      }}>
                      <View style={{
                          left: 0, right: 0, bottom: 0, position: 'absolute',
                          height: '8%',
                          flexDirection:'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#27A291',
                      }}>
                          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center',width:width/1.4 }}>{!this.state.exists?"Added to ReadLater":"Already Added to Readlater"}</Text>
                         
                              <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
                      </View>
        </Modal>
        <Modal1 isVisible={this.state.shareModal}
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
      </Modal1>
   
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
active: { height: 4, width: 20, backgroundColor: 'green' },
inactive: { height: 2, width: 20, backgroundColor: '#707070' },
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
  // marginBottom:10,
  position: 'absolute',
  flexDirection: 'row',
  justifyContent:'center',
  alignSelf:'center',
  alignItems: 'center',
  marginTop: width /4  //actual marginTop:130
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
   marginTop:'1%'
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
// overlay:{
//   // marginTop:'10%',
//   justifyContent: "center",
//   alignItems: "center",
// },
centerText: {
  color: 'black',
  // justifyContent: "center",
  textAlign: 'left',
  width: width - 50,
  // alignItems: "center",
  fontSize: 22,
  //  fontWeight: 'bold',
  margin: '5%'
},


});
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShelves);
