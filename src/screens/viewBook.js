import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  BackHandler,
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  LayoutAnimation,
  ImageBackground,
  StatusBar
} from 'react-native';
import Toast from 'react-native-easy-toast';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from './Readmore';
import ReadMore1 from 'react-native-read-more-text';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Tooltips from 'react-native-tooltips';
import Tooltip from 'react-native-walkthrough-tooltip'
import ModalBox from 'react-native-modalbox';
import Modal1 from "react-native-modal";
import { Avatar, Divider } from 'react-native-elements';
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';
import SnackBar from 'react-native-snackbar';
import LoginModal from '../components/loginModal';
import BlurModal from '../components/blurModal';
import Icons from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/EvilIcons'
console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// let value;


class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlikeImg: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      boolean: false,
      downloadState: false,
      gettypeid: '',
      gettypeid1: '',
      getpostid: '',
      bookdetail: [],
      img: '',
      title: '',
      content: '',
      updateddate: '',
      releasedate: '',
      totalviews: '',
      partcount: '',
      copyrights: '',
      partname: '',
      loading: true,
      publication_Imagepath: '',
      textShown: -1,
      apicallBoolean: false,
      followed: false,
      hidePic: false,
      collectionModal: false,
      previewPic: '',
      tooltip: false,
      popup_val: 0,
      popup_title: '',
      popupModal: false,
      expanded: false,
      collection: '',
      getuserid: '',
      readlaterPopup: false,
      exists: false,
      shareModal: false,
      getsecColName: '',
      sectionExpand: false,
      section: '',
      secCollid: '',
      readmore: false,
      author: '',
      user_img: '',
      user_id: '',
      getColId: '',
      getSecId: '',
      Is_Follow: '',
      visible: false,
      post_author: '',
      post_editor: '',
      post_illustrator: '',
      post_translator: '',
      isbn: '',
      explore_page: '0',
      loginPopup: false,
      undo: false,
      likeStatus: false,
      scrollend: false,
      likecount:''
      // Image: "https://arinos.co.uk/uploads/publication-cover/1581929254.jpg"
      // Title: "SNOW WHITE AND THE SEVEN DWARF"
      // Content: "Once upon a time . . . in a great castle, a Prince’s daughter grew up happy and contented, in spite of a jealous stepmother. She was very pretty, with blue eyes and long black hair. Her skin was delicate and fair, and so she was called Snow White. Everyone was quite sure she would become very beautiful. Though her stepmother was a wicked woman, she too was very beautiful, and the magic mirror told her this every day, whenever she asked it"
      // Updated_Date: "17 February 2020"
      // Release_Date: ""
      // Totalviews: 7
      // PartCount: 0
      // Copyrights: "All Rights Reserved"
      // partname: "Section"


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  showModal = () => {
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
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    { this.collData(this.state.getuserid) };

  }
  toggleNumberOfLines = index => {
    this.setState({
      textShown: this.state.textShown === index ? -1 : index,
    });
  }
  followService(userid, follower_id) {
    this.setState({ loading: true })
    var json = JSON.stringify({ "followingID": follower_id, "followerID": userid, "Action_For": "Add" }
    );
    console.log('follow data ', json)
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
        // this.setState({ loading: false });
        // if(responseJson.MSGS=="Added successfully"){
        //   setTimeout(() => {
        //     this.setState({ tooltip:true })
        //   }, 3000);
        // }else if(responseJson.MSGS=="Unfollowed successfully"){
        //   this.setState({tooltip:false})
        // }
        { this.exploredata(this.state.gettypeid, this.state.getpostid) }
        if (this.state.Is_Follow == "Follow") {

          this.setState({
            tooltip: !this.state.tooltip,
            scrollend: true

            // visible:true,

          });
          setTimeout(() => {
            this.setState({ tooltip: !this.state.tooltip, loading: false })
          }, 3000);

        }

        console.warn(responseJsson);
        // console.log('follow inert service called');
        // if(responseJson.MSGS == "Added successfully" || responseJson.MSGS == "Already Exist"){
        //   { this.profileService() }
        // }
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  async componentDidMount() {
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page: value })).done();
    AsyncStorage.setItem('contentFilter', "ASC");
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    // if(!value){
    // console.log('value in didmount passed data ',value);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    console.log('post id in viewbook page ', this.state.getpostid)

    // console.warn('data','FINDING')
    //  {this.getData()}
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true })
      AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
      AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();

      if (this.props.collSec == true) {
        { this.getData2() }

      }
      //  { this.exploredata(this.state.gettypeid, this.state.getpostid) }
      this.CheckConnectivity();
    })

  }
  getData2() {
    AsyncStorage.getItem('popup_name').then((newval1) => this.setState({ popup_title: newval1 })).done();
    AsyncStorage.getItem('colSec').then((value) => this.setState({ getsecColName: value })).done();
    AsyncStorage.getItem('colId').then((newval1) => this.setState({ getColId: newval1 })).done();
    AsyncStorage.getItem('SecId').then((newval1) => this.setState({ getSecId: newval1 })).done();
    if (this.props.collSec == true) {
      setTimeout(
        () =>
          this.showModal(),
        1000
      );
    }
  }
  CheckConnectivity() {
    NetInfo.fetch().then(state => {

      // console.log("Connection type cheking", state.type);
      // console.log("Is connected cheking?", state.isConnected);

      if (state.isConnected == true) {
        { this.getData(); }
      } else {
        alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
      }

    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener.remove()
  }
  handleBackButtonClick() {
    this.backpress();
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs');
    return true;
  }
  _onPress(parent, target) {
    this.setState({ visible: true, parent: parent, target: target, followed: true });
  }
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress}>View less</Text>
    )
  }
  hideImage = () => {
    this.setState({ hidePic: !this.state.hidePic });
    // console.log(' hide image state is ', this, state.hidePic)
  }
  _renderTruncatedFooter = (handlePress) => {
    return (
      <View
      // style={{ marginTop: '-5%' }}
      >
        <TouchableOpacity
        // onPress={() => !this.state.hidePic?this.setState({ hidePic: true}):this.setState({hidePic:false})}
        >
          <Text
            style={{
              color: '#27A291',
              alignSelf: "flex-end",
              textDecorationLine: 'underline',
            }}
            onPress={handlePress}>
            Read more
          </Text>
        </TouchableOpacity>
      </View>

    );
  }
  _toggleModal = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.refs.modal6.open()

  }
  getData() {
    setTimeout(() => {
      console.log('vire book typrif postid ', this.state.gettypeid, this.state.getpostid)
      { this.exploredata(this.state.gettypeid, this.state.getpostid) }
    }, 1000)
  }


  fb = () => {
    this.setState({ shareModal: false, });
    let shareOptions2 = {
      url: 'https://pagevio.com/publication-cover-description/' + this.state.getpostid,
      social: Share.Social.FACEBOOK,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.getpostid)
    Share.shareSingle(shareOptions2);
  }
  insta = () => {
    this.setState({ shareModal: false, });
    let shareOptions2 = {
      url: 'https://pagevio.com/publication-cover-description/' + this.state.getpostid,
      social: Share.Social.INSTAGRAM,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.getpostid)
    Share.shareSingle(shareOptions2);
  }
  pinterest = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/publication-cover-description/' + this.state.getpostid,
      social: Share.Social.PINTEREST,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.getpostid)
    Share.shareSingle(shareOptions2);
  }
  twitter = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/publication-cover-description' + this.state.getpostid,
      social: Share.Social.TWITTER,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  tumblr = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/publication-cover-description/' + this.state.getpostid,
      social: Share.Social.TUMBLR,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  exploredata(typeid, postid) {
    this.setState({ loading: true })
    // {"TypeID":"1","Post_PageID":"3"}
    console.log('dsflkajdkfksd ', typeid, postid)
    var json = JSON.stringify({
      'TypeID': typeid,
      'Post_PageID': postid,
      "user_id": this.state.getuserid
    });
    console.log('jsong ', json)
    fetch("http://162.250.120.20:444/Login/HelpPublicationDesc",
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
        this.setState({ bookdetail: responseJson, apicallBoolean: true, loading: false })
        console.warn(responseJson)
        // this.setState({ img: responseJson[0].Image })
        // for (let i = 0; i < this.state.bookdetail.length; i++) {
        // alert(this.state.bookdetail[0].Image)
        this.setState({
          img: responseJson[0].Image,
          title: responseJson[0].Title,
          content: responseJson[0].Content,
          updateddate: responseJson[0].Updated_Date,
          releasedate: responseJson[0].Release_Date,
          totalviews: responseJson[0].Totalviews,
          partcount: responseJson[0].PartCount,
          copyrights: responseJson[0].Copyrights,
          partname: responseJson[0].partname,
          publication_Imagepath: responseJson[0].Image,
          author: responseJson[0].username,
          user_img: responseJson[0].user_img,
          user_id: responseJson[0].user_id,
          Is_Follow: responseJson[0].Is_Follow,
          post_author: responseJson[0].post_author,
          post_editor: responseJson[0].post_editor,
          post_illustrator: responseJson[0].post_illustrator,
          post_translator: responseJson[0].post_translator,
          isbn: responseJson[0].post_isbn_years,
          exists: responseJson[0].Readstatus == 'N' ? false : true,
          likeStatus: responseJson[0].Likestatus == 'Y'?true:false,
          likecount:responseJson[0].likecount
        
          // visible:this.state.Is_Follow=="Follow"?false:true
        })
        AsyncStorage.setItem('likestatus',JSON.stringify(this.state.likeStatus))
        //  Title: "SNOW WHITE AND THE SEVEN DWARF"
        //  Content: "Once upon a time . . . in a great castle, a Prince’s daughter grew up happy and contented, in spite of a jealous stepmother. She was very pretty, with blue eyes and long black hair. Her skin was delicate and fair, and so she was called Snow White. Everyone was quite sure she would become very beautiful. Though her stepmother was a wicked woman, she too was very beautiful, and the magic mirror told her this every day, whenever she asked it"
        //  Updated_Date: "17 February 2020"
        //  Release_Date: ""
        //  Totalviews: 7
        //  PartCount: 0
        //  Copyrights: "All Rights Reserved"
        //  partname: "Section"
        // }
        //alert(this.state.bookdetail[0].Image)
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  _renderRevealedFooter = (handlePress) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '3%' }}>
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
          {/* <Text style={{ color: '#27A291',textDecorationLine:'underline', alignSelf: "flex-end", backgroundColor: '#fff', marginTop: -20, padding: '2%', }} onPress={handlePress}> */}

          <Text style={{ color: '#27A291', textDecorationLine: 'underline', alignSelf: "flex-end", backgroundColor: '#fff', }} onPress={handlePress}>
            See less
          </Text>
        </TouchableOpacity>
      </View>

    );
  }
  imgPress = () => {

    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.refs.modal6.close();
    this.refs.modal4.close();
    this.props.navigation.navigate('socialmedia')
    // Share.shareSingle(shareOptions);
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
    console.log('json post add ', json)
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
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  secData(userid, collid) {
    // this.setState({loading:true})
    var json = JSON.stringify({
      "CollectionID": collid,
      "User_ID": userid,
      "SortBy": "DESC"
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
        this.setState({ section: responseJson })
        const filteredList = this.state.section.filter((item) => item.SectionID !== 0);
        this.setState({ section: filteredList, secCollid: collid })

        console.warn(responseJson)
        console.warn("section")
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  collData(userid, colid, secid) {
    // this.setState({loading:true})
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
  collectionBook = (value, collid) => {
    this.setState({ collectionModal: false, expanded: false, sectionExpand: false });
    this.changeLayout();
    console.log('collection book value is ', value)
    { this.collectionAdd(collid, "", this.state.getpostid, "", this.state.getuserid, this.state.gettypeid, "") }
    // AsyncStorage.setItem('3dots', JSON.stringify(1));
    this.props.collSecPopup();
    this.setState({ popup_title: value, getsecColName: "Collection", getColId: collid })
    this.showModal();

  }
  sectionClick = (collid) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ sectionExpand: !this.state.sectionExpand, getColId: collid });
    this.secData(this.state.getuserid, collid)
    console.log('section data collection ', this.state.section);
  }
  secBook = (value, colid, secid, item) => {
    this.setState({ collectionModal: false, getColId: colid, expanded: false, sectionExpand: false });
    this.changeLayout();
    console.log('collection book value is ', value)
    { this.collectionAdd(colid, secid, this.state.getpostid, "", this.state.getuserid, this.state.gettypeid, "") }
    // AsyncStorage.setItem('3dots', JSON.stringify(1));
    this.props.collSecPopup();
    this.setState({ popup_title: value, getsecColName: "Section", getSecId: secid })
    this.showModal();

  }
  logoutpress = () => {
    AsyncStorage.setItem('userid', JSON.stringify(""));
    AsyncStorage.setItem('typeid', JSON.stringify(""));
    AsyncStorage.setItem('profile_img', JSON.stringify(""));
    AsyncStorage.setItem('user_name', JSON.stringify(""));
    AsyncStorage.setItem('postid', JSON.stringify(""));
    AsyncStorage.setItem('collectionId', JSON.stringify(""));
    AsyncStorage.setItem('sectionId', JSON.stringify(""));
    AsyncStorage.setItem('usertype', JSON.stringify(""));
    AsyncStorage.setItem('bookmarkUserid', JSON.stringify(""));
    AsyncStorage.setItem('loginData', JSON.stringify(false));
    this.props.savelogout();
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('loginSignup');
  }
  alertPopup() {
    // this.setState({ loginPopup: true })
    this.logoutpress();
  }
  closeLoginPopup() {
    this.setState({ loginPopup: false });
    this.props.savelogin();
    AsyncStorage.setItem('explore_page', JSON.stringify(0));
    // AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    // AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page: value })).done();
    AsyncStorage.setItem('contentFilter');
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    this.CheckConnectivity()
  }
  goToAuthorProfile() {
    AsyncStorage.setItem('profile_userid', JSON.stringify(this.state.user_id));
    this.props.navigation.navigate('profileAbout')
  }
  gotoCollSec() {
    AsyncStorage.setItem('coll_name', this.state.popup_title);

    if (this.state.getsecColName == "Collection") {
      // alert('collection popup')
      this.props.navigation.navigate('collectionDetail', { 'collId': this.state.getColId })
      console.log('col id ', this.state.getColId)
    } else {
      AsyncStorage.setItem('sectionId', JSON.stringify(Number(this.state.getSecId)));
      AsyncStorage.setItem('newColl_Id', JSON.stringify(Number(this.state.getColId)));
      this.props.navigation.navigate('sectionDetail');
      // , {
      //   'collId': this.state.getColId,
      //   'secId':this.state.getSecId
      // });        
      console.log('col id ', this.state.getColId)
      console.log('sec id ', this.state.getSecId)
    }
  }
  backpress = () => {
    //    console.log('before set',this.props.nav)
    this.props.changeNavRec();
    this.props.navigation.goBack();
    // this.props.navigation.dispatch('mainpage');
    // this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
  }
  gotoRead = () => {
    // AsyncStorage.setItem('typeid',JSON.stringify(this.state.gettypeid));
    // AsyncStorage.setItem('postid',JSON.stringify(this.state.getpostid));
    // AsyncStorage.setItem('pagefeed_userid',this.state.user_id);
    this.props.navigation.navigate('readingBook');
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
    { this.exploredata(this.state.gettypeid, this.state.getpostid) }

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
        // if (responseJson[0].Message == "Already Exist") {
        //   // this.setState({ exists: true })
        // }
        this.setState({ collectionModal: false, expanded: false, sectionExpand: false, loading: false });
        // this.readlater();
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
  commentClick() {
    AsyncStorage.setItem('typeid', JSON.stringify(Number(this.state.gettypeid)));
    AsyncStorage.setItem('postid', JSON.stringify(Number(this.state.getpostid)));
    console.log('this typeid postid ', this.state.gettypeid, this.state.getpostid)
    this.props.navigation.navigate('comments')
  }
  likeClick(id) {
    // let selected;

    this.setState({ loading: true })
    var json = JSON.stringify({ "UserID": this.state.getuserid, "Post_Page_ID": id, "TypeID": this.state.gettypeid });
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
        {responseJson[0].Message == 'Like'? this.notifyAdd(this.state.user_id,this.state.author,this.state.getpostid,this.state.title):null}
        this.setState({ loading: false, });
        console.warn(responseJson);
        // this.setState({ likeStatus:responseJson[0].Message=='Unlike'?false:true })
        // console.log('like service called');
        { this.exploredata(this.state.gettypeid, this.state.getpostid) }
      })
      .catch((error) => {
        console.warn(error);
      });

  }


  
  render() {
    // AsyncStorage.getItem('3dots').then((newval) => this.setState({ popup_val: newval })).done();
    // if (this.state.popup_val == 1) {
    //   AsyncStorage.getItem('popup_name').then((newval1) => this.setState({ popup_title: newval1 })).done();
    //   AsyncStorage.getItem('colSec').then((value) => this.setState({ getsecColName: value })).done();
    //   AsyncStorage.getItem('colId').then((newval1) => this.setState({ getColId: newval1 })).done();
    //   AsyncStorage.getItem('SecId').then((newval1) => this.setState({ getSecId: newval1 })).done();
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
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;
    !this.state.scrollend ? null : this.scroll.scrollTo({ y: height });
    //  value = this.props.navigation.state.params.pass_data
    //   ? this.props.navigation.state.params.pass_data
    //   : null;
    // console.log('value is ', value)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle='dark-content' backgroundColor="#fff" hidden={false} />
        {/* <View style={styles.staticheader}> */}
        {/* // <Text>{this.state.gettypeid}{this.state.getpostid}</Text> */}
        <View style={styles.staticheader}>
          {/* {this.state.explore_page=='0'? */}
          <TouchableOpacity
            onPress={() => { this.state.explore_page == '0' ? this.setState({ downloadState: true }) : this.alertPopup() }}
          // onPress={()=>this.props.navigation.navigate('newsfeed')}
          >
            <Image source={require('../assets/img/download.png')} />
          </TouchableOpacity>
          {/* :null} */}
          <View style={{
            flexDirection: 'row', width: width / 1.2, justifyContent: 'center', alignItems: 'center',



          }}>

            <TouchableOpacity
              style={{
                backgroundColor: '#27A291',
                borderRadius: 10,
              }}
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontFamily: 'AzoSans-Medium'
              }}
                onPress={() => this.props.navigation.navigate('viewBook')}
              >Description</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => { this.state.explore_page == '0' ? this.props.navigation.navigate('contents') : this.alertPopup() }}
            >
              <Text style={styles.headerText}

              >Contents</Text>
            </TouchableOpacity>
            {/* {this.state.explore_page=='0'? */}

            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => { this.state.explore_page == '0' ? this.props.navigation.navigate('books_pin') : this.alertPopup() }}
            >
              <Text style={styles.headerText}

              >Pins</Text>
            </TouchableOpacity>
            {/* :null} */}
            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity onPress={() => this.backpress()}>
            <Image style={{ width: 40, height: 50 }} source={require('../assets/img/close.png')} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.header}>
</View> */}
        <ScrollView style={{ marginBottom: '8%' }} ref={(node) => this.scroll = node} >
          <View style={styles.containerStyle} >
            <ImageBackground style={styles.sliderContainerStyle}
              source={{ uri: this.state.img == "" ? null : this.state.img }}
            // source={require('../assets/img/collectimg.png')}
            >
              {/* <Slider/> */}
            </ImageBackground>
          </View>

          {/* <TouchableOpacity
  onPress={() => this.props.navigation.navigate('imgPreview', {
    pass_data: `require('../assets/img/imgcover.png')`,
  })}>
</TouchableOpacity> */}
          {/* <Image style={styles.avatar} source={require('../assets/img/imgcover.png')} /> */}
          {!this.state.hidePic ?
            <TouchableOpacity style={styles.avatar} onPress={() => this.props.navigation.navigate('imgPreview', {
              name: this.state.img == "" ? null : this.state.img,
              title: this.state.title == '' ? null : this.state.title
            })}>
              <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                source={{ uri: this.state.img != "" ? this.state.img : null }}
                //source={require('../assets/img/imgcover2.png')} 
                style={styles.avatar}>
                <TouchableOpacity
                  onPress={() => this.state.explore_page == '0' ? this.refs.modal4.open() : this.alertPopup()}>
                  <Image style={{ alignSelf: 'flex-end', marginRight: '8%', marginTop: '8%', resizeMode: 'cover' }} source={require('../assets/img/3dots_white.png')} />
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity> : null}
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text numberOfLines={1} style={styles.name}>{this.state.title}</Text>
              {/* {
              this.state.content.length<100?
              (<ReadMore1
                numberOfLines={3}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}>
                <Text
                  numberOfLines={3}
                  style={styles.description}>
                  {this.state.content}
                </Text>
              </ReadMore1>):
              (<ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
              <Text
                numberOfLines={3}
                style={styles.description}>
                {this.state.content}
              </Text>
            </ReadMore>)
            } */}
              {this.state.content.length > 408 ? <ReadMore
                numberOfLines={5}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}>
                <Text
                  numberOfLines={5}
                  style={styles.description}>
                  {this.state.content}
                </Text>
              </ReadMore>
                :
                <View>
                  <Text
                    numberOfLines={5}
                    style={styles.description}>
                    {this.state.content}
                  </Text>
                  {this.state.content.length > 0 ?
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('report')}>
                      <View style={{
                        flexDirection: 'row', width: width - 40, margin: '3%', marginBottom: 0, marginTop: 14,
                        padding: '0.5%'
                      }}>
                        <Image style={{ marginRight: '2%', marginTop: '2%' }} source={require('../assets/img/flag.png')} />
                        <Text style={[styles.text1, { fontSize: 14 }]}>Report</Text>
                      </View>
                    </TouchableOpacity> : null}
                </View>
              }

              {/* <TouchableOpacity onPress={()=>console.log('get lenth ',this.state.content.length)}>
              <Text>get length</Text>
            </TouchableOpacity> */}

              {/* {this.state.content.length>100?
    <ReadMore

      numberOfLines={3}
      renderTruncatedFooter={this._renderTruncatedFooter}
      renderRevealedFooter={this._renderRevealedFooter}
      onReady={this._handleTextReady}>
      <Text style={styles.description}>
        {this.state.content}
      </Text>
    </ReadMore>:  <Text style={styles.description}>
        {this.state.content}
      </Text>} */}
              {/* {this.state.content.length>50?
      <ReadMore
              // key={0}
              contentContainerStyle={{backgroundColor:'#F9F9F9'}}
              numberOfLines={3}
              renderTruncatedFooter={(handlePress1,index)=>
                {
                this._renderTruncatedFooter(handlePress1)
              }}
              renderRevealedFooter={(handlePress1)=>this._renderRevealedFooter(handlePress1)}
              onReady={this._handleTextReady}>    
              <Text style={styles.description}>{this.state.content}</Text>     
      </ReadMore>:
                        <Text style={styles.description}>{this.state.content}</Text>     
     } */}
              {/* {this.state.readmore?
   ( <Text>{this.state.content}{"\n"}
   
    
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
<TouchableOpacity
onPress={() => this.props.navigation.navigate('report')}>
<View style={styles.info1}>
  <Image source={require('../assets/img/flag.png')} />
  <Text style={styles.text1}>Report</Text>
</View>
</TouchableOpacity>
<TouchableOpacity style={{width:width-80}}>
<Text style={{
         color: '#27A291',
         alignSelf: "flex-end", 
         textDecorationLine:'underline',
         backgroundColor: '#fff'
       }} 
       onPress={()=>this.setState({readmore:false})}
       >
          See Less
         </Text>
         </TouchableOpacity>
</View>

         </Text>
     )
    :(
      <Text 
      >
        {this.state.content.split('.')[0]+'.'}

   <Text style={{
         color: '#27A291',
         alignSelf: "flex-end", 
         textDecorationLine:'underline',
         backgroundColor: '#fff'
       }} 
       onPress={()=>this.setState({readmore:true})}
       >
          Read more
         </Text>
    </Text>
    )            
  } */}
              <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
                <TouchableOpacity
                  onPress={() => this.gotoRead()}>
                  <View style={styles.socialBarButton}>
                    <Image source={require('../assets/img/open-book.png')} />
                    <Text style={styles.btnText}>Read</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              {!this.state.downloadState ?
                (
                  <View
                  // style={{margin:'3%'}}
                  >
                    {/* <View style={{flexDirection:'column',backgroundColor:'pink'}}> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <View style={styles.info1}>
                        <Image style={{ marginTop: 3, marginLeft: 5 }} source={require('../assets/img/eye.png')} />
                        <Text style={styles.text1}> {this.state.totalviews}</Text>
                      </View>
                      <View style={styles.info2}>
                        <Image style={{ marginRight: '2%', }} source={require('../assets/img/section.png')} />
                        <Text style={styles.text1}>{this.state.partname}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <View style={styles.info1}>
                        <Text style={[styles.text1, { marginLeft: '3%' }]}>Published: {this.state.updateddate}</Text>
                      </View>
                      <View style={styles.info2}>
                        <Text style={[styles.text1]}>Release Date: {this.state.releasedate}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <View style={styles.info1}>
                        {/* <Text style={styles.text1}> </Text> */}
                        <Text numberOfLines={1} style={[styles.text1, { marginLeft: '3%' }]}>{this.state.copyrights}</Text>
                        {/* <Image source={require('../assets/img/open-book.png')} /> */}
                      </View>
                      <View style={styles.info2}>
                        <Text style={styles.text1}>ISBN : {this.state.isbn}</Text>
                      </View>
                      {/* </View> */}
                    </View>
                    {/* {!value ? null : (
          <View style={{marginLeft:'5%'}}>
            <View style={{ flexDirection: 'row', marginTop: '2%', marginBottom: '2%' }}>
              <Text style={{ fontSize: 15, textAlign: 'left', width: width / 5 }}>Author</Text>
              <Text style={{ fontSize: 15, textAlign: 'left', }}>Hyti Marina Wassel-Humanos</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '2%', marginBottom: '2%' }}>
              <Text style={{ fontSize: 15, textAlign: 'left', width: width / 5 }}>Editor</Text>
              <Text style={{ fontSize: 15, textAlign: 'left', }}>Umuga Ben-Eos</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '2%', marginBottom: '2%' }}>
              <Text style={{ fontSize: 15, textAlign: 'left', width: width / 5 }}>Illustrator</Text>
              <Text style={{ fontSize: 15, textAlign: 'left', }}>Yang Mi</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '2%', marginBottom: '2%' }}>
              <Text style={{ fontSize: 15, textAlign: 'left', width: width / 5 }}>Translator</Text>
              <Text style={{ fontSize: 15, textAlign: 'left', }}>Joe Wong</Text>
            </View>
          </View>)} */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}> */}

                    <View style={styles.logoContainer}>

                      <TouchableOpacity
                        onPress={() => { this.state.explore_page == '0' ? this.goToAuthorProfile() : this.alertPopup() }}>
                        <View style={{
                          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                          width: width / 2,
                        }}>
                          <Image style={{ width: 40, height: 40, borderRadius: 40 / 2 }} source={{ uri: this.state.user_img != "" ? this.state.user_img : null }} />
                          <Text style={[styles.text2, { width: width / 2.7, marginLeft: '2%', }]}>{this.state.author}</Text>
                        </View>

                      </TouchableOpacity>

                      <View>
                        {/* {this.state.explore_page=='0'? */}


                        {this.state.user_id == this.state.getuserid ? <View style={{ width: width / 2 - 40, }} /> :
                          <TouchableOpacity onPress={() => { this.state.explore_page == '0' ? this.followService(this.state.getuserid, this.state.user_id) : this.alertPopup() }} style={[this.state.Is_Follow == "Follow" ? styles.btnview : styles.activeBtnview]}>
                            <Text style={[this.state.Is_Follow == "Follow" ? styles.inactive : styles.active]}>{this.state.Is_Follow}</Text>
                          </TouchableOpacity>
                        }
                        {this.state.tooltip ? <View style={styles.talkBubble}>
                          <View style={styles.talkBubbleSquare}>
                            <Text style={styles.talkBubbleMessage}>Followed {this.state.author}</Text>
                          </View>
                          <View style={styles.talkBubbleTriangle} />
                        </View> : null}

                      </View>
                      {/* :null} */}
                    </View>


                    {/* </View> */}
                  </View>) : (
                  // <View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>


                    <View style={styles.logoContainer1}>

                      <TouchableOpacity
                        onPress={() => { this.state.explore_page == '0' ? this.goToAuthorProfile() : this.alertPopup() }}>
                        <View style={{
                          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                          width: width / 2
                        }}>
                          <Image style={{ width: 40, height: 40, borderRadius: 40 / 2 }} source={{ uri: this.state.user_img != "" ? this.state.user_img : null }} />
                          <Text style={[styles.text2, { width: width / 2 - 40, marginLeft: '1%' }]}>{this.state.author}</Text>
                        </View>

                      </TouchableOpacity>



                      {this.state.user_id == this.state.getuserid ? <View style={{ width: width / 2 - 40, }} /> :
                        <TouchableOpacity onPress={() => { this.state.explore_page == '0' ? this.followService(this.state.getuserid, this.state.user_id) : this.alertPopup() }} style={[this.state.Is_Follow == "Follow" ? styles.btnview : styles.activeBtnview]}>
                          <Text style={[this.state.Is_Follow == "Follow" ? styles.inactive : styles.active]}>{this.state.Is_Follow}</Text>
                        </TouchableOpacity>
                      }
                      {this.state.tooltip ? <View style={styles.talkBubble}>
                        <View style={styles.talkBubbleSquare}>
                          <Text style={styles.talkBubbleMessage}>Followed {this.state.author}</Text>
                        </View>
                        <View style={styles.talkBubbleTriangle} />
                      </View> : null}
                    </View>


                    <View style={{ margin: '4%', paddingLeft: '5%' }}>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.authText}>Author</Text>
                        <Text style={styles.authorResText}>{this.state.post_author}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.authText}>Editor</Text>
                        <Text style={styles.authorResText}>{this.state.post_editor}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.authText}>Illustrator</Text>
                        <Text style={styles.authorResText}>{this.state.post_illustrator}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.authText}>Translator</Text>
                        <Text style={styles.authorResText}>{this.state.post_translator}</Text>
                      </View>
                    </View>
                    <View style={{ marginBottom: '10%' }} >
                      {/* <View style={{flexDirection:'column',backgroundColor:'pink'}}> */}
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.info1}>
                          <Image style={{ marginLeft: 5, marginTop: 3 }} source={require('../assets/img/eye.png')} />
                          <Text style={styles.text1}> {this.state.totalviews}</Text>
                        </View>
                        <View style={styles.info2}>
                          <Image style={{ marginRight: '2%' }} source={require('../assets/img/section.png')} />
                          <Text style={styles.text1}>{this.state.partname}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.info1}>
                          <Text style={[styles.text1, { marginLeft: '3%' }]}>Published: {this.state.updateddate}</Text>
                        </View>
                        <View style={styles.info2}>
                          <Text style={[styles.text1]}>Release Date : {this.state.releasedate}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.info1}>
                          <Text style={[styles.text1, { marginLeft: '3%' }]}>{this.state.copyrights}</Text>
                          <Image source={require('../assets/img/open-book.png')} />
                        </View>
                        <View style={styles.info2}>
                          <Text style={styles.text1}>ISBN : {this.state.isbn}</Text>

                        </View>
                        {/* </View> */}
                      </View>
                    </View>
                  </View>
                )}
            </View>

          </View>


        </ScrollView>
        <Modal1
          // animationType={"slide"}
          onBackdropPress={() => this.setState({ loginPopup: false })}
          isVisible={this.state.loginPopup}>
          <LoginModal
            navigation={this.props.navigation}
            closeModal={() => this.closeLoginPopup()}
            close={() => this.setState({ loginPopup: false })}
          />

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
              style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: 200, height: 30, }}
              onPress={() => {
                AsyncStorage.setItem('postadd_postid',JSON.stringify(Number(this.state.getpostid)));
                AsyncStorage.setItem('postadd_typeid',JSON.stringify(Number(this.state.gettypeid)));
                this.props.navigation.navigate('createCollection')
                this.setState({ collectionModal: false })
              }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200, height: 30,
                justifyContent: 'center', alignSelf: 'center'
              }}>
                <Image source={require('../assets/img/createCol.png')} />
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
                            style={{ backgroundColor: '#f0f0f0', width: 300, }}
                            onPress={() => this.collectionBook(item.title, item.id)}>
                            <View style={{
                              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                            }}>
                             <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', textAlign: 'center', width: 180 }}>{item.title}</Text>
                              <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy == 'Public' ? require('../assets/img/worldwide.png') : require('../assets/img/not.png')} />
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
        <ModalBox
          style={styles.modal6}
          position={'center'}
          ref={'modal4'}
          isDisabled={this.state.isDisabled}>
          {/* <View style={{
  flexDirection: 'column', margin: '2%', height: 50,
  width: 300, alignItems: 'center', justifyContent: 'center'
}}> */}
          {/* <TouchableOpacity onPress={this._toggleModal} >
    <Text style={styles.modaltext}>Share</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => {

      this.refs.toast.show('Copied link to clipboard'),
        this.refs.modal4.close()
    }}
  >

    <Text style={styles.modaltext}>Copy Link</Text>
  </TouchableOpacity> */}

          <TouchableOpacity onPress={() => this.props.navigation.navigate('report')} >
            <Text style={styles.modaltext}>Report</Text>
          </TouchableOpacity>
          {/* </View> */}
        </ModalBox>

        <Modal1 isVisible={this.state.loading}

        // onBackdropPress={() => this.setState({ loading: true })}
        >
          <Image source={require('../assets/gif/logo.gif')} style={{
            alignSelf: 'center',
            width: 140,
            height: 140
          }} />
        </Modal1>


        {/* {this.state.explore_page=='0'? */}

        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={() => { this.state.explore_page == '0' ? this.likeClick(this.state.getpostid) : this.alertPopup() }}
          >
            {/* {this.renderImage} */}
            <Icons name={this.state.likeStatus ? 'like1' : 'like2'}
                size={20}
                style={{ alignSelf: 'center' }}
                color={this.state.likeStatus ? '#27A291' : '#707070'}
              />
              {this.state.likeStatus? <Text style={{
                color:
                this.state.likeStatus? '#27A291' :
                    '#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>{this.state.likecount} Like</Text>:<Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Like</Text>}
              {/* <Text style={{
                color:
                this.state.likeStatus? '#27A291' :
                    '#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>
                {item.likescount=="" || item.likescount==0?'':item.likescount} {item.likescount=="" || item.likescount<=1?'Like' : 'Likes'}
                </Text> */}
               
            {/* {this.state.likeStatus == 'Y' ? <Image
              style={{ marginTop: 12 }}
              source={require('../assets/img/small_like.png')} /> : <Image style={styles.group} source={require('../assets/img/like-icon.png')}
              />
            } */}
          </TouchableOpacity>
          {/* <Image
  onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
 source={imgSource}/> */}
          <TouchableOpacity
            onPress={() => this.commentClick()}
          >
            <MaterialIcon name={'comment-text-outline'}
                size={20}
                style={{ alignSelf: 'center' }}
                //  style={{marginLeft:15,marginBottom:3}}
                color={
                  //  item.Likestatus=='Y'?'#27A291':
                  '#707070'}
              />
              <Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.state.explore_page == '0' ? this.setState({ collectionModal: !this.state.collectionModal }
              ) : this.alertPopup()
            }}          // onPress={() =>this.props.navigation.navigate('createCollection')} 
          >
            <Icons name={'plus'}
  size={20}
  style={{alignSelf:'center'}}
  color={'#707070'}
  />
  <Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Add to</Text>
          </TouchableOpacity>
          <TouchableOpacity

            onPress={() => { this.state.explore_page == '0' ? this.setState({ shareModal: !this.state.shareModal }) : this.alertPopup() }}
          >

<ShareIcon name={'share-google'}
  size={25}
  style={{alignSelf:'center'}}
  color={'#707070'}
  />
  <Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Share</Text>
          </TouchableOpacity>
        </View>
        {/* :null} */}
        {/* <Modal
animationType="slide"
transparent
visible={this.state.popupModal}
onRequestClose={() => {
}}> */}
        {this.state.popupModal ? <BlurModal visible={this.state.modalVisible}
          children={
            <View style={{
              left: 0, right: 0, bottom: 0, position: 'absolute',
              height: '8%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#27A291',
            }}>
              <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' ,fontFamily:'AzoSans-Bold'}}>Added to {this.state.getsecColName} -</Text>
              <TouchableOpacity onPress={() => this.gotoCollSec()}>
                <Text style={{ fontSize: 16,fontFamily:'AzoSans-Medium', color: '#fff', padding: '2%', textDecorationLine: 'underline' }}>{this.state.popup_title}</Text>

              </TouchableOpacity>
            </View>
          } />
          : null}


        {/* </Modal> */}
        {/* <Modal
animationType="slide"
transparent
style={{ width: width, alignItems: 'center' }}
visible={this.state.readlaterPopup}
onRequestClose={() => {
}}> */}
        {this.state.readlaterPopup ?
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
                <Text style={{ color: '#fff', fontSize: 16,fontFamily:'AzoSans-Bold', textAlign: 'center', width: width / 1.4 }}>{!this.state.exists ? "Added to ReadLater" : "Already Added in ReadLater"}</Text>
                <TouchableOpacity onPress={() => this.setState({ undo: true })}>
                  <Text style={{ fontSize: 16,fontFamily:'AzoSans-Medium', color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
                </TouchableOpacity>
              </View>
            } />
          : null}
        {/* </Modal> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modaltext: {
    fontSize: 18,
    padding: '4%',
    color: '#707070'
  },

  modal5: {
    height: 170,
    width: 300,
  },
  modal6: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
  },
  authText: {
    width: width / 4,
    textAlign: 'left',
    fontSize: 12,
    color: '#000',
    fontFamily: 'AzoSans-Light'
  },
  authorResText: {
    width: width / 2,
    textAlign: 'left',
    fontSize: 12,
    fontFamily: 'AzoSans-Medium'
  },
  bgwhite: {
    backgroundColor: '#27A291',
    color: '#fff'
  },
  bgColor: {
    backgroundColor: '#ffff',
    color: 'white'
  },
  logoContainer: {
    flexDirection: 'row',
    width: width,
    margin: '4%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '20%'
  },
  logoContainer1: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-around',
    marginTop: '5%',
    margin: '4%',

  },
  group: {
    width: 40,
    height: 40
  },
  text3: {
    color: '#000',
    fontSize: 16,
  },
  // text3:{
  //   color:'#ffff',
  //   fontSize:16,
  // },
  viewsInfo: {
    width: width - 40,
    flex: 1,
    // alignItems:'center',
    justifyContent: 'space-between',
    // backgroundColor:'pink',
    margin: '4%'
  },
  btnText: {
    color: 'white',
    paddingLeft: '8%',
    fontSize: 12,
    fontFamily: 'AzoSans-Regular'
  },
  text1: {
    color: '#707070',
    fontFamily: 'AzoSans-Regular',
    // paddingLeft:'5%',
    fontSize: 12,
    // width:width/2,
    // backgroundColor:'skyblue',
    alignSelf: 'center',
  },
  text2: {
    color: '#000',
    fontSize: 14,
    // marginLeft: '3%',
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',

  },

  btnview: {
    // shadowOffset: {  width: width/3,  height: height / 16,},
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    elevation: 2,
    width: 100,
    height: 30,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    backgroundColor: '#fff',
    margin: '2%',
    marginTop: 0,
    marginBottom: '4%'
  },
  activeBtnview: {
    // shadowOffset: {  width: width/3,  height: height / 16,},
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    elevation: 1,
    width: 100,
    height: 30,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    backgroundColor: '#27A291',
    margin: '3%'
  },
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
    elevation: 1,
    backgroundColor: '#fff',
    resizeMode: 'cover'

  },
  headerText: {
    padding: '5%',
    fontSize: 14,
    color: '#707070',
    fontFamily: 'AzoSans-Medium'
  },
  rectangle: {
    width: 150,
    height: 120 * 2,
    borderRadius: 15,
    // backgroundColor: "pink",
    alignSelf: 'center',
    marginTop: 130
  },

  header: {
    backgroundColor: "#00BFFF",
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 1.7
    // height:180,

  },

  staticheader: {
    paddingLeft: '2%',
    // paddingRight:'2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '8%',
    backgroundColor: '#ffff',
    elevation: 1

  },
  avatar: {
    width: 120,
    height: 80 * 2,
    // borderRadius: 20,
    padding: '3%',
    alignSelf: 'center',
    marginBottom: 10,
    position: 'absolute',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: 40  //actual marginTop:130
  },
  bottomBar: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // padding:'2%',
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: '2%',
    // margin:'3%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 10,
    // marginTop: 30
  },
  name: {
    fontSize: 16,
    color: "#000000",
    fontFamily: 'Montserrat-Bold',
    marginBottom: '1%',
    textAlign: 'center',
    padding: '1%'
  },
  body: {
    marginTop: width / 5,
    // marginTop: '10%',
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    alignItems: 'center',
    padding: 10,
  },
  // name: {
  //   fontSize: 22,
  //   color: "#000",
  //   fontWeight: "700"
  // },
  info: {
    fontSize: 16,
    color: "#00BFFF",
  },
  description: {
    fontSize: 12,
    fontFamily: 'AzoSans-Regular',
    marginLeft: '3%', marginRight: '3%'

  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#00BFFF",

  },
  buttonContainer1: {
    marginTop: 20,
    height: 45,
    marginLeft: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    borderRadius: 30,
    backgroundColor: "#00BFFF",

  },
  talkBubble: {
    position: 'absolute',

    // zIndex: 2, // <- zIndex here
    flex: 1,
    // left: 5,  
    top: 40,
    right: 30
  },
  talkBubbleSquare: {
    width: width / 2.5,
    height: 30,
    backgroundColor: '#27A291',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  talkBubbleTriangle: {
    position: 'absolute',
    top: -7,
    right: 3,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#27A291',
    borderLeftColor: 'transparent',

    // borderLeftWidth: 8,
    // borderRightWidth:8,
    // borderBottomWidth:8,
    // borderLeftColor: 'transparent',
    // borderRightColor: 'transparent',
    // borderTopColor: 'transparent',

    // borderColor:'#24d4bc'
  },
  talkBubbleMessage: {
    color: '#fff',
    fontSize: 12,
    alignSelf: 'center'
  },
  socialBarContainer3: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  socialBarContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20
  },
  socialBarContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info1: {
    flexDirection: 'row',
    width: width / 2,
    // justifyContent: 'flex-start',
    color: '#000',
    // width: width / 2,
    // marginLeft:"3%",
    padding: '0.5%',
    paddingLeft: '3%',

    // alignItems: 'center',
  },
  info2: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // flex:1,
    // backgroundColor:'skyblue',
    width: width / 2,

    // marginLeft: '1%',
    // marginRight:'3%',
    padding: '0.5%',
    paddingRight: '3%',

    // alignItems: 'center',
  },
  divider: {
    width: 2,
    height: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -10,
    backgroundColor: 'black'
  },
  icon: {
    width: 25,
    marginLeft: 5,
    height: 25,
  },
  btnAction: {
    height: 45,
    width: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: "#fff",
  },
  inactive: { color: '#27A291', fontSize: 14, fontFamily: 'AzoSans-Regular' },
  active: { color: '#fff', fontSize: 14, fontFamily: 'AzoSans-Regular' }

});
const mapStateToProps = state => ({
  nav: state.apiReducer.nav,
  collSec: state.apiReducer.collSec

});


function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
    collSecPopup: () => dispatch({ type: 'COLLSEC_POPUP' }),
    savelogin: () => dispatch({ type: 'CHECKLOGIN' }),
    savelogout: () => dispatch({ type: 'CHECKLOGOUT' })


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBook);