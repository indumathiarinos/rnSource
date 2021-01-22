import React, { Component } from 'react'
import {
    View,SafeAreaView,BackHandler,ImageBackground, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity,TextInput,LayoutAnimation, Platform, UIManager, PermissionsAndroid
} from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import HtmlView from 'react-native-htmlview';
const width = Dimensions.get('window').width;
const htmlview=`<h4><p class="center">We’re thrilled to have you onboard as a creator. We will review your request and will get back to you within 2 working days.</p></h4>`;
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class Report extends Component {
    
    constructor() {
        super();
       
        this.state = { expanded: false,
            boolean:false,
            btnActive:false,
            dropdownText:'Please specify',
            radio_props : [
                {label: 'Inappropriate or offensive content', value: 0 },
                {label: 'Copyright or trademark infringement', value: 1 },
                {label: 'Spam, advertising, solicitation', value: 2 },
                {label: 'Other (please explain below)', value: 3 }
              ],
              value:0
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
          //  this.props.changeNavNews();
          //  this.props.navigation.navigate('MainpageTabs')
          this.props.navigation.goBack();
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
                <View style={{flex:1,alignItems:'center',}}>
                
                    <Text style={styles.textTitle}>What's the issue?</Text>
            
      <RadioForm
          style={{justifyContent:'center',alignContent:'center',}}
          radio_props={this.state.radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
          buttonColor={'#707070'}
          buttonInnerColor={'#27A291'}
          selectedButtonColor={'#27A291'}
          labelStyle={{fontSize:17
        }}
          buttonSize={10}
          buttonOuterSize={25}
        />
             
                </View>
                </ScrollView>
                <View style={styles.bottomLine}>
                {/* <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} /> */}
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('reportIssue')}>
                <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:'5%',alignItems:'center'}}>
                    <Text style={{color:'#707070',textAlign:'center',fontSize:18,paddingRight:'4%'}}>Next</Text>
                    <Image style={{alignSelf:'center',marginTop:2}} source={require('../assets/img/right_arrow.png')} />
                      
                    </View>
                </TouchableOpacity>
                  
                    {/* <View style={styles.headerRow}> */}
                     
                       
                </View>
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    bottomLine: {
      
        height:'8%',
        bottom:0,
        left: 0,
        right: 0,
        justifyContent:'center',
        position: 'absolute',
        backgroundColor:'#fff',      
      },
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
         borderBottomColor:'#707070',     
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
        fontSize:24,
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Report);
