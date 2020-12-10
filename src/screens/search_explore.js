import React, { Component,createRef } from 'react'
import {
    View,SafeAreaView,Platform,Button,Modal,TextInput,Animated, ImageBackground,LayoutAnimation, FlatList, BackHandler, RefreshControl, AsyncStorage, Share, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid
} from 'react-native'
import img1 from '../assets/img/bg.png';
import img2 from '../assets/img/bg.png';
import img3 from '../assets/img/bg.png';
import Carousel from '@rhysforyou/react-native-carousel';
import Carousel2 from './HorizontalCarousel';
import PageCarousel from './pagesHorizontal';
import SeriesCarousel from './seriesCarousel';
import SnapCarousel from 'react-native-snap-carousel';
import Modal1 from 'react-native-modal';
// import apiCall from "../redux/ActionCreator";
// import { connect } from "react-redux";
import { Card } from "react-native-elements";
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-paper';
import NewsFeed from './newsfeed';
import ScrollUp from 'react-native-scroll-up';
// import ScrollButton from '../components/ScrollButton';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import ModalBox from 'react-native-modalbox';
import SnackBar from 'react-native-snackbar';
console.disableYellowBox = true;
// import Modal from "react-native-modal";
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// function MyComponent(props) {
//   return (
//     <View {...props} style={{flex: 0.1, backgroundColor: '#fff',margin:'2%',alignItems:'center'}}>
//       <Text>My Component</Text>
//     </View>
//   );
// }
const options = {
    headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}
let nextPageName;
class SearchExplore extends Component {
  scrollView = React.createRef();
  constructor(props) {
      super(props)

      this.state = {
          isOpen: false,
          isDisabled: false,
          swipeToClose: true,
          sliderValue: 0.3,
          expanded: false,
          boolean: false,
          scrolltop:false,
          active: 'Recommendation',
          data1: '',
          expl: '',
          expl1: '',
          expl11: [],
          toppick: '',
          pub: '',
          pages: '',
          series: '',
          periodical: '',
          rv: '',
          visible: false,
          collectionModal:false,
          loading:true,
          readlaterPopup:false,
          periodIssues:'',
          popupData:'',exists:false,getuserid:'',
          searchList:false,
          sectionExpand:false,
          section:'',
          secCollid:'',
          text:''

      }
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.arrayholder=[];
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
      // this.backpress()
      // this.props.navigation.navigate('search')
      this.props.navigation.goBack();
          return true;
    }  
    componentDidMount() {
      AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid : value })).done();
      this.CheckConnectivity();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    CheckConnectivity(){    
      NetInfo.fetch().then(state => {
    
        console.log("Connection type cheking", state.type);
        console.log("Is connected cheking?", state.isConnected);
    
        if(state.isConnected==true){
            {this.getData()}
          // {this.exploredataPopup();}
        }else{
          alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
       
      });
    }
    getData=()=>{
      setTimeout(() => {
          // { this.exploredata() }
          {this.exploredataPopup()}
          { this.exploredata1() }
      }, 3);
    }
      periodIssues(postid) {
        // {"TypeID":"1","Post_PageID":"3"}
        // console.log('dsflkajdkfksd ',typeid,postid)
        var json = JSON.stringify(
          {
            "postid":postid
        });
        fetch("http://162.250.120.20:444/Login/PeriodicalDesc",
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
                this.setState({ periodIssues: responseJson})
                console.warn(responseJson)
              
            })
            .catch((error) => {
                console.warn(error);
            });
        }
      // exploredata() {
      //     var json = JSON.stringify({
      //       'UserId': this.state.getuserid,
      //     });
      //     fetch("http://162.250.120.20:444/Login/Explore",
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
      //             this.setState({ expl: responseJson })
      //             console.warn(responseJson)
      //             //alert(this.state.data.status)
  
  
      //         })
      //         .catch((error) => {
      //             console.warn(error);
      //         });
      // }
      exploredataPopup(){
        this.setState({loading:true})
        var json=JSON.stringify(
          {"SearchText":this.state.text,"SortBy":"DESC"}
          );
          // alert(json);
          console.log(json,"search")
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
             this.setState({loading:false})
                  this.arrayholder=responseJson;
            })
            .catch((error) => {
                console.warn(error);
            });
      }
      exploredata1() {
          var json = JSON.stringify({
              'UserId': this.state.getuserid,
          });
          fetch("http://162.250.120.20:444/Login/HomePage",
              {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'content-type': 'multipart/form-data'
                  },
                  body: json
              }
          )
              .then((response) => response.json())
              .then((responseJson) => {
                  //alert(responseText);
                  // this.arrayholder=responseJson;
                  this.setState({
                      expl1: responseJson,
                      expl11: responseJson,
                      loading:false
                  })
                  console.warn(responseJson)
                  //alert(this.state.data.status)
                  for (let i = 0; i < this.state.expl11.length; i++) {
  
                    //   alert(this.state.expl11.length+"df")
                    if (this.state.expl11[i].Datafor === 'MV') {
                        let toppick = [...this.state.toppick];
                        toppick.push(this.state.expl11[i])
                        this.setState({ toppick });
                        // this.setState({loading:false})
                        // alert(this.state.DATAS2.length+"df")
                    }
                    else if (this.state.expl11[i].Datafor === 'Publication') {
                        let pub = [...this.state.pub];
                        pub.push(this.state.expl11[i])
                        this.setState({ pub });
                    }
                    else if (this.state.expl11[i].Datafor === 'page') {
                        let rv = [...this.state.rv];
                        rv.push(this.state.expl11[i])
                        this.setState({ rv });
                        
                    }
                    else if (this.state.expl11[i].Datafor === 'Series') {
                      let series = [...this.state.series];
                      series.push(this.state.expl11[i])
                      this.setState({ series });
                  }
                  else if (this.state.expl11[i].Datafor === 'Periodical') {
                      let periodical = [...this.state.periodical];
                      periodical.push(this.state.expl11[i])
                      this.setState({ periodical });

                  }
                      // else{
                      //   let DATAS4 = [...this.state.DATAS4];
                      //   DATAS4.push(this.state.DATAS[i])
                      //   this.setState({DATAS4});
                      // }
  
                      // if(this.state.expl11[i].Datafor==='MV'){
                      //   this.setState({toppick: this.state.expl11[i]
                      //     })
                      //      console.warn(this.state.expl11[i].Datafor+'fnjdnjv')
  
                      // }
                      // else if(this.state.expl11[i].Datafor==='Publication'){
                      //   this.setState({pub: this.state.expl11[i]
                      //   })
                      // }
                      // else if(this.state.expl11[i].Datafor==='page'){
                      //   this.setState({rv: this.state.expl11[i]
                      //   })
                      // }
                  }


                  // if(this.state.expl11[0].Datafor==='MV'){
                  //   console.warn(this.state.expl1[0].Datafor+'fnjdnjv')
  
                  // }
                  // else{
                  //   console.warn("dkbhvbdbv")
                  // }
  
              }
              )
  
  
  
              .catch((error) => {
                  console.warn(error);
              });
      }
      // exploredataPopup(){
      //   // this.setState({loading:true})
      //   var json=JSON.stringify(
      //     {"SearchText":"pa"}
      //     );
      //     fetch("http://162.250.120.20:444/Login/Search",
      //       {
      //           method: 'POST',
      //           headers: {
      //               'Accept': 'application/json',
      //               'content-type': 'application/json'
      //           },
      //           body: json
      //       }
      //   )
      //       .then((response) => response.json())
      //       .then((responseJson) => {
      //           //alert(responseText);
      //           // this.setState({loading:false})
      //           // console.log('profileData data is ',this.state.popupData)
      //           // console.log('arrayl kdfkslaf ',this.arrayholder)
      //           // for(let i=0;i<responseJson.length;i++){
      //           //   if(responseJson[i].PostLinkTitle=='Cindrella'){
      //           //     this.setState({title:responseJson[i].PostLinkTitle,
      //           //       img:responseJson[i].PostLinkImage,
      //           //       author:responseJson[i].Post_author,
      //           //       popTypeId:responseJson[i].TypeID,
      //           //       popPostId:responseJson[i].Post_page_id
      //           //     })
      //           //     // console.log('postlinktitle is ',responseJson[i].PostLinkTitle)
    
      //           //   }
      //           // }
      //           // console.warn(responseJson)
      //           // console.warn("Notification")
                
      //           //alert(this.state.data.status)  
      //       })
      //       .catch((error) => {
      //           console.warn(error);
      //       });
      // }
      pressIcon = (item) => {
        let { toppick } = this.state;
        // console.log('top pick data ',item)
        // console.log('kjdsafksdfjsdka data is',toppick)
        // console.log('kjdsafksdfjsdka data is',item.TypeID)
        // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)
  
        toppick = toppick.map(e => {
            console.log('top pick type id is ', e.TypeID)
  
            if (item.TypeID === e.TypeID) {
                AsyncStorage.setItem('typeid', item.TypeID);
  
                AsyncStorage.setItem('postid', item.Post_Page_Id);
                if(nextPageName=='periodiViewBook'){
                // AsyncStorage.setItem('EmailVer1', this.state.data.data.uid);
                return this.props.navigation.navigate('viewBook');
              }else{
                return this.props.navigation.navigate('viewBook');
              }
                // }
                //  else if(item.id === 2){
                //   return this.props.navigation.navigate('filter', {
                //     item: item});
                //   }else if(item.id == 3){
                //     return this.props.navigation.navigate('bookmarks', {
                //       item: item});
            } else {
                return e;
            }
        });
    }
    pressIcon_pages=(item)=>{
      let { toppick } = this.state;
     
      toppick = toppick.map(e => {
          console.log('top pick type id is ', e.TypeID)

          if (item.TypeID === e.TypeID) {
              AsyncStorage.setItem('typeid', item.TypeID);

              AsyncStorage.setItem('postid', item.Post_Page_Id);
             
              return this.props.navigation.navigate('readingBook');
          } else {
              return e;
          }
      });
    }
   
      pressSearch = (item) => {
          let { data } = this.state;
          // console.log('items are', item)
          data = data.map(e => {
              if (item.id === e.id) {
                  // item.like = !e.like;
                  return this.props.navigation.navigate('search_explore', {
                      item: item
                  });
                  // }
                  //  else if(item.id === 2){
                  //   return this.props.navigation.navigate('filter', {
                  //     item: item});
                  //   }else if(item.id == 3){
                  //     return this.props.navigation.navigate('bookmarks', {
                  //       item: item});
              } else {
                  return e;
              }
          });
      }
      // popupBookpage=(item)=>{
      //   AsyncStorage.setItem('typeid',JSON.stringify(item.TypeID));
      //   AsyncStorage.setItem('postid',JSON.stringify(item.Post_page_id));
      //   console.log('post id and type id in search popup ',item.TypeID,item.Post_page_id)
      //   // this.refs.modal4.close();
      //   this.setState({searchList:true})
      //   if (item.TypeID ==4) {
      //         return this.props.navigation.navigate('readingBook');
      //      // return this.pressIcon();
      //  } else if(item.TypeID==1){
      //            return this.props.navigation.navigate('viewBook');
      //  } else if(item.TypeID==2){
      //             return this.props.navigation.navigate('periodiViewBook');
      //  }else if(item.TypeID==3){
      //             return this.props.navigation.navigate('seriesViewBook');
      //  }
      
      // }
      popupBookpage = (item) => {
       
        this.arrayholder = this.arrayholder.map(e => {
          if (item.TypeID === e.TypeID) {
            // item.like = !e.like;
            AsyncStorage.setItem('typeid',JSON.stringify(item.TypeID));
            AsyncStorage.setItem('postid',JSON.stringify(item.Post_page_id));
            AsyncStorage.setItem('searchText',this.state.text)
            console.log('search explore post id is',item.Post_Page_Id);
            if (item.TypeID ==4) {
              // AsyncStorage.setItem('pagefeedItem',JSON.stringify(item));
                return this.props.navigation.navigate('readingBook');
            } else if(item.TypeID==1){
                return this.props.navigation.navigate('viewBook');
            } else if(item.TypeID==2){
                return this.props.navigation.navigate('periodiViewBook');
            }else if(item.TypeID==3){
                return this.props.navigation.navigate('seriesViewBook');
            }
          } else {
            return e;
          }
        });
      }
      pressIcon1 = (item) => {
          let { expl } = this.state;
          console.log('top pick data ', item)
          console.log('kjdsafksdfjsdka data is', expl)
          // console.log('items are', item)
          expl = expl.map(e => {
              if (item.Category_name === e.Category_name) {
                  // item.like = !e.like;
                  return this.props.navigation.navigate('search', {
                      item: item
                  });
                  // }
                  // else if (item.id === 2) {
                  //     return this.props.navigation.navigate('filter', {
                  //         item: item
                  //     });
                  // } else if (item.id == 3) {
                  //     return this.props.navigation.navigate('bookmarks', {
                  //         item: item
                  //     });
              } else {
                  return e;
              }
          });
      }
      seriesPress = (item) => {
        let { series } = this.state;
        // console.log('items are', item)
        series= series.map(e => {
            if (item.TypeID=== e.TypeID) {
                AsyncStorage.setItem('typeid', item.TypeID);
                AsyncStorage.setItem('postid', item.Post_Page_Id);
                // item.like = !e.like;
                return this.props.navigation.navigate('seriesViewBook', {
                    item: item
                });

            } else {
                return e;
            }
        });
    }
    periodicalPress = (item) => {
        let { periodical } = this.state;
        // console.log('items are', item)
        periodical = periodical.map(e => {
            if (item.TypeID === e.TypeID) {
                AsyncStorage.setItem('typeid', item.TypeID);
                AsyncStorage.setItem('postid', item.Post_Page_Id);
                {this.periodIssues(item.Post_Page_Id)}
                if(this.state.periodIssues.length>0){
                    return this.props.navigation.navigate('viewBook', {
                        item: item
                    });

                }else{
                    return this.props.navigation.navigate('periodiViewBook', {
                        item: item
                    });
                }
                // item.like = !e.like;
              

            } else {
                return e;
            }
        });
    }
     
    // pressIcon = (item) => {
    //   let { data } = this.state;
    //   console.log('items are',item)
    //   data = data.map(e => {
    //     if (item.id === e.id) {
    //       // item.like = !e.like;
    //       return this.props.navigation.navigate('viewBook', {
    //         item: item});
    //     // }
    //     //  else if(item.id === 2){
    //     //   return this.props.navigation.navigate('filter', {
    //     //     item: item});
    //     //   }else if(item.id == 3){
    //     //     return this.props.navigation.navigate('bookmarks', {
    //     //       item: item});
    //         } else{
    //       return e;
    //     }
    //   });
    // }
    // pressIcon1 = (item) => {
    //   let { data } = this.state;
    //   console.log('items are',item)
    //   data = data.map(e => {
    //     if (item.id === 1) {
    //       // item.like = !e.like;
    //       return this.props.navigation.navigate('viewBook', {
    //         item: item});
    //     }
    //      else if(item.id === 2){
    //       return this.props.navigation.navigate('viewBook', {
    //         item: item});
    //       }else if(item.id == 3){
    //         return this.props.navigation.navigate('viewBook', {
    //           item: item});
    //         } else{
    //       return e;
    //     }
    //   });
    // }
    // handleOnScroll = event => {
    //     const offsetY = event.nativeEvent.contentOffset.y;
    
    //     if (offsetY > 50) {
    //       this.setState({
    //         visible: true,
    //       });
    //     } else {
    //       this.setState({
    //         visible: false,
    //       });
    //     }
    //   };

 
    backpress=()=>{
      //    console.log('before set',this.props.nav)
        //  this.props.changeNavNews();
        //  this.props.navigation.navigate('search')
        if(this.state.searchList){
          this.setState({searchList:false})
        }else{
        this.props.navigation.goBack();
        }
        //  this.props.navigation.navigate('MainpageTabs')
      //    console.log('after set',this.props.nav);
     }
     keyExtractor = (item, index) => {
      // console.log('item id is in carousel',index)
      item.id
  }
     changeLayout = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ expanded: !this.state.expanded });
      {this.collData(this.state.getuserid)};
  }
    readlater=()=>{
      this.setState({
          collectionModal:false,
          readlaterPopup: true
      });
      setTimeout(() => {
          // this.props.changeRemove()
          this.setState({
              readlaterPopup: false,
              exists:false
          })
          //   this.props.changeRemove();
      }, 5000);
      // this.props.navigation.navigate('readlater');
    }
    secData(userid,collid) {
      this.setState({loading:true})
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
          this.setState({ section:responseJson});
          const filteredList = this.state.section.filter((item) => item.SectionID !== 0);
          this.setState({ section: filteredList, loading: false, secCollid: collid})
                
          console.warn(responseJson)
          console.warn("section")
          //alert(this.state.data.status)  
      })
      .catch((error) => {
          console.warn(error);
      });
  }
collData(userid,colid,secid) {
  this.setState({loading:true})
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
  readlaterClick=()=>{
  
        let list=[this.state.currentItem];
        for(let item of list){
         AsyncStorage.setItem('typeid', item.TypeID);
         AsyncStorage.setItem('postid', item.Post_Page_Id);
         this.readlaterAdd(this.state.getuserid,item.Post_Page_Id,item.TypeID)
        }
    // this.props.navigation.navigate('readlater');
  }
  readlaterAdd(userid,pageid,typeid){
    this.setState({loading:true})
    var json = JSON.stringify({
        'UserID': userid,
        "Post_PageID":pageid,
        "Type_ID":typeid
    });
    fetch("http://162.250.120.20:444/Login/ReadLaterAdd",
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
    if(responseJson[0].Message=="Already Exist"){
        this.setState({exists:true})
      }
    this.setState({ loading: false , collectionModal:false,expanded:false,sectionExpand:false})
    this.readlater();
  //   SnackBar.show({
  //     title: !this.state.exists?"Added to ReadLater":"Already Added in ReadLater",
  //     backgroundColor: '#27A291',
  //     action: {
  //       title: 'Undo',
  //     //   onPress: () => SnackBar.show({ title: 'Thank you!' }),
  //       color: '#fff',
  //     },
  //   })
  //      setTimeout(() => {
  //         SnackBar.dismiss()
  //     // this.props.changeRemove()
  //     this.setState({
  //         // readlaterPopup: false,
  //         exists:false
  //     });
     
  //     //   this.props.changeRemove();
  // }, 5000);
  //   console.warn(responseJson)
  //   console.warn("readlateradd")
    //alert(this.state.data.status)  
})
.catch((error) => {
    console.warn(error);
});
  }
  collectionAdd(colid,secid,postid,pageid,userid,type,status){
      var json = JSON.stringify(
        {"collectionid":colid,
        "sectionid":secid,
        "postid":postid,
        "pageid":pageid,
        "userid":userid,
        "Type":type,
        "Status":status}
      )
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
    console.warn("readlateradd")
    //alert(this.state.data.status)  
})
.catch((error) => {
    console.warn(error);
});
  }
  pagePress = (item) => {
    let { rv } = this.state;
    // console.log('top pick data ',item)
    // console.log('kjdsafksdfjsdka data is',toppick)
    // console.log('kjdsafksdfjsdka data is',item.TypeID)
    // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)

    rv = rv.map(e => {
        console.log('top pick type id is ', e.TypeID)
         if (item.TypeID === e.TypeID) {
    // item.like = !e.like;
    AsyncStorage.setItem('typeid', item.TypeID);
    AsyncStorage.setItem('postid', item.Post_Page_Id);
      
    console.log('newsfeed post id is',item.Post_Page_Id);
    if (item.TypeID ==4) {
        return this.props.navigation.navigate('readingBook');
    } else if(item.TypeID==1){
        return this.props.navigation.navigate('viewBook');
    } else if(item.TypeID==2){
        return this.props.navigation.navigate('periodiViewBook');
    }else if(item.TypeID==3){
        return this.props.navigation.navigate('seriesViewBook');
    }
  } else {
    return e;
  }
    });
}
  collectionBook=(value,collid)=>{
    this.setState({collectionModal:false,expanded:false,sectionExpand:false});
    console.log('collection book value is ',value)
    let list=[this.state.currentItem];
    for(let item of list){
     AsyncStorage.setItem('typeid', item.TypeID);
     AsyncStorage.setItem('postid', item.Post_Page_Id);
     console.log('type id postid ',item.TypeID,item.Post_Page_Id);
     // AsyncStorage.setItem('3dots',JSON.stringify(1));
     this.props.collSecPopup();
     console.log('collSeccollSeccollSeccollSec',this.props.collSec)
     AsyncStorage.setItem('popup_name',JSON.stringify(value));
     AsyncStorage.setItem('colSec',"Collection");
     AsyncStorage.setItem('colId',JSON.stringify(collid));
     if (item.TypeID ==4) {
        // AsyncStorage.setItem('popup_name1',JSON.stringify(value));
         this.collectionAdd(collid,"","",item.Post_Page_Id,this.state.getuserid,item.TypeID,"")
        //  this.props.popupAddCol();
        //  AsyncStorage.setItem('colSec',"Collection");
        //  AsyncStorage.setItem('colId',collid);
         return this.props.navigation.navigate('readingBook');
         // return this.pressIcon();
     } else if(item.TypeID==1){
        this.collectionAdd(collid,"",item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
             return this.props.navigation.navigate('viewBook');
     } else if(item.TypeID==2){
        // AsyncStorage.setItem('3dots',JSON.stringify(1));
        // AsyncStorage.setItem('popup_name',JSON.stringify(value));
        // AsyncStorage.setItem('colSec',"Collection");
        // AsyncStorage.setItem('colId',collid);
        this.collectionAdd(collid,"",item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
             return this.props.navigation.navigate('periodiViewBook');
     }else if(item.TypeID==3){
        // AsyncStorage.setItem('3dots',JSON.stringify(1));
        // AsyncStorage.setItem('popup_name',JSON.stringify(value));
        // AsyncStorage.setItem('colSec',"Collection");
        // AsyncStorage.setItem('colId',collid);
        this.collectionAdd(collid,"",item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
               return this.props.navigation.navigate('seriesViewBook');
     }
    }
    // let gotoDescPage=this.state.curFuncName;
    // if(this.state.curFuncName=="pressIcon"){
    //     this.pressIcon(this.state.currentItem)
    // }else if(this.state.funcName=="seriesPress"){
    //     this.seriesPress(this.state.currentItem)
    // }else if(this.state.funcName=="periodicalPress"){
    //     this.periodicalPress(this.state.currentItem)
    // }

    }
    sectionClick = (collid) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ sectionExpand: !this.state.sectionExpand });
        this.secData(this.state.getuserid,collid)
        console.log('section data collection ',this.state.section);
    }
    secBook=(value,collid,secid,item)=>{
        this.setState({collectionModal:false,expanded:false,sectionExpand:false});
        console.log('section book value is ',value,item, collid,secid)
        let list=[this.state.currentItem];
        for(let item of list){
            AsyncStorage.setItem('typeid', item.TypeID);
            AsyncStorage.setItem('postid', item.Post_Page_Id);
            console.log('type id postid ',item.TypeID,item.Post_Page_Id);
            this.props.collSecPopup();
     AsyncStorage.setItem('popup_name',JSON.stringify(value));
     AsyncStorage.setItem('colSec',"Section");
               AsyncStorage.setItem('SecId',JSON.stringify(secid));
            if (item.TypeID ==4) {
              //  AsyncStorage.setItem('popup_name1',JSON.stringify(value));
                this.collectionAdd(collid,secid,"",item.Post_Page_Id,this.state.getuserid,item.TypeID,"")
                // this.props.popupAddCol();
                // AsyncStorage.setItem('colSec',"Section");
                // AsyncStorage.setItem('SecId',secid);
                return this.props.navigation.navigate('readingBook');
                // return this.pressIcon();
            } else if(item.TypeID==1){
              //  AsyncStorage.setItem('3dots',JSON.stringify(1));
              //  AsyncStorage.setItem('popup_name',JSON.stringify(value));
              //  AsyncStorage.setItem('colSec',"Section");
              //  AsyncStorage.setItem('SecId',secid);
               this.collectionAdd(collid,secid,item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
                    return this.props.navigation.navigate('viewBook');
            } else if(item.TypeID==2){
              //  AsyncStorage.setItem('3dots',JSON.stringify(1));
              //  AsyncStorage.setItem('popup_name',JSON.stringify(value));
              //  AsyncStorage.setItem('colSec',"Section");
              //  AsyncStorage.setItem('SecId',secid);
               this.collectionAdd(collid,secid,item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
                    return this.props.navigation.navigate('periodiViewBook');
            }else if(item.TypeID==3){
              //  AsyncStorage.setItem('3dots',JSON.stringify(1));
              //  AsyncStorage.setItem('popup_name',JSON.stringify(value));
              //  AsyncStorage.setItem('colSec',"Section");
              //  AsyncStorage.setItem('SecId',secid);
               this.collectionAdd(collid,secid,item.Post_Page_Id,"",this.state.getuserid,item.TypeID,"")
                      return this.props.navigation.navigate('seriesViewBook');
            }
           
        }
        }
    moreClick=(item,funcName)=>{
      // AsyncStorage.setItem('typeid', JSON.stringify(item.TypeID));
      // AsyncStorage.setItem('postid', JSON.stringify(item.Post_Page_Id));
      this.setState({collectionModal:!this.state.collectionModal,currentItem:item,curFuncName:funcName})
  }
      searchfunc=()=>{
        this.setState({newbool:true,searchList:true})
        //  this.refs.modal4.open()
      }
      SearchFilterFunction(text) {
        {this.exploredataPopup()}
        // this.refs.modal4.open();
        this.setState({searchList:true})
        //passing the inserted text in textinput
        // console.log('array holder ',this.arrayholder)
        const newData = this.arrayholder.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = item.PostLinkTitle ? item.PostLinkTitle.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          popupData: newData,
          text: text,
        });
        // console.log('profile data 1 value filtered ',this.state.popupData)
      }
 render() {
//   let value = this.props.navigation.state.params.item
//   ? this.props.navigation.state.params.item
//   : '';
//  nextPageName=value.title;
//   console.log('value in search explore page ',value,"  ",nextPageName);

    return (
      <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
          <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center', }}>
        <View>
        <TextInput
              style={styles.input}
              onChangeText={value =>this.setState({text:value})}
              value={this.state.text}
              underlineColorAndroid={'#707070'}
              // underlineColorAndroid='black'
              placeholder="Search"
            />
                {Platform.OS=='ios'?<View style={{width:width-80,alignSelf:'center',height:1,backgroundColor:'#707070',marginBottom:'2%'}} />:null}
          </View>      
          <TouchableOpacity  style={styles.touchableButton} onPress={()=>this.SearchFilterFunction(this.state.text)}>
            <Image style={{width:20,height:20}} source={require('../assets/img/search.png')}/>
            </TouchableOpacity>

          <TouchableOpacity
              style={{alignSelf:'center'}}
              onPress={()=>this.backpress()}>
          <Image
            source={require('../assets/img/close.png')}>
          </Image>
          </TouchableOpacity>
         

          </View>
       


{!this.state.searchList?null:
<View style={{width:width,height:height/2,elevation:1}}>


<View style={{flex:1}}>
<TouchableOpacity style={{backgroundColor:'#27A291',width:width,padding:'3%',alignSelf:'center'}}><Text style={{fontSize:16,color:'white',textAlign:'center'}}>Suggestions for '{this.state.text}'</Text></TouchableOpacity>
          {/* <FlatList
            data={this.state.popupData}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=>(
              <TouchableOpacity onPress={()=>this.popupBookpage(item)}>
              <View style={{ flexDirection: 'row',paddingLeft:'3%',paddingRight:'3%',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',width:width/1.5,marginTop:'3%' }}>

            <Text style={{fontSize:17,fontWeight:'bold',paddingLeft:'2%'}}> {item.Title} </Text>
            <Text style={{fontSize:16,marginTop:10,color:'#707070',paddingLeft:'3%'}}>
            {item.Post_author}    
              </Text>
            </View>
            <ImageBackground imageStyle={{borderRadius:10}} source={{uri:item.Images!=""?item.Images:null}} 
            style={{resizeMode:'cover',width:100,height:120,borderRadius:20,
            marginTop:'2%',marginBottom:'2%'
            }}>
            <TouchableOpacity style={{padding:'2%'}}
                   onPress={() => { this.setState({reportModal:true,searchList:false})
                    // this.refs.modal4.close()
                   }
                  }
                >
     <Image style={{alignSelf:'flex-end',marginRight:'5%',marginTop:'5%',}} source={require('../assets/img/3dots_white.png')}/>
     </TouchableOpacity>
        </ImageBackground>
        </View>
       </TouchableOpacity>
            )}
            /> */}
              <FlatList
            data={this.state.popupData}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=>(
              <ScrollView>
              <TouchableOpacity onPress={()=>this.popupBookpage(item)}>
              <View style={{ flexDirection: 'row',paddingLeft:'3%',paddingRight:'3%',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',width:width/1.5,marginTop:'3%' }}>

            <Text style={{fontSize:17,fontWeight:'bold',paddingLeft:'2%'}}>
               {item.PostLinkTitle}
                </Text>
            <Text style={{fontSize:16,marginTop:10,color:'#707070',paddingLeft:'3%'}}>
            {item.Post_author}    
            </Text>
            </View>
            <ImageBackground imageStyle={{borderRadius:10}} source={{uri:item.PostLinkImage!=""?item.PostLinkImage:null}} 
            style={{resizeMode:'cover',width:100,height:120,borderRadius:20,
            marginTop:'2%',marginBottom:'2%'
            }}>
            <TouchableOpacity style={{padding:'2%'}}
                   onPress={() => { this.setState({reportModal:true,searchList:false})
                    // this.refs.modal4.close()
                   }
                  }
                >
     <Image style={{alignSelf:'flex-end',marginRight:'5%',marginTop:'5%',}} source={require('../assets/img/3dots_white.png')}/>
     </TouchableOpacity>
        </ImageBackground>
        </View>
       </TouchableOpacity>
       </ScrollView>
            )}
            />
        <Divider style={{color:'#707070',borderWidth:0.2,width:width}} />
        <TouchableOpacity style={{padding:'1%',marginBottom:'3%'}}    
        onPress={()=>{
        this.setState({searchList:false})
        AsyncStorage.setItem('searchText',this.state.text)
        this.props.navigation.navigate('searchDetail')
        // this.refs.modal4.close();
      }}>
          <View style={{flexDirection:'row',marginTop:'1%',marginBottom:'1%',justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',marginRight:'5%'}}>
          <Text style={{color:'#707070',marginRight:'2%'}}>See All</Text>
            <Image style={{marginRight:'2%',}}  source={require('../assets/img/right_arrow.png')}/>
          </View>
        </TouchableOpacity>
        </View>
</View>}
<ScrollView
     ref={(c) => {this.scroll = c}}
   >
 <View style = {styles.overlay}>  
  <Text style={{ color: '#707070',marginTop:'3%',marginLeft:'3%',alignSelf:'flex-start',
    textAlign:'left', fontSize: 26, }} onPress={this.ShareMessage} >Publications</Text>
          <View style={{width:width-40,height:1,margin:'2%',backgroundColor:'#27A291',alignSelf:'flex-start'}}/>

                  {/* <View style={{width:width-30,height:1,marginLeft:'3%',marginTop:'1%',backgroundColor:'#24D4BC',alignSelf:'flex-start'}}/> */}

                  <SnapCarousel
    data={this.state.pub}
    renderItem={({ item, index }) => (
        <View style={{paddingRight:10}}>

        <TouchableOpacity
            onPress={() => this.pressIcon(item)}
        >
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 150, jsutifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.moreClick(item,"pressIcon") }>
                            <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                        </TouchableOpacity>
                    </ImageBackground>
                </CardView>
                <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center' }}>
                    {item.Title}
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 12, color: '#707070',textAlign:'center' }}>
                  {item.Author}
              </Text>
                </TouchableOpacity>
            </View>

    )}
    keyExtractor={item => item.id}
    autoplay={false}
    enableMomentum={true}
    sliderWidth={Dimensions.get('window').width}
    itemWidth={130}
    itemHeight={120}
    snapToInterval={20}
    contentContainerCustomStyle={{marginLeft:-80}}
    containerCustomStyle={{ marginTop: 30 }}
/>

</View>
           

<View style = {styles.overlay}>   
<Text style={{ color: '#707070',marginTop:'3%',marginLeft:'3%',alignSelf:'flex-start',
    textAlign:'left', fontSize: 26, }}>Pages</Text>
     {/* <View style={{width:width-30,height:1,marginLeft:'3%',marginTop:'1%',backgroundColor:'#24D4BC',alignSelf:'flex-start'}}/> */}
     <View style={{width:width-40,height:1,margin:'2%',backgroundColor:'#27A291',alignSelf:'flex-start'}}/>

 
 <SnapCarousel
    data={this.state.rv}
    style={{ marginLeft: 5, marginRight: 5 }}
    renderItem={({item,index}) => (
      
            <View style={{paddingRight:10}}>
                      <TouchableOpacity
            onPress={() => this.pagePress(item)}
        >
            <View>
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 100, jsutifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.moreClick(item,"pressIcon_pages") }>
                            <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                        </TouchableOpacity>
                    </ImageBackground>
                </CardView>
                <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center'}}>
                    {item.Title}
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 12, color: '#707070',textAlign:'center' }}>
                  {item.Author}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 12, color: '#707070',textAlign:'center' }}>
                  {item.Pagedate}
              </Text>
            </View>

        </TouchableOpacity>
        </View>
    )}
    keyExtractor={item => item.id}
    autoplay={false}
    enableMomentum={true}
    sliderWidth={Dimensions.get('window').width}
    itemWidth={130}
    itemHeight={100}
    snapToInterval={20}
    contentContainerCustomStyle={{marginLeft:-80}}
    snapToAlignment={'start'}
    containerCustomStyle={{ marginTop: 30,backgroundColor:"transparent" }}
/>

</View>
 <View style = {styles.overlay}>   
 <Text style={{ color: '#707070',marginTop:'3%',marginLeft:'3%',alignSelf:'flex-start',
    textAlign:'left', fontSize: 26, }}>Series</Text>
          <View style={{width:width-40,height:1,margin:'2%',backgroundColor:'#27A291',alignSelf:'flex-start'}}/>
 
      <SnapCarousel
    data={this.state.series}
    renderItem={({ item, index }) => (
        <View style={{paddingRight:10}}>

        <TouchableOpacity
            onPress={() => this.seriesPress(item)}
        >
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 120, jsutifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.setState({collectionModal:!this.state.collectionModal}) }>
                            <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                        </TouchableOpacity>
                    </ImageBackground>
                </CardView>
                <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center' }}>
                    {item.Title}
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 12, color: '#707070',textAlign:'center' }}>
                  {item.Author}
              </Text>
                </TouchableOpacity>
            </View>

    )}
    keyExtractor={(item,index)=>index.toString()}
    autoplay={false}
    enableMomentum={true}
    sliderWidth={Dimensions.get('window').width}
    itemWidth={130}
    itemHeight={120}
    snapToInterval={20}
    contentContainerCustomStyle={{marginLeft:-80}}
    containerCustomStyle={{ marginTop: 30 }}
/>

</View>
<View style = {styles.overlay}>   
<Text style={{ color: '#707070',marginTop:'3%',marginLeft:'3%',alignSelf:'flex-start',
    textAlign:'left', fontSize: 26, }}>Periodicals</Text>
          <View style={{width:width-40,height:1,margin:'2%',backgroundColor:'#27A291',alignSelf:'flex-start'}}/>
 
              <SnapCarousel
  data={this.state.periodical}
    renderItem={({item,index}) => (
        
             <View style={{paddingRight:10}}>
             <TouchableOpacity
            onPress={() => this.periodicalPress(item)}
        >
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <ImageBackground source={{ uri: item.Images }} style={{ width: 130, height: 120, jsutifyContent: 'center' }}>
                        <TouchableOpacity
                                onPress={() => this.setState({collectionModal:!this.state.collectionModal}) }>
                            <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                        </TouchableOpacity>
                    </ImageBackground>
                </CardView>
                <Text style={{ marginBottom: 3, marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#242126',textAlign:'center' }}>
                    {item.Title}
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 12, color: '#707070',textAlign:'center' }}>
                  {item.Author}
              </Text>
                        </TouchableOpacity>

            </View>

    )}
    keyExtractor={item => item.id}
    autoplay={false}
    enableMomentum={true}
    sliderWidth={Dimensions.get('window').width}
    itemWidth={130}
    itemHeight={140}
    snapToInterval={20}
      contentContainerCustomStyle={{marginLeft:-80}}
    containerCustomStyle={{ marginTop: 30 }}
/>
</View> 

{/* <ModalBox
          style={{  alignItems: 'center',
          height:"40%",
          width: width,}}
          position={'top'}
          ref={'modal4'}
          isDisabled={this.state.isDisabled}>
            <View style={{flex:1,}}>
          <TouchableOpacity style={{backgroundColor:'#27A291',width:width,padding:'3%',alignSelf:'center'}}><Text style={{fontSize:16,color:'white',textAlign:'center'}}>Suggestions for '{this.state.searchText}'</Text></TouchableOpacity>
          <FlatList
            data={this.state.popupData}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=>(
              <TouchableOpacity onPress={()=>this.popupBookpage(item)}>
              <View style={{ flexDirection: 'row',paddingLeft:'3%',paddingRight:'3%',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',width:width/1.5,marginTop:'3%' }}>

            <Text style={{fontSize:17,fontWeight:'bold',paddingLeft:'2%'}}> {item.PostLinkTitle} </Text>
            <Text style={{fontSize:16,marginTop:10,color:'#707070',paddingLeft:'3%'}}>
            {item.Post_author}    
              </Text>
            </View>
            <ImageBackground imageStyle={{borderRadius:10}} source={{uri:item.PostLinkImage!=""?item.PostLinkImage:null}} 
            style={{resizeMode:'cover',width:100,height:120,borderRadius:20,
            marginTop:'2%',marginBottom:'2%'
            }}>
            <TouchableOpacity style={{padding:'2%'}}
                   onPress={() => { this.setState({reportModal:true})
                    this.refs.modal4.close()
                   }
                  }
                >
     <Image style={{alignSelf:'flex-end',marginRight:'5%',marginTop:'5%',}} source={require('../assets/img/3dots_white.png')}/>
     </TouchableOpacity>
        </ImageBackground>
        </View>
       </TouchableOpacity>
            )}
            />
        <Divider style={{color:'#707070',borderWidth:0.2,width:width}} />
        <TouchableOpacity style={{padding:'1%',marginBottom:'3%'}}    
        onPress={()=>{this.props.navigation.navigate('searchDetail')
        this.refs.modal4.close();
      }}>
          <View style={{flexDirection:'row',marginTop:'1%',marginBottom:'1%',justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',marginRight:'5%'}}>
          <Text style={{color:'#707070',marginRight:'2%'}}>See All</Text>
            <Image style={{marginRight:'2%',}}  source={require('../assets/img/right_arrow.png')}/>
          </View>
        </TouchableOpacity>
        </View>
        </ModalBox> */}
      <Modal1 isVisible={this.state.collectionModal}
  onBackdropPress={() => this.setState({ collectionModal: false,expanded:false,sectionExpand:false})}>
            <View 
            style={{backgroundColor:'#fff', alignItems: 'center',
            justifyContent:'center',
            alignSelf:'center',
            flex: !this.state.expanded ? 0.3 : 0.4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 5,
            borderBottomEndRadius: 5,
            width: 300,}}
            >
              <TouchableOpacity
                style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}
                onPress={() => {this.props.navigation.navigate('createCollection')
                this.setState({collectionModal:false})}}>
                <View style={{
                  flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                  justifyContent: 'center', alignSelf: 'center'
                }}>
                  <Image source={require('../assets/img/plus_green.png')} />
                  <Text style={{ fontSize: 17, color: '#27A291', marginLeft: '5%', width: width / 2.5, }}>Create Collection</Text>
  
                </View>
              </TouchableOpacity>
  
              <Divider style={{ backgroundColor: '#707070', marginTop: '5%',borderWidth:0.3,width: 300 }} />
              {!this.state.expanded ? (
                <TouchableOpacity
                  onPress={this.changeLayout}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '4%',
                    width:300,
                    justifyContent: 'space-between',
                  }}>
                    <View 
                    style={{
                      flexDirection: 'row',
                     width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                    }}
                    >
                      <Image source={require('../assets/img/collection.png')} />
                      <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 3 }}>Collections</Text>
                    </View>
  
                    <Image style={{ alignSelf: 'center',  }} source={require('../assets/img/down_arrow.png')} />
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
                        <Image style={{ backgroundColor: '#fff' }} source={require('../assets/img/collection_green.png')} />
                        <Text style={{ fontSize: 17, color: '#ffff', marginLeft: '5%', width: width / 3 }}>Collections</Text>
                      </View>
                      <TouchableOpacity
                        // style={{ marginLeft: '-15%', }}
                        onPress={this.changeLayout}>
                        <Image style={{ alignSelf: 'center', }} source={require('../assets/img/up_arrow_white.png')} />
                      </TouchableOpacity>
                    </View>
                    <ScrollView persistentScrollbar={this.state.collection.length>2?true:false}>
                     <FlatList
                          data={this.state.collection}
                          keyExtractor={(item,index)=>index.toString()}
                          renderItem={({item})=>(
                              <View>
                              <TouchableOpacity
                                 style={{backgroundColor:'#f0f0f0',width:300,}}
                                   onPress={() => this.collectionBook(item.title,item.id)}>
                                   <View style={{
                                     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                   }}>
                                     <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.title}</Text>
                                     <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} />
                         <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                                 <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                         </TouchableOpacity> 
                         </View>
                         </TouchableOpacity>
                                 <Divider style={{ backgroundColor: '#707070',borderWidth:0.2 }} />
                         {this.state.sectionExpand && item.id==this.state.secCollid
                        //  item.id==this.state.secCollid
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
                             style={{backgroundColor:'#f0f0f0',width:300,}}
                               onPress={() => this.secBook(item.Title,item.CollectionsID,item.SectionID,item)}
                               >
                             <View style={{
                                 flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                               }}>
                                 <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 230 }}>{item.Title}</Text>
                                 {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                     {/* <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                             <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                     </TouchableOpacity>  */}
                     </View>
                     </TouchableOpacity>
                             <Divider style={{ backgroundColor: '#707070',borderWidth:0.2 }} />
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
                  </View>
                )}
  
              <TouchableOpacity
                onPress={() => this.readlaterClick()}>
  
                <View style={{
                  flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                  justifyContent: 'center', alignSelf: 'center'
                }}>
                  <Image source={require('../assets/img/readlater2.png')} />
                  <Text style={{ fontSize: 17, color: '#707070', marginLeft: '5%', width: width / 2.6 }}>Read Later</Text>
                  <Divider style={{ backgroundColor: '#707070' }} />
  
                </View>
              </TouchableOpacity>
  
            </View>
          </Modal1>
   </ScrollView>
   <Modal1 isVisible={this.state.loading}
         
         // onBackdropPress={() => this.setState({ loading: true })}
         >
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal1>
                 {/* <Modal
             animationType="slide"
             transparent
              visible={this.state.readlaterPopup}
                        onRequestClose={() => {
                            console.log('Modal has been closed.');
                        }}> */}
                        {this.state.readlaterPopup?
                        <View style={{
                            left: 0, right: 0, bottom: 0, position: 'absolute',
                            height: '8%',
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#27A291',
                        }}>
                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center',width:width/1.4 }}>{!this.state.exists?"Added to ReadLater":"Already Added in ReadLater"}</Text>
                           
                                <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
                        </View>
                        :null}
 </SafeAreaView>
  )
 }
}

const styles = StyleSheet.create({
  topview:{
    height: '10%',
    width:width,
     backgroundColor: '#ffff', 
    elevation:3,
    flex:0.5,
    flexDirection: 'row',
    alignItems:'center',
     justifyContent: 'space-around',
    //  top:0,
    //  left:0,
    //  right:0,
    //  flex:1,
     position:'absolute',
     padding:'2%'
  },
  touchableButton: {
    position: 'absolute',
    right: 55,
    height: 25,
    width: 35,
    padding: 2
  },
  input:{
    width:width-80,
    backgroundColor:"#fff",
   
    padding:10,
    margin:5
  },
    modal: {
        alignItems: 'center',
        height:"50%",
        width: 300,
    },
    containerStyle: {
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
    },
    sliderContainerStyle: {
        borderRadius: width,
        width: width * 2,
        height: width * 2,
        marginLeft: -(width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
    },
    active: { height: 4, width: 20, backgroundColor: 'green' },
    inactive: { height: 2, width: 20, backgroundColor: '#707070' },
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
        alignItems: 'center'

    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        // marginTop:'10%',
        justifyContent: "center",
        alignItems: "center",
    },
    overlay2: {
        // marginTop:'10%',
        // position:'absolute',
        // top:0,
        marginTop: '-45%',
        justifyContent: "center",
        alignItems: "center",
    },
    overlay1: {
        // backgroundColor:'skyblue',
        justifyContent: "center",
        alignItems: "center",
        // marginBottom:'5%'
        // marginBottom:'5%'
    },
    logo: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: 160,
        height: 52
    },
    backdrop: {
        flex: 1,
        marginTop: '-80%'
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    tabs: {
        flexDirection: 'row',
        padding: '2%',
        borderBottomColor: 'gray',
        marginVertical: 5,
        marginHorizontal: 5 * 2,
    },
    textInputStyle: {
          width: width/1.2,
          // borderBottomWidth: 0.5,
          // borderBottomColor: 'gray',
        },
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
      collSecPopup:() =>dispatch({type:'COLLSEC_POPUP'})

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchExplore);
