import React, { Component } from 'react'
import {
    View, FlatList,SafeAreaView,
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
// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Pins extends Component {
    constructor() {
        super();
        this.state = {
            list: [
                {
                    id: 0,
                    bgcolor: "#569BE0",
                    title: "Our Planet",
                    publications: '4 publications',
                    pages: '3 pages',
                    page: 'Page 2',
                    subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
                },
                {
                    id: 1,
                    bgcolor: "#7C3BD3",
                    title: "A Cat's Tale",
                    publications: '4 publications',
                    pages: '3 pages',
                    page: 'Page 2',
                    subtitle: "Share interesting Quotes or Phrases On Social Media"
                },
                {
                    id: 2,
                    bgcolor: "#EB9A17",
                    title: "Read Anywhere",
                    subtitle: "You can also read the same publication on your PC"
                },
                {
                    id: 2,
                    bgcolor: "#EB9A17",
                    title: "Read Anywhere",
                    page: 'Page 2',
                    subtitle: "You can also read the same publication on your PC"
                }
            ],
            actions: [
                {
                    text: "Remove Pins",
                    icon: require("../assets/img/plus.png"),
                    name: "share_modal",
                    position: 2
                },
                {
                    text: "Filter Options",
                    icon: require("../assets/img/plus.png"),
                    name: "help",
                    position: 1
                }
            ],
            boolean: false,
            newval: 0,
            modalVisible: false,
            getuserid: '',
            pins: '',
            loading: true,
            getDeletedName: '',
            pinsCoverImg:'',
            SortBy:'DESC',
            sec_name:''


        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    showModal = () => {
        console.log('enters')
        this.setState({
            modalVisible: true
        });
        setTimeout(() => {
            // this.props.changeRemove()
            this.setState({
                modalVisible: false
            })
            //   this.props.changeRemove();
        }, 5000);
        console.log('modal state is ', this.state.modalVisible)
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
        console.log('user id ', this.state.getuserid)
        AsyncStorage.getItem('newsectionFilter').then((val) => this.setState({ SortBy: val })).done();
        AsyncStorage.getItem('sec_name').then((value) => this.setState({ sec_name : value })).done();

        console.log('user id ',this.state.getuserid,this.state.SortBy);
     //    AsyncStorage.getItem('sectionPin').then((val) =>Alert(val)).done();
     
        this.CheckConnectivity();
     
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
         // AsyncStorage.getItem('sectionPin').then((val) =>Alert.alert(val)).done();
         
         // AsyncStorage.getItem('sectionPin').then((val) => this.setState({ newsection: val })).done();
         AsyncStorage.getItem('newsectionFilter').then((val) => this.setState({ SortBy: val })).done();
         console.log('user id ',this.state.getuserid,this.state.SortBy);
     
         this.CheckConnectivity();
     
     })
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
    getData() {
        setTimeout(() => {
            { this.pinsCoverData(this.state.getuserid) }
            { this.exploreData(this.state.getuserid) }
        }, 5)
    }
    exploreData(userid) {
        var json = JSON.stringify({
            "options": "Select", "page_id": "", "type": "", "collection_id": "", "section_id": "", "Description": "", "user_id": userid,"SortBy":this.state.SortBy
        });
        fetch("http://162.250.120.20:444/Login/pinsInsertGet",
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
                this.setState({ pins: responseJson, loading: false })
                console.warn(responseJson)

                //alert(this.state.data.status)


            })

            .catch((error) => {
                console.warn(error);
            });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.focusListener.remove();
    }
    handleBackButtonClick() {
        //   this.backpress()
        this.props.navigation.navigate('collectionDetail');
        return true;
    }
    cardPress = (item) => {
        let { pins } = this.state;
        // console.log('items are', item)
        pins = pins.map(e => {
            if (item.page_id === e.page_id) {
                var postiddata = JSON.stringify({ 'postid': item.page_id });
                // item.like = !e.like;
                console.log('post id ', item.page_id)
                AsyncStorage.setItem('postid',JSON.stringify(item.page_id));
                AsyncStorage.setItem('typeid',JSON.stringify(4));
                // AsyncStorage.setItem('postid', item.page_id);
                // AsyncStorage.setItem('typeid', 4);

                // AsyncStorage.setItem('postid',item.page_id);
                { this.getDa() }
                return this.props.navigation.navigate('readingBook')
            } else {
                return e;
            }
        });
    }
    getDa = () => {
        setTimeout(() => {
            AsyncStorage.getItem('postid').then(value => { console.log(value) }).done();

        }, 5);
    }
    renderItem_card({ item }) {
        const value = item;
        return (
            <View style={{ width:width/2.3, elevation: 3,margin:10 }} >
                <TouchableOpacity onPress={()=>this.cardPress(item)} >
                  <View style={{ elevation: 2, backgroundColor: '#fff', borderRadius: 10,
                // alignItems:'center',alignSelf:"center",justifyContent:'center'
                 }}>
                    <View style={{ width: width / 2 - 20, height: height / 5.2, flex:1,alignItems: 'center', justifyContent: 'center' }}>
                        <Text numberOfLines={9} style={{width: width / 2 - 40,height:height/5.2,textAlign:'center',marginTop:5,marginBottom:5}}>{item.description}</Text>
                    </View>
     {/* <View style={{ marginLeft:10,marginRight:10,  alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{item.description}</Text>
                    </View> */}
                              {/* <HTMLView style={{width:width/2-30,height:height/6,alignSelf:'center',padding:'5%'}} value={item.page_title}/> */}

                    </View>
                    <Text style={{ fontSize: 16,width: width / 2 - 40,fontWeight: 'bold',textAlign:'center',marginTop:5,marginBottom:5}}>{item.page_url}</Text>
                    </TouchableOpacity>
                {/* <View style={{ alignItems: 'center', marginLeft: '15%', marginBottom: 5, marginTop: 5}}> */}
                    {/* <Text style={{ color: '#707070', fontSize: 16 }}>{item.page}</Text> */}
                {/* </View> */}
            </View>

            //   <View style={{ flex:1 }}>
            //     <Image
            //       style={{ width: width/2-50, height: 80,marginTop:10, alignSelf: 'center'}}
            //       source={item.img}
            //       onPress={() => console.log("Works!")}
            //       activeOpacity={0.7}
            //     />
            //     <Text style={{ margin: '5%', color: '#2d2e2d',textAlign:'center',fontWeight:'bold' }}>{item.title}</Text>
            //   </View>

        )

    }
    pinsCoverData(userid) {
        var json = JSON.stringify({
         "user_id":userid
        });
        fetch("http://162.250.120.20:444/Login/PinsCover",
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
                this.setState({ pinsCoverImg: responseJson })
                console.warn(responseJson)
                //alert(this.state.data.status)
            })
            .catch((error) => {
                console.warn(error);
            });
      }
    pinscoverItems({ item }) {
        // const value = item;
        return (
            <View style={{flex:1}}>
                
                    <ImageBackground 
                    style={{flexDirection: 'row' }}
                    >
                        <Image style={{  height:150,width:width/5, resizeMode: 'cover',backgroundColor: item.Image2!=""?'rgba(0,0,0,1)':'#fff' }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                        <Image style={{  height:150,width:width/5, resizeMode: 'cover',backgroundColor: item.Image2!=""?'rgba(0,0,0,1)':'#fff'  }}
                            source={{ uri: item.Image2!=""?item.Image2:null }} />
                        <ImageBackground style={{  height:150,width:width/5, resizeMode: 'cover',alignItems:'center',justifyContent:'center',backgroundColor: item.Image3!=""?'rgba(0,0,0,1)':'#fff'}}
                            source={{ uri: item.Image3!=""?item.Image3:null }} >
                            <Text style={{ textAlign: 'center', color:item.Image3!=""?'#fff':'#000', fontWeight: 'bold', fontSize: 18 }}>{this.state.sec_name}</Text>
                        </ImageBackground>
                        <Image style={{  height:150,width:width/5, resizeMode: 'cover',backgroundColor: item.Image4!=""?'rgba(0,0,0,1)':'#fff' }}
                            source={{ uri: item.Image4!=""?item.Image4:null }} />
                        <Image style={{  height:150,width:width/5, resizeMode: 'cover',backgroundColor: item.Image5!=""?'rgba(0,0,0,1)':'#fff'  }}
                            source={{ uri: item.Image5!=""?item.Image5:null }} />

                    </ImageBackground>
                    {/* <View style={{  marginTop: '-20%',
        justifyContent: "center",
        alignItems: "center",backgroundColor:'pink'}}>

                    </View> */}
            </View>
        )
    }
    backpress = () => {
        //    console.log('before set',this.props.nav)
        this.props.changeNavNews();
        this.props.navigation.navigate('MainpageTabs')
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
    render() {
        AsyncStorage.getItem('removePopup2').then((value) => this.setState({ newval: value })).done();
        // AsyncStorage.getItem('mergePopup').then((value) => this.setState({ mergeval : value })).done();
        if (this.state.newval == 2) {
            { this.exploreData(this.state.getuserid) }
            AsyncStorage.getItem('deletedPin').then((value) => this.setState({ getDeletedName: value })).done();
            console.log('value is ', this.state.newval);
            setTimeout(
                () =>
                    this.showModal(),
                1000
            );
            AsyncStorage.setItem('removePopup2', JSON.stringify(0));
        }
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
                <View style={styles.staticheader}>
                    <TouchableOpacity style={{ padding: '1%', marginLeft: '2%' }}
                        onPress={() => this.props.navigation.navigate('collectionDetail')}
                    >
                        <Image source={require('../assets/img/backarrow.png')} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center', alignSelf: "center" }}>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.props.navigation.navigate('collectionDetail')}
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                     style={{
                                      paddingLeft: '5%',
                                      paddingTop: '5%',
                                      paddingBottom: '5%',
                                      fontSize: 16,
                                      color: '#000',
                                      fontWeight: 'bold'
                                    }}
                                    // style={styles.headerText}
                                >Collections / </Text><Text
                                    // style={styles.headerText}
                                style={{
                                  paddingRight: '5%',
                                  paddingTop: '5%',
                                  paddingBottom: '5%',
                                  fontSize: 16,
                                  color: '#000',
                                  fontWeight: 'bold',
                                  textDecorationLine: 'underline',
                                }}
                                >Sections</Text>
                            </View>
                        </TouchableOpacity>
                        <LinearGradient style={{ borderRadius: 10 }} colors={
                            ['#24D4BC', '#27A291']}>
                            <TouchableOpacity
                                onPress={this.headerBtnClk}>
                                <Text
                                    style={{
                                        paddingLeft: '5%',
                                        paddingTop: '5%',
                                        paddingBottom: '5%',
                                        paddingRight:'5%',
                                        fontSize: 16,
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                >Pins</Text>
                            </TouchableOpacity>
                        </LinearGradient>


                    </View>

                </View>
                <ScrollView>
                    {/* <ImageBackground style={{ width: width, height: 150, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)' }}
                        imageStyle={{
                            opacity: 0.5
                        }}
                        source={require('../assets/img/collectimg.png')}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Pins</Text>
                    </ImageBackground> */}
            <FlatList
                contentContainerStyle={{
                    flex:1,
                    justifyContent:'center',
                    marginBottom:'5%'
                }}
                    data={this.state.pinsCoverImg}
                    extraData={this.state}
                    renderItem={this.pinscoverItems.bind(this)}
                    // numColumns={2}
                    keyExtractor={(item,index)=>index.toString()}

                    />
                    <FlatList
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent:'center',
                            // marginTop:'5%',
                            // marginBottom:'5%',
                            // alignItems:'center',
                            // justifyContent:'flex-start'
                            // marginLeft:'5%'
                        }}
                        data={this.state.pins}
                        extraData={this.state}
                        renderItem={this.renderItem_card.bind(this)}
                        numColumns={2}
                        removeClippedSubviews={false}
                        enableEmptySections={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                
                </ScrollView>
                <FloatingAction
                    style={{ color: '#24D4BC' }}
                    position={'right'}
                    ref={(ref) => { this.floatingAction = ref; }}
                    actions={this.state.actions}
                    color={'#24D4BC'}
                    onPressItem={name => {
                      
                        {name=='removePins'? AsyncStorage.setItem('back_pins',false):null}
                        this.props.navigation.navigate(name)
                        console.log(`selected button: ${name}`);
                    }}
                />
                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={{
                        left: 0, right: 0, bottom: 0, position: 'absolute',
                        height: '10%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                    }}>
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Remove - {this.state.getDeletedName} </Text>


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
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
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
        height: '8%',
        backgroundColor: '#ffff',
        elevation: 1,
        borderBottomColor: '#707070'


    },
    activeText: {
        padding: '5%',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
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
        nav: state.apiReducer.nav,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
        changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pins);