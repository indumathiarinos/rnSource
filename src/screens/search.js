import React, { Component } from 'react'
import {
  View,AsyncStorage,SafeAreaView,Platform,ImageBackground,BackHandler, TextInput, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid
} from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/searchimg1.png';
import img2 from '../assets/img/searchimg2.png';
import img3 from '../assets/img/searchimg3.png';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalBox from 'react-native-modalbox';
import {Avatar,Divider} from 'react-native-elements';
import CardView from 'react-native-cardview';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import { connect } from "react-redux";
import {
  Container,
  Content,
  Footer,
  FooterTab} from "native-base";
console.disableYellowBox = true;

// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')

const height = Dimensions.get('window').height;

class Search extends Component {
  constructor() {
    super();
    this.state = {  
    list: [
      {
        id: 0,
        img: img1,
        title: "viewBook",
      },
      {
        id: 1,
        img: img2,
        title: "periodiViewBook",
      },
      {
        id: 2,
        img: img3,
        title: "viewBook",
      },
      {
        id: 3,
        img: img2,
        title: "viewBook",
      },
      {
        id: 4,
        img: img3,
        title: "viewBook",
      },
    ],
    showlikeImg: false,
    isOpen: false,
    isDisabled: false,
    swipeToClose: true,
    sliderValue: 0.3,
    expanded: false,
    expl:'',
    getuserid:'',
            boolean:false,
            visible:false,
            newbool:false,
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            loading:true,
            searchText:'',
            popupData:'',
            title:'',
            author:'',
            postImg:'',
            avatar:'',
            popTypeId:null,
            popPostId:null,
            reportModal:false,
            sortby:"DESC",
            explore_page:'0',
            loginPopup:false
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  this.arrayholder=[];
}
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid : value })).done();
  AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page : value })).done();
  AsyncStorage.setItem('searchFilter','DESC');
  console.log('user id in pagefeed page is ',this.state.getuserid);
  // {this.getData()}
  this.CheckConnectivity();
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  // BackHandler.exitApp();
  this.props.navigation.goBack();
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
CheckConnectivity1(){    
  NetInfo.fetch().then(state => {

    console.log("Connection type cheking", state.type);
    console.log("Is connected cheking?", state.isConnected);

    if(state.isConnected==true){
      {this.exploredataPopup();}
    }else{
      alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
    }
   
  });
}
getData=()=>{
  setTimeout(() => {
    {this.exploredata(this.state.getuserid)}
    {this.exploredataPopup()}
  //  {this.exploredataPopup()}
  }, 1000);
}
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
    this.props.navigation.navigate('mainpage')
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
    this.props.navigation.navigate('collection')

  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
    this.props.navigation.navigate('search')

  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
    {this.state.explore_page=='0'?
    this.props.navigation.openDrawer():
   this.logoutpress()
  }
}
  logoutpress=()=>{
    AsyncStorage.setItem('userid',JSON.stringify(""));
    AsyncStorage.setItem('typeid',JSON.stringify(""));
    AsyncStorage.setItem('profile_img',JSON.stringify(""));
    AsyncStorage.setItem('user_name',JSON.stringify(""));
    AsyncStorage.setItem('postid',JSON.stringify(""));
    AsyncStorage.setItem('collectionId',JSON.stringify(""));
    AsyncStorage.setItem('sectionId',JSON.stringify(""));
    AsyncStorage.setItem('usertype',JSON.stringify(""));
    AsyncStorage.setItem('bookmarkUserid',JSON.stringify(""));
    AsyncStorage.setItem('loginData', JSON.stringify(false));
    this.props.savelogout();
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('loginSignup');
  }
  alertPopup(){
    // this.setState({loginPopup:true})
    // setTimeout(() => {
    //     this.setState({loginPopup:false})
    // }, 5000);
    this.logoutpress();
}
  pressIcon = (item) => {
    let { expl } = this.state;
    expl = expl.map(e => {
      // if (item.Category_name === e.Category_name) {
        // item.like = !e.like;
        AsyncStorage.setItem("category_name",item.Category_name)
        return this.props.navigation.navigate('search_explore', {
          item: item});
        // }
     
      //     else{
      //   return e;
      // }
    });
  }
  toggle_reportModal=()=>{
    this.setState({newModalVisible:!this.state.newModalVisible})
  }
  exploredataPopup(){
    this.setState({loading:true})
    var json=JSON.stringify(
      {"SearchText":this.state.searchText,"SortBy":this.state.sortby}
      );
      fetch("http://162.250.120.20:444/Login/Search",
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
            this.setState({popupData: responseJson,loading:false})
            // console.log('profileData data is ',this.state.popupData)
            this.arrayholder=responseJson;
            // console.log('arrayl kdfkslaf ',this.arrayholder)
            // for(let i=0;i<responseJson.length;i++){
            //   if(responseJson[i].PostLinkTitle=='Cindrella'){
            //     this.setState({title:responseJson[i].PostLinkTitle,
            //       img:responseJson[i].PostLinkImage,
            //       author:responseJson[i].Post_author,
            //       popTypeId:responseJson[i].TypeID,
            //       popPostId:responseJson[i].Post_page_id
            //     })
            //     // console.log('postlinktitle is ',responseJson[i].PostLinkTitle)
            //   }
            // }
            // console.warn(responseJson)
            // console.warn("Notification")
            //alert(this.state.data.status)  
        })
        .catch((error) => {
            console.warn(error);
        });
  }
  exploredata(userid) {
    // var json = JSON.stringify({
    //     'UserId': userid,
    // });
    fetch("http://162.250.120.20:444/Login/Explore",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            // body: json
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(responseText);
            {this.exploredata_Pic(this.state.getuserid)}
            this.setState({ expl: responseJson,loading:false })
            console.warn(responseJson)
            //alert(this.state.data.status)
        })

        .catch((error) => {
            console.warn(error);
        });
}
exploredata_Pic(userid){
  // this.setState({loading:true})
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
          // this.setState({loading:false})
          console.warn(responseJson)
          // for (let i = 0; i <responseJson.length; i++) {
            // alert(this.state.bookdetail[0].Image)
             this.setState({ 
               avatar:responseJson[0].avatar,
            
              })
            // }
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
}
popupBookpage=(item)=>{
  AsyncStorage.setItem('typeid',JSON.stringify(item.TypeID));
  AsyncStorage.setItem('postid',JSON.stringify(item.Post_page_id));
  console.log('post id and type id in search popup ',item.TypeID,item.Post_page_id);
  AsyncStorage.setItem('searchText',"")

  this.refs.modal4.close();
  if (item.TypeID ==4) {
        return this.props.navigation.navigate('readingBook');
     // return this.pressIcon();
 } else if(item.TypeID==1){
           return this.props.navigation.navigate('viewBook');
 } else if(item.TypeID==2){
            return this.props.navigation.navigate('periodiViewBook');
 }else if(item.TypeID==3){
            return this.props.navigation.navigate('seriesViewBook');
 }

}
tags(name){
  let varcolordot = "";
  if(name==='Education'){
      varcolordot='#1C4A7E'
  }else if(name==='Illustration'){
      varcolordot='#c65135'
  }else if(name==='Fiction'){
      varcolordot='#741c7e'
  }else if(name==='Comics'){
      varcolordot="#1C4A7E"
  }
  return varcolordot;
}
  renderItem_card({ item }) {
    return (
    
      <View style={{ flex: 1,alignSelf:'center',margin:10}}>

        {/* <View style={{ width: 155 }}> */}
          {/* <Image
          
            source={item.img}
          ></Image> */}
           <TouchableOpacity 
      onPress={()=>this.pressIcon(item)}
      >

          {/* <CardView
             
                style={{ backgroundColor: this.tags(item.Category_name),padding:'2%',height:230,width:width-70}}
                cornerRadius={20}>
                     <View style={{flex:1,margin:10,marginBottom:0,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                     <Image
                    resizeMode="stretch"
                    style={{ width: width/4.5,borderTopLeftRadius:8,borderBottomLeftRadius:8, height:height/4.5, alignSelf: 'center' }} source={{ uri: item.Image1!=""?item.Image1:null}} />
                  <Image
                    resizeMode="stretch"
                    style={{ width: width/4.5, height:height/4.5,borderTopLeftRadius:8,borderBottomLeftRadius:8, alignSelf: 'center',paddingRight:40,marginLeft:-5 }} source={{ uri: item.Image2!=""?item.Image2:null }} />
                 <Image
                    resizeMode="stretch"
                    style={{ width: width/4.5, height:height/4.5,borderRadius:8, alignSelf: 'center',paddingRight:80,marginLeft:-5 }} source={{ uri: item.Image3!=""?item.Image3:null }} />
                 </View>
                 <Text style={{ marginBottom: 5,color:'#fff', fontSize: 16,fontFamily:'AzoSans-Medium',textAlign:'center',marginTop:10}}>
                    {item.Category_name}
                </Text>
               
            </CardView> */}
                <CardView
                                        // cardElevation={2}
                                        // cardMaxElevation={2}
                                        style={{ backgroundColor: this.tags(item.Category_name), padding: '2%', height: height/3.5,width:width/1.3 }}
                                        cornerRadius={20}>
                                        <View style={{ flex: 1, margin: 10, marginBottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: width / 4, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, height: height / 4.8, alignSelf: 'center' }} source={{ uri: item.Image1 != "" ? item.Image1 : null }} />
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: width / 4, height: height / 4.8, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, alignSelf: 'center', paddingRight: 40, marginLeft: -10 }} source={{ uri: item.Image2 != "" ? item.Image2 : null }} />
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: width / 4, height: height / 4.8, borderRadius: 8, alignSelf: 'center', paddingRight: 80, marginLeft: -10 }} source={{ uri: item.Image3 != "" ? item.Image3 : null }} />
                                        </View>
                                        <Text style={{ marginBottom: 5, color: '#fff', fontSize: 16, fontFamily: 'AzoSans-Medium', textAlign: 'center', marginTop: 10 }}>
                                            {item.Category_name}
                                        </Text>
                                    
                                    </CardView>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    )
  }
  searchfunc=()=>{
    {this.exploredataPopup()}
    this.setState({newbool:true})
     this.refs.modal4.open()
  }
  gotodetail(){
    AsyncStorage.setItem('searchText',"")
    AsyncStorage.setItem('searchFilter',"All")
    this.props.navigation.navigate('searchDetail')
    
  }
  SearchFilterFunction(text) {
    {this.exploredataPopup()}
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.PostLinkTitle ? item.PostLinkTitle.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      popupData:this.state.searchText==""?this.setState({popupData:[]}):newData,
      searchText: text,

    });
    {this.state.searchText==""?null:this.refs.modal4.open()}
    // console.log('profile data 1 value filtered ',this.state.popupData)
  }
  reportClk=()=>{
    this.setState({reportModal:false})
    this.props.navigation.navigate('report')
  }
  render() {

    return (
 
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff'}}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
          {/* <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center', elevation:3}}> */}
     <View style={styles.header}>
       <View>
          <TextInput style={styles.input} 
                placeholder="Search"
                // secureTextEntry={textState}
                placeholderTextColor={'#707070'}
                onChangeText={value => this.setState({searchText:value})}
                value={this.state.searchText}
                underlineColorAndroid="#707070"
                />
                {Platform.OS=='ios'?<View style={{width:width/1.6,height:1,backgroundColor:'#707070',marginBottom:'2%'}} />:null}
          </View>      
                <TouchableOpacity style={styles.touchableButton} 
                onPress={()=>{this.state.searchText!=""?this.SearchFilterFunction(this.state.searchText):
                this.gotodetail()
            }}>
                {/* <Image style={{alignSelf:'center',}}
                  source={require('../assets/img/searchicon.png')}
                  /> */}
                  <Icon
                  name={'search1'}
                  size={20}
                  color={'#707070'}
                  />
               </TouchableOpacity>

          </View>

    
          <ScrollView style={{marginBottom:'10%'}} >


            {/* <View style={styles.container}> */}
            {/* <View style={styles.backgroundContainer}>
              <Image source={require('../assets/img/eclipse.png')}
                resizeMode='cover'
                style={styles.backdrop}/>
            </View> */}
             <View style={styles.containerStyle} >
            <View 
            style={styles.sliderContainerStyle}
             />
          </View> 
          <View style={styles.backdrop}>
            {/* <View style={{ marginTop: '5%', flex:1 }}> */}
              <View style={{ flexDirection: 'row',width:width,marginTop:'5%',
              //  margin:'2%', 
               alignContent: 'center', justifyContent: 'center',}}>

                {/* <Image
                  style={{ 
                    // marginTop:'5%',
                    width:25,height:25 }}
                  source={require('../assets/img/white_search.png')}
                /> */}
                 <Icon
                 
                  name={'search1'}
                  size={30}
                  color={'#fff'}
                  />
                <Text style={{ 
                  // margin: '5%',
                  marginLeft:'3%',
                   color: '#fff',fontSize: 24, fontFamily: 'Montserrat-Bold' }}>Explore</Text>
              </View>
              {/* <FlatList
                data={this.state.list}
                navigation={() => this.order_nav1.bind(this)}
                extraData={this.state}
                renderItem={this.renderItem_card.bind(this)}
                numColumns={1}
                removeClippedSubviews={false}
                enableEmptySections={false}
                style={{ marginTop: '2%' }}
                keyExtractor={(item, index) => index.toString()}
              /> */}
                <FlatList
              data={this.state.expl}
            //   navigation={()=>this.order_nav1.bind(this)}
              extraData={this.state}
              renderItem={this.renderItem_card.bind(this)}
              numColumns={1}
              removeClippedSubviews={false}
              enableEmptySections={false}
              contentContainerStyle={{
                // padding:'2%',
                // paddingLeft:'5%',
                flex: 1,
                // marginBottom:'5%',
                marginTop:'3%',
                justifyContent:'center',
                // alignItems:'center'
                // marginTop:'5%',marginLeft:'5%'
            }}            
              keyExtractor={(item, index) => index.toString()}
            />
            {/* </View> */}
               </View>
          </ScrollView>
        
        <ModalBox
          style={{  alignItems: 'center',
          marginTop:'15%',
          
          height:this.state.searchText==""?0:"32%",
          width: width,}}
          position={'top'}
          ref={'modal4'}
          isDisabled={this.state.isDisabled}>
            <View style={{flex:1, height:this.state.searchText==""?0:"32%",
          width: width}}>
          <TouchableOpacity style={{backgroundColor:'#27A291',width:width,padding:'3%',alignSelf:'center',}}><Text style={{color:'white',textAlign:'center',fontFamily:'Montserrat-Bold',fontSize:16}}>Suggestions for '{this.state.searchText}'</Text></TouchableOpacity>
          <FlatList
            data={this.state.popupData}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=>(
              <ScrollView>
               {/* <View style={{alignItems:"center",flex:1,}}> */}
              <TouchableOpacity onPress={()=>this.popupBookpage(item)}>
              <View style={{ flexDirection: 'row',paddingLeft:'3%',paddingRight:'3%',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',width:width/1.5,marginTop:'3%' }}>
                    <Text numberOfLines={1} style={{fontSize:16,fontFamily:'AzoSans-Medium',paddingLeft:'2%'}}>
            {item.PostLinkTitle} </Text>
            <Text  numberOfLines={1} style={{fontSize:12,fontFamily:'AzoSans-Light',marginTop:10,color:'#707070',paddingLeft:'3%'}}>
            {item.Post_author}    
            {/* Packaging Design - Bite Me: Packaging Insults Chewers as They... Grab a Piece of Tooth-Shaped Gum */}
              </Text>
            </View>
            <ImageBackground imageStyle={{borderRadius:10}} source={{uri:item.PostLinkImage!=""?item.PostLinkImage:null}} 
            // style={{resizeMode:'cover',width:100,height:120,borderRadius:20,
            // // margin:'3%'
            // marginTop:'2%',marginBottom:'2%'
            // }}
            style={[item.TypeID==1?styles.pubImgStyle:styles.pageImgStyle,{borderColor:!item.Image?'#fff':null, marginTop:'2%',marginBottom:'2%'}]}
            
            >
            <TouchableOpacity style={{padding:'2%'}}
                   onPress={() => {this.state.explore_page=='0'?( this.setState({reportModal:true})&&
                    this.refs.modal4.close()):this.alertPopup()
                   }
                  }
                >
     <Image style={{alignSelf:'flex-end',marginRight:'5%',marginTop:'5%',}} source={require('../assets/img/3dots_white.png')}/>
     </TouchableOpacity>
        </ImageBackground>
        </View>
       </TouchableOpacity>
       </ScrollView>
      //  </View>
            )}
            />

       
        <Divider style={{borderWidth:0.2,width:width}} />
       {this.state.searchText==""?null: <TouchableOpacity style={{padding:'1%',}}    
        onPress={()=>{
          AsyncStorage.setItem('searchText',this.state.searchText)
          this.props.navigation.navigate('searchDetail')
        this.refs.modal4.close();
      }}>
          <View style={{flexDirection:'row',marginTop:'1%',marginBottom:'1%',justifyContent:'flex-end',alignItems:'center',alignContent:'flex-end',marginRight:'5%'}}>
          <Text style={{color:'#707070',marginRight:'2%',fontFamily:'AzoSans-Regular',fontSize:12}}>See All</Text>
            <Image style={{marginRight:'2%',}}  source={require('../assets/img/right_arrow.png')}/>
          </View>
        </TouchableOpacity>}
        </View>
        </ModalBox>
      
       <Modal1 isVisible={this.state.reportModal}
onBackdropPress={() =>     this.setState({reportModal:false})
}>
          <View style={{backgroundColor:'#fff',width:width/2,height:height/18,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={() => this.reportClk()} >

              <Text style={styles.modaltext}>Report</Text>
            </TouchableOpacity>
        {/* <Toast ref="toast"

          style={{ backgroundColor: '#707070', fontSize: 18, width: width - 100, alignItems: 'center', borderRadius: 15 }}
        /> */}
          </View>
        </Modal1>
       <Modal1 isVisible={this.state.loading}
         
         // onBackdropPress={() => this.setState({ loading: true })}
         >
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal1>
                 <Modal1
                    animationType={"slide"}
                    onBackdropPress={() => this.setState({ loginPopup: false})}
                    isVisible={this.state.loginPopup}>

                    <View 
                        style={{backgroundColor:'#fff', 
                        alignSelf:'center',
                        flex:  0.2,
                        width: width/1.2,}}
                        >
                            <Text style={{fontSize:17,margin:'5%',fontWeight:'500'}}>Please Login</Text>
                        </View>
                    </Modal1>
                    <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.tabsss}
            onPress={() => this.toggleTab1()}>
            <Image style={{ width: 25, height: 25 }} source={require('../assets/img/logo.png')} />
            {/* <Text>Home</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
            <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../assets/img/library.png')} />
            {/* <Text>Collection</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
            <Image style={{  }} source={require('../assets/img/green_search.png')} />
            {/* <Text>Search</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabsss, { width: 28, height: 28, borderRadius: 28 / 2, }]} onPress={() => this.toggleTab4()}>
            {/* <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} > */}
            {/* <TouchableOpacity onPress = {() =>navigation.openDrawer() }>  */}
            <View style={{flexDirection:'row'}}>
            <Image style={{ width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }} source={{ uri: this.state.explore_page == '0' ? this.state.avatar : 'http://pagevio.com/uploads/profile/noimage.jpg' }}></Image>
            <Image style={{top:'60%',right:'38%',width:15,height:15}} source={require('../assets/img/menuimg.png')}/>
            </View>
                      {/* <Text>Menu</Text> */}
            {/* </Drawer> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 2,
  },
  pubImgStyle:{ 
    // elevation:1,
    width: width/3.5,height:height/3.5,
    // width:100,height:160,
        borderRadius:15,
    
    // alignItems:'center',
    //  jsutifyContent: 'center'
     },
     pageImgStyle:{ 
      // elevation:1,
      width: width/3.5,height:height/7.5,
      // width:100,height:120,
      borderRadius:15
      // alignItems:'center',
      //  jsutifyContent: 'center'
       },
  sliderContainerStyle: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2.08),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    // elevation:1,
    backgroundColor:'#27A291',
    resizeMode:'cover'
    },
  backdrop: {
    flex: 1,
    marginTop: -180
},

  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  box2: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box3: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  text: {
    color: '#ffffff',
    fontSize: 80
  },
  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  tabsss:{
    alignItems:'center',justifyContent:'center'
  },
  input:{
    width:width/1.6,
    backgroundColor:"#fff",
    fontFamily:'AzoSans-Regular',
    fontSize:16,
    // padding:10,
    margin:5
  },
  header: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#fff',
    borderBottomColor: '#707070'
  },
  touchableButton: {
    position: 'absolute',
    right: '18%',
    height: 40,
    width: 35,
    padding: 2,
    alignItems:'center',
    justifyContent:'center'
  },
  textInputStyle: {
    width: width - 100,
    alignSelf:'center'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: '55%',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  bottomBar:{
    backgroundColor: '#fff', 
    alignItems: 'center',
    height:'6%',
    bottom:0,
    left:0,
    right:0,
    justifyContent:'space-around',
    flexDirection:'row',
    position:'absolute',
    elevation:8
},
  container: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
  },


})
function mapStateToProps(state){
  return{
  addCol:state.apiReducer.addCol,
  }
}


function mapDispatchToProps(dispatch){
  return{
      popupAddCol:()=>dispatch({type:'ADD_COL'}),
      collSecPopup:() =>dispatch({type:'COLLSEC_POPUP'}),
      savelogin: ()=> dispatch({type:'CHECKLOGIN'}),
      savelogout: ()=> dispatch({type:'CHECKLOGOUT'})
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Search);
