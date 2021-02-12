import React, { Component } from 'react'
import {
    View,SafeAreaView, ImageBackground, FlatList, BackHandler,RefreshControl,AsyncStorage, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid,Modal
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import BlurModal from '../components/blurModal';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')

const height = Dimensions.get('window').height;
let list,colvalue;
class RemoveSection extends Component {
    constructor() {
        super();
    this.state = {
        list: [
            {
                id: 0,
                bgcolor: "#569BE0",
                img: img1,
                title: "New Planet",
                publications: '4 publications',
                pages: '3 pages',
                subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
            },
            {
                id: 1,
                bgcolor: "#7C3BD3",
                img: img2,
                title: "A Cat's Tale",
                publications: '4 publications',
                pages: '3 pages',
                subtitle: "Share interesting Quotes or Phrases On Social Media"
            },
            {
                id: 2,
                bgcolor: "#EB9A17",
                img: img3,
                title: "Read Anywhere",
                subtitle: "You can also read the same publication on your PC"
            }
        ],
        sendingArray:[],
        next:false,
        loading:true,
        sectionData:'',
        getuserid:'',
        selectedItemArray:[],
        selectedSecid:'',
        selectedIds:[],
        undo:false,
        deletedName:'',
        modalVisible: false,

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
    colvalue = this.props.navigation.state.params.collId
    ? this.props.navigation.state.params.collId
    : null;
    console.log('col value ',colvalue)
    AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();

    AsyncStorage.getItem('collectionId').then((value)=>{this.setState({getColId:value})}).done();
    // {this.getData()}
    this.CheckConnectivity();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
showModal = () => {
    this.setState({
        modalVisible: true
    });
    setTimeout(() => {
        // this.props.changeRemove()
        this.setState({
            modalVisible: false
        })
        if(this.state.undo==false){
            {this.CheckConnectivity1()}
          }else{
            this.setState({undo:false})
          }    
          this.props.navigation.navigate('collectionDetail',{'collId':colvalue})
        }, 3000);
}
getData(){
    setTimeout(() => {
        {this.exploredata(colvalue)}
    }, 1000);
}
exploredata(collectionId){
    var json=JSON.stringify({
        "CollectionID":collectionId ,
      "User_ID":this.state.getuserid,
      "SortBy":"DESC"
 
      });
        fetch("http://162.250.120.20:444/Login/Section",
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
            const filteredList = responseJson.filter((item) => item.SectionID != 0);
        this.setState({sectionData: filteredList,loading:false})
        })
        .catch((error) => {
            console.warn(error);
        });
  }
  
deleteData(userid,sectionId) {
    this.setState({loading:true})

    var json = JSON.stringify({
        "Deleted_for":"section",
        "PK_ID":sectionId,
        "user_ID":userid
    });
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
            this.setState({ loading: false })
            AsyncStorage.setItem('Sec_Deleted_Name', JSON.stringify(this.state.deletedName));
            // AsyncStorage.setItem('removePopup', JSON.stringify(1));
            // this.props.removePopupSection();
    
        })
        .catch((error) => {
            console.warn(error);
        });
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
      // this.props.navigation.navigate('collectionDetail',{'collId':colvalue})
      this.props.navigation.goBack();
      return true;
  } 
       sendingItem = (schools, oldName, name) => {
          return schools.map(item => {
              var temp = Object.assign({}, item);
              if (temp.abc === true) {
                  temp.abc = false;
              }
              return temp;
          });
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
            {this.deleteData(this.state.getuserid,this.state.selectedSecid)}
        }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
         
        });
      }
     
      onPressHandler(id) {
        // let selected;
         let sectionData=[...this.state.sectionData];
         for(let data of sectionData){
            if(data.SectionID==id){
            // this.setState({selectedColid:id,deletedName:data.Title})
            // console.log('id ',this.state.selectedColid)
            //uncommented====
             data.abc=(data.abc==null)?true:!data.abc;
             (data.abc)?this.state.selectedItemArray.push(data.Title):this.state.selectedItemArray.pop(data.Title);
             (data.abc)?this.state.selectedIds.push(data.SectionID):this.state.selectedIds.pop(data.SectionID);
             console.log('selected item array ',this.state.selectedItemArray);
             console.log('selected item array ',this.state.selectedIds)
             let ids= this.state.selectedIds.join(',');
             let names = this.state.selectedItemArray.join(',');
             console.log(ids+""+names+"");
             this.setState({next:this.state.selectedItemArray.length>0?true:false,deletedName:names,selectedSecid:ids})
             break;
           }
         }
         this.setState({sectionData});
       }
    // onPressHandler(id) {
    //     // let selected;
    //      let sectionData=[...this.state.sectionData];
    //      for(let data of sectionData){
    //        if(data.SectionID==id){
    //         this.setState({selectedSecid:id,deletedName:data.Title});

    //         //  data.abc=(data.abc==null)?true:!data.abc;
            
    //         //  (data.abc)?this.state.selectedItemArray.push(data):this.state.selectedItemArray.pop(data);
    //         //  console.log('selected item array ',this.state.selectedItemArray)
    //         //   console.log("data.selected"+data.abc,'id',data.SectionID);
    //         //   this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
    //         //     console.log('deletedname ',this.state.deletedName)
    //          // console.log("id"+id);
    //         //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
    //          //console.log("array"+selectedItemArray);
    //          break;
    //        }
    //      }
    //     // console.log("array"+this.state.selectedItemArray);
    //     // MultiselectItems.push(selectedItemArray);
    //      this.setState({sectionData});
    //    }
    pressIcon = (item) => {
        let { list } = this.state;
        list = list.map(e => {
            if (item.id === e.id) {
               
                // item.like = !e.like;
                return  this.setState({next:!this.state.next})
                // this.props.navigation.navigate('collectionDetail', {
                //     item: item
                // });
                //   } else if(item.id === 1){
                //     return this.props.navigation.navigate('filter', {
                //       item: item});
                //     }else if(item.id === 2){
                //       return this.props.navigation.navigate('bookmarks', {
                //         item: item});
            } else {
                return e;
            }
        });
    }
    deleteFunc=()=>{
        // this.props.changeRemove2();
       this.CheckConnectivity1();
    }
    renderItem_card({ item }) {
        // const value = item;
        return (
            <View style={{
                // flex:1,
                width: '50%',
                padding: '2%',
                backgroundColor: '#ffff',
                // borderWidth:0.5,
                // borderColor:'#ccccccc'
            }}>
                <TouchableOpacity
                    onPress={() => this.onPressHandler(item.SectionID)}>
                    {/* <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '95%', elevation: 1, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                            source={{ uri: item.CoverImg!=""?item.CoverImg:null }} />
                           
                    </View>
                    <View style={{ padding: '2%', margin: '1%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
                        <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
                    </View> */}
      
                {/* three grids images */}
                {item.SectionID==0? <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '95%',  height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                           
                    </View>:
                    <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff',borderRadius:10 }}
                    >
                        <Image style={{ width: '75%', height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                        <View style={{ flex:1, flexDirection: 'column', marginLeft: '1%',borderLeftWidth: 0.3, borderColor: '#cccccc' }}>
                  <View style={{ borderBottomWidth: 0.3, borderColor: '#cccccc',borderTopRightRadius:10 }}>
                                <ImageBackground
                                imageStyle={{borderTopRightRadius:10}}
                                    style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                                    source={{ uri: item.Image2!=""?item.Image2:null}} />
                            </View>
                            <View>
                                <Image
                                    style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                                    source={{ uri: item.Image3!=""?item.Image3:null }} />
                            </View>
                        </View>
                    </View>
                  }
                 {item.SectionID==0?
                  <View style={{ padding: '2%', margin: '1%' }}>
                    <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Page_Post_Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.Author}</Text>
                    </View>
                 :
                   <View style={{ padding: '2%', margin: '1%' }}>
                    <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
                        <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
                    </View>}
                </TouchableOpacity>
            </View>
        )
    }


    renderItem_card1({ item }) {
        // const value = item;
        return (
            <View style={{
                // flex:1,
                width: '50%',
                padding: '2%',
                backgroundColor: '#ffff',
                // borderWidth:0.5,
                // borderColor:'#ccccccc'
            }}>
                <TouchableOpacity
                style={styles.button}
                   onPress={() => this.onPressHandler(item.SectionID)}>
                    {/* <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '95%', elevation: 1, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                            source={{ uri: item.CoverImg!=""?item.CoverImg:null }} />
                           
                    </View>
                    <View style={{ padding: '2%', margin: '1%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
                        <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
                    </View> */}
      
                {/* three grids images */}
                {item.SectionID==0? <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '95%', height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                           
                    </View>:
                    <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff',borderRadius:10 }}
                    >
                        <Image style={{ width: '75%', height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                        <View style={{ flex:1, flexDirection: 'column',  borderLeftWidth: 0.3, borderColor: '#cccccc' }}>
                  <View style={{ borderBottomWidth: 0.3, borderColor: '#cccccc' }}>
                                <ImageBackground
                                imageStyle={{borderTopRightRadius:10}}
                                    style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                                    source={{ uri: item.Image2!=""?item.Image2:null}} >
                        {item.abc==true?<Image style={{alignSelf:'flex-end',position:'absolute',margin:'1%',width:35,height:35}} source={require('../assets/img/remove-delete.png')}/>:null}
  
                                </ImageBackground>
                            </View>
                            <View>
                                <Image
                                    style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                                    source={{ uri: item.Image3!=""?item.Image3:null }} />
                            </View>
                        </View>
                    </View>
                  }
                  </TouchableOpacity>
                    <TouchableOpacity
                   onPress={() => this.onPressHandler(item.SectionID)}>
                 {item.SectionID==0?
                  <View style={{ padding: '2%', margin: '1%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Page_Post_Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.Author}</Text>
                    </View>
                 :
                 <View style={{ padding: '2%', margin: '1%' }}>
                 <Text numberOfLines={2} style={{ fontSize: 16, fontFamily: 'AzoSans-Medium' }}>{item.Title}</Text>
                     <Text style={{ color: '#707070',fontSize: 12, fontFamily: 'AzoSans-Light'  }}>{item.PublicationCount} publications</Text>
                     <Text style={{ color: '#707070',fontSize: 12, fontFamily: 'AzoSans-Light'  }}>{item.PageCount} pages</Text>
                 </View>}
                </TouchableOpacity>
            </View>
        )
      }
    render() {
        const { navigate } = this.props.navigation;
        // const value = this.props.navigation.state.params.pass_data
        // ? this.props.navigation.state.params.pass_data
        // : 'undefined';
        // console.log('value is ',value,'value true or false',)
        return (

            <SafeAreaView style={{ flex: 2, backgroundColor: '#ffff' }}>

        <View style={{height:'8%',backgroundColor:'#E74C3C',justifyContent:'center'}}>
                            <Text style={{color:'white',  fontSize:16,
                fontFamily:'Montserrat-Bold',textAlign:'center'}}>Select Section(s) to Remove</Text>
                        </View>
                <ScrollView style={{marginBottom:'10%'}}>



                    <FlatList
                        data={this.state.sectionData}
                        extraData={this.state}
                        renderItem={this.renderItem_card1.bind(this)}
                        numColumns={2}
                        removeClippedSubviews={false}
                        enableEmptySections={false}
                        contentContainerStyle={{
                            padding: '3%',

                            flex: 1,

                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>
                <View style={styles.bottomLine}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center' }}>
                        <TouchableOpacity style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}}
                            onPress={() =>this.state.selectedSecid==""?
                            //  this.props.navigation.navigate('collectionDetail')
                            this.props.navigation.goBack()
                             :null}>
                            <Text style={[this.state.selectedSecid==""?styles.textStyle:styles.inacitveStyle]}>Back</Text>

                        </TouchableOpacity>
                        <LinearGradient style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}} colors={this.state.selectedSecid!=""?['#24D4BC', '#27A291']:['#fff','#fff']} >
                        <TouchableOpacity 
                            onPress={() =>this.state.selectedSecid!=""?this.showModal():null}>
                            <Text style={[this.state.selectedSecid!=""?styles.inacitveColor:styles.inacitveStyle]}>Delete</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
                <BlurModal visible={this.state.modalVisible}
          children={
                        <View style={{
                            left: 0, right: 0, bottom: 0, position: 'absolute',
                            height: '10%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#E74C3C',
                        }}>
                            <Text numberOfLines={2} style={{ color: '#fff', fontSize: 16,fontFamily:'AzoSans-Bold', textAlign: 'center' }}>Removed - {this.state.deletedName} </Text>


                            <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'4%'}}
                            onPress={()=>this.setState({undo:true})}
                            >
                                <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline',fontFamily:'AzoSans-Regular'}}>Undo</Text>
                            </TouchableOpacity>


                        </View>}
                        />
                        <Modal1 isVisible={this.state.loading}  >
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
    textStyle:{ 
        color: '#707070', textAlign: 'center', fontSize: 16,fontFamily:'AzoSans-Regular', paddingLeft: '4%'
    },
    inacitveStyle:{ 
        color: '#cccccc', textAlign: 'center', fontSize: 16,fontFamily:'AzoSans-Regular',paddingLeft: '4%'
    },
    inacitveColor:{ 
        color: '#fff', textAlign: 'center', fontSize: 16,fontFamily:'AzoSans-Regular', paddingLeft: '4%'
    },
    bottomLine: {

        height: '8%',
        bottom: 0,
        left: 0,
        // elevation:3,
        right: 0,
        borderTopColor: 'gray',
        backgroundColor:'#cccccc',
        borderTopWidth: 0.1,

        // opacity:0.5,
        justifyContent: 'center',
        position: 'absolute',
        // paddingRight:'10%'

    },
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    tabsss: {
        alignItems: 'center', justifyContent: 'center'
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
    button: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        borderRadius:10,
    },
    image: {
        flex: 1,
    }
})

function mapStateToProps(state){
    return{
    remove:state.apiReducer.remove,
    }
  }
  
  
  function mapDispatchToProps(dispatch){
    return{
        changeRemove:()=>dispatch({type:'CHANGE_REMOVE_ITEM1'}),
        changeRemove2:()=>dispatch({type:'CHANGE_REMOVE_ITEM2'}),
        removePopupSection:()=>dispatch({type:'REMOVE_POPUP_SECTION'}),

    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(RemoveSection);