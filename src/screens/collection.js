import React, { Component } from 'react'
import {
    View, FlatList, SafeAreaView,
    AsyncStorage, Modal, ImageBackground, BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { FloatingAction } from "react-native-floating-action";
import LinearGradient from 'react-native-linear-gradient';
console.disableYellowBox = true;
import HTMLView from 'react-native-htmlview';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import { keys, setAsyncStorage } from '../asyncStorage';
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Collection extends Component {
    constructor() {
        super();
        this.state = {

            actions: [
                {
                    text: "Create Collection",
                    icon: require("../assets/img/collection/createcoll.png"),
                    name: "createCollection",
                    position: 5
                },
                {
                    text: "Merge Collection",
                    icon: require("../assets/img/collection/mergecollection.png"),
                    name: "mergeCollection",
                    position: 4
                },
                {
                    text: "Edit Collection",
                    icon: require("../assets/img/collection/edit.png"),
                    name: "editCollection1",
                    position: 3
                },
                {
                    text: "Remove Collection",
                    icon: require("../assets/img/collection/remove.png"),
                    name: "removeCollection",
                    position: 2
                },
                {
                    text: "Filter Options",
                    icon: require("../assets/img/collection/filter.png"),
                    name: "filter_date",
                    position: 1
                }
            ],
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            removeFooter: false,
            modalVisible: false,
            mergeModal: false,
            newvar: false,
            newval: 0,
            collection: [],
            loading: true,
            getuserid: '',
            avatar: '',
            getMergeName: '',
            getDeletedName: '',
            mergePopup: "",
            collFilter: 'DESC',
            collCoverImg: '',
            setCollectionId: ''
            // getuserid:''

        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
        // this.props.changeNavNews();
        this.props.navigation.push('mainpage')
    }
    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        });
        this.props.navigation.push('collection')

    }
    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });
        this.props.navigation.push('search')

    }
    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true
        });
        this.props.navigation.openDrawer()
    }

    showModal1 = () => {
        console.log('enters')
        this.setState({
            mergeModal: true,
            //    mergePopup:0

        });
        setTimeout(() => {
            // this.props.changeRemove()
            this.setState({
                mergeModal: false
            })
            this.props.mergePopup();

            //   this.props.changeRemove();
        }, 3000);
        //   this.props.mergePopup();
        //   console.log('modal state is ',this.props.mergePopup())
    }
    async componentDidMount() {
        AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
        console.log('collection userid is ', this.state.getuserid)
        AsyncStorage.setItem('bookmarkUserid', this.state.getuserid);
        AsyncStorage.setItem('pinsFilter',"DESC");
        AsyncStorage.setItem('collSecFilter',"DESC");
        AsyncStorage.setItem('sectionId',JSON.stringify(""));
        // AsyncStorage.setItem('collectionFilter',"DESC");
        AsyncStorage.getItem('collectionFilter').then((val) =>this.setState({ collFilter: val }) ).done();
        // AsyncStorage.setItem('collectionId','');
        // AsyncStorage.setItem('col_id','');
        this.CheckConnectivity();

        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            AsyncStorage.setItem('collSecFilter',"DESC");

            AsyncStorage.getItem('collectionFilter').then((val) =>this.setState({ collFilter: val })).done();

            this.CheckConnectivity();

        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    coll_CoverData() {
        var json = JSON.stringify({
            "UserID": this.state.getuserid
        });
        fetch("http://162.250.120.20:444/Login/CollectionImage",
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
                this.setState({ collCoverImg: responseJson })
                console.warn(responseJson)
                //alert(this.state.data.status)
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    exploredata_Pic(userid) {
        // this.setState({ loading: true })
        var json = JSON.stringify({
            'userid': userid
        });
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
                // this.setState({loading:false})
                console.warn(responseJson)
                for (let i = 0; i < responseJson.length; i++) {
                    // alert(this.state.bookdetail[0].Image)
                    this.setState({
                        avatar: responseJson[i].avatar,

                    })
                }
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    pressIcon = (item) => {
        console.log('entered ', item)
        let { collection } = this.state;
        collection = collection.map(e => {
            this.setState({ setCollectionId: item.collectionsID })
            //     if (item.collectionsID === e.collectionsID) {
            AsyncStorage.setItem('collectionId', item.collectionsID + "");
            AsyncStorage.setItem('coll_name', item.Title);
            AsyncStorage.setItem('coll_desc', item.Description);
            AsyncStorage.setItem('col_id', JSON.stringify(Number(item.collectionsID)));
            AsyncStorage.setItem('coll_Img', item.Image1 != "" ? item.Image1 : null);
            setAsyncStorage(keys.collectionId, item.collectionsID);
            AsyncStorage.setItem('newColl_Id', JSON.stringify(item.CollectionsID));
            setAsyncStorage(keys.newCollId, item.collectionsID);
            AsyncStorage.setItem('profileCollection',false);
            // AsyncStorage.setItem('profile_userid',JSON.stringify(null));
            AsyncStorage.setItem('userid',this.state.getuserid);
            this.props.navigation.navigate('collectionDetail', { 'collId': item.collectionsID.toString() + "" });
        });
    }

    exploredata(userid) {
        this.setState({ loading: true })
        var json = JSON.stringify({
            'UserID': userid,
            "SortBy":this.state.collFilter
            // "SortBy": "DESC"
        });
        // alert(json)
        fetch("http://162.250.120.20:444/Login/Collection",
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
                this.setState({ collection: responseJson, loading: false })
                console.warn(responseJson)
                console.warn("collection")
                //alert(this.state.data.status)  
            })
            .catch((error) => {
                console.warn(error);
            });
    }

   

    // componentDidUpdate(){
    //     // {this.getData()}
    //     console.log('componentdidupdate is called')
    // }

    CheckConnectivity() {
        NetInfo.fetch().then(state => {

            console.log("Connection type cheking", state.type);
            console.log("Is connected cheking?", state.isConnected);

            if (state.isConnected == true) {
                { this.getData(); }
            } else {
                alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
            }
        });
    }
    handleBackButtonClick() {
        this.backpress()
        return true;
    }
    getData() {
        setTimeout(() => {
            AsyncStorage.getItem('bookmarkUserid').then((val) => { console.log('value is ', val) }).done();
            console.log('userid is ', this.state.getuserid);
            { this.exploredata_Pic(this.state.getuserid) }
            { this.coll_CoverData() }
            { this.exploredata(this.state.getuserid) }

        }, 1000)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.focusListener.remove()
    }
    renderItem_card({ item }) {
        // const value = item;
        return (
            <View style={{
                // flex:1,
                width: '50%',
                padding: '2%',
                backgroundColor: '#ffff',

            }}>
                <TouchableOpacity
                style={styles.button}
                    onPress={() => this.pressIcon(item)}>
                   
                    <View style={[{ flex: 1, flexDirection: 'row' }]}
                    >
                        <Image style={{ width: '75%', height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                            source={{ uri: item.Image1 != "" ? item.Image1 : null }} />
                        <View style={{ flex: 1, flexDirection: 'column', borderLeftWidth: 0.3, borderColor: '#cccccc' }}>
                            <View style={{ borderBottomWidth: 0.3, borderColor: '#cccccc' }}>
                                <Image
                                    style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                                    source={{ uri: item.Image2 != "" ? item.Image2 : null }} />
                            </View>
                            <View>
                                <Image
                                    style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                                    source={{ uri: item.Image3 != "" ? item.Image3 : null }} />
                            </View>
                        </View>
                    </View>
                   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.pressIcon(item)}>
                <View style={{ padding: '2%', margin: '1%' }}>
                        <Text numberOfLines={2} style={{ fontSize: 16, fontFamily: 'AzoSans-Medium' }}>{item.Title}</Text>
                        <Text style={styles.subtitle}>{item.PublicationCount} publications</Text>
                        <Text style={styles.subtitle}>{item.PageCount} pages</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    backpress = () => {
        //    console.log('before set',this.props.nav)
        // this.props.changeNavNews();
        // this.props.navigation.navigate('MainpageTabs');
        this.props.navigation.goBack();
        //    console.log('after set',this.props.nav);
    }
    bookmarkPress = () => {
        AsyncStorage.setItem('bookmark', JSON.stringify(true));
        this.props.navigation.navigate('bookmarks')
    }
    readlaterPress = () => {
        AsyncStorage.setItem('readlater', JSON.stringify(true));
        this.props.navigation.navigate('readlater')
    }

    collCoverItems({ item }) {
        // const value = item;
        return (
            <View style={{ height:height/4, width: width }}>


                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={{ height: height/4, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image1!=""?null:'#27A291' }}
                        source={{ uri: item.Image1 != "" ? item.Image1 : null }}
                    />
                    <Image style={{ height: height/4, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image2!=""?null:'#27A291' }}
                        source={{ uri: item.Image2 != "" ? item.Image2 : null }} />
                    <Image style={{ height: height/4, width: width / 5, resizeMode: 'cover', alignItems: 'center',backgroundColor:item.Image3!=""?null:'#27A291', justifyContent: 'center', }}
                        source={{ uri: item.Image3 != "" ? item.Image3 : null }}
                    />
                    <Image style={{ height: height/4, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image4!=""?null:'#27A291' }}
                        source={{ uri: item.Image4 != "" ? item.Image4 : null }} />
                    <Image style={{ height: height/4, width: width / 5, resizeMode: 'cover',backgroundColor:item.Image5!=""?null:'#27A291' }}
                        source={{ uri: item.Image5 != "" ? item.Image5 : null }} />
                </View>


            </View>
        )
    }
    render() {
        // AsyncStorage.getItem('loading').then((value) => {value==true?
        //     console.log('value of loading state is ',value):null}).done();

        // this.exploredata(this.state.getuserid):null}).done();

        // {this.exploredata(this.state.getuserid)}
        // console.log('in collection merge popup ',this.props.merge);

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
                <View style={styles.staticheader}>

                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: '8%', paddingRight: '5%', flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center', }}>
                        <LinearGradient style={{ borderRadius: 10 }} colors={
                            ['#27A291', '#27A291']}>
                            <TouchableOpacity >
                                <Text style={styles.activeText}>Collection</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        {/* <LinearGradient colors={
                            ['#24D4BC', '#27A291']}>
                           
                        </LinearGradient> */}
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate('pins')
                            }}
                        >
                            <Text style={styles.headerText}
                            >Pins</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.readlaterPress()}
                        >
                            <Text style={styles.headerText}
                            >Read Later</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.bookmarkPress()}
                        >
                            <Text style={styles.headerText}>Bookmarks</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={{ paddingLeft: '2%', paddingRight: '2%', width: width / 10, alignSelf: 'center' }} onPress={() => this.backpress()}>
                    <Image
                            style={{ alignSelf: 'center',width:50,height:50 }} 
                            source={require('../assets/img/close.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ marginBottom: '10%' }}>
                    {/* <ImageBackground style={{ width: width, height: 150, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)' }}
                        imageStyle={{
                            opacity: 0.5
                        }}
                        source={require('../assets/img/collectimg.png')}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Library</Text>
                    </ImageBackground> */}
                    <FlatList
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            // marginBottom: '2%',
                            width: width,
                            height: height/4
                        }}
                        data={this.state.collCoverImg}
                        extraData={this.state}
                        renderItem={this.collCoverItems.bind(this)}
                        // numColumns={2}
                        keyExtractor={(item, index) => index.toString()}

                    />
                    <View style={styles.overlay} />

                    <View style={{ position: 'absolute', top: 80, alignItems: 'center', width: width, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'AzoSans-Bold', fontSize: 24 }}>Library</Text>

                    </View>
                    <FlatList
                        contentContainerStyle={{
                            flex: 0.5,
                            marginTop: '2%',
                            // marginBottom:this.state.collection.length<=4?'60%':null,
                            // marginLeft:'5%'
                        }}
                        data={this.state.collection}
                        extraData={this.state}
                        renderItem={this.renderItem_card.bind(this)}
                        numColumns={2}
                        removeClippedSubviews={false}
                        enableEmptySections={false}
                        keyExtractor={(item, index) => index.toString()}
                    />


                </ScrollView >
                <FloatingAction
                    style={{ color: '#27A291',fontSize:10,fontFamily:'AzoSans-Regular' }}
                    position={'right'}
                    //    tintColor={'#27A291'}
                    distanceToEdge={50}
                    ref={(ref) => { this.floatingAction = ref; }}
                    actions={this.state.actions}
                    color={'#27A291'}
                    onPressItem={name => {
                        if(name=="createCollection"){
                            AsyncStorage.setItem('postadd_postid',JSON.stringify(Number("")));
                            AsyncStorage.setItem('postadd_typeid',JSON.stringify(Number("")));
                        }
                        this.props.navigation.navigate(name)
                        // console.log(`selected button: ${name}`);
                    }}
                />
                <Modal1 isVisible={this.state.loading}  >
                    <Image source={require('../assets/gif/logo.gif')} style={{
                        alignSelf: 'center',
                        width: 140,
                        height: 140
                    }} />
                </Modal1>



                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.mergeModal}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={{
                        left: 0, right: 0, bottom: 0, position: 'absolute',
                        height: '10%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#27A291',
                    }}>
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Merged - {this.state.getMergeName} </Text>
                        <TouchableOpacity style={{ marginTop: '2%', alignSelf: 'flex-end', marginRight: '2%' }}
                        // onPress={()=>this.undoFunc(item)}
                        >
                            <Text style={{ fontSize: 16, color: '#fff', textDecorationLine: 'underline' }}>Undo</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal1 isVisible={this.state.loading}>
                    <Image source={require('../assets/gif/logo.gif')} style={{
                        alignSelf: 'center',
                        width: 140,
                        height: 140
                    }} />
                </Modal1>
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.tabsss}
                        onPress={() => this.toggleTab1()}>
                        <Image style={{ width: 25, height: 25 }} source={require('../assets/img/logo.png')} />
                        {/* <Text>Home</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab2()}>
                        <Image style={{ }} source={require('../assets/img/collnobg.png')} />
                        {/* <Text>Collection</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabsss} onPress={() => this.toggleTab3()}>
                        <Image style={{width:50,height:50,marginTop:5}} source={require('../assets/img/search.png')} />
                        {/* <Text>Search</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabsss, { width: 28, height: 28, borderRadius: 28 / 2, }]} onPress={() => this.toggleTab4()}>
          
          <View style={{flexDirection:'row'}}>
          <Image style={{ width: 28, height: 28, borderRadius: 28 / 2, borderColor: '#27A291', borderWidth: 1 }} source={{ uri: this.state.avatar ? this.state.avatar : null}}></Image>
          <Image style={{top:'60%',right:'38%',width:15,height:15}} source={require('../assets/img/menuimg.png')}/>
          </View>
                  
        </TouchableOpacity>

                </View>
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
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
    // tabsss: {
    //     alignItems: 'center', 
    //     justifyContent: 'center'
    // },
    subtitle:{
        color: '#707070',
        fontSize:12,
        fontFamily:'AzoSans-Light'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 50,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    staticheader: {
        // paddingRight:'2%',
        flexDirection: 'row',
        // justifyContent: 'center', 
        alignItems: 'center',
        // height: '8%',
        backgroundColor: '#ffff',
        elevation: 1,
        borderBottomColor: '#707070'


    },
    button: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        borderRadius:10,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.7,
        backgroundColor: 'black',
        width: width,
        height: height/4
    },
    activeText: {
        padding: '5%',
        fontSize: 14,
        color: 'white',
        fontFamily: 'AzoSans-Medium'
    },
    headerText: {
        padding: '5%',
        fontSize: 14,
        color:'#707070',
        fontFamily:'AzoSans-Medium'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: '25%',
        left: 0,
        right: 0,
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
    },
    bottomLine: {
        height: '8%',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#00000029'

    },
})
function mapStateToProps(state) {
    return {
        merge: state.apiReducer.merge,
        remove: state.apiReducer.remove
    }
}


function mapDispatchToProps(dispatch) {
    return {
        mergePopup: () => dispatch({ type: 'MERGE_POPUP1' }),
        removePopup: () => dispatch({ type: 'REMOVE_POPUP' }),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);