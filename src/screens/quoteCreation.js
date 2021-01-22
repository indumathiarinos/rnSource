import React, { Component } from 'react'
import {SafeAreaView,
    View,AsyncStorage,ImageBackground,BackHandler,TextInput,LayoutAnimation,StyleSheet, Text, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
const width = Dimensions.get('window').width;

console.disableYellowBox = true;

const height = Dimensions.get('window').height;
// let colValue;
class CreateSectionEdit extends Component {
    constructor(props){
        super(props)
  this.state = { expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Public',
            title:'',
            backBtnActive:false,
            section:[],
            descdata:'',
            loading:false,
            getuserid:'',
            descLength:0,
            getcolId:'',
            gotoSectionEdit:false
            
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        // colValue = this.props.navigation.state.params.collId
        // ? this.props.navigation.state.params.collId
        // : null;
        AsyncStorage.getItem('EditCreateSec').then(val =>this.setState({ gotoSectionEdit: val })).done;
        AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
        AsyncStorage.getItem('collectionId').then((value) => this.setState({ getcolId : value })).done();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        // {this.getData()}
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
      this.backpress();
      return true;
    }   
    getData() {
        setTimeout(() => {
            console.log('user id is  in create sec ',this.state.getuserid)
            // { this.exploredata(this.state.gettypeid, this.state.getpostid) }
        }, 1000)
    }
    
    exploredata(userid,title,privacy,desc,colId){
        var json=JSON.stringify({
          'S_user_id': userid,
          "S_title":title,
          "S_privacy":privacy,
          "S_description":desc,
          "S_collection_id":colId,
          "S_section_id":""
          });
          console.warn(json+" create section")
          fetch("http://162.250.120.20:444/Login/SectionCollectionAdd",
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
                console.log('fsdadfasdfasdr',responseJson)
                this.setState({section: responseJson,loading:false})
                console.warn(responseJson)
                console.warn("sec")
                // AsyncStorage.setItem('loading',JSON.stringify(true))
                if(responseJson[0].msg=='Success'){
                    // if(this.state.gotoSectionEdit){
                    //     AsyncStorage.setItem('EditCreateSec',JSON.stringify(false))
                    //     console.log('after false ',this.state.gotoSectionEdit)
                    //     this.props.navigation.navigate('sectionEdit');
                    //     this.setState({gotoSectionEdit:false})
                    // }else{
                      this.props.navigation.navigate('sectionEdit')
                                          // }    
                              }
      
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
      }
      CheckConnectivity(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
          {this.exploredata(this.state.getuserid,this.state.title,this.state.dropdownText,this.state.descdata,this.state.getcolId)}
            }else{
                alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
            }
         
        });
      }
      createsection(){
          this.CheckConnectivity();
      }
        changeLayout = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ expanded: !this.state.expanded });
          }
        nextBtn=()=>{
            console.log('title text is ',this.state.title)
            if(this.state.title!=''){
                this.setState({backBtnActive:true})
            }
        }
        backpress=()=>{         
            console.log('goto sectionedit ',this.state.gotoSectionEdit);

            // if(this.state.gotoSectionEdit){
            //     AsyncStorage.setItem('EditCreateSec',JSON.stringify(false))
            //     console.log('after false ',this.state.gotoSectionEdit)
            //     this.props.navigation.navigate('sectionEdit');
            //     this.setState({gotoSectionEdit:false})
            // }else{
                this.props.navigation.navigate('sectionEdit');
            // }  
           }
    render() {
        const { navigate } = this.props.navigation;
        var imgSource=(this.state.dropdownText=='Public')?require('../assets/img/dropdown.png'):null;
        var imgSource1=(this.state.dropdownText=='Private')?require('../assets/img/dropdown.png'):null;

        return (
            <SafeAreaView style={{ flex: 2,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Create Section</Text>
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
                <View style={{paddingLeft:'5%',paddingRight:'5%',flex:2}}>
                
                <Text style={styles.textTitle}>Section Title</Text>
                <TouchableOpacity style={styles.touchableBtn}>
                <TextInput
                textAlignVertical={'top'}
                onChangeText={(text)=>this.setState({title:text})}
                placeholder="Add a Title" style={{ textAlign:'left',fontSize:18,justifyContent:'center',padding:10,height: 50,borderRadius:20,backgroundColor:'#F9F9F9' }} />

                </TouchableOpacity>
                <Text style={styles.textTitle1}>Privacy</Text>
                {/* <TouchableOpacity style={styles.touchableBtn1}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#CCCCCC',fontSize:18,width:width-100,textAlign:'center'}}>Public</Text>
                    <Image 
                    source={require('../assets/img/dropdown.png')}/>
                    </View>     
                </TouchableOpacity> */}
                  <TouchableOpacity style={{  backgroundColor:'#ffff',
    justifyContent:'center',
    // alignItems:'center',
    // width:width-50,
    height:!this.state.expanded?50:100,
    elevation:3,
    borderRadius:30}} 
                onPress={this.changeLayout}>
                 <View>
                        
                    {!this.state.expanded?<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#707070',textAlign:'center',fontSize:18,width:width-120,}}>{this.state.dropdownText}</Text>
                    <Image 
                    source={require('../assets/img/dropdown.png')}/>
                    </View>:
                    (
                        <View
                     style={{flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text 
                    onPress={()=>this.setState({dropdownText:'Public',expanded:!this.state.expanded})}
                    style={{color:'#707070',fontSize:18,width:width-120,textAlign:'center'}}>Public</Text>
                    <Image 
                    style={{width:20}}
                    source={imgSource}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    <Text 
                    onPress={()=>this.setState({dropdownText:'Private',expanded:!this.state.expanded})}
                    style={{color:'#707070',fontSize:18,width:width-120,textAlign:'center'}}>Private</Text>
                    <Image 
                    style={{width:20}}
                    source={imgSource1}/>
                    </View>
                    </View>
                    // <View
                    //  style={{flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    // <Text onPress={()=>this.setState({dropdownText:'Public',expanded:!this.state.expanded})}
                    //  style={{color:'#707070',fontSize:18,width:width-100,textAlign:'center',padding:'2%'}}>Public</Text>
                    // <Text onPress={()=>this.setState({dropdownText:'Private',expanded:!this.state.expanded})}
                    // style={{color:'#707070',fontSize:18,width:width-100,textAlign:'center',padding:'2%'}}>Private</Text>
                    // </View>
                    )}
                    </View>                  
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={styles.descTextTitle}>Description</Text>
                <Text style={{color:'#707070',fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
        marginLeft:'-5%',
        marginTop:'5%'
        }}>(Optional)</Text>
                </View>
                <TextInput multiline textAlignVertical={'top'}
              maxLength={250}
                placeholder="Add Description" 
                onChangeText={(text)=>this.setState({descdata:text})}

                style={{ padding:'5%',textAlign: 'left' ,justifyContent:'center',height: 150,borderRadius:20,backgroundColor:'#F9F9F9' }} />

               
                    {/* <Text 
                     style={styles.desctouchableBtn}
                    // style={{justifyContent:'center',color:'#CCCCCC',fontSize:18}}
                    >Add Title</Text> */}
                   
            <Text style={{ color: '#707070', textAlign: 'right', paddingRight: '2%',marginBottom:'10%' }}>{this.state.descdata.length}/250</Text>

                    
                {/* <Text style={{padding:'3%'}}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Text> */}                                     
                </View>
                </ScrollView>
                <View style={styles.bottomLine}>
                {/* <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} /> */}
                   {/* {!this.state.backBtnActive?(   <TouchableOpacity
                   onPress={this.nextBtn}>
                   <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:'5%'}}>
                    <Text style={{color:'#707070',textAlign:'right',fontSize:18,paddingRight:'4%'}}>Next</Text>
                    <Image source={require('../assets/img/right_arrow.png')} />
                      
                    </View>
                   </TouchableOpacity>):(<View style={{flexDirection:'row',paddingRight:'5%',paddingLeft:'5%',justifyContent:'space-between'}}>
                   <TouchableOpacity
                   onPress={()=>this.setState({backBtnActive:false})}>
                   <View style={{flexDirection:'row',}}>
                   <Image source={require('../assets/img/left_arrow.png')} />
                    <Text style={{color:'#707070',textAlign:'right',fontSize:18,paddingLeft:'4%'}}>Back</Text>
                      
                    </View>
                   </TouchableOpacity> */}
                    <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'4%'}}
                                       onPress={()=>this.createsection()}>

                   {/* onPress={()=>this.props.navigation.navigate('collection')}> */}
                   <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#707070',alignSelf:'center',textAlign:'right',fontSize:18,paddingRight:'2%'}}>Save</Text>
                    <Image style={{width:30,height:30,alignSelf:'center'}} source={require('../assets/img/saveIcon.png')} />
                      
                    </View>
                   </TouchableOpacity>
                       {/* </View>)

                   } */}
                
                  
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
    touchableBtn:{
        backgroundColor:'#F9F9F9',
        justifyContent:'center',
        alignItems:'center',
        // width:width-50,
        height:50,
        borderRadius:30
,    },
touchableBtn1:{
    backgroundColor:'#ffff',
    justifyContent:'center',
    // alignItems:'center',
    // width:width-50,
    height:50,
    elevation:3,
    borderRadius:30
,    },
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
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
    },
    textTitle1:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CreateSectionEdit);