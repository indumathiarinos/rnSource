import React, { Component } from 'react'
import { View,SafeAreaView,AsyncStorage, ImageBackground,FlatList, RefreshControl, BackHandler, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import { Avatar, Divider } from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
console.disableYellowBox = true;
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class Notification extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          id: 0,
          bgcolor: "#569BE0",
          img: '',
          title: "Ainaini Rahin",
          subtitle: "starts following you"
        },
        {
          id: 1,
          bgcolor: "#7C3BD3",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini",
          subtitle: `starts following you`
        },
        {
          id: 2,
          bgcolor: "#EB9A17",
          img: '',
          title: "Ainaini Rahin",
          subtitle: `starts following you`
        },
        {
          id: 3,
          bgcolor: "#569BE0",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini Rahin",
          subtitle: `collects your page "Thinking Beyond the Scope - The Hard Truths of...`
        },
        {
          id: 4,
          bgcolor: "#7C3BD3",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini",
          subtitle: `shares your page "Riders of the Storm"`
        },
        {
          id: 5,
          bgcolor: "#EB9A17",
          img: 'https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612',
          title: "Ainaini Rahin",
          subtitle: `collects your page "Thinking Beyond the Scope - The Hard Truths of...`
        }
      ],
      showlikeImg: false,
      notifyData: '',
      loading: true,
      getuserid:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
    // {this.getData()}
    this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  getData=()=>{
    setTimeout(() => {
      { this.exploredata(this.state.getuserid) }
    }, 1000);
  }

  exploredata(userid) {
    var json = JSON.stringify({
      'UserID': userid,
    });
    fetch("http://162.250.120.20:444/Login/Notifications",
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
        this.setState({ notifyData: responseJson, loading: false })
        console.log('notify data is ', this.state.notifyData)
        // console.warn(responseJson)
        // console.warn("Notification")

        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  notifyUpdate(id) {
    var json = JSON.stringify({
      PK_ID: id,
    });
    console.log('notify data ',json)
    fetch("http://162.250.120.20:444/Login/NotifyUpdate",
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
        this.exploredata(this.state.getuserid)
        this.setState({ loading: false })
        // console.warn(responseJson)
        // console.warn("Notification")

        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  handleBackButtonClick() {
    this.backpress()
    return true;
  }

  backpress = () => {
    //    console.log('before set',this.props.nav)
    this.props.navigation.goBack();
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
  }
  // renderImage(ource = this.state.showlikeImg? like:unlike ;
  //   return (){
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
 
  fullcard({ item }) {
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
      <TouchableOpacity 
      onPress={()=>  item.notifyreadstatus=='N'? this.notifyUpdate(item.id):null}
      >
      <View style={{
        flexDirection: 'row',
        padding: '3%',
        
        // backgroundColor:'pink',
        flex: 1, backgroundColor: item.notifyreadstatus=='N'?'#C5F3FB':'#fff',
        // alignItems:'center',
        justifyContent: 'space-between'
      }}>
        <Image style={{ width: 50, height: 50, borderRadius: 50 / 2, resizeMode: 'cover' }} source={{ uri: item.avatar }} />
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
        <View style={{ flexDirection: 'column', width: width / 1.8,marginLeft:'5%'}}>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'left' }}>{item.user_name}</Text>
          <Text style={{ fontSize: 16, color: 'black', textAlign: 'left' }}
            numberOfLines={2}
            ellipsizeMode='middle'>{item.heading}</Text>
        </View>
        <Image style={{ width: width / 5, height: height / 12, resizeMode: 'cover' }} source={{ uri: item.bookimg }} />
        {/* <ImageBackground source={{uri:item.bookimg!=null?item.bookimg:null}} 
          imageStyle={{ borderRadius: 15 }}
          style={[item.Type==1?styles.pubImgStyle:styles.pageImgStyle,{borderColor:!item.bookimg?'#fff':null}]}
            /> */}
           

      </View>
      </TouchableOpacity>);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <View style={{   }}> */}
        {/* <View style={{ flexDirection: 'row',justifyContent:'space-around'} }>
        <Image style={{marginTop:'5%',}} source={require('../assets/img/filter.png')}/> */}



        <View style={{
          flexDirection: 'row', justifyContent: 'center',
          alignItems: 'center',  backgroundColor: '#ffff',
          elevation: 1, borderBottomColor: '#707070'
        }}>
          <View style={{ flexDirection: 'row', width: width - 40, justifyContent: 'center' }}>
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
                onPress={() => this.props.navigation.navigate('App')}
              >Notifications</Text>

            </TouchableOpacity>
            </LinearGradient>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('reminders')}>
              <Text style={styles.headerText}

              >Reminders</Text>
            </TouchableOpacity> */}



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
          data={this.state.notifyData}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          style={{ marginTop: '1%' }}
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

      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  pubImgStyle:{ 
    elevation:1,
    width: 130, height: 150,
    borderRadius:15,
    
    // alignItems:'center',
    //  jsutifyContent: 'center'
     },
     pageImgStyle:{ 
      elevation:1,
      width: 130, height: 100,
      borderRadius:15
      // alignItems:'center',
      //  jsutifyContent: 'center'
       },
  headerText: {
    padding: '5%',
    fontSize: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
