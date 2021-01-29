import React, { Component } from 'react'
import { View,SafeAreaView,AsyncStorage, FlatList,Modal, RefreshControl, BackHandler, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/fullimg.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import { Avatar, Divider } from 'react-native-elements';
import EIcons from 'react-native-vector-icons/Entypo';
// import ReadMore from 'react-native-read-more-text';
import ReadMore from './Readmore';

import { connect } from "react-redux";
import Modal1 from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class Offline extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          id: 0,
          bgcolor: "#569BE0",
          img: img1,
          title: "Ainaini Rahin",
          subtitle: "Created a page on 4 May 2019"
        },
      ],
      showlikeImg: false,
      offl: [],
      loading: true,
      filterdata: [],
      modalVisible: false,
      deletedName:'',
      getuserid:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
    // {this.getData()} 
    this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
  getData(){
    setTimeout(() => {
      {this.exploredata(this.state.getuserid)}
    }, 1000);
  }
  handleBackButtonClick() {
    this.backpress()
    return true;
  }
  exploredata(userid) {
    var json = JSON.stringify({
      'UserId': userid,
    });
    fetch("http://162.250.120.20:444/Login/Offline",
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
        this.setState({ offl: responseJson, loading: false })
        console.warn(responseJson)
        // console.warn("offfl")
        // console.log('offline data ',responseJson)

        //alert(this.state.data.status)  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  showModal = () => {
    this.setState({
      modalVisible: true
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
    }, 5000);
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
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end", paddingLeft: '1%', textDecorationLine: 'underline', }} onPress={handlePress}>
        Read more
      </Text>
    );
  }
  backpress = () => {
    //    console.log('before set',this.props.nav)
    this.props.navigation.goBack();
    // this.props.changeNavNews();
    // this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
  }
  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end", marginTop: '-5%', backgroundColor: '#fff', paddingLeft: '1%', textDecorationLine: 'underline', }} onPress={handlePress}>
        Show less
      </Text>
    );
  }
  removeItem(item1){
    this.setState({deletedName:item1.Title});
    this.state.filterdata.push(item1);
    const filteredList = this.state.offl.filter((item) => item.Title !== item1.Title);
    this.setState({offl:filteredList});
    this.showModal();
  }
  
  fullcard({ item }) {
    const like = require('../assets/img/like.png');
    const unlike = require('../assets/img/unlike.png');
    var imgSource = this.state.showlikeImg ? like : unlike;
    // var imgSource = this.state.showlikeImg? require('../assets/img/like.png') : require('../assets/img/unlike.png');
    return (
      <View style={{ width: width, flex: 1, backgroundColor: '#fff', }}>
        {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: '5%',marginTop:'2%' }}>{item.Title}</Text> */}
        <TouchableOpacity 
        // onPress={()=>this.props.navigation.navigate('viewBook')}
        ><View style={{marginLeft:'7%',marginRight:'7%',marginTop:'2%'}}>
              <Text style={[styles.text2,{fontSize:16,width:width/1.2}]}>{item.Title}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%' }}>
          {/* <View style={{flexDirection:'column',}}> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", }}>
            <Image style={{ marginRight: '4%', alignSelf: 'center' }} source={require('../assets/img/logo_border.png')} />
            <Text style={styles.text2}>{item.Title}</Text>
          </View>
          {/* </View> */}

          <TouchableOpacity onPress={() => this.removeItem(item)}>
            <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/trashicon.png')} />
          </TouchableOpacity>
         </View>
         </TouchableOpacity>
        <TouchableOpacity onPress={()=>item.image!=''?('viewBook'):null}>           
        <Image
          style={{ width: width + 150, height: height / 1.7, alignSelf: 'center', resizeMode: 'cover', marginTop: '2%' }}
          source={item.image}
          onPress={() => console.log("Works!")}
          activeOpaci ty={0.7}
        />
        </TouchableOpacity>
        <View style={{ backgroundColor: '#F9F9F9', elevation: 2, paddingLeft: '5%', paddingRight: '5%', paddingTop: '2%', paddingBottom: '2%' }}>
          {/* <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}
            onReady={this._handleTextReady}>
            <Text style={styles.description}>
              {item.Content}
            </Text>
          </ReadMore> */}
          {item.Content.length>150?
          <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
              <Text numberOfLines={3} style={styles.description}>
              {item.Content}
            </Text>
            </ReadMore>
            : 
            <Text style={styles.description}>
              {item.Content}
            </Text>}
          {/* <Text style={{fontSize:17,marginLeft:'5%',marginRight:'5%',padding:'2%'}}
          numberOfLines={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum quam quis semper tempus. Vestibulum ornare, augue a interdum consequat, est urna dignissim magna, at tempus magna leo a nulla. Nulla id luctus tortor, et cursus leo. Integer facilisis et eros vitae sodales. Duis sapien mi, lacinia eu nunc ac, condimentum ultrices est. Vestibulum ac justo non ipsum tristique ultricies quis non dolor. Nullam bibendum nulla ac lorem tincidunt, vel ultricies nulla semper. Duis nec magna sit amet ante vestibulum aliquam id sit amet felis. Mauris molestie leo lacus, at vulputate metus dapibus vel. Mauris efficitur convallis eros, vitae euismod velit sagittis vel. Integer egestas, nunc ac lobortis bibendum, nisi elit fringilla magna, sit amet eleifend sapien risus id lacus.          </Text>
          <Text style={{color:'#27A291',textDecorationLine: 'underline',alignSelf:'flex-end',marginRight:'5%',marginTop:'-7%',backgroundColor:'#F9F9F9'}}>Read more</Text> */}

        </View>
        <Divider style={{ backgroundColor: 'gray', borderWidth: 0.3, borderColor: 'gray' }} />

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
  render() {
    const { list } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
     
     <View style={styles.staticheader}>
          <View style={{flexDirection:'row',width:width-50,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
          style={[{ backgroundColor: '#27A291',borderRadius:10}]}
            onPress={() => this.props.navigation.navigate('mainpage')}>
            <Text style={{  padding: '5%',
                  fontSize: 14,
                  color: 'white',
                  fontFamily:'AzoSans-Medium',color:'white'}}
            >Offline</Text>
          </TouchableOpacity>
        
      </View>
      <TouchableOpacity onPress={()=>this.backpress()}>
          <Image style={{ alignSelf: 'center',width:50,height:50 }} source={require('../assets/img/close.png')} />

      </TouchableOpacity>
      </View>


        <FlatList
          legacyImplementation={false}
          data={this.state.offl}
          navigation={this.props.navigation}
          renderItem={this.fullcard.bind(this)}
          enableEmptySections={false}
          style={{ marginTop: '1%' }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />

        <Modal1 isVisible={this.state.loading}
         // onBackdropPress={() => this.setState({ loading: true })}
         >
           <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
        </Modal1>
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
           
                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Remove - {this.state.deletedName} </Text>
            
                <TouchableOpacity style={{ marginTop: '2%', alignSelf: 'flex-end', marginRight: '2%' }}
                // onPress={()=>this.undoFunc(item)}
                >
                  <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline' }}>Undo</Text>
                </TouchableOpacity>
             
          </View>
        </Modal>

      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  description: {
    fontSize: 15,
  },
  headerRow:{
    backgroundColor:'#27A291',
    borderRadius:10,
    // width: width - 40
  },
  text2: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    width: width / 2,

    // alignSelf:'center'
  },

  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  staticheader:{
    flexDirection:'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '8%',
     backgroundColor: '#ffff',
     elevation:1,
     borderBottomColor:'#707070'


  },
})
function mapStateToProps(state) {
  return {
    nav: state.apiReducer.nav,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Offline);
