
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
      Dimensions,
  BackHandler,
  SafeAreaView,
  LayoutAnimation,
  ScrollView,
  AsyncStorage,
  FlatList,

} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import ModalBox from 'react-native-modalbox';
import Modal1 from 'react-native-modal';
import { Avatar, Divider } from 'react-native-elements';
import { connect } from "react-redux";
import BlurModal from '../components/blurModal';
import Share from 'react-native-share';
import Icons from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShareIcon from 'react-native-vector-icons/EvilIcons'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class PreView extends Component {
  constructor(props){
    super(props);
    this.state={
      showBar:false,
      showlikeImg:false,
      popupModal:false,
      collectionPopup:false,
      collectionModal:false,
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
      popup_title:'',
      likeStatus:false,
      user_id:'',
      author:'',
      title:'',
      img:'',
      undo:false,
      likecount:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    AsyncStorage.getItem('likestatus').then((value) => this.setState({ likeStatus: value })).done();
    this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
  getData(){
    setTimeout(() => {
      this.exploredata(this.state.gettypeid,this.state.getpostid)
    }, 1000);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.backpress();
    return true;
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
  likeClick(id) {
    // let selected;
   
        this.setState({ loading: true })
        var json = JSON.stringify({ "UserID": this.state.getuserid, "Post_Page_ID": id,"TypeID":this.state.gettypeid });
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
            {responseJson[0].Message == 'Like'? this.notifyAdd(this.state.user_id,this.state.author,this.state.getpostid,this.state.title):null}
            { this.exploredata(this.state.gettypeid,this.state.getpostid) }

            // this.setState({ likeStatus:responseJson[0].Message=='Unlike'?false:true })
            // console.log('like service called');
          })
          .catch((error) => {
            console.warn(error);
          });     
    
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
    // cons
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
  gotoCollSec() {
    AsyncStorage.setItem('coll_name',this.state.popup_title);
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
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    { this.collData(this.state.getuserid) };

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
  backpress=()=>{
      //  this.props.changeN0avNews();
      //  this.props.navigation.navigate('viewBook',{item:'1'})
      this.props.navigation.goBack();
   }
   commentClick(){
    AsyncStorage.setItem('typeid',JSON.stringify(Number(this.state.gettypeid)));
    AsyncStorage.setItem('postid',JSON.stringify(Number(this.state.getpostid)));
    console.log('this typeid postid ',this.state.gettypeid,this.state.getpostid)
    this.props.navigation.navigate('comments')
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
       
        this.setState({
          img: responseJson[0].Image,
          title: responseJson[0].Title,
          author: responseJson[0].username,
          user_id: responseJson[0].user_id,
          exists: responseJson[0].Readstatus == 'N' ? false : true,
          likeStatus: responseJson[0].Likestatus == 'Y'?true:false,
          likecount:responseJson[0].likecount
                })
 
      })
      .catch((error) => {
        console.warn(error);
      });
  }
   imgPress=()=>{
    this.props.navigation.navigate('socialmedia')
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
  render() {
   let value = this.props.navigation.state.params.name
    ? this.props.navigation.state.params.name
    : false;
    let title=this.props.navigation.state.params.title?this.props.navigation.state.params.title:null
    console.log('img data is ',value);

    // const value = this.props.navigation.getParam('photo');
    return (
     
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#000',
        alignContent: 'center', justifyContent: 'center'
      }}
      >
         <TouchableOpacity style={{position:'absolute',height:"8%",top:0,left:0,right:0}} onPress={()=>this.setState({showBar:!this.state.showBar})}/>
       {!this.state.showBar?null:
        <View style={{flexDirection:'row',position:'absolute',height:"8%",top:0,left:0,right:0,backgroundColor:'#000'}}>
          <Text style={{color:'#fff',marginLeft:'2%',alignSelf:'center',fontSize:20,fontFamily:'Montserrat-Bold',textAlign:'center',width:width-50,}}>{title}</Text>
         <TouchableOpacity style={{marginRight:'2%',alignItems:'center',justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('viewBook')}>
          <Image style={{width:50,height:40,marginRight:40}} source={require('../assets/img/close-button.png')}/>
          </TouchableOpacity>
        </View>}
        <Image 
        style={{ width: '100%', height: '80%', alignSelf: 'center' }}
          // source={{uri:value}}
          source={{uri:this.state.img}}
          >
        </Image>
        <TouchableOpacity style={{position:'absolute',height:"8%",bottom: 0,left:0,right:0}} onPress={()=>this.setState({showBar:!this.state.showBar})}/>

        {!this.state.showBar?null:
         <View style={styles.bottomBar}>
         <TouchableOpacity
           onPress={() => this.likeClick(this.state.getpostid)}
         >
   <Icons name={this.state.likeStatus ? 'like1' : 'like2'}
                size={20}
                style={{ alignSelf: 'center' }}
                color={this.state.likeStatus ? '#fff' : '#fff'}
              />
               {this.state.likeStatus? <Text style={{
                color:
                this.state.likeStatus? '#fff' :
                    '#fff',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>{this.state.likecount} Like</Text>:<Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Like</Text>}
         </TouchableOpacity>
         <TouchableOpacity
           onPress={() => this.commentClick()}
         >
          <MaterialIcon name={'comment-text-outline'}
                size={20}
                style={{ alignSelf: 'center' }}
                //  style={{marginLeft:15,marginBottom:3}}
                color={
                  //  item.Likestatus=='Y'?'#27A291':
                  '#fff'}
              />
              <Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Comment</Text>
         </TouchableOpacity>
         <TouchableOpacity
                 onPress={()=>this.setState({collectionModal:true})}
         >
         <Icons name={'plus'}
  size={20}
  style={{alignSelf:'center'}}
  color={'#fff'}
  />
  <Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Add to</Text>
         </TouchableOpacity>
         <TouchableOpacity 

           onPress={() =>this.setState({shareModal:true})}
         >
<ShareIcon name={'share-google'}
  size={25}
  style={{alignSelf:'center'}}
  color={'#fff'}
  />   
  <Text style={{
                color:'#707070',fontFamily: 'AzoSans-Regular',fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
              }}>Share</Text>   
     </TouchableOpacity>
       </View>
       }
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
        <BlurModal
        visible={this.state.popupModal}
        children={ <View style={{
          left: 0, right: 0, bottom: 0, position: 'absolute',
          height: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#27A291',
        }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Added to {this.state.getsecColName} -</Text>
          <TouchableOpacity onPress={() => this.gotoCollSec()}>
            <Text style={{ fontSize: 16, color: '#fff', padding: '2%', textDecorationLine: 'underline' }}>{this.state.popup_title}</Text>

          </TouchableOpacity>
        </View>}
        />
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
                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', width: width / 1.4 }}>{!this.state.exists ? "Added to ReadLater" : "Already Added in ReadLater"}</Text>
                <TouchableOpacity onPress={() => this.setState({ undo: true })}>
                  <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
                </TouchableOpacity>
              </View>
            } />
          : null}
      </SafeAreaView>
    );
  }
}
const styles=StyleSheet.create({
  bottomBar: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: '3%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  group:{
    width:40,
    height:40,
  },
})

const mapStateToProps = state => ({
  nav: state.apiReducer.nav,
  collSec: state.apiReducer.collSec

});


function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
    collSecPopup: () => dispatch({ type: 'COLLSEC_POPUP' }),
    savelogin: ()=> dispatch({type:'CHECKLOGIN'}),
    savelogout: ()=> dispatch({type:'CHECKLOGOUT'})


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PreView);