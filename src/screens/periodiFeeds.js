import React, { Component } from 'react'
import { View,SafeAreaView, FlatList,AsyncStorage, RefreshControl, BackHandler,StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import {Avatar,Divider} from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
import ReadMore from 'react-native-read-more-text';
import { connect } from "react-redux";
import Modal from 'react-native-modal';
import HTMLView from 'react-native-htmlview';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class PeriodicalFeeds extends Component {
  constructor() {
    super();
  this.state = { 
        list: [
        {
            id: 0,
            bgcolor: "#569BE0",
            img: img1,
            title: "Ainaini Rahin",
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 1,
            bgcolor: "#7C3BD3",
            img: img2,
            title: "Ainaini",
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 2,
            bgcolor: "#EB9A17",
            img: img3,
            title: "Ainaini Rahin",
            subtitle: "Created a page on 4 May 2019"
        }
    ],
    showlikeImg: false,
    feeds:'',
    getpostid:'',
    loading:true,
    newModalVisible:false,
    selectedItemLike:[]
}
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  AsyncStorage.getItem('postid').then((val)=>{this.setState({getpostid:val})})

  console.log('get postid in periodical feeds book page ',this.state.getpostid)
  // {this.getData()}
  this.CheckConnectivity();

  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.backpress()
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
getData() {
  setTimeout(() => {
    {this.exploredata1(this.state.getpostid)}
  }, 1000)
}
exploredata1(postid) {

  console.log('postid in periodicalfeeds service ',postid)
  var json = JSON.stringify(
    {
      "Post_PageID":postid
  });
  fetch("http://162.250.120.20:444/Login/PeriodicalFeed",
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
          this.setState({feeds:responseJson,loading:false})
          console.warn(responseJson)
  
      })
      .catch((error) => {
          console.warn(error);
      });
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
toggle_newModal=()=>{
  this.setState({newModalVisible:!this.state.newModalVisible})
}
_renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={{color: '#27A291', marginTop: 5,alignSelf:"flex-end"}} onPress={handlePress}>
      Read more
    </Text>
  );
}

_renderRevealedFooter = (handlePress) => {
  return (
    <Text style={{color: '#27A291', marginTop: 5,alignSelf:"flex-end"}} onPress={handlePress}>
      Show less
    </Text>
  );
}
reportClk=()=>{
  this.setState({newModalVisible:false})
  this.props.navigation.navigate('report')
}
backpress=()=>{
  //    console.log('before set',this.props.nav)
     this.props.changeNavNews();
     this.props.navigation.navigate('MainpageTabs')
  //    console.log('after set',this.props.nav);
 }
 onPressHandler(id) {
  // let selected;
   let list=[...this.state.feeds];
   for(let data of list){
     if(data.page_id==id){
          
       data.like=(data.like==null)?true:!data.like;
      
       (data.like)?this.state.selectedItemLike.push(data):this.state.selectedItemLike.pop(data);
       console.log('selected item array ',this.state.selectedItemLike)
        console.log("data.selected"+data.like,'id',data.page_id);
        console.log('post id in periodicalfeed is ',data.page_id);
    
       break;
     }
   }

   this.setState({feeding:list});
 }
  fullcard({ item }) {
    const like=require('../assets/img/like.png');
    const unlike=require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg? like:unlike ;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
      <View style={{ width: width, flex: 1,backgroundColor:'#fff', }}>
       
            <View style={{ flexDirection: 'row',margin:'3%',justifyContent:'space-around' }}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('profileAbout')}>
            <Image style={{width:50,height:50,borderRadius:50/2}} source={{uri:item.avatar}}/>
            </TouchableOpacity>
          <View style={{flexDirection:'column',width:width/2+50,marginLeft:'5%'}}>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold',textAlign:'left'}}>{item.username}</Text>
          <Text style={{ fontSize: 16, color: 'black',textAlign:'left'}}>{item.created_at}</Text>
          </View>
          <TouchableOpacity style={{ padding: '2%' }}
            // onPress={() => this.refs.modal5.open()}
            onPress={()=>this.toggle_newModal()}
          >
            <Image source={require('../assets/img/3dots_gray.png')} />
          </TouchableOpacity>
          </View>
    <Text numberOfLines={2}
    style={{ fontSize: 20, color: 'black', fontWeight: 'bold' ,alignSelf:'flex-start',marginLeft:'8%',marginRight:'8%',marginTop:'2%'}}>{item.page_url}</Text>
          <Image
            style={{width:width+150,height:300,alignSelf: 'center',marginTop:'2%',resizeMode:'cover' }}
            source={{uri:item.background_image}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <View style={{backgroundColor:'#F9F9F9',paddingLeft:'5%',paddingRight:'5%',paddingTop:'2%',paddingBottom:'2%'}}>
            {/* <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}> */}
             {/* <Text style={styles.description}>
               {item.page_description}
          </Text> */}
     
            {/* </ReadMore> */}
            <HTMLView 
          style={styles.description}
          value={item.page_description}>
          </HTMLView>
          {/* <Text style={{fontSize:17,marginLeft:'5%',marginRight:'5%',padding:'2%'}}
          numberOfLines={3}>
          The cost to orchestrate an act of terrorism compared to the potential costs as a result of a successful terror attack is insignificant in comparison. The terrorist attacks in the United States on 11 September, 2001 (“9/11”) cost the terrorists about US$500,000 to stage, claimed 3,000 lives and the total losses of life and property cost insurance companies approximately US$40 billion. This direct cost pales in comparison to the indirect costs. Tip #1: Call those women out! Shopping centres and restaurants across the country were closed for at least 24 hours, high-risk office buildings (such as the former Sears Tower in Chicago) were evacuated; planes were grounded; and the stock market ceased trading for four consecutive days. The effects were not only felt in New York.
          </Text> */}
          {/* <Text style={{color:'#27A291',textDecorationLine: 'underline',alignSelf:'flex-end',marginRight:'5%',marginTop:'-7%',backgroundColor:'#F9F9F9'}}>Read more</Text> */}
          </View>
          
          {/* <Divider style={{ backgroundColor: 'gray', borderWidth: 0.7, borderColor: 'gray' }} /> */}
          <View style={{ flexDirection: 'row', justifyContent: "space-between" ,padding:'3%',}}>
          {/* <TouchableOpacity
          style={{padding:'1%'}}
            onPress={ () => this.setState({ showlikeImg: !this.state.showlikeImg }) } 
          >
            <Image
    
      source={ imgSource }
    />
          </TouchableOpacity> */}
            <TouchableOpacity
            style={{ padding: '3%' }}
            onPress={()=>this.onPressHandler(item.page_id)}
            // onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
          >
            {/* {this.renderImage} */}
            {item.like==true?<Image source={require('../assets/img/like.png')}/>:<Image source={require('../assets/img/unlike.png')}/>}
            {/* <Image
              source={imgSource}
            /> */}

          </TouchableOpacity>
           {/* <Image
            onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
           source={imgSource}/> */}
            <TouchableOpacity
          style={{padding:'3%'}}
            onPress={ () => this.props.navigation.navigate('comments')} 
          >
  <Image
  
            source={require('../assets/img/comment1.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
          style={{padding:'3%'}}
            onPress={ () => this.props.navigation.navigate('createCollection')} 
          >
           <Image source={require('../assets/img/plus.png')}/>
           </TouchableOpacity>
           <TouchableOpacity
          style={{padding:'3%'}}
            // onPress={ () => this.props.navigation.navigate('comments')} 
          >
           <Image source={require('../assets/img/share.png')}/>
         </TouchableOpacity>
            {/* <EIcons
              name='share'
              size={30}
              color='#707070'
            // color={item.like ? "#EA4184" : "#dbdbdb"}
            // onPress={() => this.pressIcon(item)}
            />  */}
          </View>
          <Divider style={{color:'@707070'}}/>
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
  render() {
    const { list } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.staticheader}>
      <TouchableOpacity
          onPress={()=>  this.props.navigation.navigate('newOldFilter', {
            pass_data: 1,
        })}
          >
            <Image source={require('../assets/img/filter.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
           <TouchableOpacity
           onPress={()=>this.props.navigation.navigate('periodiViewBook')}>
               <Text style={styles.headerText}>
              Description</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              backgroundColor: '#27A291',
              borderRadius: 20,}}
    //    onPress={() => this.props.navigation.navigate('seriesFeed')}
            >
<Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}
              >
              Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('periodIssuesHeader')}
            >
              <Text style={styles.headerText}

              >Issues</Text>
            </TouchableOpacity>

            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity onPress={() => this.backpress()}>
          <Image
              style={{ alignSelf: 'center',width:50,height:50 }} 
              source={require('../assets/img/close.png')} />
                </TouchableOpacity>
        </View>
    
      <FlatList
          legacyImplementation={false}
          data={this.state.feeds}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          // style={{ marginTop: '1%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
  <Modal isVisible={this.state.loading}>
          <Image source={require('../assets/gif/logo.gif')} style={{
            alignSelf: 'center',
            width: 140,
            height: 140
          }} />
        </Modal>
        <Modal isVisible={this.state.newModalVisible}
              onBackdropPress={() => this.setState({ newModalVisible: false })}>
          <View style={{backgroundColor:'#fff',width:width/1.8,height:height/18,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={() =>this.reportClk()} >

              <Text style={styles.modaltext}>Report</Text>
            </TouchableOpacity>
    
          </View>
        </Modal>
    </SafeAreaView>
  )
}

}
const styles = StyleSheet.create({
  modaltext: {
    fontSize: 18,
    alignSelf:'center',
    // padding: '4%',
    color: '#707070'
  },
headerText: {
  padding: '5%',
  fontSize: 16,
  fontWeight: 'bold'
},
staticheader: {
    paddingLeft: '3%',
    // paddingRight:'2%',
    flexDirection: 'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '10%',
    backgroundColor: '#ffff',
    elevation: 1,
    borderBottomColor:'#707070'


  },
})
function mapStateToProps(state){
  return{
  nav:state.apiReducer.nav,
  }
}


function mapDispatchToProps(dispatch){
  return{
      changeNavRec:()=>dispatch({type:'CHANGE_NAV_REC'}),
      changeNavNews:()=>dispatch({type:'CHANGE_NAV_NEWS'})
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PeriodicalFeeds);
