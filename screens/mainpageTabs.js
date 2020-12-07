import React, { Component } from "react";
import {
  Container,
  Content,
  Footer,
  Drawer,
  FooterTab
} from "native-base";
import { connect } from "react-redux";
import { Platform,AsyncStorage, Text, View, BackHandler, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import MainPage from '../screens/mainpage1';
import Newsfeed from '../screens/newsfeed';
import SideBar from '../screens/menu';
import LinearGradient from 'react-native-linear-gradient';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
// import styles from "./styles";
const width = Dimensions.get('window').width;
class MainPageTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      avatar:'',
      getuserid:'',
      username:'',
      loading:true
      //  val: 1 

    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  closeDrawer = () => {
    this._drawer._root.close();
  }
  componentDidMount() {
    AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})})
  console.log('userid in mainpagetabs is ',this.state.getuserid)
    // {this.getData()}
    this.CheckConnectivity();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  CheckConnectivity(){    
    NetInfo.fetch().then(state => {
  
      console.log("Connection type cheking", state.type);
      console.log("Is connected cheking?", state.isConnected);
  
      if(state.isConnected==true){
        {this.getData();}
      }else{
        alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
      }
     
    });
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  getData(){
    setTimeout(() => {
      {this.exploredataPic(this.state.getuserid)}
    }, 5);
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
    {this.props.nav==1?this.props.changeNavNews():this.props.changeNavRec()}
    this.props.navigation.navigate('MainpageTabs')
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
  exploredataPic(userid){
    // this.setState({loading:true})
    var json=JSON.stringify({
      'userid':userid
      });
      console.log('profile',json)
      fetch("http://162.250.120.20:444/Login/ProfileUpdateGet",
        {
            method: 'POST',
            headers:  {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: json
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(responseText);
            this.setState({loading:false})
            console.warn(responseJson)
            for (let i = 0; i <responseJson.length; i++) {
              // alert(this.state.bookdetail[0].Image)
               this.setState({ 
                 avatar:responseJson[i].avatar,
                 username:responseJson[i].username
              
                })
              }
              AsyncStorage.setItem('profile_img',this.state.avatar);
              AsyncStorage.setItem('user_name',this.state.username);
            //alert(this.state.data.status)  
        })
        .catch((error) => {
            console.warn(error);
        });
  }
  // constructor(props) {
  //   super(props);
  //   //state to manage the screen visible at a time
  // this.state = { val: 1 };
  // }

  renderElement() {
    //You can add N number of Views here in if-else condition
    if (this.props.nav === 1) {
      // this.props.changeNavNews()
      //Return the FirstScreen as a child to set in Parent View
      return <MainPage navigation={this.props.navigation} />;
    } else if (this.props.nav === 2) {
      // this.props.changeNavRec()
      //Return the SecondScreen as a child to set in Parent View
      return <Newsfeed navigation={this.props.navigation} />;
    }
  }
  render() {
    console.log('nav in mainpagetabs ', this.props.nav)
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigation={this.props.navigation} />} >
        <Container>

          <Content style={{ backgroundColor: '#fff' }}>

            <View style={{
              flexDirection: 'row', flex: 0.11, width: width, alignItems: 'center', justifyContent: 'center', elevation: 2, backgroundColor: '#fff', borderBottomColor: '#707070'
            }}>
              <LinearGradient style={[this.props.nav == 1 ? styles.active : null]}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 0 }}
                //  start={{x: 0, y: 0.50}} end={{x: 1, y: 0.25}} 
                colors={this.props.nav == 1 ? ['#24D4BC', '#27A291'] : ['#fff', '#fff']} >
                <TouchableOpacity
                  onPress={() => this.props.changeNavRec()}>
                  <Text style={[this.props.nav == 1 ? styles.activetext : styles.inactiveText]}
                  >Recommendations</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient style={[this.props.nav == 2 ? styles.active : null]}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 0 }}
                //  start={{x: 0, y: 0.50}} end={{x: 1, y: 0.25}}
                colors={this.props.nav == 2 ? ['#24D4BC', '#27A291'] : ['#fff', '#fff']} >
                <TouchableOpacity style={[this.props.nav == 2 ? styles.active : null]} onPress={() => this.props.changeNavNews()}>
                  <Text style={[this.props.nav == 2 ? styles.activetext : styles.inactiveText]}>PageFeed</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ backgroundColor: '#ffffff', flex: 0.9 }}>
              {this.renderElement()}
            </View>
            <Modal1 isVisible={this.state.loading}
         
         // onBackdropPress={() => this.setState({ loading: true })}
         >
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal1>

          </Content>

          <Footer style={{ backgroundColor: '#fff', alignItems: 'center', }}>
            <FooterTab style={{ backgroundColor: "white", marginLeft: '2%', marginRight: '2%', alignItems: 'center', }}>
              <TouchableOpacity
                style={styles.tabsss}
                onPress={() => this.toggleTab1()}>
                <Image source={require('../assets/img/logo.png')} />
                {/* <Text>Home</Text> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
                <Image source={require('../assets/img/collection.png')} />
                {/* <Text>Collection</Text> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
                <Image source={require('../assets/img/search.png')} />
                {/* <Text>Search</Text> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab4()}>
                {/* <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} > */}
                {/* <TouchableOpacity onPress = {() =>navigation.openDrawer() }>  */}
                <Image style={{ width: 28, height: 28,borderRadius:28/2 }} source={{uri:this.state.avatar}}></Image>
                {/* <Text>Menu</Text> */}
                {/* </Drawer> */}
              </TouchableOpacity>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  tabsss: {
    alignItems: 'center', justifyContent: 'center'
  },
  inactiveText: {
    color:'#707070',
    padding: '5%',
    fontSize: 16,
    // fontFamily:'regular',
  },
  active: {

    // backgroundColor: '#27A291',  
    borderRadius: 10,
  },
  activetext: {
    padding: '5%',
    fontSize: 16,
    // fontWeight: 'bold',
    // fontFamily:'regular',
    color: 'white'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    margin: 2,
  },
});

function mapStateToProps(state) {
  return {
    nav: state.apiReducer.nav,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
    changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageTabs);