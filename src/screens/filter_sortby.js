import React, { Component } from 'react'
import {SafeAreaView,
  View, ImageBackground, TextInput, FlatList,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/searchimg1.png';
import img2 from '../assets/img/searchimg2.png';
import img3 from '../assets/img/searchimg3.png';
import Carousel from '@rhysforyou/react-native-carousel';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { connect } from "react-redux";

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class FilterSortBy extends Component {
  constructor(props){
    super(props)
  this.state = {
    boolean:false
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
  this.backpress();
  return true;
} 
  backpress=()=>{
      //  this.props.changeNavNews();
      //  this.props.navigation.navigate('MainpageTabs')
      this.props.navigation.goBack();

   }
  render() {
    var imgSource = !this.state.boolean? require('../assets/img/uncheck.png'):require('../assets/img/check.png') ;

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
    <View style={{flex:1,marginTop:'16%'}}
    >
        <ScrollView  style={{flex:1}}>
            
     
                <View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.headline1}>Sort by</Text>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:'5%',marginLeft:'-15%'}}>

<Text
  style={{textAlign:'center',paddingRight:'2%'}}>All</Text>
  <TouchableOpacity
  onPress={()=>this.setState({boolean:!this.state.boolean})}>
  <Image source={imgSource} />

  </TouchableOpacity>
</View>
</View>

{!this.state.boolean?(
  <View style={styles.listdata}>
  <View style={{flexDirection:'row',alignItems:'center',}}>

  <Text style={styles.data1}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
</View>
):(
    <View style={styles.listdata1}>
      <View style={{flexDirection:'row',alignItems:'center',}}>

      <Text style={styles.data2}>Date Published</Text>

  <TouchableOpacity
  style={{marginLeft:'-9%'}}
  onPress={()=>this.setState({boolean:!this.state.boolean})}>
  <Image source={imgSource} />

  </TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data2}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data2}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data2}>Date Published</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
</View>
)}
     
     
<Text style={styles.headline}>Filter by</Text>

  <View style={styles.listdata}>
      <View style={{flexDirection:'row',alignItems:'center',}}>

      <Text style={styles.data1}>Latest</Text>

  <TouchableOpacity
  style={{marginLeft:'-9%'}}
  onPress={()=>this.setState({boolean:!this.state.boolean})}>
  <Image source={imgSource} />

  </TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Most Relevant</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Most Relevant</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Most Viewed</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
  onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
</View>

    {/* <View style={styles.listdata}>
      <View style={{flexDirection:'row',alignItems:'center',}}>

      <Text style={styles.data1}>Newest</Text>

  <TouchableOpacity
  style={{marginLeft:'-9%'}}
  onPress={()=>this.setState({boolean:!this.state.boolean})}>
  <Image source={imgSource} />

  </TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Oldest</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>A - Z</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
<View style={{flexDirection:'row',alignItems:'center',}}>

<Text style={styles.data1}>Z - A</Text>

<TouchableOpacity
style={{marginLeft:'-9%'}}
  onPress={()=>this.setState({boolean:!this.state.boolean})}>
<Image source={imgSource} />

</TouchableOpacity>
</View>
</View>    */}
      
      </ScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps)(FilterSortBy);