import React, { Component } from 'react'
import {SafeAreaView,
    View, AsyncStorage,ImageBackground,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity,TextInput,LayoutAnimation, Platform, UIManager, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';
import HtmlView from 'react-native-htmlview';
import { connect } from "react-redux";
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
const width = Dimensions.get('window').width;
const htmlview=`<h4><p class="center">We’re thrilled to have you onboard as a creator. We will review your request and will get back to you within 2 working days.</p></h4>`;
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class Thankyou extends Component {
    
    constructor() {
        super();
        this.state = { expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Please specify',
            loading:true,getuserid:'',
            avatar:'',
            username:''
        }
       
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
      AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})})
      // {this.getData()}
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
          alert('Not Connected')
        }
       
      });
    }
    getData(){
      setTimeout(() => {
        {this.exploredataPic(this.state.getuserid)}
      }, 1000);
    }
    exploredataPic(userid){
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
              this.setState({loading:false})
              console.warn(responseJson)
              for (let i = 0; i <responseJson.length; i++) {
                // alert(this.state.bookdetail[0].Image)
                 this.setState({ 
                   username: responseJson[i].username,
                   avatar:responseJson[i].avatar,
                  
                  })
                }
                console.log('username is ',this.state.username)
              //alert(this.state.data.status)  
          })
          .catch((error) => {
              console.warn(error);
          });
    }
      changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
      }
      submitBtn=()=>{
        this.setState({btnActive:!this.state.btnActive})
        this.props.navigation.navigate('thankyou')
      }
      backpress=()=>{
        //    console.log('before set',this.props.nav)
        // this.props.navigation.goBack();
          //  this.props.changeNavNews();
           this.props.navigation.navigate('newsfeed')
        //    console.log('after set',this.props.nav);
       }
    render() {
        var checked = this.state.boolean? require('../assets/img/uncheck.png'):require('../assets/img/check.png') ;

        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Request Creator's Account</Text>
                     <TouchableOpacity
                     onPress={()=>this.backpress()}
                >
                 <Image
                            style={{ alignSelf: 'center',width:50,height:50,marginLeft:'2%' }} 
                            source={require('../assets/img/close.png')} />
                     </TouchableOpacity>
                    
                      {/* </View> */}
                       
                </View>
                
                <ScrollView>
                <View style={{flex:1,alignItems:'center'}}>
                    <Image style={{width:width}} source={require('../assets/img/thankyou.png')} /> 
                
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:'4%'}}>
                <Image
              style={{width:60,height:60,borderRadius:60/2}}
              source={{uri:this.state.avatar}}
              // source={require('../assets/img/user.png')}
              />
              <Text style={styles.textTitle}>{this.state.username}</Text>

                </View>
            
                  
                <Text style={styles.centerText}>We’re thrilled to have you onboard as a creator. We will review your request and will get back to you within 2 working days.</Text>
              {/* <View style={styles.btnContainer}> */}
             <LinearGradient style={styles.btnview1} 
             colors={['#24D4BC', '#27A291']} 
             >
                    <TouchableOpacity

                    onPress={()=>this.backpress()}>
                    <Text style={{color:'#ffff',fontSize:16,fontFamily:'AzoSans-Regular',textAlign:'center'}}>Continue</Text>
                </TouchableOpacity>    
                </LinearGradient>      
                     </View>            
                {/* </View> */}
                </ScrollView>
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
        fontSize:14,
        textAlign:'center',
        margin:'5%',
        fontFamily:'AzoSans-Regular',
    },
    
    headerRow:{
        height: '9%',
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
        width:width-80,
        paddingLeft:50,
        // backgroundColor:'pink',
        textAlign:'center',
        fontSize:16,
        fontFamily:'AzoSans-Bold',
        color:'#27A291'
    },
    textTitle:{
        fontSize:16,
        textAlign:'center',
        fontFamily:'Montserrat-Bold',
        padding:'3%',
        color:'#27A291'

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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Thankyou);
