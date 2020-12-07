import React, { Component } from 'react'
import {
  View,Modal,SafeAreaView,ImageBackground,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid,AsyncStorage
} from 'react-native'
import { connect } from "react-redux";
import ModalBox from 'react-native-modalbox';
import Toast from 'react-native-easy-toast';
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
class SectionDetail extends Component {
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
componentDidMount() {
  // colvalue = this.props.navigation.state.params.collId
  // ? this.props.navigation.state.params.collId
  // : null;
  // secvalue = this.props.navigation.state.params.secId
  // ? this.props.navigation.state.params.secId
  // : null;
  // console.log(secvalue,colvalue,'section read')
  // AsyncStorage.setItem('sDetail_collId',colvalue);
  // AsyncStorage.setItem('sDetail_secId',secvalue);
  AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
  AsyncStorage.getItem('sectionId').then(val =>this.setState({ sectionId: val })).done;
  AsyncStorage.getItem('newColl_Id').then(val =>this.setState({ collectionId: val })).done;
  console.log('this. sectionId id is ',this.state.collectionId,this.state.sectionId)
  AsyncStorage.getItem('coll_name').then((value) => this.setState({ coll_name : value })).done();
  AsyncStorage.getItem('sec_name').then((value) => this.setState({ sec_name : value })).done();
  // {this.getData()}
  // alert(this.state.collectionId)
  AsyncStorage.getItem('coll_Img').then((val) => this.setState({ coll_img: val })).done();

  this.CheckConnectivity();
  
  this.focusListener = this.props.navigation.addListener('willFocus', () => {
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
    AsyncStorage.getItem('sectionId').then(val =>this.setState({ sectionId: val })).done;
    AsyncStorage.getItem('newColl_Id').then(val =>this.setState({ collectionId: val })).done;
    console.log('this. sectionId id is ',this.state.collectionId,this.state.sectionId)
    AsyncStorage.getItem('coll_name').then((value) => this.setState({ coll_name : value })).done();
    AsyncStorage.getItem('sec_name').then((value) => this.setState({ sec_name : value })).done();
    // {this.getData()}
    // alert(this.state.collectionId)
    AsyncStorage.getItem('coll_Img').then((val) => this.setState({ coll_img: val })).done();
  
    this.CheckConnectivity();
//     AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
//   AsyncStorage.getItem('sectionId').then(val =>this.setState({ sectionId: val })).done;
//   AsyncStorage.getItem('newColl_Id').then(val =>this.setState({ collectionId: val })).done;
//   AsyncStorage.getItem('coll_Img').then((val) => this.setState({ coll_img: val })).done();
//   console.log('this. sectionId id is ',this.state.collectionId,this.state.sectionId)
//   AsyncStorage.getItem('coll_name').then((value) => this.setState({ coll_name : value })).done();
//   AsyncStorage.getItem('sec_name').then((value) => this.setState({ sec_name : value })).done();
//     this.CheckConnectivity();
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
   "UserID":this.state.getuserid,
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
    // console.log('get sectionid in sectionDetail book page ',secvalue)
    {this.secCoverData()}
      {this.exploredata(this.state.getuserid)}
  }, 3000);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // this.focusListener.remove()

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
      {this.exploredata(this.state.getuserid)}
      }, 5000);
  }
  showModal1 = () => {
    console.log('enters')
    this.setState({
      editPopup: true
    });
    setTimeout(() => {
      // this.props.changeRemove()
      this.setState({
        editPopup: false,
      })
      // AsyncStorage.setItem('sectionEditPopup',false)
      //   this.props.changeRemove();
    }, 5000);
    console.log('modal state is ', this.state.popupModal)
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
          flexDirection: 'row',
          // width: '50%',
          margin: '2%',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'column',width:width/1.8, }}>
            <Text style={{ fontSize: 18, color: '#000' }}>{item.Title}</Text>
            <Text style={{ color: '#707070' }}>{item.Author}</Text>
          </View>
          {/* <Image source={item.img} /> */}
          <TouchableOpacity
          onPress={()=>this.descPage(item)}
          style={{borderRadius:15,backgroundColor:'#fff'}} >
          <ImageBackground source={{uri:item.Image}} 
          imageStyle={{ borderRadius: 15 }}
          style={[item.Type==1?styles.pubImgStyle:styles.pageImgStyle,{borderColor:!item.Image?'#fff':null}]}
             >
            <TouchableOpacity
              onPress={() => {this.refs.modal.open() 
              this.setState({currentItem:item,deletedName:item.Title,title:item.Title})}}>
              <Image style={{ alignSelf:'flex-end', marginRight:'8%', marginTop:'6%' }} source={require('../assets/img/3dots_white.png')} />
            </TouchableOpacity>
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
        "user_ID":this.state.getuserid
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
              this.showModal();
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
      <View style={{flex:1, height:150,width:width}}>
            
                <ImageBackground 
                style={{flexDirection: 'row' }}
                >
                    <Image style={{  height:150,width:width/5, resizeMode: 'cover',}}
                        source={{ uri: item.Image1!=""?item.Image1:null }}
                        //  source={{uri:'data:image/jpeg;base64,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'}}
                         />
                    <Image style={{  height:150,width:width/5, resizeMode: 'cover', }}
                        source={{ uri: item.Image2!=""?item.Image2:null }} />
                   <Image style={{  height:150,width:width/5, resizeMode: 'cover',alignItems:'center',justifyContent:'center',}}
                      source={{ uri: item.Image3!=""?item.Image3:null }} 
                      // source={this.state.coll_img!=null?{uri:this.state.coll_img}:require('../assets/img/collectimg.png')}
                      />
                    <Image style={{  height:150,width:width/5, resizeMode: 'cover',}}
                        source={{ uri: item.Image4!=""?item.Image4:null }} />
                    <Image style={{  height:150,width:width/5, resizeMode: 'cover', }}
                        source={{ uri: item.Image5!=""?item.Image5:null }} />
  
                </ImageBackground>
                <View style={styles.overlay}/>

                <View style={{position:'absolute',top:40,alignItems:'center',width:width,justifyContent:'center',}}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>{!this.state.toggle?this.state.coll_name:this.state.desc}</Text>
                            <View style={styles.divider}></View>
                             <Text style={{ textAlign: 'center', color: 'white', marginTop: '2%', fontSize: 22 }}>{this.state.sec_name}</Text>

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
          <TouchableOpacity style={{ padding: '2%' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={require('../assets/img/backarrow.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
          <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
            <TouchableOpacity 
              onPress={this.headerBtnClk}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  paddingLeft: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold'
                }}

                >Collections/ </Text><Text style={{
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>Sections</Text>
                <Text style={{
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 16,
                  color: 'white',
                }}>/ </Text>
                <Text style={{
                  paddingRight: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>Reads</Text>
              </View>
            </TouchableOpacity>
            </LinearGradient>
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
                    marginBottom:'5%'
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
            contentContainerStyle={{ marginTop: '5%' }}
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
            <TouchableOpacity style={styles.bottombtn} onPress={()=> this.deletefunc(this.state.currentItem)}>
            <View style={{ flexDirection: 'row',alignItems:'center', width:width,justifyContent:'center' }}>
            <Image style={styles.iconwidth1} source={require('../assets/img/trash1.png')} />
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
          visible={this.state.editPopup}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={{
            left: 0, right: 0, bottom: 0, position: 'absolute',
            height: '8%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#27A291',
          }}>
            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Edited {this.state.title} -</Text>
            <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline' }}>{this.state.coll_name}</Text>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible1}
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
           <View style={{flexDirection:'row',width:width-60,margin:'1%',alignSelf:'center',  alignItems: 'center',
          justifyContent:'center',}}>
           <Text  style={{fontSize: 17,marginLeft:'2%',textAlign:'center', color: 'white',alignSelf:'center',}}>Removed - {this.state.deletedName.length<25?this.state.deletedName:null} </Text>
          
          {this.state.deletedName.length>25?<Text numberOfLines={2} style={{ fontSize: 17,textAlign:'left', color: '#fff',width:width-120,}}> {this.state.deletedName}</Text>:null}
           </View>
           

            <Text style={{fontSize: 16,color:'white',width:50,textDecorationStyle:'underline',alignSelf:'flex-end',marginRight:'2%',textAlign:'center'}}>Undo</Text>
       </View>
          </Modal>
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
    elevation:1,
    width: 130, height: 150,
    borderRadius:15
    // alignItems:'center',
    //  jsutifyContent: 'center'
     },
     pageImgStyle:{ 
      elevation:1,
      width: 130, height: 70,
      borderRadius:15
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
    height:150
  },
  bottombtn1:{
    width:width,
    alignItems:'center',
    backgroundColor:'red'
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
    fontSize: 18,
    margin:'3%',
    // padding: '3%',
    width:width/4.2,
    textAlign:'center',
    marginLeft:'0%',
    color: '#707070'
  },
  modaltext1: {
    margin:'3%',
    fontSize: 18,
    marginLeft:'7%',
    // padding: '3%',
    color: '#fff'
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
    paddingLeft: '2%',
    // paddingRight:'2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '9%',
    backgroundColor: '#ffff',
    elevation: 1

  },

  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider: {
    width: width / 2,
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
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionDetail);