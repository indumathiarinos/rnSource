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
            actions: [
                {
                    text: "Remove Pins",
                    icon: require("../assets/img/collection/remove.png"),
                    name: "removePins",
                    position: 2
                },
                {
                    text: "Filter Options",
                    icon: require("../assets/img/collection/filter.png"),
                    name: "filter",
                    position: 1
                }
            ],
            boolean: false,
            newval: 0,
            modalVisible: false,
            getuserid: '',
            pins: '',
            loading: false,
            getDeletedName: '',
            pinsCoverImg:'',
            SortBy:'DESC'


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
            this.props.removePinsPopup();
            //   this.props.changeRemove();
        }, 5000);
        console.log('modal state is ', this.state.modalVisible)
    }
   async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AsyncStorage.getItem('userid').then((val) => this.setState({ getuserid: val })).done();
        console.log('user id ', this.state.getuserid)
        AsyncStorage.getItem('pinsFilter').then((val) => this.setState({ SortBy: val })).done();
        AsyncStorage.setItem('collectionFilter',"DESC");

        console.log('user id ',this.state.getuserid,this.state.SortBy);
     //    AsyncStorage.getItem('sectionPin').then((val) =>Alert(val)).done();
     
        this.CheckConnectivity();
     
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
         
            // this.setState({loading:true})
            
         AsyncStorage.getItem('pinsFilter').then((val) => this.setState({ SortBy: val })).done();

         this.CheckConnectivity();
     
     })
    }
    getData2() {
        AsyncStorage.getItem('deletedPin').then((value) => this.setState({ getDeletedName: value })).done();
    
        if(this.props.pinsRemove==true){
            setTimeout(
                () =>
                    this.showModal(),
                1000
            );
        }
    }
    CheckConnectivity(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
           {this.getData()}

          }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
         
        });
      }
    getData() {
        setTimeout(() => {
            { this.pinsCoverData(this.state.getuserid) }
            {this.exploreData(this.state.getuserid)}
            }, 1000)
    }
    exploreData(userid) {
        var json = JSON.stringify({
            "options": "Select", "page_id": "", "type": "", "collection_id": "", "section_id": "", "Description": "", "user_id": userid,"SortBy":this.state.SortBy!=null?this.state.SortBy:'DESC'
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
          this.backpress()
        
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

        }, 1000);
    }
    renderItem_card({ item }) {
        const value = item;
        return (
            <View style={{ width:width/2.3,margin:10, }} >
                <TouchableOpacity style={styles.button} onPress={()=>this.cardPress(item)} >
                  <View style={{ backgroundColor: '#fff', borderRadius:10
                // alignItems:'center',alignSelf:"center",justifyContent:'center'
                 }}>
                    <View style={{ width: width / 2 - 20, height:175, flex:1,alignItems: 'center', justifyContent: 'center',alignSelf:'center'}}>
                        <Text numberOfLines={5} style={styles.description}>{item.description}</Text>
                    </View>
     {/* <View style={{ marginLeft:10,marginRight:10,  alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{item.description}</Text>
                    </View> */}
                              {/* <HTMLView style={{width:width/2-30,height:height/6,alignSelf:'center',padding:'5%'}} value={item.page_title}/> */}

                    </View>
                  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.cardPress(item)}>
                    <Text numberOfLines={2} style={styles.title}>{item.page_url}</Text>
                    <Text style={{ color: '#707070', fontSize: 12,width: width / 2 - 40,textAlign:'left',marginTop:5,marginBottom:5,fontFamily:'AzoSans-Italic' }}>Page {item.rownum}</Text>

                    </TouchableOpacity>
                {/* <View style={{ alignItems: 'center', marginLeft: '15%', marginBottom: 5, marginTop: 5}}> 
                    <Text style={{ color: '#707070', fontSize: 16 }}>Page {item.rownum}</Text>
                </View> */}
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
            <View style={{height:150,width:width,}}>

                    <View style={{flex:1,flexDirection:'row',}}>
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image1!=""?null:'#27A291'}}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image2!=""?null:'#27A291'  }}
                            source={{ uri: item.Image2!=""?item.Image2:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',alignItems:'center',justifyContent:'center',backgroundColor:item.Image3!=""?null:'#27A291',}}
                            source={{ uri: item.Image3!=""?item.Image3:null }} >
                        </Image>
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image4!=""?null:'#27A291'}}
                            source={{ uri: item.Image4!=""?item.Image4:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image5!=""?null:'#27A291' }}
                            source={{ uri: item.Image5!=""?item.Image5:null }} />
                            <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image6!=""?null:'#27A291'}}
                            source={{ uri: item.Image6!=""?item.Image6:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image7!=""?null:'#27A291'  }}
                            source={{ uri: item.Image7!=""?item.Image7:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',alignItems:'center',justifyContent:'center',backgroundColor:item.Image8!=""?null:'#27A291'}}
                            source={{ uri: item.Image8!=""?item.Image8:null }} >
                        </Image>
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image9!=""?null:'#27A291'}}
                            source={{ uri: item.Image9!=""?item.Image9:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image10!=""?null:'#27A291' }}
                            source={{ uri: item.Image10!=""?item.Image10:null }} />
                            <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image11!=""?null:'#27A291'}}
                            source={{ uri: item.Image11!=""?item.Image11:null }} />
                        <Image style={{  height:150,width:width/12, resizeMode: 'cover',backgroundColor:item.Image12!=""?null:'#27A291'  }}
                            source={{ uri: item.Image12!=""?item.Image12:null }} />
                       
                        </View>
                   
                    {/* <View style={{  marginTop: '-20%',
                                justifyContent: "center",
                                alignItems: "center",backgroundColor:'pink'}}>
                    </View> */}
            </View>
        )
    }
    backpress = () => {
        //    console.log('before set',this.props.nav)
        // this.props.changeNavNews();
        // this.props.navigation.navigate('MainpageTabs')
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
    render() {
        AsyncStorage.getItem('removePopup2').then((value) => this.setState({ newval: value })).done();
        // // AsyncStorage.getItem('mergePopup').then((value) => this.setState({ mergeval : value })).done();
        // if (this.state.newval == 1) {
        //     { this.exploreData(this.state.getuserid) }
        //     AsyncStorage.getItem('deletedPin').then((value) => this.setState({ getDeletedName: value })).done();
        //     console.log('value is ', this.state.newval);
        //     setTimeout(
        //         () =>
        //             this.showModal(),
        //         1000
        //     );
        //     AsyncStorage.setItem('removePopup2', JSON.stringify(0));
        // }
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
            <View style={styles.staticheader}>

<ScrollView horizontal={true}
showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: '1%', paddingRight: '1%', flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' }}>


<TouchableOpacity style={{ alignItems: 'center' }}
   onPress={() => this.props.navigation.navigate('collection')}
>
   <Text style={styles.headerText}

   >Collection</Text>
</TouchableOpacity>
<LinearGradient style={{ borderRadius: 10}} colors={
['#24D4BC', '#27A291']}>
<TouchableOpacity 
>
   <Text style={styles.activeText}
   >Pins</Text>
</TouchableOpacity>
</LinearGradient>
<TouchableOpacity style={{ alignItems: 'center' }}
       onPress={() =>this.readlaterPress()}
       >
   <Text style={styles.headerText}
   >Read Later</Text>
</TouchableOpacity>
<TouchableOpacity style={{ alignItems: 'center' }}
onPress={() =>this.bookmarkPress()}
>
   <Text style={styles.headerText}
   >Bookmarks</Text>
</TouchableOpacity>
</ScrollView>
<TouchableOpacity style={{ paddingLeft: '2%', paddingRight: '2%', width: width / 10, alignSelf: 'center' }} onPress={() => this.backpress()}>
<Image source={require('../assets/img/close.png')} />
</TouchableOpacity>
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
                contentContainerStyle={[{
                    // flex:1,
                    justifyContent:'center',
                    marginBottom:'5%',
                    // backgroundColor: 'black',
                    width: width,
                    height:150
                    }]}
                    data={this.state.pinsCoverImg}
                    extraData={this.state}
                    renderItem={this.pinscoverItems.bind(this)}
                    // numColumns={2}
                    keyExtractor={(item,index)=>index.toString()}

                    />
                     <View style={styles.overlay}/>
                    <View style={{position:'absolute',top:70,alignItems:'center',width:width,justifyContent:'center',}}>
                <Text style={{ textAlign: 'center', color:'#fff', fontWeight: 'bold', fontSize: 18 }}>Pins</Text>

                </View>
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
                      
                        // {name=='removePins'? AsyncStorage.setItem('back_pins',false):null}
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
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.7,
        backgroundColor: 'black',
        width: width,
        height:150
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
    button: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        borderRadius:10,
      
    },
    description:{
        textAlign:'center',
        width: width / 2 - 40,
        marginTop:5,
        marginBottom:5,
        alignSelf:'center',
        fontFamily:'AzoSans-Regular',
        fontSize:12
    },
    title:{
        fontFamily:'AzoSans-Medium',
        fontSize:16,
        width: width / 2 - 40,
        textAlign:'left',
        marginTop:5,
        marginBottom:5
    }
})
function mapStateToProps(state) {
    return {
        nav: state.apiReducer.nav,
        pinsRemove:state.apiReducer.pinsRemove
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
        changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' }),
        removePinsPopup:()=>dispatch({type:'PINS_REMOVE'})

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pins);
