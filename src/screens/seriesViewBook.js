import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ImageBackground,
  SafeAreaView,
  AsyncStorage,
  Modal
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Tooltip } from 'react-native-elements';
import Modal1 from 'react-native-modal';
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';

console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class SeriesViewBook extends Component {
  constructor() {
    super();
  this.state = {
        showlikeImg: false,
    showReport: false,
    loading:true,
    seriesData:'',
    bookdetail:[],
    img:'',
    title:'',
    content:'',
    updateddate:'',
    releasedate:'',
    totalviews:'',
    partcount:'',
    copyrights:'',
    partname:'',
    visible:false,
    tooltip:false,
    gettypeid:'',
    getpostid:'',
    popup_val:'',
    popup_title:'',
    popupModal:false,
    shareModal:false

  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid : value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid : value })).done();
    this.CheckConnectivity();
    // { this.getData() }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  getData() {
    setTimeout(() => {
      {this.exploredata(this.state.gettypeid,this.state.getpostid)}
      console.log('get postid in seriesview book page ',this.state.getpostid)
        // { this.exploredata(this.state.gettypeid, this.state.getpostid) }
    }, 1000)
}
showModal = () => {
  console.log('enters')
  this.setState({
      popupModal: true
  });
  setTimeout(() => {
      // this.props.changeRemove()
      this.setState({
          popupModal: false
      })
      //   this.props.changeRemove();
  }, 3000);
  console.log('modal state is ', this.state.popupModal)
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



exploredata(typeid,postid) {
  // {"TypeID":"1","Post_PageID":"3"}
  // console.log('dsflkajdkfksd ',typeid,postid)
  var json = JSON.stringify({
    "TypeID":typeid,"Post_PageID":postid
  });
  fetch("http://162.250.120.20:444/Login/HelpPublicationDesc",
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
          this.setState({ seriesData: responseJson,apicallBoolean:true,loading:false})
          console.warn(responseJson)
         // this.setState({ img: responseJson[0].Image })
          for (let i = 0; i <this.state.seriesData.length; i++) {
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
tooltipPress=()=>{
  this.setState({tooltip:!this.state.tooltip,
    // visible:!this.state.visible
  });
  setTimeout(() => {
    this.setState({tooltip:!this.state.tooltip})
    }, 3000);
}
  handleBackButtonClick() {
    this.backpress()
    return true;
  }
  
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress}>View less</Text>
    )
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Read more
          </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
       <TouchableOpacity
       onPress={()=>this.props.navigation.navigate('report')}>
       <View style={styles.info1}>
          <Image style={{ marginRight: '10%' }} source={require('../assets/img/flag.png')} />
          <Text style={styles.text1}>Report</Text>
        </View>
       </TouchableOpacity>
      
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
    AsyncStorage.getItem('3dots').then((newval) => this.setState({ popup_val: newval })).done();
    if (this.state.popup_val == 1) {
      AsyncStorage.getItem('popup_name').then((newval1) => this.setState({ popup_title: newval1 })).done();

        // console.log('value is ', this.state.popup_val,this.state.popup_title);
        if(this.state.popup_title!=''){
        setTimeout(
            () =>
                this.showModal(),
            1000
        );
        AsyncStorage.setItem('3dots', JSON.stringify(0));
        }
    }
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <View style={styles.staticheader}> */}
        <View style={styles.staticheader}>
        
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
          <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
            <TouchableOpacity
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}
              >Description</Text>
            </TouchableOpacity>
              </LinearGradient>
            <TouchableOpacity style={{ alignItems: 'center' }}
            onPress={() => this.props.navigation.navigate('seriesFeed')}
            >
              <Text style={styles.headerText}

              >Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('seriesArchives')}
            >
              <Text style={styles.headerText}

              >Archives</Text>
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
        <ScrollView>
          <View style={styles.containerStyle} >
            <ImageBackground style={styles.sliderContainerStyle}
              source={{uri:this.state.img}}>
              {/* <Slider/> */}
            </ImageBackground>
          </View>

          <Image style={styles.avatar} source={{uri:this.state.img}} />
          {/* <Image style={styles.avatar} source={{uri:this.state.img}} /> */}

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
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum quam quis semper tempus. Vestibulum ornare, augue a interdum consequat, est urna dignissim magna, at tempus magna leo a nulla. Nulla id luctus tortor, et cursus leo. Integer facilisis et eros vitae sodales. Duis sapien mi, lacinia eu nunc ac, condimentum ultrices est. Vestibulum ac justo non ipsum tristique ultricies quis non dolor. Nullam bibendum nulla ac lorem tincidunt, vel ultricies nulla semper. Duis nec magna sit amet ante vestibulum aliquam id sit amet felis. Mauris molestie leo lacus, at vulputate metus dapibus vel. Mauris efficitur convallis eros, vitae euismod velit sagittis vel. Integer egestas, nunc ac lobortis bibendum, nisi elit fringilla magna, sit amet eleifend sapien risus id lacus.                    */}
                 </Text>
                </ReadMore>
              </View>
                <View style={styles.viewsInfo}>
                <View style={{ flexDirection: 'column', }}>
                  <View style={{ flex:1,flexDirection: 'row',justifyContent:'space-around' }}>
                    <View style={styles.info1}>
                      <Image style={{ marginRight: '4%' }} source={require('../assets/img/eye.png')} />
                      <Text style={styles.text1}>{this.state.Totalviews}</Text>
                    </View>

                    <View style={styles.info1}>
                      <Image style={{ marginRight: '2%' }} source={require('../assets/img/section.png')} />
                      <Text style={styles.text1}> Sections</Text>
                    </View>
                    <View style={styles.info1}>
                      <Text style={styles.text1}>Last Update: </Text>
        <Text style={styles.text1}>{this.state.updateddate}</Text>
                    </View>                
                  </View>
                  <View style={{ flexDirection: 'row',margin:'2%', justifyContent: 'center', }}>
                    <Text style={{color:'#707070'}}>Status: </Text>
                    <Text style={{color:'#707070'}}>Ongoing - Updated {this.state.updateddate}</Text>
                  </View>
                </View>
              </View>
        {/*  <Tooltip popover={<Text>Info here</Text>}>
                <Text style>Press me</Text>
              </Tooltip> */}
              <View style={styles.logoContainer}>
                <View>
              <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >

<TouchableOpacity
  onPress={() => this.props.navigation.navigate('readingBook')}>
  <View style={styles.socialBarButton}>
    <Image source={require('../assets/img/open-book.png')} />
    <Text style={styles.btnText}>Read</Text>
  </View>
</TouchableOpacity>
</LinearGradient>
</View>
                {/* <TouchableOpacity style={styles.btnview}>
                  <Text style={styles.text3}>Subscribe</Text>
                </TouchableOpacity> */}
                <View>
                <TouchableOpacity onPress={()=>this.tooltipPress()} style={[!this.state.visible?styles.btnview:styles.activeBtnview]}>
    <Text style={[!this.state.visible?styles.inactive:styles.active]}>{!this.state.visible?"Subscribe":"Subscribed"}</Text>
  </TouchableOpacity>
 {this.state.tooltip? <View style={styles.talkBubble}>
              <View style={styles.talkBubbleSquare}>
                <Text style={styles.talkBubbleMessage}>Subscribed PageVio</Text>
              </View>
              <View style={styles.talkBubbleTriangle} />
              </View>:null}
              </View>
              </View>
            </View>
          </View>


        </ScrollView>
        <Modal1 isVisible={this.state.loading}>
          <Image source={require('../assets/gif/logo.gif')} style={{
            alignSelf: 'center',
            width: 140,
            height: 140
          }} />
        </Modal1>
        <Modal
             animationType="slide"
             transparent
              visible={this.state.popupModal}
                        onRequestClose={() => {
                            console.log('Modal has been closed.');
                        }}>
                        <View style={{
                            left: 0, right: 0, bottom: 0, position: 'absolute',
                            height: '8%',
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#27A291',
                        }}>
                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Added to Collection -</Text>
                           
                                <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline' }}>{this.state.popup_title}</Text>
                        </View>
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
          <TouchableOpacity
            style={{ padding: '1%' }}
            onPress={() => this.props.navigation.navigate('createCollection')}
          >
            <Image source={require('../assets/img/plus.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: '1%' }}
          onPress={ () => this.setState({shareModal:!this.state.shareModal})} 
          >
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
    justifyContent: 'space-around',
    marginTop: '5%',
    marginBottom: '10%'
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
    backgroundColor: '#fff',
    elevation: 2,
    // padding: '2%',
    width: width / 3,
    height: height / 16,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    // marginTop: 5
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
    borderWidth:0.3
   
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
  inactive:{ color: '#27A291',fontSize:17 },
  active:{ color: '#fff',fontSize:17 },
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
    elevation: 1
  },
  avatar: {
    width: 130,
    height: 130,
    // borderRadius: 63,
    // borderWidth: 2,
    // borderColor: "white",

   resizeMode:'cover',
    borderRadius: 15,
    // backgroundColor: "pink",
    alignSelf: 'center',
    marginBottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 100  //actual marginTop:130
  },
  bottomBar: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // padding:'2%',
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: '3%',
    // margin:'3%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
    // marginTop: 30
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
    // margin: '3%'
  },
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2, // <- zIndex here
    flex: 1,
    left: 5,
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
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: '15%',
  },
  bodyContent: {
    marginTop:'5%',
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
  info1: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    color: '#000'
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

export default connect(mapStateToProps,mapDispatchToProps)(SeriesViewBook);
