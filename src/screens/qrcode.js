import React, { Component } from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  SafeAreaView,
  AsyncStorage,
  View,
  Image,
  Linking,
} from 'react-native';
import { connect } from "react-redux";

import QRCodeScanner from 'react-native-qrcode-scanner';
console.disableYellowBox = true;
const {width,height} = Dimensions.get('window');

class QrCam extends Component {
  onSuccess = (e) => {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }
  
  constructor(props) {
    super(props);
    this.state={
      avatar:'',
      tab1:false,
      tab2:false,
      tab3:false,
      tab4:true
    
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  AsyncStorage.getItem('profile_img').then((value)=>{this.setState({avatar:value})})

  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  this.backpress()
      return true;
} 
closeDrawer = () => {
  this._drawer._root.close();
}
openDrawer = () => {
  alert('open');
  this._drawer._root.open();
}
toggleTab1() {

  this.setState({
    tab1: true,
    tab2: false,
    tab3: false,
    tab4: false
  });
 this.props.navigation.navigate('mainpage');
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
  // this.props.navigation.navigate('menu')
  this.props.navigation.openDrawer()
}
backpress=()=>{
  this.props.navigation.goBack();
 }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>QR Code Scanner</Text>
                     <TouchableOpacity
                     onPress={()=>this.backpress()}
                >
                         <Image
                            style={{ alignSelf: 'center',width:50,height:50 }} 
                            source={require('../assets/img/close.png')} />
                     </TouchableOpacity>
                    
                      {/* </View> */}
                       
                </View>
                {/* <View style={{flex:1}}> */}
      <QRCodeScanner
        onRead={this.onSuccess}
        // style={{flex:1}}
        containerStyle={{flex:1}}
        // topContent={
        //   <Text 
        //   style={styles.centerText}>
        //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
      {/* </View> */}
       <View style={styles.bottomBar}>
 <TouchableOpacity
     style={styles.tabsss}
     onPress={() => this.toggleTab1()}>
     <Image style={{width:25,height:25}} source={require('../assets/img/logo.png')} />
 </TouchableOpacity>


 <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
 <Image style={{width:50,height:50,marginTop:5}} source={require('../assets/img/library.png')} />
 </TouchableOpacity>
    
 <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
     <Image style={{width:50,height:50,marginTop:5}} source={require('../assets/img/search.png')} />
 </TouchableOpacity>

 <TouchableOpacity style={[styles.tabsss]} onPress={() => this.toggleTab4()}>
     <Image style={{ width: 28, height: 28,borderRadius:28/2,borderColor:'#27A291',borderWidth:1}} source={{uri:this.state.explore_page=='0'? this.state.avatar:'http://pagevio.com/uploads/profile/noimage.jpg'}}></Image>
 </TouchableOpacity>

</View>
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  centerText: {
    flex: 0.2,
    fontSize: 18,
    // padding: 22,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    // marginTop:'2%',
    // padding: 8,
  },
  headerRow:{
    // height: '9%',
    // flex:0.1,
    // paddingTop:'5%',
    flexDirection:'row',
     backgroundColor: '#ffff',
     justifyContent: 'space-around',
     alignItems: 'center', 
     elevation:1,
     borderBottomColor:'#707070'
 
},
heading:{
    width:width-50,
    paddingLeft:50,
    // backgroundColor:'pink',
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'#27A291'
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
tabsss:{
  margin:'2%',
  padding:'2%'
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

export default connect(mapStateToProps,mapDispatchToProps)(QrCam);