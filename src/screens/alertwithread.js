
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
      Dimensions,
  BackHandler,
  SafeAreaView,
  AsyncStorage,
  ImageBackground,
  ProgressViewIOS,
  Modal
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import Modal1 from 'react-native-modal';
import { Avatar, Divider } from 'react-native-elements';
import { connect } from "react-redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class PreView extends Component {
  constructor(props){
    super(props);
    this.state={
      showBar:false,
      showlikeImg:false,
      collectionPopup:false,
      collectionModal:false,
      gettypeid:'',
      getpostid:'',
      collection:'',
      section:'',
      expanded: false,
      getuserid: '',
      readlaterPopup: false,
      exists: false,
      shareModal: false,
      getsecColName: '',
      sectionExpand: false,
      secCollid: '',

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid: value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid: value })).done();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.backpress();
    return true;
  } 
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    { this.collData(this.state.getuserid) };

  }
  collectionAdd(colid, secid, postid, pageid, userid, type, status) {
    var json = JSON.stringify(
      {
        "collectionid": colid,
        "sectionid": secid,
        "postid": postid,
        "pageid": pageid,
        "userid": userid,
        "Type": type,
        "Status": status
      }

    )
    console.log('json post add ', json)
    fetch("http://162.250.120.20:444/Login/CollectionPostAdd",
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
        console.warn(responseJson)
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  secData(userid, collid) {
    // this.setState({loading:true})
    var json = JSON.stringify({
      "CollectionID": collid,
      "User_ID": userid,
      "SortBy": "DESC"
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
        this.setState({ section: responseJson })
        const filteredList = this.state.section.filter((item) => item.SectionID !== 0);
        this.setState({ section: filteredList, secCollid: collid })

        console.warn(responseJson)
        console.warn("section")
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  collData(userid, colid, secid) {
    // this.setState({loading:true})
    var json = JSON.stringify({
      'UserID': userid,
      "CollectionID": colid,
      "SectionID": ""
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
        this.setState({ collection: responseJson, })
        console.warn(responseJson)
        console.warn("collection")
        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  collectionBook = (value, collid) => {
    this.setState({ collectionModal: false, expanded: false, sectionExpand: false });
    this.changeLayout();
    console.log('collection book value is ', value)
    { this.collectionAdd(collid, "", this.state.getpostid, "", this.state.getuserid, this.state.gettypeid, "") }
    // AsyncStorage.setItem('3dots', JSON.stringify(1));
    this.props.collSecPopup();
    this.setState({ popup_title: value, getsecColName: "Collection", getColId: collid })
    this.showModal();

  }
  sectionClick = (collid) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ sectionExpand: !this.state.sectionExpand, getColId: collid });
    this.secData(this.state.getuserid, collid)
    console.log('section data collection ', this.state.section);
  }
  secBook = (value, colid, secid, item) => {
    this.setState({ collectionModal: false, getColId: colid, expanded: false, sectionExpand: false });
    this.changeLayout();
    console.log('collection book value is ', value)
    { this.collectionAdd(colid, secid, this.state.getpostid, "", this.state.getuserid, this.state.gettypeid, "") }
    // AsyncStorage.setItem('3dots', JSON.stringify(1));
    this.props.collSecPopup();
    this.setState({ popup_title: value, getsecColName: "Section", getSecId: secid })
    this.showModal();

  }
  gotoCollSec() {
    if (this.state.getsecColName == "Collection") {
      // alert('collection popup')
      this.props.navigation.navigate('collectionDetail', { 'collId': this.state.getColId })
      console.log('col id ', this.state.getColId)
    } else {
      AsyncStorage.setItem('sectionId', JSON.stringify(Number(this.state.getSecId)));
      AsyncStorage.setItem('newColl_Id', JSON.stringify(Number(this.state.getColId)));
      this.props.navigation.navigate('sectionDetail');
      // , {
      //   'collId': this.state.getColId,
      //   'secId':this.state.getSecId
      // });        
      console.log('col id ', this.state.getColId)
      console.log('sec id ', this.state.getSecId)
    }
  }
  backpress=()=>{
      //  this.props.changeN0avNews();
      //  this.props.navigation.navigate('viewBook',{item:'1'})
      this.props.navigation.goBack();
   }
   imgPress=()=>{
    this.props.navigation.navigate('socialmedia')
  }
  render() {
   let value = this.props.navigation.state.params.name
    ? this.props.navigation.state.params.name
    : false;
    let title=this.props.navigation.state.params.title?this.props.navigation.state.params.title:null
    console.log('img data is ',value);

    // const value = this.props.navigation.getParam('photo');
    return (
     
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#000',
        alignContent: 'center', justifyContent: 'center'
      }}
      >
         <TouchableOpacity style={{position:'absolute',height:"8%",top:0,left:0,right:0}} onPress={()=>this.setState({showBar:!this.state.showBar})}/>
       {!this.state.showBar?null:
        <View style={{flexDirection:'row',position:'absolute',height:"8%",top:0,left:0,right:0,backgroundColor:'gray'}}>
          <Text style={{color:'#fff',marginLeft:'2%',alignSelf:'center',fontSize:17,textAlign:'center',width:width/1.1,}}>{title}</Text>
         <TouchableOpacity style={{marginRight:'2%',alignItems:'center',justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('viewBook')}>
          <Image source={require('../assets/img/close.png')}/>
          </TouchableOpacity>
        </View>}
        <Image 
        style={{ width: '100%', height: '80%', alignSelf: 'center' }}
          source={{uri:value}}>
        </Image>
        <TouchableOpacity style={{position:'absolute',height:"8%",bottom: 0,left:0,right:0}} onPress={()=>this.setState({showBar:!this.state.showBar})}/>

        {!this.state.showBar?null:
         <View style={styles.bottomBar}>
         <TouchableOpacity
           style={{ padding: '1%' }}
           onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
         >
           <Image
             source={!this.state.showlikeImg?require('../assets/img/unlike.png'):require('../assets/img/like.png')}
           />
         </TouchableOpacity>
         <TouchableOpacity
           style={{ padding: '1%' }}
           onPress={() => this.props.navigation.navigate('comments')}
         >
           <Image
             source={require('../assets/img/comment1.png')} />
         </TouchableOpacity>
         <TouchableOpacity
           style={{ padding: '1%' }}
          onPress={()=>this.setState({collectionModal:true})}
         >
           <Image source={require('../assets/img/plus1.png')} />
         </TouchableOpacity>
         <TouchableOpacity
           style={{ padding: '1%' }}

           onPress={() => this.refs.modal6.open()}
         >

           <Image source={require('../assets/img/share.png')} />
         </TouchableOpacity>
       </View>
       }
        <ModalBox 
              style={{  alignItems: 'center',
              flex:0.45,
              borderRadius:20,
              // flex:!this.state.expanded?0.4:0.5,
              width: 300,}}
             position={'center'}
             ref={'modal6'}
             isDisabled={this.state.isDisabled}>
          <View style={{ flex: 0.6,backgroundColor:'#fff',borderRadius:30,margin:'8%' }}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:20,margin:'5%',textAlign:'center'}}>Share Via</Text>
              <View style={{flexDirection:'column',justifyContent:'center',alignSelf:'center'}}>
                 <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
      
       <Image source={require('../assets/img/fb2.png')}/>
         <Text style={{margin:'2%'}}>Facebook</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/twitter.png')}/>
         <Text style={{margin:'2%'}}>Twitter</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center', }}>
       <Image source={require('../assets/img/insta.png')}/>
         <Text style={{margin:'2%'}}>Instagram</Text>
       </View>

       </TouchableOpacity>
       </View>
       <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/pinterest.png')}/>
         <Text style={{margin:'2%'}}>Pinterest</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/tumblr.png')}/>
         <Text style={{margin:'2%'}}>Tumblr</Text>
       </View>

       </TouchableOpacity>
      
       </View>
   
   </View>
               
            </View>
           </View>
        </ModalBox>
        <Modal1 isVisible={this.state.collectionModal}
          onBackdropPress={() => this.setState({ collectionModal: false, expanded: false, sectionExpand: false })}>
          <View
            style={{
              backgroundColor: '#fff', alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              flex: !this.state.expanded ? 0.3 : 0.4,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 5,
              borderBottomEndRadius: 5,
              width: 300,
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: 200, height: 30, }}
              onPress={() => {
                this.props.navigation.navigate('createCollection')
                this.setState({ collectionModal: false })
              }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200, height: 30,
                justifyContent: 'center', alignSelf: 'center'
              }}>
                  <Image  source={require('../assets/img/createCol.png')} />
                <Text style={{ fontSize: 17, color: '#27A291', marginLeft: '5%', width: width / 2.5, }}>Create Collection</Text>

              </View>
            </TouchableOpacity>

            <Divider style={{ backgroundColor: '#707070', marginTop: '5%', borderWidth: 0.3, width: 300 }} />
            {!this.state.expanded ? (
              <TouchableOpacity
                onPress={this.changeLayout}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '4%',
                  width: 300,
                  justifyContent: 'space-between',
                }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                    }}
                  >
                  <Image  source={require('../assets/img/colliconnew1.png')} />
                      <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 2.9  }}>Collections</Text>
                  </View>

                  <Image style={{ alignSelf: 'center', }} source={require('../assets/img/down_arrow.png')} />
                </View>
              </TouchableOpacity>
            ) : (
                <View style={{ height: !this.state.expanded ? 50 : 145, }}>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '4%',
                    backgroundColor: '#27A291',
                    width: 300,
                    justifyContent: 'space-between',
                  }}>
                    <View style={{
                      flexDirection: 'row', width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                    }}>
                    <Image  source={require('../assets/img/colliconnew1.png')} />
                      <Text style={{ fontSize: 17, color: '#fff', marginLeft: '5%', width: width / 2.9  }}>Collections</Text>
                    </View>
                    <TouchableOpacity
                      // style={{ marginLeft: '-15%', }}
                      onPress={this.changeLayout}>
                      <Image style={{ alignSelf: 'center', }} source={require('../assets/img/up_arrow_white.png')} />
                    </TouchableOpacity>
                  </View>
                  <ScrollView persistentScrollbar={this.state.collection.length > 2 ? true : false}>
                    <FlatList
                      data={this.state.collection}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <View>
                          <TouchableOpacity
                            style={{ backgroundColor: '#f0f0f0', width: 300, }}
                            onPress={() => this.collectionBook(item.title, item.id)}>
                            <View style={{
                              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                            }}>
                              <Text numberOfLines={1} style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.title}</Text>
                              <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy == 'Public' ? require('../assets/img/worldwide.png') : require('../assets/img/not.png')} />
                              <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => { item.SectionStatus == 1 ? this.sectionClick(item.id) : null }}>
                                <Image style={{ alignSelf: 'center', marginLeft: '2%', }} source={item.SectionStatus == 0 ? null : require('../assets/img/dropdown.png')} />
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                          <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                          {this.state.sectionExpand && item.id == this.state.secCollid
                            //  item.id==this.state.secCollid
                            //    item.SectionStatus==1
                            ?
                            <FlatList
                              data={this.state.section}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({ item }) => (
                                <View>
                                  {item.SectionID != 0 ?
                                    <View>
                                      <TouchableOpacity
                                        style={{ backgroundColor: '#f0f0f0', width: 300, }}
                                        onPress={() => this.secBook(item.Title, item.CollectionsID, item.SectionID, item)}
                                      >
                                        <View style={{
                                          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                        }}>
                                          <Text numberOfLines={1} style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.Title}</Text>
                                          {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                                          {/* <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                             <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                     </TouchableOpacity>  */}
                                        </View>
                                      </TouchableOpacity>
                                      <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                                    </View>
                                    : null}
                                </View>)} /> : null}

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
                      )} />
                  </ScrollView>
                </View>
              )}

            <TouchableOpacity
              onPress={() => this.readlater()}>

              <View style={{
                flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                justifyContent: 'center', alignSelf: 'center'
              }}>
                  <Image source={require('../assets/img/readlaternew1.png')} />
                <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 2.6 }}>Read Later</Text>
                <Divider style={{ backgroundColor: '#707070' }} />

              </View>
            </TouchableOpacity>

          </View>
        </Modal1>
      </SafeAreaView>
    );
  }
}
const styles=StyleSheet.create({
  bottomBar: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: '3%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
})
function mapStateToProps(state) {
  return {
    addCol: state.apiReducer.addCol,
    collSec: state.apiReducer.collSec

  }
}


function mapDispatchToProps(dispatch) {
  return {
  
    popupAddCol: () => dispatch({ type: 'ADD_COL' }),
    collSecPopup:() =>dispatch({type:'COLLSEC_POPUP'}),
    savelogin: ()=> dispatch({type:'CHECKLOGIN'}),
    savelogout: ()=> dispatch({type:'CHECKLOGOUT'})

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PreView);