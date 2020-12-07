import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet,SafeAreaView,BackHandler,Alert, Image, View, Text, Dimensions, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import img1 from '../assets/img/img1.png';
import img2 from '../assets/img/img2.png';
import img3 from '../assets/img/img3.png';
import { SimpleAnimation } from 'react-native-simple-animations';
import Modal from 'react-native-modal';

import * as Animatable from 'react-native-animatable';
console.disableYellowBox = true;

// import arrow from '../assets/imgs/arrow.png';
import signup from './sign_up';
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';
import { connect } from "react-redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// const fadeIn = {
//     from: {
//       opacity: 0,
//     },
//     to: {
//       opacity: 1,
//     },
//   };
//   const zoomOut = {
//     0: {
//       opacity: 1,
//       scale: 1,
//     },
//     0.5: {
//       opacity: 1,
//       scale: 0.3,
//     },
//     1: {
//       opacity: 0,
//       scale: 0,
//     },
//   };
const list = [
    {
        id: 0,
        bgcolor: "#569BE0",
        img: img1,
        title: "Collect, Pin, Bookmark",
        subtitle: "Collection publication you like  Pin important phrases Bookmark to read later"
    },
    {
        id: 1,
        bgcolor: "#7C3BD3",
        img: img2,
        title: "Share Quotes",
        subtitle: "Share interesting Quotes or Phrases On Social Media"
    },
    {
        id: 2,
        bgcolor: "#EB9A17",
        img: img3,
        title: "Read Anywhere",
        subtitle: "You can also read the same publication on your PC"
    }
]

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            align: 'center',
            alignsecond: false,
            loading:false,
        };
        setTimeout(
            () =>
                this.setState({ align: 'flex-start' }, function () {
                    this.setState({
                        alignsecond: true,
                    });
                }),
            5000
        );

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
      BackHandler.exitApp();
          return true;
    }  
        login = (param) => {
        console.log(width, height);
        console.log('before passing data', param);
        // this.props.navigation.navigate('logintabs', {
        //     pass_data: param,
        // })
    }
    sendData=()=>{
                  alert("Under Developing");
        // console.log('nav kk ',this.props.nav)
        // this.props.changeNavRec();
        // this.props.navigation.navigate('MainpageTabs')
    }
    renderPage(image, index) {
        return (
            <View style={{ flex: 3, alignItems: 'center' }} key={index}>
                {/* <ImageBackground
                style={{width:width,height:height/1.5,top:'5%',flex:1,alignItems:'center'}}
                source={require('../assets/img/bg.png')}> */}
                <Text style={styles.txt1}>{image.title}</Text>

                {/* </ImageBackground> */}
                <Image style={styles.img_grp} source={image.img}></Image>
                <Text numberOfLines={3} style={styles.txt2}>{image.subtitle}</Text>



            </View>

        );
    }
    render() {
        const {nav} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View  style={{ }}>
            <ImageBackground
            resizeMode= 'contain'
                    style={{ width: '100%', height: '65%', top: '5%',right:'4%', flex: 1,}}
                    source={require('../assets/img/bg.png')}>

                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        showsPageIndicator={styles.dot2}
                        pageIndicatorContainerStyle={styles.dot}
                        index={0}
                        renderPageIndicator={this.page}
                        activePageIndicatorStyle={styles.dot1}
                        pageSize={width}
                    >
                        {list.map((image, index) => this.renderPage(image, index))}
                    </Carousel>

                </ImageBackground>
                </View>
                <Modal isVisible={this.state.loading}
         
         // onBackdropPress={() => this.setState({ loading: true })}
         >
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal>
                <View
                    style={styles.bottomLine}
                >
                    {/* <HTMLView
                    style={styles.txt2}
                    value={image.subtitle}
                    /> */}


                    <View style={{ flexDirection: 'row' }}>
                        <LinearGradient
                            style={styles.loginbtn}
                            colors={['#24D4BC', '#27A291']}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('loginSignup')

                                    //     this.props.navigation.navigate('logintabs', {
                                    //     pass_data: '0',
                                    // })
                                }>
                                <Text style={{ color: '#ffff', fontSize: 19 }}>Sign Up</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient
                            style={styles.signupbtn}
                            colors={['#ffff', '#ffff']}>
                            <TouchableOpacity
                            onPress={()=>this.sendData()}
                                // onPress={() =>
                                //     this.props.navigation.navigate('App')
                                //     //     this.props.navigation.navigate('logintabs', {
                                //     //     pass_data: '1',
                                //     // })
                                // }
                            >
                                <Text style={{ color: '#27A291', fontSize: 19 }}>Explore</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    loginbtn: {
        elevation: 5,
        backgroundColor: '#24D4BC',
        borderColor: '#24D4BC',
        borderWidth: 1,
        width: width / 2,
        height: height / 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ffff'
    },

    dot1: {
        backgroundColor: '#24D4BC',
        borderColor: '#24D4BC'
    },
    dot: {

        height: height / 3.7,
    },

    img_grp: {
        // top: '30%',
        resizeMode: 'contain',

        marginTop: '10%',

       width: width-40,
       height: height/2.5,
       marginLeft:'10%'
    },

    subtitle: {
        // margin: '20%',
        flex: 1,
        width: width - 100,
        height: height / 12,
        alignItems: 'flex-start',
    },
    bottomLine: {
        // height: height / 16,
        // width: width / 2,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'absolute',
        // bottom: '0.5%',
        // borderRadius: 10,
        // flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        // justifyContent: 'flex-end',
        // marginBottom: 36
    },
    txt2: {
        position: 'absolute',
        // height: 40,
        bottom: '15%',
        width: width / 1.5,
        color: 'black',
        fontSize: 18,
        alignSelf: 'center',

        textAlign: 'center',
        // marginBottom:'3%'
    },
    txt1: {
        marginTop: '35%',
        color: 'white',
        fontSize: 25,

    },
    textSignUp: {
        color: 'white',
        fontSize: 20,

    },


    signupbtn: {
        elevation: 5,
        backgroundColor: '#ffff',
        width: width / 2,
        height: height / 14,
        maxWidth: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

// function mapStateToProps(state){
//     return{
//     nav:state.nav,
//     }
// }

const mapStateToProps = state => ({
    nav: state.apiReducer.nav,
    
  });
function mapDispatchToProps(dispatch){
    return{
        changeNavRec:()=>dispatch({type:'CHANGE_NAV_REC'}),
        changeNavNews:()=>dispatch({type:'CHANGE_NAV_NEWS'}),
        mergePopup:()=>dispatch({type:'MERGE_POPUP1'}),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Onboarding);