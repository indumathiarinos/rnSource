import React, { Component } from 'react'
import {SafeAreaView,
    View, AsyncStorage,ImageBackground, FlatList,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import {
    Container,
    Content,
    Footer,
    FooterTab
} from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')

const height = Dimensions.get('window').height;
let list;
export default class EditCollection extends Component {
    constructor() {
        super();
        this.state = {
            list: [
                {
                    id: 0,
                    bgcolor: "#569BE0",
                    img: img1,
                    title: "New Planet",
                    publications: '4 publications',
                    pages: '3 pages',
                    subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
                },
                {
                    id: 1,
                    bgcolor: "#7C3BD3",
                    img: img2,
                    title: "A Cat's Tale",
                    publications: '4 publications',
                    pages: '3 pages',
                    subtitle: "Share interesting Quotes or Phrases On Social Media"
                },
                {
                    id: 2,
                    bgcolor: "#EB9A17",
                    img: img3,
                    title: "Read Anywhere",
                    subtitle: "You can also read the same publication on your PC"
                }
            ],
            selectedItemArray:[],
            sendingArray:[],
            next:false,
            getuserid:'',
            collection:'',
            loading:true,
            selectedId:''
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();
    // {this.getData()}
    this.CheckConnectivity();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.props.navigation.navigate('collection')
      return true;
    }       
     sendingItem = (schools, oldName, name) => {
        return schools.map(item => {
            var temp = Object.assign({}, item);
            if (temp.abc === true) {
                temp.abc = false;
            }
            return temp;
        });
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
    getData(){
        setTimeout(() => {
            {this.exploredata(this.state.getuserid)}
        }, 1000);
    }
    exploredata(userid) {
        var json = JSON.stringify({
            'UserId': userid,
            "SortBy":"DESC"
        });
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

    onPressHandler(id) {
        // let selected;
         let collection=[...this.state.collection];
         for(let data of collection){
           if(data.collectionsID==id){
               this.setState({selectedId:this.state.selectedId==id?"":id})
                
            //  data.abc=(data.abc==null)?true:!data.abc;
            //  (data.abc)?this.state.selectedItemArray.push(data):this.state.selectedItemArray.pop(data);
            //  console.log('selected item array ',this.state.selectedItemArray)
            //   console.log("data.selected"+data.abc,'id',data.id);
              
            //   this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
             
             // console.log("id"+id);
            //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
             //console.log("array"+selectedItemArray);
             break;
           }
         }
        // console.log("array"+this.state.selectedItemArray);
        // MultiselectItems.push(selectedItemArray);
         this.setState({collection});
       }
       pressIcon = (item) => {
        let { collection } = this.state;
        collection = collection.map(e => {
            if (item.PK_ID === e.PK_ID) {
               
                // item.like = !e.like;
                return  this.setState({next:!this.state.next})
                // this.props.navigation.navigate('collectionDetail', {
                //     item: item
                // });
                //   } else if(item.id === 1){
                //     return this.props.navigation.navigate('filter', {
                //       item: item});
                //     }else if(item.id === 2){
                //       return this.props.navigation.navigate('bookmarks', {
                //         item: item});
            } else {
                return e;
            }
        });
    }
    renderItem_card({ item }) {
        // const value = item;
        return (
//             <View style={{
//                 // flex:1,
//                 width: '50%',
//                 padding: '2%',
//                 backgroundColor: '#ffff'
//             }}>
//                 <TouchableOpacity
//                     onPress={() => this.onPressHandler(item.collectionsID)}
//                     // onPress={()=>this.pressIcon(item)}
//                     >
//                     <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
//                     //  onPress={()=>this.press(item)}
//                     > 
//                     <ImageBackground
//  style={{ width: '100%', height: height / 6, resizeMode: 'cover'}}
//  imageStyle={{borderRadius:10}}              
//        source={{ uri: item.CoverImg!=""?item.CoverImg:null}} >
//                    {this.state.selectedId==item.collectionsID?<Image style={{alignSelf:'flex-end'}} source={require('../assets/img/check.png')}/>:null}
//                 </ImageBackground>
//                     </View>
//                     <View style={{ padding: '2%', margin: '1%' }}>
//                         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
//                         <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
//                         <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
//                     </View>

             
//                 </TouchableOpacity>
//             </View>
<View style={{
    // flex:1,
    width: '50%',
    padding: '2%',
    backgroundColor: '#ffff',

}}>
    <TouchableOpacity
    style={styles.button}
  onPress={() => this.onPressHandler(item.collectionsID)}>
          
        <View style={{flex:1,flexDirection: 'row',  }}
        >
            
            <Image style={{ width: '75%', elevation: 1, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                source={{ uri: item.Image1!=""?item.Image1:null }} />
          
            <View style={{ flex:1, flexDirection: 'column', borderLeftWidth: 0.3, borderColor: '#cccccc' }}>
                  <View style={{ borderBottomWidth: 0.3,marginLeft:'1%', borderColor: '#cccccc',borderTopRightRadius:10 }}>
                    <ImageBackground
                        style={{ height: height / 12, resizeMode: 'cover',  marginBottom: '1%' }}
                        imageStyle={{borderTopRightRadius: 10,}}
                        source={{ uri: item.Image2!=""?item.Image2:null}} >
                         {<Image style={{alignSelf:'flex-end',margin:'1%'}} source={this.state.selectedId==item.collectionsID?require('../assets/img/check.png'):null}/>}
                    </ImageBackground>
                </View>
                <View>

                    <Image
                        style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10,margin:'1%'}}
                        source={{ uri: item.Image3!=""?item.Image3:null }} />
                </View>
            </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
  onPress={() => this.onPressHandler(item.collectionsID)}>  
       <View style={{ padding: '2%', margin: '1%' }}>
                    <Text numberOfLines={2} style={{ fontSize: 16,fontFamily:'AzoSans-Medium', }}>{item.Title}</Text>
                        <Text style={{ color: '#707070',fontSize: 12,fontFamily:'AzoSans-Light', }}>{item.PublicationCount} publications</Text>
                        <Text style={{ color: '#707070',fontSize: 12,fontFamily:'AzoSans-Light', }}>{item.PageCount} pages</Text>
                    </View>
    </TouchableOpacity>
</View>
 
        )
    }
    nextBtn=()=>{
        AsyncStorage.setItem('editColId',JSON.stringify(this.state.selectedId))
        console.log('get editcol id ',this.state.selectedId)
       { this.state.selectedId!=""?
        this.props.navigation.navigate('editCollection'):null}
    }
    render() {
        const { navigate } = this.props.navigation;
    
        return (

            <SafeAreaView style={{ flex: 2, backgroundColor: '#ffff' }}>

                <View style={{height:'8%',backgroundColor:'#27A291',justifyContent:'center'}}>
               <Text style={{color:'white',fontFamily:'Montserrat-Bold',fontSize:16,textAlign:'center'}}>Select Collection to Edit</Text>
                </View>
                <ScrollView style={{marginBottom:'10%'}}>

                    <FlatList
                        data={this.state.collection}
                        extraData={this.state}
                        renderItem={this.renderItem_card.bind(this)}
                        numColumns={2}
                        removeClippedSubviews={false}
                        enableEmptySections={false}
                        contentContainerStyle={{
                            padding: '3%',

                            flex: 1,

                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>
                <View style={styles.bottomLine}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center' }}>
                        <TouchableOpacity style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}}
                            onPress={() =>this.state.selectedId==""? this.props.navigation.goBack():null}>
                            <Text style={[this.state.selectedId==""?styles.textStyle:styles.inacitveStyle]}>Back</Text>

                        </TouchableOpacity>
                        <LinearGradient style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}} colors={this.state.selectedId!=""?['#24D4BC', '#27A291']:['#fff','#fff']} >
                        <TouchableOpacity 
                            onPress={() =>this.nextBtn()}>
                            <Text style={[this.state.selectedId!=""?styles.inacitveColor:styles.inacitveStyle]}>Next</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
                <Modal1 isVisible={this.state.loading}  >
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
    textStyle:{ 
        color: '#707070', textAlign: 'center', fontSize: 16,fontFamily:'AzoSans-Regular', paddingLeft: '4%'
    },
    inacitveStyle:{ 
        color: '#cccccc', textAlign: 'center', fontSize: 16,fontFamily:'AzoSans-Regular',paddingLeft: '4%'
    },
    inacitveColor:{ 
        color: '#fff', textAlign: 'center', fontSize: 16,fontFamily:'AzoSans-Regular', paddingLeft: '4%'
    },
    bottomLine: {

        height: '8%',
        bottom: 0,
        left: 0,
        // elevation:3,
        right: 0,
        borderTopColor: 'gray',
        backgroundColor:'#cccccc',
        borderTopWidth: 0.5,

        // opacity:0.5,
        justifyContent: 'center',
        position: 'absolute',
        // paddingRight:'10%'

    },
    headerText: {
        padding: '5%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    tabsss: {
        alignItems: 'center', justifyContent: 'center'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: '25%',
        left: 0,
        right: 0,
    },
    backdrop: {
        //   flex:0.5,
        //   marginTop:'5%'

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
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
    }
})