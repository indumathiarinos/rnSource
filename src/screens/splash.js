import React from 'react';
import {AsyncStorage,View, Text, Dimensions, StyleSheet, Image, StatusBar, ImageBackground } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import { SimpleAnimation } from 'react-native-simple-animations';
console.disableYellowBox = true;
import { connect } from "react-redux";

class SplashScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
      animating: false,
      align: 'center',
      alignsecond: false,
      loginFields:false
    };
    setTimeout(
      () =>
        this.setState({ align: 'flex-start' }, function () {
          this.setState({
            alignsecond: true,
          });
        }),
      2000
    );
  }
  componentDidMount(){
    AsyncStorage.getItem('loginData').then((value)=>{this.setState({loginFields:value})})
    console.log('checklogin value',this.props.checklogin)
    setTimeout(
      () =>
      {this.props.checklogin ==0 ? this.props.navigation.navigate('Onboarding'):this.props.navigation.navigate('mainpage') },
      5000
    );
    // {this.getData()}
  }
  mainpage(){
    // this.props.changeNavRec();
    this.props.navigation.navigate('mainpage');
  }
  // getData(){
  //   console.log('login data ',this.state.loginFields)
  //   setTimeout(() => {
  //     alert(this.state.loginFields)

  //     setTimeout(
  //       () =>
  //       {this.props.checklogin ? this.props.navigation.navigate('Onboarding'):this.props.navigation.navigate('MainpageTabs')},
  //       3000
  //     );
  //   }, 5000);
  // }
  render() {
    return (
 
      <ImageBackground
      style={{width:120, height:90, resizeMode: 'contain'}}
          source={require('../assets/img/back.png')}
        // source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'}}
        style={styles.backgroundImage} >
          <StatusBar backgroundColor={'#fff'} hidden={false} barStyle='light-content' />
        <View
          style={styles.container}>
 
<Image style={{width:60, height:60,marginTop:screenWidth/5,padding:30}}
          source={require('../assets/img/header.png')}
        />
 
{/* <SimpleAnimation delay={500}
          direction={"up"}
          distance={1000}
          duration={1000}
          friction={2}
          movementType={"slide"}
          staticType={null}>
    <Text>Hello, world!</Text>
</SimpleAnimation> */}
 
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              Page
              </Text>
            {!this.state.alignsecond ? null : (
              <View>
                  <SimpleAnimation delay={500}
          direction={"up"}
          distance={1000}
          duration={250}
          friction={2}
          movementType={"slide"}
          staticType={null}>
                <Text
                  style={{ color:'#27A291', fontSize: 37, fontWeight: 'bold' }}>
                  Vio
    </Text>
                   {/* {this.props.navigation.navigate('Onboarding')} */}
   
    </SimpleAnimation>

 
              </View>
            )}
          </View>
 
        </View>
      </ImageBackground>
 
    );
  }
}
 
var styles = StyleSheet.create({
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange"
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop:10
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  logoDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black'
  },
  // container: {
  //     flex: 1,
  //     justifyContent:'center',
  //     // alignItems:'center'
 
  // },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    // backgroundColor: "orange"
    // or 'stretch'
  },
 
});
 
function mapStateToProps(state) {
  return {
    checklogin: state.apiReducer.checklogin,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savelogin: ()=> dispatch({type:'CHECKLOGIN'})

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);;