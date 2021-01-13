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
      
      <View style={styles.topview}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid='#707070'
          placeholder="Search"
        />
        <Icon
          style={{ marginLeft: '-8%' }}
          size={20}
          name='ios-search'>

        </Icon>
      </View>
      <TouchableOpacity
              onPress={()=>this.backpress()}>
      <Image
        style={{ alignSelf: 'center' }}
       source={require('../assets/img/close.png')}/>
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
    // height: '10%',
     backgroundColor: '#ffff', 
    elevation:3,
    flexDirection: 'row',
    alignItems:'center',
     justifyContent: 'space-around',
     top:0,
     left:0,
     right:0,
     flex:1,
     position:'absolute',
     padding:'2%'
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
    marginTop:'5%'
  },
  data1:{
    color:'#707070',
    fontSize:19,
    textAlign:'center',
    padding:'4%',
    width:width


  },
  data2:{
    color:'#ffff',
    fontSize:19,
    textAlign:'center',
    padding:'4%',
    width:width


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
  
      headline:{
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center',

        marginTop:'5%'

      },
      headline1:{
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'5%',
        width:width
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