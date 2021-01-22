import React, { Component } from 'react'
import { View,SafeAreaView,AsyncStorage,Modal, FlatList, BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import { Avatar, Divider } from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
import Modal1 from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class Reminders extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          id: 0,
          title: "Book Club Meeting - Book Cafe",
          Description: 'Must accurnsan veneanatis has ism Isaow chuiaw jcokx',
          Location: "Suntec Singapore Convention & Exhibition",
          Date: 'Jan 6, 2019 / 9.30am',
          From: 'Publication Name or Page Name'
        },
        {
          id: 1,
          title: "Book Club Meeting - Book Cafe",
          Description: 'Must accurnsan veneanatis has ism Isaow chuiaw jcokx',
          Location: "Suntec Singapore Convention & Exhibition",
          Date: 'Jan 6, 2019 / 9.30am',
          From: 'Publication Name or Page Name'
        },
        {
          id: 2,
          title: "Book Club Meeting - Book Cafe",
          Description: 'Must accurnsan veneanatis has ism Isaow chuiaw jcokx',
          Location: "Suntec Singapore Convention & Exhibition",
          Date: 'Jan 6, 2019 / 9.30am',
          From: 'Publication Name or Page Name'
        },
        {
          id: 3,
          title: "Book Club Meeting - Book Cafe",
          Description: 'Must accurnsan veneanatis has ism Isaow chuiaw jcokx',
          Location: "Suntec Singapore Convention & Exhibition",
          Date: 'Jan 6, 2019 / 9.30am',
          From: 'Publication Name or Page Name'
        },
        {
          id: 4,
          title: "Book Club Meeting - Book Cafe",
          Description: 'Must accurnsan veneanatis has ism Isaow chuiaw jcokx',
          Location: "Suntec Singapore Convention & Exhibition",
          Date: 'Jan 6, 2019 / 9.30am',
          From: 'Publication Name or Page Name'
        },
        {
          id: 5,
          title: "Book Club Meeting - Book Cafe",
          Description: 'Must accurnsan veneanatis has ism Isaow chuiaw jcokx',
          Location: "Suntec Singapore Convention & Exhibition",
          Date: 'Jan 6, 2019 / 9.30am',
          From: 'Publication Name or Page Name'
        }
      ],
      showlikeImg: false,
      remainder: [],
      loading: true,
      getuserid:'',
      modalVisible:false,
      deletedName:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
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

  getData=()=>{
    setTimeout(() => {
      { this.exploredata(this.state.getuserid,"Select","") }
    }, 1000);
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
  showModal = () => {
    this.setState({
      modalVisible: true
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
      }, 3000);
  }
  exploredata(userid,action,pkid) {
    this.setState({loading:true})
    var json = JSON.stringify({
     "UserID":userid,"Action_For":action,"PK_ID":pkid
        });
    fetch("http://162.250.120.20:444/Login/Remainder",
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
        this.setState({ remainder: responseJson, loading: false })
        console.warn(responseJson)
        console.warn("remainder")

        //alert(this.state.data.status)  
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
  backpress = () => {
    //    console.log('before set',this.props.nav)
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs')
    this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
  }
  deleteReminder(id,title){
    this.setState({loading:true,deletedName:title})
    var json = JSON.stringify({"Deleted_for":"Reminder","PK_ID":id,"user_ID":this.state.getuserid});
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
        //alert(responseText);
        this.setState({loading: false })
        this.showModal();
        console.warn(responseJson)
        console.warn("remainder delete")
        this.exploredata(this.state.getuserid,"Select","")

        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  fullcard({ item }) {
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (

      <View style={{ flex: 1, backgroundColor: '#fff' }}>

        <View style={{ flexDirection: 'row', padding: '2%', backgroundColor: '#F9F9F9', justifyContent: 'space-between' }}>
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
          <Text style={{ fontSize: 18, color: 'black',paddingTop:'3%', paddingLeft: '10%', fontWeight: 'bold', textAlign: 'left', width: width / 2 }}
            numberOfLines={2}>{item.title}</Text>
         <TouchableOpacity 
         onPress={()=>this.deleteReminder(item.id,item.title)}
        //  onPress={()=>{
        //    this.setState({deletedName:item.title})
        //    this.exploredata(this.state.getuserid,"Delete",id)}}
           >
          <Image
            style={{ marginRight: '2%', }}
            source={require('../assets/img/trash1.png')} />
            </TouchableOpacity>
        </View>
        <View style={{ alignContent: 'center', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '10%', paddingRight: '18%', width: width - 50 }}>
          <View style={{ flexDirection: 'row', padding: '2%' }}>
            <Text style={{ fontSize: 16, color: '#000' }}>Description:</Text>
            <Text style={{ fontSize: 16, color: '#707070' }}
              numberOfLines={1}>{item.description}</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: '2%' }}>
            <Text style={{ fontSize: 16, color: '#000' }}>Location:</Text>
            <Text style={{ fontSize: 16, color: '#707070' }}
              numberOfLines={1}>{item.location}</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: '2%' }}>
            <Text style={{ fontSize: 16, color: '#000' }}>Date:</Text>
            <Text style={{ fontSize: 16, color: '#707070' }}
              numberOfLines={1}>{item.start_date}</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: '2%' }}>
            <Text style={{ fontSize: 16, color: '#000' }}>From:</Text>
            <Text style={{ fontSize: 16, color: '#707070' }}
              numberOfLines={1}>{item.fromdate}</Text>
          </View>
        </View>


        <Divider style={{ color: '@707070' }} />
      </View>);
  }


  render() {
    const { list } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <View style={{   }}> */}
        {/* <View style={{ flexDirection: 'row',justifyContent:'space-around'} }>
        <Image style={{marginTop:'5%',}} source={require('../assets/img/filter.png')}/> */}



        <View style={{
          flexDirection: 'row', justifyContent: 'center',
          alignItems: 'center', height: '10%', backgroundColor: '#ffff',
          elevation: 1, borderBottomColor: '#707070',marginBottom:20
        }}>
          <View style={{ flexDirection: 'row', width: width - 40, justifyContent: 'center' }}>

            <Text style={styles.headerText}
              onPress={() => this.props.navigation.navigate('notification')}
            >Notifications</Text>
            <LinearGradient style={{ borderRadius: 10 }} colors={
              ['#24D4BC', '#27A291']}>
              <TouchableOpacity
                onPress={this.headerBtnClk}>

                <Text style={{
                  padding: '5%',
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold'
                }}
                >Reminders</Text>
              </TouchableOpacity>
            </LinearGradient>
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
          contentContainerStyle={{ marginTop: '5%',marginBottom:30 }}
          data={this.state.remainder}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          style={{ marginTop: '1%',}}
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
       
<Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>Remove - {this.state.deletedName} </Text>
         
         
        <TouchableOpacity style={{marginTop:'2%',alignSelf:'flex-end',marginRight:'2%'}} 
        // onPress={()=>this.undoFunc(item)}
        >
            <Text style={{fontSize: 16, color: '#fff',textDecorationLine:'underline'}}>Undo</Text>
         </TouchableOpacity>
          
          </View>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
