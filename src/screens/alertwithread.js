import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  StatusBar,
  ProgressBarAndroid, 
  Modal,
  ProgressViewIOS,
  SafeAreaView,
  Alert,
  AsyncStorage, LayoutAnimation, FlatList
} from 'react-native';
import LoginModal from '../components/loginModal';
import BlurModal from '../components/blurModal';

import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import Clipboard from '@react-native-community/clipboard';
import { ScrollView } from 'react-native-gesture-handler';
import { Tooltip } from 'react-native-elements';
import Modal1 from 'react-native-modal';
import { Divider } from 'react-native-elements';
import { connect } from "react-redux";
// import RNSelectableText from 'react-native-selectable-text';
// import HTMLView from 'react-native-htmlview';
// import HTMLView from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import HTMLView1 from 'react-native-htmlview';
import WebView from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
// import SelectableText from 'react-native-selectable-text';
import LinearGradient from 'react-native-linear-gradient';
import { SelectableText } from "@astrocoders/react-native-selectable-text";
import Share from 'react-native-share';
import SnackBar from 'react-native-snackbar';
import { color } from 'react-native-reanimated';
    const audiopage=`<p contenteditable="true" placeholder="Title...">Testing for Audio</p><img id="titlorgimg" style="margin:0 auto;width:300px;height:200px" onclick="titshowimgwid(this)" class="" src="http://pagevio.com/uploads/stories/iron-man-hand-minimal-4k-y0.jpg"><img src="../../images/cancel.png" onclick="ClearImage(1)" class="imgcan"><p>File size of the below audio is 700kb and 28 seconds</p><div class="vidfoc" contenteditable="false" id="AudioPlayer_1" style="text-align: right;"><img src="../../images/cancel.png" alt="" style="cursor: pointer;" class="fr-draggable"><div class="audioplayer" contenteditable="false"><audio id="Audio_1" style="width: 0px; height: 0px; visibility: hidden;"><source src="..http://pagevio.com/uploads/stories/file_example_MP3_700KB.mp3"></audio><div class="audioplayer-playpause" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-time audioplayer-time-current" contenteditable="false">00:00</div><div class="audioplayer-bar" contenteditable="false"><div contenteditable="false" class="audioplayer-bar-loaded" style="width: 8.57552%;"></div><div contenteditable="false" class="audioplayer-bar-played" style="width: 44.0335%;"></div></div><div class="audioplayer-time audioplayer-time-duration" contenteditable="false">00:28</div><div class="audioplayer-volume" contenteditable="false"><div class="audioplayer-volume-button" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-volume-adjust" contenteditable="false"><div><div style="width: 100%;"><br></div></div></div></div></div><section class="ToolBar" id="audiotoolbar_1" style="top: 105px; display: none;"><i class="fa fa-bold" aria-hidden="true"></i><i class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" aria-hidden="true"></i><i class="fa fa-align-center" aria-hidden="true"></i><i class="fa fa-align-right" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i></section><input id="Audiotitle_1" class="form-control subtitle" placeholder="Title.." value=""></div><p>File size of the below audio is 1MB and 28 seconds</p><div class="vidfoc" contenteditable="false" id="AudioPlayer_2" style="text-align: right;"><img src="../../images/cancel.png" alt="" style="cursor: pointer;" class="fr-draggable"><div class="audioplayer" contenteditable="false"><audio id="Audio_2" style="width: 0px; height: 0px; visibility: hidden;"><source src="..http://pagevio.com/uploads/stories/file_example_MP3_1MG.mp3"></audio><div class="audioplayer-playpause" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-time audioplayer-time-current" contenteditable="false">00:00</div><div class="audioplayer-bar" contenteditable="false"><div contenteditable="false" class="audioplayer-bar-loaded" style="width: 12.3825%;"></div><div contenteditable="false" class="audioplayer-bar-played"></div></div><div class="audioplayer-time audioplayer-time-duration" contenteditable="false">00:28</div><div class="audioplayer-volume" contenteditable="false"><div class="audioplayer-volume-button" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-volume-adjust" contenteditable="false"><div><div style="width: 100%;"><br></div></div></div></div></div><section class="ToolBar" id="audiotoolbar_2" style="top: 105px; display: none;"><i class="fa fa-bold" aria-hidden="true"></i><i class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" aria-hidden="true"></i><i class="fa fa-align-center" aria-hidden="true"></i><i class="fa fa-align-right" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i></section><input id="Audiotitle_2" class="form-control subtitle" placeholder="Title.." value=""></div><p>File size of the below audio is 5MB and 2:13 seconds</p><div class="vidfoc" contenteditable="false" id="AudioPlayer_3" style="text-align: right;"><img src="../../images/cancel.png" alt="" style="cursor: pointer;" class="fr-draggable"><div class="audioplayer" contenteditable="false"><audio id="Audio_3" style="width: 0px; height: 0px; visibility: hidden;"><source src="..http://pagevio.com/uploads/stories/file_example_MP3_5MG.mp3"></audio><div class="audioplayer-playpause" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-time audioplayer-time-current" contenteditable="false">00:00</div><div class="audioplayer-bar" contenteditable="false"><div contenteditable="false" class="audioplayer-bar-loaded" style="width: 1.23898%;"></div><div contenteditable="false" class="audioplayer-bar-played"></div></div><div class="audioplayer-time audioplayer-time-duration" contenteditable="false">02:13</div><div class="audioplayer-volume" contenteditable="false"><div class="audioplayer-volume-button" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-volume-adjust" contenteditable="false"><div><div style="width: 100%;"><br></div></div></div></div></div><section class="ToolBar" id="audiotoolbar_3" style="top: 105px; display: none;"><i class="fa fa-bold" aria-hidden="true"></i><i class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" aria-hidden="true"></i><i class="fa fa-align-center" aria-hidden="true"></i><i class="fa fa-align-right" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i></section><input id="Audiotitle_3" class="form-control subtitle" placeholder="Title.." value=""></div><p><br></p>`;
    import Icons from 'react-native-vector-icons/AntDesign'
    import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
    import ShareIcon from 'react-native-vector-icons/EvilIcons'
console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const theme = {
  light: {},
  dark: {
    container: {
      backgroundColor: "#000",
      // justifyContent: 'center',
      // alignItems: 'center',
      flex: 1
    },
    instructions: {
      textAlign: 'center',
      color: '#fff',
      marginBottom: 5,
      fontSize: 21,
      padding: 20,
      textAlign: 'left'
    },
    title: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    description: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'left'
    },
    // dateText: {
    //   fontSize: 12,
    //   color: '#fff',
    //   textAlign: 'left'
    // },
    // dateText1: {
    //   fontSize: 12,
    //   color: '#fff',
    //   textAlign: 'left',
    //   fontWeight: 'bold'
    // },
  }
};

class ReadingBook extends Component {
  constructor() {
    super();
    this.state = {
      progress_count: 0,
      modeState: 'light',
      boolean: false,
      showTopTab: true,
      description: '',
      readingData: '',
      avatar: '',
      getpostid: '',
      gettypeid: '',
      loading: true,
      page_url: '',
      selectable: false,
      pagefeedData: '',
      like: false,
      shareModal: false,
      pagefeedAvatar: '',
      pagefeedTitle: '',
      created_at: '',
      collectionModal: false, readlaterPopup: false,
      popup_title: '', getuserid: '',
      popup_title1: '', popuptitleRead: false, exists: false,popuptitle:'',
      DataCol: [], getContent: '',
      pinspopup: false,
      bookmarkPopup: false,
      pagecount1: 0,
      getpagecount: 0,
      convert: false,
      author: '',
      continueRead: false,
      previousRead: false,
      sectionExpand: false,
      section: '',
      secCollid: '',
      collection: '',
      copiedData: '',
      contentVisible: false,
      contents: '',
      profile_userid: '',
      pagefeed_userid: '',
      nextPage: '',
      previousPage: '',
      profile_userid: '',
      bgImg: '',
      page_id:'',
      scrollTop:false,
      getcontentpageCount:'',
      contentToRead:false,
      selectstate:true,
      readpageId:'',
      popupModal:false,
      getsecColName:'',
      getColId:'',
      getSecId:'',
      interactionsComplete: false,
      explore_page:'0',
      loginPoup:false,
      statusReadlater:'',
      likestatus:false,
      postImg:'',
      undo:false,
      subtitle:''
     

    }
    this.pagecounting = 1;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.onEndReachedCalledDuringMomentum=true;
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
    this.logoutpress()
}
//   alertPopup(){
//     this.setState({loginPopup:true})
// }
closeLoginPopup(){
 this.setState({loginPopup:false});
 this.props.savelogin();
 AsyncStorage.setItem('explore_page',JSON.stringify(0));
 AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid : value })).done();
 AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();
 AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
 AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
this.CheckConnectivity()
}
  async componentDidMount() {
    this.setEmptyClipboard();
    // AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid : value })).done();
    AsyncStorage.getItem('pagefeed_userid').then((value) => this.setState({ pagefeed_userid: value })).done();
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    AsyncStorage.getItem('profile_userid').then((value) => this.setState({ profile_userid: value })).done();
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    AsyncStorage.getItem('pageorder').then((value) => this.setState({ getcontentpageCount: value })).done();
    AsyncStorage.getItem('contentTopage').then((value) => this.setState({ contentToRead: value })).done();
    AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();
    this.setState({loading:false})
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({interactionsComplete: true});
    // });
    // AsyncStorage.getItem('popup_name1').then((newval1) => this.setState({ popup_title1: newval1 })).done();
    this.CheckConnectivity();
    // this.focusListener = this.props.navigation.addListener('willFocus', () => {
    //   if(this.props.collSec==true){
    //     console.log('coll sec value in read page ',this.props.collSec)
    //       {this.getData2()}
  
    //    }
    //     this.CheckConnectivity();
    //   })
  
    // { this.getData() }
    // this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  getData2() {
    AsyncStorage.getItem('popup_name').then((newval1) => this.setState({ popup_title: newval1 })).done();
    AsyncStorage.getItem('colSec').then((value) => this.setState({ getsecColName: value })).done();
    AsyncStorage.getItem('colId').then((newval1) => this.setState({ getColId: newval1 })).done();
    AsyncStorage.getItem('SecId').then((newval1) => this.setState({ getSecId: newval1 })).done();
    if(this.props.collSec==true){
        setTimeout(
            () =>
                this.collSecModal(),
            1000
        );
    }
}
readlater = () => {
  this.setState({
    collectionModal: false,
    readlaterPopup: true
  });

  setTimeout(() => {
    this.setState({
      readlaterPopup: false,
    })
    if (this.state.undo == false) {
      this.readlaterAdd(this.state.getuserid, this.state.getpostid, this.state.gettypeid)
    } else {
      this.setState({ undo: false })
    }
  }, 3000);

  // this.props.navigation.navigate('readlater');
}
  readlaterAdd(userid, pageid, typeid) {

    // this.setState({ loading: true })
    var json = JSON.stringify({
      'UserID': userid,
      "Post_PageID": pageid,
      "Type_ID": typeid
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
        if (responseJson[0].Message == "Already Exist"|| "Added Successfully") {
          this.setState({ exists: true })
        }else{
          this.setState({exists:false})
        }
        this.setState({ loading: false, collectionModal:false,expanded:false,sectionExpand:false})
        { this.exploredata(this.state.gettypeid, this.state.getpostid) }

        // this.readlater()
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
  CheckConnectivity() {
    NetInfo.fetch().then(state => {

      console.log("Connection type cheking", state.type);
      console.log("Is connected cheking?", state.isConnected);
      if (state.isConnected == true) {
        { this.getData(); }
      } else {
        alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
      }

    });
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    { this.collData(this.state.getuserid, "", "") };
  }
  secData(userid,collid) {
    // this.setState({loading:true})
    var json = JSON.stringify({
        "CollectionID":collid,
        "User_ID":userid,
        "SortBy":"DESC"
    });
    console.log('json sec data ',json)
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
        this.setState({ section: responseJson,});
        //     secCollid:responseJson[0].CollectionsID })
        const filteredList = this.state.section.filter((item) => item.SectionID !== 0);
        this.setState({ section: filteredList, loading: false, secCollid: collid})
        console.warn(responseJson)
        console.warn("section")
        //alert(this.state.data.status)  
    })
    .catch((error) => {
        console.warn(error);
    });
}
  collData(userid, colid, secid) {
    // this.setState({ loading: true })
    var json = JSON.stringify({
      'UserID': userid,
      "CollectionID": colid,
      "SectionID": ""
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
        this.setState({ collection: responseJson, })
        console.warn(responseJson)
        console.warn("collection")
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }


  sectionClick = (collid) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ sectionExpand: !this.state.sectionExpand });
    this.secData(this.state.getuserid,collid)
    console.log('section data collection ',this.state.section);
}
  secBook = (value, colid, secid, item) => {
    this.setState({ collectionModal: false,getColId:colid,getSecId:secid,expanded:false,sectionExpand:false});
    // this.changeLayout();
    console.log('collection book value is ', value)
    { this.collectionAdd(colid, secid, "", this.state.getpostid, this.state.getuserid, this.state.gettypeid, "") }
    this.props.collSecPopup();
    this.setState({ popup_title: value,getsecColName: "Section",getSecId: secid})
    this.collSecModal();
    // AsyncStorage.setItem('3dots', JSON.stringify(1));
    // AsyncStorage.setItem('popup_name', JSON.stringify(value));
    // AsyncStorage.setItem('colSec',JSON.stringify("Section"));
    // AsyncStorage.getItem('3dots').then((newval) => this.setState({ popup_val: newval })).done();
    // if (this.state.popup_val == 1) {
    //   AsyncStorage.getItem('popup_name').then((newval1) => this.setState({ popup_title: newval1 })).done();

    //   // console.log('value is ', this.state.popup_val,this.state.popup_title);
    //   if (this.state.popup_title != '') {

    //     setTimeout(
    //       () =>
    //         this.showModal(),

    //       1000
    //     );

    //     AsyncStorage.setItem('3dots', JSON.stringify(0));
    //   }
    // }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    // setTimeout(() => {
    //   {this.state.scrollTop?this.scroll.scrollTo({x: 0,animated: true}):null}
    //  }, 1);
    // this.focusListener.remove()

  }
  getData() {
    // if(this.props.addCol==true){
    //   this.showModal();
    //   this.props.popupAddCol();

    // }
    setTimeout(() => {
      console.log('typeid in comp ', this.state.gettypeid, this.state.pagecount1)
      console.log('get postid in reading book page ', this.state.getpostid,this.state.contentToRead)
      if(this.state.contentToRead){
      {this.state.getcontentpageCount!=""?this.pagecounting=Number(this.state.getcontentpageCount):null}
      this.setState({contentToRead:false})
      AsyncStorage.setItem('pageorder',JSON.stringify(1));
        AsyncStorage.setItem('contentTopage',JSON.stringify(false));
      }
      { this.exploredata(this.state.getpostid, this.state.gettypeid); }
      // {this.exploredata(JSON.parse(this.state.getpostid,this.state.gettypeid,this.state.pagecount1))}

      // console.log('pagefeed data is ',this.state.pagefeedData)
      // for(let i=0;i<this.state.pagefeedData;i++){
      //   this.setState({
      //     pagefeedAvatar:this.state.pagefeedData[i].User_Images,
      //     pagefeedTitle:this.state.pagefeedData[i].Title
      //   })
      // }
      // { this.exploredata(this.state.gettypeid, this.state.getpostid) }
    }, 3000);
  }
  // exploredata(postid,typeid,pagecount){
  //   console.log('josn postid,typeid, pagingcount ',postid,typeid,pagecount)
  //   // var type = JSON.parse(this.state.gettypeid)
  // var json=JSON.stringify(
  //   {
  //   'PostID': this.state.getpostid,'SP_For':"Read",'Type_ID':this.state.gettypeid,'PagingCount':this.state.pagecount1
  //   });
  // var decoded = JSON.parse(json);
  // var finalData = json.replace(/\\/g,"");
  // // console.log(decode, typeof decoded);
  // console.log('json data in reading page ',finalData)

  //     // console.log('json data in reading page ',json)
  //     fetch("http://162.250.120.20:444/Login/ReadPages",
  //       {
  //           method: 'POST',
  //           headers: {
  //               'Accept': 'application/json',
  //               'content-type': 'application/json'
  //           },
  //           body: !this.state.convert?json:decoded
  //       } 
  //   )
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //           //alert(responseText);
  // this.setState({readingData: this.state.readingData.concat(responseJson),
  //   //adding the new data with old one available in Data Source of the List
  //   loading: false,})
  // for (let i = 0; i < this.state.readingData.length; i++) {
  //  this.setState({
  //    description:this.state.readingData[i].page_description,
  //   avatar:this.state.readingData[i].avatar,
  //   created_at:this.state.readingData[i].created_at,
  //   page_url:this.state.readingData[i].page_url,
  //   DataCol:responseJson[i].Data,
  //   getpagecount:responseJson[i].Pagingcounts})
  // }
  // // alert(this.state.description);
  // console.log('this description data is ',this.state.description);
  // console.warn(responseJson)
  // //alert(this.state.data.status)  
  //       })
  //       .catch((error) => {
  //           console.warn(error);
  //       });

  // }
  exploredata = async (postid, typeid) => {
    this.setState({ loading: true })
    console.log('post,type,pagecount', this.state.getpostid, this.state.gettypeid, this.pagecounting)
    var json = JSON.stringify(
      {
        'PostID': this.state.getpostid, 'SP_For': "Read", 'Type_ID': typeid, 'PagingCount': this.pagecounting,"USERID":this.state.getuserid
        // 'PostID': "3075", 'SP_For': "Read", 'Type_ID': typeid, 'PagingCount': this.pagecounting

      });
    // console.log('read page passing data value is ', json);
    // var decoded = JSON.parse(json);
    // console.log('decoded', decoded);
    // var finalData = json.replace(/\\/g, "");
    // console.log('final data ', finalData);
      console.log('reading page json ',json)
    fetch("http://162.250.120.20:444/Login/ReadPages",
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
       console.log(responseJson)
        this.setState({
          readingData: this.state.readingData.concat(responseJson),
          loading: false,
        })
        console.log('reading data length ',responseJson[0].ReadStatus)
        if(responseJson!=[]){
        this.setState({
          scrollTop:true,
          description:responseJson[0].page_description,
          avatar: responseJson[0].avatar,
          created_at: responseJson[0].created_at,
          page_url: responseJson[0].page_url,
          DataCol: responseJson[0].Data,
          getpagecount: responseJson[0].Pagingcounts,
          author: responseJson[0].user_name,
          nextPage: responseJson[0].NextPage,
          previousPage: responseJson[0].PreviousPage,
          profile_userid: responseJson[0].user_id,
          bgImg: responseJson[0].BackGround_Img,
          page_id:responseJson[0].page_id,
          postImg:responseJson[0].PostImg,
          exists:responseJson[0].Readstatus=="N"?false:true,
          likeStatus:responseJson[0].Likestatus=='Y'?true:false,
          subtitle:responseJson[0].sub_title

        })
        console.log('page des ',this.state.description)
       
        console.log('this description data is ', this.state.avatar, this.state.page_url, this.state.created_at,"exist",this.state.exists);
      }
      console.warn(responseJson);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  handleBackButtonClick() {
    this.backpress()
    
    return true;
  }
  collectionAdd(colid, secid, postid, pageid, userid, type, status) {
    var json = JSON.stringify(
      {
        "collectionid": colid,
        "sectionid": secid,
        "postid": postid,
        "pageid": pageid,
        "userid": userid,
        "Type": type,
        "Status": status
      }

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
  collectionBook = (value, colid) => {
    this.changeLayout();
    this.setState({ popuptitleRead: true, popuptitle: value });
    // alert(this.state.popup_title)
    this.setState({ collectionModal: false,expanded:false,sectionExpand:false});
    console.log('collection book value is ', value);
    // this.props.popupAddCol();
    this.collectionAdd(colid, "", "", this.state.getpostid, this.state.getuserid, this.state.gettypeid, "")
    this.props.collSecPopup();
    this.setState({ popup_title: value,getsecColName: "Collection",getColId: colid})
    this.collSecModal();
    // this.showModal();
    // this.props.popupAddCol();
    // this.props.navigation.navigate('readingBook');
    // return this.props.navigation.navigate('viewBook');

  }
  descriptionList({ item }) {
    return (
      <View>
        {item.Contant == null ? <Image source={{ uri: item.Image }}
        // style={{width:item.Image!=null?'80%':null}}
        /> : null}
        {item.Image == null ?
          //  <Text>new</Text>
          //   <SelectableText
          //   selectable
          //   multiline
          //   contextMenuHidden
          //   scrollEnabled={false}
          //   editable={false}
          //   onSelectionChange={(event) => {
          //     const {
          //       nativeEvent: {
          //         selection: { start, end },
          //       },
          //     } = event
          //     const str = text.substring(start, end)
          //     onSelectionChange({ str, start, end })
          //   }}
          //   style={{
          //     color: "#BAB6C8",
          //   }}
          //   value={item.Contant}
          // />
          <SelectableText
            menuItems={["Select"]}
            selectable={true} selectionColor='#27A291'
            value={item.Contant}
             onSelection={({ eventType, content, selectionStart, selectionEnd }) => {
              this.setState({ getContent: content, showTopTab: !this.state.showTopTab, selectable: !this.state.selectable })
              console.log(content)
            }
            }
            style={[styles.description, theme[this.state.modeState].description]} />
          // <Text style={[this.state.modeState=='light'?styles.description:theme[this.state.modeState].description]}>
          // {item.Contant}
          //                  </Text>
          : null}
      </View>
    )
  }
  addPins= async () => { 
   const clipboardContent = await Clipboard.getString();
   this.setState({ copiedData: clipboardContent });
   if(this.state.copiedData.trim().length>0){
    this.setState({loading:true})
    var json = JSON.stringify({
      "options": "Add", "page_id": this.state.page_id, "type":"type", "collection_id": "", "section_id": "", "Description": this.state.copiedData, "user_id": this.state.getuserid, "SortBy": "Asc"
    });
    console.log('json to add pins ', json)
    fetch("http://162.250.120.20:444/Login/pinsInsertGet",
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
        this.setState({ loading: false, 
          pinspopup: true 
        })
        this.showModal('pinspopup');
        this.setEmptyClipboard();
        //alert(this.state.data.status)  
        // this.setState({pinspopup:false})
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  }
  collSecModal = () => {
    // console.log('enters')
    this.setState({
      popupModal: true
    });
    setTimeout(() => {
      // this.props.changeRemove()
      this.setState({
        popupModal: false
      })
      this.props.collSecPopup();
      //   this.props.changeRemove();
    }, 3000);
  
    // console.log('modal state is ', this.state.popupModal)
  }
  addBookmark = async () => { 
    const clipboardContent = await Clipboard.getString();
    this.setState({ copiedData: clipboardContent });
    if(this.state.copiedData.trim().length>0){
      this.setState({loading:true})
    var json = JSON.stringify({
      "UserID": this.state.getuserid, "PageID": this.state.page_id, "Type": "page", "LineData": this.state.copiedData, "Linenumber": "0", "SelectedText": "0"
    });
    console.log('json to add bookmarks', json)
    fetch("http://162.250.120.20:444/Login/BookmarkAdd",
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
        this.setState({ loading: false, bookmarkPopup: true, copiedData: "" });
        this.showModal('bookmarkPopup');

      })
      .catch((error) => {
        console.warn(error);
      });
    }
  }
  setEmptyClipboard = async () => {
    //To copy the text to clipboard
    await Clipboard.setString("");
  };
  likeAdd(userid, pageid) {
    this.setState({ loading: true })
    var json = JSON.stringify({ "UserID": userid, "PageID": pageid });
    fetch("http://162.250.120.20:444/Login/LikesAdd",
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
        this.setState({ loading: false, like:true });
        console.warn(responseJson);
        console.log('like service called');
        // { this.exploredata() }
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  handleMore = () => {
    this.pagecounting += 1;
    console.log('pagecount handle more ',this.pagecounting)
    if (this.pagecounting <= this.state.getpagecount) {
      { this.exploredata(this.state.getpostid, this.state.gettypeid); }
    }
    // }
  }
  handleLess = () => {
    this.pagecounting -= 1;
    if (this.pagecounting <= this.state.getpagecount) {
      { this.exploredata(this.state.getpostid, this.state.gettypeid); }
    }
  }
  fb = () => {
    console.log('readingbook share id ', this.state.getpostid)
    this.setState({ shareModal: false, });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.getpostid,
      social: Share.Social.FACEBOOK,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  insta = () => {
    this.setState({ shareModal: false, });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.getpostid,
      social: Share.Social.INSTAGRAM,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  pinterest = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.getpostid,
      social: Share.Social.PINTEREST,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  twitter = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.getpostid,
      social: Share.Social.TWITTER,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  tumblr = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/https://arinos.co.uk/sample-page/' + this.state.getpostid,
      social: Share.Social.TUMBLR,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  backpress = () => {
    //    console.log('before set',this.props.nav)
    if (this.state.contentVisible) {
      this.setState({ contentVisible: false })
    } else {
      // this.props.changeNavRec();
      // this.props.navigation.navigate('MainpageTabs')
      this.props.navigation.goBack();
    }

    //    console.log('after set',this.props.nav);
  }

  UpdateProgressBar = (progress) => {
    this.setState({ progress_count: Math.abs(progress.nativeEvent.contentOffset.y / (this.scrollViewContent_height - this.scrollView_height)),scrollTop:false,});
  }
  changemode = () => {
    theme.apply();
    this.setState({ boolean: true })
  }
  htmlSelect = () => {
    var index = event.nativeEvent.target.selectedIndex;
    event.nativeEvent.target[index].text
    console.log('index is ', index)
  }
  showModal = (popup) => {
    if (popup == 'pinspopup' && this.state.pinspopup) {
      setTimeout(() => {
        // this.props.changeRemove()
        this.setState({
          pinspopup: false,
          copiedData: ""
        })
      // SnackBar.show({
      //   title: "Selected ",
      //   duration:SnackBar.LENGTH_LONG,
      //   backgroundColor: '#27A291',
      //   action: {
      //     title: 'Undo',
      //   //   onPress: () => SnackBar.show({ title: 'Thank you!' }),
      //     color: '#fff',
      //   },
      // })
      }, 3000);
    } else if (popup == 'bookmarkPopup' && this.state.bookmarkPopup) {
      setTimeout(() => {
        // this.props.changeRemove()
        this.setState({
          bookmarkPopup: false,
          copiedData: ""
        })
      }, 3000);
    }
    //   console.log('modal state is ', this.state.popupModal)
  }
  notifyAdd = (n_userid,username,id,title) =>{
    var json2 = 
    // JSON.stringify(
      {
      
        "id":id,
        "title":title,
        "user_name":username,
        "type":"like",
        "bookimg":null,
        "user_id":this.state.getuserid,
        "comment":"",
        "actionURL":"http:\/\/pagevio.com\/notification-read\/like",
        "icon":"fa fa-thumbs-up",
        "heading":"Likes your"
    }
    // )
    let n_type=`App\\Notifications\\NotificationFeeds`;
    let ntype2=`App\\User`;
    var json = JSON.stringify({
      "Type":n_type,
      "Notifiable_Type":ntype2,
      "Notifiable_ID":n_userid,
      "Datas":JSON.stringify(json2)});
    console.log(json,"notiffy data")
    fetch("http://162.250.120.20:444/Login/NotificationAdd",
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
        console.log('responsejson notify ',responseJson)
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  getCopiedData = async () => {
    //To get the text from clipboard
    const clipboardContent = await Clipboard.getString();
    this.setState({ copiedData: clipboardContent });
    console.log('getcopied data called')
  };
  contentClick() {
    this.setState({ contentVisible: true,scrollTop:false })
    { this.contentsData(this.state.gettypeid, this.state.getpostid) }
  }
  gotoRead(page_order) {
    this.setState({ contentVisible: false })
    console.log('page order ',page_order)
    // {this.exploredata(pageid,this.state.gettypeid);}
    this.pagecounting=page_order;
    { this.exploredata(this.state.postid,this.state.gettypeid); }
  }
  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'img') {
      const a = node.attribs;
      return (<Image style={{ width: width / 1.5, height: 100 }} resizeMode="cover" source={{ uri: a.src }} />);
    }
  }
  commentClick(){
    console.log('page id , postid ',this.state.getpostid,this.state.page_id);
    if(this.state.gettypeid==4){
      AsyncStorage.setItem('postid',this.state.page_id )
    }else{
      AsyncStorage.setItem('postid',this.state.getpostid )
    }
    AsyncStorage.setItem('typeid',this.state.gettypeid)
    console.log('comments typeid & postid ',this.state.gettypeid,this.state.getpostid)

            this.props.navigation.navigate('comments')
  }
  likeClick(id) {
    // alert(id)
    // let selected;
   
        this.setState({ loading: true })
        var json = JSON.stringify({ "UserID": this.state.getuserid, "Post_Page_ID": id,"TypeID":this.state.gettypeid });
       console.log('like data ',json)
        fetch("http://162.250.120.20:444/Login/LikesAdd",
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
            this.setState({ loading: false,});
            console.warn(responseJson);
            this.setState({ like:responseJson[0].Message=='Unlike'?false:true })
            {responseJson[0].Message == 'Like'? this.notifyAdd(this.state.profile_userid,this.state.author,this.state.getpostid,this.state.page_url):null}

            // console.log('like service called');
            { this.exploredata(this.state.getpostid,this.state.gettypeid) }
          })
          .catch((error) => {
            console.warn(error);
          });     
    
  }
  gotoCollSec(){
    AsyncStorage.setItem('coll_name',this.state.popup_title);
    if(this.state.getsecColName=="Collection"){
      // alert('collection popup')
      this.props.navigation.navigate('collectionDetail',{'collId':this.state.getColId})
      console.log('col id ',this.state.getColId)
    }else{
      AsyncStorage.setItem('sectionId',JSON.stringify(Number(this.state.getSecId)));
      AsyncStorage.setItem('newColl_Id',JSON.stringify(Number(this.state.getColId)));
      this.props.navigation.navigate('sectionDetail');
      // , {
      //   'collId': this.state.getColId,
      //   'secId':this.state.getSecId
    // });        
    console.log('col id ',this.state.getColId)
    console.log('sec id ',this.state.getSecId)
  }
  }
  contentsData(typeid, postid) {
    // {"TypeID":"1","Post_PageID":"3"}
    console.log('tye id & page id ', typeid, postid)
    var json = JSON.stringify({
      'TypeID': typeid,
      'Post_PageID': postid,
      "SortBy": "Asc"
    });
    console.log('content json', json)
    fetch("http://162.250.120.20:444/Login/HelpPublicationContents",
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

        // alert(responseJson);
        //  this.setState({ bookdetail: responseJson,apicallBoolean:true })
        this.setState({ contents: responseJson, loading: false })
        console.log('contents   zxdfksdfakl ', this.state.contents)

        console.warn(responseJson)
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  goToAuthorProfile() {
    AsyncStorage.setItem('profile_userid', JSON.stringify(this.state.profile_userid));
    // console.log('this.state. userid in readbook',this.state.pagefeed_userid)
    this.props.navigation.navigate('profileAbout')

  }
  // readlaterClick(){
  //   let list=[this.state.currentItem];
  //   for(let item of list){
  //    AsyncStorage.setItem('typeid', item.TypeID);
  //    AsyncStorage.setItem('postid', item.Post_Page_Id);
  //    this.readlaterAdd(this.state.getuserid,item.Post_Page_Id,item.TypeID)
  //   }
  // }
  _renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'img') {
              const data = node.attribs;
      return (
                  <Image
                        key={index}
                        source={{uri: data.src}}
                        resizeMode="contain"
                        style={{ height: 500, width: 500}}
                      />
                  );
  
      }
      }
  render() {
    // AsyncStorage.getItem('3dots1').then((newval) => this.setState({ popup_val1: newval })).done();
    // if (this.state.popup_val1 == 1) {
    // AsyncStorage.getItem('popup_name1').then((newval1) => this.setState({ popup_title1: newval1 })).done();

    //     // console.log('value is ', this.state.popup_val,this.state.popup_title);

    // }
    // setTimeout(() => {
    //   {this.state.scrollTop?this.scroll.scrollTo({x: 0,animated: true}):null}
    //  }, 1);
    return (
      // <View >
      <SafeAreaView style={[styles.container, theme[this.state.modeState].container]}>
      <StatusBar barStyle='dark-content' backgroundColor="#fff" hidden={false} />
      {/* <StatusBar barStyle={this.state.modeState == 'light' ? 'light-content' : 'dark-content'} /> */}
      {this.state.copiedData == "" ?
        <View style={styles.ProgressBar_HolderView}>
          {
            (Platform.OS === 'android')
              ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={this.state.progress_count}
                  color='#24D4BC'
                  indeterminate={false}
                  style={{ width: '100%', transform: [{ scaleX: 1.0 }, { scaleY: 1.5 }], }}
                />
              ) : (
                <ProgressViewIOS
                  progressTintColor="#24D4BC"
                  style={styles.iosProgressbar}
                  progress={this.state.progress_count}
                />
              )
          }
          {/* <Text style = { styles.Percentage }> { Math.round( this.state.progress_count * 100 ) }% </Text> */}
        </View> : null}
      {/* {this.state.copiedData == "" ?  */}
      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>

      <View style={styles.headerRow}>
        <TouchableOpacity 
        // onPress={() =>{this.state.explore_page=='0'? this.goToAuthorProfile():this.alertPopup()}}
        >
          <Image style={{ width: 43, height: 43,}} source={{ uri: this.state.postImg != "" ? this.state.postImg : null }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{this.state.explore_page=='0'? this.contentClick():this.alertPopup()}}>
          <Text numberOfLines={2} style={styles.pageTitle}>{this.state.page_url}</Text>
        </TouchableOpacity>
       {this.state.gettypeid=='4'?null: <TouchableOpacity onPress={() =>{this.state.explore_page=='0'? this.contentClick():this.alertPopup()}}>
          <Image style={{ width:35,height:35 }} source={require('../assets/img/contents-rest.png')} />
        </TouchableOpacity>}
        {/* <TouchableOpacity
           onPress={this.changemode.bind(this)}
           >
              <Image source={require('../assets/img/user.png')}/>
              </TouchableOpacity> */}
        {/* <TouchableOpacity style={{margin:2}} onPress={()=>this.state.modeState=='light'?this.setState({modeState:'dark'}):this.setState({modeState:'light'})}>
     <Image source={ this.state.modeState=='light'? require('../assets/img/darkmode.png'):require('../assets/img/darkmode.png')}/>
   </TouchableOpacity>  */}
        <TouchableOpacity onPress={() => this.backpress()}>
        <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />
        </TouchableOpacity>
      </View> 
      </View>
      {/* :
        <View style={styles.hiddenContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 40 }}>

            <TouchableOpacity
            >
              <Image style={styles.hiddenImgs} source={require('../assets/img/quote.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>{this.state.explore_page=='0'? this.addBookmark():this.alertPopup()}}
            >
              <Image style={{ marginLeft: 5, marginRight: 5 }} source={require('../assets/img/bookmark1.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>{this.state.explore_page=='0'? this.addPins():this.alertPopup()}}
            >
              <Image  style={styles.hiddenImgs} source={require('../assets/img/pins.png')} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{this.state.explore_page=='0'?this.fb():this.alertPopup()}}
            >
              <Image style={styles.hiddenImgs1} source={require('../assets/img/fbz.png')} />
            </TouchableOpacity>
            <TouchableOpacity
            >
              <Image style={styles.hiddenImgs1} source={require('../assets/img/twit.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.setState({ copiedData: "" })}>
            <Image style={styles.closeBtn} source={require('../assets/img/close.png')} />

          </TouchableOpacity>

        </View>
      } */}
     
      {/* <View 
      style={{marginRight:10}}
      // style={{position:'absolute',right:10,
      //   top:70,padding:'2%',
      // }}
      > */}
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:width,}}>
      <Text style={{fontFamily:'AzoSans-Regular',fontSize:12,color:'#707070',marginLeft:5}}>{this.state.created_at}</Text>
          <View style={{ flexDirection: 'row',width:width/1.3,alignItems:'center',justifyContent:'flex-end'  }}>
<TouchableOpacity
// onPress={this.changemode.bind(this)}
>
  <Image style={styles.hiddenImgs} source={require('../assets/img/quote_icon.png')} />
</TouchableOpacity>
<TouchableOpacity
  onPress={() =>{this.state.explore_page=='0'? this.addBookmark():this.alertPopup()}}
>
  <Image  style={styles.hiddenImgs} source={require('../assets/img/bookmark-icon.png')} />
</TouchableOpacity>
<TouchableOpacity
  onPress={() =>{this.state.explore_page=='0'? this.addPins():this.alertPopup()}}
>
  <Image  style={styles.hiddenImgs} source={require('../assets/img/pin-icon.png')} />
</TouchableOpacity>

<TouchableOpacity
onPress={()=>{this.state.explore_page=='0'?this.fb():this.alertPopup()}}
>
  <Image style={styles.hiddenImgs1} source={require('../assets/img/fb2.png')} />
</TouchableOpacity>
<TouchableOpacity
// onPress={this.changemode.bind(this)}
>
  <Image style={styles.hiddenImgs1} source={require('../assets/img/twitter.png')} />
</TouchableOpacity>
</View>
</View>

{/* <TouchableOpacity 
        style={styles.staticPin}

          onPress={()=>{this.state.explore_page=='0'?this.getCopiedData():this.alertPopup()}}>
          <Image style={{ width: 20, height: 20,}} source={require('../assets/img/pins.png')} />
          </TouchableOpacity>  */}
        {/* {this.state.bookmarkPopup ? <View>
            <Image style={{ top: '15%', right: 0, position: 'absolute' }} source={require('../assets/img/bigbookmark.png')} />
          </View>
            : null} */}
{/* </View> */}
       
      {/* </View> */}
      {!this.state.contentVisible?
      
      <View style={{flex:1}}>
         {this.state.bookmarkPopup ? <View style={{flex:0.8}}>
            <Image style={{ top: '25%', right: 0, position: 'absolute' }} source={require('../assets/img/bigbookmark.png')} />
          </View>
            : null}
      <WebView
        // source={{html:`<p contenteditable="true" placeholder="Title...">New sample page for event</p><div contenteditable="false" id="Event_1" class="QuickEvent page_padding" style="position: relative;"><img src="../../images/cancel.png" onclick="clearevepromo(1)" id="cancel_1" style="left: 95%; top: 20px;" class="fr-draggable"><section id="eventtoolbar_1" contenteditable="false" class="eventToolbar1" style="display: block;"><i onclick="ToolbarSty('B',currentevenprom)" class="fa fa-bold" aria-hidden="true"></i><i onclick="ToolbarSty('I',currentevenprom)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-align-left" onclick="ToolbarSty('left',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="ToolbarSty('center',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="ToolbarSty('right',currentevenprom)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><input type="text" id="titl_1" placeholder="Title" class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" onkeydown="Edit2BackspaceInp(this,event)" onclick="showtool(1)" value="New Event"><br><div class="upload-btn-wrapper"><i class="fa fa-image round_media_btn" aria-hidden="true"></i><input type="file" name="myfile" onchange="getImage(this)" value=""></div><div style="position: relative;"><section id="desctoolbar_1" contenteditable="false" class="eventToolbar2" style="display: block;"><i onclick="DescbarSty('B',currentdescid)" class="fa fa-bold" aria-hidden="true"></i><i onclick="DescbarSty('I',currentdescid)" class="fa fa-italic" aria-hidden="true"></i><i onclick="DescbarSty('U',currentdescid)" class="fa fa-underline" aria-hidden="true"></i><i onclick="DescbarSty('S',currentdescid)" class="fa fa-strikethrough" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="DescbarSty('left',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="DescbarSty('center',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="DescbarSty('right',currentdescid)" aria-hidden="true"></i><i onclick="DescbarSty('IN',currentdescid)" class="fa fa-indent" aria-hidden="true"></i><i onclick="DescbarSty('OU',currentdescid)" class="fa fa-outdent" aria-hidden="true"></i><i onclick="DescbarSty('CO',currentdescid)" class="fa fa-columns" aria-hidden="true"></i><i onclick="DescbarSty('OL',currentdescid)" class="fa fa-list-ol" aria-hidden="true"></i><i onclick="DescbarSty('UL',currentdescid)" class="fa fa-list-ul" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-list" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><textarea id="desc_1" placeholder="Description" style="resize:none;" class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" onclick="Desctool(1)" value="Testing for event">Testing for event</textarea></div><span id="add-date"><span class="event_label" style="margin-right: 70px;">Date:</span><input class="event_form" type="date" style="width:140px;" value="2020-01-15">&nbsp;&nbsp;&nbsp;<input class="event_form" type="type" value="11:30am" onkeydown="Edit2BackspaceInp(this,event)" style="width:85px;"></span><div style="position: relative;"><section id="maptoolbar_1" contenteditable="false" class="eventToolbar3" style="display: block;"><i onclick="MapbarSty('B',this)" class="fa fa-bold" aria-hidden="true"></i><i onclick="MapbarSty('I',this)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-map" onclick="MapbarSty('map',this)" aria-hidden="true"></i><span style="display:none"><label>Enter Location</label> <input onkeydown="Edit2BackspaceInp(this,event)" id="Event_location_1" type="text" class="map_input pac-target-input" placeholder="Enter a location" autocomplete="off" value=""></span></section><span class="event_label" style="margin-right: 45px;">Location:</span><input class="event_form" type="text" id="locate_1" placeholder="Location Name" onkeydown="Edit2BackspaceInp(this,event)" onclick="Maptool(1)" style="width:78%;" value=""></div><input class="btn save_event" id="EventBtn_1" onclick="evet()" type="button" value="Save The Date"><br><br><br></div><p>Reminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotion<br></p>`}}
      //  source={{html:this.state.description
      //   // this.state.description
      // }}
      source={{html:this.state.description}}
      style={{
        // flex:0.5,
        flex:2,
        // height:height/2,
        marginTop:-120,
        marginBottom:-150
        }}
        // style={{flex:1 }}
        // startInLoadingState
        // domStorageEnabled
        // geolocationEnabled
        // allowUniversalAccessFromFileURLs
        // injectedJavaScript={INJECTEDJAVASCRIPT}
        // allowFileAccess
      />
      {this.state.gettypeid=='4'?null:
       <View style={styles.nextPreviousView}>
            {this.state.previousPage!="" ?
              <TouchableOpacity onPress={() => this.handleLess()}>
                <View >
                  <Text style={styles.previousBtn}>Previous</Text>
                  <Text numberOfLines={2} style={styles.previousTitle}>{this.state.previousPage}</Text>
                </View>
              </TouchableOpacity> : <Text></Text>}
            {this.state.nextPage!=""?
              <TouchableOpacity onPress={() => this.handleMore()}>
                <View >
                  <Text style={styles.nextBtn}>Next</Text>
                  <Text numberOfLines={2} style={styles.nextTitle}>{this.state.nextPage}</Text>
                </View>
              </TouchableOpacity> : <Text></Text>}
          </View>
        }
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity
                onPress={() =>{this.state.explore_page=='0'?this.goToAuthorProfile():this.alertPopup()}}
              >
                <Image style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: '5%' }}
                  source={{ uri: this.state.avatar != "" ? this.state.avatar : null }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>{this.state.explore_page=='0'? this.goToAuthorProfile():this.alertPopup()}}
              >
                <Text style={[this.state.modeState == 'light' ? styles.title : theme[this.state.modeState].title]}>
                  {this.state.author} {/* {item.Username} */}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:0.2}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', 
            justifyContent:'space-between',margin:5
            // margin: 5            // marginBottom: 80
             }}>

              <View 
              style={{ flexDirection: 'row',}}
              // flex:1, 
              // // height: 40, width: width / 2 ,
              //  justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}
               >
                <Text style={[this.state.modeState == 'light' ? styles.dateText : theme[this.state.modeState].dateText]}>
                  Published:</Text>
                <Text
                  numberOfLines={2} style={[this.state.modeState == 'light' ? styles.dateText1 : theme[this.state.modeState].dateText1]}>

                  {this.state.created_at} {/* {item.Username} */}
                </Text>
              </View>
          
              <View 
                              style={{ flexDirection: 'row',}}
              // style={{ flexDirection: 'row', width: width / 2 - 10, marginLeft: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}
              >
                  <Text style={[this.state.modeState == 'light' ? styles.dateText : theme[this.state.modeState].dateText]}>
                  Released Date:</Text>
                <Text
                  numberOfLines={2}
                  style={[this.state.modeState == 'light' ? styles.dateText1 : theme[this.state.modeState].dateText1]}>

                  {this.state.created_at} {/* {item.Username} */}
                </Text>
              </View>
            </View> 
            </View>
            </View>        
:
<ScrollView style={{marginBottom:'10%'}}>
<FlatList
  data={this.state.contents}
  // style={{marginBottom:'15%'}}
  renderItem={({ item,index}) =>
    <TouchableOpacity onPress={() => this.gotoRead(item.page_order)}>
      <View style={{ justifyContent: 'center', alignContent: 'center',width:width-40,height:height/12}} key={item.Content} >
        <Text style={{ color: 'black', textAlign: 'left', fontSize: 16, marginTop: '2%', marginBottom: '2%' }}>{item.page_title}</Text>
        <Divider style={{ color: '#707070', width: width - 50, }} />
      </View>
      </TouchableOpacity>
  }
  contentContainerStyle={{ alignItems: 'center',}}
  keyExtractor={(item, index) => index} />
          </ScrollView>
}
      {/* </Modal> */}
      {/* <Text style={[styles.text, theme[this.state.modeState].text]}>Some text</Text>
   <TouchableOpacity onPress={()=>this.state.modeState=='light'?this.setState({modeState:'dark'}):this.setState({modeState:'light'})}>
     <Image source={this.state.modeState=='light'?require('../assets/img/worldwide.png'):require('../assets/img/darkmode.png')}/>
   </TouchableOpacity> */}
     {this.state.contentVisible ? <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.bottomBtn}>
            <Text style={styles.bottomText}> {this.state.contents.length} Sections</Text>
          </TouchableOpacity>
        </View>
        : 
        
        <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: '3%', paddingLeft:'4%',paddingRight:'4%',shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 10,borderTopColor:'#707070',  position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: this.state.modeState == 'light' ? '#fff' : '#000' }}>
        <TouchableOpacity
          // onPress={()=>this.onPressHandler(item.Post_page_id)}
          onPress={() =>{this.state.explore_page=='0'?this.likeClick(this.state.getpostid):this.alertPopup()}}>

          {/* {this.renderImage} */}
<Icons name={this.state.likeStatus ? 'like1' : 'like2'}
                size={20}
                style={{ alignSelf: 'center' }}
                color={this.state.likeStatus ? '#27A291' : '#707070'}
              />     
                   {/* <Image
            source={imgSource}
          /> */}

        </TouchableOpacity>
        {/* <Image
          onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
         source={imgSource}/> */}
        <TouchableOpacity
          onPress={() =>{this.state.explore_page=='0'?
            this.commentClick():this.alertPopup()}}
        >
         <MaterialIcon name={'comment-text-outline'}
                size={20}
                style={{ alignSelf: 'center' }}
                //  style={{marginLeft:15,marginBottom:3}}
                color={
                  //  item.Likestatus=='Y'?'#27A291':
                  '#707070'}
              />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => this.refs.modal4.open()} 
          onPress={() =>{this.state.explore_page=='0'?
            this.setState({ collectionModal: !this.state.collectionModal }):this.alertPopup()
          }}
        // onPress={() =>this.props.navigation.navigate('createCollection')} 
        >
       <Icons name={'plus'}
  size={20}
  style={{alignSelf:'center'}}
  color={'#707070'}
  />    
      </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>{this.state.explore_page=='0'?
            this.setState({ shareModal: !this.state.shareModal }):this.alertPopup()}
            // this.refs.modal6.open()
          }>
<ShareIcon name={'share-google'}
  size={25}
  style={{alignSelf:'center'}}
  color={'#707070'}
  />   
       </TouchableOpacity>
      </View> 
        }
      <Modal1 isVisible={this.state.loading}

      // onBackdropPress={() => this.setState({ loading: true })}
      >
        <Image source={require('../assets/gif/logo.gif')} style={{
          alignSelf: 'center',
          width: 140,
          height: 140
        }} />
      </Modal1>
      <Modal1
                    // animationType={"slide"}
                    onBackdropPress={() => this.setState({ loginPopup: false})}
                    isVisible={this.state.loginPopup}>
                <LoginModal
                       navigation={this.props.navigation}
                       closeModal={()=>this.closeLoginPopup()}
                       close={()=>this.setState({loginPopup:false})}
                       />
                   
                    </Modal1>

      <Modal1 isVisible={this.state.shareModal}
        onBackdropPress={() => this.setState({ shareModal: false })}>
        <View style={{ flex: 0.5, backgroundColor: '#fff', borderRadius: 30, margin: '8%' }}>
          {/* <View> */}
          <Text style={{ fontWeight: 'bold', fontSize: 20, margin: '5%', textAlign: 'center' }}>Share Via</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', margin: '3%', alignItems: 'center' }}>

              <TouchableOpacity onPress={() => this.fb()}>
                <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image source={require('../assets/img/fb2.png')} />
                  <Text style={{ margin: '2%' }}>Facebook</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.twitter()
              }>
                <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image source={require('../assets/img/twitter.png')} />
                  <Text style={{ margin: '2%' }}>Twitter</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.insta()}>
                <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center', }}>
                  <Image source={require('../assets/img/insta.png')} />
                  <Text style={{ margin: '2%' }}>Instagram</Text>
                </View>

              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', margin: '3%', alignItems: 'center' }}>

              <TouchableOpacity onPress={() => this.pinterest()}>
                <View style={{ flexDirection: 'column', margin: '5%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image source={require('../assets/img/pinterest.png')} />
                  <Text style={{ margin: '2%' }}>Pinterest</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.tumblr()}>
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
      <Modal1 isVisible={this.state.collectionModal}
                    onBackdropPress={() => this.setState({ collectionModal: false, expanded: false, sectionExpand: false })}>
                    <View
                        style={{
                            backgroundColor: '#fff', alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: !this.state.expanded ? 0.3 : 0.4,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 5,
                            borderBottomEndRadius: 5,
                            width: 300,
                        }}
                    >
                        <TouchableOpacity
                            style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: 200, justifyContent: 'center' }}
                            onPress={() => {
                              AsyncStorage.setItem('postadd_postid',JSON.stringify(Number(this.state.getpostid)));
                              AsyncStorage.setItem('postadd_typeid',JSON.stringify(Number(this.state.gettypeid)));
                                this.props.navigation.navigate('createCollection')
                                this.setState({ collectionModal: false })
                            }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', width: 200,
                                justifyContent: 'center', alignSelf: 'center'
                            }}>
                                <Image style={{ alignSelf: 'center' }} source={require('../assets/img/createCol.png')} />
                                <Text style={{ fontSize: 16, fontFamily: 'AzoSans-Medium', color: '#27A291', marginTop: 5, width: width / 2.5, alignSelf: 'center', marginLeft: '2%' }}>Create Collection</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#707070', marginTop: '5%', borderWidth: 0.3, width: 300 }} />
                        {!this.state.expanded ? (
                            <TouchableOpacity
                                onPress={this.changeLayout}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '4%',
                                    width: 300,
                                    justifyContent: 'space-between',
                                }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                                        }}
                                    >
                                        <Image source={require('../assets/img/colliconnew1.png')} />
                                        <Text style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', marginLeft: '5%', width: width / 2.9 }}>Collections</Text>
                                    </View>

                                    <Image style={{ alignSelf: 'center', }} source={require('../assets/img/down_arrow.png')} />
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
                                            <Text style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#ffff', marginLeft: '5%', width: width / 2.9 }}>Collections</Text>
                                        </View>
                                        <TouchableOpacity
                                            // style={{ marginLeft: '-15%', }}
                                            onPress={this.changeLayout}>
                                            <Image style={{ alignSelf: 'center', }} source={require('../assets/img/up_arrow_white.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <ScrollView persistentScrollbar={this.state.collection.length > 2 ? true : false}>
                                        <FlatList
                                            data={this.state.collection}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <View>
                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#f0f0f0', }}
                                                        onPress={() => this.collectionBook(item.title, item.id)}>
                                                        <View style={{
                                                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                                        }}>
                                                            <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', textAlign: 'center', width: 180 }}>{item.title}</Text>
                                                            <Image style={{ alignSelf: 'center', marginLeft: '0%' }} source={item.privacy == 'Public' ? require('../assets/img/worldwide.png') : require('../assets/img/not.png')} />
                                                            <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => { item.SectionStatus == 1 ? this.sectionClick(item.id) : null }}>
                                                                <Image style={{ alignSelf: 'center', marginLeft: '2%', }} source={item.SectionStatus == 0 ? null : require('../assets/img/dropdown.png')} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                                                    {this.state.sectionExpand && item.id == this.state.secCollid
                                                        //  item.id==this.state.secCollid
                                                        //    item.SectionStatus==1
                                                        ?
                                                        <FlatList
                                                            data={this.state.section}
                                                            keyExtractor={(item, index) => index.toString()}
                                                            renderItem={({ item }) => (
                                                                <View>
                                                                    {item.SectionID != 0 ?
                                                                        <View>
                                                                            <TouchableOpacity
                                                                                style={{ backgroundColor: '#f0f0f0', width: 300, }}
                                                                                onPress={() => this.secBook(item.Title, item.CollectionsID, item.SectionID, item)}
                                                                            >
                                                                                <View style={{
                                                                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                                                                }}>
                                                                                    <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', textAlign: 'center', width: 230 }}>{item.Title}</Text>
                                                                                    {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                                                                                    {/* <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                             <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                     </TouchableOpacity>  */}
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                                                                        </View>
                                                                        : null}
                                                                </View>)} /> : null}

                                                    {/* <TouchableOpacity
                                 style={{backgroundColor:'#f0f0f0',width:300,}}
                                   onPress={() => this.collectionBook("Cats in the Wild")}>
                                   <View style={{
                                     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                   }}>
                                     <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 250 }}>Cats in the Wild</Text>
               
                                     <Image style={{ alignSelf: 'center', marginLeft: '-5%' }} source={require('../assets/img/not.png')} />
                                   </View>
                                 </TouchableOpacity>
               
                                 <Divider style={{ backgroundColor: '#707070',borderWidth:0.3 }} /> */}

                                                </View>
                                            )} />
                                    </ScrollView>
                                </View>
                            )}

                        <TouchableOpacity
                            onPress={() => this.readlater()}>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                                justifyContent: 'center', alignSelf: 'center'
                            }}>
                                <Image source={require('../assets/img/readlaternew1.png')} />
                                <Text style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', marginLeft: '5%', width: width / 2.6 }}>Read Later</Text>
                                <Divider style={{ backgroundColor: '#707070' }} />

                            </View>
                        </TouchableOpacity>

                    </View>
                </Modal1>
             
      {/* <Modal
        animationType="slide"
        transparent
        style={{ width: width, alignItems: 'center' }}
        visible={this.state.readlaterPopup}
        onRequestClose={() => {
          console.log('Modal has bee
          n closed.');
        }}> */}
        {this.state.readlaterPopup?
          <BlurModal visible={this.state.modalVisible}
          children={
        <View style={{
          width: width,
          left: 0, right: 0, bottom: 0, position: 'absolute',
          height: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#27A291',
        }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', width: width / 1.4 }}>{!this.state.exists ? "Added to ReadLater" : "Already Added in ReadLater"}</Text>
          <TouchableOpacity onPress={()=>this.setState({undo:true})}>
          <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
          </TouchableOpacity>
        </View>
          }/>
        :null}
      {/* </Modal> */}
      {/* <Modal
        animationType="slide"
        transparent
        visible={this.state.popupModal}
        onRequestClose={() => {
        }}> */}
        {this.state.popupModal?
          <BlurModal visible={this.state.modalVisible}
          children={ 
        <View style={{
          left: 0, right: 0, bottom: 0, position: 'absolute',
          height: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#27A291',
        }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Added to {this.state.getsecColName} -</Text>
        <TouchableOpacity onPress={()=>this.gotoCollSec()}>
          <Text style={{ fontSize: 16, color: '#fff',padding:'2%', textDecorationLine: 'underline' }}>{this.state.popup_title}</Text>

        </TouchableOpacity>
        </View>
          }/>
        :null}
      {/* </Modal> */}

      {/* <Modal
        animationType="slide"
        transparent
        visible={this.state.pinspopup}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}> */}
        {this.state.pinspopup?
        <BlurModal
        visible={this.state.pinspopup}
        children={
        <View style={{
          width: width,
          left: 0, right: 0, bottom: 0, position: 'absolute',
          height: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#27A291',
        }}>
          <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center', marginLeft: 5, }}>Saved to pins -</Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('pins')}>
          <Text numberOfLines={2} style={{ color: '#fff', fontSize: 16, textAlign: 'left', width: width / 1.7, }}>{this.state.copiedData}</Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: 'flex-end', fontSize: 16, color: '#fff', textDecorationLine: 'underline', marginRight: 5 }}>Undo</Text>
        </View>
        }/>
        :null}

    </SafeAreaView>
    // </View>
  )
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: '#fff',
},
headerRow:{
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-around',
  elevation: 3,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 3,
  borderBottomColor:'#707070'
},
pageTitle:{
  color: '#27A291', 
  fontSize: 12, 
  fontFamily:'Montserrat-Bold',
  width: width / 1.5,
  textAlign:'left',
  marginLeft:'2%'
},
hiddenImgs:{
  width: 30,
   height: 35,
},
hiddenImgs1:{
  width: 20,
   height: 20,
   margin:5
    // marginLeft: 3,
    //  marginRight: 3
},
group:{
  width:40,
  height:40
},
closeBtn:{
  margin: 14, 
  // marginRight: '2%', 
  alignSelf: 'flex-end'
},
hiddenContainer:{
  width: width, 
  height: height / 15, 
  flexDirection: 'row', 
  alignItems: 'center', 
  elevation: 1, 
  borderWidth: 0.2, 
  borderColor: '#CCCCCC'
},
iosProgressbar:{
  width: '100%',
   height: '100%',
   marginBottom: '5%'
},
nextBtn:{
  alignSelf: 'flex-end',
  width:width/2-10,
  textAlign:'right',
  textDecorationColor: '#27A291',
  textDecorationLine: 'underline',
  color: '#27A291',
},
previousBtn:{
  alignSelf: 'flex-start', 
  width:width/2-10,
  textDecorationColor: '#27A291',
   textDecorationLine: 'underline',
    color: '#27A291',
},
nextPreviousView:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  // alignItems: 'center',
  // marginRight: '5%', 
  // marginLeft: '5%', 
  // marginTop: '2%', 
  // marginBottom: '2%'
  margin:15
},
previousTitle:{
  alignSelf: 'flex-start',
   textDecorationColor: '#27A291',
    color: '#27A291',
    width:width/2-10,
},
title: {
  fontSize: 18,
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'left'
},
description: {
  fontSize: 16,
  color: '#000',
  textAlign: 'left'
},
dateText: {
  fontSize: 11,
  color: '#707070',
  textAlign: 'left'
},
dateText1: {
  fontSize: 11,
  color: '#707070',
  textAlign: 'left',
  fontWeight: 'bold'
},
instructions: {
  textAlign: 'center',
  color: '#000',
  marginBottom: 5,
  fontSize: 21,
  padding: 20,
  textAlign: 'left'
},
icon: {
  width: 60,
  height: 60,
},
All_Text:
{
  color: '#000',

  fontSize: 21,
  padding: 20,
  textAlign: 'left'
},
nextTitle:{
  width:width/2-10,
  alignSelf: 'flex-end',
  textAlign:'right',
   textDecorationColor: '#27A291',
   color: '#27A291',
},
// The generic button and button can be one, only separated
// here for testing purpose
genericButton: {
  flex: 1,

},

ProgressBar_HolderView:
{
  flexDirection: 'row',
},

Percentage:
{
  position: 'absolute',
  right: 6,
  fontWeight: 'bold',
  color: 'white'
},
bottomBar: {
  flexDirection: 'row',
  justifyContent: "center",
  height: '8%',
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  
},

bottomBtn: {
  width: width,
  alignItems: 'center',
  alignContent: 'center',
  backgroundColor: '#27A291',
  justifyContent: 'center',
  // padding:'1%'

},
bottomText: {
  color: '#ffff',
  fontSize: 18
},
staticPin:{
  borderRadius: 5, 
  height: 30, 
  padding:'2%',
  alignSelf: 'flex-end',
  borderColor: '#27A291',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center' 
},
scroll:{
  marginBottom:200,
   marginLeft: 10,
    marginRight: 10 
},
});
function mapStateToProps(state) {
  return {
    nav: state.apiReducer.nav,
    addCol: state.apiReducer.addCol,
    collSec: state.apiReducer.collSec

  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
    popupAddCol: () => dispatch({ type: 'ADD_COL' }),
    collSecPopup:() =>dispatch({type:'COLLSEC_POPUP'}),
    savelogin: ()=> dispatch({type:'CHECKLOGIN'}),
    savelogout: ()=> dispatch({type:'CHECKLOGOUT'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadingBook);