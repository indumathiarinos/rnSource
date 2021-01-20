import React, { Component } from 'react'
import {SafeAreaView,
  View, ImageBackground,AsyncStorage, TextInput,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid,Flatlist
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/searchimg1.png';
import img2 from '../assets/img/searchimg2.png';
import img3 from '../assets/img/searchimg3.png';
import { connect } from "react-redux";

import Carousel from '@rhysforyou/react-native-carousel';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class Filter extends Component {
  constructor(props){
    super(props)
  this.state = {
  
    pinsFilter: [
      {
        id: 0,
        title: "Newest",
      },
      {
        id: 1,
        title: "Oldest",
      },
      {
        id: 2,
        title: "Most Popular",
      },
    
     
    ],
    boolean:false,
  }
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  this.arrayholder=this.state.pinsFilter;
}
componentDidMount() {
  AsyncStorage.getItem('back_pins1').then((val) => this.setState({ pinfilter: val })).done();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.backpress();
  return true;
} 
  backpress=()=>{
    //    console.log('before set',this.props.nav)
    // if(this.statte.pinfilter){
    //  {!this.state.pinfilter?null: AsyncStorage.setItem('pin_filter',false)}
    // }
      //  this.props.changeNavNews();
      //  this.props.navigation.navigate('pins')
      this.props.navigation.goBack();
    //    console.log('after set',this.props.nav);
   }
  renderItem_card({ item }) {
    return (
      <View style={{ flex: 0.5, alignSelf: 'center', margin: '2%' }}>

        {/* <View style={{ width: 155 }}> */}
        <Image
          source={item.img}
        ></Image>
        {/* </View> */}
      </View>
    )
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    // console.log('array holder ',this.arrayholder)
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      pinsFilter: newData,
      text: text,
    });
    // console.log('profile data 1 value filtered ',this.state.popupData)
  }
  goToPin=(id)=>{
    if(id==0){
      AsyncStorage.setItem('pinsFilter',"DESC");
    }else if(id==1){
      AsyncStorage.setItem('pinsFilter',"ASC");
    }else if(id==2){
      AsyncStorage.setItem('pinsFilter',"MP");
    }
    console.log(id);
    // AsyncStorage.getItem('pinsFilter').then(val=>alert(val));

    this.props.navigation.navigate('pins');
    
  }

  render() {

    return (
      <SafeAreaView style={{flex:2,backgroundColor:'#ffff'}}>
     <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center',width:width}}>
       <View style={{flexDirection:'row',alignItems: 'center',width:width/1.1,justifyContent:'center'}}>
        <View>
        <TextInput
              style={styles.input}
              onChangeText={value =>this.SearchFilterFunction(value)}
              value={this.state.text}
              underlineColorAndroid={'#707070'}
              // underlineColorAndroid='black'
              placeholder="Search"
            />
                {Platform.OS=='ios'?<View style={{width:width/1.6,alignSelf:'center',height:1,backgroundColor:'#707070',marginBottom:'2%'}} />:null}
          </View>      
          <TouchableOpacity  style={styles.touchableButton} onPress={()=>this.SearchFilterFunction(this.state.text)}>
            <Image style={{width:20,height:20}} source={require('../assets/img/searchicon.png')}/>
            </TouchableOpacity>
</View>
          <TouchableOpacity
              style={{alignSelf:'center',alignItems:'flex-end',}}
              onPress={()=>this.backpress()}>
                  <Image style={{ alignSelf: 'center',width:50,height:50,}} source={require('../assets/img/close.png')} />
          </TouchableOpacity>
         </View>
<View style={{flex:1,marginTop:'16%'}}>
    <Text style={styles.headline}>Filter by</Text>
    <FlatList
    contentContainerStyle={{marginTop:'5%'}}
        data={this.state.pinsFilter}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item})=>{
          return(
            <TouchableOpacity activeOpacity={.7} style={styles.listdata} 
            onPress={()=>{
              this.goToPin(item.id)}}
            >
            {/* <View style={styles.listdata}> */}
            <Text style={styles.data}>{item.title}</Text>
         {/* </View> */}
            </TouchableOpacity>
          )
        }
         
       
        }

      />

    </View>
    
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
      input:{
        width:width/1.6,
        backgroundColor:"#fff",
        fontFamily:'AzoSans-Regular',
        fontSize:16,
        // padding:10,
        margin:5
      },
      touchableButton: {
        position: 'absolute',
        right: 55,
        height: 25,
        width: 25,
        alignItems:'center',
        justifyContent:'center'
        // padding: 2
      },
      data:{
        color:'#707070',
        fontSize:16,
        fontFamily:'AzoSans-Regular',
        textAlign:'center',
        padding:'4%'
      },
      listdata:{
        backgroundColor:'#F9F9F9',
        // marginTop:'5%'
        marginTop:3
      },
      data1:{
        color:'#FFFFFF',
        fontSize:19,
        textAlign:'center',
        padding:'4%'
    
    
      },
      listdata1:{
        backgroundColor:'#27A291',
        marginTop:'5%'
      },
              headerText: {
              padding: '5%',
            fontSize: 16,
            fontWeight: 'bold'
          },
      textInputStyle: {
        marginLeft:'10%',
        fontSize:18,
              width: width - 150
          },
      backgroundContainer: {
              position: 'absolute',
            top: 0,
            bottom: '55%',
            left: 0,
            right: 0,
            alignItems: 'center'
          },
      container: {
              flex: 1,
            alignItems: 'center',
          },
      overlay: {
              justifyContent: "center",
            alignItems: "center",
          },
        
      backdrop: {
              // flex:1,
              marginTop: '-50%',
            // marginTop:'-120%',
            // marginLeft:'-5%'
          },
          headline:{
            fontSize:20,
            fontFamily:'Montserrat-Bold',
            textAlign:'center',
    
            marginTop:'5%'
    
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

export default connect(mapStateToProps,mapDispatchToProps)(Filter);