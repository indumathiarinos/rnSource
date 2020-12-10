import React, { Component } from 'react'
import { View, FlatList,SafeAreaView,
    AsyncStorage,Modal, LayoutAnimation,ImageBackground,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { FloatingAction } from "react-native-floating-action";
import LinearGradient from 'react-native-linear-gradient';
console.disableYellowBox = true;
import HTMLView from 'react-native-htmlview';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// let sourceCollId,sourceSecId;

class SectionEdit extends Component {
    constructor(props) {
        super(props);
      this.state = {  
        title:'Edit <Collection or Section Title>',
        actions: [
            {
                text: "Create Collection",
                icon: require("../assets/img/plus.png"),
                name: "createCollection",
                position: 5
            },
           
        ],
      
        collection: [],
        loading: true,
        getuserid:'',
        getuserid:'',
        next:false,
        selectedItemArray:[],
        sendingArray:[],
        expanded:false,
        sectionData:[],
        collSelect:false,
        secVisible:false,
        selectedCol:'',
        viewpage:0,
        sectionExpand:false,
        section:'',
        secCollid:'',
        checkable:false,
        selectedSec:'',
        txtClick:'',
        sectionCheck:false,
        getCollectionId:'',
        sourceCollId:'',
        sourceSecId:'',
        collSourceName:'',
        editPopupState:false,
        editpagetitle:'',
        undo:false

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
// collsectData(userid,collectionId) {
//     this.setState({loading:true})
//     var json = JSON.stringify({
//         'UserID': userid,
//         'CollectionID': collectionId,
//     });
//     fetch("http://162.250.120.20:444/Login/CollectionSectionDD",
//         {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'content-type': 'application/json'
//             },
//             body: json
//         }
//     )
//     .then((response) => response.json())
//     .then((responseJson) => {
//         //alert(responseText);
//         this.setState({ sectionData: responseJson, loading: false })
//         console.warn(responseJson)
//         console.warn("sectiondd")
//         //alert(this.state.data.status)  
//     })
//     .catch((error) => {
//         console.warn(error);
//     });
// }


// exploredata(userid) {
//     this.setState({loading:true})
//     var json = JSON.stringify({
//         'UserId': userid,
//     });
//     fetch("http://162.250.120.20:444/Login/Collection",
//         {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'content-type': 'application/json'
//             },
//             body: json
//         }
//     )
//         .then((response) => response.json())
//         .then((responseJson) => {
//             //alert(responseText);
//             responseJson = responseJson.map(item => {
//                 item.arrow = false,
//                   item.check = false,
//                   isSelect=false;
//                 return item;
//               });
//             this.setState({ collection: responseJson, loading: false })
//             console.warn(responseJson)
//             console.warn("collection")
//             //alert(this.state.data.status)  
//         })
//         .catch((error) => {
//             console.warn(error);
//         });
// }

componentDidMount() {
    // sourceCollId = this.props.navigation.state.params.collId
    // ? this.props.navigation.state.params.collId
    // : null;
    // sourceSecId = this.props.navigation.state.params.secId
    // ? this.props.navigation.state.params.secId
    // : null;
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
    // AsyncStorage.getItem('sDetail_collId').then((val) => this.setState({ sourceCollId: val })).done();
    // AsyncStorage.getItem('sDetail_secId').then((val) => this.setState({ sourceSecId: val })).done();
    AsyncStorage.getItem('sectionId').then(val =>this.setState({ sourceSecId: val })).done;
    AsyncStorage.getItem('newColl_Id').then(val =>this.setState({ sourceCollId: val })).done;
    // AsyncStorage.getItem('collectionId').then((val) => this.setState({ getCollectionId: val })).done();
    console.log('collection userid is ',this.state.getuserid,this.state.getCollectionId)
    AsyncStorage.getItem('edit_title').then((value) => this.setState({ editpagetitle : value })).done();

    this.CheckConnectivity();

    this.focusListener = this.props.navigation.addListener('willFocus', () => {
        
        this.CheckConnectivity();
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
// componentDidUpdate(){
//     // {this.getData()}
//     console.log('componentdidupdate is called')
// }
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
handleBackButtonClick() {
    this.backpress()
    return true;
}
getData() {
    setTimeout(() => {
        AsyncStorage.getItem('bookmarkUserid').then((val)=>{console.log('value is ',val)}).done();
        console.log('userid is ',this.state.getuserid);
            {this.collData(this.state.getuserid,"","")};

        // { this.exploredata(this.state.getuserid) }
        
            }, 2000)
}

componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener.remove()
  }
  
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    {this.collData(this.state.getuserid,"","")};
}

   listpress(id) {
    // let selected;
     let collection=[...this.state.collection];
     for(let data of this.state.collection){
       if(data.collectionsID==id){
            this.setState({selectedCol:id});
       }
       break;
     }
     this.setState({collection});
   }
   arrowPress(id){
    let collection=[...this.state.collection];
    for(let data of this.state.collection){
      if(data.collectionsID==id){
        this.setState({selectedCol:id});
        {this.changeLayout()}
      }
      break;
    }
    this.setState({collection});
   }
  renderItem_card1({ item }) {
    // const value = item;
    return (
        <View style={{flexDirection:'column'}}>
        <View style={[styles.containerList,
        item.collectionsID==this.state.selectedCol?styles.activeList:styles.inacitveList
        ]}>
            <TouchableOpacity
            style={styles.styleList}
                onPress={() => 
                    this.listpress(item.collectionsID)}
            >
              {item.collectionsID==this.state.selectedCol? <Image source={require('../assets/img/check.png')}/>:<Image source={require('../assets/img/uncheck.png')}/>}
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.styleList}
                onPress={() => this.listpress(item.collectionsID)}
            >
            <View style={{flexDirection:'row',justifyContent:'space-around',width:width/1.3}}>
            <Text style={{textAlign:'left',width:width/2}}>{item.Title}</Text>
         
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.styleList}
                // onPress={() => this.arrowPress(item.collectionsID)}
            >
            <Image style={{alignSelf:'flex-end',marginRight:10}} source={item.collectionsID!=this.state.selectedCol?require('../assets/img/right-arrow.png'):require('../assets/img/down-arrow1.png')}/>
           </TouchableOpacity>
            {/* </TouchableOpacity> */}
        
            </View>
            <View>
            {this.state.viewpage==1? 
            <FlatList
                data={this.state.sectionData}
                keyExtractor={(item,index)=>index.toString()}
                style={{flex:1}}
                renderItem={this.sectionItems(item)}
                />
                :null}

            </View>

            {/* {this.state.selectedCol==item.collectionsID && this.state.expanded?
              {this.listvalues()}
                    :null
            } */}
            </View>
    )
}
listvalues() {
    return this.state.sectionData.map(function(news, i){
      return(
        <View key={i}>
          <Text>{news.title}</Text>
          <View>
            <Text>{news.title}</Text>
          </View>
        </View>
      );
    });
  }

sectionItems({ item }) {
    // const value = item;
    return (
        <View  style={{backgroundColor:'pink',height:100, width:width/1.5}}>
            <Text>{item.Title}</Text>
         
            </View>
    )
}

backpress = () => {
    //    console.log('before set',this.props.nav)
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs')
    this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
}
bookmarkPress = () => {
    AsyncStorage.setItem('bookmark', JSON.stringify(true));
    this.props.navigation.navigate('bookmarks')
}
readlaterPress = () => {
    AsyncStorage.setItem('readlater', JSON.stringify(true));
    this.props.navigation.navigate('readlater')
}
secData(userid,collid) {
    // this.setState({loading:true})
    var json = JSON.stringify({
        "CollectionID":collid,
        "User_ID":userid,
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
        //alert(responseText);
        this.setState({ section: responseJson, loading: false,secCollid:responseJson[0].CollectionsID })
        
        console.warn(responseJson)
        console.warn("section")
        //alert(this.state.data.status)  
    })
    .catch((error) => {
        console.warn(error);
    });
}
collData(userid,colid,secid) {
// this.setState({loading:true})
var json = JSON.stringify({
    'UserID': userid,
    "CollectionID":colid,
    "SectionID":""
});
fetch("http://162.250.120.20:444/Login/CollectionSectionDD",
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
    this.setState({ collection: responseJson, loading: false })
    console.warn(responseJson)
    console.warn("collection")
    //alert(this.state.data.status)  
})
.catch((error) => {
    console.warn(error);
});
}
showModal1 = () => {
    console.log('enters')
    this.setState({
      editPopupState: true,
      loading:false
    });
    setTimeout(() => {
      // this.props.changeRemove()
      this.setState({
        editPopupState: false,
      })
      if(this.state.undo==false){
        {this.editClk()}
      }else{
        this.setState({undo:false})
      }
      this.props.navigation.goBack();


    //   this.props.secEditPopupFunc();
      // AsyncStorage.setItem('sectionEdit_popup',JSON.stringify(false))
      //   this.props.changeRemove();
    }, 3000);
    console.log('modal state is ', this.state.popupModal)
  }
editClk() {
    this.setState({loading:true})
    var json = JSON.stringify({
        "From_C_ID":this.state.sourceCollId,
        "To_C_ID":this.state.selectedCol,
        "From_S_ID":this.state.sourceSecId,
        "Action_for":"S",
        "userid":this.state.getuserid
    });
    console.log('edit clk json',json)
    fetch("http://162.250.120.20:444/Login/CollectionSectionCopy",
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
        this.setState({ loading: false })
        console.warn(responseJson);
        // this.props.navigation.navigate('sectionDetail')

        // this.props.secEditPopupFunc();
        // AsyncStorage.setItem('secEdit_Name',JSON.stringify(this.state.collSourceName))
        // AsyncStorage.setItem('sectionEditPopup',true)
        //alert(this.state.data.status)  
    })
    .catch((error) => {
        console.warn(error);
    });
    }
    collectionBook=(value,collid)=>{
        this.setState({collectionModal:false,txtClick:collid,selectedCol:collid,next:true,secCollid:null,collSourceName:value});
        AsyncStorage.setItem('collectionId',JSON.stringify(Number(this.state.selectedCol)));
        AsyncStorage.setItem('secEdit_Name',JSON.stringify(this.state.collSourceName))
        console.log('collection book value is ',value)
       
        }
        gotoCreateColl=()=>{
            AsyncStorage.setItem('EditCreateColl',JSON.stringify(true));
            AsyncStorage.setItem('secEdit_Name',JSON.stringify(this.state.collSourceName))
            this.props.navigation.navigate('createCollection');
        }
        gotoCreateSec=()=>{
            AsyncStorage.setItem('EditCreateSec',JSON.stringify(true));
            AsyncStorage.setItem('collectionId',JSON.stringify(Number(this.state.selectedCol)));
            // this.props.navigation.navigate('editCreateSection');
            this.props.navigation.navigate('createSection');
            }
        sectionClick = (collid,value) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ sectionExpand: !this.state.sectionExpand,next:!this.state.next,collSourceName:value,
                selectedCol:collid
            });
            this.secData(this.state.getuserid,collid)
            console.log('section data collection ',this.state.section);
        }
        secBook=(value,collid,secid,item)=>{
            this.setState({collectionModal:false,next:true,selectedSec:secid});
            console.log('section book value is ',value,item, collid,secid,)
        
            }
            viewCollection({ item }) {
        
            }
            gotoSectionDetail(){
               this.editClk()
            }
        render() {
            // AsyncStorage.getItem('loading').then((value) => {value==true?
            //     console.log('value of loading state is ',value):null}).done();
                
                // this.exploredata(this.state.getuserid):null}).done();
    
            // {this.exploredata(this.state.getuserid)}
            // console.log('in collection merge popup ',this.props.merge);
          
            return (
                
                <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
                   <View style={{height:'8%',backgroundColor:'#27A291',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:20,textAlign:'center'}}>{this.state.title}</Text>
                    </View>
                    <ScrollView style={{paddingBottom:'10%',marginBottom:100}}>
                    <View><Text style={{fontSize:24,color:'#000',margin:'2%',padding:'1%'}}>Collection</Text></View>
                        <View style={{width:width-20,height:1,backgroundColor:'#24D4BC',alignSelf:'center',marginLeft:'2%',marginRight:'2%',marginBottom:'2%'}}/>
                        <ScrollView>
                       <FlatList
                            data={this.state.collection}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item})=>(
                                <View>
                                <TouchableOpacity
                                   style={{backgroundColor:'#fff',width:width,}}
                                     onPress={() => this.collectionBook(item.title,item.id,)}>
                                     <View 
                                    //  style={{
                                    //    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                    //  }}
                                     style={[styles.containerList,
                                        item.id==this.state.selectedCol||this.state.txtClick==item.id || item.id==this.state.secCollid ?styles.activeList:styles.inacitveList
    
                                        // item.id==this.state.selectedCol||this.state.txtClick==item.id || item.id==this.state.secCollid ?styles.activeList:styles.inacitveList
                                        ]}
                                     >
                                     <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.setState({selectedCol:item.id,secCollid:null,})}}>      
                                       <Image source={item.id==this.state.selectedCol||item.id==this.state.secCollid? require('../assets/img/check.png'):require('../assets/img/uncheck.png')}/>
                                       </TouchableOpacity>
                                       <Text style={[{ fontSize: 17, color: '#707070', textAlign: 'center', width: width/1.5 },{color:  item.id==this.state.selectedCol || item.id==this.state.secCollid ?"#fff":"#707070"}]}>{item.title}</Text>
    
                                       {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                           <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1 ?this.sectionClick(item.id,item.title):null}}>
                                   {/* <Image style={{ alignSelf: 'center',marginLeft:'2%',width:20,height:20,}} source={item.SectionStatus==0 || item.id==this.state.selectedCol?require('../assets/img/down-arrow1.png'):require('../assets/img/right-arrow1.png')} /> */}
                                   <Image style={{ alignSelf: 'center',marginLeft:'2%',width:20,height:20,}} source={item.SectionStatus==0?null:require('../assets/img/right-arrow1.png')} />
                           </TouchableOpacity> 
                           </View>
                           </TouchableOpacity>
                           {
                           this.state.sectionExpand && 
                           item.id==this.state.secCollid
                        //    item.SectionStatus==1
                           ?
                        <FlatList
                        data={this.state.section}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={({item})=>(
                            <View>
                             {item.SectionID!=0? 
                             <View>
                             <TouchableOpacity
                               style={{backgroundColor:'#fff',width:width,}}
                                 onPress={() => this.secBook(item.Title,item.CollectionsID,item.SectionID,item)}
                                 >
                                 <View 
                                //  style={{
                                //        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                //      }}
                                style={[styles.containerList,
                                    item.SectionID==this.state.selectedSec  ?styles.activeList:styles.inacitveList
                                    ]}
                                     >
                                       <TouchableOpacity 
                                       style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>      
                                       <Image source={ require('../assets/img/check.png')}/>
                                       </TouchableOpacity>
                                       <TouchableOpacity onPress={()=>this.setState({sectionCheck:!this.state.sectionCheck,next:true,selectedSec:item.SectionID})} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} >      
                                       <Image source={item.SectionID==this.state.selectedSec? require('../assets/img/check.png'):require('../assets/img/uncheck.png')}/>
                                       </TouchableOpacity>
                                       <Text style={[{ fontSize: 17, color: '#707070', textAlign: 'center', width: width/1.5 },{color:  item.SectionID==this.state.selectedSec ?"#fff":"#707070"}]}>{item.Title}</Text>
    
                                       {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                         
                           </View>
                       </TouchableOpacity>
                               </View>
                               :null}
                               </View> )}/>:null}
                                
                                   {/* <TouchableOpacity
                                   style={{backgroundColor:'#f0f0f0',width:300,}}
                                     onPress={() => this.collectionBook("Cats in the Wild")}>
                                     <View style={{
                                       flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                     }}>
                                       <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 250 }}>Cats in the Wild</Text>
                 
                                       <Image style={{ alignSelf: 'center', marginLeft: '-5%' }} source={require('../assets/img/not.png')} />
                                     </View>
                                   </TouchableOpacity>
                 
                                   <Divider style={{ backgroundColor: '#707070',borderWidth:0.3 }} /> */}
                 
                         </View>
                            )}/>
                   </ScrollView>
    {/* 
                        <FlatList
                            data={this.state.collection}
                            extraData={this.state}
                            renderItem={this.viewCollection.bind(this)}
                            removeClippedSubviews={false}
                            enableEmptySections={false}
                            contentContainerStyle={{
                                padding: '3%',
    
                                flex: 1,
    
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                             
                    
                    </ScrollView >
                  {this.state.secCollid==""?
                  <View style={{position:'absolute',bottom:'10%',right:'5%'}}>
                  <TouchableOpacity onPress={()=>this.gotoCreateColl()}>
                  <View style={{width:width/2-30,borderWidth:1,borderColor:'#27A291',backgroundColor:'#fff',height:35,alignItems:'center', flexDirection:'row',justifyContent:'space-between',borderRadius:18,alignSelf:'flex-end',}}>
                                <Text style={{paddingLeft:10}}>Create Collection</Text>
                                    <Image source={require('../assets/img/plus_white.png')} style={{width:32,height:32,borderRadius:32/2,backgroundColor:'#27A291'}}/>
                                </View>
                                </TouchableOpacity>
                                </View>:
                    <View style={{height:40,alignItems:'center', flexDirection:'row',justifyContent:'space-around',bottom:'10%',position:'absolute',left:0,right:0}}>
                                  <TouchableOpacity onPress={this.gotoCreateColl.bind(this)}>
                    <View style={{width:width/2-30,borderWidth:1,borderColor:'#27A291',backgroundColor:'#fff',height:35,alignItems:'center', flexDirection:'row',justifyContent:'space-between',borderRadius:18}}>
                                    <Text style={{paddingLeft:10}}>Create Collection</Text>
                                    <Image source={require('../assets/img/plus_white.png')} style={{width:32,height:32,borderRadius:32/2,backgroundColor:'#27A291'}}/>
    
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.gotoCreateSec()}>
                                <View style={{width:width/2-30,borderWidth:1,borderColor:'#27A291',backgroundColor:'#fff',height:35,alignItems:'center', flexDirection:'row',justifyContent:'space-between',borderRadius:18}}>
                                <Text style={{paddingLeft:10}}>Create Section</Text>
                                    <Image source={require('../assets/img/plus_white.png')} style={{width:32,height:32,borderRadius:32/2,backgroundColor:'#27A291'}}/>
                                </View>
                                </TouchableOpacity>
                                </View>
                    }
                         {/* <FloatingAction
                           style={{color:'#24D4BC'}}
                           position={'right'}
                           distanceToEdge={45}
                            ref={(ref) => { this.floatingAction = ref; }}
                            actions={this.state.actions}
                            color={'#24D4BC'}
                            onPressItem={name => {
                                    this.props.navigation.navigate(name)
                                console.log(`selected button: ${name}`);
                            }}
                        /> */}
                         <Modal1 isVisible={this.state.loading}  >
                                <Image source={require('../assets/gif/logo.gif')} style={{
                                    alignSelf: 'center',
                                    width: 140,
                                    height: 140
                                }} />
                            </Modal1>
                            
                      <View style={styles.bottomLine}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center' }}>
                            <TouchableOpacity style={{backgroundColor:'#fff',width:width/3.5,padding:'1%',borderRadius:25}}
                                onPress={() => this.props.navigation.goBack()}>
                                <Text style={[!this.state.next?styles.textStyle:styles.inacitveStyle]}>Back</Text>
                            </TouchableOpacity>
                            <LinearGradient style={{backgroundColor:'#fff',width:width/3.5,padding:'1%',borderRadius:15}} colors={this.state.next?['#24D4BC', '#27A291']:['#fff','#fff']} >
                            <TouchableOpacity 
                                onPress={() =>this.state.next? this.showModal1():console.log('value is ',value,'value true or false',)}>
                                <Text style={[this.state.next?styles.inacitveColor:styles.inacitveStyle]}>Edit</Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                    <Modal
          animationType="slide"
          transparent
          visible={this.state.editPopupState}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
              <View style={{
          left:0,right:0,bottom:0,position:'absolute',   
          height:'10%',
          backgroundColor: '#27A291',
          flexDirection:'row',
          width:width,
          
          padding:'1%',
         }}>
           <View style={{flexDirection:'row',width:'85%',margin:'1%',alignSelf:'center',  alignItems: 'center',
          justifyContent:'center',}}>
           <Text  style={{fontSize: 17,textAlign:'center', color: 'white',alignSelf:'center',marginLeft:'2%'}}>Edited - </Text>
          <Text numberOfLines={2} style={{ fontSize: 17,textAlign:'left', color: '#fff',width:Number(this.state.editpagetitle).length!=null && this.state.editpagetitle.length<10?width/8:width/4.5,textAlign:'center'}}> 
          {this.state.editpagetitle}
          </Text>
          <Text style={{color:'#fff',fontSize:17}}> to </Text>
          <Text style={{textDecorationLine:'underline',color:'#fff',fontSize:17}}>
            {this.state.collSourceName}
            {/* Sample Collection1 */}
            </Text>
           </View>
           
          <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'2%',}} onPress={()=>this.setState({undo:true})}>
          <Text style={{fontSize: 16,color:'white',textDecorationLine:'underline',}}>Undo</Text>
          </TouchableOpacity>
       </View>
        </Modal>
                </SafeAreaView>
            )
        }
    
    }
    const styles = StyleSheet.create({
        bottomBar:{
            backgroundColor: '#fff', 
            alignItems: 'center',
            bottom:0,
            left:0,
            right:0,
            justifyContent:'space-around',
            flexDirection:'row',
            position:'absolute'
        },
        tabsss:{
            margin:'2%'
        },
        TouchableOpacityStyle: {
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 50,
        },
    
        FloatingButtonStyle: {
            resizeMode: 'contain',
            width: 50,
            height: 50,
            //backgroundColor:'black'
        },
        staticheader: {
            // paddingRight:'2%',
            flexDirection: 'row',
            // justifyContent: 'center', 
            alignItems: 'center',
            height: '8%',
            backgroundColor: '#ffff',
            elevation: 1,
            borderBottomColor:'#707070'
    
    
        },
        styleList:{
            // flex:1,
            flexDirection:'row',alignItems:'center',justifyContent:'space-between'
        },
        containerList:{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
        },
        activeList:{
            // flex:1,
            backgroundColor: '#27A291',
            },
        inactiveList:{
            // flex:1,
            backgroundColor: '#CCCCCC',
          
        },
        textStyle:{ 
            color: 'black', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
        },
        inacitveStyle:{ 
            color: '#c2c2c2', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
        },
        inacitveColor:{ 
            color: '#fff', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
        },
      
        activeText: {
            padding: '5%',
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold'
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
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        image: {
            flex: 1,
        },
        bottomLine: {
            height: '6%',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: '#00000029'
    
        },
    })
    function mapStateToProps(state) {
        return {
          nav: state.apiReducer.nav,
          secEditPoup:state.apiReducer.secEditPopup
        }
      }
      
      
function mapDispatchToProps(dispatch) {
    return {
        changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
        changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
        secEditPopupFunc:()=>dispatch({type:'SEC_EDIT_POPUP'})

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionEdit);