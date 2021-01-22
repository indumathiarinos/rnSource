import React, { Component } from 'react'
import {
    View,SafeAreaView, BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity,TextInput,LayoutAnimation, Platform, UIManager, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';
import HtmlView from 'react-native-htmlview';
const width = Dimensions.get('window').width;
import { connect } from "react-redux";
const htmlview=`<h4><p class="center">We’re thrilled to have you onboard as a creator. We will review your request and will get back to you within 2 working days.</p></h4>`;
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class ReportThankYou extends Component {
    
    constructor() {
        super();
       
        this.state = { expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Please specify'
        }
       
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true);
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
          changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
      }
      submitBtn=()=>{
        this.setState({btnActive:!this.state.btnActive})
        this.props.navigation.navigate('thankyou')
      }
      backpress=()=>{
        //    console.log('before set',this.props.nav)
           this.props.changeNavNews();
           this.props.navigation.navigate('newsfeed')
        //    console.log('after set',this.props.nav);
       }
    render() {
        var checked = this.state.boolean? require('../assets/img/uncheck.png'):require('../assets/img/check.png') ;

        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 2,backgroundColor:'#fff' }}>
                <View style={styles.headerRow}>
                      {/* <View style={styles.headerRow}> */}
                      <Text style={styles.heading}>Report</Text>
                     <TouchableOpacity
                     onPress={()=>this.backpress()}
                >
                       <Image
                            style={{ alignSelf: 'center',width:50,height:50 }} 
                            source={require('../assets/img/close.png')} />
                     </TouchableOpacity>
                    
                      {/* </View> */}
                       
                </View>
                
                <ScrollView>
                <View style={{flex:1,alignItems:'center'}}>
                    <Image style={{width:width}} source={require('../assets/img/thankyou.png')} /> 
                
                <Text style={styles.textTitle}>Dear noobmaster69</Text>
            
                  
                <Text style={styles.centerText}>We’re thrilled to have you onboard as a creator. We will review your request and will get back to you within 2 working days.</Text>
              {/* <View style={styles.btnContainer}> */}
             <LinearGradient style={styles.btnview1} 
             colors={['#24D4BC', '#27A291']} 
             >
                    <TouchableOpacity

                    onPress={()=>this.props.navigation.navigate('newsfeed')}>
                    <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Continue</Text>
                </TouchableOpacity>    
                </LinearGradient>      
                     </View>            
                {/* </View> */}
                </ScrollView>
          
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    btnContainer:{
        alignItems:'center',
        margin:'2%'

    },
    btnview1: {
        alignItems:'center',
        width:width/1.2,
        justifyContent:'center',
          height:50,
        borderRadius:30,

      },
    centerText:{
        fontSize:16,
        textAlign:'center',
        margin:'5%'
    },
    
    headerRow:{
        height: '8%',
        // flex:0.1,
        paddingTop:'5%',
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
    textTitle:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        padding:'5%',
    },
   
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(ReportThankYou);
