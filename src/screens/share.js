import React, { Component } from 'react'
import {
    View, ImageBackground, FlatList,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
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
import { FloatingAction } from "react-native-floating-action";

// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')

const height = Dimensions.get('window').height;
let list;
export default class MergeCollection extends Component {
    constructor() {
        super();
    this.state = {
        title:'Edit <Publication or Page Title>',
        list: [
            {
                id: 0,
                bgcolor: "#569BE0",
                img: img1,
                title: "Our Planet",
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
        actions:[
           
            {
                text: "Create Collection",
                icon: require("../assets/img/plus.png"),
                name: "createCollection",
                position: 1
            }
        ],
        next:false,
        selectedItemArray:[],
        sendingArray:[],

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
//   this.backpress();
this.props.navigation.navigate('collectionDetail');
      return true;
} 
 
    onPressHandler(id) {
        // let selected;
         let list=[...this.state.list];
         for(let data of this.state.list){
           if(data.id==id){
                
             data.abc=(data.abc==null)?true:!data.abc;
             (data.abc)?this.state.selectedItemArray.push(data):this.state.selectedItemArray.pop(data);
             console.log('selected item array ',this.state.selectedItemArray)
              console.log("data.selected"+data.abc,'id',data.id);
              
              this.state.selectedItemArray.length!=0? this.setState({next:true}):this.setState({next:false});
             
                                      // console.log("id"+id);
             // (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
             //console.log("array"+selectedItemArray);
             break;
           }
         }
        // console.log("array"+this.state.selectedItemArray);
        // MultiselectItems.push(selectedItemArray);
         this.setState({list});
       }

    renderItem_card({ item }) {
        // const value = item;
        return (
            <View style={[styles.containerList,item.abc==true?styles.activeList:styles.inacitveList]}>
                <TouchableOpacity
                style={styles.styleList}
                    onPress={() => this.onPressHandler(item.id)}
                >
                  { item.abc==true? <Image source={require('../assets/img/check.png')}/>:<Image source={require('../assets/img/uncheck.png')}/>}
                <View style={{flexDirection:'row',justifyContent:'space-around',width:width}}>
                <Text style={{textAlign:'left',width:width/2}}>{item.title}</Text>
                <Image style={{alignSelf:'flex-end',marginRight:'5%'}} source={require('../assets/img/next.png')}/>
                </View>
                </TouchableOpacity>
                </View>
        )
    }

    render() {
       
        return (

            <View style={{ flex: 1, backgroundColor: '#ffff' }}>

                <View style={{height:'8%',backgroundColor:'#27A291',justifyContent:'center'}}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>{this.state.title}</Text>
                </View>
                <ScrollView >
                    <View><Text style={{fontSize:24,color:'#000',margin:'2%',padding:'1%'}}>Collection</Text></View>
                    <View style={{width:width-20,height:1,backgroundColor:'#24D4BC',alignSelf:'center',marginLeft:'2%',marginRight:'2%',marginBottom:'2%'}}/>


                    <FlatList
                        data={this.state.list}
                        extraData={this.state}
                        renderItem={this.renderItem_card.bind(this)}
                        removeClippedSubviews={false}
                        enableEmptySections={false}
                        contentContainerStyle={{
                            padding: '3%',

                            flex: 1,

                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>
               
                   
 {/* <View style={{marginBottom:50,backgroundColor:'#fff'}}> */}
 <FloatingAction
//  contentContainerStyle={{marginBottom:150}}
                       position={'right'}
                        ref={(ref) => { this.floatingAction = ref; }}
                        actions={this.state.actions}
                        color={'#27A291'}
                        onPressItem={name => {
                                this.props.navigation.navigate(name, {
                                    pass_data:name})
                            console.log(`selected button: ${name}`);
                        }}
                    />
                        {/* <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('createCollection')}
                        style={{width:width/2.5,borderColor:'#27A291',borderWidth:1.5,borderRadius:20,alignItems:'center',}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:16,width:width/3.5,padding:'1%'}}
                            numberOfLines={2}>Create Collection</Text>
                            <Image style={{alignSelf:'center'}}  source={require('../assets/img/plus.png')}/>
                            </View>
                        </TouchableOpacity> */}
                        {/* </View> */}
                <View style={styles.bottomLine}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center' }}>
                        <TouchableOpacity style={{backgroundColor:'#fff',width:width/3.5,padding:'1%',borderRadius:25}}
                            onPress={() =>!this.state.next? this.props.navigation.navigate('sectionDetail'):console.log('value is ',value,'value true or false',)}>
                            <Text style={[!this.state.next?styles.textStyle:styles.inacitveStyle]}>Back</Text>

                        </TouchableOpacity>
                        <LinearGradient style={{backgroundColor:'#fff',width:width/3.5,padding:'1%',borderRadius:15}} colors={this.state.next?['#24D4BC', '#27A291']:['#fff','#fff']} >
                        <TouchableOpacity 
                            onPress={() =>this.state.next? this.props.navigation.navigate('sectionDetail'):console.log('value is ',value,'value true or false',)}>
                            <Text style={[this.state.next?styles.inacitveColor:styles.inacitveStyle]}>Next</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>

        )
    }

}
const styles = StyleSheet.create({
    floatbtn:{
        // height: '8%',
        bottom: 40,
        left: 0,
        // elevation:3,
        right: 0,

        // opacity:0.5,
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
    },
    styleList:{
        // flex:1,
        flexDirection:'row',alignItems:'center',justifyContent:'space-between'
    },
    containerList:{
        flex:1,
        padding:'3%'
    },
    activeList:{
        // flex:1,
        backgroundColor: '#27A291',
        },
    inactiveList:{
        // flex:1,
        backgroundColor: '#CCCCCC',
      
    },
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