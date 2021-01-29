import React, { Component } from 'react'
import { View, SafeAreaView, ImageBackground, Platform, FlatList, AsyncStorage, Modal, LayoutAnimation, useEffect, BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import { Avatar, Divider } from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
import ReadMore from 'react-native-read-more-text';
import Modal1 from "react-native-modal";
import ModalBox1 from 'react-native-modalbox';
import Share from 'react-native-share';
import Toast from 'react-native-easy-toast';
import HTMLView from 'react-native-htmlview';
import NetInfo from '@react-native-community/netinfo';
import ViewMoreText from 'react-native-view-more-text';
import { connect } from "react-redux";
import SnackBar from 'react-native-snackbar';
import LoginModal from '../components/loginModal';
import BlurModal from '../components/blurModal';
import { ceil } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/EvilIcons'
// import Toast1 from 'react-native-tiny-toast'
console.disableYellowBox = true;
const shareOptions1 = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  social: Share.Social.INSTAGRAM,
  whatsAppNumber: "9199999999",  // country code + phone number(currently only works on Android)
  filename: 'test', // only for base64 file in Android 
};
// Share.shareSingle(shareOptions);
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {

      showlikeImg: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      getuserid: '',
      gettypeid: '',
      sliderValue: 0.3,
      expanded: false,
      boolean: false,
      toastvisible: false,
      feeding: [],
      newModalVisible: false,
      shareModal: false,
      collectionModal: false,
      loading: true,
      selectedItemLike: [],
      pagingCount: Number(1),
      collection: '',
      currentItem: '',
      curFuncName: '',
      descPage: false,
      readlaterPopup: false,
      selectedItemArray: [],
      exists: false,
      fetching_from_server: false,
      // onEndReachedCalledDuringMomentum: false,
      lastLoadCount: 0,
      notFinalLoad: false,
      getpagingCount: 0,
      socialmedia: '',
      shareId: '',
      newwid: '',
      sectionExpand: false,
      section: '',
      secCollid: '',
      explore_page: '0',
      loginPoup: false,
      customlikeCount: false,
      readlaterUndo:false


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.onEndReachedCalledDuringMomentum = true,
      this.pageCountVal = 1;

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
  _toggleModal = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.refs.modal6.open()
  }
  toggle_newModal = () => {
    this.setState({ newModalVisible: !this.state.newModalVisible })
  }
  fb = () => {
    console.log('newsfeed share id ', this.state.shareId)
    this.setState({ shareModal: false, });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.shareId,
      social: Share.Social.FACEBOOK,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  insta = () => {
    this.setState({ shareModal: false, });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.shareId,
      social: Share.Social.INSTAGRAM,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  pinterest = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.shareId,
      social: Share.Social.PINTEREST,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
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
    // this.setState({loginPopup:true})
    this.logoutpress()
  }
  closeLoginPopup() {
    this.setState({ loginPopup: false });
    this.props.savelogin();
    AsyncStorage.setItem('explore_page', JSON.stringify(0));
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page: value })).done();
    AsyncStorage.setItem('collectionFilter', "DESC");
    this.CheckConnectivity();
  }
  twitter = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.shareId,
      social: Share.Social.TWITTER,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  tumblr = () => {
    this.setState({ shareModal: false });
    let shareOptions2 = {
      url: 'https://pagevio.com/sample-page/' + this.state.shareId,
      social: Share.Social.TUMBLR,
    };
    // console.log('share click ',Share.Social.INSTAGRAM,this.state.shareId)
    Share.shareSingle(shareOptions2);
  }
  // onPressHandler(id) {
  //   // let selected;
  //    let list=[...this.state.feeding];
  //    for(let data of list){
  //      if(data.Post_page_id==id){

  //        data.like=(data.like==null)?true:!data.like;

  //        (data.like)?this.state.selectedItemLike.push(data):this.state.selectedItemLike.pop(data);
  //        console.log('selected item array ',this.state.selectedItemLike)
  //         console.log("data.selected"+data.like,'id',data.Post_page_id);
  //         console.log('post id in pagefeed is ',data.Post_Page_Id);

  //       //   this.state.selectedItem.length!=0? this.setState({showlikeImg:true}):this.setState({showlikeImg:false});

  //        // console.log("id"+id);
  //       //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
  //        //console.log("array"+selectedItemArray);
  //        break;
  //      }
  //    }
  //   // console.log("array"+this.state.selectedItemArray);
  //   // MultiselectItems.push(selectedItemArray);
  //    this.setState({feeding:list});
  //  }
  fullcard1({ item }) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', margin: '3%' }}>
        <TouchableOpacity onPress={this.imgPress}>
          <View style={{ flexDirection: 'column', margin: '3%', justifyContent: 'space-between' }}>
            <Image style={{ width: 50, height: 50, borderRadius: 50 / 2 }} source={item.img} />
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>)
  }
  // renderImage(){
  //   // const like=require('../assets/img/like.png');
  //   // const unlike=require('../assets/img/unlike.png');
  // var imgSource = this.state.showlikeImg? like:unlike ;
  //   return (
  //     <Image
  //       style={ homeStyles.optionsImage }
  //       source={ imgSource }
  //     />
  //   );
  // }

  exploredata = async () => {
    this.setState({ loading: true })
    var json = JSON.stringify({
      // 'UserId': userid,
      "PagingCount": this.pageCountVal,
      "UserID": this.state.getuserid

    });
    console.log('pagefeed passing data value is ', json)
    fetch("http://162.250.120.20:444/Login/PageFeed",
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
        // responseJson = responseJson.map(item => {
        //   item.isSelect = false,
        //     item.readmore = false;
        //   return item;
        // });
        // this.pageCountVal+=1;
        //After the response increasing the offset for the next API call.
        this.setState({
          feeding: this.state.feeding.concat(responseJson),
          //adding the new data with old one available in Data Source of the List
          loading: false,
          getpagingCount: responseJson[0].Pagingcounts,


          //updating the loading state to false
        });
        console.warn(responseJson)
        // alert(this.pageCountVal)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  _renderTruncatedFooter = (handlePress, index, item) => {
    return (
      <Text key={index} style={{
        color: '#27A291',
        //  marginTop: -18, paddingLeft: '1%', alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={handlePress}>
        // marginTop: -19, paddingLeft: '1%', 
        fontFamily:'AzoSans-Regular',fontSize:12,
        alignSelf: "flex-end", backgroundColor: '#F9F9F9',
        textDecorationLine: 'underline',
      }} onPress={() => this.pressIcon(item)}>
        Read More
      </Text>
    );
  }
  selectItem = data => {
    let { feeding } = this.state;
    var newData = feeding.map(el => {
      if (el.Post_Page_Id == data.Post_Page_Id)

        return Object.assign({}, el, { isSelect: true })
      return el
    });
    this.likeAdd(this.state.getuserid, data.Post_Page_Id)
    this.setState({ feeding: newData });
    // data.isSelect = !data.isSelect;
    // this.setState({isSelect:data.isSelect})

    console.log('kdfsklk like select ', data.isSelect)
  }
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
        this.setState({ loading: false, customlikeCount: !this.state.customlikeCount });
        console.warn(responseJson);
        console.log('like service called');
        { this.exploredata() }
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  _renderRevealedFooter = (handlePress) => {
    console.log('handle press is', handlePress)
    return (
      <Text style={{ color: '#27A291', marginTop: -17, alignSelf: "flex-end", backgroundColor: '#F9F9F9', textDecorationLine: 'underline', }} onPress={handlePress}>
        Read less
      </Text>
    );
  }

  onClose() {
    //called on modal closed
    console.log('Modal just closed');
  }

  onOpen() {
    this.refs.modal4.open()
    //called on modal opened
    console.log('Modal just opened');
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    { this.collData(this.state.getuserid) };

  }
  secData(userid, collid) {
    this.setState({ loading: true })
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
        const filteredList = responseJson.filter((item) => item.SectionID !== 0);
        this.setState({ section: filteredList, loading: false, secCollid: responseJson[0].CollectionsID })

        console.warn(responseJson)
        console.warn("section")
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  collData(userid, colid, secid) {
    this.setState({ loading: true })
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
        this.setState({ collection: responseJson, loading: false })
        console.warn(responseJson)
        console.warn("collection")
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  onClosingState(state) {
    //called on modal close/open of the swipe to close change
    console.log('Open/Close of the SwipeToClose just changed');
  }
  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  pressIcon = (item) => {
    console.log('feeeddd data is ', item)
    let { feeding } = this.state;
    console.log('items are', item)
    feeding = feeding.map(e => {
      if (item.TypeID === e.TypeID) {
        // item.like = !e.like;

        if (item.TypeID == 4) {
          // AsyncStorage.setItem('pagefeedItem',JSON.stringify(item));
          AsyncStorage.setItem('typeid', item.TypeID);
          AsyncStorage.setItem('postid', item.Post_Page_Id);
          AsyncStorage.setItem('pagefeed_userid', item.UserID);
          console.log('newsfeed post id is', item.Post_Page_Id, item.TypeID);
          return this.props.navigation.navigate('readingBook');
        } else if (item.TypeID == 1) {
          AsyncStorage.setItem('typeid', item.TypeID);
          AsyncStorage.setItem('postid', item.Post_Page_Id);

          console.log('newsfeed post id is', item.Post_Page_Id, item.TypeID);
          return this.props.navigation.navigate('viewBook');
        } else if (item.TypeID == 2) {
          AsyncStorage.setItem('typeid', item.TypeID);
          AsyncStorage.setItem('postid', item.Post_Page_Id);

          console.log('newsfeed post id is', item.Post_Page_Id, item.TypeID);
          return this.props.navigation.navigate('periodiViewBook');
        } else if (item.TypeID == 3) {
          AsyncStorage.setItem('typeid', item.TypeID);
          AsyncStorage.setItem('postid', item.Post_Page_Id);

          console.log('newsfeed post id is', item.Post_Page_Id, item.TypeID);
          return this.props.navigation.navigate('seriesViewBook');
        }
      } else {
        return e;
      }
    });
  }
  likeClick(id) {
    // let selected;
    let feeding = [...this.state.feeding];
    for (let data of feeding) {
      if (data.Post_Page_Id == id) {

        //     data.isSelect = (data.isSelect == null) ? true : !data.isSelect;
        //     (data.isSelect) ? this.state.selectedItemArray.push(data) : this.state.selectedItemArray.pop(data);
        //     console.log('sel item array ', this.state.selectedItemArray);
        this.setState({ loading: true })
        var json = JSON.stringify({ "UserID": this.state.getuserid, "Post_Page_ID": id, "TypeID": data.TypeID });
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
            if (responseJson[0].msg == "Success") {
              data.Likestatus = responseJson[0].Message == 'Like' ? 'Y' : 'N';
              data.likescount = responseJson[0].Message == 'Like' ? Number(data.likescount) + 1 : Number(data.likescount) - 1;

              this.setState({ loading: false, customlikeCount: !this.state.customlikeCount });
              console.warn(responseJson);
            }
            // console.log('like service called');
            // { this.exploredata() }
          })
          .catch((error) => {
            console.warn(error);
          });
        break;
      }
    }
    this.setState({ feeding });
  }

  closeDrawer = () => {
    this._drawer._root.close();
  }
  openDrawer = () => {
    alert('open');
    this._drawer._root.open();
  }
  toggleTab1() {

    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
    this.props.navigation.navigate('mainpage')
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
    this.props.navigation.navigate('collection')

  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
    this.props.navigation.navigate('search')

  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
    // this.props.navigation.navigate('menu')
    // this.props.navigation.openDrawer()
    {
      this.state.explore_page == '0' ?
      this.props.navigation.openDrawer() :
      this.logoutpress()
    }
  }
  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.setState({ loading: false })
    // BackHandler.exitApp();
    // this.props.changeNavRec();
    // this.props.navigation.goBack();
    this.props.navigation.navigate('mainpage')
    return true;
  }
  exploredataPic(userid) {
    // this.setState({loading:true})
    var json = JSON.stringify({
      'userid': userid
    });
    console.log('profile', json)
    fetch("http://162.250.120.20:444/Login/ProfileUpdateGet",
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
        for (let i = 0; i < responseJson.length; i++) {
          // alert(this.state.bookdetail[0].Image)
          this.setState({
            avatar: responseJson[i].avatar,
            username: responseJson[i].username

          })
        }
        AsyncStorage.setItem('profile_img', this.state.avatar);
        AsyncStorage.setItem('user_name', this.state.username);
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  async componentDidMount() {
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
    AsyncStorage.getItem('typeid').then((val) => this.setState({ gettypeid: val })).done();
    AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page: value })).done();
    AsyncStorage.setItem('collectionFilter', "DESC");
    this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // this.getData();
    // { this.exploredata(this.state.getuserid) }
  };
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
  getData() {
    setTimeout(() => {
      console.log('pagefeed user id is ', this.state.getuserid);
      { this.exploredata() }
      { this.exploredataPic(this.state.getuserid) }
    }, 1000)
  }
  toast = () => {
    this.setState({ toastvisible: true })

  }
  readlater = () => {
    this.setState({
      collectionModal: false,
      readlaterPopup: true,
      readlaterUndo:false
    });

    setTimeout(() => {
      // this.props.changeRemove()
      this.setState({
        readlaterPopup: false,
        // exists: false
      });
      if(this.state.readlaterUndo==false){
        alert(this.state.readlaterUndo)
        // this.readlaterAdd(this.state.getuserid, item.Post_Page_Id, item.TypeID)

      }else{
        this.setState({readlaterUndo:false})
      }
      //   this.props.changeRemove();
    }, 3000);

    // this.props.navigation.navigate('readlater');
  }
  readlaterClick= () =>{
    let list = [this.state.currentItem];
    for (let item of list) {
      AsyncStorage.setItem('typeid', item.TypeID);
      AsyncStorage.setItem('postid', item.Post_Page_Id);
      this.readlater();

    }
  }
  readlaterAdd=(userid, pageid, typeid)=> {
    this.setState({ loading: true })
    var json = JSON.stringify({
      'UserID': userid,
      "Post_PageID": pageid,
      "Type_ID": typeid
    });
    console.log('json newsfeed ', json)
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
        //   this.setState({ exists: true })
        // }else{
        //   this.setState({exists:false})
        // }
        this.setState({ loading: false, })
        // this.readlater();
        this.setState({ collectionModal: false, expanded: false, sectionExpand: false });

        // this.readlater();
        // SnackBar.show({
        //     title: !this.state.exists?"Added to ReadLater":"Already Added in ReadLater",
        //     duration:SnackBar.LENGTH_LONG,
        //     backgroundColor: '#27A291',
        //     action: {
        //       title: 'Undo',
        //     //   onPress: () => SnackBar.show({ title: 'Thank you!' }),
        //       color: '#fff',
        //     },
        //   })
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
  reportClk = () => {
    this.setState({ newModalVisible: false })
    this.props.navigation.navigate('report')
  }
  // collectionBook=()=>{
  //   this.setState({collectionModal:false})
  //   this.props.navigation.navigate('viewBook')
  //   }
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
    console.log('json post newsfeed ', json)

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
  commentClick(item) {
    AsyncStorage.setItem('typeid', JSON.stringify(Number(item.TypeID)));
    AsyncStorage.setItem('postid', item.Post_Page_Id);
    console.log('comments page id is ', this.state.gettypeid, item.Post_Page_Id);
    console.log('comment typeid postid ', item.Post_Page_Id)
    this.props.navigation.navigate('comments')
  }
  collectionBook = (value, colid) => {
    this.setState({ collectionModal: false, expanded: false, sectionExpand: false });
    // this.props.navigation.navigate('viewBook');
    let gotoDescPage = this.state.curFuncName;
    let list = [this.state.currentItem];
    for (let item of list) {
      AsyncStorage.setItem('typeid', item.TypeID);
      AsyncStorage.setItem('postid', item.Post_Page_Id);
      console.log('type id postid ', item.TypeID, item.Post_Page_Id);
      this.props.collSecPopup();
      console.log('collSeccollSeccollSeccollSec', this.props.collSec)
      AsyncStorage.setItem('popup_name', JSON.stringify(value));
      AsyncStorage.setItem('colSec', "Collection");
      AsyncStorage.setItem('colId', JSON.stringify(colid));
      AsyncStorage.setItem('coll_name', JSON.stringify(this.state.getsecColName));
      if (item.TypeID == 4) {

        this.collectionAdd(colid, "", "", item.Post_Page_Id, this.state.getuserid, item.TypeID, "")
        // this.props.collSecPopup();
        return this.props.navigation.navigate('readingBook');
        // return this.pressIcon();
      } else if (item.TypeID == 1) {
        this.collectionAdd(colid, "", item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
        return this.props.navigation.navigate('viewBook');
      } else if (item.TypeID == 2) {
        this.collectionAdd(colid, "", item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
        return this.props.navigation.navigate('periodiViewBook');
      } else if (item.TypeID == 3) {
        this.collectionAdd(colid, "", item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
        return this.props.navigation.navigate('seriesViewBook');
      }

    };

  }

  sectionClick = (collid) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ sectionExpand: !this.state.sectionExpand });
    this.secData(this.state.getuserid, collid)
    console.log('section data collection ', this.state.section);
  }
  secBook = (value, colid, secid, item) => {
    this.setState({ collectionModal: false, expanded: false, sectionExpand: false });
    // this.props.navigation.navigate('viewBook');
    let gotoDescPage = this.state.curFuncName;
    let list = [this.state.currentItem];
    for (let item of list) {
      AsyncStorage.setItem('typeid', item.TypeID);
      AsyncStorage.setItem('postid', item.Post_Page_Id);
      console.log('type id postid ', item.TypeID, item.Post_Page_Id);
      this.props.collSecPopup();
      AsyncStorage.setItem('popup_name', JSON.stringify(value));
      AsyncStorage.setItem('colSec', "Section");
      AsyncStorage.setItem('colId', JSON.stringify(colid));
      AsyncStorage.setItem('SecId', JSON.stringify(secid));
      if (item.TypeID == 4) {

        this.collectionAdd(colid, secid, "", item.Post_Page_Id, this.state.getuserid, item.TypeID, "")
        // this.props.collSecPopup();
        return this.props.navigation.navigate('readingBook');
        // return this.pressIcon();
      } else if (item.TypeID == 1) {
        this.collectionAdd(colid, secid, item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
        return this.props.navigation.navigate('viewBook');
      } else if (item.TypeID == 2) {
        this.collectionAdd(colid, secid, item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
        return this.props.navigation.navigate('periodiViewBook');
      } else if (item.TypeID == 3) {
        this.collectionAdd(colid, secid, item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
        return this.props.navigation.navigate('seriesViewBook');
      }

    };
  }
  _onMomentumScrollBegin = () => this.setState({ onEndReachedCalledDuringMomentum: false });
  // Load more data function
  _loadMoreData = () => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({ onEndReachedCalledDuringMomentum: true }, () => {

        setTimeout(() => {
          if (this.state.lastLoadCount >= 4 && this.state.notFinalLoad) {
            this.pageCountVal += 1;
            this.setState({

              // page: this.state.page + 1,
            }, () => {
              // Then we fetch more data;
              this.loadMoreData1();
            });
          };
        }, 1500);
      });
    };
  };

  descriptionList({ item }) {
    return (
      <View>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={this._renderTruncatedFooter}
          renderRevealedFooter={this._renderRevealedFooter}
          onReady={this._handleTextReady}>

          {item.Contant == null ? <Image source={{ uri: item.Image }}
          /> : null}
          {item.Image == null ?

            <Text style={styles.description}>
              {item.Contant}
            </Text>
            : null}
        </ReadMore>

      </View>
    )
  }
  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  }
  sharepress = (id) => {
    this.setState({ shareId: id, shareModal: !this.state.shareModal, })
  }
  goToAuthorProfile(id) {

    AsyncStorage.setItem('profile_userid', id);
    AsyncStorage.setItem('pagefeed_userid', id);
    console.log(' profile userid ', id)
    this.props.navigation.navigate('profileAbout')

  }
  fullcard(item) {
    // const like = require('../assets/img/like.png');
    // const unlike = require('../assets/img/unlike.png');
    // var imgSource = this.state.showlikeImg ? like : unlike;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
      <View style={{ width: width, flex: 1, backgroundColor: '#fff', }}>
        <View style={{ flexDirection: 'row',alignItems:'center',margin:'2%', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{}} onPress={() => { this.state.explore_page == '0' ? this.goToAuthorProfile(item.UserID) : this.logoutpress() }}>
            <Image style={styles.userImg}
              source={{ uri: item.User_Images != "" ? item.User_Images : null }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: 'column', width: width / 1.4, 
           backgroundColor:item.Username == "" ? '#f9f9f9' : null, 
           justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => { this.state.explore_page == '0' ? this.goToAuthorProfile(item.UserID) : this.logoutpress() }}>
              <Text style={styles.username}>{item.Username}</Text>
            </TouchableOpacity>
            <Text style={styles.date}>Published a {item.TypeID == 4 ? "page" : "publication"} on {item.Publisheddate}</Text>
          </View>
          {/* {this.state.explore_page=='0'? */}

          <TouchableOpacity style={{ alignSelf:'center' }}
            // onPress={() => this.refs.modal5.open()}
            onPress={() => { this.state.explore_page == '0' ? this.toggle_newModal() : this.alertPopup() }}
          >
            <Image  source={require('../assets/img/3dots_gray.png')} />
          </TouchableOpacity>
          {/* :null} */}
        </View>
        <TouchableOpacity style={{marginLeft:'3%'}} onPress={() => this.pressIcon(item)}>
          <Text numberOfLines={2}
            style={styles.title}>{item.Title}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.pressIcon(item)}
        //  onPress={()=>this.props.navigate.navigate('readingBook')}
        >
          {/* <ImageBackground
            style={{ width: width, height: 500, alignSelf: 'center', marginTop: '2%',}}
            source={{ uri: item.Images != "" ? item.Images : null }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          /> */}
          <ImageBackground
            style={{ width: width, height: item.TypeID == 4 ? 217 : 514, alignSelf: 'center', marginTop: '2%', resizeMode: 'cover' }}
            source={{ uri: item.Images != "" ? item.Images : null }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </TouchableOpacity>

        <View style={{
          backgroundColor: '#F9F9F9',
          paddingLeft: '5%', paddingRight: '5%', paddingTop: '2%', paddingBottom: '2%'
        }}>
          <ReadMore
            numberOfLines={item.DescriptionContent.length < 200 ? 1 : 3}
            renderTruncatedFooter={(handlePress1, index) => this._renderTruncatedFooter(handlePress1, index, item)}
            renderRevealedFooter={this._renderRevealedFooter}
            onReady={this._handleTextReady}>
            <Text style={styles.description}>
              {item.DescriptionContent}
            </Text>
          </ReadMore>
        </View>

        <View style={{
          flexDirection: 'row',
          // backgroundColor:'pink',
          justifyContent: "space-around",
          padding: '1%',
          paddingBottom: 0,
        }}>
          <TouchableOpacity
            style={{ width: width / 6, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              this.state.explore_page == '0' ?
              this.likeClick(item.Post_Page_Id) : this.alertPopup()
              // this.selectItem(item)
            }}
          >
            <View

              styles={{ flexDirection: 'row' }}
            >
              <Icons name={item.Likestatus == 'Y' ? 'like1' : 'like2'}
                size={20}
                style={{ alignSelf: 'center' }}
                color={item.Likestatus == 'Y' ? '#27A291' : '#707070'}
              />
              {/* {
              item.Likestatus=='Y'? <Image style={{width:15,height:15,
              marginLeft:15,marginBottom:3
              }} source={require('../assets/img/like1.png')}/> : <Image  style={styles.group} source={require('../assets/img/likebg.png')} />} */}
              <Text style={{
                color:
                  item.Likestatus == 'Y' ? '#27A291' :
                    '#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>{item.likescount=="" || item.likescount==0?'':item.likescount} {item.likescount=="" || item.likescount<=1?'Like' : 'Likes'}</Text>
            </View>
            {/* <Image
              source={imgSource}
            /> */}

          </TouchableOpacity>
          {/* <Image
            onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
           source={imgSource}/> */}
          <TouchableOpacity
            style={{ width: width / 6, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              this.state.explore_page == '0' ?
              this.commentClick(item) : this.alertPopup()
            }}>
            <View

              styles={{ flexDirection: 'row' }}
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
                color:
                  // item.Likestatus=='Y' ? '#27A291' :
                  '#707070', textAlign: 'center', marginTop: 2, marginBottom: 2,fontFamily: 'AzoSans-Regular',fontSize: 12,
              }}>
                {/* {item.likescount=="" || item.likescount==0?'':item.likescount} */}
                 {item.likescount=="" || item.likescount<=1?'Comment' : 'Comments'}  
                  </Text>

            </View>
            {/* <Image
             style={styles.group} source={require('../assets/img/comments-icon.png')} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: width / 6, alignItems: 'center', justifyContent: 'center' }}
            // onPress={() => this.refs.modal4.open()} 
            onPress={() => { this.state.explore_page == '0' ? this.setState({ collectionModal: !this.state.collectionModal, currentItem: item, curFuncName: "pressIcon", exists: item.Readstatus == "N" ? false : true }) : this.alertPopup() }}
          // onPress={() =>this.props.navigation.navigate('createCollection')} 
          >
             <View

styles={{flexDirection:'row'}}
>
  <Icons name={'plus'}
  size={20}
  style={{alignSelf:'center'}}
  color={'#707070'}
  />
 {/* {
 item.Likestatus=='Y'? <Image style={{width:15,height:15,
 marginLeft:15,marginBottom:3
 }} source={require('../assets/img/like1.png')}/> : <Image  style={styles.group} source={require('../assets/img/likebg.png')} />} */}
 <Text style={{ color: '#707070', fontFamily: 'AzoSans-Regular',fontSize: 12,textAlign:'center',marginTop:2,marginBottom:2}}>Add to</Text>
</View>
            {/* <Image style={styles.group} source={require('../assets/img/add-to-icon.png')} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: width / 6, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              this.state.explore_page == '0' ?
              this.sharepress(item.Post_Page_Id) : this.alertPopup()
            }
              // this.refs.modal6.open()
            } >
  <View

styles={{flexDirection:'row'}}
>
  <ShareIcon name={'share-google'}
  size={25}
  style={{alignSelf:'center'}}
  color={'#707070'}
  />
 {/* {
 item.Likestatus=='Y'? <Image style={{width:15,height:15,
 marginLeft:15,marginBottom:3
 }} source={require('../assets/img/like1.png')}/> : <Image  style={styles.group} source={require('../assets/img/likebg.png')} />} */}
 <Text style={{ color: '#707070',fontFamily: 'AzoSans-Regular',fontSize: 12,textAlign:'center',marginTop:2,marginBottom:2}}>Share</Text>
</View>
          </TouchableOpacity>
        </View>
        {/* :null} */}
        <Divider style={{ borderColor: '#707070' }} />
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
  onEndReached = ({ distanceFromEnd }) => {
    this.setState({ pagingCount: this.state.pagingCount + 1, loading: true })
    console.log('calleddd ', this.state.pagingCount)
    if (!this.onEndReachedCalledDuringMomentum) {
      { this.exploredata() }
      this.onEndReachedCalledDuringMomentum = true;
    }
  }
  handleMore = () => {
    this.pageCountVal = this.pageCountVal + 1;
    // this.setState({pagingCount:Number(this.pageCountVal)+1})
    console.log('onend reached called console pagingcount & getpagicount value ,local value ', this.pageCountVal, this.state.getpagingCount)
    if (this.pageCountVal < this.state.getpagingCount) {
      this.exploredata();
    }
    //   if(!this.onEndReachedCalledDuringMomentum){
    //     {this.exploredata()}
    //     this.onEndReachedCalledDuringMomentum = true;
    // }
  }
  handleMore1 = () => {
    console.log('onend reached called,1')
    // this.setState({pagingCount:this.state.pagingCount+1})
    // // this.exploredata();
    // if(!this.onEndReachedCalledDuringMomentum){
    //   {this.exploredata()}
    //   this.onEndReachedCalledDuringMomentum = true;
    // }
  }

  render() {
    const { list } = this.state;
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>

        <View style={styles.header}>
          {/* <LinearGradient
          colors={['#fff', '#fff']} > */}
          <TouchableOpacity
            style={[styles.active1, { backgroundColor: '#fff' }]}
            onPress={() => this.props.navigation.navigate('mainpage')}>
            <Text style={styles.inactiveText}
            >Recommendations</Text>
          </TouchableOpacity>
          {/* </LinearGradient>
        <LinearGradient style={ styles.active }
          colors={ ['#24D4BC', '#27A291']} > */}
          <TouchableOpacity style={[styles.active1, { backgroundColor: '#27A291' }]}>
            <Text style={styles.activetext}>PageFeed</Text>
          </TouchableOpacity>
          {/* </LinearGradient> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          //    style={{flex:3}}
          style={{ marginBottom: '10%' }}

          ref={(c) => { this.scroll = c }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.feeding}
            renderItem={({ item }) =>
              this.fullcard(item)
            }
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          // onEndReached={this.handleMore}

          // // onEndReached={this.onEndReached.bind(this)}
          // onEndReachedThreshold={0.9}
          // onMomentumScrollEnd={()=>{ this.onEndReachedCalledDuringMomentum = true; this.handleMore()}}
          // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          />
          {this.state.feeding.length != 0 ?
            <TouchableOpacity style={{ margin: '5%', padding: '2%', alignSelf: 'center' }} onPress={() => this.goToTop()}
            >
              <Image source={require('../assets/img/backTotop1.png')} />
            </TouchableOpacity> : null}
          {this.state.feeding.length != 0 ?
            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
              <LinearGradient style={{ width: width / 3, borderRadius: 5, height: 20, alignItems: 'center', justifyContent: 'center' }}
                colors={['#24D4BC', '#27A291']} >
                <TouchableOpacity onPress={() => this.handleMore()}>
                  <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'AzoSans-Regular',fontSize: 14, }}>See more Feeds</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            : null}

        </ScrollView>

        <Modal1 isVisible={this.state.newModalVisible}
          onBackdropPress={() => this.setState({ newModalVisible: false })}>
          <View style={{ backgroundColor: '#fff', width: width / 1.2, height: height / 18, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.reportClk()} >

              <Text style={styles.modaltext}>Report</Text>
            </TouchableOpacity>
            <Toast ref="toast"

              style={{ backgroundColor: '#707070', fontSize: 18, width: width - 100, alignItems: 'center', borderRadius: 15 }}
            />
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
                this.props.navigation.navigate('createCollection')
                this.setState({ collectionModal: false })
              }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', width: 260,
                justifyContent: 'center', alignSelf: 'center'
              }}>
                <Image style={{ alignSelf: 'center' }} source={require('../assets/img/createCol.png')} />
                <Text style={{ fontSize: 16, fontFamily: 'AzoSans-Medium', color: '#27A291', marginTop: 5, width: width / 2.5, alignSelf: 'center', marginLeft: '4%' }}>Create Collection</Text>
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
              onPress={() => this.readlaterClick()}>

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
        <BlurModal visible={this.state.loading}
          children={
            <Image source={require('../assets/gif/logo.gif')} style={{
              alignSelf: 'center',
              width: 140,
              height: 140
            }} />
          } />

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
        {/* <Modal
          animationType="slide"
          transparent
          visible={this.state.readlaterPopup}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}> */}
        <BlurModal visible={this.state.readlaterPopup}
          children={

            <View style={styles.readlaterModal}>
              <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', width: width / 1.4 }}>{!this.state.exists ? "Added to ReadLater" : "Already Added in ReadLater"}</Text>
              <TouchableOpacity onPress={()=>this.setState({readlaterUndo:true})}>
              <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
            </TouchableOpacity>
            </View>
          } />
        {/* </Modal> */}
        {/* <View style={{bottom:"8%",left:0,right:0, position:'absolute',width:width,height:25,marginBottom:5,marginTop:5,alignItems:'center',justifyContent:'center'}}>
            
                <LinearGradient style={{width:width/3,borderRadius:5,height:20,alignItems:'center',justifyContent:'center'}}
                colors={['#24D4BC', '#27A291']} >
                <TouchableOpacity onPress={()=>this.handleMore()}>
              <Text style={{fontSize:15,color:'#fff'}}>See more Feeds</Text>
              </TouchableOpacity>
              </LinearGradient>
            </View> */}

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.tabsss}
            onPress={() => this.toggleTab1()}>
            <Image style={{ width: 25, height: 25 }} source={require('../assets/img/logo.png')} />
            {/* <Text>Home</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
            <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../assets/img/library.png')} />
            {/* <Text>Collection</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
            <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../assets/img/search.png')} />
            {/* <Text>Search</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabsss, { width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }]} onPress={() => this.toggleTab4()}>
            {/* <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} > */}
            {/* <TouchableOpacity onPress = {() =>navigation.openDrawer() }>  */}
            <Image style={{ width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }} source={{ uri: this.state.explore_page == '0' ? this.state.avatar : 'http://pagevio.com/uploads/profile/noimage.jpg' }}></Image>
            {/* <Text>Menu</Text> */}
            {/* </Drawer> */}
          </TouchableOpacity>

        </View>
      </SafeAreaView>)
  }

}
const styles = StyleSheet.create({

  tabs: {
    flexDirection: 'row',
    padding: '2%',
    borderBottomColor: 'gray',
    marginVertical: 5,
    marginHorizontal: 5 * 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  group: {
    width: 40,
    height: 25,
    // backgroundColor:'skyblue'
  },

  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,


    resizeMode: 'cover'
  },
  username: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left'
  },
  date: {
    fontSize: 12,
    fontFamily: 'AzoSans-Regular',
    color: '#707070',
    textAlign: 'left',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'flex-start',
    // marginLeft: '8%',
    // marginRight: '8%',
    // marginTop: '2%'
  },
  description: {
    fontSize: 14,
    fontFamily: 'AzoSans-Regular',
    color:'#000'
  },
  header: {
    flexDirection: 'row',
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
  tabsss: {
    alignItems: 'center', justifyContent: 'center'
  },
  inactiveText: {
    color: '#707070',
    padding: '5%',
    fontSize: 14,
    fontFamily: 'AzoSans-Medium',
  },
  active: {
    borderRadius: 10,
  },
  activetext: {
    padding: '5%',
    fontSize: 14,
    fontFamily: 'AzoSans-Medium',
    color: 'white'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    margin: 2,
  },
  bottomBar:{
    backgroundColor: '#fff', 
    alignItems: 'center',
    height:'6%',
    bottom:0,
    left:0,
    right:0,
    justifyContent:'space-around',
    flexDirection:'row',
    position:'absolute',
    elevation:8
},

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modaltext: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#707070'
  },
  active1: {
    borderRadius: 10,
  },
  modal5: {
    height: height / 18,
    width: width / 1.3,
  },
  readlaterModal: {
    left: 0,
    right: 0,
    bottom: '6%',
    position: 'absolute',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27A291',
  },
  addCollModal: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
    width: 300
  }
})
function mapStateToProps(state) {
  return {
    addCol: state.apiReducer.addCol,
    collSec: state.apiReducer.collSec

  }
}


function mapDispatchToProps(dispatch) {
  return {

    popupAddCol: () => dispatch({ type: 'ADD_COL' }),
    collSecPopup: () => dispatch({ type: 'COLLSEC_POPUP' }),
    savelogin: () => dispatch({ type: 'CHECKLOGIN' }),
    savelogout: () => dispatch({ type: 'CHECKLOGOUT' })

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
