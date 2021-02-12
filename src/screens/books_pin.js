import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  BackHandler,
  AsyncStorage,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import LinearGradient from 'react-native-linear-gradient';
import img1 from '../assets/img/coverimgread.png';
import img2 from '../assets/img/searchimg2.png';
import img3 from '../assets/img/searchimg3.png';
import { connect } from "react-redux";
import Modal1 from "react-native-modal";
import HTMLView from 'react-native-htmlview';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class BooksPin extends Component {
  constructor(props){
    super(props)
  this.state = {
    showlikeImg: false,
    showReport:false,
        list: [
          {
            id: 0,
            bgcolor: "#569BE0",
            img: img1,
            title: "Collect, Pin, Bookmark",
            subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
          },
          {
            id: 1,
            bgcolor: "#7C3BD3",
            img: img1,
            title: "Share Quotes",
            subtitle: "Share interesting Quotes or Phrases On Social Media"
          },
          {
            id: 2,
            bgcolor: "#EB9A17",
            img: img1,
            title: "Read Anywhere",
            subtitle: "You can also read the same publication on your PC"
          },
          {
            id: 3,
            bgcolor: "#7C3BD3",
            img: img1,
            title: "Share Quotes",
            subtitle: "Share interesting Quotes or Phrases On Social Media"
          },
          {
            id: 4,
            bgcolor: "#EB9A17",
            img: img1,
            title: "Read Anywhere",
            subtitle: "You can also read the same publication on your PC"
          },
          {
            id: 5,
            bgcolor: "#569BE0",
            img: img1,
            title: "Collect, Pin, Bookmark",
            subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
          },
          {
            id: 6,
            bgcolor: "#7C3BD3",
            img: img1,
            title: "Share Quotes",
            subtitle: "Share interesting Quotes or Phrases On Social Media"
          },
          {
            id: 7,
            bgcolor: "#EB9A17",
            img: img1,
            title: "Read Anywhere",
            subtitle: "You can also read the same publication on your PC"
          },
          {
            id: 8,
            bgcolor: "#7C3BD3",
            img: img1,
            title: "Share Quotes",
            subtitle: "Share interesting Quotes or Phrases On Social Media"
          },
     
        ],
        getuserid:'',
        pins:'',
        // pinsCount:'',
        loading:true,
        SortBy:"DESC",
        getpostid:'',
        gettypeid:''
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
async componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
  AsyncStorage.getItem('pinsFilter').then((val) => this.setState({ SortBy: val })).done();
  AsyncStorage.getItem('postid').then((val) => this.setState({ getpostid: val })).done();
  AsyncStorage.getItem('typeid').then((val) => this.setState({ gettypeid: val })).done();

  AsyncStorage.setItem('contentFilter',"ASC");
  console.log('user id ',this.state.getuserid,this.state.SortBy);
//    AsyncStorage.getItem('sectionPin').then((val) =>Alert(val)).done();

  this.CheckConnectivity();

  this.focusListener = this.props.navigation.addListener('willFocus', () => {
   // AsyncStorage.getItem('sectionPin').then((val) =>Alert.alert(val)).done();
   
   // AsyncStorage.getItem('sectionPin').then((val) => this.setState({ newsection: val })).done();
   AsyncStorage.getItem('pinsFilter').then((val) => this.setState({ SortBy: val })).done();
   console.log('user id ',this.state.getuserid,this.state.SortBy);

   this.CheckConnectivity();

})
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
      { this.exploreData(this.state.getuserid) }
          }, 1000)
}
exploreData(userid) {
  this.setState({loading:true})
  var json = JSON.stringify({
    "options":"Select","page_id":"","type":this.state.gettypeid,"collection_id":"","section_id":"","Description":"","user_id":userid,"SortBy":this.state.SortBy,"pub_id":this.state.getpostid
  });
  console.log('json ',json)
  fetch("http://162.250.120.20:444/Login/pinsInsertGet",
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
          this.setState({ pins: responseJson,loading:false })
          console.warn(responseJson)
       
          //alert(this.state.data.status)


      })

      .catch((error) => {
          console.warn(error);
      });
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  this.focusListener.remove();
}
handleBackButtonClick() {
  this.backpress();
  return true;
}
  backpress=()=>{
    //    console.log('before set',this.props.nav)
      //  this.props.changeNavRec();
      //  this.props.navigation.navigate('MainpageTabs')
      this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
   }
   pressIcon = (item) => {
    let { pins } = this.state;
    // console.log('items are', item)
    pins = pins.map(e => {
        if (item.page_id=== e.page_id) {
            // item.like = !e.like;
            AsyncStorage.setItem('typeid', JSON.stringify(4));
            AsyncStorage.setItem('postid', JSON.stringify(item.page_id));

            return this.props.navigation.navigate('readingBook');
        } else {
            return e;
        }
    });
}
renderItem_card({ item }) {
  const value = item;
  return (
      <View style={{ width:width/3-10,margin:5, }} >
          <TouchableOpacity onPress={()=>this.pressIcon(item)} >
            <View style={{ backgroundColor: '#fff', borderRadius: 10,
          // alignItems:'center',alignSelf:"center",justifyContent:'center'
           }}>
              <View style={{ width: width / 3-20, height: height / 5.2, flex:1,alignItems: 'center', justifyContent: 'center' }}>
                  <Text numberOfLines={5} style={{width: width / 3 - 30,textAlign:'left',marginTop:5,marginBottom:5,alignSelf:'center', fontSize: 12,    color:'#707070',
                  fontFamily:'AzoSans-Italic',}}>{item.description}</Text>
              </View>
{/* <View style={{ marginLeft:10,marginRight:10,  alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{item.description}</Text>
              </View> */}
                        {/* <HTMLView style={{width:width/2-30,height:height/6,alignSelf:'center',padding:'5%'}} value={item.page_title}/> */}

              </View>
              <Text style={{ fontSize: 15,width: width / 3 - 30,fontFamily: 'AzoSans-Italic', color:'#707070',textAlign:'center',marginTop:5,marginBottom:5}}>{item.page_url}</Text>
              </TouchableOpacity>

          {/* <View style={{ alignItems: 'center', marginLeft: '15%', marginBottom: 5, marginTop: 5}}> */}
              {/* <Text style={{ color: '#707070', fontSize: 16 }}>{item.page}</Text> */}
          {/* </View> */}
      </View>

      //   <View style={{ flex:1 }}>
      //     <Image
      //       style={{ width: width/2-50, height: 80,marginTop:10, alignSelf: 'center'}}
      //       source={item.img}
      //       onPress={() => console.log("Works!")}
      //       activeOpacity={0.7}
      //     />
      //     <Text style={{ margin: '5%', color: '#2d2e2d',textAlign:'center',fontWeight:'bold' }}>{item.title}</Text>
      //   </View>

  )

}
  render() {
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;
    const listCount=this.state.list.length;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <View style={styles.staticheader}> */}
        <View style={styles.staticheader}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('booksPinFilter')}
          >
        <Image
            style={{ alignSelf: 'center',width:50,height:50,}}
            source={require('../assets/img/filter.png')}/>   
                   </TouchableOpacity>
          <View style={{ flexDirection: 'row',  width: width-105, justifyContent: 'center', alignItems: 'center' }}>
           
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('viewBook')}>
              <Text style={styles.headerText}

              >Description</Text>
            </TouchableOpacity>
           
          

            <TouchableOpacity style={{ alignItems: 'center' }} 
              onPress={() => this.props.navigation.navigate('contents',{'sortby':"Asc"})}
              >
              <Text style={styles.headerText}

              >Contents</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              backgroundColor: '#27A291',
              borderRadius: 10,
            }}
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 14,
                fontFamily:'AzoSans-Medium',
                color: 'white',
              }}
                // onPress={() => this.props.navigation.navigate('books_pin')}
              >Pins</Text>
            </TouchableOpacity>

            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity style={{ margin: 5 }} onPress={() => this.backpress()}>
          <Image style={{ alignSelf: 'center',width:50,height:50, }} source={require('../assets/img/close.png')} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.header}>
          </View> */}
        <ScrollView>

          <View style={styles.body}>
            {/* <Text style={styles.title}>Pins</Text> */}
          <FlatList
              data={this.state.pins}
            //   navigation={()=>this.order_nav1.bind(this)}
              extraData={this.state}
              renderItem={this.renderItem_card.bind(this)}
              numColumns={3}
              removeClippedSubviews={false}
              enableEmptySections={false}
              contentContainerStyle={{
                // padding:'2%',
                // paddingLeft:'5%',
                flex: 1,
                marginBottom:'20%',
                // alignItems:'center',
                justifyContent:'center',
                // alignItems:'center'
                // marginTop:'5%',marginLeft:'5%'
            }}            
              keyExtractor={(item, index) => index.toString()}
            />

          </View>

       
        </ScrollView>
        <View style={styles.bottomBar}>
          <TouchableOpacity 
          style={styles.bottomBtn}>
            <Text style={styles.bottomText}> {this.state.pins.length} Pins</Text>
          </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ padding: '1%' }}
              onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
            >              <Image
                source={imgSource}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: '1%' }}
              onPress={() => this.props.navigation.navigate('comments')}
            >
              <Image

                source={require('../assets/img/comment1.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: '1%' }}
              onPress={() => this.props.navigation.navigate('createCollection')}
            >
              <Image source={require('../assets/img/plus.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: '1%' }}
            >
              <Image source={require('../assets/img/share.png')} />
            </TouchableOpacity> */}
          </View>
          <Modal1 isVisible={this.state.loading} >
                            <Image source={require('../assets/gif/logo.gif')} style={{
                                alignSelf: 'center',
                                width: 140,
                                height: 140
                            }} />
                            </Modal1>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bottomBtn:{
    width:width,
    alignItems:'center',
    alignContent:'center',
    backgroundColor:'#27A291',
    justifyContent:'center',
    // padding:'1%'

  },
  bottomText:{
    color:'#ffff',
    fontSize:14,
    fontFamily:'AzoSans-Regular'
  },
  logoContainer:{
    flexDirection: 'row',
    width:width,
    justifyContent:'space-around',
    marginTop:'5%',
    marginBottom:'10%'
  },
    text3:{
      color:'#27A291',
      fontSize:16,
    },
  viewsInfo:{
    width:width-60,
    // alignItems:'center',
    justifyContent:'space-between',
    // backgroundColor:'pink',
    margin:'4%'
  },
  btnText:{
    color:'white',
    paddingLeft:'5%',
    fontSize:18
  },
  text1:{
    color:'#707070',
    // paddingLeft:'5%',
    fontSize:14,
    alignSelf:'center'
  },
  text2:{
    color:'#000',
    fontSize:18,
    fontWeight:'bold',
    alignSelf:'center'
  },
  
  btnview: {
    backgroundColor: '#fff',
    elevation:2,
    // padding: '2%',
    width: width/3,
    height: height / 16,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginTop:5
  },
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 2.2,
  },
  sliderContainerStyle: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: 'pink'
  },
  headerText: {
    padding: '5%',
    fontSize: 14,
    color:'#707070',
    fontFamily:'AzoSans-Medium',
  },
  rectangle: {
    width: 150,
    height: 120 * 2,
    borderRadius: 15,
    backgroundColor: "pink",
    alignSelf: 'center',
    marginTop: 130
  },

  header: {
    backgroundColor: "#00BFFF",
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 1.7
    // height:180,

  },
  
  staticheader: {
    // paddingLeft: '2%',
    // paddingRight:'2%',
    flexDirection: 'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '10%',
    backgroundColor: '#ffff',
    elevation: 1,
    borderBottomColor:'#707070'


  },
  avatar: {
    // width: 110,
    // height: 110,
    // borderRadius: 63,
    // borderWidth: 2,
    // borderColor: "white",

    width: 150,
    height: 120 * 2,
    borderRadius: 15,
    // backgroundColor: "pink",
    alignSelf: 'center',
    marginBottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30  //actual marginTop:130
  },
  bottomBar: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    // padding:'2%',
    flexDirection: 'row',
     justifyContent: "center" ,
     height:'8%',
    // padding:'2%',
    // margin:'3%',
    position:'absolute',
    left:0,
    right:0,
    bottom:0
    // marginTop: 30
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    flex:1,
    // marginTop: '15%',
  },
  bodyContent: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 22,
    color: "#000",
    fontWeight: "700"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
  },
  description: {
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#00BFFF",

  },
  buttonContainer1: {
    marginTop: 20,
    height: 45,
    marginLeft: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    borderRadius: 30,
    backgroundColor: "#00BFFF",

  },
  socialBarContainer3: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  socialBarContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20
  },
  socialBarContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info1:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color:'#000'
    // alignItems: 'center',
  },
  info2:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor:'skyblue',
    width:width/2.4
    // alignItems: 'center',
  },
  divider: {
    width: 2,
    height: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -10,
    backgroundColor: 'black'
  },
  icon: {
    width: 25,
    marginLeft: 5,
    height: 25,
  },
  btnAction: {
    height: 45,
    width: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: "#fff",
  },
  title:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
    // padding:'2%',
    marginTop:'5%',
    marginBottom:'5%'

  }
});


export default BooksPin;