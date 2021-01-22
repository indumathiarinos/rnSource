import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";

console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Series extends Component {
  constructor() {
    super();
  this.state = {
    showlikeImg: false,
    showReport:false
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

  renderViewMore(onPress) {
    return (
      <Text onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress}>View less</Text>
    )
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Read more
          </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                     <View style={styles.info1}>
                <Image style={{marginRight:'10%'}} source={require('../assets/img/flag.png')}/>
                    <Text style={styles.text1}>Report</Text>
                </View>
      <Text style={{ color: '#27A291', marginTop: 5, alignSelf: "flex-end" }} onPress={handlePress}>
        Show less
          </Text>
      </View>

    );
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

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <View style={styles.staticheader}> */}
        <View style={styles.staticheader}>
          <TouchableOpacity
          // onPress={()=>this.props.navigation.navigate('newsfeed')}
          >
            <Image source={require('../assets/img/download.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
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
                onPress={() => this.props.navigation.navigate('viewBook')}
              >Description</Text>
            </TouchableOpacity>
              </LinearGradient>
            <TouchableOpacity style={{ alignItems: 'center' }} 
            // onPress={() => this.props.navigation.navigate('profileCollection')}
            >
              <Text style={styles.headerText}

              >Contents</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} 
            onPress={() => this.props.navigation.navigate('books_pin')}
            >
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
        <ScrollView>
          <View style={styles.containerStyle} >
            <ImageBackground style={styles.sliderContainerStyle}
              source={require('../assets/img/collectimg.png')}>
              {/* <Slider/> */}
            </ImageBackground>
          </View>

          <Image style={styles.avatar} source={require('../assets/img/imgcover.png')} />
      
          <View style={styles.body}>

            <View style={styles.bodyContent}>

              <Text style={styles.name}>Your Ultimate Guide to PageVio</Text>
              <View
                style={{ marginTop: 10 }}>
                <ReadMore
                  numberOfLines={5}
                  renderTruncatedFooter={this._renderTruncatedFooter}
                  renderRevealedFooter={this._renderRevealedFooter}
                  onReady={this._handleTextReady}>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum quam quis semper tempus. Vestibulum ornare, augue a interdum consequat, est urna dignissim magna, at tempus magna leo a nulla. Nulla id luctus tortor, et cursus leo. Integer facilisis et eros vitae sodales. Duis sapien mi, lacinia eu nunc ac, condimentum ultrices est. Vestibulum ac justo non ipsum tristique ultricies quis non dolor. Nullam bibendum nulla ac lorem tincidunt, vel ultricies nulla semper. Duis nec magna sit amet ante vestibulum aliquam id sit amet felis. Mauris molestie leo lacus, at vulputate metus dapibus vel. Mauris efficitur convallis eros, vitae euismod velit sagittis vel. Integer egestas, nunc ac lobortis bibendum, nisi elit fringilla magna, sit amet eleifend sapien risus id lacus.                      </Text>
                </ReadMore>
              </View>
              <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >

                 <TouchableOpacity
                 onPress={()=>this.props.navigation.navigate('readingBook')}>
                  <View style={styles.socialBarButton}>
                    <Image source={require('../assets/img/open-book.png')}/>
                    <Text style={styles.btnText}>Read</Text>
                  </View>
                 </TouchableOpacity>
                </LinearGradient>

              <View style={styles.viewsInfo}>
                <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                <View style={styles.info1}>
                <Image style={{marginRight:'4%'}} source={require('../assets/img/eye.png')}/>
                    <Text style={styles.text1}>389k</Text>
                </View>
                       
                <View style={styles.info2}>
                <Image style={{marginRight:'2%'}} source={require('../assets/img/section.png')}/>
                    <Text style={styles.text1}>10 Sections</Text>
                </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                  <View style={styles.info1}>
                  <Text style={styles.text1}>Published: 21 Jan 2019</Text>
                  </View>
                  <View style={styles.info2}>
                  <Text style={styles.text1}>Release Date: 5 June 2019</Text>
                  </View>

                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                <View style={styles.info1}>
                    <Text style={styles.text1}>All Rights Reserved</Text>
                    <Image source={require('../assets/img/open-book.png')}/>
                </View>
                <View style={styles.info2}>
                <Text style={styles.text1}>ISBN: 978-1-78280-808-4</Text>

                </View>
                </View>

                </View>
              </View>

                <View style={styles.logoContainer}>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('profileAbout')}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',}}>

              <Image style={{marginRight:'4%'}} source={require('../assets/img/logo_border.png')}/>
                    <Text style={styles.text2}>PageVio</Text>
                    </View>

              </TouchableOpacity>
               
                      
                <TouchableOpacity style={styles.btnview}>
                    <Text style={styles.text3}>Follow</Text>
                 </TouchableOpacity>     
                        </View>

          </View>
          </View>

       
        </ScrollView>
        <View style={styles.bottomBar}>
            <TouchableOpacity
              style={{ padding: '1%' }}
              onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
            >
              {/* {this.renderImage} */}
              <Image

                source={imgSource}
              />
            </TouchableOpacity>
            {/* <Image
            onPress={()=>this.setState({showlikeImg:!this.state.showlikeImg})}  
           source={imgSource}/> */}
            <TouchableOpacity
              style={{ padding: '1%' }}
              onPress={() => this.props.navigation.navigate('comments')}
            >
              <Image

                source={require('../assets/img/comment1.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: '1%' }}
              onPress={() => this.props.navigation.navigate('createCollection')}
            >
              <Image source={require('../assets/img/plus.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: '1%' }}
            // onPress={ () => this.props.navigation.navigate('comments')} 
            >
              <Image source={require('../assets/img/share.png')} />
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer:{
    flexDirection: 'row',
    width:width,
    justifyContent:'space-around',
    marginTop:'5%',
    marginBottom:'10%'
  },
    text3:{
      color:'#27A291',
      fontSize:16,
    },
  viewsInfo:{
    width:width-60,
    // alignItems:'center',
    justifyContent:'space-between',
    // backgroundColor:'pink',
    margin:'4%'
  },
  btnText:{
    color:'white',
    paddingLeft:'5%',
    fontSize:18
  },
  text1:{
    color:'#707070',
    // paddingLeft:'5%',
    fontSize:14,
    alignSelf:'center'
  },
  text2:{
    color:'#000',
    fontSize:18,
    fontWeight:'bold',
    alignSelf:'center'
  },
  
  btnview: {
    backgroundColor: '#fff',
    elevation:2,
    // padding: '2%',
    width: width/3,
    height: height / 16,
    maxWidth: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginTop:5
  },
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 2.2,
  },
  sliderContainerStyle: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: 'pink'
  },
  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  rectangle: {
    width: 150,
    height: 120 * 2,
    borderRadius: 15,
    backgroundColor: "pink",
    alignSelf: 'center',
    marginTop: 130
  },

  header: {
    backgroundColor: "#00BFFF",
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 1.7
    // height:180,

  },
  
  staticheader: {
    paddingLeft: '3%',
    // paddingRight:'2%',
    flexDirection: 'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '10%',
    backgroundColor: '#ffff',
    elevation: 1,
    borderBottomColor:'#707070'

  },
  avatar: {
    // width: 110,
    // height: 110,
    // borderRadius: 63,
    // borderWidth: 2,
    // borderColor: "white",

    width: 150,
    height: 120 * 2,
    borderRadius: 15,
    // backgroundColor: "pink",
    alignSelf: 'center',
    marginBottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30  //actual marginTop:130
  },
  bottomBar: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // padding:'2%',
    flexDirection: 'row',
     justifyContent: "space-around" ,
    padding:'3%',
    // margin:'3%',
    position:'absolute',
    left:0,
    right:0,
    bottom:0
    // marginTop: 30
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: '15%',
  },
  bodyContent: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 22,
    color: "#000",
    fontWeight: "700"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
  },
  description: {
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#00BFFF",

  },
  buttonContainer1: {
    marginTop: 20,
    height: 45,
    marginLeft: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    borderRadius: 30,
    backgroundColor: "#00BFFF",

  },
  socialBarContainer3: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  socialBarContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20
  },
  socialBarContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info1:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color:'#000'
    // alignItems: 'center',
  },
  info2:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor:'skyblue',
    width:width/2.4
    // alignItems: 'center',
  },
  divider: {
    width: 2,
    height: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -10,
    backgroundColor: 'black'
  },
  icon: {
    width: 25,
    marginLeft: 5,
    height: 25,
  },
  btnAction: {
    height: 45,
    width: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: "#fff",
  },
});
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

export default connect(mapStateToProps,mapDispatchToProps)(Series);
