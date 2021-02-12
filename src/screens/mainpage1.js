

import React, { Component, createRef } from 'react'
import {
    View, SafeAreaView, Button, Modal, Animated, Keyboard, Platform, ImageBackground, LayoutAnimation, FlatList, BackHandler, RefreshControl, AsyncStorage, Share, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, ToastAndroid, PermissionsAndroid
} from 'react-native';
import LoginModal from '../components/loginModal';
import SnapCarousel from 'react-native-snap-carousel';
import SnackBar from 'react-native-snackbar';
// import SnackBar from '../components/snackbar';
import Icon from 'react-native-vector-icons/Feather';
import Modal1 from "react-native-modal";
// import apiCall from "../redux/ActionCreator";
import { connect } from "react-redux";
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card } from "react-native-elements";
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-paper';
import NewsFeed from './newsfeed';
import ScrollUp from 'react-native-scroll-up';
// import ScrollButton from '../components/ScrollButton';
// import CollectionPopup from '../components/CollectionPopup';
import BannerCarousel from 'react-native-banner-carousel';
import NetInfo from '@react-native-community/netinfo';
import BlurModal from '../components/blurModal';
console.disableYellowBox = true;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// function MyComponent(props) {
//   return (
//     <View {...props} style={{flex: 0.1, backgroundColor: '#fff',margin:'2%',alignItems:'center'}}>
//       <Text>My Component</Text>
//     </View>
//   );
// }
const options = {
    headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}
class Home extends Component {
    scrollView = React.createRef();
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            expanded: false,
            boolean: false,
            scrolltop: false,
            active: 'Recommendation',
            data1: '',
            expl: '',
            expl1: '',
            expl11: [],
            toppick: '',
            pub: '',
            pages: '',
            series: '',
            periodicals: '',
            rv: '',
            explSec: 0,
            pubSec: 0,
            pageSec: 0,
            seriesSec: 0,
            periodSec: 0,
            recentSec: 0,
            visible: false,
            getuserid: '',
            collectionModal: false,
            loading: true,
            readlaterPopup: false,
            series: '',
            periodical: '',
            recents: '',
            periodIssues: '',
            collection: '',
            currentItem: '',
            curFuncName: '',
            collectionId: '',
            exists: false,
            sectionExpand: false,
            section: '',
            secCollid: '',
            explore_page: '0',
            loginPopup: false,
            loginModal: false,
            readlaterStatus: '',
            undo: false,
            doubleBackToExitPressedOnce: false,
            rpostid: '',
            rtypeid: '',
            postadd_postid:'',
            postadd_typeid:''
            
        }
        // this.moveAnimation = new Animated.ValueXY({ x: 0, animated:true})
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    changeState(value) {
        this.setState({ collectionModal: value });
    };
    handleOnScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY > 50) {
            this.setState({
                visible: true,
            });
        } else {
            this.setState({
                visible: false,
            });
        }
    };
    //   closeDrawer = () => {
    //     this._drawer._root.close();
    //   }
    //   openDrawer = () => {
    //     alert('open');
    //     this._drawer._root.open();
    //   }
    toggleTab1() {

        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false,
            loading: true
        });
        this.CheckConnectivity();
        // this.props.navigation.navigate('mainpage')
    }
    toggleTab2() {
        {
            this.state.explore_page == '0' ?
            //    ( this.setState({
            //       tab1: false,
            //       tab2: true,
            //       tab3: false,
            //       tab4: false
            //     })
            this.props.navigation.navigate('collection')
            : this.alertPopup()
        }

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
        {
            this.state.explore_page == '0' ?
            this.props.navigation.openDrawer() :
            this.logoutpress()
        }
    }
    logoutpress = () => {
        AsyncStorage.setItem('userid', JSON.stringify(""));
        AsyncStorage.setItem('typeid', JSON.stringify(""));
        AsyncStorage.setItem('profile_img', JSON.stringify(""));
        AsyncStorage.setItem('user_name', JSON.stringify(""));
        AsyncStorage.setItem('postid', JSON.stringify(""));
        AsyncStorage.setItem('collectionId', JSON.stringify(""));
        AsyncStorage.setItem('sectionId', JSON.stringify(""));
        AsyncStorage.setItem('usertype', JSON.stringify(""));
        AsyncStorage.setItem('bookmarkUserid', JSON.stringify(""));
        AsyncStorage.setItem('loginData', JSON.stringify(false));
        this.props.savelogout();
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('loginSignup');
    }
    async componentDidMount() {
        Keyboard.dismiss();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
        AsyncStorage.setItem('collectionFilter', "DESC");
        AsyncStorage.setItem('contentFilter', "ASC");
        AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page: value })).done();
        this.CheckConnectivity();

        // this.focusListener = this.props.navigation.addListener('willFocus', () => {
        //     this.setState({expl11:'',pub:'',rv:'',series:'',periodical:'',toppick:'',recents:''})
        //            this.CheckConnectivity();  
        //   })
        // {this.getData()}
    }
    componentWillMount() { BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick); }

    CheckConnectivity() {
        NetInfo.fetch().then(state => {

            console.log("Connection type cheking", state.type);
            console.log("Is connected cheking?", state.isConnected);

            if (state.isConnected == true) {
                // { this.exploredata(this.state.getuserid) }
                // { this.exploredata1(this.state.getuserid) }
                // {this. exploredataPic(this.state.getuserid)}
                this.setState({expl11:'',pub:'',rv:'',series:'',periodical:'',toppick:'',recents:''})
                { this.getData(); }
                // alert(this.state.explore_page,"explore")
            } else {
                alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
            }

        });
    }
    getData() {
        setTimeout(() => {
            console.log('user id in recommendation page is ', this.state.getuserid);
            // alert(this.state.explore_page)
            { this.exploredata(this.state.getuserid) }
            { this.exploredata1(this.state.getuserid) }
        }, 2000)
    }
    getData1(postid) {
        setTimeout(() => {
            { this.periodIssues(postid) }
        }, 1000)

    }
    componentWillUnmount() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        // this.focusListener.remove();
    }
    handleBackButtonClick() {
        // BackHandler.exitApp();
        // // this.props.navigation.goBack();

        //   return true;
        if (this.state.doubleBackToExitPressedOnce) {
            BackHandler.exitApp();
        }
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        this.setState({ doubleBackToExitPressedOnce: true });
        setTimeout(() => {
            this.setState({ doubleBackToExitPressedOnce: false });
        }, 2000);
        return true;
    }
    //   periodIssues(postid) {
    //     // {"TypeID":"1","Post_PageID":"3"}
    //     // console.log('dsflkajdkfksd ',typeid,postid);
    //     console.log('periodical issues post id',postid);
    //     var json = JSON.stringify(
    //       {
    //         "postid":postid
    //     });
    //     fetch("http://162.250.120.20:444/Login/PeriodicalDesc",
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'content-type': 'application/json'
    //         },
    //         body: json  
    //       }
    //     )
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             //alert(responseText);
    //             this.setState({ periodIssues: responseJson})
    //             console.warn(responseJson)

    //         })
    //         .catch((error) => {
    //             console.warn(error);
    //         });
    //     }
    // componentDidMount() {
    // var json=JSON.stringify({
    //   'email': 'Testing@gmail.com',
    //   'password': 'password',
    //   });
    // const formData = new FormData()
    // formData.append('email', 'Testing@gmail.com');
    // formData.append('password','password');
    //     this.props
    //       .apiCall("http://162.250.120.20:555/Service1.svc/register1",
    //        json
    //       ,options)
    //       .then(() => {
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });

    // }
    // send=()=>{

    //   var json=JSON.stringify({
    //     'email': 'Testing@gmail.com',
    //     'password': 'password',
    //     });
    //   // const formData = new FormData()
    //   // formData.append('email', 'Testing@gmail.com');
    //   // formData.append('password','password');
    //       this.props
    //         .apiCall("http://162.250.120.20:555/Service1.svc/register1",
    //          json
    //         ,options)
    //         .then(() => {
    //           //const data = this.props.data;
    //           // console.log(data);
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         });
    //         this.props.navigation.navigate('modal');
    // }
    snapItem = (index, paginationState) => {
        if (paginationState == 'expl') {
            this.setState({ explSec: index });
        } else if (paginationState == 'pub') {
            this.setState({ pubSec: index });
        } else if (paginationState == 'page') {

            this.setState({ pageSec: index });
        } else if (paginationState == 'series') {

            this.setState({ seriesSec: index });
        } else if (paginationState == 'period') {

            this.setState({ periodSec: index });

        } else if (paginationState == 'recent') {
            this.setState({ recentSec: index });
        }
    }
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: 100, resizeMode: 'cover' }} source={image.img} />
            </View>
        );
    }
    expllineItem({ item, index }) {
        // console.log('item',index)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
                <View style={[this.state.explSec == index ? styles.active : styles.inactive]} /></View>

        )
    }
    publineItem({ item, index }) {
        // console.log('item',index)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',alignSelf:'center', marginLeft: 2, marginRight: 2, }}>
                <View style={[this.state.pubSec == index ? styles.active : styles.inactive,{alignSelf:'center'}]} /></View>

        )
    }
    pagelineItem({ item, index }) {
        // console.log('item',index)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
                <View style={[this.state.pageSec == index ? styles.active : styles.inactive]} /></View>

        )
    }
    serieslineItem({ item, index }) {
        // console.log('item',index)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
                <View style={[this.state.seriesSec == index ? styles.active : styles.inactive]} /></View>

        )
    }
    periodlineItem({ item, index }) {
        // console.log('item',index)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
                <View style={[this.state.periodSec == index ? styles.active : styles.inactive]} /></View>

        )
    }
    recentlineItem({ item, index }) {
        // console.log('item',index)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
                <View style={[this.state.recentSec == index ? styles.active : styles.inactive]} /></View>

        )
    }
    tags(name) {
        let varcolordot = "";
        if (name === 'Education') {
            varcolordot = '#1C4A7E'
        } else if (name === 'Illustration') {
            varcolordot = '#c65135'
        } else if (name === 'Fiction') {
            varcolordot = '#741c7e'
        } else if (name === 'Comics') {
            varcolordot = "#1C4A7E"
        }
        return varcolordot;
    }
    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
        { this.collData(this.state.getuserid, "", "") };
    }

    exploredataPic(userid) {
        this.setState({ loading: true })
        var json = JSON.stringify({
            'userid': userid
        });
        console.warn('profile service name "http://162.250.120.20:444/Login/ProfileUpdateGet"', json)
        console.log('profile service name "http://162.250.120.20:444/Login/ProfileUpdateGet"', json)
        fetch("http://162.250.120.20:444/Login/ProfileUpdateGet",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                this.setState({ loading: false })
                console.warn(responseJson)
                for (let i = 0; i < responseJson.length; i++) {
                    // alert(this.state.bookdetail[0].Image)
                    this.setState({
                        avatar: responseJson[i].avatar,
                        username: responseJson[i].username

                    })
                }
                AsyncStorage.setItem('profile_img', this.state.avatar);
                AsyncStorage.setItem('user_name', this.state.username);
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    exploredata(userid) {
        this.setState({ loading: true })
        var json = JSON.stringify({
            'UserId': userid,
        });
        fetch("http://162.250.120.20:444/Login/Explore",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'multipart/form-data'
                },
                // body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                this.setState({ expl: responseJson, })
                { this.exploredataPic(this.state.getuserid) }

                console.warn(responseJson)
                //alert(this.state.data.status)
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    exploredata1(userid) {
        // console.log('userid in rec page',userid)
        var json = JSON.stringify({
            'UserID': userid,
        });
        fetch("http://162.250.120.20:444/Login/HomePage",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    // 'content-type': 'multipart/form-data'
                    'content-type': 'application/json'

                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                this.setState({
                    expl1: responseJson,
                    expl11: responseJson
                })
                console.warn(responseJson)
                console.warn(this.state.expl1 + '1')
                console.warn(this.state.expl11)

                //alert(this.state.data.status)
                for (let i = 0; i < this.state.expl11.length; i++) {

                    //   alert(this.state.expl11.length+"df")


                    if (this.state.expl11[i].Datafor === 'MV') {
                        let toppick = [...this.state.toppick];
                        toppick.push(this.state.expl11[i])
                        this.setState({ toppick });
                        this.setState({ loading: false })
                        // alert(this.state.DATAS2.length+"df")
                    }
                    else if (this.state.expl11[i].Datafor === 'Publication') {
                        let pub = [...this.state.pub];
                        pub.push(this.state.expl11[i])
                        this.setState({ pub });
                    }
                    else if (this.state.expl11[i].Datafor === 'page') {
                        let rv = [...this.state.rv];
                        rv.push(this.state.expl11[i])
                        this.setState({ rv });
                        this.state.rv.sort((a, b) => (a.Pagedate > b.Pagedate) ? -1 : 1)
                    }
                    else if (this.state.expl11[i].Datafor === 'Series') {
                        let series = [...this.state.series];
                        series.push(this.state.expl11[i])
                        this.setState({ series });
                    }
                    else if (this.state.expl11[i].Datafor === 'Periodical') {
                        let periodical = [...this.state.periodical];
                        periodical.push(this.state.expl11[i])
                        this.setState({ periodical });
                    }
                    else if (this.state.expl11[i].Datafor === 'UV') {
                        let recents = [...this.state.recents];
                        recents.push(this.state.expl11[i]);
                        console.log(this.state.expl11[i] + 'recent data')
                        this.setState({ recents });
                    }
                    // else{
                    //   let DATAS4 = [...this.state.DATAS4];
                    //   DATAS4.push(this.state.DATAS[i])
                    //   this.setState({DATAS4});
                    // }

                    // if(this.state.expl11[i].Datafor==='MV'){
                    //   this.setState({toppick: this.state.expl11[i]
                    //     })
                    //      console.warn(this.state.expl11[i].Datafor+'fnjdnjv')

                    // }
                    // else if(this.state.expl11[i].Datafor==='Publication'){
                    //   this.setState({pub: this.state.expl11[i]
                    //   })
                    // }
                    // else if(this.state.expl11[i].Datafor==='page'){
                    //   this.setState({rv: this.state.expl11[i]
                    //   })
                    // }
                }
                this.setState({ loading: false })

                // if(this.state.expl11[0].Datafor==='MV'){
                //   console.warn(this.state.expl1[0].Datafor+'fnjdnjv')

                // }
                // else{
                //   console.warn("dkbhvbdbv")
                // }

            })



            .catch((error) => {
                console.warn(error);
            });
    }
    recentService=(typeid,postid)=>{
        var json = JSON.stringify({
            'UserID': this.state.getuserid,
            "TypeID": typeid,
            "Post_Page_ID": postid
        });
        console.log('recent service json', json)
        fetch("http://162.250.120.20:444/Login/RecentViewed",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
              console.warn('response recent service ',responseJson)
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    pressIcon = (item) => {
        let { toppick } = this.state;
        // console.log('top pick data ',item)
        // console.log('kjdsafksdfjsdka data is',toppick)
        // console.log('kjdsafksdfjsdka data is',item.TypeID)
        // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)

        toppick = toppick.map(e => {
            console.log('top pick type id is ', e.TypeID)
            if (item.TypeID === e.TypeID) {
                // item.like = !e.like;
                AsyncStorage.setItem('typeid', item.TypeID);
                AsyncStorage.setItem('postid', item.Post_Page_Id);
                if (item.TypeID == 4) {
                    this.recentService(item.TypeID,item.Post_Page_Id)
                    return this.props.navigation.navigate('readingBook');
                } else if (item.TypeID == 1) {
                    this.recentService(item.TypeID,item.Post_Page_Id)
                    return this.props.navigation.navigate('viewBook');
                } else if (item.TypeID == 2) {
                    this.recentService(item.TypeID,item.Post_Page_Id)
                    return this.props.navigation.navigate('periodiViewBook');
                } else if (item.TypeID == 3) {
                    this.recentService(item.TypeID,item.Post_Page_Id)
                    return this.props.navigation.navigate('seriesViewBook');
                }
            } else {
                return e;
            }
        });
    }
    pagePress = (item) => {
        let { rv } = this.state;
        // console.log('top pick data ',item)
        // console.log('kjdsafksdfjsdka data is',toppick)
        // console.log('kjdsafksdfjsdka data is',item.TypeID)
        // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)

        rv = rv.map(e => {
            console.log('top pick type id is ', e.TypeID)
            if (item.TypeID === e.TypeID) {
                // item.like = !e.like;
                AsyncStorage.setItem('typeid', item.TypeID);
                AsyncStorage.setItem('postid', item.Post_Page_Id);
                console.log('newsfeed post id is', item.Post_Page_Id);
                if (item.TypeID == 4) {
                    return this.props.navigation.navigate('readingBook')
                } else if (item.TypeID == 1) {
                    return this.props.navigation.navigate('viewBook');
                } else if (item.TypeID == 2) {
                    return this.props.navigation.navigate('periodiViewBook');
                } else if (item.TypeID == 3) {
                    return this.props.navigation.navigate('seriesViewBook');
                }
            } else {
                return e;
            }
        });
    }
    recentPress = (item) => {
        let { recents } = this.state;
        // console.log('top pick data ',item)
        // console.log('kjdsafksdfjsdka data is',toppick)
        // console.log('kjdsafksdfjsdka data is',item.TypeID)
        // console.log('kjdsafksdfjsdka data is',item.Post_Page_Id)

        recents = recents.map(e => {
            console.log('top pick type id is ', e.TypeID)
            if (item.TypeID === e.TypeID) {
                // item.like = !e.like;
                this.recentService(item.TypeID,item.Post_Page_Id)
                AsyncStorage.setItem('typeid', item.TypeID);
                AsyncStorage.setItem('postid', item.Post_Page_Id);

                console.log('newsfeed post id is', item.Post_Page_Id);
                if (item.TypeID == 4) {
                    return this.props.navigation.navigate('readingBook');
                } else if (item.TypeID == 1) {
                    return this.props.navigation.navigate('viewBook');
                } else if (item.TypeID == 2) {
                    return this.props.navigation.navigate('periodiViewBook');
                } else if (item.TypeID == 3) {
                    return this.props.navigation.navigate('seriesViewBook');
                }
            } else {
                return e;
            }
        });
    }
    ShareMessage = () => {
        //Here is the Share API
        Share.share({ message: "ddfjbdfjhbdf", title: "Sharing via react native" })
            //after successful share return result
            .then(result => console.log(result))
            //If any thing goes wrong it comes here
            .catch(errorMsg => console.log(errorMsg));
    };
    recentpressIcon = (item) => {
        let { data } = this.state;
        // console.log('items are', item)
        data = data.map(e => {
            if (item.id === e.id) {
                // item.like = !e.like;
                return this.props.navigation.navigate('viewBook');
                // }
                //  else if(item.id === 2){
                //   return this.props.navigation.navigate('filter', {
                //     item: item});
                //   }else if(item.id == 3){
                //     return this.props.navigation.navigate('bookmarks', {
                //       item: item});
            } else {
                return e;
            }
        });
    }
    pressSearch = (item) => {
        let { data } = this.state;
        // console.log('items are', item)
        data = data.map(e => {
            if (item.id === e.id) {
                // item.like = !e.like;
                return this.props.navigation.navigate('search_explore', {
                    item: item
                });
                // }
                //  else if(item.id === 2){
                //   return this.props.navigation.navigate('filter', {
                //     item: item});
                //   }else if(item.id == 3){
                //     return this.props.navigation.navigate('bookmarks', {
                //       item: item});
            } else {
                return e;
            }
        });
    }
    readlater = () => {


        this.setState({
            collectionModal: false,
            sectionExpand: false,
            readlaterPopup: true,
            expanded: false,
            undo: false
        });

        setTimeout(() => {
            // this.props.changeRemove()
            this.setState({
                readlaterPopup: false,
                // exists:false
            });
            if (this.state.undo == false) {
                this.readlaterAdd(this.state.getuserid, this.state.rpostid, this.state.rtypeid)
            } else {
                this.setState({ undo: false })
            }
            //   this.props.changeRemove();
        }, 3000);
        // {this.exploredata1(this.state.getuserid)}
        // this.props.navigation.navigate('readlater');
    }
    readlaterClick() {
        let list = [this.state.currentItem];
        for (let item of list) {
            AsyncStorage.setItem('typeid', item.TypeID);
            AsyncStorage.setItem('postid', item.Post_Page_Id);
            console.log('readstatues ', item.Readstatus, "", item)
            //  alert('read',item)
            this.setState({ exists: item.Readstatus == 'Y' ? true : false, rpostid: item.Post_Page_Id, rtypeid: item.TypeID });
            this.readlater();
            //  this.setState({exists:item.Readstatus=='Y'?true:false})
        }
    }
    readlaterAdd(userid, pageid, typeid) {
        this.setState({ loading: true })
        var json = JSON.stringify({
            'UserID': userid,
            "Post_PageID": pageid,
            "Type_ID": typeid
        });
        console.log('readlater add ', json)
        fetch("http://162.250.120.20:444/Login/ReadLaterAdd",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                if (responseJson[0].Message == "Already Exist"|| responseJson[0].Message == "Added Successfully") {
                    this.setState({exists:true})
                }else{
                    this.setState({exists:false})
                }
                this.setState({ loading: false })
                // this.readlater();
                this.setState({
                    collectionModal: false,
                    // readlaterPopup: true
                });
                // this.changeLayout();
                this.setState({expl11:'',pub:'',rv:'',series:'',periodical:'',toppick:'',recents:''})

                { this.exploredata1(this.state.getuserid) }

                // SnackBar.show({
                //     title: !this.state.exists?"Added to ReadLater":"Already Added in ReadLater",
                //     duration:SnackBar.LENGTH_LONG,
                //     backgroundColor: '#27A291',
                //     action: {
                //       title: 'Undo',
                //     //   onPress: () => SnackBar.show({ title: 'Thank you!' }),
                //       color: '#fff',
                //     },
                //   })
                //      setTimeout(() => {
                //     // this.props.changeRemove()
                //     this.setState({
                //         // readlaterPopup: false,
                //         exists:false
                //     });

                //     //   this.props.changeRemove();
                // }, 5000);

                console.warn(responseJson)
                console.warn("readlateradd")
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    collectionAdd(colid, secid, postid, pageid, userid, type, status) {
        var json = JSON.stringify(
            {
                "collectionid": colid,
                "sectionid": secid,
                "postid": postid,
                "pageid": pageid,
                "userid": userid,
                "Type": type,
                "Status": status
            }
        )
        console.log('post col ', json)
        fetch("http://162.250.120.20:444/Login/CollectionPostAdd",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                this.setState({ loading: false })
                console.warn(responseJson)
                // console.warn("readlateradd")
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    secData(userid, collid) {
        // this.setState({loading:true})
        var json = JSON.stringify({
            "CollectionID": collid,
            "User_ID": userid,
            "SortBy": "DESC"
        });
        fetch("http://162.250.120.20:444/Login/Section",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                this.setState({ section: responseJson, });
                //     secCollid:responseJson[0].CollectionsID })
                const filteredList = this.state.section.filter((item) => item.SectionID !== 0);
                this.setState({ section: filteredList, loading: false, secCollid: collid })
                console.warn(responseJson)
                console.warn("section")
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    collData(userid, colid, secid) {
        // this.setState({loading:true})
        var json = JSON.stringify({
            'UserID': userid,
            "CollectionID": colid,
            "SectionID": ""
        });
        fetch("http://162.250.120.20:444/Login/CollectionSectionDD",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);
                this.setState({ collection: responseJson, })
                console.warn(responseJson)
                console.warn("collection")
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    collectionBook = (value, collid) => {
        this.setState({ collectionModal: false, sectionExpand: false, expanded: false });

        console.log('collection book value is ', value)
        let list = [this.state.currentItem];
        for (let item of list) {
            AsyncStorage.setItem('typeid', item.TypeID);
            AsyncStorage.setItem('postid', item.Post_Page_Id);
            console.log('type id postid ', item.TypeID, item.Post_Page_Id);
            // AsyncStorage.setItem('3dots',JSON.stringify(1));
            this.props.collSecPopup();
            console.log('collSeccollSeccollSeccollSec', this.props.collSec)
            AsyncStorage.setItem('popup_name', JSON.stringify(value));
            AsyncStorage.setItem('colSec', "Collection");
            AsyncStorage.setItem('colId', JSON.stringify(collid));
            AsyncStorage.setItem('coll_name', this.state.getsecColName);

            if (item.TypeID == 4) {
                // AsyncStorage.setItem('popup_name1',JSON.stringify(value));
                this.collectionAdd(collid, "", "", item.Post_Page_Id, this.state.getuserid, item.TypeID, "")
                //  this.props.popupAddCol();
                //  AsyncStorage.setItem('colSec',"Collection");
                //  AsyncStorage.setItem('colId',collid);
                return this.props.navigation.navigate('readingBook');
                // return this.pressIcon();
            } else if (item.TypeID == 1) {
                this.collectionAdd(collid, "", item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
                return this.props.navigation.navigate('viewBook');
            } else if (item.TypeID == 2) {
                // AsyncStorage.setItem('3dots',JSON.stringify(1));
                // AsyncStorage.setItem('popup_name',JSON.stringify(value));
                // AsyncStorage.setItem('colSec',"Collection");
                // AsyncStorage.setItem('colId',collid);
                this.collectionAdd(collid, "", item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
                return this.props.navigation.navigate('periodiViewBook');
            } else if (item.TypeID == 3) {
                // AsyncStorage.setItem('3dots',JSON.stringify(1));
                // AsyncStorage.setItem('popup_name',JSON.stringify(value));
                // AsyncStorage.setItem('colSec',"Collection");
                // AsyncStorage.setItem('colId',collid);
                this.collectionAdd(collid, "", item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
                return this.props.navigation.navigate('seriesViewBook');
            }
        }
        // let gotoDescPage=this.state.curFuncName;
        // if(this.state.curFuncName=="pressIcon"){
        //     this.pressIcon(this.state.currentItem)
        // }else if(this.state.funcName=="seriesPress"){
        //     this.seriesPress(this.state.currentItem)
        // }else if(this.state.funcName=="periodicalPress"){
        //     this.periodicalPress(this.state.currentItem)
        // }

    }
    sectionClick = (collid) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ sectionExpand: !this.state.sectionExpand });
        this.secData(this.state.getuserid, collid)
        console.log('section data collection ', this.state.section);
    }
    secBook = (value, collid, secid, item) => {
        this.setState({ collectionModal: false, sectionExpand: false, expanded: false, });
        // this.setState({collectionModal:false,});
        console.log('section book value is ', value, item, collid, secid)
        let list = [this.state.currentItem];
        for (let item of list) {
            AsyncStorage.setItem('colId', JSON.stringify(collid));
            AsyncStorage.setItem('typeid', item.TypeID);
            AsyncStorage.setItem('postid', item.Post_Page_Id);
            console.log('type id postid ', item.TypeID, item.Post_Page_Id);
            this.props.collSecPopup();
            AsyncStorage.setItem('popup_name', JSON.stringify(value));
            AsyncStorage.setItem('colSec', "Section");
            AsyncStorage.setItem('SecId', JSON.stringify(secid));
            if (item.TypeID == 4) {
                //  AsyncStorage.setItem('popup_name1',JSON.stringify(value));
                this.collectionAdd(collid, secid, "", item.Post_Page_Id, this.state.getuserid, item.TypeID, "")
                // this.props.popupAddCol();
                // AsyncStorage.setItem('colSec',"Section");
                // AsyncStorage.setItem('SecId',secid);
                return this.props.navigation.navigate('readingBook');
                // return this.pressIcon();
            } else if (item.TypeID == 1) {
                //  AsyncStorage.setItem('3dots',JSON.stringify(1));
                //  AsyncStorage.setItem('popup_name',JSON.stringify(value));
                //  AsyncStorage.setItem('colSec',"Section");
                //  AsyncStorage.setItem('SecId',secid);
                this.collectionAdd(collid, secid, item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
                return this.props.navigation.navigate('viewBook');
            } else if (item.TypeID == 2) {
                //  AsyncStorage.setItem('3dots',JSON.stringify(1));
                //  AsyncStorage.setItem('popup_name',JSON.stringify(value));
                //  AsyncStorage.setItem('colSec',"Section");
                //  AsyncStorage.setItem('SecId',secid);
                this.collectionAdd(collid, secid, item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
                return this.props.navigation.navigate('periodiViewBook');
            } else if (item.TypeID == 3) {
                //  AsyncStorage.setItem('3dots',JSON.stringify(1));
                //  AsyncStorage.setItem('popup_name',JSON.stringify(value));
                //  AsyncStorage.setItem('colSec',"Section");
                //  AsyncStorage.setItem('SecId',secid);
                this.collectionAdd(collid, secid, item.Post_Page_Id, "", this.state.getuserid, item.TypeID, "")
                return this.props.navigation.navigate('seriesViewBook');
            }

        }
    }
    pressIcon1 = (item) => {
        let { expl } = this.state;
        // console.log('top pick data ', item)
        // console.log('kjdsafksdfjsdka data is', expl)
        // console.log('items are', item)
        expl = expl.map(e => {
            if (item.Category_name === e.Category_name) {
                // item.like = !e.like;
                return this.props.navigation.navigate('search', {
                    item: item
                });
                // }
                // else if (item.id === 2) {
                //     return this.props.navigation.navigate('filter', {
                //         item: item
                //     });
                // } else if (item.id == 3) {
                //     return this.props.navigation.navigate('bookmarks', {
                //         item: item
                //     });
            } else {
                return e;
            }
        });
    }
    seriesPress = (item) => {
        let { series } = this.state;
        // console.log('items are', item)
        series = series.map(e => {
            if (item.TypeID === e.TypeID) {
                AsyncStorage.setItem('typeid', item.TypeID);
                AsyncStorage.setItem('postid', item.Post_Page_Id);
                // item.like = !e.like;
                return this.props.navigation.navigate('seriesViewBook', {
                    item: item
                });

            } else {
                return e;
            }
        });
    }

    periodicalPress = (item) => {
        let { periodical } = this.state;
        // console.log('items are', item)
        periodical = periodical.map(e => {
            if (item.TypeID === e.TypeID) {
                AsyncStorage.setItem('typeid', item.TypeID);
                // AsyncStorage.setItem('postid', item.Post_Page_Id);
                AsyncStorage.setItem('postid', item.Post_Page_Id);

                // {this.periodIssues(item.Post_Page_Id)}
                // console.log('period issues length is ',this.state.periodIssues.length,item.TypeID)
                // {this.getData1(item.Post_Page_Id)}
                // {this.getData1(6)}+
                // if(this.state.periodIssues.length>0){
                //     return this.props.navigation.navigate('viewBook', {
                //         item: item
                //     });


                // }else{
                return this.props.navigation.navigate('periodiViewBook', {
                    item: item
                });
                // return this.props.navigation.navigate('viewBook', {
                //     item: item
                // });

                // }
                // item.like = !e.like;


            } else {
                return e;
            }
        });
    }
    keyExtractor = (item, index) => {
        // console.log('item id is in carousel',index)
        index.toString()
    }
    goToTop = () => {
        console.log('top scroll clicked');
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: width, height: height / 3, resizeMode: 'cover' }} source={{ uri: image.Images != "" ? image.Images : null }} />
            </View>
        );
    }
    alertPopup() {
        this.logoutpress()
        //    this.setState({loginPopup:true})
    }
    closeLoginPopup() {
        this.setState({ loginPopup: false });
        this.props.savelogin();
        AsyncStorage.setItem('explore_page', JSON.stringify(0));
        AsyncStorage.getItem('userid').then((value) => this.setState({ getuserid: value })).done();
        AsyncStorage.getItem('explore_page').then((value) => this.setState({ explore_page: value })).done();

        AsyncStorage.setItem('collectionFilter', "DESC");
        AsyncStorage.setItem('contentFilter');
        this.CheckConnectivity()
    }
    getItem(item, funcName) {
        this.setState({
            collectionModal: !this.state.collectionModal, currentItem: item, curFuncName: funcName,postadd_postid:item.Post_Page_Id,postadd_typeid:item.TypeID
            // exists:item.Readstatus=='N'?false:true
        })
        //  console.log('item data',item,'exists',this.state.exists,item.Readstatus)
    }
    moreClick = (item, funcName) => {
        // AsyncStorage.setItem('typeid', JSON.stringify(item.TypeID));
        // AsyncStorage.setItem('postid', JSON.stringify(item.Post_Page_Id));
        {
            this.state.explore_page == '0' ?
            this.getItem(item, funcName)
            
            : this.alertPopup()
        }
    }
    renderColData({ item }) {
        return (
            <View>
                <TouchableOpacity
                    style={{ backgroundColor: '#f0f0f0', width: 300, }}
                    onPress={() => {
                        console.log('render collection data ', item)
                        this.collectionBook("Our Planet")
                    }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                    }}>
                        <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 250 }}>{item.Title}new</Text>

                        <Image style={{ alignSelf: 'center', marginLeft: '-5%' }} source={require('../assets/img/worldwide.png')} />
                    </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                {/* <TouchableOpacity
              style={{backgroundColor:'#f0f0f0',width:300,}}
                onPress={() => this.collectionBook("Cats in the Wild")}>
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                }}>
                  <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 250 }}>Cats in the Wild</Text>

                  <Image style={{ alignSelf: 'center', marginLeft: '-5%' }} source={require('../assets/img/not.png')} />
                </View>
              </TouchableOpacity>

              <Divider style={{ backgroundColor: '#707070',borderWidth:0.3 }} /> */}

            </View>
        )
    }
    render() {
        return (
            
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar barStyle='dark-content'/>

                <View style={styles.header}>
                    {/* <LinearGradient style={styles.active1}
              colors={['#24D4BC', '#27A291']} > */}
                    <TouchableOpacity style={[styles.active1, { backgroundColor: '#27A291' }]}
                        onPress={() => this.props.navigation.navigate('mainpage')}>
                        <Text style={[styles.activetext1]}
                        >Recommendations</Text>
                    </TouchableOpacity>
                    {/* </LinearGradient> */}
                    {/* <LinearGradient 
              colors={['#fff', '#fff']} > */}
                    <TouchableOpacity style={styles.active1} onPress={() => this.props.navigation.navigate('newsfeed')}>
                        <Text style={styles.inactiveText}>PageFeed</Text>
                    </TouchableOpacity>
                    {/* </LinearGradient> */}
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: '8%' }}

                    ref={(c) => { this.scroll = c }}
                >
                    {/* <View style={{ marginBottom: '10%' }}> */}

                    <View style={styles.container}>
                        <View style={styles.containerStyle} >
                            <View style={styles.sliderContainerStyle} />
                            {/* source={require('../assets/img/bgpath.png')}>
         </ImageBackground> */}
                        </View>
                        <View style={styles.overlay2}>
                            <Image source={require('../assets/img/top-picks-icon.png')} />
                            <Text style={{
                                color: 'black', justifyContent: "center", marginTop: '1%',
                                alignItems: "center", fontSize: 24, color: 'white', fontFamily: 'Montserrat-Bold'
                            }} >Our Top Picks</Text>

                            {/* <BannerCarousel
                      autoplay
                      autoplayTimeout={5000}
                      loop
                      index={0}
                      pageSize={width}
                      activePageIndicatorStyle={{backgroundColor:'#27A291'}}
                      pageIndicatorStyle={{backgroundColor:'#fff'}}
                  >
                      {!this.state.toppick?null:this.state.toppick.map((image, index) => this.renderPage(image, index))}
                      </BannerCarousel> */}
                            <SnapCarousel
                                data={this.state.toppick}
                                style={{ marginLeft: 5, marginRight: 5 }}
                                renderItem={({ item, index }) => (

                                    <View style={{ paddingRight: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => this.pressIcon(item)}
                                        >
                                            <CardView
                                                cardElevation={2}
                                                // cardMaxElevation={2}
                                                cornerRadius={15}>
                                                <ImageBackground source={{ uri: item.Images != '' ? item.Images : null }} style={{ width:width/2.5, height: height/4, jsutifyContent: 'center', resizeMode: 'cover' }}>
                                                    {/* {this.state.explore_page=='0'? */}
                                                    <TouchableOpacity
                                                        onPress={() => this.moreClick(item, "pressIcon")}>
                                                        <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                                                    </TouchableOpacity>
                                                    {/* :null} */}
                                                </ImageBackground>

                                            </CardView>
                                            <Text numberOfLines={3} style={styles.selectedTitle}>
                                                {item.Title}
                                            </Text>
                                            <Text numberOfLines={1} style={styles.author}>
                                                {item.Author}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                )}
                                keyExtractor={(item, index) => index.toString()}
                                autoplay={false}
                                enableMomentum={true}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={width/2.5}
                                itemHeight={width/4}
                                snapToInterval={20}
                                currentIndex={1}
                                contentContainerCustomStyle={{ marginLeft: 0 }}
                                snapToAlignment={'start'}
                                //   onSnapToItem={(index) => this.snapItem(index, 'recent')}
                                containerCustomStyle={{ marginTop: 30 }}
                            />
                        </View>

                    </View>
                    {/* </View> */}

                    <View style={styles.overlay}>

                        <Text style={[styles.headline1, { textAlign: 'center' }]}>Explore these Reads!</Text>


                        <FlatList
                            data={this.state.expl}
                            horizontal={true}
                            navigation={this.props.navigation}
                            renderItem={(item, index) => this.expllineItem(item, index)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{ height: 1, width: width - 40, backgroundColor: '#27A291' }} />

                        <SnapCarousel
                            data={this.state.expl}
                            style={{ marginLeft: 5, marginRight: 5 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => this.pressIcon1(item)}
                                >

                                    {/* <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    style={{ backgroundColor:this.tags(item.Category_name),padding:'3%'}}
                    cornerRadius={10}>
                         <View style={{flex:1,margin:10,marginBottom:0,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                         <Image
                        resizeMode="stretch"
                        style={{ width: width/4.5,borderRadius:10, height: 120, alignSelf: 'center' }} source={{ uri: item.Image1!=""?item.Image1:null}} />
                      <Image
                        resizeMode="stretch"
                        style={{ width: width/4.5, height: 120,borderRadius:10, alignSelf: 'center',paddingRight:40 }} source={{ uri: item.Image2!=""?item.Image2:null }} />
                     <Image
                        resizeMode="stretch"
                        style={{ width: width/4.5, height: 120,borderRadius:10, alignSelf: 'center',paddingRight:80 }} source={{ uri: item.Image3!=""?item.Image3:null }} />
                     </View>
                     <Text style={{ marginBottom: 5,color:'#fff', fontSize: 16,textAlign:'center',marginTop:10,fontFamily:'AzoSans-Medium'}}>
                        {item.Category_name}
                    </Text>
                   
                </CardView> */}
                                    <CardView
                                        // cardElevation={2}
                                        // cardMaxElevation={2}
                                        style={{ backgroundColor: this.tags(item.Category_name), padding: '2%', height: height/3.5,width:width/1.3 }}
                                        cornerRadius={20}>
                                        <View style={{ flex: 1, margin: 10, marginBottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: width / 4, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, height: height / 4.8, alignSelf: 'center' }} source={{ uri: item.Image1 != "" ? item.Image1 : null }} />
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: width / 4, height: height / 4.8, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, alignSelf: 'center', paddingRight: 40, marginLeft: -10 }} source={{ uri: item.Image2 != "" ? item.Image2 : null }} />
                                            <Image
                                                resizeMode="stretch"
                                                style={{ width: width / 4, height: height / 4.8, borderRadius: 8, alignSelf: 'center', paddingRight: 80, marginLeft: -10 }} source={{ uri: item.Image3 != "" ? item.Image3 : null }} />
                                        </View>
                                        <Text style={{ marginBottom: 5, color: '#fff', fontSize: 16, fontFamily: 'AzoSans-Medium', textAlign: 'center', marginTop: 10 }}>
                                            {item.Category_name}
                                        </Text>
                                        {/* <Image
                    resizeMode="contain"
                    style={{ width: width/1.4, height: 150, alignSelf: 'center' }} source={{ uri: item.Images }} />
                <Text style={{ marginBottom: 5, marginTop: 5, fontWeight: 'bold', fontSize: 15,textAlign:'center' }}>
                    {item.Category_name}
                </Text> */}
                                    </CardView>
                                </TouchableOpacity>

                            )}
                            keyExtractor={(item, index) => index.toString()}
                            autoplay={false}
                            enableMomentum={true}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={width/1.3}
                            itemHeight={height/3.5}
                            contentContainerCustomStyle={{ alignItems: "center", justifyContent: 'center' }}
                            snapToAlignment={'center'}
                            onSnapToItem={(index) => this.snapItem(index, 'expl')}
                            containerCustomStyle={{ marginTop: 30 }}
                        />
                    </View>
                    <View style={styles.overlay}>
                        <Text style={styles.headline1}>Publications</Text>

                        <FlatList
                            data={this.state.pub}
                            horizontal={true}
                            // style={{width: width - 40,backgroundColor:'pink',flex:1}}
                            contentContainerStyle={{alignSelf:'center',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:20}}
                            navigation={this.props.navigation}
                            renderItem={this.publineItem.bind(this)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={{ height: 1, width: width - 40, backgroundColor: '#27A291' }} />

                        <SnapCarousel
                            data={this.state.pub}
                            renderItem={({ item, index }) => (
                                <View style={{ paddingRight: 10 }}>

                                    <TouchableOpacity
                                        onPress={() => this.pressIcon(item)}
                                    >
                                        <CardView
                                            cardElevation={2}
                                            cardMaxElevation={2}
                                            cornerRadius={15}>
                                            <ImageBackground source={{ uri: item.Images != '' ? item.Images : null }} style={{ width: width/2.5, height: height/4, jsutifyContent: 'center', resizeMode: 'cover' }}>
                                                <TouchableOpacity
                                                    onPress={() => this.moreClick(item, "pressIcon")}>
                                                    <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </CardView>
                                        <Text numberOfLines={3} style={styles.selectedTitle}>
                                            {item.Title}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.author}>
                                            {item.Author}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            autoplay={false}
                            enableMomentum={true}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={width/2.5}
                            itemHeight={height/4}
                            snapToInterval={20}
                            contentContainerCustomStyle={{ marginLeft: -80 }}
                            snapToAlignment={'start'}
                            onSnapToItem={(index) => this.snapItem(index, 'pub')}
                            containerCustomStyle={{ marginTop: 30 }}
                        />

                    </View>
                    <View style={styles.overlay}>
                        <Text style={styles.headline1}>Pages</Text>

                        <FlatList
                            data={this.state.rv}
                            horizontal={true}
                            contentContainerStyle={{alignSelf:'center',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:20}}
                            navigation={this.props.navigation}
                            renderItem={this.pagelineItem.bind(this)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={{ height: 1, width: width - 40, backgroundColor: '#27A291' }} />

                        <SnapCarousel
                            data={this.state.rv}
                            renderItem={({ item, index }) => (

                                <View style={{ paddingRight: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.pagePress(item)}
                                    >
                                        <CardView
                                            cardElevation={2}
                                            cardMaxElevation={2}
                                            cornerRadius={8}>
                                            <ImageBackground source={{ uri: item.Images != '' ? item.Images : null }} style={{ width: width/2.5,height:height/6.5, jsutifyContent: 'center', resizeMode: 'cover' }}>
                                                <TouchableOpacity
                                                    onPress={() => this.moreClick(item, "pressIcon")}>
                                                    <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </CardView>
                                        <Text numberOfLines={2} style={styles.selectedTitle}>
                                            {item.Title}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.author}>
                                            {item.Author}
                                        </Text>
                                        <Text style={{ marginBottom: 10, fontSize: 12, color: '#707070', textAlign: 'left', fontFamily: 'AzoSans-Light', marginTop: 0 }}>
                                            {item.Pagedate}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            )}
                            keyExtractor={(item, index) => index.toString()}
                            autoplay={false}
                            enableMomentum={true}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={width/2.5}
                            itemHeight={height/6.5}
                            snapToInterval={20}
                            contentContainerCustomStyle={{ marginLeft: -80 }}
                            snapToAlignment={'start'}
                            onSnapToItem={(index) => this.snapItem(index, 'page')}
                            containerCustomStyle={{ marginTop: 30, backgroundColor: "transparent", marginBottom: 0 }}
                        />
                    </View>
                    {/* <View style={styles.overlay}>
  <Text style={styles.headline1}>Series</Text>
  <FlatList
      horizontal={true}
      data={this.state.series}
      contentContainerStyle={{alignSelf:'center',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:20}}
      navigation={this.props.navigation}
      renderItem={this.serieslineItem.bind(this)}
      extraData={this.state}
      keyExtractor={(item, index) => index.toString()}
  />
  <View style={{ height: 1, width: width - 40, backgroundColor: '#27A291' }} />
  
  
  <SnapCarousel
      data={this.state.series}
      renderItem={({ item, index }) => (
          <View style={{paddingRight:10}}>
  
          <TouchableOpacity
              onPress={() => this.seriesPress(item)}
          >
                  <CardView
                      cardElevation={2}
                      cardMaxElevation={2}
                      cornerRadius={8}>
                      <ImageBackground source={{ uri: item.Images!=''?item.Images:null }}  style={{width: 157, height: 200, jsutifyContent: 'center',resizeMode:'cover' }}>
                          <TouchableOpacity
                              onPress={() => this.moreClick(item,"seriesPress") }>
                              <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                          </TouchableOpacity>
                      </ImageBackground>
                  </CardView>
                  <Text numberOfLines={3} style={styles.selectedTitle}>
                    {item.Title}
                </Text>
                <Text numberOfLines={1} style={styles.author}>
                    {item.Author}
                </Text>
                  </TouchableOpacity>
              </View>
  
      )}
      keyExtractor={(item,index) => index.toString()}
      autoplay={false}
      enableMomentum={true}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={157}
      itemHeight={200}
      snapToInterval={20}
      contentContainerCustomStyle={{marginLeft:-80}}
      snapToAlignment={'start'}
      onSnapToItem={(index) => this.snapItem(index, 'pub')}
      containerCustomStyle={{ marginTop: 30 }}
  />
  
  </View>
  <View style={styles.overlay}>
  <Text style={styles.headline1}>Periodicals</Text>
  
  <FlatList
      data={this.state.periodical}
      horizontal={true}
      navigation={this.props.navigation}
      contentContainerStyle={{alignSelf:'center',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:20}}
      renderItem={this.periodlineItem.bind(this)}
      extraData={this.state}
      keyExtractor={(item, index) => index.toString()}
  />
  <View style={{ height: 1, width: width - 40, backgroundColor: '#27A291' }} />
  
  <SnapCarousel
    data={this.state.periodical}
      renderItem={({item,index}) => (
          
               <View style={{paddingRight:10}}>
               <TouchableOpacity
              onPress={() => this.periodicalPress(item)}
          >
                  <CardView
                      cardElevation={2}
                      cardMaxElevation={2}
                      cornerRadius={8}>
                      <ImageBackground source={{ uri: item.Images!=''?item.Images:null }}  style={{ width: 157, height: 200, jsutifyContent: 'center',resizeMode:'cover' }}>
                          <TouchableOpacity
                                  onPress={() => this.moreClick(item,"periodicalPress") }>
                              <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: '5%' }} source={require('../assets/img/3dots_white.png')} />
                          </TouchableOpacity>
                      </ImageBackground>
                  </CardView>
                  <Text numberOfLines={3} style={styles.selectedTitle}>
                    {item.Title}
                </Text>
                <Text numberOfLines={1} style={styles.author}>
                    {item.Author}
                </Text>
                          </TouchableOpacity>
              </View>
      )}
      keyExtractor={(item,index) => index.toString()}
      autoplay={false}
      enableMomentum={true}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={157}
      itemHeight={200}
      snapToInterval={20}
        contentContainerCustomStyle={{marginLeft:-80}}
      snapToAlignment={'start'}
      onSnapToItem={(index) => this.snapItem(index, 'period')}
      containerCustomStyle={{ marginTop: 30 }}
  />
  </View> */}
                    <LinearGradient style={[styles.overlay1, { marginTop: 10, }]}
                        colors={['#C5F3FB40', '#81EEFF40']}>
                        <Text style={styles.headline1}>Recently Viewed</Text>

                        <FlatList
                            data={this.state.recents}
                            horizontal={true}
                            navigation={this.props.navigation}
                            contentContainerStyle={{alignSelf:'center',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:20}}
                            renderItem={this.recentlineItem.bind(this)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={{ height: 1, width: width - 40, backgroundColor: '#27A291' }} />
                        <SnapCarousel
                            data={this.state.recents}
                            renderItem={({ item, index }) => (
                                <View style={{ paddingRight: 10,marginBottom:'20%' }}>
                                    <TouchableOpacity
                                        onPress={() => this.recentPress(item)}
                                    >
                                        <CardView
                                            cardElevation={2}
                                            cardMaxElevation={2}
                                            cornerRadius={15}>

                                            <ImageBackground source={{ uri: item.Images != '' ? item.Images : null }} style={item.TypeID == 1 ? styles.pubImgStyle : styles.pageImgStyle}>
                                                <TouchableOpacity
                                                    onPress={() => this.moreClick(item, "pressIcon")}>
                                                    <Image style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: item.TypeID == 1 ? '2%' : '1%' }} source={require('../assets/img/3dots_white.png')} />
                                                </TouchableOpacity>
                                            </ImageBackground>

                                        </CardView>
                                        <Text numberOfLines={3} style={styles.selectedTitle}>
                                            {item.Title}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.author}>
                                            {item.Author}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            autoplay={false}
                            enableMomentum={true}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={width/2.5}
                            itemHeight={height/4}
                            snapToInterval={20}
                            contentContainerCustomStyle={{ marginLeft: -80 }}
                            snapToAlignment={'start'}
                            onSnapToItem={(index) => this.snapItem(index, 'recent')}
                            containerCustomStyle={{ marginTop: 30 }}
                        />

                    </LinearGradient>
                    {this.state.expl1 != "" ?
                        <TouchableOpacity style={{ margin: '10%', padding: '2%', alignSelf: 'center' }} onPress={() => this.goToTop()}
                        >
                            <Image source={require('../assets/img/backTotop1.png')} />
                        </TouchableOpacity>
                        : null}
                </ScrollView>
                {/* {!this.state.collectionModal?null:
      <CollectionPopup
          changeState={this.changeState} visible={this.state.collectionModal}
     />} */}

                <Modal1 isVisible={this.state.collectionModal}
                    onBackdropPress={() => this.setState({ collectionModal: false, expanded: false, sectionExpand: false })}>
                    <View
                        style={{
                            backgroundColor: '#fff', alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: !this.state.expanded ? 0.3 : 0.4,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 5,
                            borderBottomEndRadius: 5,
                            width: 300,
                        }}
                    >
                        <TouchableOpacity
                            style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: 200, justifyContent: 'center' }}
                            onPress={() => {
                                AsyncStorage.setItem('postadd_postid',JSON.stringify(Number(this.state.postadd_postid)));
                                AsyncStorage.setItem('postadd_typeid',JSON.stringify(Number(this.state.postadd_typeid)));
                                this.props.navigation.navigate('createCollection')
                                this.setState({ collectionModal: false })
                            }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', width: 200,
                                justifyContent: 'center', alignSelf: 'center'
                            }}>
                                <Image style={{ alignSelf: 'center' }} source={require('../assets/img/createCol.png')} />
                                <Text style={{ fontSize: 16, fontFamily: 'AzoSans-Medium', color: '#27A291', marginTop: 5, width: width / 2.5, alignSelf: 'center', marginLeft: '2%' }}>Create Collection</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#707070', marginTop: '5%', borderWidth: 0.3, width: 300 }} />
                        {!this.state.expanded ? (
                            <TouchableOpacity
                                onPress={this.changeLayout}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '4%',
                                    width: 300,
                                    justifyContent: 'space-between',
                                }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                                        }}
                                    >
                                        <Image source={require('../assets/img/colliconnew1.png')} />
                                        <Text style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', marginLeft: '5%', width: width / 2.9 }}>Collections</Text>
                                    </View>

                                    <Image style={{ alignSelf: 'center', }} source={require('../assets/img/down_arrow.png')} />
                                </View>
                            </TouchableOpacity>
                        ) : (
                                <View style={{ height: !this.state.expanded ? 50 : 145, }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: '4%',
                                        backgroundColor: '#27A291',
                                        width: 300,
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row', width: 260, justifyContent: 'center', alignItems: 'center', alignSelf: "center",
                                        }}>
                                            <Image source={require('../assets/img/coll_white1.png')} />
                                            <Text style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#ffff', marginLeft: '5%', width: width / 2.9 }}>Collections</Text>
                                        </View>
                                        <TouchableOpacity
                                            // style={{ marginLeft: '-15%', }}
                                            onPress={this.changeLayout}>
                                            <Image style={{ alignSelf: 'center', }} source={require('../assets/img/up_arrow_white.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <ScrollView persistentScrollbar={this.state.collection.length > 2 ? true : false}>
                                        <FlatList
                                            data={this.state.collection}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <View>
                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#f0f0f0', }}
                                                        onPress={() => this.collectionBook(item.title, item.id)}>
                                                        <View style={{
                                                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                                        }}>
                                                            <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', textAlign: 'center', width: 180 }}>{item.title}</Text>
                                                            <Image style={{ alignSelf: 'center', marginLeft: '0%' }} source={item.privacy == 'Public' ? require('../assets/img/worldwide.png') : require('../assets/img/not.png')} />
                                                            <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => { item.SectionStatus == 1 ? this.sectionClick(item.id) : null }}>
                                                                <Image style={{ alignSelf: 'center', marginLeft: '2%', }} source={item.SectionStatus == 0 ? null : require('../assets/img/dropdown.png')} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                                                    {this.state.sectionExpand && item.id == this.state.secCollid
                                                        //  item.id==this.state.secCollid
                                                        //    item.SectionStatus==1
                                                        ?
                                                        <FlatList
                                                            data={this.state.section}
                                                            keyExtractor={(item, index) => index.toString()}
                                                            renderItem={({ item }) => (
                                                                <View>
                                                                    {item.SectionID != 0 ?
                                                                        <View>
                                                                            <TouchableOpacity
                                                                                style={{ backgroundColor: '#f0f0f0', width: 300, }}
                                                                                onPress={() => this.secBook(item.Title, item.CollectionsID, item.SectionID, item)}
                                                                            >
                                                                                <View style={{
                                                                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                                                                }}>
                                                                                    <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', textAlign: 'center', width: 230 }}>{item.Title}</Text>
                                                                                    {/* <Image style={{ alignSelf: 'center', marginLeft: '-10%' }} source={item.privacy=='Public'?require('../assets/img/worldwide.png'):require('../assets/img/not.png')} /> */}
                                                                                    {/* <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{item.SectionStatus==1?this.sectionClick(item.id):null}}>
                             <Image style={{ alignSelf: 'center',marginLeft:'2%',}} source={item.SectionStatus==0?null:require('../assets/img/dropdown.png')} />
                     </TouchableOpacity>  */}
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            <Divider style={{ backgroundColor: '#707070', borderWidth: 0.2 }} />
                                                                        </View>
                                                                        : null}
                                                                </View>)} /> : null}

                                                    {/* <TouchableOpacity
                                 style={{backgroundColor:'#f0f0f0',width:300,}}
                                   onPress={() => this.collectionBook("Cats in the Wild")}>
                                   <View style={{
                                     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", padding: '4%',
                                   }}>
                                     <Text style={{ fontSize: 17, color: '#707070', textAlign: 'center', width: 250 }}>Cats in the Wild</Text>
               
                                     <Image style={{ alignSelf: 'center', marginLeft: '-5%' }} source={require('../assets/img/not.png')} />
                                   </View>
                                 </TouchableOpacity>
               
                                 <Divider style={{ backgroundColor: '#707070',borderWidth:0.3 }} /> */}

                                                </View>
                                            )} />
                                    </ScrollView>
                                </View>
                            )}

                        <TouchableOpacity
                            onPress={() => this.readlaterClick()}>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', padding: '4%', width: 200,
                                justifyContent: 'center', alignSelf: 'center'
                            }}>
                                <Image source={require('../assets/img/readlaternew1.png')} />
                                <Text style={{ fontSize: 14, fontFamily: 'AzoSans-Regular', color: '#707070', marginLeft: '5%', width: width / 2.6 }}>Read Later</Text>
                                <Divider style={{ backgroundColor: '#707070' }} />

                            </View>
                        </TouchableOpacity>

                    </View>
                </Modal1>
                <Modal1 isVisible={this.state.loading}
                backdropOpacity={0.8}
                // onBackdropPress={() => this.setState({ loading: true })}
                >
                    <Image source={require('../assets/gif/logo.gif')} style={{
                        alignSelf: 'center',
                        width: 140,
                        height: 140
                    }} />
                </Modal1>
                <Modal1
                    // animationType={"slide"}
                    onBackdropPress={() => this.setState({ loginPopup: false })}
                    isVisible={this.state.loginPopup}>
                    <LoginModal
                        navigation={this.props.navigation}
                        closeModal={() => this.closeLoginPopup()}
                        close={() => this.setState({ loginPopup: false })}
                    />

                </Modal1>
                {/* <Modal1
               animationType="slide"
               transparent
                isVisible={this.state.readlaterPopup}
                          onRequestClose={() => {
                              console.log('Modal has been closed.');
                          }}> */}
                {this.state.readlaterPopup ?
                    <BlurModal visible={this.state.readlaterPopup}
                        children={
                            <View style={{
                                left: 0, right: 0, bottom: '6%', position: 'absolute',
                                height: '8%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#27A291',
                            }}>
                                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', width: width / 1.4 }}>{!this.state.exists ? "Added to ReadLater" : "Already Added in ReadLater"}</Text>
                                <TouchableOpacity onPress={()=>this.setState({undo:true})}>
                                    <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline', }}>Undo</Text>
                                </TouchableOpacity>
                            </View>
                        } />
                    : null}
                {/* </Modal1> */}
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.tabsss}
                        onPress={() => this.toggleTab1()}>
                        <Image style={{ width: 25, height: 25 }} source={require('../assets/img/logo.png')} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
                        <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../assets/img/library.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
                        <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../assets/img/search.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.tabsss, { width: 28, height: 28, borderRadius: 28 / 2, }]} onPress={() => this.toggleTab4()}>
          
            <View style={{flexDirection:'row'}}>
            <Image style={{ width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }} source={{ uri: this.state.explore_page == '0' ? this.state.avatar : 'http://pagevio.com/uploads/profile/noimage.jpg' }}></Image>
        {/* <MenuIcon
            name={'microsoft-xbox-controller-menu'}
            size={15}
            color={'#27A291'}
            style={{top:'50%',right:'40%'}}
        /> */}
          <Image style={{top:'60%',right:'38%',width:15,height:15}} source={require('../assets/img/menuimg.png')}/>
            </View>
                    
          </TouchableOpacity>

                </View>
                {/* : 
                     <View style={styles.bottomBar}>
                   <TouchableOpacity
                       style={styles.tabsss}
                       onPress={() => this.toggleTab1()}>
                       <Image source={require('../assets/img/logo.png')} />
                   </TouchableOpacity>
                 
                   <TouchableOpacity style={[styles.tabsss,{ width: 28, height: 28,borderRadius:28/2,borderColor:'#27A291',borderWidth:1}]} onPress={() => this.toggleTab4()}>
                       <Image style={{ width: 28, height: 28,borderRadius:28/2,borderColor:'#27A291',borderWidth:1}} source={{uri:this.state.avatar}}></Image>

                   </TouchableOpacity>
              
            </View>
        } */}
            </SafeAreaView>
            //   </Content>

            // <Footer style={{ backgroundColor: '#fff', alignItems: 'center', }}>
            //   <FooterTab style={{ backgroundColor: "white", marginLeft: '2%', marginRight: '2%', alignItems: 'center', }}>
            //     <TouchableOpacity
            //       style={styles.tabsss}
            //       onPress={() => this.toggleTab1()}>
            //       <Image source={require('../assets/img/logo.png')} />
            //       {/* <Text>Home</Text> */}
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
            //       <Image source={require('../assets/img/collection.png')} />
            //       {/* <Text>Collection</Text> */}
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
            //       <Image source={require('../assets/img/search.png')} />
            //       {/* <Text>Search</Text> */}
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab4()}>
            //       {/* <Drawer
            // ref={(ref) => { this.drawer = ref; }}
            // content={<SideBar navigator={this.navigator} />}
            // onClose={() => this.closeDrawer()} > */}
            //       {/* <TouchableOpacity onPress = {() =>navigation.openDrawer() }>  */}
            //       <Image style={{ width: 28, height: 28,borderRadius:28/2 }} source={{uri:this.state.avatar}}></Image>
            //       {/* <Text>Menu</Text> */}
            //       {/* </Drawer> */}
            //     </TouchableOpacity>
            //   </FooterTab>Our t
            // </Footer>
            // </Container>
            // </Drawer>
        )
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '6%',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        elevation: 8
    },
    title: {
        marginBottom: 3,
        marginTop: 10,
        color: '#242126',
        textAlign: 'center',
        fontFamily: 'AzoSans-Regular',
        fontSize: 12
    },
    selectedTitle: {
        marginBottom: 3,
        marginTop: 10,
        color: '#242126',
        textAlign: 'left',
        fontFamily: 'AzoSans-Medium',
        fontSize: 16,
        //   marginRight:1,
    },
    author: {
        marginBottom: 5,
        fontSize: 12,
        color: '#707070',
        textAlign: 'left',
        fontFamily: 'AzoSans-Light',
    },
    //   tabsss:{
    //       margin:'2%',
    //       padding:'2%'
    //   },
    // containerStyle: {
    //     alignSelf: 'center',
    //     width: width,
    //     overflow: 'hidden',
    //     height: width / 2.2,
    //   },
    //   sliderContainerStyle: {
    //     borderRadius: width,
    //     width: width * 2,
    //     height: width * 2,
    //     marginLeft: -(width / 2),
    //     position: 'absolute',
    //     bottom: 0,
    //     overflow: 'hidden',
    //     elevation:1,
    //     backgroundColor:'#fff',
    //     resizeMode:'cover'
    //     },
    modal: {
        // alignItems: 'center',
        flex: 0.3,
        width: 300,
    },
    containerStyle: {
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
    },
    sliderContainerStyle: {
        borderRadius: width,
        width: width * 2,
        height: width * 2,
        marginLeft: -(width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: '#27A291'
    },
    active: { height: 4, width: 20, backgroundColor: '#27A291' },
    inactive: { height: 2, width: 20, backgroundColor: '#707070' },
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: '25%',
        left: 0,
        right: 0,
        alignItems: 'center'

    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        // marginTop:'10%',
        justifyContent: "center",
        alignItems: "center",
    },
    headline1: {
        color: 'black',
        fontFamily: 'Montserrat-Light',
        fontSize: 24,
        width: width - 40,
        margin: '2%',
        marginTop: '2%'
    },
    overlay2: {
        // marginTop:'10%',
        // position:'absolute',
        // top:0,
        marginTop: '-47%',
        justifyContent: "center",
        alignItems: "center",
    },
    overlay1: {
        // backgroundColor:'skyblue',
        justifyContent: "center",
        alignItems: "center",
        // marginBottom:'5%'
        // marginBottom:'5%'
    },
    logo: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: 160,
        height: 52
    },
    backdrop: {
        flex: 1,
        marginTop: '-80%'
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    tabs: {
        flexDirection: 'row',
        padding: '2%',
        borderBottomColor: 'gray',
        marginVertical: 5,
        marginHorizontal: 5 * 2,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    fragment: {
        backgroundColor: '#fff',
        flex: 0.9
    },
    header: {
        flexDirection: 'row',
        // flex: 0.5,
        //   height:'9%',
        top: 0,
        left: 0,
        right: 0,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: '#fff',
        borderBottomColor: '#707070'
    },
    tabsss: {
        alignItems: 'center', justifyContent: 'center'
    },
    active1: {
        borderRadius: 10,
    },
    inactiveText: {
        color: '#707070',
        padding: '5%',
        fontSize: 14,
        fontFamily: 'AzoSans-Medium'
    },

    activetext1: {
        padding: '5%',
        fontSize: 14,
        color: 'white',
        fontFamily: 'AzoSans-Medium'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#808080',
        padding: 10,
        margin: 2,
    },
    pubImgStyle: {
        width:width/2.5, height: height/4,
        borderRadius: 15,
        //  justifyContent: 'center'
    },
    pageImgStyle: {
        elevation: 1,
        width: width/2.8, height: height/4.5,
        borderRadius: 15,
        //    justifyContent: 'center'
    }
})

function mapStateToProps(state) {
    return {
        addCol: state.apiReducer.addCol,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        popupAddCol: () => dispatch({ type: 'ADD_COL' }),
        collSecPopup: () => dispatch({ type: 'COLLSEC_POPUP' }),
        savelogout: () => dispatch({ type: 'CHECKLOGOUT' }),
        savelogin: () => dispatch({ type: 'CHECKLOGIN' })


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
