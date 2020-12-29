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
import HTMLView from 'react-native-render-html';
import HTMLView1 from 'react-native-htmlview';
import WebView from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
// import SelectableText from 'react-native-selectable-text';
import LinearGradient from 'react-native-linear-gradient';
import { SelectableText } from "@astrocoders/react-native-selectable-text";
import Share from 'react-native-share';
import SnackBar from 'react-native-snackbar';
import { color } from 'react-native-reanimated';

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
     

    }
    this.pagecounting = 1;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.onEndReachedCalledDuringMomentum=true;
  }
  async componentDidMount() {
    this.setEmptyClipboard();
    // AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid : value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    AsyncStorage.getItem('pagefeed_userid').then((value) => this.setState({ pagefeed_userid: value })).done();
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    AsyncStorage.getItem('profile_userid').then((value) => this.setState({ profile_userid: value })).done();
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('pageorder').then((value) => this.setState({ getcontentpageCount: value })).done();
    AsyncStorage.getItem('contentTopage').then((value) => this.setState({ contentToRead: value })).done();
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({interactionsComplete: true});
    // });
    // AsyncStorage.getItem('popup_name1').then((newval1) => this.setState({ popup_title1: newval1 })).done();
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      if(this.props.collSec==true){
        console.log('coll sec value in read page ',this.props.collSec)
          {this.getData2()}
  
       }
        this.CheckConnectivity();
      })
  
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
      // this.props.changeRemove()
      this.setState({
        readlaterPopup: false, exists: false
      });
      //   this.props.changeRemove();
    }, 5000);
    // this.props.navigation.navigate('readlater');
  }
  readlaterAdd(userid, pageid, typeid) {

    this.setState({ loading: true })
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
        if (responseJson[0].Message == "Already Exist") {
          this.setState({ exists: true })
        }
        this.setState({ loading: false, collectionModal:false,expanded:false,sectionExpand:false})
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
    this.focusListener.remove()

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
        'PostID': this.state.getpostid, 'SP_For': "Read", 'Type_ID': typeid, 'PagingCount': this.pagecounting
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
       
        this.setState({
          readingData: this.state.readingData.concat(responseJson),
          loading: false,
        })
        console.log('reading data length ', this.state.readingData.length)

        this.setState({
          scrollTop:true,
          description:responseJson[0].BackGround_Img+responseJson[0].page_description,
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
          page_id:responseJson[0].page_id

        })
        console.log('page des ',this.state.description)
        // let checkingpageVal = this.pagecounting + 1;
        // { checkingpageVal == this.state.getpagecount ? this.setState({ continueRead: true }) : this.setState({ continueRead: false }) }
        // { checkingpageVal == 1 ? this.setState({ previousRead: false }) : this.setState({ previousRead: true }) }
        // for (let i = 0; i < this.state.readingData.length; i++) {
        //  this.setState({
        //    description:this.state.readingData[i].page_description,
        //   avatar:this.state.readingData[i].avatar,
        //   created_at:this.state.readingData[i].created_at,
        //   page_url:this.state.readingData[i].page_url,
        //   DataCol:responseJson[i].Data,
        //   getpagecount:responseJson[i].Pagingcounts})
        // }
        console.log('this description data is ', this.state.avatar, this.state.page_url, this.state.created_at);

        // alert(this.state.description);
        // console.log('this description data is ',this.state.description);
        console.warn(responseJson)

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
            // value={`<h3>Yet even if we add neatherds, shepherds, and other herdsmen, in order that our husbandmen
            // may have oxen to plough with, and builders as well as husbandmen may have draught cattle, and curriers and weavers
            // fleeces and hides,—still our State will not be very large.That is true; yet neither will it be a very small State which
            // contains all these.Then, again, there is the situation of the city—to find a place where nothing need be imported is
            // wellnigh impossible.Impossible.Then there must be another class of citizens who will bring the required supply from
            // another city?There must.But if the trader goes empty-handed, having nothing which they require who would supply his
            // need, he will come back empty-handed.That is certain.And therefore what they produce at home must be not only enough for
            // themselves, but such both in quantity and quality as to accommodate those from whom their wants are supplied.Very
            // true.Then more husbandmen and more artisans will be required?They will.Not to mention the importers and exporters, who
            // are called merchants?Yes.Then we shall want merchants?We shall.And if merchandise is to be carried over the sea, skilful
            // sailors will also be needed, and in considerable numbers?Yes, in considerable numbers.Then, again, within the city, how
            // will they exchange their productions? To secure </h3>`}
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
  addPins() {
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
    }, 5000);
    // console.log('modal state is ', this.state.popupModal)
  }
  addBookmark(content) {
    this.setState({loading:true})
    this.getCopiedData();
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
      }, 5000);
    } else if (popup == 'bookmarkPopup' && this.state.bookmarkPopup) {
      setTimeout(() => {
        // this.props.changeRemove()
        this.setState({
          bookmarkPopup: false,
          copiedData: ""
        })

      }, 5000);
    }
    //   console.log('modal state is ', this.state.popupModal)
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
  gotoCollSec(){
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
      {this.state.copiedData == "" ? <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => this.goToAuthorProfile()}>
          <Image style={{ width: 80, height: 50 }} source={{ uri: this.state.avatar != "" ? this.state.avatar : null }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.contentClick()}>
          <Text numberOfLines={2} style={styles.pageTitle}>{this.state.page_url}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.contentClick()}>
          <Image style={{ margin: 2 }} source={require('../assets/img/readingmenu.png')} />
        </TouchableOpacity>
        {/* <TouchableOpacity
           onPress={this.changemode.bind(this)}
           >
              <Image source={require('../assets/img/user.png')}/>
              </TouchableOpacity> */}
        {/* <TouchableOpacity style={{margin:2}} onPress={()=>this.state.modeState=='light'?this.setState({modeState:'dark'}):this.setState({modeState:'light'})}>
     <Image source={ this.state.modeState=='light'? require('../assets/img/darkmode.png'):require('../assets/img/darkmode.png')}/>
   </TouchableOpacity>  */}
        <TouchableOpacity onPress={() => this.backpress()}>
          <Image style={{ margin: 2, marginRight: '2%', padding: '1%' }} source={require('../assets/img/close.png')} />
        </TouchableOpacity>

      </View> :
        <View style={styles.hiddenContainer}>
          {/* {this.getCopiedData()} */}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 40 }}>

            <TouchableOpacity
            // onPress={this.changemode.bind(this)}
            >
              <Image style={styles.hiddenImgs} source={require('../assets/img/quote.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.addBookmark()}
            >
              <Image style={{ marginLeft: 5, marginRight: 5 }} source={require('../assets/img/bookmark1.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.addPins()}
            >
              <Image  style={styles.hiddenImgs} source={require('../assets/img/pins.png')} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>this.fb()}
            >
              <Image style={styles.hiddenImgs1} source={require('../assets/img/fbz.png')} />
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={this.changemode.bind(this)}
            >
              <Image style={styles.hiddenImgs1} source={require('../assets/img/twit.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.setState({ copiedData: "" })}>
            <Image style={styles.closeBtn} source={require('../assets/img/close.png')} />

          </TouchableOpacity>

        </View>
      }
      <View 
      style={{marginRight:'5%'}}
      // style={{position:'absolute',right:10,
      //   top:70,padding:'2%',
      // }}
      >
 <TouchableOpacity 
        style={styles.staticPin}

        onPress={()=>this.getCopiedData()}>
          <Image style={{ width: 20, height: 20,}} source={require('../assets/img/pins.png')} />
          </TouchableOpacity>
          {this.state.bookmarkPopup ? <View>
            <Image style={{ top: '15%', right: 0, position: 'absolute' }} source={require('../assets/img/bigbookmark.png')} />
          </View>
            : null}
      </View>
       
      {!this.state.contentVisible ?
        <ScrollView
          contentContainerStyle={styles.scroll}
          ref={(c) => {this.scroll = c}}
          onContentSizeChange={(width, height) => { this.scrollViewContent_height = height }}
          onScroll={this.UpdateProgressBar}
          onLayout={(event) => this.scrollView_height = (event.nativeEvent.layout.height)}
          scrollEventThrottle={12} >

          {/* {this.state.bookmarkPopup ? <View>
            <Image style={{ top: '15%', right: 0, position: 'absolute' }} source={require('../assets/img/bigbookmark.png')} />
          </View>
            : null} */}
       
          <HTMLView
            html={this.state.description}
            textSelectable={true}
             />

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
          



          {/* {this.state.pagefeedData!="" || this.state.readingData!=""?
                    ( */}

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity
                onPress={() => this.goToAuthorProfile()}
              >
                <Image style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: '5%' }}
                  source={{ uri: this.state.avatar != "" ? this.state.avatar : null }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.goToAuthorProfile()}
              >
                <Text style={[this.state.modeState == 'light' ? styles.title : theme[this.state.modeState].title]}>
                  {this.state.author} {/* {item.Username} */}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', 
            flex:1, justifyContent:'space-between'
            // margin: 5
            , marginBottom: 80
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
        </ScrollView>
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
        {this.state.contentVisible ? <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.bottomBtn}>
            <Text style={styles.bottomText}> {this.state.contents.length} Sections</Text>
          </TouchableOpacity>
        </View>
        : <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: '3%', position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: this.state.modeState == 'light' ? '#fff' : '#000' }}>
        <TouchableOpacity
          style={{ padding: '3%' }}
          // onPress={()=>this.onPressHandler(item.Post_page_id)}
          onPress={() =>this.likeAdd(this.state.getuserid, this.state.getpostid)}>

          {/* {this.renderImage} */}
          {this.state.like == true ? <Image source={require('../assets/img/like.png')} /> : <Image source={require('../assets/img/unlike.png')} />}
          {/* <Image
            source={imgSource}
          /> */}

        </TouchableOpacity>
        {/* <Image
          onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
         source={imgSource}/> */}
        <TouchableOpacity
          style={{ padding: '3%' }}
          onPress={() =>{
            AsyncStorage.setItem('typeid',"4")
              AsyncStorage.setItem('postid',this.state.page_id )
            this.props.navigation.navigate('comments')}}
        >
          <Image

            source={require('../assets/img/comment1.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: '3%' }}
          // onPress={() => this.refs.modal4.open()} 
          onPress={() => {
            this.setState({ collectionModal: !this.state.collectionModal })
          }}
        // onPress={() =>this.props.navigation.navigate('createCollection')} 
        >
          <Image source={require('../assets/img/plus.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: '3%' }} onPress={() =>
            this.setState({ shareModal: !this.state.shareModal })
            // this.refs.modal6.open()
          }>
          <Image source={require('../assets/img/share.png')} />
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
  onBackdropPress={() => this.setState({ collectionModal: false,expanded:false,sectionExpand:false})}>
            <View 
            style={{backgroundColor:'#fff', alignItems: 'center',
            justifyContent:'center',
            alignSelf:'center',
            flex: !this.state.expanded ? 0.3 : 0.4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 5,
            borderBottomEndRadius: 5,
            width: 300,}}
            >
              <TouchableOpacity
                style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}
                onPress={() => {this.props.navigation.navigate('createCollection')
                this.setState({collectionModal:false})}}>
                <View style={{
                  flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                  justifyContent: 'center', alignSelf: 'center'
                }}>
                  <Image source={require('../assets/img/plus_green.png')} />
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
                      <Image source={require('../assets/img/collection.png')} />
                      <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 3 }}>Collections</Text>
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
                        <Image style={{ backgroundColor: '#fff' }} source={require('../assets/img/collection_green.png')} />
                        <Text style={{ fontSize: 17, color: '#ffff', marginLeft: '5%', width: width / 3 }}>Collections</Text>
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
                                     <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.title}</Text>
                                     <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} />
                         <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                                 <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                         </TouchableOpacity> 
                         </View>
                         </TouchableOpacity>
                                 <Divider style={{ backgroundColor: '#707070',borderWidth:0.2 }} />
                   {this.state.sectionExpand && item.id==this.state.secCollid
                        //  item.id==this.state.secCollid
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
                          )}/>
                 </ScrollView>
                  </View>
                )}
  
              <TouchableOpacity
                onPress={() => this.readlaterAdd(this.state.getuserid,this.state.page_id,"4")}>
  
                <View style={{
                  flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                  justifyContent: 'center', alignSelf: 'center'
                }}>
                  <Image source={require('../assets/img/readlater2.png')} />
                  <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 2.6 }}>Read Later</Text>
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
          console.log('Modal has been closed.');
        }}> */}
        {this.state.readlaterPopup?
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

          <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
        </View>
        :null}
      {/* </Modal> */}
      {/* <Modal
        animationType="slide"
        transparent
        visible={this.state.popupModal}
        onRequestClose={() => {
        }}> */}
        {this.state.popupModal?
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
        :null}
      {/* </Modal> */}
      {/* <Text style={[styles.text, theme[this.state.modeState].text]}>Some text</Text>
   <TouchableOpacity onPress={()=>this.state.modeState=='light'?this.setState({modeState:'dark'}):this.setState({modeState:'light'})}>
     <Image source={this.state.modeState=='light'?require('../assets/img/worldwide.png'):require('../assets/img/darkmode.png')}/>
   </TouchableOpacity> */}

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
  justifyContent: 'space-around' 
},
pageTitle:{
  color: '#27A291', 
  fontSize: 18, 
  width: width / 2
},
hiddenImgs:{
  width: 20,
   height: 20,
    marginLeft: 5,
     marginRight: 5
},
hiddenImgs1:{
  width: 30,
   height: 30,
    marginLeft: 3,
     marginRight: 3
},
closeBtn:{
  margin: 2, 
  marginRight: '2%', 
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
  marginTop: '2%', 
  marginBottom: '2%'
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
  bottom: 0
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
    collSecPopup:() =>dispatch({type:'COLLSEC_POPUP'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadingBook);