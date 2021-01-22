import React, { Component } from 'react'
import {
    View, ImageBackground,Modal, FlatList,BackHandler, RefreshControl,AsyncStorage, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid,SafeAreaView
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import BlurModal from '../components/blurModal';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import Modal1 from 'react-native-modal';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')

const height = Dimensions.get('window').height;
let list2;
class SubCollectionMerge extends Component {
    constructor(props) {
        super(props)
        this.state = {
        list: [],
        selectedItemArray:[],
        selectedIds:[],
        selectedColid:'',
        next:false,
        mergeFromId:'',
        mergeToId:'',
        mergeName:'',
        loading:true,
        // loading:true,
        // getuserid:'',
        collection:'',
        mergeModal:false,
        undo:false,
        mergeFromName:'',
        getuserid:''

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
    componentDidMount() {
        AsyncStorage.getItem('userid').then((val)=>{this.setState({getuserid:val})}).done();
        // {this.getData()}
        this.CheckConnectivity();
        AsyncStorage.getItem('MergeFromId').then((val)=>{this.setState({mergeFromId:val})}).done();
        AsyncStorage.getItem('MergeFromName').then((val)=>{this.setState({mergeFromName:val})}).done();
        AsyncStorage.getItem('userid').then((val)=>{this.setState({getuserid:val})}).done();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
              console.log('mergefrom id and mergeto id ',this.state.mergeFromId,this.state.mergeToId)
            {this.mergeCollection(this.state.mergeFromId,this.state.selectedColid)}
        }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
         
        });
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
            if(this.state.undo==false){
                {this.CheckConnectivity1()}
              }else{
                this.setState({undo:false})
              }    
              this.props.navigation.navigate('collection');

        }, 3000);
        //   this.props.mergePopup();
        //   console.log('modal state is ',this.props.mergePopup())
    }
      handleBackButtonClick() {
        //   this.props.navigation.navigate('collection')
        this.props.navigation.goBack();
        return true;
      }
      getData(){
          setTimeout(() => {
              {this.exploredata(this.state.getuserid)}
          }, 1000);
      }
    mergeCollection(fromId,ToId) {
        var json = JSON.stringify(
            {
                "From_C_ID":ToId,"To_C_ID":fromId,"From_S_ID":"","To_S_ID":"0","Action_for":"Collection","UserID":this.state.getuserid
            }
        );
        console.log('json is',json);
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
                //alert(responseText);
                console.log('response',responseJson)
                this.setState({  loading: false })
                // AsyncStorage.setItem('MergeName', JSON.stringify(this.state.mergeName));
                // this.props.mergePopup();
    
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
            // this.setState({selectedColid:id,deletedName:data.Title})
            // console.log('id ',this.state.selectedColid)
            //uncommented====
             data.abc=(data.abc==null)?true:!data.abc;
            
             (data.abc)?this.state.selectedItemArray.push(data.Title):this.state.selectedItemArray.pop(data.Title);
             (data.abc)?this.state.selectedIds.push(data.collectionsID):this.state.selectedIds.pop(data.collectionsID);
             console.log('selected item array ',this.state.selectedItemArray);
             console.log('selected item array ',this.state.selectedIds)
             let ids= this.state.selectedIds.join(',');
             let names = this.state.selectedItemArray.join(',');
             console.log(ids+""+names+"");
             this.setState({next:this.state.selectedItemArray.length>0?true:false,mergeName:names,selectedColid:ids})
             break;
           }
         }
         this.setState({collection});
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
                const filteredList = this.state.collection.filter((item) => item.collectionsID != this.state.mergeFromId);
                this.setState({collection:filteredList}); 
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    pressIcon = (item) => {
        let { list } = this.state;
        list = list.map(e => {
            if (item.id === e.id) {
               
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
//                 backgroundColor: '#ffff',
//             }}>
//                 <TouchableOpacity
//                     onPress={() => this.onPressHandler(item.collectionsID)}>
//                     <View style={{flex:1,flexDirection: 'row', backgroundColor: '#ffff' }}
//                     //  onPress={()=>this.press(item)}
//                     > 
//                     <ImageBackground
//  style={{ width: '100%', height: height / 6, resizeMode: 'cover'}}
//  imageStyle={{borderRadius:10}}              
//        source={{ uri: item.CoverImg!=""?item.CoverImg:null}} >
                //    {this.state.selectedColid==item.collectionsID?<Image style={{alignSelf:'flex-end',margin:'1%'}} source={require('../assets/img/close.png')}/>:null}
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
          
        <View style={{flex:1,flexDirection: 'row', }}
        >
            
            <Image style={{ width: '75%',  height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                source={{ uri: item.Image1!=""?item.Image1:null }} />
          
            <View style={{ flex:1, flexDirection: 'column',borderLeftWidth: 0.3, borderColor: '#cccccc' }}>
                <View style={{ borderBottomWidth: 0.3, borderColor: '#cccccc' }}>
                    <ImageBackground
                    imageStyle={{borderTopRightRadius: 10}}
                        style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                        source={{ uri: item.Image2!=""?item.Image2:null}} >
                         {/* {this.state.selectedColid==item.collectionsID?<Image style={{alignSelf:'flex-end',margin:'1%'}} source={require('../assets/img/close.png')}/>:null} */}
                        {item.abc==true?<Image style={{alignSelf:'flex-end',margin:'1%'}} source={require('../assets/img/check.png')}/>:null}
                    </ImageBackground>
                </View>
                <View>

                    <Image
                        style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
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
                <Text style={{color:'white',fontSize:16,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Select Collection(s) to Merge</Text>
                    {/* : value=='EditCollection1'? <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Collection to Edit</Text>:<Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Collection to Remove</Text> */}
                {/* } */}

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
                            onPress={() =>this.state.selectedColid==""? 
                            // this.props.navigation.navigate('mergeCollection')
                            this.props.navigation.goBack()
                            :console.log('value is ','value true or false',)}>
                            <Text style={[this.state.selectedColid==""?styles.textStyle:styles.inacitveStyle]}>Back</Text>

                        </TouchableOpacity>
                        <LinearGradient style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}} colors={this.state.selectedColid!=""?['#24D4BC', '#27A291']:['#fff','#fff']} >
                        <TouchableOpacity 
                            onPress={() =>this.state.selectedColid!=""?this.showModal1():null}>
                            <Text style={[this.state.selectedColid!=""?styles.inacitveColor:styles.inacitveStyle]}>Merge</Text>
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
                        <BlurModal visible={this.state.mergeModal}
                          children={
                        <View style={{
                            left: 0, right: 0, bottom: 0, position: 'absolute',
                            height: '10%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#27A291',
                        }}>
                            <Text style={{ color: '#fff', fontSize: 16,fontFamily:'AzoSans-Bold', textAlign: 'center',margin:5 }}>Merged - {this.state.mergeFromName} - {this.state.mergeName} </Text>
                            <TouchableOpacity style={{ marginTop: '2%', alignSelf: 'flex-end', marginRight: '2%',padding:'2%' }}
                            onPress={()=>this.setState({undo:true})}
                            >
                                <Text style={{ fontSize: 12,fontFamily:'AzoSans-Regular', color: '#fff', textDecorationLine: 'underline' }}>Undo</Text>
                            </TouchableOpacity>
                        </View>}
                        />
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
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
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
        mergePopup:()=>dispatch({type:'MERGE_POPUP1'}),
    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(SubCollectionMerge);