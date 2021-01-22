import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  BackHandler,
  ImageBackground,
  FlatList,
  AsyncStorage
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Tooltip } from 'react-native-elements';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-elements';
import { connect } from "react-redux";
import HTMLView from 'react-native-htmlview';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class SeriesFeed extends Component {
  constructor() {
    super();
  this.state = {
        showlikeImg: false,
    loading:true,
    gettypeid:'',
    getpostid:'',
    feedData:''

  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('typeid').then((value) => this.setState({ gettypeid : value })).done();
    AsyncStorage.getItem('postid').then((value) => this.setState({ getpostid : value })).done();
    this.CheckConnectivity();
    // { this.getData() }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  getData() {
    setTimeout(() => {
      {this.exploredata(this.state.getpostid)}
      console.log('get postid in seriesview book page ',this.state.getpostid)
        // { this.exploredata(this.state.``` gettypeid, this.state.getpostid) }
    }, 1000)
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

exploredata(postid) {
  // {"TypeID":"1","Post_PageID":"3"}
  // console.log('dsflkajdkfksd ',typeid,postid)
  var json = JSON.stringify({
    // "Post_PageID":"188"
          "Post_PageID":postid
  });
  fetch("http://162.250.120.20:444/Login/SeriesFeed",
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
          this.setState({ feedData: responseJson,loading:false})
          console.warn(responseJson)

        })
        .catch((error) => {
            console.warn(error);
        });
      }

  handleBackButtonClick() {
    this.backpress()
    return true;
  }
  
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress}>View less</Text>
    )
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Read more
          </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
       <TouchableOpacity
       onPress={()=>this.props.navigation.navigate('report')}>
       <View style={styles.info1}>
          <Image style={{ marginRight: '10%' }} source={require('../assets/img/flag.png')} />
          <Text style={styles.text1}>Report</Text>
        </View>
       </TouchableOpacity>
      
        <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
          Show less
          </Text>
      </View>

    );
  }
  backpress=()=>{
    //    console.log('before set',this.props.nav)
       this.props.changeNavNews();
       this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
   }
   fullcard({ item }) {
    const like=require('../assets/img/like.png');
    const unlike=require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg? like:unlike ;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
      <View style={{ width: width, flex: 1,backgroundColor:'#fff', }}>
       
            <View style={{ flexDirection: 'row',marginLeft:'5%',marginRight:'5%',marginTop:'5%',justifyContent:'space-between', }}>

          <View style={{flexDirection:'column',}}>
          <Text style={{ fontSize: 14, color: '#707070',textAlign:'left'}}>{item.created_at}</Text>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold',textAlign:'left'}}>{item.page_url}</Text>
          </View>
         <Image source={require('../assets/img/3dots_gray.png')}/>
          </View>
          <View style={{alignItems:'center',marginTop:'2%',marginBottom:'2%'}}>
          {/* <Image
              style={{width:width,height:300,alignSelf: 'center',marginTop:'2%',resizeMode:'cover' }}
              source={{uri:item.background_image}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          /> */}
           <HTMLView value={item.page_description} />
        {/* <Text>{item.page_description}</Text> */}

          </View>
            
        
          
          {/* <Divider style={{ backgroundColor: 'gray', borderWidth: 0.7, borderColor: 'gray' }} /> */}
          <View style={{ flexDirection: 'row', justifyContent: "space-between" ,padding:'3%',paddingLeft:'5%',paddingRight:'5%'}}>
          <TouchableOpacity
          style={{padding:'1%'}}
            onPress={ () => this.setState({ showlikeImg: !this.state.showlikeImg }) } 
          >
            {/* {this.renderImage} */}
            <Image
    
      source={ imgSource }
    />
          </TouchableOpacity>
           {/* <Image
            onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
           source={imgSource}/> */}
            <TouchableOpacity
          style={{padding:'1%'}}
            onPress={ () => this.props.navigation.navigate('comments')} 
          >
  <Image
            source={require('../assets/img/comment1.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
          style={{padding:'1%'}}
            onPress={ () => this.props.navigation.navigate('createCollection')} 
          >
           <Image source={require('../assets/img/plus.png')}/>
           </TouchableOpacity>
           <TouchableOpacity
          style={{padding:'1%'}}
            // onPress={ () => this.props.navigation.navigate('comments')} 
          >
           <Image source={require('../assets/img/share.png')}/>
         </TouchableOpacity>
            {/* <EIcons
              name='share'
              size={30}
              color='#707070'
            // color={item.like ? "#EA4184" : "#dbdbdb"}
            // onPress={() => this.pressIcon(item)}
            />  */}
          </View>
          <Divider style={{color:'@707070'}}/>
      </View>);
  }
  // filter_page = () => {
  //   // let data = [ { id: 1, name: 'Mike', city: 'philps', state:'New York'}, { id: 2, name: 'Steve', city: 'Square', state: 'Chicago'}, { id: 3, name: 'Jhon', city: 'market', state: 'New York'}, { id: 4, name: 'philps', city: 'booket', state: 'Texas'}, { id: 5, name: 'smith', city: 'brookfield', state: 'Florida'}, { id: 6, name: 'Broom', city: 'old street', state: 'Florida'}, ]
  //   data_fav = this.state.articles.filter(function (item) {
  //     return item.like == true;
  //   }).map(function ({id,img,title,like,date,htmlContent} ) {
  //     return { id,img,title,like,date,htmlContent};
  //   });
  //   console.log(data_fav);
  //   console.log("state articles", this.state.articles);

  // }
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
            pass_data: 1,
        })}
          >
            <Image source={require('../assets/img/filter.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
           <TouchableOpacity
           onPress={()=>this.props.navigation.navigate('seriesViewBook')}>
               <Text style={styles.headerText}>
              Description</Text>
            </TouchableOpacity>
            <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
            <TouchableOpacity 
    //    onPress={() => this.props.navigation.navigate('seriesFeed')}
            >
<Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}
              >
              Feed</Text>
            </TouchableOpacity>
              </LinearGradient>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('seriesArchives')}
            >
              <Text style={styles.headerText}

              >Archives</Text>
            </TouchableOpacity>

            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity onPress={() => this.backpress()}>
          <Image
              style={{ alignSelf: 'center',width:50,height:50 }} 
              source={require('../assets/img/close.png')} />
                </TouchableOpacity>
        </View>
    
      <FlatList
          legacyImplementation={false}
          data={this.state.feedData}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          // style={{ marginTop: '1%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
 <Modal isVisible={this.state.loading}>
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

export default connect(mapStateToProps,mapDispatchToProps)(SeriesFeed);

