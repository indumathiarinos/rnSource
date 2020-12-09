import React, { Component } from 'react'
import {
  View,BackHandler, ImageBackground, TextInput, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid
} from 'react-native'
import {Avatar,Divider} from 'react-native-elements';
import { connect } from "react-redux";

const width = Dimensions.get('window').width;
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class SocialMedia extends Component {
  constructor(props){
    super(props);
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
      this.props.navigation.goBack();
      //  this.props.navigation.navigate('mainpage');
   }
  render() {

    return (
      <View style={styles.container}>
      
     <Text numberOfLines={3}
     style={styles.text}>SOCIAL MEDIA APP 
     OR
      EXTERNAL WEBSITE</Text>
     <View style={styles.bottomline}>
         <Divider style={{color:'#00000028',marginTop:'2%',marginBottom:'2%'}} />
      <TouchableOpacity
      onPress={()=>this.backpress()}>

        <View style={{flexDirection:'row',alignItems:'center',paddingLeft:'5%'}}>
            <Image source={require('../assets/img/left_arrow.png')} />
            <Text style={styles.bottomText}>Back</Text>
        </View>
        </TouchableOpacity>

     </View>
      </View>
    
        )
      }
    
    }
const styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:'#ffff',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
 },
 text:{
     fontSize:26,
     color:'#27A291',
     textAlign:'center',
     margin:'5%'
 },
 bottomline:{
     bottom:15,
     left:0,
     right:0,
     position:'absolute',
 },
 bottomText:{
     color:'#707070',
     fontSize:18,
     marginLeft:'2%'
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

export default connect(mapStateToProps,mapDispatchToProps)(SocialMedia);