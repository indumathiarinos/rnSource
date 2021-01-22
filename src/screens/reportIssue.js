import React, { Component } from 'react'
import {
    View,SafeAreaView, ImageBackground,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
   AsyncStorage,TouchableOpacity,TextInput,LayoutAnimation, Platform, UIManager, PermissionsAndroid
} from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { connect } from "react-redux";
// import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import HtmlView from 'react-native-htmlview';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
const width = Dimensions.get('window').width;
const htmlview=`<h4><p class="center">We’re thrilled to have you onboard as a creator. We will review your request and will get back to you within 2 working days.</p></h4>`;
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class ReportIssue extends Component {
    
    constructor() {
        super();
        this.state = {
             expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Please specify',
            radio_props : [
                {label: 'Inappropriate or offensive content', value: 0 },
                {label: 'Copyright or trademark infringement', value: 1 },
                {label: 'Spam, advertising, solicitation', value: 2 },
                {label: 'Other (please explain below)', value: 3 }
              ],
              value:0,
              // loading:false,
              reportData:'',
              getuserid:'',
              loading:false
        }
       
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
      AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
      AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    }
    exData() {
      var json = JSON.stringify({
        "user_id":this.state.getuserid,"author_id":"2","page_id":this.state.getpostid,"type":this.state.gettypeid,"Reason":"I Don't Like","Addition_Details":"abc","report":"0"});
      fetch("http://162.250.120.20:444/Login/Report",
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
              this.setState({ reportData: responseJson,loading:false })
              console.warn(responseJson)
              console.log('report ',this.state.reportData);
              this.props.navigation.navigate('thankyou')

          })
          .catch((error) => {
              console.warn(error);
          });
  }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
      this.backpress()
          return true;
    }  
          changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
      }
      CheckConnectivity(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
            {this.exData();}
          }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
          }
         
        });
      }
      submitBtn=()=>{
        // this.setState({loading:true})
        // {this.exData()}
        this.setState({loading:true})
        this.CheckConnectivity();

        // this.setState({btnActive:!this.state.btnActive})
        // this.props.navigation.navigate('reportThankyou')
      }
      backpress=()=>{
        //    console.log('before set',this.props.nav)
           this.props.changeNavNews();
           this.props.navigation.goBack();
          //  this.props.navigation.navigate('newsfeed');

          //  this.props.navigation.navigate('MainpageTabs')
        //    console.log('after set',this.props.nav);
       }
    render() {
        var checked = this.state.boolean? require('../assets/img/uncheck.png'):require('../assets/img/check.png') ;

        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Report</Text>
                     <TouchableOpacity
                     onPress={()=>this.backpress()}
                >
                                    <Image
                            style={{ alignSelf: 'center',width:50,height:50 }} 
                            source={require('../assets/img/close.png')} />
                     </TouchableOpacity>
                    
                      {/* </View> */}
                       
                </View>
                
                <ScrollView>
                <View style={{flex:1,alignItems:'center'}}>
                
                    <Text style={styles.textTitle}>Provide any further necessary details on your issue*</Text>
            
                    {/* <TextInput 
                    style={styles.touchableBtn}
                placeholder='enter details'
                placeholderTextColor='#CCCCCC'
                multiline
            /> */}
              <TextInput multiline textAlignVertical={'top'}
                placeholder="enter details" style={{ height:300,width:width-80,textAlign:'center',justifyContent:'center',borderRadius:20,backgroundColor:'#F9F9F9',paddingLeft:'8%',textAlign:'left' }} />

            <View>
                <View style={{justifyContent:'center',margin:'5%'}}>
                <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >
                    <TouchableOpacity
                    onPress={()=>this.submitBtn()}
                    // onPress={()=>this.props.navigation.navigate('thankyou')}
                    >
                    <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
                </LinearGradient>
                </View>
           
            </View>
              
                </View>
                </ScrollView>
                {/* <Modal isVisible={this.state.loading}
         
         // onBackdropPress={() => this.setState({ loading: true })}
         >
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal> */}
                <View style={styles.bottomLine}>
                {/* <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} /> */}
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('report')}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',paddingLeft:'5%',marginTop:2,alignItems:'center'}}>
                <Image source={require('../assets/img/left_arrow.png')} />

                    <Text style={{color:'#707070',textAlign:'left',fontSize:18,paddingLeft:'2%',}}>Back</Text>
                      
                    </View>
                </TouchableOpacity>
                  
                    {/* <View style={styles.headerRow}> */}
                     
                       
                </View>
                <Modal isVisible={this.state.loading}
         
         // onBackdropPress={() => this.setState({ loading: true })}
         >
               <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal>
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    btnview: {
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderRadius:30,
        width:width-50

      },
    touchableBtn:{
        backgroundColor:'#F9F9F9',
        height:300,
        fontSize:17,
        width:width-80,
        borderRadius:10,
        textAlign:'center'
,    },
    bottomLine: {
      
        height:'8%',
        bottom:0,
        left: 0,
        right: 0,
        justifyContent:'center',
        position: 'absolute',
        backgroundColor:'#fff',      
      },
    btnContainer:{
        alignItems:'center',
        margin:'2%'

    },
    btnview1: {
        alignItems:'center',
        width:width/1.2,
        justifyContent:'center',
          height:50,
        borderRadius:30,

      },
    centerText:{
        fontSize:16,
        textAlign:'center',
        margin:'5%'
    },
    
    headerRow:{
        height: '8%',
        // flex:0.1,
        // paddingTop:'5%',
        flexDirection:'row',
         backgroundColor: '#ffff',
         justifyContent: 'space-around',
         alignItems: 'center', 
         elevation:1,
         borderBottomColor:'#707070'
     
    },
    heading:{
        width:width-50,
        paddingLeft:50,
        // backgroundColor:'pink',
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'#27A291'
    },
    textTitle:{
        fontSize:24,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
    },
   
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(ReportIssue);
