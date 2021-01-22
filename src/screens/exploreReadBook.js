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
import Modal1 from 'react-native-modal';
import { Divider } from 'react-native-elements';
import { connect } from "react-redux";
import HTMLView from 'react-native-render-html';
import HTMLView1 from 'react-native-htmlview';
import WebView from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import { SelectableText } from "@astrocoders/react-native-selectable-text";
import Share from 'react-native-share';

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

class exploreReadBook extends Component {
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
  }
  async componentDidMount() {
    this.setEmptyClipboard();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    AsyncStorage.getItem('pagefeed_userid').then((value) => this.setState({ pagefeed_userid: value })).done();
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    AsyncStorage.getItem('profile_userid').then((value) => this.setState({ profile_userid: value })).done();
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('pageorder').then((value) => this.setState({ getcontentpageCount: value })).done();
    AsyncStorage.getItem('contentTopage').then((value) => this.setState({ contentToRead: value })).done();
       this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      if(this.props.collSec==true){
        console.log('coll sec value in read page ',this.props.collSec)
          {this.getData2()}
  
       }
        this.CheckConnectivity();
      })
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
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.focusListener.remove()

  }
  getData() {
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
          }, 1000);
  }
  
  exploredata = async (postid, typeid) => {
    this.setState({ loading: true })
    console.log('post,type,pagecount', this.state.getpostid, this.state.gettypeid, this.pagecounting)
    var json = JSON.stringify(
      {
        'PostID': this.state.getpostid, 'SP_For': "Read", 'Type_ID': typeid, 'PagingCount': this.pagecounting
      });
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
  
  backpress = () => {
    if (this.state.contentVisible) {
      this.setState({ contentVisible: false })
    } else {
      this.props.navigation.goBack();
    }
  }

  UpdateProgressBar = (progress) => {
    this.setState({ progress_count: Math.abs(progress.nativeEvent.contentOffset.y / (this.scrollViewContent_height - this.scrollView_height)),scrollTop:false,});
  }
  changemode = () => {
    theme.apply();
    this.setState({ boolean: true })
  }
  
  contentClick() {
    this.setState({ contentVisible: true,scrollTop:false })
    { this.contentsData(this.state.gettypeid, this.state.getpostid) }
  }
  gotoRead(page_order) {
    this.setState({ contentVisible: false })
    console.log('page order ',page_order)
    this.pagecounting=page_order;
    { this.exploredata(this.state.postid,this.state.gettypeid); }
  }
  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'img') {
      const a = node.attribs;
      return (<Image style={{ width: width / 1.5, height: 100 }} resizeMode="cover" source={{ uri: a.src }} />);
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
    this.props.navigation.navigate('profileAbout')
  }
  
  render() {

    return (
      <SafeAreaView style={[styles.container, theme[this.state.modeState].container]}>
      <StatusBar barStyle='dark-content' backgroundColor="#fff" hidden={false} />
   
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
        </View> 
        <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => this.goToAuthorProfile()}>
          <Image style={{ width: 80, height: 50 }} source={{ uri: this.state.avatar != "" ? this.state.avatar : null }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.contentClick()}>
          <Text numberOfLines={2} style={styles.pageTitle}>{this.state.page_url}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.contentClick()}>
          <Image style={{ margin: 2 }} source={require('../assets/img/readingmenu.png')} />
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => this.backpress()}>
        <Image
            style={{ alignSelf: 'center',width:50,height:50 }} 
            source={require('../assets/img/close.png')} />
            </TouchableOpacity>

      </View> 

      {!this.state.contentVisible ?
        <ScrollView
          contentContainerStyle={styles.scroll}
          ref={(c) => {this.scroll = c}}
          onContentSizeChange={(width, height) => { this.scrollViewContent_height = height }}
          onScroll={this.UpdateProgressBar}
          onLayout={(event) => this.scrollView_height = (event.nativeEvent.layout.height)}
          scrollEventThrottle={12} >

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
        </View>:null}
      
      <Modal1 isVisible={this.state.loading}

      // onBackdropPress={() => this.setState({ loading: true })}
      >
        <Image source={require('../assets/gif/logo.gif')} style={{
          alignSelf: 'center',
          width: 140,
          height: 140
        }} />
      </Modal1>
    

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

export default connect(mapStateToProps, mapDispatchToProps)(exploreReadBook);