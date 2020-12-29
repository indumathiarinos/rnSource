import React, { Component } from 'react'
import { View,SafeAreaView,AsyncStorage,ImageBackground,FlatList,Modal, RefreshControl,BackHandler, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import {Avatar,Divider} from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
// import ReadMore from 'react-native-read-more-text';
import ReadMore from './Readmore';

import Modal1 from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;

class ReadLater extends Component {
  constructor(props)
  {
      super(props);
  this.state = {
    list: [
        {
            id: 0,
            bgcolor: "#569BE0",
            img: img1,
            title: "Ainaini Rahin",
            gtitle:'Your Ultimate Guide to PageVio',
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 1,
            bgcolor: "#7C3BD3",
            img: img2,
            title: "Ainaini",
            gtitle:'Ultimate Guide to PageVio',
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 2,
            bgcolor: "#EB9A17",
            img: img3,
            title: "Ainaini Rahin",
            gtitle:'Guide to PageVio',
            subtitle: "Created a page on 4 May 2019"
        }
    ],
    filterdata:[],
    reading:[],
    showlikeImg: false,
    delete:false,
    modalVisible: false,
    scrollReadlater:false,
    loading:true,
    deletedName:'',
    getuserid:'',
    selectedId:'',
    getDeleteId:'',
    undo:false

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
componentDidMount() {
  AsyncStorage.getItem('readlater').then((value) => this.setState({ scrollReadlater : value })).done();
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
  },2000);
}
deleteData(userid,readlaterId) {
  this.setState({loading:true})
  var json = JSON.stringify({
      "Deleted_for":"readlater",
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
    'USERID': userid,
    });
    fetch("http://162.250.120.20:444/Login/ReadLater",
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

showModal = () => {
  // console.log(this.state.undo)
  
    this.setState({
      modalVisible: true
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
 
  console.log('undo state ',this.state.undo)
 
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
  this.setState({deletedName:item1.Titel,
    selectedId:item1.id,undo:false});
  this.state.filterdata.push(item1);
  // this.setState({getDeleteId:item1.id});

  const filteredList = this.state.reading.filter((item) => item.Titel !== item1.Titel);
  this.setState({getDeleteId:item1.id});
 
  this.showModal();
  // this.CheckConnectivity1();

}
undoFunc(item) {
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
  console.log(item.Type_Id,item.Page_Post_Id)
  AsyncStorage.setItem('typeid', JSON.stringify(item.Type_Id));
  AsyncStorage.setItem('postid',JSON.stringify(item.Page_Post_Id));
  // this.props.navigation.navigate(
  //   'readingBook'
  //    )

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
  bookmarkPress=()=>{
    AsyncStorage.setItem('bookmark', JSON.stringify(true));
    this.props.navigation.navigate('bookmarks')
}
_renderTruncatedFooter = (handlePress,index,item) => {
  return (
    <Text key={index} style={{ color: '#27A291',
    //  marginTop: -18, paddingLeft: '1%', alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={handlePress}>
    marginTop: -18, paddingLeft: '1%', alignSelf: "flex-end",backgroundColor:'#F9F9F9',textDecorationLine: 'underline', }} onPress={()=>this.goToRead(item)}>
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
       
            <View style={{ flexDirection: 'row',justifyContent:'space-between',alignSelf:'center',width:'90%',marginTop:'5%' }}>
            <View style={{flexDirection:'column',width:'80%'}}>
            <Text style={{color:'#707070',fontSize:16,marginBottom:'1%'}}>{item.updated_date}</Text>
            <Text style={{fontSize:18,fontWeight:'bold'}}>{item.Titel}</Text></View>
           
     <TouchableOpacity onPress={()=>this.removeItem(item)}>
           <Image source={require('../assets/img/trash1.png')} />

           </TouchableOpacity>
                       </View>
                       <TouchableOpacity  
                      //  onPress={()=> console.log('reading book readlater page ',item)}
                       onPress={() => this.goToRead(item)} 
                         >
            <ImageBackground
            style={{width:width,height: 550,alignSelf: 'center',marginTop:'2%'}}
            source={{uri:item.Cover_Image}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.goToAuthorProfile(item.USERID)}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',margin:'3%'}}>
              <Image style={{width:35,height:35,borderRadius:35/2}} source={{uri:item.avatar}}/>
              <Text style={{marginLeft:'2%',fontWeight:'bold',fontSize:17}}>{item.User_name}</Text>
              </View>
            </TouchableOpacity>
          {/* <View style={{backgroundColor:'#F9F9F9',alignItems:'center',paddingLeft:'2%',paddingRight:'2%'}}>
          <ReadMore
                  key={index}
                  contentContainerStyle={{backgroundColor:'#F9F9F9'}}
                  numberOfLines={2}
                  renderTruncatedFooter={(handlePress1,index)=>this._renderTruncatedFooter(handlePress1,index,item)}
                  onReady={this._handleTextReady}>    
                  <Text style={{backgroundColor:'#F9F9F9',alignSelf:'center'}}>{item.description}</Text>     
          </ReadMore>
           <Divider style={{ backgroundColor: 'gray', borderWidth: 0.1,marginTop:'1%', borderColor: 'gray' }} />

          </View> */}
          <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View style={{
          left:0,right:0,bottom:0,position:'absolute',  
          height:'10%', 
          alignItems:'center',
          justifyContent:'center',
          backgroundColor: 'red',
}}>
       
<Text numberOfLines={2} style={{color:'#fff',fontSize:18,textAlign:'center'}}>Removed - {this.state.deletedName} </Text>
         
         
        <TouchableOpacity style={{marginTop:'2%',alignSelf:'flex-end',marginRight:'2%'}} 
        onPress={()=>this.undoFunc(item)}
        >
            <Text style={{fontSize: 16, color: '#fff',textDecorationLine:'underline'}}>Undo</Text>
         </TouchableOpacity>
          
          </View>
          </Modal>
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
    !this.state.scrollReadlater?null: this.scroll.scrollTo({ x: width/1.2 });

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
<LinearGradient style={{ borderRadius: 10}} colors={
          ['#24D4BC', '#27A291']}>
<TouchableOpacity >
<Text style={styles.activeText}
>Read Later</Text>
</TouchableOpacity>
</LinearGradient>
<TouchableOpacity style={{ alignItems: 'center' }}
onPress={() => this.bookmarkPress()}
>
<Text style={styles.headerText}

>Bookmarks</Text>
</TouchableOpacity>



</ScrollView>
<TouchableOpacity style={{paddingLeft:'2%',paddingRight:'2%',width:width/10
,alignSelf:'center'}} onPress={()=>this.backpress()}>
<Image source={require('../assets/img/close.png')} />
</TouchableOpacity>
</View>
      <FlatList
          legacyImplementation={false}
          data={this.state.reading}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          style={{ marginTop: '1%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
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
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View style={{
          left:0,right:0,bottom:0,position:'absolute',  
          height:'10%', 
          alignItems:'center',
          justifyContent:'center',
          backgroundColor: 'red',
}}>
      
<Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>Remove - {this.state.deletedName} </Text>
      
        <TouchableOpacity style={{marginTop:'2%',alignSelf:'flex-end',marginRight:'2%'}} 
        onPress={()=>this.undoFunc(this.state.filterdata)}
        >
            <Text style={{fontSize: 16, color: '#fff',textDecorationLine:'underline'}}>Undo</Text>
         </TouchableOpacity>
           
          </View>
          </Modal> */}
    </SafeAreaView>
  )
}

}
const styles = StyleSheet.create({
headerText: {
  padding: '5%',
  fontSize: 16,
  fontWeight: 'bold'
},
staticheader: {
  // paddingRight:'2%',
  flexDirection: 'row',
  // justifyContent: 'center', 
  alignItems: 'center',
  height: '8%',
  backgroundColor: '#ffff',
  elevation: 1,
  borderBottomColor:'#707070'

},
activeText:{
  padding: '5%',
  fontSize: 16,
  color: 'white',
  fontWeight: 'bold'
},
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReadLater);