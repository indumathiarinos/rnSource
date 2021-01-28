import React, { Component } from 'react'
import { View, FlatList,SafeAreaView,
    AsyncStorage,Modal, ImageBackground,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { FloatingAction } from "react-native-floating-action";
import LinearGradient from 'react-native-linear-gradient';
console.disableYellowBox = true;
import HTMLView from 'react-native-htmlview';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import ModalBox from 'react-native-modalbox';
import {keys,getAsyncStorage} from '../asyncStorage';
import {setUniqueValue,collectionId} from '../asyncStorage/constants'
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let value1;
class CollectionDetail extends Component {
    constructor() {
        super();
      this.state = {  
     
        actions: [
            {
                text: "Create Section",
                icon: require("../assets/img/collection/create.png"),
                name: "createSection",
                position: 5
            },
            {
                text: "Merge Section",
                icon: require("../assets/img/collection/merge.png"),
                name: "mergeSection",
                position: 4
            },
            {
                text: "Edit Section",
                icon: require("../assets/img/collection/edit.png"),
                name: "editSection1",
                position: 3
            },
            {
                text: "Remove Section",
                icon: require("../assets/img/collection/remove.png"),
                name: "removeSection",
                position: 2
            },
            {
                text: "Filter Options",
                icon: require("../assets/img/collection/filter.png"),
                name: "sectionFilter",
                position: 1
            }
        ],
        overlayText: false,
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: false,
        newval: 0,
        modalVisible: false,
        mergeModal:false,
        collectionId:'',
        collectionId1:'',
        sectionData:'',
        loading:true,
        getuserid:'',
        avatar:'',
        getDeletedName:'',
        getMergeName:'',
        coll_name:'',
        desc:'',
        toggle:false,
        sectionPins:false,
        SortBy:"DESC",
        coll_img:'',
        secCoverImg:'',
        coll_desc:'',
        readsData:'',
        readsDeletedName:'',
        postPageId:'',
        currentItem:'',
        PostPageTitle:'',
        readsRemovePopup:false,
        editPopup:false,
        getCollectionId:'',
        profileColl:false,
        profile_userid:''
  
      }
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
toggleTab1() {
  this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
  });
  // this.props.changeNavRec();
  this.props.navigation.push('mainpage')
  // this.props.navigation.navigate('MainpageTabs')
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
  this.props.navigation.openDrawer()
}
async componentDidMount() {
  value1 = this.props.navigation.state.params.collId
  ? this.props.navigation.state.params.collId
  : null;
AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
AsyncStorage.getItem('coll_Img').then((val) => this.setState({ coll_img: val })).done();
AsyncStorage.getItem('collectionId').then((value) => this.setState({ collectionId : value })).done();
AsyncStorage.getItem('coll_name').then((value) => this.setState({ coll_name : value })).done();
AsyncStorage.getItem('coll_desc').then((value) => this.setState({ coll_desc : value })).done();
AsyncStorage.getItem('col_id').then((value) => this.setState({ collectionId1 : value })).done();
AsyncStorage.getItem('collSecFilter').then((val) =>this.setState({ SortBy: val })).done();
AsyncStorage.getItem('profileCollection').then((val)=>this.setState({profileColl:val})).done();
AsyncStorage.getItem('profile_userid').then((val)=>this.setState({profile_userid:val})).done();
console.log('value1 ',this.state.collectionId1,value1)

this.setState({collectionId:value1})
// this.props.removePopup();
// this.props.mergePopup();
this.CheckConnectivity();
this.focusListener = this.props.navigation.addListener('willFocus', () => {
  this.setState({loading:true})
  value1 = this.props.navigation.state.params.collId
  ? this.props.navigation.state.params.collId
  : null;

  AsyncStorage.getItem('profileCollection').then((val)=>this.setState({profileColl:val})).done();
  AsyncStorage.getItem('profile_userid').then((val)=>this.setState({profile_userid:val})).done();

//   AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
//   AsyncStorage.getItem('coll_Img').then((val) => this.setState({ coll_img: val })).done();
// AsyncStorage.getItem('collectionId').then((value) => this.setState({ collectionId : value })).done();
AsyncStorage.getItem('collSecFilter').then((val) =>this.setState({ SortBy: val })).done();
this.CheckConnectivity();
   

})
BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
showModal = () => {
  console.log('enters')
  this.setState({
    modalVisible: true
  });
  setTimeout(() => {
      // this.props.changeRemove()
    this.setState({
      modalVisible: false
    })
    this.props.removePopupSection()
  //   this.props.changeRemove();
    }, 3000);
    console.log('modal state is ',this.state.modalVisible)
}
readsRemoveModal = () => {
  this.refs.modal.close();
  console.log('enters')
  this.setState({
    readsRemovePopup: true
  });
  setTimeout(() => {
      // this.props.changeRemove()
    this.setState({
      readsRemovePopup: false
    })
    if(this.state.removeUndo==false){
      {this.deletefunc(this.state.currentItem)}
    }else{
      this.setState({removeUndo:false})
    }
    {this.exploredata(value1)}
    }, 3000);
    console.log('modal state is ',this.state.readsRemovePopup)
}
pressIcon = (item) => {
  let { sectionData } = this.state;
  sectionData = sectionData.map(e => {
      // if (item.id === e.id) {
          // item.like = !e.like;
          AsyncStorage.setItem('sectionId', JSON.stringify(item.SectionID));
          AsyncStorage.setItem('newColl_Id', JSON.stringify(item.CollectionsID));
          if(item.SectionID==0){z
          
            if (item.Type == 4) {
              AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
              AsyncStorage.setItem('postid', JSON.stringify(item.Post_pageID));
              console.log('section post id is', item.Post_pageID,item.Type);
              return this.props.navigation.navigate('readingBook');
            } else if (item.Type == 1) {
              AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
              AsyncStorage.setItem('postid', JSON.stringify(item.Post_pageID));
              console.log('section post id is', item.Post_pageID,item.Type);
              return this.props.navigation.navigate('viewBook');
            } else if (item.Type == 2) {
              AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
              AsyncStorage.setItem('postid', JSON.stringify(item.Post_pageID));
              console.log('section post id is', item.Post_pageID,item.Type);
              return this.props.navigation.navigate('periodiViewBook');
            } else if (item.Type == 3) {
              AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
              AsyncStorage.setItem('postid', JSON.stringify(item.Post_pageID));
              console.log('section post id is', item.Post_pageID,item.Type);
              return this.props.navigation.navigate('seriesViewBook');
            
            }
          }else{
            AsyncStorage.getItem('sectionId').then(val =>console.log('section id to sectiondetail',val)).done;
            AsyncStorage.getItem('newColl_Id').then(val =>console.log('section id to sectiondetail',val)).done;
            AsyncStorage.setItem('sec_name',item.Title);
          return this.props.navigation.navigate('sectionDetail')
          // this.props.navigation.navigate('sectionDetail', {
          //     'collId': item.CollectionsID,
          //     'secId':item.SectionID
          // });
        }
          //   } else if(item.id === 1){
          //     return this.props.navigation.navigate('filter', {
          //       item: item});
          //     }else if(item.id === 2){
          //       return this.props.navigation.navigate('bookmarks', {
          //         item: item});
      // } else {
      //     return e;
      // }
  });
}
secCoverItems({ item }) {
  // const value = item;
  return (
    <View style={{height:150,width:width}}>
          
              <View 
              style={{flexDirection: 'row',width:width,
              height:150}}
              >
                 <Image style={{ height: 150, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image1!=""?null:'#27A291' }}
                        source={{ uri: item.Image1 != "" ? item.Image1 : null }}
                    />
                    <Image style={{ height: 150, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image2!=""?null:'#27A291' }}
                        source={{ uri: item.Image2 != "" ? item.Image2 : null }} />
                    <Image style={{ height: 150, width: width / 5, resizeMode: 'cover', alignItems: 'center',backgroundColor:item.Image3!=""?null:'#27A291', justifyContent: 'center', }}
                        source={{ uri: item.Image3 != "" ? item.Image3 : null }}
                    />
                    <Image style={{ height: 150, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image4!=""?null:'#27A291' }}
                        source={{ uri: item.Image4 != "" ? item.Image4 : null }} />
                    <Image style={{ height: 150, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image5!=""?null:'#27A291' }}
                        source={{ uri: item.Image5 != "" ? item.Image5 : null }} />
              </View>
           
              {/* <View style={{  marginTop: '-20%',
  justifyContent: "center",
  alignItems: "center",backgroundColor:'pink'}}>

              </View> */}
      </View>
  )
}
exploredata(collectionId){
this.setState({loading:true})
console.log('this. collection id is ',this.state.collectionId,collectionId)
var json=JSON.stringify({
  "CollectionID":collectionId ,
"User_ID":!this.state.profileColl?this.state.getuserid:this.state.profile_userid,
"SortBy":this.state.SortBy
});
console.log('json in section page ',json)
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
        this.setState({sectionData: filteredList,loading:false})
        const filteredList1 = responseJson.filter((item) => item.SectionID == 0);

        this.setState({readsData:filteredList1,desc:responseJson[0].Description})
      
        console.log('data is ',this.state.sectionData)

        console.warn(responseJson)
        // console.warn("collection")

        //alert(this.state.data.status)  
    })
    .catch((error) => {
        console.warn(error);
    });
}

// componentWillMount(){
//   value1 = this.props.navigation.state.params.collId
//   ? this.props.navigation.state.params.collId
//   : null;
// }

componentWillUnmount() {
BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
this.focusListener.remove()

}

handleBackButtonClick() {
//   this.backpress()
// this.props.navigation.navigate('collection');
AsyncStorage.setItem('profileCollection',JSON.stringify(false));

this.props.navigation.goBack();
    return true;
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
secCoverData() {
  var json = JSON.stringify({
   "UserID":!this.state.profileColl?this.state.getuserid:this.state.profile_userid,
   "CollectionID":value1
  });
  fetch("http://162.250.120.20:444/Login/CollectionSectionImage",
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
          this.setState({ secCoverImg: responseJson })
          console.warn(responseJson)
          //alert(this.state.data.status)
      })
      .catch((error) => {
          console.warn(error);
      });
}
getData() {
setTimeout(() => {
  console.log('col id in collection detail is ',this.state.collectionId)

  // alert(this.state.collectionId)
  {this.exploredata_Pic(!this.state.profileColl?this.state.getuserid:this.state.profile_userid)}
  {this.secCoverData()}
  // alert("coll id ",this.state.getCollectionId)
  // {this.exploredata(this.state.collectionId)}
  {this.exploredata(value1)}
  console.log(this.state.profile_userid,this.state.profileColl,this.state.getuserid)
        }, 5000)
}

renderItem_card({ item }) {
  // const value = item;
  return (
      <View style={{
          // flex:1,
          width: '50%',
          padding: '2%',
          backgroundColor: '#ffff',
        
      }}>
          <TouchableOpacity
           style={styles.button}
              onPress={() => this.pressIcon(item)}>
            
          {/* three grids images */}
          {item.SectionID==0? <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
              //  onPress={()=>this.press(item)}
              >
                  <Image style={{ width: '95%',  height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                      source={{ uri: item.Image1!=""?item.Image1:null }} />
                     
              </View>:
              <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff',borderRadius:10, }}
              >
                  <Image style={{ width: '75%', height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                      source={{ uri: item.Image1!=""?item.Image1:null }} />
                  <View style={{ flex: 1, flexDirection: 'column', borderLeftWidth: 0.3, borderColor: '#cccccc' }}>
                  <View style={{ borderBottomWidth: 0.3, borderColor: '#cccccc' }}>
                          <Image
                              style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                              source={{ uri: item.Image2!=""?item.Image2:null}} />
                      </View>
                      <View>
                          <Image
                              style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                              source={{ uri: item.Image3!=""?item.Image3:null }} />
                      </View>
                  </View>
              </View>
            }
          
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.pressIcon(item)}>
                 {item.SectionID==0?
            <View style={{ padding: '2%', margin: '1%' }}>
              <Text numberOfLines={2} style={{ fontSize: 16, fontFamily: 'AzoSans-Medium' }}>{item.Page_Post_Title}</Text>
                  <Text style={{ color: '#707070', }}>{item.Author}</Text>
              </View>
           :
             <View style={{ padding: '2%', margin: '1%' }}>
              <Text numberOfLines={2} style={{ fontSize: 16,fontFamily: 'AzoSans-Medium' }}>{item.Title}</Text>
                  <Text style={{ color: '#707070',fontSize: 12,fontFamily: 'AzoSans-Light' }}>{item.PublicationCount} publications</Text>
                  <Text style={{ color: '#707070',fontSize: 12,fontFamily: 'AzoSans-Light' }}>{item.PageCount} pages</Text>
              </View>}
                </TouchableOpacity>
      </View>
  )
}
exploredata_Pic(userid){
this.setState({loading:true})
var json=JSON.stringify({
  'userid':!this.state.profileColl?this.state.getuserid:this.state.profile_userid
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
        this.setState({loading:false})
        console.warn(responseJson)
        for (let i = 0; i <responseJson.length; i++) {
          // alert(this.state.bookdetail[0].Image)
           this.setState({ 
             avatar:responseJson[i].avatar,
          
            })
          }
        //alert(this.state.data.status)  
    })
    .catch((error) => {
        console.warn(error);
    });
}
showModal1 = () => {
  console.log('enters')
  this.setState({
    mergeModal: true
  });
  setTimeout(() => {
      // this.props.changeRemove()
    this.setState({
      mergeModal: false
    })
    this.props.mergePopupSection();
  //   this.props.changeRemove();
    }, 3000);
  //   this.props.mergePopup();
  //   console.log('modal state is ',this.props.mergePopup())
}
descPage = (item) => {
  console.log('feeeddd data is ',item)
  let { readsData } = this.state;
  console.log('items are', item)
  readsData = readsData.map(e => {
    if (item.PK_ID === e.PK_ID) {
      // item.like = !e.like;
    //   AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
    //   AsyncStorage.setItem('postid',JSON.stringify(item.postpage_id));
    //   console.log('sectiondetail post id is',item.postpage_id);
    //   if (item.Type ==4) {
    //       return this.props.navigation.navigate('readingBook');
    //   } else if(item.Type==1){
    //       return this.props.navigation.navigate('viewBook');
    //   } else if(item.Type==2){
    //       return this.props.navigation.navigate('periodiViewBook');
    //   }else if(item.Type==3){
    //       return this.props.navigation.navigate('seriesViewBook');
    //   }
    //   // return this.props.navigation.navigate('viewBook')
    // } else {
    //   return e;
    // }
    AsyncStorage.setItem('typeid',JSON.stringify(Number(item.Type)));
    AsyncStorage.setItem('postid', JSON.stringify(Number(item.Post_pageID)));
    if (item.Type == 4) {
      // AsyncStorage.setItem('pagefeedItem',JSON.stringify(item));
      return this.props.navigation.navigate('readingBook');
    } else if (item.Type == 1) {
          return this.props.navigation.navigate('viewBook');
    } else if (item.Type == 2) {
      return this.props.navigation.navigate('periodiViewBook');
    } else if (item.Type == 3) {
          return this.props.navigation.navigate('seriesViewBook');
    }
  } else {
    return e;
  }
  });
}
deletefunc(item){
  this.setState({loading:true,})

  var json = JSON.stringify({
      "Deleted_for":"CollectionPost",
      "PK_ID":item.PK_ID,
      "user_ID":this.state.getuserid
  });
  console.log('json in sec read ',this.state.readsDeletedName,json)
  fetch("http://162.250.120.20:444/Login/DeleteData",
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
          // if(responseJson.Msg=="Success"){
           
            // this.readsRemoveModal();
            // {this.exploredata(this.state.getuserid)}
          // }
          //  else {
          //    this.setState({loading:false})
          //    this.refs.modal.close()
          //  } 
      })
      .catch((error) => {
          console.warn(error);
      });
}
readsItems({ item }) {
  // const value = item;
  return (
    // <View style={{margin:'2%',}}>
    <TouchableOpacity onPress={()=>this.descPage(item)}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        // width: '50%',
        margin: '2%',
        marginLeft:0,marginRight:0,
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'column',width:width/1.8-40, }}>
          <Text numberOfLines={2} style={{ fontSize: 16,fontFamily:'AzoSans-Medium', color: '#000' }}>{item.Page_Post_Title}</Text>
          <Text numberOfLines={1} style={{ color: '#707070',fontFamily:'AzoSans-Light',fontSize:12,width:width/2.5,marginTop:'1%'
         }}>{item.Author}</Text>
        </View>
        {/* <Image source={item.img} /> */}
        <TouchableOpacity
        onPress={()=>this.descPage(item)}
        style={{borderRadius:15,backgroundColor:'#fff'}} >
        <ImageBackground source={{uri:item.Image1}} 
        imageStyle={{ borderRadius: 15 }}
        style={[item.Type==1?styles.pubImgStyle:styles.pageImgStyle,{borderColor:!item.Image1?'#fff':null}]}
           >
        {!this.state.profileColl?  <TouchableOpacity
            onPress={() => {this.refs.modal.open() 
            this.setState({currentItem:item,readsDeletedName:item.Page_Post_Title,PostPageTitle:item.Page_Post_Title})
            AsyncStorage.setItem('newColl_Id',JSON.stringify(Number(item.CollectionsID)));
            AsyncStorage.setItem('edit_title',item.Page_Post_Title);
          }}>
            <Image style={{ alignSelf:'flex-end', marginRight:'8%', marginTop:'6%' }} source={require('../assets/img/3dots_white.png')} />
          </TouchableOpacity>:null}
        </ImageBackground>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
  )

}
  render() {

      
        return (
            
          <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
          <View style={styles.staticheader}>
          <TouchableOpacity style={{ }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image style={{width:50,height:50}} source={require('../assets/img/backarrow.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center',alignSelf:"center" }}>
          <LinearGradient style={{ borderRadius: 10}} colors={
          ['#24D4BC', '#27A291']}>
            <TouchableOpacity
              onPress={this.headerBtnClk}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  paddingLeft: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  color: 'white',
                  fontSize: 14,
                  fontFamily:'AzoSans-Medium'
                                }}

                >Collections / </Text><Text style={{
                  paddingRight: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 14,
                  fontFamily:'AzoSans-Bold',
                  color: 'white',
                  textDecorationLine: 'underline',
                }}>Sections</Text>
              </View>
            </TouchableOpacity>
                </LinearGradient>
            {/* <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => {
                this.props.navigation.navigate('pins1')
            }}
            >
              <Text style={styles.headerText}

              >Pins</Text>
            </TouchableOpacity> */}

                </View>
          </View>
          <ScrollView style={{marginBottom:'10%'}}>
                    {/* <ImageBackground style={{ width: width, height: 150, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)' }}
                        imageStyle={{
                            opacity: 0.5
                        }}
                        // source={require('../assets/img/collectimg.png')}
                        source={this.state.coll_img!=null?{uri:this.state.coll_img}:require('../assets/img/collectimg.png')}
                        >
                          <TouchableOpacity onPress={()=>this.setState({toggle:!this.state.toggle})}>
                          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>{!this.state.toggle?this.state.coll_name:this.state.desc}</Text>
                          </TouchableOpacity>
                    </ImageBackground> */}
                      <FlatList
                contentContainerStyle={{
                    flex:1,
                    justifyContent:'center',
                    marginBottom:'5%',
                    width:width,
                    height:150
                }}
                    data={this.state.secCoverImg}
                    extraData={this.state}
                    renderItem={this.secCoverItems.bind(this)}
                    // numColumns={2}
                    keyExtractor={(item,index)=>index.toString()}

                    />
                       <View style={styles.overlay}/>
              <View style={{position:'absolute',top:60,alignItems:'center',width:width,justifyContent:'center',}}>
                          <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'AzoSans-Bold', fontSize: 24 }}
                          onPress={()=>this.setState({toggle:!this.state.toggle})}>{!this.state.toggle?this.state.coll_name:this.state.coll_desc}</Text>
                </View>
                    <FlatList
                        contentContainerStyle={{
                            // flex: 1,
                            // marginBottom:this.state.sectionData.length<=2?'60%':'0%',
                            marginTop:'5%',
                          
                            // marginLeft:'5%'
                        }}
                        data={this.state.sectionData}
                        extraData={this.state}
                        renderItem={this.renderItem_card.bind(this)}
                        numColumns={2}
                        removeClippedSubviews={false}
                        enableEmptySections={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {this.state.readsData.length>0?
                    <View style={{alignItems:'center'}}>
                    <Text style={{color:'#000',width:width-40,textAlign:'left',margin:'2%',fontSize: 24,fontFamily: 'Montserrat-Medium'}}>Reads</Text>
                    <View style={{width:width-40,height:1,backgroundColor:'#27A291'}}/>
                    </View>:null}
                    <FlatList
            data={this.state.readsData}
            contentContainerStyle={{ marginTop: '5%',width:width-40,alignSelf:'center'}}
            extraData={this.state}
            renderItem={this.readsItems.bind(this)}
            removeClippedSubviews={false}
            enableEmptySections={false}
            keyExtractor={(item, index) => index.toString()}
          />
                </ScrollView>
                   {!this.state.profileColl?  <FloatingAction
                    style={{ color: '#27A291',fontSize:10,fontFamily:'AzoSans-Regular' }}
                    position={'right'}
                       distanceToEdge={50}
                        ref={(ref) => { this.floatingAction = ref; }}
                        actions={this.state.actions}
                        color={'#24D4BC'}
                        onPressItem={name => {
                          AsyncStorage.setItem('EditCreateSec',JSON.stringify(false));
                          this.props.navigation.navigate(name,{'collId':value1});
                          console.log(`selected button: ${name}`);
                        }}
                    />:null}
        
          <Modal1 isVisible={this.state.loading} >
                            <Image source={require('../assets/gif/logo.gif')} style={{
                                alignSelf: 'center',
                                width: 140,
                                height: 140
                            }} />
          </Modal1>
          <ModalBox
          style={[styles.modal, styles.modal5]}
          position={'bottom'}
          ref={'modal'}
          backdrop={true}
          isDisabled={this.state.isDisabled}>
          <View style={{
           alignItems: 'center', justifyContent: 'center'
          }}>
            {/* <TouchableOpacity onPress={this._toggleModal} >
              <Text style={styles.modaltext}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.refs.toast.show('Copied link to clipboard'),
                  this.refs.modal5.close()
              }}
            >
              <Text style={styles.modaltext}>Copy Link</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.bottombtn} onPress={() =>{
              this.refs.modal.close();
              this.props.navigation.navigate('sectionEdit')}
             } >
            <View style={{ flexDirection: 'row',alignItems:'center', width:width,justifyContent:'center' }}>
    <Image style={styles.iconwidth} source={require('../assets/img/pencil.png')} />
    <Text style={styles.modaltext}>Edit</Text>
  </View>
              {/* <Text style={styles.modaltext}>Edit</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottombtn} onPress={()=>this.readsRemoveModal()}>
            <View style={{ flexDirection: 'row',alignItems:'center', width:width,justifyContent:'center' }}>
            <Image source={require('../assets/img/editRemove.png')} />
              <Text style={styles.modaltext}>Remove</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottombtn1} onPress={()=>this.refs.modal.close()}>

              <Text style={styles.modaltext1}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ModalBox>
        
        <Modal
          animationType="slide"
          transparent
          visible={this.state.readsRemovePopup}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            
            <View style={{
          left:0,right:0,bottom:0,position:'absolute',   
          height:'8%',
          backgroundColor: 'red',
          flexDirection:'row',
          widt:width-10,
          
          padding:'1%',
         }}>
           <View style={{flexDirection:'row',width:'85%',margin:'1%',alignSelf:'center',  alignItems: 'center',
          justifyContent:'center',}}>
           <Text  style={{fontSize: 17,marginLeft:'2%',textAlign:'center', color: 'white',alignSelf:'center',}}>Removed - </Text>
           <Text numberOfLines={2} style={{ fontSize: 17,textAlign:'left', color: '#fff',textAlign:'left'}}> 
          {this.state.readsDeletedName}
          </Text>
          {/* {this.state.deletedName.length>25?<Text numberOfLines={2} style={{ fontSize: 17,textAlign:'left', color: '#fff',width:width-120,}}> {this.state.deletedName}</Text>:null} */}
           </View>
           
          <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'2%',}} onPress={()=>this.setState({removeUndo:true})}>
            <Text style={{fontSize: 16,color:'white',width:50,textDecorationLine:'underline',textAlign:'center'}}>Undo</Text>
         </TouchableOpacity>
       </View>
          </Modal>
                 <View style={styles.bottomBar}>
                        <TouchableOpacity
                            style={styles.tabsss}
                            onPress={() => this.toggleTab1()}>
     <Image style={{width:25,height:25}} source={require('../assets/img/logo.png')} />
                            {/* <Text>Home</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
                        <Image style={{ width: 50, height: 40 }} source={require('../assets/img/green_coll_icon.png')} />
                        {/* <Text>Collection</Text> */}
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
                        <Image style={{width:50,height:50,marginTop:5}} source={require('../assets/img/search.png')} />

                            {/* <Text>Search</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabsss,{ width: 28, height: 28,borderRadius:28/2,borderColor:'#27A291',borderWidth:1}]} onPress={() => this.toggleTab4()}>
                            {/* <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} > */}
                            {/* <TouchableOpacity onPress = {() =>navigation.openDrawer() }>  */}
                            <Image style={{ width: 28, height: 28,borderRadius:28/2 }} source={{uri:this.state.avatar}}></Image>
                            {/* <Text>Menu</Text> */}
                            {/* </Drawer> */}
                        </TouchableOpacity>
                   
                 </View>
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
  bottombtn1:{
    width:width,
    alignItems:'center',
    backgroundColor:'#E74C3C'
  },
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  iconwidth:{
    width:20,
    height:20,
  },
  iconwidth1:{
    width:30,
    height:30,

  },
  modaltext: {
    margin:'3%',
    // padding: '3%',
    width:width/4.2,
    textAlign:'center',
    marginLeft:'0%',
    fontSize: 16,
    fontFamily:'AzoSans-Regular',
    color: '#707070'
  },
  modaltext1: {
    margin:'3%',
    marginLeft:'7%',
    // padding: '3%',
    color: '#fff',
    fontSize: 16,
    fontFamily:'AzoSans-Regular',
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
  modal5: {
    // flex: 0.22,
    width: width,
    height:140,
  },
  modal2: {
    flex: 0.2,
    // width: width,
  },
  pubImgStyle:{ 
    // elevation:1,
    width: 130, height: 150,
    borderRadius:15
    // alignItems:'center',
    //  jsutifyContent: 'center'
     },
     pageImgStyle:{ 
      // elevation:1,
      width: 130, height: 100,
      borderRadius:15
      // alignItems:'center',
      //  jsutifyContent: 'center'
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
    // tabsss:{
    //     margin:'2%'
    // },
    tabsss: {
      alignItems: 'center', justifyContent: 'center'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 50,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    staticheader: {
        // paddingRight:'2%',
        flexDirection: 'row',
        // justifyContent: 'center', 
        alignItems: 'center',
        // height: '8%',
        // marginTop:0.5,
        // marginBottom:0.5,
        backgroundColor: '#ffff',
        elevation: 1,
        borderBottomColor:'#707070'


    },
    activeText: {
        padding: '5%',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: '25%',
        left: 0,
        right: 0,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.7,
      backgroundColor: 'black',
      width: width,
      height:150
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
    },
    bottomLine: {
        height: '8%',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#00000029'

    },
})
function mapStateToProps(state) {
    return {
        sectionMerge:state.apiReducer.sectionMerge,
        sectionRemove:state.apiReducer.sectionRemove,
       
    }
}


function mapDispatchToProps(dispatch) {
    return {
        mergePopupSection:()=>dispatch({type:'MERGE_POPUP_SECTION'}),
        removePopupSection:()=>dispatch({type:'REMOVE_POPUP_SECTION'}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);