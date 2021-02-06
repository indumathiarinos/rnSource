import React, { Component } from 'react'
import {AsyncStorage,SafeAreaView,Modal,View, FlatList,BackHandler,ImageBackground, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Divider } from 'react-native-elements';
import { connect } from "react-redux";
import Modal1 from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.disableYellowBox = true;

class FollowSubscribe extends Component {
  constructor(props){
    super(props)
  this.state = {
    list: [
      {
        id: 0,
        bgcolor: "#569BE0",
        // img: img1,
        title: "Our Planet",
        publications: '4 publications',
        pages: '3 pages',
        page: 'Page 2',
        subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
      },
      {
        id: 1,
        bgcolor: "#7C3BD3",
        // img: img2,
        title: "A Cat's Tale",
        publications: '4 publications',
        pages: '3 pages',
        page: 'Page 2',
        subtitle: "Share interesting Quotes or Phrases On Social Media"
      },
      {
        id: 2,
        bgcolor: "#EB9A17",
        // img: img3,
        title: "Read Anywhere",

        subtitle: "You can also read the same publication on your PC"
      },
      {
        id: 3,
        bgcolor: "#EB9A17",
        // img: img3,
        title: "Read Anywhere",
        page: 'Page 2',
        subtitle: "You can also read the same publication on your PC"
      },
      {
        id: 4,
        bgcolor: "#569BE0",
        // img: img1,
        title: "Our Planet",
        publications: '4 publications',
        pages: '3 pages',
        page: 'Page 2',
        subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
      },
      {
        id: 5,
        bgcolor: "#7C3BD3",
        // img: img2,
        title: "A Cat's Tale",
        publications: '4 publications',
        pages: '3 pages',
        page: 'Page 2',
        subtitle: "Share interesting Quotes or Phrases On Social Media"
      },
      {
        id: 6,
        bgcolor: "#EB9A17",
        // img: img3,
        title: "Read Anywhere",

        subtitle: "You can also read the same publication on your PC"
      },
      {
        id: 7,
        bgcolor: "#EB9A17",
        // img: img3,
        title: "Read Anywhere",
        page: 'Page 2',
        subtitle: "You can also read the same publication on your PC"
      },
      {
        id: 8,
        bgcolor: "#569BE0",
        // img: img1,
        title: "Our Planet",
        publications: '4 publications',
        pages: '3 pages',
        page: 'Page 2',
        subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
      },
      {
        id: 9,
        bgcolor: "#7C3BD3",
        // img: img2,
        title: "A Cat's Tale",
        publications: '4 publications',
        pages: '3 pages',
        page: 'Page 2',
        subtitle: "Share interesting Quotes or Phrases On Social Media"
      },
      {
        id: 10,
        bgcolor: "#EB9A17",
        // img: img3,
        title: "Read Anywhere",

        subtitle: "You can also read the same publication on your PC"
      },
      {
        id: 11,
        bgcolor: "#EB9A17",
        // img: img3,
        title: "Read Anywhere",
        page: 'Page 2',
        subtitle: "You can also read the same publication on your PC"
      }
    ],
    boolean:false,
    follows:[],
    name:'Name',
    loading:true,
    deletedName:'',
    modalVisible:false,
    follow_subscribe_name:'',
    filterdata:[],
    getuserid:'',
    selectedId:'',
    undo:false,
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
  console.log('user id is in follow subscribe ',this.state.getuserid);
  // {this.getData()} 
  this.CheckConnectivity();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
getData(){
  setTimeout(() => {
    { this.exploredata(this.state.getuserid) }
  }, 2000);
}
handleBackButtonClick() {
  this.backpress();
  return true;
} 


exploredata(userid){
  this.setState({loading:true})
  var json=JSON.stringify({
    'UserId':userid,
    });
    fetch("http://162.250.120.20:444/Login/FollowerSubscribed",
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
          this.setState({follows: responseJson,loading:false})
          console.warn(responseJson)
          console.warn("followersubs")

          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}

  backpress=()=>{
    //    console.log('before set',this.props.nav)
      //  this.props.changeNavNews();
      //  this.props.navigation.navigate('MainpageTabs')
      this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
   }
   followService(follower_id) {
    // this.setState({loading:true})
    //for followsubscribe page only pass follower id to followingId & following id to follower id.
    var json = JSON.stringify({"followingID":follower_id,"followerID":this.state.getuserid,"Action_For":"Add"});
    console.log('json follower ',json)
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
        this.setState({loading:false});
        console.log('follow service response ',responseJson)
        { this.exploredata(this.state.getuserid) } 
    })
    .catch((error) => {
        console.warn(error);
    });
  }
  
  unfollow(item){
    this.setState({deletedName:item.Username,
      selectedId:item.follower_id,undo:false});
    this.showModal();
  }
  
  followBtnPressed=({item})=>{
    var list = this.state.list.filter(function(list) { return list.id != item.id });
// this.setState({ users: users });

    // const list = Object.assign({}, this.state.list);
    // // const id = e.currentTarget.dataset.id;
    // delete list[id];
    this.setState({boolean:true,
      name:item.title,
    list:list})
    console.log('values after filtered',list);
  }

  removeItem(item1){
    const filteredList = this.state.follows.filter((item) => item.follower_id != item1.follower_id);
    this.setState({follows:filteredList});
    this.showModal(item1)

  }
  showModal = (item) => {
    // console.log(this.state.undo)
    
      this.setState({
        deletedName:item.Username,
        selectedId:item.follower_id,undo:false,
        modalVisible: true
      });
        // {this.deleteData(this.state.getuserid,this.state.getDeleteId)}
      
      setTimeout(() => {
        this.setState({
          modalVisible: false,
        })
        if(this.state.undo==false){
          {this.followService(this.state.selectedId)}
        }else{
          this.state.follows.push(item);
          this.setState({undo:false})
        }
        
      //  { this.getData()}
        }, 3000);
  
    console.log('undo state ',this.state.undo)
   
  }
  renderCard({ item }) {
    let title=item.title;
    let id=item.id;
    return (
      
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', margin: '2%', }}>
       
        {/* <Avatar
          rounded
          size='medium'
          overlayContainerStyle={{ borderColor: '#24D4BC', borderWidth: 1 }}
          // style={{ borderWidth: 2,  borderTopLeftRadius: 1, borderStyle:'solid' }}
          icon={{ name: 'user', type: 'font-awesome' }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        // containerStyle={{marginLeft:'1%'}}
        /> */}
                    <Image style={{width:50,height:50,borderRadius:50/2,padding:'2%'}} source={{uri:item.userImg}}/>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', paddingLeft: '5%', paddingRight: '2%', flex: 1, }}>
          <Text style={{ textAlign: 'left',marginTop:'-2%', fontSize: 16,
          fontFamily:'Montserrat-Bold' }}
          // style={{ fontSize: 18,backgroundColor:'green', color: 'black', fontWeight: 'bold',width:width,alignSelf:'center',textAlign:'left'}}
          >{item.Username}</Text>

          <TouchableOpacity 
          onPress={()=> this.removeItem(item)}
          // onPress={()=>this.showModal(item)}
          style={{  backgroundColor: '#27A291', elevation: 2, alignItems: 'center', justifyContent: 'center', width: width/4, height: 30, alignSelf: 'center', borderRadius: 20 }}
          // style={{backgroundColor:'#27A291',elevation:2,marginTop:'0.5%',alignItems:'center',width:width/2-90,height:height/16,alignSelf:'center',borderRadius:20}}
          >
            <Text style={{  fontSize: 14,
          color: 'white',
          fontFamily:'AzoSans-Medium' }}>{item.follower_subscriber}</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1,elevation:1,backgroundColor:'#fff',}}>
        {/* <View style={{ height: '11%', backgroundColor: '#ffff', justifyContent: 'space-around', alignItems: 'center', elevation: 1 }}>
          <View style={{ flexDirection: 'row', }}>


            <TouchableOpacity style={{
              backgroundColor: '#27A291',
              borderRadius: 20,

            }}
              onPress={this.headerBtnClk}>
              <Text style={styles.headerText}
              >Followed/Subscribed</Text>

            </TouchableOpacity>
            <TouchableOpacity
          style={{justifyContent:'flex-end',paddingRight:'1%',alignSelf:'flex-end',alignItems:'flex-end'}}
          onPress={()=>this.props.navigation.navigate('newsfeed')}
          >
          <Image style={{marginTop:'5%',}} source={require('../assets/img/close.png')}/>
          </TouchableOpacity>

          </View>
        </View> */}
      
        <View style={styles.staticheader}>
          <View style={{flexDirection:'row',width:width-40,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
          style={[{ backgroundColor: '#27A291',borderRadius:10}]}
            onPress={() => this.props.navigation.navigate('mainpage')}>
            <Text style={{  padding: '5%',
                  fontSize: 14,
                  color: 'white',
                  fontFamily:'AzoSans-Medium',color:'white'}}
            >Followed/Subscribed</Text>
          </TouchableOpacity>
        
      </View>
      <TouchableOpacity onPress={()=>this.backpress()}>
          <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />

      </TouchableOpacity>
      </View>
        {/* <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center',} }>
        <View style={{width:width-30}}>
          <TouchableOpacity style={{ borderRadius: 10,height:height/14,alignItems:'center',justifyContent:'center',backgroundColor:'#27A291',alignSelf:'center',}}
            onPress={this.headerBtnClk}>
            <Text style={{  padding: '5%',
  fontSize: 14,
  color: 'white',
  fontFamily:'AzoSans-Medium',color:'white'}}
            >Followed/Subscribed</Text>

          </TouchableOpacity>
          </View>
          <TouchableOpacity
          style={{justifyContent:'center',}}
          onPress={()=>this.backpress()}
          >
                    <Image
                            style={{ alignSelf: 'center',width:50,height:50 }} 
                            source={require('../assets/img/close.png')} />
                            
                    </TouchableOpacity>

          </View> */}

        {/* <Image
            style={{width:width}}
            resizeMode='cover'
           source={require('../assets/img/collectimg.png')}/>
           <Text style={{alignSelf:'center'}}>Center</Text> */}
        <ScrollView style={{ flex: 1,backgroundColor:'#ffff' }}>
          <FlatList
            data={this.state.follows}
            navigation={this.props.navigation}
            renderItem={this.renderCard.bind(this)}
            style={{ margin: '2%' }}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
          />


        </ScrollView>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View style={{
          left:0,right:0,bottom:0,position:'absolute',  
          height:'8%', 
          alignItems:'center',
          flexDirection:'row',
          justifyContent:'space-around',
          backgroundColor: 'red',
}}>
       {/* <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>{!this.state.follow_subscribe_name=='Followed'?'Unfollowed':'UnSubscribed'} - {this.state.deletedName} </Text> */}

<Text style={{fontSize:16,textAlign:'center',
          color: 'white',
          fontFamily:'AzoSans-Bold'}}> Unfollowed - {this.state.deletedName} </Text>
         
         
        <TouchableOpacity style={{alignSelf:'center',marginRight:'2%'}} 
        onPress={()=>this.setState({undo:true})}
        >
            <Text style={{fontSize: 16, color: '#fff',textDecorationLine:'underline',
          fontFamily:'AzoSans-Regular'}}>Undo</Text>
         </TouchableOpacity>
          
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
       {/* {this.state.boolean?( <View style={styles.bottomLine}>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',alignItems:'center',paddingLeft:'3%',paddingRight:'3%' }}>     
                         <Text style={{color:'white',fontSize:18}}>Unfollowed - {this.state.name}</Text>
                                              
                       <Text style={{fontSize:16,textDecorationLine:'underline',color:'white',textDecorationColor:'white'}}>Undo</Text>
                    </View>

                </View>):null} */}
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
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
  },
  bottomLine: {
    height: '8%',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#E74C3C'

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
  activetext: {
    padding: '5%',
    fontSize: 14,
    fontFamily: 'AzoSans-Medium',
    color: 'white'
  },
  staticheader:{
    flexDirection:'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '8%',
     backgroundColor: '#ffff',
     elevation:1,
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

export default connect(mapStateToProps,mapDispatchToProps)(FollowSubscribe);

//   render() {
//     const { navigate } = this.props.navigation;

//     return (
//       <View style={{ flex: 1 }}>
        // <View style={{ height: '10%', backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center',elevation:1 }}>
        //   <View style={{ flexDirection: 'row', }}>

        //     <Text style={styles.headerText}
        //       onPress={() => this.props.navigation.navigate('TabPage')}
        //     >Collection</Text>
        //     <TouchableOpacity style={{
        //       backgroundColor: '#27A291',
        //       borderRadius: 10,
        //     }}
        //       onPress={this.headerBtnClk}>
        //       <Text style={styles.headerText}
        //       >Pins</Text>

        //     </TouchableOpacity>

        //   </View>
        // </View>

//         <Text
//           style={styles.headerText}>
// sadfdsfsdf           </Text>


//       </View>
//     )
//   }

// }
// const styles = StyleSheet.create({
//   headerText: {
//     padding: '5%',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
// })