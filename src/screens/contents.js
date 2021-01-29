import React, { Component } from 'react'
import { View,SafeAreaView, FlatList, BackHandler, AsyncStorage, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { connect } from "react-redux";
import { Avatar, Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
// let sortby;
let filterOption;
class Contents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { name: 'Publication Settings' },
        { name: 'Managing Posts' },
        { name: 'Layout' },
        { name: 'Create a Publication' },
        { name: 'Create a Page' },
        { name: 'Layout' },
        { name: 'Troubleshooting' },
        { name: 'Promote your Publication' },
        { name: 'Analytics' },
        { name: 'Publication Settings' },
        { name: 'Managing Posts' }
      ],
      list1: [
        { name: 'Packaging Design - Bite Me: Packaging Insults Chewers as They Grab a Piece of Tooth-Shaped... Gum' },
        { name: 'Zero-Waste Packaging for Liquids is Made Entirely of Soap' },
        { name: 'Islands of Wood Float Amidst Sea of Glass in New ‘Archipelago’ Furniture by Greg Klassen' },

      ],
      gettypeid: '',
      getpostid: '',
      getcontentname: '',
      contents: [],
      loading: true,
      sortingFilter:"ASC"
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    filterOption="ASC";
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    // alert(this.state.gettypeid,this.state.getpostid)
    AsyncStorage.getItem('contentFilter').then((value)=>this.setState({sortingFilter:value})).done();
    console.log('sortingfilter data is ',filterOption,this.state.getpostid,this.state.gettypeid)
    // this.getData()
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
      AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
      AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
      AsyncStorage.getItem('contentFilter').then((value)=>this.setState({sortingFilter:value})).done();
      console.log('sortingfilter data is ',filterOption)     
       this.CheckConnectivity();
  })
  }
  componentWillUnmount () {
    // AsyncStorage.getItem('contentFilter').then((value) => {
    //   console.log(value,"value is")
    //   this.setState({ sortby: value })}).done();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener.remove()
  }

  handleBackButtonClick() {
    this.backpress();
    return true;
  }
  CheckConnectivity() {
    NetInfo.fetch().then(state => {

      console.log("Connection type cheking", state.type);
      console.log("Is connected cheking?", state.isConnected);

      if (state.isConnected == true) {
        { this.getData() }
      } else {
        alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
      }

    });
  }
  backpress = () => {
    //    console.log('before set',this.props.nav)
    // this.props.changeNavRec();
    this.props.navigation.goBack();
    // this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
  }
  gotoRead(page_id) {
    let { contents } = this.state;
    // console.log('top pick data ',item)
    // console.log('kjdsafksdfjsdka data is',toppick)
    // console.log('kjdsafksdfjsdka data is',item.TypeID)
    // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)

    contents = contents.map(e => {
      // console.log('contents type id is ', e.page_id)
      if (e.page_id == page_id) {
        AsyncStorage.setItem('typeid',this.state.gettypeid);
        AsyncStorage.setItem('postid',this.state.getpostid);
        AsyncStorage.setItem('pageorder',JSON.stringify(e.page_order));
        AsyncStorage.setItem('contentTopage',JSON.stringify(true));

        // console.log('contents post id is',e.page_id);
        this.props.navigation.navigate('readingBook');
      }
    });
  }
  renderItem_card({ item }) {
    return (
      <TouchableOpacity onPress={() => this.gotoRead(item.page_id)}>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: 'black', padding: '2%', textAlign: 'left' }}>{item.name}</Text>

          <Divider style={{ color: '#707070', width: width - 50 }} />
        </View>
      </TouchableOpacity>

    )
  }


  getData() {
    setTimeout(() => {
      // alert(this.state.sortingFilter)
      { this.exploredata(this.state.gettypeid, this.state.getpostid) }
    }, 1000)
  }




  exploredata(typeid, postid) {
    // {"TypeID":"1","Post_PageID":"3"}
    this.setState({loading:true})
    console.log('tye id & page id filter', typeid, postid,filterOption)
    var json = JSON.stringify({
      'TypeID': typeid,
      'Post_PageID': postid,
      "SortBy":this.state.sortingFilter
    });
    console.log(json,"content filter updated")
    fetch("http://162.250.120.20:444/Login/HelpPublicationContents",
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
        // alert(responseJson);
        //  this.setState({ bookdetail: responseJson,apicallBoolean:true })
        this.setState({ contents: responseJson, loading: false })
        console.log('contents   zxdfksdfakl ', this.state.contents)
        console.warn(responseJson)
        // console.warn(SHOWSSS)
        // this.setState({ img: responseJson[0].Image })
        // for (let i = 0; i <this.state.bookdetail.length; i++) {
        //          // alert(this.state.bookdetail[0].Image)
        //           this.setState({ 
        //             img: responseJson[i].Image,
        //             title:responseJson[i].Title,
        //             content:responseJson[i].Content,
        //             updateddate:responseJson[i].Updated_Date,
        //             releasedate:responseJson[i].Release_Date,
        //             totalviews:responseJson[i].Totalviews,
        //             partcount:responseJson[i].PartCount,
        //             copyrights:responseJson[i].Copyrights,
        //             partname:responseJson[i].partname,
        //             publication_Imagepath: responseJson[i].Image
        //            })
        //           //  Title: "SNOW WHITE AND THE SEVEN DWARF"
        //           //  Content: "Once upon a time . . . in a great castle, a Prince’s daughter grew up happy and contented, in spite of a jealous stepmother. She was very pretty, with blue eyes and long black hair. Her skin was delicate and fair, and so she was called Snow White. Everyone was quite sure she would become very beautiful. Though her stepmother was a wicked woman, she too was very beautiful, and the magic mirror told her this every day, whenever she asked it"
        //           //  Updated_Date: "17 February 2020"
        //           //  Release_Date: ""
        //           //  Totalviews: 7
        //           //  PartCount: 0
        //           //  Copyrights: "All Rights Reserved"
        //           //  partname: "Section"
        // }
        //alert(this.state.bookdetail[0].Image)


      })



      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;
    const listCount = this.state.contents.length;

    return (
      <SafeAreaView style={{ flex: 2, backgroundColor: '#fff' }}>
        {/* <View style={styles.staticheader}> */}
        <View style={styles.staticheader}>
          <TouchableOpacity style={{ }}
            onPress={() => this.props.navigation.navigate('newOldFilter')}
          >
          <Image style={{ alignSelf: 'center',width:50,height:50, }} source={require('../assets/img/filter.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width-105, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('viewBook')}>
              <Text style={styles.headerText}

              >Description</Text>
            </TouchableOpacity>
            <LinearGradient style={{ borderRadius: 10 }} colors={
              ['#24D4BC', '#27A291']}>
              <TouchableOpacity
                onPress={this.headerBtnClk}>
                <Text style={{
                  padding: '5%',
                  fontSize: 14,
                  fontFamily:'AzoSans-Medium',
                  color: 'white',
                }}

                >Contents</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('books_pin')}>
              <Text style={styles.headerText}
              >Pins</Text>
            </TouchableOpacity>
            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity  onPress={() => this.backpress()}>
          <Image style={{ alignSelf: 'center',width:50,height:50, }} source={require('../assets/img/close.png')} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.header}>
        </View> */}

        {/* <FlatList
            data={this.state.list}
            extraData={this.state}
            renderItem={this.renderItem_card.bind(this)}
                      
            keyExtractor={(item, index) => index.toString()}
          /> */}
        <ScrollView style={{marginBottom:'14%'}}>
        {/* <View style={{ flex: 1,marginBottom:'10%' }}> */}
         
          <FlatList
          style={{flex:1,}}
          contentContainerStyle={{alignItems:'center'}}
            data={this.state.contents}
            renderItem={({ item }) =>
          
            <TouchableOpacity onPress={() => this.gotoRead(item.page_id)}>
              <View style={{ justifyContent: 'center', alignContent: 'center',width:width-80,}} key={item.Content} >
                <Text style={{ color: 'black', textAlign: 'left',  fontSize: 14,fontFamily:'AzoSans-Medium', marginTop: '2%',padding:'2%', marginBottom: '2%',paddingLeft:0 }}>{item.page_title}</Text>
                
              </View>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={(item)=>
            
 <Divider style={{ color: '#707070', width: width - 80,alignSelf:'center',}} />
             } />
        {/* </View> */}
        <View style={{alignItems:'center',justifyContent:'center',width:width}}>
        <Divider style={{ color: '#707070', width: width - 80, }} />
        </View>
</ScrollView>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.bottomBtn}>
            <Text style={styles.bottomText}> {listCount} Sections</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.loading}

        // onBackdropPress={() => this.setState({ loading: true })}
        >
          <Image source={require('../assets/gif/logo.gif')} style={{
            alignSelf: 'center',
            width: 140,
            height: 140
          }} />
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: "center",
    height: '8%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },

  bottomBtn: {
    width: width,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#27A291',
    justifyContent: 'center',
    // padding:'1%'

  },
  bottomText: {
    color: '#ffff',
    fontSize: 18
  },

  headerText: {
    padding: '5%',
    fontSize: 14,
    color:'#707070',
    fontFamily:'AzoSans-Medium',
  },


  staticheader: {
    paddingLeft: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    // height: '8%',
    backgroundColor: '#ffff',
    elevation: 1,
    // backgroundColor:'pink',
    borderBottomColor: '#707070'
  },

  bottomBar: {

    flexDirection: 'row',
    justifyContent: "center",
    height: '8%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },

  body: {
    flex: 1,
  },


});
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

export default connect(mapStateToProps, mapDispatchToProps)(Contents);