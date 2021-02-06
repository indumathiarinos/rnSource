import React, { Component } from 'react'
import {AsyncStorage,SafeAreaView,Modal,View, FlatList,BackHandler,ImageBackground, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Divider } from 'react-native-elements';
import { connect } from "react-redux";
import Modal1 from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import Icons from 'react-native-vector-icons/AntDesign'

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.disableYellowBox = true;

class CommentsLike extends Component {
  constructor(props){
    super(props)
  this.state = {
    commentsLike:[],
    list: [
      {
        id: 0,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
             },
      {
        id: 1,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 2,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 3,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 4,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
       },
      {
        id: 5,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
       },
      {
        id: 6,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 7,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 8,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 9,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 10,
        img: require('../assets/img/user.png'),
        title: "Honey bee",
      },
      {
        id: 11,
        img: require('../assets/img/user.png'),
        title: "Honey Bee",
      }
    ],
    commentId:'',
    getuserid:'',
    gettypeid:'',
    getpostid:'',
    replyId:''
    
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
exploredata(){
  var json=JSON.stringify({
    // "C_ID":this.state.commentId,
    "C_ID":this.state.commentId,
    "R_ID":this.state.replyId});
  console.log('get json ',json)
    fetch("http://162.250.120.20:444/Login/CommentLikeView",
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
          //alert(responseText);1
          this.setState({commentsLike: responseJson,loading:false})
          console.warn(responseJson)
      })
      .catch((error) => {
          console.warn(error);
      });
}
componentDidMount() {
  AsyncStorage.getItem('commentId').then((val)=>this.setState({commentId:val})).done();
  AsyncStorage.getItem('userid').then((value) => { this.setState({ getuserid: value }) }).done();
  AsyncStorage.getItem('typeid').then((value) => { this.setState({ gettypeid: value }) }).done();
  AsyncStorage.getItem('postid').then((value) => { this.setState({ getpostid: value }) }).done();
  AsyncStorage.getItem('commentId').then((value) => { this.setState({ commentId: value==null?"":value }) }).done();
  AsyncStorage.getItem('replyId').then((value) => { this.setState({ replyId: value==null?"":value }) }).done();

  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  this.getData();
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.backpress();
  return true;
} 

getData(){
  setTimeout(() => {
    {this.exploredata()}
  }, 1000);
}

backpress=()=>{
  //  this.props.changeNavNews();
  //  this.props.navigation.navigate('MainpageTabs')
  this.props.navigation.goBack();
}

renderCard({ item }) {
return (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', margin: '2%', }}>
   <Image style={{width:40,height:40,borderRadius:20,marginRight:16}} source={{uri:item.avatar}}/>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', paddingLeft: '5%', paddingRight: '2%', flex: 1, }}>
      <Text style={{ textAlign: 'left', fontSize: 14, fontFamily: 'Montserrat-Bold',marginTop:'-2%' }}
      >{item.username}</Text>
    </View>
  </View>
)
}
render() {
const { navigate } = this.props.navigation;
return (
  <SafeAreaView style={{ flex: 1}}>
     <View style={{ height: '7%',flexDirection:'row',backgroundColor: '#ffff',elevation:1,justifyContent:'space-between',alignItems:'center'  }}>
      <TouchableOpacity style={{marginLeft:'5%'}} >
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'#27A291',fontSize:16,fontFamily:'AzoSans-Regular',marginRight:'4%'}}>{this.state.commentsLike.length} Likes</Text>
        {/* <Image source={require('../assets/img/like.png')}/> */}
        <Icons name={'like1'}
                size={20}
                style={{ alignSelf: 'center' }}
                color={'#27A291'}
              />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      style={{justifyContent:'center',}}
      onPress={()=>this.backpress()}
      >
          <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />
      </TouchableOpacity>

  </View>


    <ScrollView style={{ flex: 1,backgroundColor:'#ffff' }}>
      <FlatList
        data={this.state.commentsLike}
        navigation={this.props.navigation}
        renderItem={this.renderCard.bind(this)}
        style={{ margin: '2%' }}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
      />


    </ScrollView>
 
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

export default connect(mapStateToProps,mapDispatchToProps)(CommentsLike);

