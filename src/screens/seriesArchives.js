import React, { Component } from 'react'
import { View,BackHandler,SafeAreaView,AsyncStorage, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/seriesPage.png';
import img3 from '../assets/img/cover3.png';
import {Avatar,Divider} from 'react-native-elements';
import Modal1 from 'react-native-modal';
import EIcons from 'react-native-vector-icons/Entypo';
import ReadMore from 'react-native-read-more-text';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import HTMLView from 'react-native-htmlview';
import NetInfor from '@react-native-community/netinfo';

console.disableYellowBox = true;
const months=[
  {"No":1,"month":"January"},
  {"No":2,"month":"February"},
  {"No":3,"month":"March"},
  {"No":4,"month":"April"},
  {"No":5,"month":"May"},
  {"No":6,"month":"June"},
  {"No":7,"month":"July"},
  {"No":8,"month":"August"},
  {"No":9,"month":"September"},
  {"No":10,"month":"October"},
  {"No":11,"month":"November"},
  {"No":12,"month":"December"},

]
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class SeriesArchives extends Component {
  constructor() {
    super();
     this.state = {
        list: [
        {
            id: 0,
            bgcolor: "#569BE0",
            img: img1,
            title: "Ainaini Rahin",
            Issues:'Issue 5',
            Pages:'Pages 5',
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 1,
            bgcolor: "#7C3BD3",
            img: img2,
            title: "Ainaini",
            Issues:'Issue 5',
            Pages:'Pages 5',
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 2,
            bgcolor: "#EB9A17",
            img: img3,
            title: "Ainaini Rahin",
            Issues:'Issue 5',
            Pages:'Pages 5',
            subtitle: "Created a page on 4 May 2019"
        }
    ],
    list1: [
        {
            id: 0,
            bgcolor: "#569BE0",
            img: img2,
            title: "Ainaini Rahin",
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 1,
            bgcolor: "#7C3BD3",
            img: img2,
            title: "Ainaini",
            subtitle: "Created a page on 4 May 2019"
        },
        {
            id: 2,
            bgcolor: "#EB9A17",
            img: img2,
            title: "Ainaini Rahin",
            subtitle: "Created a page on 4 May 2019"
        }
    ],
    showlikeImg: false,
    loading:true,
    archivesData:'',
    getpostid:'',
    gettypeid:'',
    date:'',
    getCreatedAt:''
     
}
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
      AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid : value })).done();
      AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid : value })).done();
      this.CheckConnectivity();
      // {this.getData()}
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
      this.backpress()
          return true;
    }  
    getData() {
      setTimeout(() => {
        {this.exploredata(this.state.getpostid)}
        console.log('get postid in seriesview book page ',this.state.getpostid)
          // { this.exploredata(this.state.gettypeid, this.state.getpostid) }
      }, 1000)
  }
  
  exploredata(postid) {
    // {"TypeID":"1","Post_PageID":"3"}
    // console.log('dsflkajdkfksd ',typeid,postid)
    console.log('ser archives postid',this.state.postid,postid)
    var json = JSON.stringify({
      // "Post_PageID":"188"
            "Post_PageID":postid
    });
    fetch("http://162.250.120.20:444/Login/SeriesArchives",
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
            this.setState({ archivesData: responseJson,loading:false})
            for(let i=0;i<this.state.archivesData.length;i++){
                this.setState({getCreatedAt:responseJson[i].created_at})
              // let newdate=this.state.date.push(responseJson[i].created_at);
              // console.log('new date and state date ',newdate," v",this.state.date)
                  // this.setState({data: })
            }
            console.warn(responseJson)
  
          })
          .catch((error) => {
              console.warn(error);
          });
        }
// renderImage(){
//   // const like=require('../assets/img/like.png');
//   // const unlike=require('../assets/img/unlike.png');
//   // var imgSource = this.state.showlikeImg? like:unlike ;
//   return (
//     <Image
//       style={ homeStyles.optionsImage }
//       source={ imgSource }
//     />
//   );
// }
_renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={{color: '#27A291', marginTop: 5,alignSelf:"flex-end"}} onPress={handlePress}>
      Read more
    </Text>
  );
}

_renderRevealedFooter = (handlePress) => {
  return (
    <Text style={{color: '#27A291', marginTop: 5,alignSelf:"flex-end"}} onPress={handlePress}>
      Show less
    </Text>
  );
}
  fullcard({ item }) {
    // console.log('created at state ',this.state.getCreatedAt)

    // let res = item.created_at.split(" ",1);
    // let date=res[0].split("/",3);
    // let month=date[1];
    // let year=date[2];
    // let element;
    // for (const key in months) {
    //   if (months.hasOwnProperty(key)) {
    //     if(months[key].No==month){
    //        element = months[key].month;
    //     console.log('ELEMENT IS ',element)
    //     }
        
    //   }
    // }
    const like=require('../assets/img/like.png');
    const unlike=require('../assets/img/unlike.png');    var imgSource = this.state.showlikeImg? like:unlike ;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
      <View style={{ width:width/2,height:height/5, 
      margin:'0.5%'
      }}>
                                  {/* <View style={{width:width/2,height:height/15}}>  */}
                                   <HTMLView 
                                   style={{width:width/2,height:height/6}}
                                    value={item.page_description} ></HTMLView> 
                                  {/* </View> */}
                                  {/* <View style={{width:width/2,height:height/8,
                                    backgroundColor:'pink'
                                    }}> */}
                                  <Text style={{padding:'3%',textAlign:'center',alignSelf:'center',backgroundColor:'#fff',width:width/2}}>{item.page_url}</Text> 
                                  {/* </View> */}

                    {/* <Text numberOfLines={6} style={{margin:'2%'}}>{item.page_description}</Text>            
              <Text style={{textAlign:'center',margin:'5%',alignSelf:'center'}}>{item.page_url}</Text> */}

      </View>);
  }
  getmonth=(value)=>{
    console.log('value is ',value)
    let res = value.split(" ",1);
    let date=res[0].split("/",3);
    let month=date[1];
    let year=date[2];
    let element;
    for (const key in months) {
      if (months.hasOwnProperty(key)) {
        if(months[key].No==month){
           element = months[key].month;
        console.log('ELEMENT IS ',element)
        }
        
      }
    }
    return element;
  }
  getyear=(value)=>{
    let res = value.split(" ",1);
    let date=res[0].split("/",3);
    let year=date[2];
  
    return year;

  }
  backpress=()=>{
    //    console.log('before set',this.props.nav)
       this.props.changeNavNews();
       this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
   }
  render() {
    const { list } = this.state;

    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
      <View style={styles.staticheader}>
          <TouchableOpacity
          onPress={()=>  this.props.navigation.navigate('newOldFilter', {
            pass_data: 2,
        })}
          >
            <Image source={require('../assets/img/filter.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width
          
          
          - 60, justifyContent: 'center', alignItems: 'center' }}>
           <TouchableOpacity
           onPress={()=>this.props.navigation.navigate('seriesViewBook')}>
               <Text style={styles.headerText}>
              Description</Text>
            </TouchableOpacity>

            <TouchableOpacity s
       onPress={() => this.props.navigation.navigate('seriesFeed')}
            >
<Text style={styles.headerText}  >
              Feed</Text>
            </TouchableOpacity>
            <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
            <TouchableOpacity 
       onPress={() => this.props.navigation.navigate('seriesFeed')}
            >
<Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}
              >
              Archives</Text>
            </TouchableOpacity>
              </LinearGradient>
            {/* </V
            iew> */}
            {/* </View> */}
          </View>
          <TouchableOpacity onPress={() => this.backpress()}>
          <Image
                style={{ alignSelf: 'center',width:50,height:50 }} 
                source={require('../assets/img/close.png')} />
                                      </TouchableOpacity>
        </View>
        {this.getmonth(this.state.getCreatedAt)!=null?
          <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',}}>
            {/* {element} {year} */}
            {this.getmonth(this.state.getCreatedAt)} {this.getyear(this.state.getCreatedAt)}
            </Text>
          :null } 

      <FlatList
          legacyImplementation={false}
          numColumns={3}
          data={this.state.archivesData}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          style={{ marginTop: '3%',marginLeft:'2%',marginRight:'2%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
 <Modal1 isVisible={this.state.loading}>
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal1>
<View style={styles.bottomBar}>
          <TouchableOpacity 
          style={styles.bottomBtn}>
            <Text style={styles.bottomText}>{this.state.archivesData.length} Issues</Text>
          </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

}
const styles = StyleSheet.create({
    bottomBtn:{
        width:width,
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#27A291',
        justifyContent:'center',   
      },
      bottomText:{
        color:'#ffff',
        fontSize:18
      },
    bottomBar: {
        flexDirection: 'row',
         justifyContent: "center" ,
         height:'8%',
        position:'absolute',
        left:0,
        right:0,
        bottom:0
      },
headerText: {
  padding: '5%',
  fontSize: 16,
  fontWeight: 'bold'
},
staticheader: {
    paddingLeft: '3%',
    // paddingRight:'2%',
    flexDirection: 'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '10%',
    backgroundColor: '#ffff',
    elevation: 1

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

export default connect(mapStateToProps,mapDispatchToProps)(SeriesArchives);