import React, { Component } from 'react'
import {
    View,SafeAreaView,AsyncStorage, ImageBackground,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
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
const htmlview=`<h4>We welcome all content creators to join our self-publishing community.<br>
PageVio provides you the tools to publish your content, compile them into a digital book (if you choose to). And share it on social networks, or embed into your website.</h4>`;
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class RequestCreator extends Component {
    
    constructor() {
        super();
       
        this.state = { expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Please specify',
            reqCreator:false,
            username:'',
            avatar:'',
            getuserid:'',
            loading:true,
            webText:''
        }
       
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})});
        console.log('user id in reqcreator ',this.state.getuserid)
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
    }        changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
      }
      submitBtn=()=>{
          if(!this.state.boolean){
            this.setState({btnActive:!this.state.btnActive})
            this.CheckConnectivity1();
          }else{
              alert("Please check the terms of use")
          }
       
        // this.props.changeNavNews();
        // this.backpress();
        // this.props.navigation.navigate('thankyou')
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
      CheckConnectivity1(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
            {this.exploredataReq(this.state.getuserid)}
        }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
         
        });
      }
    getData(){
        setTimeout(() => {
            {this.exploredataPic(this.state.getuserid)}
        }, 1000);
    }
  
      goBack=()=>{
          this.props.navigation.goBack();
      }
      backpress=()=>{
        //    console.log('before set',this.props.nav)
        //    this.props.changeNavNews();
        //    this.props.navigation.navigate('MainpageTabs')
        this.props.navigation.goBack();
        //    console.log('after set',this.props.nav);
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
      exploredataReq(userid){
          this.setState({loading:true})
        var json=JSON.stringify({
          'UserId':userid,
          "PartType":"2","Website":this.state.webText,"Status":""
          });
          fetch("http://162.250.120.20:444/Login/AddRequestCreatorAccount",
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
                // alert(responseJson);
                this.setState({loading:false})
                console.warn(responseJson)
                this.props.navigation.navigate('thankyou')
            })
            .catch((error) => {
                console.warn(error);
            });
      }
      
    render() {
        var checked = this.state.boolean? require('../assets/img/uncheck.png'):require('../assets/img/check.png') ;

        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 2,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Request Creator's Account</Text>
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
                <View style={{flex:1}}>
                
                <Text style={styles.textTitle}>Dear Readers</Text>
                <View style={{width:width-50,height:1,backgroundColor:'#24D4BC',alignSelf:'center'}}/>
                <View style={{  width:width-60,alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'}}>
  <HtmlView
                stylesheet={styles}
                value={htmlview}
                />
                </View>
              
                  <View style={styles.btnTextHolder}>
              
      </View>
                <Text style={styles.textt}>If you represent a business, you can</Text>
                <Text style={styles.underline_text}>contact us here</Text>
                {/* <View style={styles.rowContainer}> */}
                    <Text style={styles.centerText}>Username</Text>
                 {!this.state.reqCreator?   <LinearGradient style={styles.btnview1} colors={['#24D4BC', '#27A291']} >
                    <TouchableOpacity
                    onPress={()=>!this.state.reqCreator?this.setState({reqCreator:!this.state.reqCreator}):null}
                    // onPress={()=>this.props.navigation.navigate('loginSignup')}
                    >
                    <Text style={{color:'#ffff',textAlign:'center',fontSize:16,fontFamily:'AzoSans-Regular'}}>Sign In</Text>
                </TouchableOpacity>
                </LinearGradient>:
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',margin:'10%',marginTop:'5%',marginBottom:'2%'}}>
                <Image style={{width:50,height:50,borderRadius:50/2}} source={{uri:this.state.avatar}}/>
                <Text style={{color:'#27A291', width:width/2,fontSize:16,fontFamily:'AzoSans-Regular'}}>{this.state.username}</Text>
                </View>
        }
                {/* </View> */}
                <Text style={styles.centerText}>I want to create…*</Text>
                {/* <Text style={styles.textTitle1}>We welcome all content creators to join our self-publishing community. PageVio provides you the tools to publish your content, compile them into a digital book (if you choose to). And share it on social networks, or embed into your website. Publishing on Imozzo also empowers your readers to collect, bookmark, pin and share your content.</Text> */}
                <View style={styles.dropdownbtnView}>
                <TouchableOpacity style={{  backgroundColor:'#ffff',
    justifyContent:'center',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    // width:width-50,
    width:width/1.2,
    height:!this.state.expanded?height/14:height/4,
    elevation:3,
    borderRadius:20}} 
                onPress={this.changeLayout}>
                 <View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#707070',fontSize:16,fontFamily:'AzoSans-Regular',width:width-120,textAlign:'left',paddingLeft:10}}>{this.state.dropdownText}</Text>
                    <Image 
                    source={require('../assets/img/dropdown.png')}/>
                    </View>
                    {!this.state.expanded?null:
                    (<View
                     style={{flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    <Text onPress={()=>this.setState({dropdownText:'Comics',expanded:!this.state.expanded})}
                     style={{color:'#707070',fontSize:16,fontFamily:'AzoSans-Regular',width:width-100,textAlign:'center',padding:'2%'}}>Comics</Text>
                    <Text onPress={()=>this.setState({dropdownText:'Illustrations',expanded:!this.state.expanded})}
                    style={{color:'#707070',fontSize:16,fontFamily:'AzoSans-Regular',width:width-100,textAlign:'center',padding:'2%'}}>Illustrations</Text>
                    <Text onPress={()=>this.setState({dropdownText:'Novels',expanded:!this.state.expanded})}
                     style={{color:'#707070',fontSize:16,fontFamily:'AzoSans-Regular',width:width-100,textAlign:'center',padding:'2%'}}>Novels</Text>
                    </View>)}
                    </View>
                   
                </TouchableOpacity>
                
                </View>
                <Text style={styles.centerText}>Website</Text>
                {/* <Text style={styles.textTitle1}>We welcome all content creators to join our self-publishing community. PageVio provides you the tools to publish your content, compile them into a digital book (if you choose to). And share it on social networks, or embed into your website. Publishing on Imozzo also empowers your readers to collect, bookmark, pin and share your content.</Text> */}
                <View style={styles.dropdownbtnView}>
                <TextInput style={styles.textInputStyle}
                onChangeText={(text)=>this.setState({webText:text})}
                value={this.state.webText}
                placeholder='Enter Website (optional)'
                placeholderTextColor='#cccccc'
                
            />
                
                </View>
                <View 
                style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignSelf:'center',width:width/1.2,}}
                >
                    <TouchableOpacity 
                            onPress={ () => this.setState({ boolean: !this.state.boolean }) } 
                            >
                    <Image source={checked} />
                    </TouchableOpacity>
                    <Text style={{fontSize:14,fontFamily:'AzoSans-Regular',color:'#707070',textAlign:'left',width:width/1.35,}}>I understand and accept the terms of use. *</Text>
             </View> 
             <View style={styles.rowContainer1}>
             <LinearGradient style={styles.btnview1} 
            //  colors={['#24D4BC', '#27A291']} 
            colors={
                (!(this.state.dropdownText==='Please specify') ?  ['#24D4BC', '#27A291']:['#CCCCCC', '#00000628'])
      } 
             >
                    <TouchableOpacity
                    onPress={()=>this.submitBtn()}>
                    <Text style={{color:'#ffff',fontSize:16,fontFamily:'AzoSans-Regular',textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>    
                </LinearGradient>      
                 </View>                    
                </View>
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
   
    centerText:{
        fontSize:16,
        textAlign:'center',
        margin:'2%',
        fontFamily:'Montserrat-Bold',
    },
    btnview: {
        alignItems:'center',
        justifyContent:'center',
        width:width/2
,        height:50,
        borderRadius:30,
      },
      btnview1: {
          alignSelf:'center',
        alignItems:'center',
        width:width/1.2,
          height:height/14,
          justifyContent:'center',
        marginBottom:'3%',
        borderRadius:30

      },
      h4:{
        fontFamily:'AzoSans-Regular',
        fontSize:14,
        marginTop:5
      
      },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:'10%',

    },
    rowContainer1:{
        flexDirection:'row',
        marginTop:'15%',
        alignItems:'center',
        justifyContent:'center'


    },
    html:{
        margin:'5%',
        paddingLeft:'2%',
        paddingRight:'2%',
       
    },
    dropdownbtnView:{
        margin:'2%',
      
    },
    text:{
        fontSize:17,
        paddingRight:'10%'
        // marginRight:'5%'
    },
    textt:{
        // marginLeft:'5%',
        // marginRight:'5%',
        // paddingLeft:'2%',
        // paddingRight:'2%',
        width:width-60,
        alignSelf:'center',
        fontFamily:'AzoSans-Regular',
        fontSize:14,
    },
    underline_text:{
        width:width-60,
        alignSelf:'center',
        fontFamily:'AzoSans-Regular',
        fontSize:14,
        textDecorationLine:'underline',
        color:'#27A291'
        
    },
    bottomLine: {
        height:'8%',
        bottom:0,
        left: 0,
        // elevation:3,
        right: 0,
        borderTopColor:'gray',
        borderTopWidth:0.5,
      
        // opacity:0.5,
        justifyContent:'center',
        position: 'absolute',
        backgroundColor:'#fff',
        // paddingRight:'10%'
       
      },
    desctouchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        padding:'1%',
        // alignSelf:'center',
        // width:width-50,
        height:150,
    
        color:'#CCCCCC',fontSize:18,
        borderRadius:30
    },
    textInputStyle:{
        textAlign: 'center',
        backgroundColor:'#F9F9F9',
        width:width/1.2,
        height:height/14,
        // width:width-50,
        alignSelf:'center',
        borderRadius:30,
        fontSize:16,fontFamily:'AzoSans-Regular'
    },
    touchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'8%',
        // width:width-50,
        height:50,
        borderRadius:30
,    },
// touchableBtn1:{
//     backgroundColor:'#ffff',
//     justifyContent:'center',
//     // alignItems:'center',
//     // width:width-50,
//     height:this.state.expanded?50:100,
//     elevation:3,
//     borderRadius:30
// ,    },
    headerRow:{
        // height: '11%',
        // flex:0.1,
        paddingTop:'5%',
        height:'8%',
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
        fontSize:16,
        fontFamily:'Montserrat-Bold',
        color:'#27A291'
    },
    textTitle:{
        fontSize:24,
        textAlign:'center',
        fontFamily:'Montserrat-Light',
        padding:'5%',
    },
    textTitle1:{
        fontSize:18,
        textAlign:'center',
        // fontWeight:'bold',
        padding:'5%',
        marginTop:'10%'
    },
    descTextTitle:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
        marginTop:'5%'
    },
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
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
    }
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(RequestCreator);
