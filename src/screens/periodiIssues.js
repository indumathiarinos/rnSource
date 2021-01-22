import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  BackHandler,
  SafeAreaView,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Tooltips from 'react-native-tooltips';
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Bottom extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={styles.container1} ref={(parent) => {
        this.parent = parent
      }}>
         <TouchableOpacity style={styles.btnview1}
          ref={target => {
            this.target1 = target;
          }}
          onPress={() => {
            this.props.onPress(this.parent, this.target1);
          }}
       >
         <Text style={{ color:'#27A291'}}>Subscribe</Text>
    </TouchableOpacity>

      </View>
    );
  }
}
class PeriodiIssues extends Component {
  constructor() {
    super();
  this.state = {   
      list: [
        {
            id: 0,
            bgcolor: "#569BE0",
            img: require('../assets/img/periodissue1.png'),
            title: "Designigami",
            content:'Packaging Design - Bite Me: Packaging Insults Chewers as They... Grab a Piece of Tooth-Shaped Gum',
            Issues:'Issue 5',
            Pages:'Pages 5',
            subtitle: "Created a page on 4 May 2019",
            booknav:false
        },
        // {
        //     id: 1,
        //     bgcolor: "#7C3BD3",
        //     img: require('../assets/img/periodIssue.png'),
        //     title: "Ainaini",
        //     Issues:'Issue 5',
        //     Pages:'Pages 5',
        //     subtitle: "Created a page on 4 May 2019"
        // },
        // {
        //     id: 2,
        //     bgcolor: "#EB9A17",
        //     img: require('../assets/img/periodIssue.png'),
        //     title: "Ainaini Rahin",
        //     Issues:'Issue 5',
        //     Pages:'Pages 5',
        //     subtitle: "Created a page on 4 May 2019"
        // }
    ],
    titleField:'Designigami',
    showlikeImg: false,
    showReport:false,
    img:'',
    title:'',
    content:'',
    updateddate:'',
    releasedate:'',
    totalviews:'',
    publication_Imagepath:'',
    partcount:'',
    copyrights:'',
    partname:'',
    gettypeid:'',
    getpostid:'',
    visible:false,
    tooltip:false,
    periodicalData:'',
    loading:true,
    issuesList:'',
    author:'',
    editor:'',
    illustrator:'',
    translator:'',
    getperiodicalid:'',
    avatar:'',
    username:''
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid : value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid : value })).done();
    AsyncStorage.getItem('periodicalid').then((value) =>{ this.setState({ getperiodicalid : value })}).done();
    // { this.getData() }
    this.CheckConnectivity();

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
tooltipPress=()=>{
  this.setState({
    // tooltip:!this.state.tooltip,
    visible:!this.state.visible
  });
  if(this.state.visible && this.state.tooltip==true){
    console.log('visible and tooltip state is ',this.state.visible,this.state.tooltip)
  setTimeout(() => {
    this.setState({tooltip:false})
    }, 3000);
  }else{
    this.setState({tooltip:false})
  }
}
getData() {
  setTimeout(() => {
    {this.exploredata(1,this.state.getperiodicalid)}
    // {this.exploredata1(this.state.getpostid)}
    console.log('get postid in periodical issues page ',this.state.getperiodicalid,this.state.gettypeid)
      // { this.exploredata(this.state.gettypeid, this.state.getpostid) }
  }, 1000)
}



exploredata(typeid,postid) {
// {"TypeID":"1","Post_PageID":"3"}
// console.log('dsflkajdkfksd ',typeid,postid)
var json = JSON.stringify(
  //siddiq told  
   {
     "TypeID":typeid,
  "Post_PageID":postid
}
//   {"TypeID":typeid,
//   "Post_PageID":postid
// }
);
fetch("http://162.250.120.20:444/Login/HelpPublicationDescAdd",
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
        this.setState({ periodicalData: responseJson,loading:false})
        console.warn(responseJson)
       // this.setState({ img: responseJson[0].Image })
        for (let i = 0; i <this.state.periodicalData.length; i++) {
                 // alert(this.state.bookdetail[0].Image)
                  this.setState({ 
                    img: responseJson[i].Image,
                    title:responseJson[i].Title,
                    content:responseJson[i].Content,
                    updateddate:responseJson[i].Updated_Date,
                    releasedate:responseJson[i].Release_Date,
                    totalviews:responseJson[i].Totalviews,
                    partcount:responseJson[i].PartCount,
                    copyrights:responseJson[i].Copyrights,
                    partname:responseJson[i].partname,
                    author:responseJson[i].post_author,
                    editor:responseJson[i].post_editor,
                    illustrator:responseJson[i].post_illustrator,
                    translator:responseJson[i].post_translator,
                    avatar:responseJson[i].avatar,
                    username:responseJson[i].username,
                    publication_Imagepath: responseJson[i].publication_Imagepath,
                   })

                  //  Title: "SNOW WHITE AND THE SEVEN DWARF"
                  //  Content: "Once upon a time . . . in a great castle, a Prince’s daughter grew up happy and contented, in spite of a jealous stepmother. She was very pretty, with blue eyes and long black hair. Her skin was delicate and fair, and so she was called Snow White. Everyone was quite sure she would become very beautiful. Though her stepmother was a wicked woman, she too was very beautiful, and the magic mirror told her this every day, whenever she asked it"
                  //  Updated_Date: "17 February 2020"
                  //  Release_Date: ""
                  //  Totalviews: 7
                  //  PartCount: 0
                  //  Copyrights: "All Rights Reserved"
                  //  partname: "Section"
        }
      //alert(this.state.bookdetail[0].Image)


    })
    .catch((error) => {
        console.warn(error);
    });
}
// exploredata1(postid) {
//   // {"TypeID":"1","Post_PageID":"3"}
//   // console.log('dsflkajdkfksd ',typeid,postid)
//   var json = JSON.stringify(
//     {
//       "postid":postid
//   });
//   fetch("http://162.250.120.20:444/Login/PeriodicalDesc",
//     {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'content-type': 'application/json'
//       },
//       body: json  
//     }
//   )
//       .then((response) => response.json())
//       .then((responseJson) => {
//           //alert(responseText);
//           this.setState({ issuesList: responseJson,loading:false})
//           console.warn(responseJson)
        
//       })
//       .catch((error) => {
//           console.warn(error);
//       });
//   }
//   renderViewMore(onPress) {
//     return (
//       <Text onPress={onPress}>View more</Text>
//     )
//   }
//   renderViewLess(onPress) {
//     return (
//       <Text onPress={onPress}>View less</Text>
//     )
//   }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Read more
          </Text>
    );
  }
  imgPress=()=>{
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.refs.modal6.close();
    this.refs.modal5.close();
    this.props.navigation.navigate('socialmedia')
    // Share.shareSingle(shareOptions);
  }
  _onPress (parent, target) {
    this.setState({ visible: true, parent: parent, target: target });
  }
  _renderRevealedFooter = (handlePress) => {
    return (
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                     <View style={styles.info1}>
                <Image source={require('../assets/img/flag.png')}/>
                    <Text style={styles.text1}>Report</Text>
                </View>
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Show less
          </Text>
      </View>
    );
  }
 
  backpress=()=>{
    //    console.log('before set',this.props.nav)
       this.props.changeNavNews();
       this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
   }
  render() {
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;

    return (
      <SafeAreaView style={{ flex: 2, backgroundColor: '#fff' }}>
        {/* <View style={styles.staticheader}> */}
        <View style={styles.staticheader}>
          <TouchableOpacity
          // onPress={()=>this.props.navigation.navigate('newsfeed')}
          >
            <Image source={require('../assets/img/download.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{
              backgroundColor: '#27A291',
              borderRadius: 20,
            }}
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}
              >Description</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('periodiFeeds')}
            >
              <Text style={styles.headerText}

              >Feeds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('periodiIssues')}
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
        {/* <View style={styles.header}>
          </View> */}
        <ScrollView >
          <View style={styles.containerStyle} >
            <ImageBackground style={styles.sliderContainerStyle}
              source={{uri:this.state.img}}>
              {/* <Slider/> */}
            </ImageBackground>
          </View>

          <Image style={styles.avatar} source={{uri:this.state.img}} />

          <View style={styles.body}>

            <View style={styles.bodyContent}>

              <Text style={styles.name}>{this.state.title}</Text>
              <View
                style={{ marginTop: 10 }}>
                <ReadMore
                  numberOfLines={5}
                  renderTruncatedFooter={this._renderTruncatedFooter}
                  renderRevealedFooter={this._renderRevealedFooter}
                  onReady={this._handleTextReady}>
                  <Text style={styles.description}>
                    {this.state.content}
                    </Text>
                </ReadMore>
              </View>
              <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >

<TouchableOpacity
  onPress={() => this.props.navigation.navigate('readingBook')}>
  <View style={styles.socialBarButton}>
    <Image source={require('../assets/img/open-book.png')} />
    <Text style={styles.btnText}>Read</Text>
  </View>
</TouchableOpacity>
</LinearGradient>
              <View style={styles.viewsInfo}>
             
                  {/* <View style={{flexDirection:'column',backgroundColor:'pink'}}> */}
                  <View style={{ flexDirection: 'row',justifyContent: 'space-between', }}>
                    <View style={styles.info1}>
                      <Image style={{ marginRight: '4%' ,top:"5%",marginTop:"2%"}} source={require('../assets/img/eye.png')} />
                      <Text style={styles.text1}> {this.state.totalviews}</Text>
                    </View>

                    <View style={styles.info2}>
                      <Image style={{ marginRight: '2%' }} source={require('../assets/img/section.png')} />
                      <Text style={styles.text1}>Sections</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={styles.info1}>
                      <Text style={styles.text1}>Published: {this.state.updateddate}</Text>
                    </View>
                    <View style={styles.info2}>
                      <Text style={styles.text1}>Release Date: {this.state.releasedate}</Text>
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={styles.info1}>
                      <Text style={styles.text1}>{this.state.copyrights}</Text>
                      <Image source={require('../assets/img/open-book.png')} />
                    </View>
                    <View style={styles.info2}>
                      <Text style={styles.text1}>ISBN:</Text>
                    </View>
                    {/* </View> */}
                  </View>

              </View>
              {/* <Tooltip popover={<Text>Info here</Text>}>
                <Text style>Press me</Text>
              </Tooltip> */}
    <View style={{margin:'2%'}}>

                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.authText}>Author</Text>
                  <Text style={{width:width/2,textAlign:'left',fontSize:16,fontWeight:'bold',}}>{this.state.author}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.authText}>Editor</Text>
                  <Text style={{width:width/2,textAlign:'left',fontSize:16,fontWeight:'bold',}}>{this.state.editor}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.authText}>Illustrator</Text>
                  <Text style={{width:width/2,textAlign:'left',fontSize:16,fontWeight:'bold',}}>{this.state.illustrator}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.authText}>Translator</Text>
                  <Text style={{width:width/2,textAlign:'left',fontWeight:'bold',fontSize:16}}>{this.state.translator}</Text>
                </View>
              </View>
              <View 
              style={{flexDirection:'row',justifyContent:'space-around',width:width,height:height/16,marginBottom:90}}
              // style={styles.logoContainer}>
              >
                    {/* {!value ? 
                    ( */}
                      <TouchableOpacity
                      style={{flexDirection: 'row', 
                      // justifyContent: 'space-around',
                       alignItems: 'center',width:width/2,marginLeft:'5%'}}
                        onPress={() => this.props.navigation.navigate('profileAbout')}>
                       
                          <Image 
                          // source={require('../assets/img/logo1.png')} 
                          style={{width:30,height:30,borderRadius:30/2}}
                          source={{uri:this.state.avatar}}/>
                          <Text 
                        
                          style={[styles.text2,{marginLeft:'8%'}]}
                          >{this.state.username}</Text>

                      </TouchableOpacity>
                      {/* ) : (
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('profileAbout')}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image source={require('../assets/img/period2.png')} />
                            <Text style={styles.text2}>Designigami</Text>
                          </View>
                        </TouchableOpacity>
                      )} */}
                    <View>
                      <View>
                     
  <TouchableOpacity onPress={()=>this.tooltipPress()} style={[!this.state.visible?styles.btnview:styles.activeBtnview]}>
    <Text style={[!this.state.visible?styles.inactive:styles.active]}>{!this.state.visible?"Follow":"Followed"}</Text>
  </TouchableOpacity>
 {this.state.tooltip? <View style={styles.talkBubble}>
              <View style={styles.talkBubbleSquare}>
                <Text style={styles.talkBubbleMessage}>Followed PageVio</Text>
              </View>
              <View style={styles.talkBubbleTriangle} />
              </View>:null}
 
                      </View>
                 
                    </View>
                  </View>

            </View>
          </View>
        </ScrollView>     
        <ModalBox
          style={[styles.modal, styles.modal5]}
          position={'center'}
          ref={'modal5'}
          isDisabled={this.state.isDisabled}>
         <View style={{height: 40,
      width: 300,alignItems:'center',justifyContent:'center'}}>
        {/* <TouchableOpacity  onPress={()=> this.refs.modal6.open()} >
        <Text style={styles.modaltext}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity >

           <Text style={styles.modaltext}>Copy Link</Text>
           </TouchableOpacity> */}
           <TouchableOpacity  onPress={ ()=>this.props.navigation.navigate('report')} >

           <Text style={styles.modaltext}>Report</Text>
           </TouchableOpacity>
         </View>
        </ModalBox>
        <ModalBox 
              style={{  alignItems: 'center',
              flex:0.55,
              borderRadius:20,
              // flex:!this.state.expanded?0.4:0.5,
              width: 300,}}
             position={'center'}
             ref={'modal6'}
             isDisabled={this.state.isDisabled}>
          <View style={{ flex: 0.6,backgroundColor:'#fff',borderRadius:30,margin:'8%' }}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:20,margin:'5%',textAlign:'center'}}>Share Via</Text>
              <View style={{flexDirection:'column',justifyContent:'center',alignSelf:'center'}}>
                 <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/fb2.png')}/>
         <Text style={{margin:'2%'}}>Facebook</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/twitter.png')}/>
         <Text style={{margin:'2%'}}>Twitter</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center', }}>
       <Image source={require('../assets/img/insta.png')}/>
         <Text style={{margin:'2%'}}>Instagram</Text>
       </View>

       </TouchableOpacity>
       </View>
       <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/pinterest.png')}/>
         <Text style={{margin:'2%'}}>Pinterest</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/tumblr.png')}/>
         <Text style={{margin:'2%'}}>Tumblr</Text>
       </View>

       </TouchableOpacity>
      
       </View>
   
   </View>
               
            </View>
           </View>
        </ModalBox>
        <Modal isVisible={this.state.loading}>
          <Image source={require('../assets/gif/logo.gif')} style={{
            alignSelf: 'center',
            width: 140,
            height: 140
          }} />
        </Modal>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={{ padding: '1%' }}
            onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
          >
            {/* {this.renderImage} */}
            <Image

              source={imgSource}
            />
          </TouchableOpacity>
          {/* <Image
            onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
           source={imgSource}/> */}
          <TouchableOpacity
            style={{ padding: '1%' }}
            onPress={() => this.props.navigation.navigate('comments')}
          >
            <Image

              source={require('../assets/img/comment1.png')} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{ padding: '1%' }}
            onPress={() => this.props.navigation.navigate('createCollection')}
          >
            <Image source={require('../assets/img/plus.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ padding: '1%' }}
           onPress={()=> this.refs.modal6.open()} >
            
            <Image source={require('../assets/img/share.png')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    width: width,
    marginTop:'5%',
    marginBottom:'25%',
    backgroundColor:'pink',
    alignItems:'center',
    justifyContent:'space-around'
  },
  inactive:{ color: '#27A291',fontSize:17 },
  active:{ color: '#fff',fontSize:17 },
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems:'flex-end',
    zIndex: 2, // <- zIndex here
    flex: 1,
    // left: 5,
    right:5,
    top: 60,
  },
  talkBubbleSquare: {
    width: width/4,
    height: 30,
    backgroundColor: '#27A291',
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  talkBubbleTriangle: {
    position: 'absolute',
    top: -8,
    left: 50,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#27A291',
    borderLeftColor: 'transparent',
    
    // borderLeftWidth: 8,
    // borderRightWidth:8,
    // borderBottomWidth:8,
    // borderLeftColor: 'transparent',
    // borderRightColor: 'transparent',
    // borderTopColor: 'transparent',
    
    // borderColor:'#24d4bc'
  },
  talkBubbleMessage: {
    color: '#fff',
   fontSize:12,
   alignSelf:'center'
  },
  // divider:{
  //   width:width/3.8,
  //   height:5,
  //   borderRadius:10,
  //   // marginLeft:5,
  //   // marginRight:5,
  //   backgroundColor:'#27A291'
  // },
  divider:{
    width: width-40,
    height:1,
    backgroundColor:'#27A291'
  },
  issueContainer: {
    width: width-40,
    // alignItems:'center',
    // justifyContent: 'center',
    marginTop:'10%',
    marginBottom:30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
 modaltext:{
  fontSize:18,
  padding:'4%',
  color:'#707070'
 },
 
    modal5: {
      height: 40,
      width: 300,
      alignItems:'center'
    },
  text3: {
    color: '#27A291',
    fontSize: 16,
  },
  viewsInfo: {
    width: width - 60,
   
    margin: '4%'
  },
  btnText: {
    color: 'white',
    paddingLeft: '5%',
    fontSize: 18
  },
  info1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#000',
    padding: '0.5%'
    // alignItems: 'center',
  },
  info2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // flex:1,
    // backgroundColor:'skyblue',
    width: width / 2.1,
    marginLeft:'1%',
    padding: '0.5%'

    // alignItems: 'center',
  },
  text1: {
    color: '#707070',
    // paddingLeft:'5%',
    fontSize: 14,
    alignSelf: 'center'
  },
  text2: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  btnview: {
    marginTop:'2%',
    marginBottom:'2%',
    backgroundColor: '#fff',
    // flex:1,
    elevation: 2, 
    width:width/3,
    // padding: '2%',
    height: height / 16,
    // maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    // paddingRight:'2%'
  },
  btnview1: {
    backgroundColor: '#fff',
    // flex:1,
    elevation: 2, 
    width: width / 3,
    height: height / 16,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    // paddingLeft:'2%'
  },
  authText:{
    width:width/4,
    textAlign:'left',
    fontSize:16,
    color: '#707070'
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
    borderColor:'#CCCCCC',
    borderWidth:0.4
  },
  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
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
  avatar: {
    borderRadius: 15,
    // backgroundColor: "pink",
    alignSelf: 'center',
    marginBottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 130,
    height: 130,
    marginTop: 90  //actual marginTop:130
  },
  bottomBar: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // padding:'2%',
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: '2%',
    // margin:'3%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
    // marginTop: 30
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    flex:1,
    marginTop: '18%',
    // marginBottom:'5%'
  },
  bodyContent: {
    alignItems: 'center',
    padding: 5,
    paddingLeft:'5%',
    paddingRight:'5%'
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
  activeBtnview: {
    // shadowOffset: {  width: width/3,  height: height / 16,},
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    elevation: 1,
    width: width / 3,
    height: height / 16,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    backgroundColor: '#27A291',
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
  info1: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    color: '#000'
    // alignItems: 'center',
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
});
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

export default connect(mapStateToProps,mapDispatchToProps)(PeriodiIssues);