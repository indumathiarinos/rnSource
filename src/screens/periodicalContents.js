import React, { Component } from 'react'
import { View,SafeAreaView, FlatList, RefreshControl, StyleSheet,BackHandler, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import {Avatar,Divider} from 'react-native-elements';
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var imgSource;
class PeriodicalContents extends Component {
  constructor() {
    super();
  this.state = {
        list1: [
        { name:'Packaging Design - Bite Me: Packaging Insults Chewers as They Grab a Piece of Tooth-Shaped... Gum' },
        { name:'Zero-Waste Packaging for Liquids is Made Entirely of Soap' },
        { name:'Islands of Wood Float Amidst Sea of Glass in New ‘Archipelago’ Furniture by Greg Klassen' },
      
    ],
  
}
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.backpress()
      return true;
} 

renderItem_card({ item }) {
  return (
  <View style={{flex:1,justifyContent:'center',}}>
    <Text style={{color:'black',padding:'2%',textAlign:'left'}}>{item.name}</Text>
    <Divider style={{color:'#707070',width:width-50}} />
  </View>
  )
}
backpress=()=>{
  //    console.log('before set',this.props.nav)
     this.props.changeNavNews();
     this.props.navigation.navigate('MainpageTabs')
  //    console.log('after set',this.props.nav);
 }
render() {
  const like = require('../assets/img/like.png');
  const unlike = require('../assets/img/unlike.png');
  var imgSource = this.state.showlikeImg ? like : unlike;
  const listCount=this.state.list1.length;

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: '#fff' }}>
      {/* <View style={styles.staticheader}> */}
      <View style={styles.staticheader}>
        <TouchableOpacity
        // onPress={()=>this.props.navigation.navigate('newsfeed')}
        >
          <Image source={require('../assets/img/filter.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
         
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('viewBook')}>
            <Text style={styles.headerText}

            >Description</Text>
          </TouchableOpacity>
         
        
          <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
          <TouchableOpacity 
            onPress={this.headerBtnClk}>
            <Text style={{
              padding: '5%',
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold'
            }}

            >Contents</Text>
          </TouchableOpacity>
            </LinearGradient>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('books_pin')}>
            <Text style={styles.headerText}
            >Pins</Text>
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
      {/* <View style={styles.header}>
        </View> */}

  {/* <FlatList
            data={this.state.list}
            extraData={this.state}
            renderItem={this.renderItem_card.bind(this)}
                      
            keyExtractor={(item, index) => index.toString()}
          /> */}

<View style={{flex:1}}>

<FlatList
    data={this.state.list1}
    renderItem={({ item }) =>
        <View style={{justifyContent:'center',alignContent:'center',}} key={item.name} >
   <Text style={{color:'black',textAlign:'left',fontSize:16,marginTop:'4%',marginBottom:'4%',width:width-50,}}>{item.name}</Text>
    <Divider style={{color:'#707070',width:width-50,}} />    
        </View>
    }
    contentContainerStyle={{alignItems:'center',marginTop:'2%'}}
    keyExtractor={(item, index) => index}/>
</View>
     
      <View style={styles.bottomBar}>
        <TouchableOpacity 
        style={styles.bottomBtn}>
          <Text style={styles.bottomText}> {listCount} Sections</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
bottomBtn:{
  width:width,
  alignItems:'center',
  alignContent:'center',
  backgroundColor:'#27A291',
  justifyContent:'center',
  // padding:'1%'

},
bottomText:{
  color:'#ffff',
  fontSize:18
},

headerText: {
  padding: '5%',
  fontSize: 16,
  fontWeight: 'bold'
},


staticheader: {
  paddingLeft: '2%',
  flexDirection: 'row',
  alignItems: 'center',
  // height: '10%',
  backgroundColor: '#ffff',
  elevation: 1,
  borderBottomColor:'#707070'


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

body: {
  flex:1,
},


});
function mapStateToProps(state){
  return{
  nav:state.nav,
  }
}


function mapDispatchToProps(dispatch){
  return{
      changeNavRec:()=>dispatch({type:'CHANGE_NAV_REC'}),
      changeNavNews:()=>dispatch({type:'CHANGE_NAV_NEWS'})
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PeriodicalContents);
