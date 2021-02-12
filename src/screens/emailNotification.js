import React, { Component } from 'react'
import {SafeAreaView,
    View,AsyncStorage,BackHandler, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, TextInput,PermissionsAndroid
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import SwitchToggle from "react-native-switch-toggle";
import { connect } from "react-redux";
import Modal1 from "react-native-modal";
import NetInfo from '@react-native-community/netinfo';
const width = Dimensions.get('window').width;

console.disableYellowBox = true;

const height = Dimensions.get('window').height;
class EmailNotification extends Component {
  constructor() {
    super();
    this.state={
        boolean:false,
        switchOn1: false,
        switchOn2: false,
        switchOn3: false,
        getuserid:'',
        emailNotify:'',
        contentNotify:'',
        announcements:'',
        loading:true,profileGetData:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();
   console.log('user id in emailnotify ',this.state.getuserid)
  //  {this.getData()}
  this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.backpress();
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
  getData(){
    setTimeout(() => {
      {this.exploredataGet(this.state.getuserid)}
    }, 1000);
  }
  exploredataGet(userid){
    var json=JSON.stringify({
      'userid':userid
      });
      fetch("http://162.250.120.20:444/Login/ProfileUpdateGet",
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
            //alert(responseText);
            this.setState({profileGetData: responseJson,loading:false})
            console.warn(responseJson)
            for (let i = 0; i <this.state.profileGetData.length; i++) {
              // alert(this.state.bookdetail[0].Image)
               this.setState({ 
                 emailNotify: responseJson[i].emailNotification,
                 announcements:responseJson[i].announcements,
                 contentNotify:responseJson[i].new_content_notifications,
                 switchOn1:responseJson[i].emailNotification==0?false:true,
                 switchOn2:responseJson[i].announcements==0?false:true,
                 switchOn3:responseJson[i].new_content_notifications==0?false:true,

              
                })
              }
              console.log('email notify & anouncement ',this.state.emailNotify,this.state.announcements)
            //alert(this.state.data.status)  
        })
        .catch((error) => {
            console.warn(error);
        });
  }
  profileUpdateService(userid,col_Name,value){
    var json=JSON.stringify({
      "UserID":userid,"ColumnName":col_Name,"Value":value
      });
      console.log('json vaql to send ',json)
      fetch("http://162.250.120.20:444/Login/ProfilesUpdate",
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
                      console.warn(responseJson)
         
              console.log('responsejson is ',responseJson)
        })
        .catch((error) => {
            console.warn(error);
        });
  }     
      onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
      };
      updateState = (val) => {
        if(val=="1"){
          this.setState({switchOn1:!this.state.switchOn1}) 
          console.log(this.state.switchOn1)
          // console.log('email ',this.state,getuserid,"EmailNotification")
          {this.profileUpdateService(this.state.getuserid,'EmailNotification',this.state.switchOn1?"0":"1")}
        }else if(val=="2"){
          this.setState({switchOn2:!this.state.switchOn2});
          console.log(this.state.switchOn2)

          {this.profileUpdateService(this.state.getuserid,'Announcement',this.state.switchOn2?"0":"1")}
        }else if(val=="3"){
          this.setState({switchOn3:!this.state.switchOn3});
          console.log(this.state.switchOn3)

          {this.profileUpdateService(this.state.getuserid,'ContentNotify',this.state.switchOn3?"0":"1")}
        }
      }
      aboutUpdate=(val)=>{
        if(this.state.about!=val){
       this.setState({about:val}) 
       {this.profileUpdateService(this.state.getuserid,'about',this.state.about)}
        }
      }
      backpress=()=>{
        //    console.log('before set',this.props.nav)
          //  this.props.changeNavNews();
          //  this.props.navigation.navigate('MainpageTabs');
          this.props.navigation.goBack();
        //    console.log('after set',this.props.nav);
       }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff'}}>
          <View style={styles.staticheader}>
         
          <View style={{ flexDirection: 'row', width: width-60, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('settings')}
            >
              <Text style={styles.headerText}

              >Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('settingsAccount')}
            >
              <Text style={styles.headerText}

              >Account</Text>
            </TouchableOpacity>

        
            <TouchableOpacity style={{ borderRadius: 10,backgroundColor:'#27A291'}}
              onPress={this.headerBtnClk}>
              <Text style={{
                padding: '5%',
                fontSize: 14,
                color: 'white',
                fontFamily: 'AzoSans-Medium'
              }}
              >Email Notifications</Text>
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
        <ScrollView>
        <View style={{flex:1,padding:'2%',margin:'3%'}}>
            <Text style={styles.title}>Receive weekly email notification for these events:</Text>
            <View style={{marginLeft:'3%',marginRight:'3%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'5%',alignItems:'center'}}>
                    <Text style={styles.text}>Users, series and periodicals you follow upload new content</Text>
        <SwitchToggle
          containerStyle={{
            // marginTop: 8,
            width: 50,
            height: 20,
            borderRadius: 28,
            backgroundColor: "#ccc",
            padding: 5
          }}
          circleStyle={{
            width: 15,
            height: 15,
            borderRadius: 10,
            backgroundColor: "white" // rgb(102,134,205)
          }}
          switchOn={this.state.switchOn1}
          onPress={()=>this.updateState("1")}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
          backgroundColorOn="#27a291"

        />
      
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'3%',alignItems:'center'}}>
                    <Text style={styles.text}>Email you about</Text>
                    <SwitchToggle
          containerStyle={{
            // marginTop: 8,
            width: 50,
            height: 20,
            borderRadius: 28,
            backgroundColor: "#ccc",
            padding: 5
          }}
          circleStyle={{
            width: 15,
            height: 15,
            borderRadius: 10,
            backgroundColor: "white" // rgb(102,134,205)
          }}
          switchOn={this.state.switchOn2}
          onPress={()=>this.updateState("2")}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
          backgroundColorOn="#27a291"

        />
      
                </View>
                <Text style={styles.text1}>New followers</Text>
                <Text style={styles.text1}>Likes</Text>

                <Text style={styles.text1}>Comments</Text>

                <Text style={styles.text1}>Collects</Text>
                <Text style={styles.text1}>Shares</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'3%',alignItems:'center'}}>
                    <Text style={styles.text}>News</Text>
                    <SwitchToggle
          containerStyle={{
            // marginTop: 8,
            width: 50,
            height: 20,
            borderRadius: 28,
            backgroundColor: "#ccc",
            padding: 5
          }}
          circleStyle={{
            width: 15,
            height: 15,
            borderRadius: 10,
            backgroundColor: "white" // rgb(102,134,205)
          }}
          switchOn={this.state.switchOn3}
          onPress={()=>this.updateState("3")}
          circleColorOff="white"
          circleColorOn="white"
          duration={500}
          backgroundColorOn="#27a291"

        />
      
                </View>
                <Text style={styles.text2}>Important announcements, new product, features and interesting content</Text>
                <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('loginSignup')}>
                    <Text style={{color:'#ffff',fontSize:16,textAlign:'center',fontFamily:'AzoSans-Regular'}}>Logout</Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
       </View>
        </ScrollView>
        <Modal1 isVisible={this.state.loading} >
                            <Image source={require('../assets/gif/logo.gif')} style={{
                                alignSelf: 'center',
                                width: 140,
                                height: 140
                            }} />
                            </Modal1>
      
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    text:{
      fontSize:16,
      fontFamily:'Montserrat-Bold',width:width/1.5,
    },
    btnview: {
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderRadius:30,

      },
    text1:{
        fontSize:16,width:width/1.5,
        color:'#505050',
        fontFamily:'AzoSans-Regular',
        marginTop:'4%'
        // margin:'2%'
    },
    text2:{
        fontSize:12,
        color:'#707070',
        marginTop:'5%',
        marginBottom:'10%',
        fontFamily:'AzoSans-Regular'
        // margin:'2%'
    },
    title:{
        fontSize:16,
        fontFamily:'Montserrat-Bold',
        textAlign:'center',
        margin:'2%'
        
    },
    staticheader: {
        paddingLeft: '2%',
        // paddingRight:'2%',
        flexDirection: 'row',
        // justifyContent: 'center', 
        alignItems: 'center',
        // height: '10%',
        // width:width-40,
        backgroundColor: '#ffff',
        elevation: 1,
        borderBottomColor:'#707070'

    
      },
    headerText: {
        padding: '2%',
        fontSize: 14,
        fontFamily: 'AzoSans-Medium',
        color:'#707070'
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

export default connect(mapStateToProps,mapDispatchToProps)(EmailNotification);
