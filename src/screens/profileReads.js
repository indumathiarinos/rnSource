import React, { Component } from 'react'
import {
  View,Modal,SafeAreaView,ImageBackground,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid,AsyncStorage
} from 'react-native'
import { connect } from "react-redux";
import ModalBox from 'react-native-modalbox';
import BlurModal from '../components/blurModal';
import Modal1 from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')
// let colvalue,secvalue;
const height = Dimensions.get('window').height;
let list;
class ProfileReads extends Component {
  constructor() {
    super();

  this.state = {
    list: [
      {
        id: 0,
        bgcolor: "#569BE0",
        img: require('../assets/img/lion.png'),
        title: "The King Without a Crown",
        publications: '4 publications',
        pages: '3 pages',
        subtitle: "David Attenbodo"
      },
      {
        id: 1,
        bgcolor: "#7C3BD3",
        img: require('../assets/img/elephant.png'),
        title: "Ellie the Elephant",
        publications: '4 publications',
        pages: '3 pages',
        subtitle: "Austin McGuyver"
      },
      {
        id: 2,
        bgcolor: "#EB9A17",
        img: require('../assets/img/cheetah.png'),
        title: "The New King in the Wild",
        subtitle: "Jabro Kanovski"
      },
      {
        id: 3,
        bgcolor: "#EB9A17",
        img: require('../assets/img/dog.png'),
        title: "Cats in the Wild",
        subtitle: "Frances Theron"
      }
    ],
    toastvisible: false,
    readsData:'',
    sectionId:'',
    modalVisible1:false,
    getuserid:'',
    loading:true,
    deletedName:'',
    coll_id:'',
    currentItem:'',
    coll_post_id:'',
    coll_name:'',
    sec_name:'',
    editPopup:false,
    title:'',
    editPopupState:false,
    collectionId:'',
    coll_img:'',
    secCoverImg:'',
    editSourceName:'',
    removeUndo:false,
    profileColl:false,
    profile_userid:''
    
    
  }
  
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
exploredata(userid){
  var json=JSON.stringify(
    {"UserID":userid,"SectionID":this.state.sectionId,"CollectionID":this.state.collectionId}
    );
    console.log('json log section read ',json)
    fetch("http://162.250.120.20:444/Login/SectionRead",
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
          this.setState({readsData: responseJson,loading:false})
          // console.log('this. sectionId id is ',secvalue)

          console.log('data is ',this.state.readsData)

          console.warn(responseJson)
          // console.warn("collection")

          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}
async componentDidMount() {
  // colvalue = this.props.navigation.state.params.collId
  // ? this.props.navigation.state.params.collId
  // : null;
  // secvalue = this.props.navigation.state.params.secId
  // ? this.props.navigation.state.params.secId
  // : null;
  // console.log(secvalue,colvalue,'section read')
  // AsyncStorage.setItem('sDetail_collId',colvalue);
  // AsyncStorage.setItem('sDetail_secId',secvalue);
//   AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
  AsyncStorage.getItem('sectionId').then(val =>this.setState({ sectionId: val })).done;
  AsyncStorage.getItem('newColl_Id').then(val =>this.setState({ collectionId: val })).done;
  console.log('this. sectionId id is ',this.state.collectionId,this.state.sectionId)
  AsyncStorage.getItem('coll_name').then((value) => this.setState({ coll_name : value })).done();
  AsyncStorage.getItem('sec_name').then((value) => this.setState({ sec_name : value })).done();
  AsyncStorage.setItem('collSecFilter',"DESC");
  AsyncStorage.getItem('coll_Img').then((val) => this.setState({ coll_img: val })).done();
  AsyncStorage.getItem('profileCollection').then((val)=>this.setState({profileColl:val})).done();
  AsyncStorage.getItem('profile_userid').then((val)=>this.setState({profile_userid:val})).done();
  this.CheckConnectivity();
  this.focusListener = this.props.navigation.addListener('willFocus', () => {
    AsyncStorage.getItem('profile_userid').then((val)=>this.setState({profile_userid:val})).done();

       this.CheckConnectivity();

})
BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
secCoverData() {
  var json = JSON.stringify({
   "UserID":this.state.profile_userid,
  //  !this.state.profileColl?this.state.getuserid:this.state.profile_userid,
   "CollectionID":this.state.collectionId,
   "SectionID":this.state.sectionId
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
getData(){
  setTimeout(() => {
    //   alert(this.state.profile_userid)
    // console.log('get sectionid in sectionDetail book page ',secvalue)
    {this.secCoverData()}
      {this.exploredata(this.state.profile_userid)}
      
  }, 1000);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  this.focusListener.remove()

}
handleBackButtonClick() {
  // this.backpress();
  this.props.navigation.navigate('collectionDetail',{'collId':this.state.collectionId});
      return true;
} 
  toast = () => {
    this.setState({ toastvisible: true })

  }
  pressIcon = (item) => {
    let { list } = this.state;
    list = list.map(e => {
      if (item.id === e.id) {
        // item.like = !e.like;
        return this.props.navigation.navigate('viewBook');
        //   } else if (item.id === 1) {
        //     return this.props.navigation.navigate('filter', {
        //       item: item
        //     });
        //   } else if (item.id === 2) {
        //     return this.props.navigation.navigate('bookmarks', {
        //       item: item
        //     });
      } else {
        return e;
      }
    });
  }
  showModal = () => {
    this.setState({
      modalVisible1: true
    });
    this.refs.modal.close();
    setTimeout(() => {
      this.setState({
        modalVisible1: false
      })
      
      if(this.state.removeUndo==false){
        {this.deletefunc(this.state.currentItem)}
      }else{
        this.setState({removeUndo:false})
      }
      }, 3000);
  }
  
  descPage = (item) => {
    console.log('feeeddd data is ',item)
    let { readsData } = this.state;
    console.log('items are', item)
    readsData = readsData.map(e => {
      if (item.section_id === e.section_id) {
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
      if (item.Type == 4) {
        // AsyncStorage.setItem('pagefeedItem',JSON.stringify(item));
        AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
        AsyncStorage.setItem('postid', item.postpage_id);
        return this.props.navigation.navigate('readingBook');
      } else if (item.Type == 1) {
        AsyncStorage.setItem('typeid',JSON.stringify(item.Type));
        AsyncStorage.setItem('postid',item.postpage_id);

        return this.props.navigation.navigate('viewBook');
      } else if (item.Type == 2) {
        AsyncStorage.setItem('typeid', item.Type);
        AsyncStorage.setItem('postid', item.postpage_id);

        return this.props.navigation.navigate('periodiViewBook');
      } else if (item.Type == 3) {
        AsyncStorage.setItem('typeid', item.Type);
        AsyncStorage.setItem('postid', item.postpage_id);
        return this.props.navigation.navigate('seriesViewBook');
      }
    } else {
      return e;
    }
    });
  }
  renderItem_card({ item }) {
    // const value = item;
    return (
      // <View style={{margin:'2%',}}>
      <TouchableOpacity onPress={()=>this.descPage(item)}>
        <View style={{
          flex: 1,
          // height:210,
          margin:'2%',
          marginLeft:20,marginRight:20,
          flexDirection: 'row',
          // width: '50%',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'column',width:width/1.8,  }}>
            <Text numberOfLines={2} style={{ fontSize: 16,fontFamily:'AzoSans-Medium', color: '#000', }}>{item.Title}</Text>
            <Text numberOfLines={1} style={{ color: '#707070',fontFamily:'AzoSans-Light',fontSize:12}}>{item.Author}</Text>
          </View>
          {/* <Image source={item.img} /> */}
          <TouchableOpacity
          onPress={()=>this.descPage(item)}
          style={[styles.button,{height:item.Type==4?height/7.5:height/4}]} >
          <ImageBackground source={{uri:item.Image}} 
          imageStyle={{ borderRadius: 15 }}
          style={[item.Type==4?styles.pageImgStyle:styles.pubImgStyle,{borderColor:!item.Image?'#fff':null}]}
             >
               {/* {!this.state.profileColl? */}
            {/* <TouchableOpacity
              onPress={() => {
                this.refs.modal.open() 
                AsyncStorage.setItem('coll_postid',JSON.stringify(Number(item.collection_post_id)))
              this.setState({currentItem:item,deletedName:item.Title,title:item.Title,})
              AsyncStorage.setItem('edit_title',item.Title);
              AsyncStorage.setItem('coll_Edit',JSON.stringify(false))
              // alert(item.title)
             }}>
              <Image style={{ alignSelf:'flex-end', marginRight:'8%', marginTop:'6%' }} source={require('../assets/img/3dots_white.png')} />
            </TouchableOpacity> */}
             {/* :null} */}
          </ImageBackground>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
    )

  }
  backpress = () => {
    //    console.log('before set',this.props.nav)
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs')
    this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
  }
  deletefunc(item){
    this.setState({loading:true,})

    var json = JSON.stringify({
        "Deleted_for":"CollectionPost",
        "PK_ID":item.collection_post_id,
        "user_ID":this.state.profile_userid
    });
    console.log('json in sec read ',this.state.deletedName,json)
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
              this.refs.modal.close();
              {this.exploredata(this.state.profile_userid)}
              // this.showModal();
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
  secCoverItems({ item }) {
    // const value = item;
    return (
      <View style={{flex:1, height:height/4,width:width}}>
            
                <ImageBackground 
                style={{flexDirection: 'row' }}
                >
                    <Image style={{  height:height/4,width:width/5, resizeMode: 'cover',}}
                        source={{ uri: item.Image1!=""?item.Image1:null }}
                         />
                    <Image style={{  height:height/4,width:width/5, resizeMode: 'cover', }}
                        source={{ uri: item.Image2!=""?item.Image2:null }} />
                   <Image style={{  height:height/4,width:width/5, resizeMode: 'cover',alignItems:'center',justifyContent:'center',}}
                      source={{ uri: item.Image3!=""?item.Image3:null }} 
                      // source={this.state.coll_img!=null?{uri:this.state.coll_img}:require('../assets/img/collectimg.png')}
                      />
                    <Image style={{  height:height/4,width:width/5, resizeMode: 'cover',}}
                        source={{ uri: item.Image4!=""?item.Image4:null }} />
                    <Image style={{  height:height/4,width:width/5, resizeMode: 'cover', }}
                        source={{ uri: item.Image5!=""?item.Image5:null }} />
  
                </ImageBackground>
                <View style={styles.overlay}/>

                <View style={{position:'absolute',top:60,alignItems:'center',width:width,justifyContent:'center',}}>
                <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'AzoSans-Bold', fontSize: 24 }}>{!this.state.toggle?this.state.coll_name:this.state.desc}</Text>
                            <View style={styles.divider}></View>
                             <Text style={{ textAlign: 'center', color: 'white', marginTop: '2%', fontSize: 20,fontFamily:'AzoSans-Medium' }}>{this.state.sec_name}</Text>

                </View>
                {/* <View style={{  marginTop: '-20%',
    justifyContent: "center",
    alignItems: "center",backgroundColor:'pink'}}>
  
                </View> */}
        </View>
    )
  }
  
  render() {
    // AsyncStorage.getItem('sectionEditPopup').then((value) => this.setState({ editPopupState : value })).done();
    // if(this.state.editPopupState==true){
    //   setTimeout(
    //     () =>
    //       this.showModal1(),

    //     1000
    //   );

    //   AsyncStorage.setItem('sectionEditPopup', false);    }  

    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 3, backgroundColor: '#ffff' }}>

        <View style={styles.staticheader}>
          <TouchableOpacity style={{ padding: '1%' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image style={{width:50,height:30}} source={require('../assets/img/backarrow.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width-50, justifyContent: 'center', alignItems: 'center',}}>
          <TouchableOpacity
            style={{ borderRadius: 10,backgroundColor:'#27A291',marginRight:50}}
              onPress={this.headerBtnClk}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  paddingLeft: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'AzoSans-Medium'
                }}

                >Collections/ </Text><Text style={{
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'AzoSans-Medium',
                  textDecorationLine: 'underline',
                }}>Sections</Text>
                <Text style={{
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 14,
                  color: 'white',
                }}>/ </Text>
                <Text style={{
                  paddingRight: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'AzoSans-Bold',
                  textDecorationLine: 'underline',
                }}>Reads</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {/* <ImageBackground style={{ width: width, height: 150, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.9)', marginBottom: '3%' }}
            imageStyle={{
              opacity: 0.2
            }}
            // source={require('../assets/img/lion.png')}
            source={this.state.coll_img!=null?{uri:this.state.coll_img}:require('../assets/img/lion.png')}

            >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 25 }}>{this.state.coll_name}</Text>
            <View style={styles.divider}></View>
            <Text style={{ textAlign: 'center', color: 'white', marginTop: '2%', fontSize: 22 }}>{this.state.sec_name}</Text>

          </ImageBackground> */}
        <FlatList
                contentContainerStyle={{
                    flex:1,
                    justifyContent:'center',
                    marginBottom:'1%'
                }}
                    data={this.state.secCoverImg}
                    extraData={this.state}
                    renderItem={this.secCoverItems.bind(this)}
                    // numColumns={2}
                    keyExtractor={(item,index)=>index.toString()}

                    />  

                    {/* <View style={{ flex: 1,flexDirection: 'row', justifyContent: 'center',justifyContent: 'space-around',padding:'2%' }}>       
          <TouchableOpacity
          style={{ padding: '3%',borderRadius:30, alignItems: 'center',backgroundColor:'#fff',elevation:3,width:width/2-50,height:height/12 }} 
            onPress={() => this.props.navigation.navigate('editSection')}>
            <View style={{ flexDirection: 'column',alignItems:'center' }}>
              <Image source={require('../assets/img/pencil.png')} />
              <Text>Edit Section</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          style={{ padding: '3%',borderRadius:30, alignItems: 'center',backgroundColor:'#fff',elevation:3,width:width/2-50,height:height/12 }} 
            onPress={() => this.props.navigation.navigate('filter')}>
            <View style={{ flexDirection: 'column',alignItems:'center' }}>
              <Image source={require('../assets/img/filter.png')} />
              <Text >Filter</Text>
            </View>
          </TouchableOpacity>
                  </View> */}

          <FlatList
            data={this.state.readsData}
            contentContainerStyle={{ marginTop: '1%',width:width,alignSelf:'center'}}
            extraData={this.state}
            renderItem={this.renderItem_card.bind(this)}
            removeClippedSubviews={false}
            enableEmptySections={false}
            keyExtractor={(item, index) => index.toString()}
          />
          <View>
          </View>
        </ScrollView>
        <ModalBox
          style={[styles.modal, styles.modal5]}
          position={'bottom'}
          ref={'modal'}
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
            <TouchableOpacity style={styles.bottombtn} onPress={()=>this.showModal()}>
            <View style={{ flexDirection: 'row',alignItems:'center', width:width,justifyContent:'center' }}>
            <Image style={styles.iconwidth1} source={require('../assets/img/editRemove.png')} />
              <Text style={styles.modaltext}>Remove</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottombtn1} onPress={()=>this.refs.modal.close()}>

              <Text style={styles.modaltext1}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ModalBox>
       
        <BlurModal visible={this.state.modalVisible1}
          children={
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
          {this.state.deletedName}
          </Text>
          {/* {this.state.deletedName.length>25?<Text numberOfLines={2} style={{ fontSize: 17,textAlign:'left', color: '#fff',width:width-120,}}> {this.state.deletedName}</Text>:null} */}
           </View>
           
          <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'3%',bottom:5}} onPress={()=>this.setState({removeUndo:true})}>
            <Text style={{fontSize: 16,color:'white',width:50,textDecorationLine:'underline',textAlign:'center'}}>Undo</Text>
         </TouchableOpacity>
       </View>}
         />
          <Modal1 isVisible={this.state.loading}
        
        // onBackdropPress={() => this.setState({ loading: true })}
        >
               <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                width: 140,           
                      height: 140
                      }} />
                </Modal1>
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
  bottombtn:{
    width:width,
    alignItems:'center',
  },  
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    width: width,
    height:height/4
  },
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
    // width:30,
    // height:30,

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
  modal5: {
    // flex: 0.22,
    width: width,
    height:140,
  },
  modal2: {
    flex: 0.2,
    // width: width,
  },
  staticheader: {
    // paddingLeft: '2%',
    // paddingRight:'2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '9%',
    width:width,
    // backgroundColor:'pink',
    backgroundColor: '#ffff',
    elevation: 1

  },

  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider: {
    width: width / 2.5,
    alignSelf: 'center',
    padding: '1%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: '25%',
    left: 0,
    right: 0,
  },
  backdrop: {
    //   flex:0.5,
    //   marginTop:'5%'

  },
  button: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius:15,
   
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
  }
})
function mapStateToProps(state) {
  return {
    nav: state.apiReducer.nav,
    secEditPopup:state.apiReducer.secEditPopup
  }
}


function mapDispatchToProps(dispatch) {
  return {
    secEditPopupFunc:()=>dispatch({type:'SEC_EDIT_POPUP'}),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileReads);