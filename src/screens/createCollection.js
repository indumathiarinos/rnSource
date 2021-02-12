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
import BlurModal from '../components/blurModal';
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class CreateCollection extends Component {
    constructor(props){
        super(props)
  this.state = { expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Public',
            title:'',
            backBtnActive:false,
            collection:[],
            descdata:'',
            loading:false,
            getuserid:'',
            descLength:0,
            getcolId:'',
            gotoSectionEdit:false,
            postadd_postid:'',
            postadd_typeid:'',
            addCollectionModal:false,
            undo:false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
        AsyncStorage.getItem('EditCreateColl').then(val =>this.setState({ gotoSectionEdit: val })).done;
        AsyncStorage.getItem('postadd_postid').then(val =>this.setState({ postadd_postid: val })).done;
        AsyncStorage.getItem('postadd_typeid').then(val =>this.setState({ postadd_typeid: val })).done;

        console.log('newww ',this.state.gotoSectionEdit)
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
    CheckConnectivity(){    
        
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
              this.setState({loading:true})
            {this.exploredata(this.state.getuserid,this.state.title,this.state.dropdownText,this.state.descdata,)}
            }else{
                alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
            }
        });
      }
      addCollection=()=>{
        //   this.setState({addCollectionModal:true})
        //   setTimeout(() => {
        //      this.setState({addCollectionModal:false})
        //      this.props.navigation.goBack();
        //   }, 5000);
        this.setState({
            addCollectionModal: true
        });
        setTimeout(() => {
            // this.props.changeRemove()
            this.setState({
                addCollectionModal: false
            })
            if(this.state.undo==false){
                // this.props.navigation.goBack();
                {this.CheckConnectivity()}
              }else{
                this.setState({undo:false})
              }    
              this.props.navigation.goBack();
        }, 3000);
      }
    exploredata(userid,title,privacy,desc){
        {this.state.title==""?null:
        this.setState({loading:true})
        var json=JSON.stringify({
          'C_user_id': userid,
          "C_title":title,
          "C_privacy":privacy,
          "C_description":desc,
          "C_collection_id":"",
          "Post_PageID":this.state.postadd_postid,
          "Type":this.state.postadd_typeid
          });
          console.warn(json+"")
          fetch("http://162.250.120.20:444/Login/CollectionAdd",
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
                this.setState({collection: responseJson,loading:false})
                console.warn(responseJson)
                console.warn("Coll")
                AsyncStorage.setItem('loading',JSON.stringify(true))
                if(responseJson[0].msg=='Success'){
                //  this.props.navigation.navigate('collection')
                // if(this.state.gotoSectionEdit){
                //     AsyncStorage.setItem('EditCreateColl',JSON.stringify(false))
                //     this.props.navigation.navigate('sectionEdit');
                //     this.setState({gotoSectionEdit:false})
                // }else{
                    // {this.state.postadd_postid!=""?this.addCollection(): 
                                    //    this.props.navigation.goBack()
                // }
                //    this.props.navigation.navigate('collection');
                // }
                }
      
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
        }
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
            //     AsyncStorage.setItem('EditCreateColl',JSON.stringify(false))
            //     console.log('after false ',this.state.gotoSectionEdit)
            //     this.props.navigation.navigate('sectionEdit');
            //     this.setState({gotoSectionEdit:false})
            // }else{
                this.props.navigation.goBack()
            //    this.props.navigation.navigate('collection');
            // }
           }
    render() {
        const { navigate } = this.props.navigation;
        var imgSource=(this.state.dropdownText=='Public')?require('../assets/img/dropdown.png'):null;
        var imgSource1=(this.state.dropdownText=='Private')?require('../assets/img/dropdown.png'):null;
        AsyncStorage.getItem('EditCreateColl').then(val =>this.setState({ gotoSectionEdit: val })).done;

        return (
            <SafeAreaView style={{ flex: 2,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Create Collection</Text>
                     <TouchableOpacity
                     onPress={()=>this.backpress()}
                >
                            <Image style={{ alignSelf: 'center',width:50,height:50,paddingRight:'3%' }} source={require('../assets/img/close.png')} />

                     </TouchableOpacity>
                      {/* </View> */}
                </View>
                <ScrollView style={{marginBottom:50}}>
                <View style={{paddingLeft:'5%',paddingRight:'5%',flex:2}}>
                <Text style={styles.textTitle}>Collection Title</Text>
                <TouchableOpacity style={styles.touchableBtn}>
                <TextInput
                textAlignVertical={'top'}
                onChangeText={(text)=>this.setState({title:text})}
                placeholderTextColor={'#CCCCCC'}
                placeholder="Add Title" style={{ textAlign:'center',fontSize:16,justifyContent:'center',height: 50,borderRadius:20,backgroundColor:'#F9F9F9',width:width/2,fontFamily:'AzoSans-Regular'  }} />

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
                    <Text style={styles.dropdownText}>{this.state.dropdownText}</Text>
                    <Image 
                    source={require('../assets/img/dropdown.png')}/>
                    </View>:
                    (
                        <View
                     style={{flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text 
                    onPress={()=>this.setState({dropdownText:'Public',expanded:!this.state.expanded})}
                    style={styles.dropdownText}>Public</Text>
                    <Image 
                    style={{width:20}}
                    source={imgSource}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'2%'}}>
                    <Text 
                    onPress={()=>this.setState({dropdownText:'Private',expanded:!this.state.expanded})}
                    style={styles.dropdownText}>Private</Text>
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
                <Text style={{color:'#707070',fontSize:16,
                        textAlign:'center',
                        fontFamily:'AzoSans-Regular',
                        padding:'5%',
                        marginLeft:'-5%',
                        marginTop:'5%'
                        }}>(Optional)</Text>
                </View>
                <TextInput multiline textAlignVertical={'top'}
                    maxLength={250}
                    placeholderTextColor={'#CCCCCC'}
                    placeholder="Add Description" 
                    onChangeText={(text)=>this.setState({descdata:text})}
                    style={{ padding:'5%',textAlign: 'left' ,justifyContent:'center',height: 150,borderRadius:20,backgroundColor:'#F9F9F9',fontSize:16,fontFamily:'AzoSans-Regular' }} />
                    {/* <Text 
                     style={styles.desctouchableBtn}
                    // style={{justifyContent:'center',color:'#CCCCCC',fontSize:18}}
                    >Add Title</Text> */}
            <Text style={{ color: '#707070', textAlign: 'right', paddingRight: '2%',fontFamily:'AzoSans-Regular',fontSize:8,}}>{this.state.descdata.length}/250</Text>
                {/* <Text style={{padding:'3%'}}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Text> */}                                     
                </View>
                </ScrollView>
                <View style={styles.bottomLine}>
               
               <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'4%'}}
                                  onPress={()=>this.addCollection()}>
              {/* onPress={()=>this.props.navigation.navigate('collection')}> */}
              <View style={{flexDirection:'row'}}>
               <Text style={{color:'#707070',alignSelf:'center',textAlign:'right',fontSize:16,fontFamily:'AzoSans-Regular',paddingRight:'2%'}}>Save</Text>
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
                 {this.state.addCollectionModal ?
                    <BlurModal visible={this.state.addCollectionModal}
                    children={
                        <View style={{
                            left: 0, right: 0, bottom: 0, position: 'absolute',
                            height: '10%',
                            width:width,
                            // height:'8%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#27A291',
                            paddingTop:'1%',
                            // paddingLeft:'2%',
                            // paddingRight:'2%'
                        }}>
                            <View style={{flexDirection:'row',width:width/1.4,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center',fontFamily:'AzoSans-Bold' }}>Added to - </Text>
                          <TouchableOpacity 
                        //   onPress={()=>this.props.navigation.navigate('collection')}
                          >
                          <Text numberOfLines={2} style={{fontSize:16,fontFamily:'AzoSans-Medium',color:'#fff',textDecorationLine:'underline'}}>{this.state.title}</Text>
                          </TouchableOpacity>

                            </View>

                           
                            <TouchableOpacity style={{ marginTop: '1%', alignSelf: 'flex-end', marginRight: '3%' }}
                            onPress={()=>this.setState({undo:true})}
                            >
                                <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline',fontFamily:'AzoSans-Regular' }}>Undo</Text>
                            </TouchableOpacity>


                        </View>}/>
                    : null}
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
    dropdownText:{
        color:'#707070',textAlign:'center',width:width-120, fontSize:16,
        fontFamily:'AzoSans-Regular',
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
        textAlign:'center',
        fontSize:16,
        fontFamily:'AzoSans-Medium',
        padding:'5%',
    },
    textTitle1:{
        textAlign:'center',
        fontSize:16,
        fontFamily:'AzoSans-Medium',
        padding:'5%',
        marginTop:'10%'
    },
    descTextTitle:{
        textAlign:'center',
        fontSize:16,
        fontFamily:'AzoSans-Medium', 
        padding:'5%',
        marginTop:'5%'
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CreateCollection);