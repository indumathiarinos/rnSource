import React, { Component } from 'react'
import { View,SafeAreaView,Modal,FlatList, ImageBackground,AsyncStorage, BackHandler ,RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { FloatingAction } from "react-native-floating-action";
import LinearGradient from 'react-native-linear-gradient';
import Modal1 from 'react-native-modal';
import HTMLView from 'react-native-htmlview';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class RemovePins extends Component {
    constructor() {
        super();
    this.state = {
                list: [
            {
                id: 0,
                bgcolor: "#569BE0",
                // img: img1,
                title: "Our Planet",
                publications: '4 publications',
                pages: '3 pages',
                page: 'Page 2',
                subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
            },
            {
                id: 1,
                bgcolor: "#7C3BD3",
                // img: img2,
                title: "A Cat's Tale",
                publications: '4 publications',
                pages: '3 pages',
                page: 'Page 2',
                subtitle: "Share interesting Quotes or Phrases On Social Media"
            },
            {
                id: 2,
                bgcolor: "#EB9A17",
                // img: img3,
                title: "Read Anywhere",

                subtitle: "You can also read the same publication on your PC"
            },
            {
                id: 3,
                bgcolor: "#EB9A17",
                // img: img3,
                title: "Read Anywhere",
                page: 'Page 2',
                subtitle: "You can also read the same publication on your PC"
            }
        ],
      
        selectedItemArray:[],
        sendingArray:[],
        next:false,
        loading:true,
        collection:'',
        getuserid:'',
        selectedColid:'',
        deletedName:'',
        backpins:true,
        selectedIds:[],
        undo:false,
        modalVisible: false,


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
    // AsyncStorage.getItem('back_pins').then((val) => this.setState({ backpins: val })).done();
    console.log('user id ',this.state.getuserid)
    // {this.exploreData(this.state.getuserid)}
    // {this.getData()}
    this.CheckConnectivity();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
       
        this.CheckConnectivity();
       
    })
  
  }
  getData() {
    setTimeout(() => {
            }, 5)
  }
  CheckConnectivity(){    
    NetInfo.fetch().then(state => {
  
      console.log("Connection type cheking", state.type);
      console.log("Is connected cheking?", state.isConnected);
  
      if(state.isConnected==true){
          {this.getData()}
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
        // this.props.changeRemove()
        this.setState({
            modalVisible: false
        })
        if(this.state.undo==false){
            {this.CheckConnectivity1()}
          }else{
            this.setState({undo:false})
          }    
          this.props.navigation.navigate('pins'); 
           }, 5000);
}
  CheckConnectivity1(){    
    NetInfo.fetch().then(state => {
  
      console.log("Connection type cheking", state.type);
      console.log("Is connected cheking?", state.isConnected);
  
      if(state.isConnected==true){
        {this.deleteData(this.state.getuserid,this.state.selectedColid)}
      }else{
        alert('Not Connected')
      }
     
    });
  }
  getData() {
    setTimeout(() => {
        { this.exploreData(this.state.getuserid) }
            }, 5)
  }
  
  exploreData(userid) {
    var json = JSON.stringify({
      "options":"Select","page_id":"","type":"","collection_id":"","section_id":"","Description":"","user_id":userid
    });
    fetch("http://162.250.120.20:444/Login/pinsInsertGet",
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
            this.setState({ pins: responseJson,loading:false })
            console.warn(responseJson)
         
            //alert(this.state.data.status)
  
  
        })
  
        .catch((error) => {
            console.warn(error);
        });
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener.remove()
  
  }
  handleBackButtonClick() {
    this.backpress()
  // this.props.navigation.navigate('collection');
        return true;
  } 
  cardPress = (item) => {
      let { pins } = this.state;
      // console.log('items are', item)
      pins = pins.map(e => {
          if (item.Id=== e.Id) {
              pinsArray.abc=(pinsArray.abc==null)?true:!pinsArray.abc;
              (pinsArray.abc)?this.state.selectedItemArray.push(pinsArray):this.state.selectedItemArray.pop(pinsArray);
              console.log('selected item array ',this.state.selectedItemArray)
               console.log("data.selected"+pinsArray.abc,'id',pinsArray.collectionsID);
               this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
                 this.setState({selectedColid:id,deletedName:pinsArray.Title})
              // return this.props.navigation.navigate('readingBook')
          } else {
              return e;
          }
      });
  }
  onPressHandler(id) {
      // let selected;
      let pins=[...this.state.pins];
       for(let data of pins){
          if(data.Id==id){
          // this.setState({selectedColid:id,deletedName:data.Title})
          // console.log('id ',this.state.selectedColid)
          //uncommented====
           data.abc=(data.abc==null)?true:!data.abc;
           (data.abc)?this.state.selectedItemArray.push(data.page_url):this.state.selectedItemArray.pop(data.page_url);
           (data.abc)?this.state.selectedIds.push(data.Id):this.state.selectedIds.pop(data.Id);
           console.log('selected item array ',this.state.selectedItemArray);
           console.log('selected item array ',this.state.selectedIds)
           let ids= this.state.selectedIds.join(',');
           let names = this.state.selectedItemArray.join(',');
           console.log(ids+""+names+"");
           this.setState({next:this.state.selectedItemArray.length>0?true:false,deletedName:names,selectedColid:ids})
           break;
         }
       }
      //  this.setState({sectionData});
     }
  // onPressHandler(id) {
  //     // let selected;
  //      let pins=[...this.props.pinsArray];
  //      for(let data of pins){
  //        if(data.Id==id){
              
  //         //  data.abc=(data.abc==null)?true:!data.abc;
          
  //         //  (data.abc)?this.state.selectedItemArray.push(data):this.state.selectedItemArray.pop(data);
  //         //  console.log('selected item array ',this.state.selectedItemArray)
  //         //   console.log("data.selected"+data.abc,'id',data.page_id);
  //         //   this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
  //             this.setState({selectedColid:id,deletedName:data.page_url,next:true});
  //             console.log('selcted pin id ',this.state.selectedColid,this.state.deletedName,id)
  //          // console.log("id"+id);
  //         //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
  //          //console.log("array"+selectedItemArray);
  //          break;
  //        }
  //      }
  //     // console.log("array"+this.state.selectedItemArray);
  //     // MultiselectItems.push(selectedItemArray);
  //      this.setState({pins});
  //    }
     renderItem_card({ item }) {
      const value = item;
      return (
          <View style={{ elevation: 3,margin:10,width:width/2.3 }} >
                  <TouchableOpacity onPress={()=>this.onPressHandler(item.Id)} >
                    <View style={{ elevation: 2, backgroundColor: '#fff', borderRadius: 10,
                  // alignItems:'center',alignSelf:"center",justifyContent:'center'
                   }}>
                      <View style={{ width: width / 2 - 20, height: height / 5.2, flex:1,alignItems: 'center', justifyContent: 'center' }}>
                          <Text numberOfLines={9} style={{width: width / 2 - 40,height:height/5.2,textAlign:'center',marginTop:5,marginBottom:5}}>{item.description}</Text>
                      </View>
                      {item.abc==true?<Image style={{alignSelf:'flex-end',position:'absolute',margin:'1%',width:35,height:35}} source={require('../assets/img/remove-delete.png')}/>:null}
       {/* <View style={{ marginLeft:10,marginRight:10,  alignItems: 'center', justifyContent: 'center' }}>
                          <Text>{item.description}</Text>
                      </View> */}
                                {/* <HTMLView style={{width:width/2-30,height:height/6,alignSelf:'center',padding:'5%'}} value={item.page_title}/> */}
  
                      </View>
                      <Text numberOfLines={2} style={{ fontSize: 16,width: width / 2 - 40,fontWeight: 'bold',textAlign:'center',marginTop:5,marginBottom:5}}>{item.page_url}</Text>
                      </TouchableOpacity>
  
                  {/* <View style={{ alignItems: 'center', marginLeft: '15%', marginBottom: 5, marginTop: 5}}> */}
                      <Text style={{ color: '#707070', fontSize: 14,marginLeft:10 }}>{item.rownum!=0?'Page':null} {item.rownum!=0? item.rownum:null}</Text>
                  {/* </View> */}
              </View>
  
              //   <View style={{ flex:1 }}>
              //     <Image
              //       style={{ width: width/2-50, height: 80,marginTop:10, alignSelf: 'center'}}
              //       source={item.img}
              //       onPress={() => console.log("Works!")}
              //       activeOpacity={0.7}
              //     />
              //     <Text style={{ margin: '5%', color: '#2d2e2d',textAlign:'center',fontWeight:'bold' }}>{item.title}</Text>
              //   </View>
  
          )
  
  }
      // renderItem_card1({ item }) {
      //     const value = item;
      //     return (
      //         <View style={{flex:1, elevation: 3 }} >
      //             <TouchableOpacity onPress={()=>this.onPressHandler(item.Id)} style={{ elevation: 2, backgroundColor: '#fff', borderRadius: 10,  elevatiobn: 3,
      //             // alignItems:'center',alignSelf:"center",justifyContent:'center'
      //              }}>
      //                 {/* <View style={{ width: width / 2 - 30, height: height / 4, alignItems: 'center', justifyContent: 'center' }}>
      //                     <Text>{item.title}</Text>
      //                 </View> */}
      //              <View style={{ width: width / 2 - 30,paddingLeft:5,paddingRight:5,height: height / 5.2, flex:1,alignItems: 'center', justifyContent: 'center' }}>
      //                     <Text numberOfLines={9} style={{width: width / 2 - 40,height:height/5.2,textAlign:'center',marginTop:5,marginBottom:5}}>{item.description}</Text>
      //                 </View>
      //                      {item.Id==this.state.selectedColid?<Image style={{alignSelf:'flex-end',top:5,right:5,position:'absolute',margin:'1%'}} source={require('../assets/img/close.png')}/>:null}
  
      //             </TouchableOpacity>
      //             <View style={{ alignItems: 'flex-start',width: width / 2 - 40, marginLeft: '15%', marginBottom:5, marginTop:5}}>
      //                 <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.page_url}</Text>
      //                 <Text style={{ color: '#707070', fontSize: 16 }}>{item.page}</Text>
      //             </View>
      //         </View>
  
      //         //   <View style={{ flex:1 }}>
      //         //     <Image
      //         //       style={{ width: width/2-50, height: 80,marginTop:10, alignSelf: 'center'}}
      //         //       source={item.img}
      //         //       onPress={() => console.log("Works!")}
      //         //       activeOpacity={0.7}
      //         //     />
      //         //     <Text style={{ margin: '5%', color: '#2d2e2d',textAlign:'center',fontWeight:'bold' }}>{item.title}</Text>
      //         //   </View>
  
      //     )
  
      // }
      backpress = () => {
          //    console.log('before set',this.props.nav)
          // this.props.changeNavNews();
          // this.props.navigation.navigate('pins')
          this.props.navigation.goBack();
          // {this.state.backpins?this.props.navigation.navigate('pins'):this.props.navigation.navigate('pins1')}
          //    console.log('after set',this.props.nav);
      }
deleteData(userid,id) {
    this.setState({loading:true})

    var json = JSON.stringify({
        "Deleted_for":"pins",
        "PK_ID":id,
        "user_ID":userid
    });
    console.log('json ',json)
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
                // AsyncStorage.setItem('removePopup2', JSON.stringify(1));
            // AsyncStorage.setItem('deletedPin',this.state.deletedName)
            // AsyncStorage.setItem('loading',JSON.stringify(true))
        //     this.props.removePinsPopup();
        //   this.props.navigation.navigate('pins');
        })
        .catch((error) => {
            console.warn(error);
        });
}


     
  
 
    deleteFunc=()=>{
        // this.props.changeRemove2();
        // AsyncStorage.setItem('removePopup', true);
        this.CheckConnectivity1();
    }
//     renderItem_card({ item }) {
//         // const value = item;
//         return (
//             <View style={{
//                 // flex:1,
//                 width: '50%',
//                 padding: '2%',
//                 backgroundColor: '#ffff'
//             }}>
//                 <TouchableOpacity
//                     onPress={() => this.onPressHandler(item.collectionsID)}>
//                     <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
//                     //  onPress={()=>this.press(item)}
//                     > 
//                     <ImageBackground
//  style={{ width: '100%', height: height / 6, resizeMode: 'cover'}}
//  imageStyle={{borderRadius:10}}              
//        source={{ uri: item.CoverImg!=""?item.CoverImg:null}} >
//                    {item.abc==true?<Image style={{alignSelf:'flex-end',margin:'1%'}} source={require('../assets/img/close.png')}/>:null}
//                 </ImageBackground>
//                     </View>
//                     <View style={{ padding: '2%', margin: '1%' }}>
//                         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
//                         <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
//                         <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
//                     </View>

             
//                 </TouchableOpacity>
//             </View>
//         )
//     }

render() {
    const { navigate } = this.props.navigation;
    // const value = this.props.navigation.state.params.pass_data
    // ? this.props.navigation.state.params.pass_data
    // : 'undefined';
    // console.log('value is ',value,'value true or false',)
    return (

        <SafeAreaView style={{ flex: 2, backgroundColor: '#ffff' }}>

            <View style={{height:'8%',backgroundColor:'red',justifyContent:'center'}}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Pin(s) to Remove</Text>
            </View>
            <ScrollView style={{marginBottom:'14%'}}>



            <FlatList
                    contentContainerStyle={{
                        flex: 1,
                        marginTop:'5%',
                        // marginLeft:'5%'
                    }}
                    data={this.state.pins}
                    extraData={this.state}
                    renderItem={this.renderItem_card.bind(this)}
                    numColumns={2}
                    removeClippedSubviews={false}
                    enableEmptySections={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView >
            <View style={styles.bottomLine}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center' }}>
                <TouchableOpacity style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}}
                        onPress={() =>this.state.selectedColid==""?
                        //  this.props.navigation.navigate('collectionDetail')
                        this.props.navigation.goBack()
                         :null}>
                        <Text style={[this.state.selectedColid==""?styles.textStyle:styles.inacitveStyle]}>Back</Text>

                    </TouchableOpacity>
                    <LinearGradient style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}} colors={this.state.next?['#24D4BC', '#27A291']:['#fff','#fff']} >
                    <TouchableOpacity 
                        onPress={() =>this.showModal()}>
                        <Text style={[this.state.next?styles.inacitveColor:styles.inacitveStyle]}>Delete</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            <Modal
                        animationType="slide"
                        transparent
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            console.log('Modal has been closed.');
                        }}>
                        <View style={{
                            left: 0, right: 0, bottom: 0, position: 'absolute',
                            height: '10%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'red',
                        }}>
                            <Text numberOfLines={2} style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Removed {this.state.selectedItemArray.length>1?"Pins":"Pin"} - {this.state.deletedName} </Text>


                            <TouchableOpacity style={{ marginTop: '2%', alignSelf: 'flex-end', marginRight: '2%' }}
                            onPress={()=>this.setState({undo:true})}
                            >
                                <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline' }}>Undo</Text>
                            </TouchableOpacity>


                        </View>
                    </Modal>
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
    color: 'black', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
},
inacitveStyle:{ 
    color: '#c2c2c2', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
},
inacitveColor:{ 
    color: '#fff', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
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
        removePinsPopup:()=>dispatch({type:'PINS_REMOVE'})

    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(RemovePins);
