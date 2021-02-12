import React, { Component } from 'react'
import { View,SafeAreaView,AsyncStorage,ImageBackground,FlatList,Modal, RefreshControl,BackHandler, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { connect } from "react-redux";
// import ReadMore from 'react-native-read-more-text';
// import ReadMoreText from './Readmore';
import ReadMoreText from 'react-native-read-more-text';
import BlurModal from '../components/blurModal';
import Modal1 from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;

class Bookmark extends Component {
  constructor(props)
  {
      super(props);
  this.state = {
    filterdata:[],
    reading:[],
    showlikeImg: false,
    delete:false,
    modalVisible: false,
    scrollBookmark:false,
    loading:true,
    deletedName:'',
    getuserid:'',
    selectedId:'',
    getDeleteId:'',
    undo:false,
    avatarProfile:'',
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false,
    currentItem:''
}
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
// renderImage(){
//   // const like=require('../assets/img/like.png');
//   // const unlike=require('../assets/img/unlike.png');
//   // var imgSource = this.state.showlikeImg? like:unlike ;
//   return (
//     <Image
//       style={ homeStyles.optionsImage }
//       source={ imgSource }
//     />
//   );
// }
toggleTab1() {
  this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
  });
  // this.props.changeNavNews();
  this.props.navigation.push('mainpage')
}
toggleTab2() {
  this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
  });
  this.props.navigation.push('collection')

}
toggleTab3() {
  this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
  });
  this.props.navigation.push('search')

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
componentDidMount() {
  AsyncStorage.getItem('bookmark').then((value) => this.setState({ scrollBookmark : value })).done();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
  this.focusListener = this.props.navigation.addListener('willFocus', () => {
    // {this.getData()}
    this.CheckConnectivity();

})
}
bookmarkPress=()=>{
  AsyncStorage.setItem('bookmark', JSON.stringify(true));
  this.props.navigation.navigate('bookmarks')
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  this.focusListener.remove();
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
CheckConnectivity1(){    
  NetInfo.fetch().then(state => {

    console.log("Connection type cheking", state.type);
    console.log("Is connected cheking?", state.isConnected);

    if(state.isConnected==true){
      this.showModal();
      // {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
    }else{
      alert('Not Connected')
    }
   
  });
}
handleBackButtonClick() {
  this.backpress();
  return true;
}
getData(){
  setTimeout(() => {
    { this.exploredata(this.state.getuserid) }
    { this.exploredataPic(this.state.getuserid) }
  }, 1000);
}
exploredataPic(userid) {
  this.setState({ loading: true })
  var json = JSON.stringify({
      'userid': userid
  });
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
          // this.setState({loading:false})
          console.warn(responseJson)
          for (let i = 0; i < responseJson.length; i++) {
              // alert(this.state.bookdetail[0].Image)
              this.setState({
                  avatarProfile: responseJson[i].avatar,

              })
          }
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}
deleteData(userid,readlaterId) {
  // this.setState({loading:true})
  var json = JSON.stringify({
      "Deleted_for":"bookmark",
      "PK_ID":readlaterId,
      "user_ID":userid
  });
  console.log('deletedata ',json)
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
        // {this.exploredata(this.state.getuserid)}
          //alert(responseText);
          // this.setState({ loading: false })
          console.warn(responseJson)
          console.warn("bookmark",responseJson);
          // this.setState({loading:true})
          {this.exploredata(this.state.getuserid)}
          // this.showModal()
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}
exploredata(userid){
  var json=JSON.stringify({
    'UserID': userid,
    });
    fetch("http://162.250.120.20:444/Login/Bookmark",
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
          this.setState({reading: responseJson,loading:false})
          console.warn(responseJson)

          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}

showModal = (item1) => {
  // console.log(this.state.undo)
  
    this.setState({
      modalVisible: true,deletedName:item1.Titel,getDeleteId:item1.id,currentItem:item1,
      undo:false
    });
      // {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
  
    setTimeout(() => {
      this.setState({
        modalVisible: false,
      })
      if(this.state.undo==false){
        {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
      }else{
        this.setState({undo:false})
      }
      
    //  { this.getData()}
      }, 3000);
 
 
}
showModal2 = () => {
  console.log('undo state ',this.state.undo)
  this.setState({
    modalVisible: true
  });
 
    {this.exploredata(this.state.getuserid)}

  setTimeout(() => {
    this.setState({
      modalVisible: false,undo:false
    })
  //  { this.getData()}
    }, 3000);
}
// showModal = () => {
//   this.setState({
//     modalVisible: true
//   });
//   setTimeout(() => {
//     if(this.state.undo==true){
//       this.CheckConnectivity1();
//     }else{
//     this.setState({
//       modalVisible: false,undo:false
//     })
//     this.CheckConnectivity();
//   }
//     }, 5000);

// }
// renderImage(){
//   // const like=require('../assets/img/like.png');
//   // const unlike=require('../assets/img/unlike.png');
//   // var imgSource = this.state.showlikeImg? like:unlike ;
//   return (
//     <Image
//       style={ homeStyles.optionsImage }
//       source={ imgSource }
//     />
//   );
// }
removeItem(item1){
  this.setState({deletedName:item1.Titel,getDeleteId:item1.id,
    undo:false});
  // this.state.filterdata.push(item1);
  // // this.setState({getDeleteId:item1.id});

  // const filteredList = this.state.reading.filter((item) => item.Titel !== item1.Titel);
  // this.setState({getDeleteId:item1.id});
 
  this.showModal();
  // this.CheckConnectivity1();

}
undoFunc() {
  const reading = this.state.reading;
  // this.state.reading.push(item);
  console.log('values after undo list ',this.state.reading);
  this.setState({undo:true})
  // list.splice(item.id, 1);
  // this.showModal(item.id)
  this.setState({ reading });
  // this.showModal();
  // this.CheckConnectivity1();
}
goToRead=(item)=>{
  // console.log(item.Type_Id,item.Page_Post_Id)
  AsyncStorage.setItem('typeid',item.Type_Id);
  AsyncStorage.setItem('postid',item.Page_Post_Id);
  // this.props.navigation.navigate(
  //   'readingBook'
  //    )+65656

  console.log('type id postid ',item.Type_Id,item.Page_Post_Id);
  if (item.Type_Id ==4) {
    return this.props.navigation.navigate('readingBook');
    // return this.pressIcon();
} else if(item.Type_Id==1){
        return this.props.navigation.navigate('viewBook');
} else if(item.Type_Id==2){
        return this.props.navigation.navigate('periodiViewBook');
}else if(item.Type_Id==3){
          return this.props.navigation.navigate('seriesViewBook');
}
}
backpress() {
    //    console.log('before set',this.props.nav)
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs');
    this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
  }
  readlaterPress=()=>{
    AsyncStorage.setItem('readlater', JSON.stringify(true));
    this.props.navigation.navigate('readlater')
}
_renderTruncatedFooter = (handlePress,index,item) => {
  return (
    <Text key={index} style={{ color: '#27A291',
    //  marginTop: -18, paddingLeft: '1%', alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={handlePress}>
    // marginTop: -18, paddingLeft: '1%',
    alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={()=>this.goToRead(item)}>
      Read more
        </Text>
  );
}
  _renderRevealedFooter = (handlePress) => {
    return (
      // <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      //   <TouchableOpacity
      //     onPress={() => this.props.navigation.navigate('report')}>
      //     <View style={styles.info1}>
      //       <Image style={{ marginRight: '10%' }} source={require('../assets/img/flag.png')} />
      //       <Text style={styles.text1}>Report</Text>
      //     </View>
      //   </TouchableOpacity>

        <Text style={{ color: '#27A291', marginTop: -18, alignSelf: "flex-end", backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={handlePress}>
          Show less
          </Text>
      // </View>
    );
  }
  goToAuthorProfile(userid){
    AsyncStorage.setItem('profile_userid',JSON.stringify(Number(userid)));
    this.props.navigation.navigate('profileAbout')
  }
  fullcard({ item,index }) {
    const like=require('../assets/img/like.png');
    const unlike=require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg? like:unlike ;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
    <View key={index} style={{ width: width, flex: 1,backgroundColor:'#fff' }}>
       
            <View style={{ flexDirection: 'row',justifyContent:'space-between',alignSelf:'center',width:'90%',marginTop:'1%' }}>
            <View  style={{flexDirection:'column',width:'80%'}}>
          <Text style={{color:'#707070',fontSize:12,fontFamily:'AzoSans-Regular',margin:'1%'}}>{item.upated_date}</Text>
          <Text numberOfLines={2} style={{fontSize:16,fontFamily:'Montserrat-Bold'}}>{item.Titel}</Text>
          </View>
     <TouchableOpacity onPress={()=>this.showModal(item)}>
     <Image style={{width:40,height:40}} source={require('../assets/img/trashicon.png')} />

           </TouchableOpacity>
                       </View>
                       <TouchableOpacity  
                      //  onPress={()=> console.log('reading book readlater page ',item)}
                       onPress={() => this.goToRead(item)} 
                         >
            <ImageBackground
            style={{width:width,height: item.Type_Id=='4'?217:550,alignSelf: 'center',marginTop:'2%'}}
            source={{uri:item.Cover_Image}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          </TouchableOpacity>
          <View style={{backgroundColor:'#F9F9F9',alignItems:'center',paddingLeft:'2%',paddingRight:'2%',justifyContent:'center',}}>
        {/* <ReadMore
                contentContainerStyle={{backgroundColor:'#F9F9F9'}}
                numberOfLines={1}
                renderTruncatedFooter={(handlePress1,index)=>this._renderTruncatedFooter(handlePress1,index,item)}
                // renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}>
                <Text style={{backgroundColor:'#F9F9F9',alignSelf:'center',fontFamily:'AzoSans-Regular',fontSize:14}}>{item.Linedata}</Text>
              </ReadMore> */}
               <ReadMoreText
                contentContainerStyle={{backgroundColor:'#F9F9F9'}}
                numberOfLines={1}
                renderTruncatedFooter={(handlePress1,index)=>this._renderTruncatedFooter(handlePress1,index,item)}

                // renderTruncatedFooter={(handlePress,index,item)=>this._renderTruncatedFooter(handlePress,index,item)}
                // renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}>
                <Text style={{backgroundColor:'#F9F9F9',alignSelf:'center',fontFamily:'AzoSans-Regular',fontSize:14}}>{item.Linedata}</Text>
              </ReadMoreText>
              </View>
      </View>
      );
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

  render() {
      const { list } = this.state;
      !this.state.scrollBookmark?null: this.scroll.scrollTo({ x: width/1.2 });
  
      return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
            <View style={styles.staticheader}>
          
            <ScrollView horizontal={true}
            scrollToEnd={true}
            ref={(node) => this.scroll = node}
            showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:'1%',paddingRight:'6.5%', flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' }}>
  
  <TouchableOpacity style={{ alignItems: 'center' }}
      onPress={() => this.props.navigation.navigate('collection',{pass_data:false})}
  >
      <Text style={styles.headerText}
  
      >Collection</Text>
  
  </TouchableOpacity>
  <TouchableOpacity style={{ alignItems: 'center' }}
      onPress={() => this.props.navigation.navigate('pins')}
  >
      <Text style={styles.headerText}
  
      >Pins</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{ alignItems: 'center' }}
      onPress={() => this.readlaterPress()}
  >
      <Text style={styles.headerText}
  
      >Read Later</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{ borderRadius: 10,backgroundColor:'#27A291'}}>
    <Text style={styles.activeText}
      >Bookmarks</Text>
  </TouchableOpacity>
  
  
  
  
  </ScrollView>
  <TouchableOpacity style={{paddingLeft:'2%',paddingRight:'2%',width:width/10
  ,alignSelf:'center'}} onPress={()=>this.backpress()}>
 <Image
        style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />
  </TouchableOpacity>
  </View>
<ScrollView>
      <FlatList
          legacyImplementation={false}
          data={this.state.reading}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          contentContainerStyle={{ marginTop: '1%',marginBottom:'15%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
        </ScrollView>
         <Modal1 isVisible={this.state.loading}

// onBackdropPress={() => this.setState({ loading: true })}
>
  <Image source={require('../assets/gif/logo.gif')} style={{
    alignSelf: 'center',
    width: 140,
    height: 140
  }} />
</Modal1>
{/* <Modal
          animationType="slide"
          // transparent={true}
          visible={this.state.modalVisible}
          // onRequestClose={() => {
          //   console.log('Modal has been closed.');
          // }}
          >
            <View style={{
          left:0,right:0,bottom:0,position:'absolute',  
          height:'10%', 
          alignItems:'center',
          justifyContent:'center',
          backgroundColor: 'red',
}}>
       
       <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Text style={{color:'#fff',fontSize:18,textAlign:'center',}} >Removed - </Text>
              <Text numberOfLines={2} style={{color:'#fff',fontSize:18,textAlign:'left',textDecorationLine:'underline',textShadowColor:'#fff',width:width/1.5}}>{this.state.deletedName}</Text>

            </View>         
         
        <TouchableOpacity style={{marginTop:'2%',alignSelf:'flex-end',marginRight:'2%'}} 
        onPress={()=>this.undoFunc()}
        >
            <Text style={{fontSize: 16, color: '#fff',textDecorationLine:'underline'}}>Undo</Text>
         </TouchableOpacity>
          
          </View>
          </Modal> */}
          <BlurModal visible={this.state.modalVisible}
          children={  <View style={{
            left:0,right:0,bottom:0,position:'absolute',  
            height:'10%', 
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: '#E74C3C',
  }}>
         
         <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={{color:'#fff',fontSize:16,fontFamily:'AzoSans-Bold',textAlign:'center',}} >Removed - </Text>
                <TouchableOpacity onPress={()=>this.goToRead(this.state.currentItem)}>
                <Text numberOfLines={2} style={{color:'#fff',fontSize:16,fontFamily:'AzoSans-Medium',textAlign:'left',textDecorationLine:'underline',textShadowColor:'#fff',width:width/1.5}}>{this.state.deletedName}</Text>
              </TouchableOpacity>
              </View>         
           
          <TouchableOpacity style={{marginTop:'2%',alignSelf:'flex-end',marginRight:'2%'}} 
          onPress={()=>this.undoFunc()}
          >
              <Text style={{fontSize: 16,fontFamily:'AzoSans-Regular',color: '#fff',textDecorationLine:'underline'}}>Undo</Text>
           </TouchableOpacity>
            
            </View>}
          // }}
          >
          
          </BlurModal>
          <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.tabsss}
                        onPress={() => this.toggleTab1()}>
                        <Image style={{ width: 25, height: 25 }} source={require('../assets/img/logo.png')} />
                        {/* <Text>Home</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
                    <Image style={{width:50,height:50,marginTop:5}} source={require('../assets/img/library.png')} />
                        {/* <Text>Collection</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
                    <Image
                        style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/search.png')} />
                        {/* <Text>Search</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabsss, { width: 28, height: 28, borderRadius: 28 / 2, }]} onPress={() => this.toggleTab4()}>
          
          <View style={{flexDirection:'row'}}>
          <Image style={{ width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }} source={{ uri: this.state.avatarProfile ? this.state.avatarProfile : 'http://pagevio.com/uploads/profile/noimage.jpg' }}></Image>
          <Image style={{top:'60%',right:'38%',width:15,height:15}} source={require('../assets/img/menuimg.png')}/>
          </View>
                  
        </TouchableOpacity>

                </View>
            
    </SafeAreaView>
  )
}

}
const styles = StyleSheet.create({
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

staticheader: {
  // paddingRight:'2%',
  flexDirection: 'row',
  // justifyContent: 'center', 
  alignItems: 'center',
  // height: '8%',
  backgroundColor: '#ffff',
  elevation: 1,
  borderBottomColor:'#707070'

},
activeText: {
  padding: '5%',
  fontSize: 14,
  color: 'white',
  fontFamily: 'AzoSans-Medium'
},
headerText: {
  padding: '5%',
  fontSize: 14,
  color:'#707070',
  fontFamily:'AzoSans-Medium'
},
// tabsss: {
//   alignItems: 'center', 
//   justifyContent: 'center',
//   padding:'1%'
// },
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);





// import React, { Component } from 'react'
// import { View,ImageBackground,SafeAreaView,AsyncStorage,FlatList,Modal, RefreshControl,BackHandler, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons';
// import img1 from '../assets/img/cover1.png';
// import img2 from '../assets/img/cover2.png';
// import img3 from '../assets/img/cover3.png';
// import {Avatar,Divider} from 'react-native-elements';
// import EIcons from 'react-native-vector-icons/Entypo';
// import { connect } from "react-redux";
// // import ReadMore from 'react-native-read-more-text';
// import ReadMore from './Readmore';
// import BlurModal from '../components/blurModal';
// import Modal1 from "react-native-modal";
// import LinearGradient from 'react-native-linear-gradient';
// import NetInfo from '@react-native-community/netinfo';
// console.disableYellowBox = true;

// // import { Button } from 'react-native-paper';
// const width = Dimensions.get('window').width;

// class Bookmarks extends Component {
//   constructor(props)
//   {
//       super(props);
//   this.state = {
//     list: [
//         {
//             id: 0,
//             bgcolor: "#569BE0",
//             img: img1,
//             title: "Ainaini Rahin",
//             gtitle:'Your Ultimate Guide to PageVio',
//             subtitle: "Created a page on 4 May 2019"
//         },
//         {
//             id: 1,
//             bgcolor: "#7C3BD3",
//             img: img2,
//             title: "Ainaini",
//             gtitle:'Ultimate Guide to PageVio',
//             subtitle: "Created a page on 4 May 2019"
//         },
//         {
//             id: 2,
//             bgcolor: "#EB9A17",
//             img: img3,
//             title: "Ainaini Rahin",
//             gtitle:'Guide to PageVio',
//             subtitle: "Created a page on 4 May 2019"
//         }
//     ],
//     filterdata:[],
//     reading:[],
//     showlikeImg: false,
//     delete:false,
//     modalVisible: false,
//     scrollBookmark:false,
//     loading:true,
//     deletedName:'',
//     getuserid:'',
//     selectedId:'',
//     getDeleteId:'',
//     undo:false,
//     backupReading:'',
//     tab1: false,
//     tab2: false,
//     tab3: false,
//     tab4: false,
//     avatar: '',

// }
// this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
// }
// // renderImage(){
// //   // const like=require('../assets/img/like.png');
// //   // const unlike=require('../assets/img/unlike.png');
// //   // var imgSource = this.state.showlikeImg? like:unlike ;
// //   return (
// //     <Image
// //       style={ homeStyles.optionsImage }
// //       source={ imgSource }
// //     />
// //   );
// // }
// componentDidMount() {
//   AsyncStorage.getItem('bookmark').then((value) => this.setState({ scrollBookmark : value })).done();
//   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
//   AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
//   AsyncStorage.setItem('pinsFilter',"DESC");
//   AsyncStorage.setItem('collectionFilter',"DESC");

// //   this.CheckConnectivity();
// //   this.focusListener = this.props.navigation.addListener('willFocus', () => {
// //     // {this.getData()}
//     this.CheckConnectivity();
// // })
// }
// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
//   // this.focusListener.remove();
// }
// CheckConnectivity(){    
//   NetInfo.fetch().then(state => {

//     console.log("Connection type cheking", state.type);
//     console.log("Is connected cheking?", state.isConnected);

//     if(state.isConnected==true){
//       {this.getData();}
//     }else{
//       alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
//     }
   
//   });
// }
// CheckConnectivity1(){    
//   NetInfo.fetch().then(state => {

//     console.log("Connection type cheking", state.type);
//     console.log("Is connected cheking?", state.isConnected);

//     if(state.isConnected==true){
//       this.showModal();
//       // {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
//     }else{
//       alert('Not Connected')
//     }
   
//   });
// }
// handleBackButtonClick() {
//   this.backpress();
//   return true;
// }
// getData(){
//   setTimeout(() => {
//     { this.exploredata(this.state.getuserid) }
//     { this.exploredataPic(this.state.getuserid) }
//   }, 1000);
// }
// exploredataPic(userid) {
//   this.setState({ loading: true })
//   var json = JSON.stringify({
//       'userid': userid
//   });
//   fetch("http://162.250.120.20:444/Login/ProfileUpdateGet",
//       {
//           method: 'POST',
//           headers: {
//               'Accept': 'application/json',
//               'content-type': 'application/json'
//           },
//           body: json
//       }
//   )
//       .then((response) => response.json())
//       .then((responseJson) => {
//           //alert(responseText);
//           // this.setState({loading:false})
//           console.warn(responseJson)
//           for (let i = 0; i < responseJson.length; i++) {
//               // alert(this.state.bookdetail[0].Image)
//               this.setState({
//                   avatar: responseJson[i].avatar,

//               })
//           }
//           //alert(this.state.data.status)  
//       })
//       .catch((error) => {
//           console.warn(error);
//       });
// }
// deleteData(userid,readlaterId) {
//   // this.setState({loading:true})
//   var json = JSON.stringify({
//       "Deleted_for":"bookmark",
//       "PK_ID":readlaterId,
//       "user_ID":userid
//   });
//   console.log('deletedata ',json)
//   fetch("http://162.250.120.20:444/Login/DeleteData",
//       {
//           method: 'POST',
//           headers: {
//               'Accept': 'application/json',
//               'content-type': 'application/json'
//           },
//           body: json
//       }
//   )
//       .then((response) => response.json())
//       .then((responseJson) => {
//         // {this.exploredata(this.state.getuserid)}
//           //alert(responseText);
//           // this.setState({ loading: false })
//           console.warn(responseJson)
//           console.warn("bookmark",responseJson);
//           // this.setState({loading:true})
//           {this.exploredata(this.state.getuserid)}
//           // this.showModal()
//           //alert(this.state.data.status)  
//       })
//       .catch((error) => {
//           console.warn(error);
//       });
// }

// exploredata(userid){
//   var json=JSON.stringify({
//     'UserID': userid,
//     });
//     fetch("http://162.250.120.20:444/Login/Bookmark",
//       {
//           method: 'POST',
//           headers: {
//               'Accept': 'application/json',
//               'content-type': 'application/json'
//           },
//           body: json
//       }
//   )
//       .then((response) => response.json())
//       .then((responseJson) => {
//           //alert(responseText);
//           this.setState({reading: responseJson,loading:false})
//           console.warn(responseJson)

//           //alert(this.state.data.status)  
//       })
//       .catch((error) => {
//           console.warn(error);
//       });
// }

// showModal = () => {
//   // console.log(this.state.undo)
  
//     this.setState({
//       modalVisible: true
//     });
//       // {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
  
//     setTimeout(() => {
//       this.setState({
//         modalVisible: false,
//       })
//       if(this.state.undo==false){
//         {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
//       }else{
//         this.setState({undo:false})
//       }
      
//     //  { this.getData()}
//       }, 5000);
 
//   console.log('undo state ',this.state.undo)
 
// }
// toggleTab1() {
//   this.setState({
//       tab1: true,
//       tab2: false,
//       tab3: false,
//       tab4: false
//   });
//   // this.props.changeNavNews();
//   this.props.navigation.push('mainpage')
// }
// toggleTab2() {
//   this.setState({
//       tab1: false,
//       tab2: true,
//       tab3: false,
//       tab4: false
//   });
//   this.props.navigation.push('collection')

// }
// toggleTab3() {
//   this.setState({
//       tab1: false,
//       tab2: false,
//       tab3: true,
//       tab4: false
//   });
//   this.props.navigation.push('search')

// }
// toggleTab4() {
//   this.setState({
//       tab1: false,
//       tab2: false,
//       tab3: false,
//       tab4: true
//   });
//   this.props.navigation.openDrawer()
// }
// showModal2 = () => {
//   console.log('undo state ',this.state.undo)
//   this.setState({
//     modalVisible: true
//   });
 
//     {this.exploredata(this.state.getuserid)}

//   setTimeout(() => {
//     this.setState({
//       modalVisible: false,undo:false
//     })
//   //  { this.getData()}
//     }, 5000);
// }
// // showModal = () => {
// //   this.setState({
// //     modalVisible: true
// //   });
// //   setTimeout(() => {
// //     if(this.state.undo==true){
// //       this.CheckConnectivity1();
// //     }else{
// //     this.setState({
// //       modalVisible: false,undo:false
// //     })
// //     this.CheckConnectivity();
// //   }
// //     }, 5000);

// // }
// // renderImage(){
// //   // const like=require('../assets/img/like.png');
// //   // const unlike=require('../assets/img/unlike.png');
// //   // var imgSource = this.state.showlikeImg? like:unlike ;
// //   return (
// //     <Image
// //       style={ homeStyles.optionsImage }
// //       source={ imgSource }
// //     />
// //   );
// // }
// removeItem(item1){
//   this.setState({deletedName:item1.Titel,
//     selectedId:item1.id,undo:false});
//   this.state.filterdata.push(item1);
//   // this.setState({getDeleteId:item1.id});

//   // const filteredList = this.state.reading.filter((item) => item.Titel !== item1.Titel);
//   this.setState({getDeleteId:item1.id});
 
//   this.showModal();
//   // this.CheckConnectivity1();

// }
// undoFunc() {
//   // const reading = this.state.reading;
//   // this.state.reading.push(item);
//   // console.log('values after undo list ',this.state.reading);
//   this.setState({undo:true})
//   // this.setState({ reading:this.state.backupReading });

//   // list.splice(item.id, 1);
//   // this.showModal(item.id)
//   // this.setState({ reading });
//   // this.showModal();
//   // this.CheckConnectivity1();
// }
// goToRead=(item)=>{
//   // console.log(item.Type_Id,item.Page_Post_Id)
//   AsyncStorage.setItem('typeid',item.Type_Id);
//   AsyncStorage.setItem('postid',item.Page_Post_Id);
//   // this.props.navigation.navigate(
//   //   'readingBook'
//   //    )+65656

//   console.log('type id postid ',item.Type_Id,item.Page_Post_Id);
//   if (item.Type_Id ==4) {
//     return this.props.navigation.navigate('readingBook');
//     // return this.pressIcon();
// } else if(item.Type_Id==1){
//         return this.props.navigation.navigate('viewBook');
// } else if(item.Type_Id==2){
//         return this.props.navigation.navigate('periodiViewBook');
// }else if(item.Type_Id==3){
//           return this.props.navigation.navigate('seriesViewBook');
// }
// }
// backpress() {
//     //    console.log('before set',this.props.nav)
//     // this.props.changeNavNews();
//     // this.props.navigation.navigate('MainpageTabs');
//     this.props.navigation.goBack();
//     //    console.log('after set',this.props.nav);
//   }
//   readlaterPress=()=>{
//     AsyncStorage.setItem('readlater', JSON.stringify(true));
//     this.props.navigation.navigate('readlater')
// }
// _renderTruncatedFooter = (handlePress,index,item) => {
//   return (
//     <Text key={index} style={{ color: '#27A291',
//     //  marginTop: -18, paddingLeft: '1%', alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={handlePress}>
//     marginTop: -16, paddingLeft: '1%', alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={()=>this.goToRead(item)}>
//       Read more
//         </Text>
//   );
// }
// _renderRevealedFooter = (handlePress) => {
//   return (
//     // <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//     //   <TouchableOpacity
//     //     onPress={() => this.props.navigation.navigate('report')}>
//     //     <View style={styles.info1}>
//     //       <Image style={{ marginRight: '10%' }} source={require('../assets/img/flag.png')} />
//     //       <Text style={styles.text1}>Report</Text>
//     //     </View>
//     //   </TouchableOpacity>

//       <Text style={{ color: '#27A291', marginTop: -18, alignSelf: "flex-end", backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={handlePress}>
//         Show less
//         </Text>
//     // </View>

//   );
// }
// goToRead=(item)=>{
//   console.log(item.Type_Id,item.Page_Post_Id)
//   AsyncStorage.setItem('typeid',item.Type_Id);
//   AsyncStorage.setItem('postid',item.Page_Post_Id);
//   // this.props.navigation.navigate(
//   //   'readingBook'
//   //    )

//   console.log('type id postid ',item.Type_Id,item.Page_Post_Id);
//   if (item.Type_Id ==4) {
//     return this.props.navigation.navigate('readingBook');
//     // return this.pressIcon();
// } else if(item.Type_Id==1){
//         return this.props.navigation.navigate('viewBook');
// } else if(item.Type_Id==2){
//         return this.props.navigation.navigate('periodiViewBook');
// }else if(item.Type_Id==3){
//           return this.props.navigation.navigate('seriesViewBook');
// }
// }
// fullcard({ item,index }) {
//   const like=require('../assets/img/like.png');
//   const unlike=require('../assets/img/unlike.png');
//   var imgSource = this.state.showlikeImg? like:unlike ;
//   // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
//   return (
//   <View style={{ width: width, flex: 1,backgroundColor:'#fff', }}>
//      <View style={styles.renderview}>
//           <View  style={{flexDirection:'column',width:'80%'}}>
//           <Text style={{color:'#707070',fontSize:12,fontFamily:'AzoSans-Regular',margin:'1%'}}>{item.upated_date}</Text>
//           <Text style={{fontSize:16,fontFamily:'Montserrat-Bold'}}>{item.Titel}</Text>
//           </View>
         
//           <TouchableOpacity style={{marginLeft:'5%'}} onPress={()=>this.removeItem(item)}>
//          <Image style={{width:50,height:50}} source={require('../assets/img/trashicon.png')} />

//          </TouchableOpacity>
//                      </View>
//                      <TouchableOpacity 
//                       // onPress={() => this.props.navigation.navigate(
//                       // //  'imgPreview', { name:item.Cover_Image}
//                       // 'readingBook'
//                       //  )}
//                       onPress={()=>this.goToRead(item)}
//                         >
//             <ImageBackground
//             style={{width:width,height:550,alignSelf: 'center',marginTop:'2%',resizeMode:'cover' }}
//             source={{uri:item.Cover_Image}}
//             onPress={() => console.log("Works!")}
//             activeOpacity={0.7}
//           />
//         </TouchableOpacity>
//         <View style={{backgroundColor:'#F9F9F9',alignItems:'center',paddingLeft:'2%',paddingRight:'2%',height:20,justifyContent:'center',}}>
//         <ReadMore
//                 contentContainerStyle={{backgroundColor:'#F9F9F9'}}
//                 numberOfLines={1}
//                 renderTruncatedFooter={(handlePress1,index)=>this._renderTruncatedFooter(handlePress1,index,item)}
//                 // renderRevealedFooter={this._renderRevealedFooter}
//                 onReady={this._handleTextReady}>
//                 <Text style={{backgroundColor:'#F9F9F9',alignSelf:'center',fontFamily:'AzoSans-Regular',fontSize:14}}>{item.Linedata}</Text>
//               </ReadMore>
//               </View>
//               <BlurModal visible={this.state.modalVisible}
//           children={  <View style={{
//             left:0,right:0,bottom:0,position:'absolute',  
//             height:'10%', 
//             alignItems:'center',
//             justifyContent:'center',
//             backgroundColor: 'red',
//   }}>
         
//          <View style={{flexDirection:'row',justifyContent:'center'}}>
//                 <Text style={{color:'#fff',fontSize:18,textAlign:'center',}} >Removed - </Text>
//                 <Text numberOfLines={2} style={{color:'#fff',fontSize:18,textAlign:'left',textDecorationLine:'underline',textShadowColor:'#fff',width:width/1.5}}>{this.state.deletedName}</Text>
  
//               </View>         
           
//           <TouchableOpacity style={{marginTop:'2%',alignSelf:'flex-end',marginRight:'2%'}} 
//           onPress={()=>this.undoFunc()}
//           >
//               <Text style={{fontSize: 16, color: '#fff',textDecorationLine:'underline'}}>Undo</Text>
//            </TouchableOpacity>
            
//             </View>}
//           // }}
//           >
          
//           </BlurModal>
//        </View>
//     );
// }
//   // filter_page = () => {
//   //   // let data = [ { id: 1, name: 'Mike', city: 'philps', state:'New York'}, { id: 2, name: 'Steve', city: 'Square', state: 'Chicago'}, { id: 3, name: 'Jhon', city: 'market', state: 'New York'}, { id: 4, name: 'philps', city: 'booket', state: 'Texas'}, { id: 5, name: 'smith', city: 'brookfield', state: 'Florida'}, { id: 6, name: 'Broom', city: 'old street', state: 'Florida'}, ]
//   //   data_fav = this.state.articles.filter(function (item) {
//   //     return item.like == true;
//   //   }).map(function ({id,img,title,like,date,htmlContent} ) {
//   //     return { id,img,title,like,date,htmlContent};
//   //   });
//   //   console.log(data_fav);
//   //   console.log("state articles", this.state.articles);
//   // }

//   render() {
//     const { list } = this.state;
//     !this.state.scrollBookmark?null: this.scroll.scrollTo({ x: width/1.2 });

//     return (
//       <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
//           <View style={styles.staticheader}>
        
//           <ScrollView horizontal={true}
//           scrollToEnd={true}
//           ref={(node) => this.scroll = node}
//           showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:'1%',paddingRight:'6.5%', flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' }}>

// <TouchableOpacity style={{ alignItems: 'center' }}
//     onPress={() => this.props.navigation.navigate('collection',{pass_data:false})}
// >
//     <Text style={styles.headerText}

//     >Collection</Text>

// </TouchableOpacity>
// <TouchableOpacity style={{ alignItems: 'center' }}
//     onPress={() => this.props.navigation.navigate('pins')}
// >
//     <Text style={styles.headerText}

//     >Pins</Text>
// </TouchableOpacity>
// <TouchableOpacity style={{ alignItems: 'center' }}
//     onPress={() => this.readlaterPress()}
// >
//     <Text style={styles.headerText}

//     >Read Later</Text>
// </TouchableOpacity>
// <LinearGradient style={{ borderRadius: 10}} colors={
//               ['#24D4BC', '#27A291']}>
// <TouchableOpacity >
//   <Text style={styles.activeText}
//     >Bookmarks</Text>
// </TouchableOpacity>
// </LinearGradient>




// </ScrollView>
// <TouchableOpacity style={{paddingLeft:'2%',paddingRight:'2%',width:width/10
// ,alignSelf:'center'}} onPress={()=>this.backpress()}>
// <Image source={require('../assets/img/close.png')} />
// </TouchableOpacity>
// </View>
// <ScrollView style={{flex:1,marginBottom:'5%' }}>
//       <FlatList
//           legacyImplementation={false}
//           data={this.state.reading}
//           navigation={this.props.navigation}
//           renderItem={this.fullcard.bind(this)}
//           enableEmptySections={false}
//           contentContainerStyle={{ marginTop: '1%'}}
//           extraData={this.state}
//           keyExtractor={(item, index) => index.toString()}
//         />
//         </ScrollView>
//          <Modal1 isVisible={this.state.loading}

// // onBackdropPress={() => this.setState({ loading: true })}
// >
//   <Image source={require('../assets/gif/logo.gif')} style={{
//     alignSelf: 'center',
//     width: 140,
//     height: 140
//   }} />
// </Modal1>
// <View style={styles.bottomBar}>
//                     <TouchableOpacity
//                         style={styles.tabsss}
//                         onPress={() => this.toggleTab1()}>
//                         <Image style={{ width: 25, height: 25 }} source={require('../assets/img/logo.png')} />
//                         {/* <Text>Home</Text> */}
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
//                     <Image source={require('../assets/img/collection.png')} />
//                         {/* <Text>Collection</Text> */}
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
//                         <Image style={{ width: 28, height: 28 }} source={require('../assets/img/search.png')} />
//                         {/* <Text>Search</Text> */}
//                     </TouchableOpacity>
//                     <TouchableOpacity style={[styles.tabsss, { width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }]} onPress={() => this.toggleTab4()}>
//                         {/* <Drawer
//         ref={(ref) => { this.drawer = ref; }}
//         content={<SideBar navigator={this.navigator} />}
//         onClose={() => this.closeDrawer()} > */}
//                         {/* <TouchableOpacity onPress = {() =>navigation.openDrawer() }>  */}
//                         <Image style={{ width: 28, height: 28, borderRadius: 28 / 2 }} source={{ uri: this.state.avatar }}></Image>
//                         {/* <Text>Menu</Text> */}
//                         {/* </Drawer> */}
//                     </TouchableOpacity>

//                 </View>
//     </SafeAreaView>
//   )
// }

// }
// const styles = StyleSheet.create({
//   bottomBar: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     height: '6%',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     position: 'absolute'
// },
//   removeModal:{
//     left:0,right:0,bottom:0,position:'absolute',  
//         height:'10%', 
//         alignItems:'center',
//         justifyContent:'center',
//         backgroundColor: 'red',
//   },
//   scrollview:{
//     paddingLeft:'1%',
//     paddingRight:'6.5%', 
//     flexDirection: 'row',
//      width: width, 
//      justifyContent: 'center', 
//      alignItems: 'center' 
//   },
//   gif:{
//     alignSelf: 'center',
//     width: 140,
//     height: 140
//   },
//   activeText: {
//     padding: '5%',
//     fontSize: 14,
//     color: 'white',
//     fontFamily: 'AzoSans-Medium'
// },
// headerText: {
//     padding: '5%',
//     fontSize: 14,
//     color:'#707070',
//     fontFamily:'AzoSans-Medium'
// },
// staticheader: {
//   // paddingRight:'2%',
//   flexDirection: 'row',
//   // justifyContent: 'center', 
//   alignItems: 'center',
//   height: '8%',
//   backgroundColor: '#ffff',
//   elevation: 1,
//   borderBottomColor:'#707070'

// },

// renderview:{
//   flexDirection: 'row',
//   justifyContent:'space-between',
//   alignSelf:'center',
//   width:'90%',
//   marginTop:'5%'
// },
// tabsss: {
//   alignItems: 'center', 
//   justifyContent: 'center'
// },
// undoText:{
//   fontSize: 16,
//    color: '#fff',
//    textDecorationLine:'underline'
// },
// backBtn:{
//   paddingLeft:'2%',
//   paddingRight:'2%',
//   width:width/10
// ,alignSelf:'center'
// }
// })
//   export default Bookmarks;