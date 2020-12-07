import React, { Component } from 'react'
import {
    View, ImageBackground, FlatList,BackHandler, RefreshControl,AsyncStorage, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid,SafeAreaView
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
import { connect } from "react-redux";
import Modal1 from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')
let colvalue;
const height = Dimensions.get('window').height;
let list2;
class SubCollectionMerge extends Component {
    constructor(props) {
        super(props)
        this.state = {
        list: [],
        selectedItemArray:[],
        next:false,
        mergeFromId:'',
        mergeToId:'',
        mergeName:'',
        loading:true,
        // loading:true,
        getuserid:'',
        sectionData:'',
        getColId:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
    componentDidMount() {
        colvalue = this.props.navigation.state.params.collId
    ? this.props.navigation.state.params.collId
    : null;
        AsyncStorage.getItem('userid').then((val)=>{this.setState({getuserid:val})}).done();
        AsyncStorage.getItem('collectionId').then((value) => this.setState({ getColId : value })).done();
        this.CheckConnectivity();
        // {this.getData()}
        AsyncStorage.getItem('MergeSecFromId').then((val)=>{this.setState({mergeFromId:val})}).done();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick() {
        //   this.props.navigation.navigate('collectionDetail',{'collId':colvalue})
        this.props.navigation.goBack();
        return true;
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
      CheckConnectivity1(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
            {this.mergeSection(this.state.mergeFromId,this.state.mergeToId)}
        }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
         
        });
      }
      getData(){
          setTimeout(() => {
              {this.exploredata(colvalue)}
          }, 5);
      }
    mergeSection(fromId,ToId) {
        this.setState({loading:true})
        var json = JSON.stringify(
            {
                "From_C_ID":fromId,
                "To_C_ID":ToId,
                "Action_for":"Section"
            }
        );
        fetch("http://162.250.120.20:444/Login/MergeCollection",
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
              AsyncStorage.setItem('SecMergeName', JSON.stringify(this.state.mergeName));
                this.props.mergePopupSection();
             this.props.navigation.navigate('collectionDetail')

            })
            .catch((error) => {
                console.warn(error);
            });
    }
    onPressHandler(id) {
        // let selected;
        // this.setState({list:list2})

        // console.log('onpress list ',list2)
        let sectionData=[...this.state.sectionData];
        for(let data of sectionData){
           if(data.SectionID==id){
               this.setState({mergeToId:id,mergeName:data.Title})
                
            //  data.abc=(data.abc==null)?true:!data.abc;
            
            //  (data.abc)?this.state.selectedItemArray.push(data):this.state.selectedItemArray.pop(data);
            // //  console.log('selected sub item array ',this.state.selectedItemArray)
            // //   console.log("data.selected"+data.abc,'id',data.id);
              
            //   this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
            
             break;
           }
         }
         this.setState({sectionData})

        //  this.setState({list:this.state.list});
       }
       exploredata(collectionId){
        var json=JSON.stringify({
            "CollectionID":collectionId ,
          "User_ID":this.state.getuserid,
          "SortBy":"DESC"
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
                this.setState({sectionData: responseJson,loading:false})
                const filteredList = this.state.sectionData.filter((item) => item.SectionID != this.state.mergeFromId && item.SectionID!=0);
                this.setState({sectionData:filteredList}); 
            })
            .catch((error) => {
                console.warn(error);
            });
      }
      pressIcon = (item) => {
        let { sectionData } = this.state;
        sectionData = sectionData.map(e => {
            if (item.SectionID === e.SectionID) {
               
                // item.like = !e.like;
                return  this.setState({next:!this.state.next,})
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
            <View style={{
                // flex:1,
                width: '50%',
                padding: '2%',
                backgroundColor: '#ffff',
                // borderWidth:0.5,
                // borderColor:'#ccccccc'
            }}>

                <TouchableOpacity
                    onPress={() => this.onPressHandler(item.SectionID)}>
                    {/* <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '95%', elevation: 1, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                            source={{ uri: item.CoverImg!=""?item.CoverImg:null }} />
                           
                    </View>
                    <View style={{ padding: '2%', margin: '1%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
                        <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
                    </View> */}
      
                {/* three grids images */}

                {/* {item.SectionID==0? 
                <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '95%', elevation: 2, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,borderTopRightRadius:10,borderBottomRightRadius:10 }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                           
                    </View>: */}
                    <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff',elevation:2,borderRadius:10 }}
                    >
                        <Image style={{ width: '75%', elevation: 1, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                            source={{ uri: item.Image1!=""?item.Image1:null }} />
                        <View style={{ flex:1, flexDirection: 'column', marginLeft: '1%', elevation: 1 }}>
                            <View >
                                <ImageBackground
                                                                imageStyle={{ borderTopRightRadius: 10}}

                                    style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                                    source={{ uri: item.Image2!=""?item.Image2:null}} >
                         {this.state.mergeToId==item.SectionID?<Image style={{alignSelf:'flex-end',margin:'1%'}} source={require('../assets/img/check.png')}/>:null}
                                        </ImageBackground>
                            </View>
                            <View>
                                <Image
                                    style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                                    source={{ uri: item.Image3!=""?item.Image3:null }} />
                            </View>
                        </View>
                    </View>
                  {/* } */}
                 {/* {item.SectionID==0?
                  <View style={{ padding: '2%', margin: '1%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Page_Post_Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.Author}</Text>
                    </View>
                 : */}
                   <View style={{ padding: '2%', margin: '1%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
                        <Text style={{ color: '#707070' }}>{item.PublicationCount} publications</Text>
                        <Text style={{ color: '#707070' }}>{item.PageCount} pages</Text>
                    </View>
                    {/* } */}
                </TouchableOpacity>
            </View>
        )
    }
    mergeFunc=()=>{
        // this.props.changeRemove2();
        // AsyncStorage.setItem('removePopup', true);
        this.CheckConnectivity1();
    }
    render() {
        // const { navigate } = this.props.navigation;
        // const value = this.props.navigation.state.params.pass_data
        // ? this.props.navigation.state.params.pass_data
        // : 'undefined';
        // list2=value;
        // console.log('value is ',list2)
        return (

            <SafeAreaView style={{ flex: 2, backgroundColor: '#ffff' }}>

                <View style={{height:'8%',backgroundColor:'#27A291',justifyContent:'center'}}>
                {/* {value=='mergeCollection'?   */}
                <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Collection(s) to Merge</Text>
                    {/* : value=='EditCollection1'? <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Collection to Edit</Text>:<Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Collection to Remove</Text> */}
                {/* } */}
                </View>
                <ScrollView style={{marginBottom:'10%'}}>
                    <FlatList
                        data={this.state.sectionData}
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
                              onPress={() =>    this.props.navigation.goBack()
                                // this.props.navigation.navigate('mergeSection')
                              }>
                              <Text style={[this.state.mergeToId==""?styles.textStyle:styles.inacitveStyle]}>Back</Text>
  
                          </TouchableOpacity>
                          <LinearGradient style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}} colors={this.state.mergeToId!=""?['#24D4BC', '#27A291']:['#fff','#fff']} >
                          <TouchableOpacity 
                              onPress={() =>this.mergeFunc()}>
                              <Text style={[this.state.mergeToId!=""?styles.inacitveColor:styles.inacitveStyle]}>Next</Text>
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
        color: 'black', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
    },
    inacitveStyle:{ 
        color: '#c2c2c2', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
    },
    inacitveColor:{ 
        color: '#fff', textAlign: 'center', fontSize: 18, paddingLeft: '4%'
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
// function mapStateToProps(state){
//     console.log('state is ',state)
//         merge:state.apiReducer.merge
//   }
  
const mapStateToProps = state => ({
    merge: state.apiReducer.merge,
    
  });
  function mapDispatchToProps(dispatch){
    return{
        mergePopupSection:()=>dispatch({type:'MERGE_POPUP_SECTION'}),

    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(SubCollectionMerge);