import React, { Component } from 'react'
import {
    View,SafeAreaView, ImageBackground, FlatList, BackHandler,RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
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
        next:false

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
            <View style={{
                // flex:1,
                width: '50%',
                padding: '2%',
                backgroundColor: '#ffff'
            }}>
                <TouchableOpacity
                    onPress={() => this.pressIcon(item)}
                >

                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffff' }}
                    //  onPress={()=>this.press(item)}
                    >
                        <Image style={{ width: '75%', lex: 1, height: height / 6, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrW9K3EkNa5kYmncxzcS97oooUqbQsz0rHNtrbX0Ux0lEWA9Yo&s' }} />
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: '1%' }}>
                            <View >
                                <ImageBackground
                                    style={{ height: height / 12, resizeMode: 'cover', borderTopRightRadius: 10, marginBottom: '1%' }}
                                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLf-CvGjfmy7aCLEU9U8LP-Nu7hNppLayY41wo90ERdcZI3trIcA&s' }} >
                                   {this.state.next?<Image style={{alignSelf:'flex-end'}} source={require('../assets/img/check.png')}/>:null}
                                </ImageBackground>
                            </View>
                            {/* <View style={{flex:0.5}}> */}
                            <View>
                                <Image
                                    style={{ height: height / 12, resizeMode: 'cover', borderBottomRightRadius: 10 }}
                                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLf-CvGjfmy7aCLEU9U8LP-Nu7hNppLayY41wo90ERdcZI3trIcA&s' }} />
                            </View>
                            {/* <Image style={{width:100,resizeMode:'cover'}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLf-CvGjfmy7aCLEU9U8LP-Nu7hNppLayY41wo90ERdcZI3trIcA&s'}} /> */}
                        </View>
                    </View>
                    <View style={{ padding: '2%', margin: '1%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ color: '#707070' }}>{item.publications}</Text>
                        <Text style={{ color: '#707070' }}>{item.pages}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }

    render() {
        const { navigate } = this.props.navigation;
        const value = this.props.navigation.state.params.pass_data
        ? this.props.navigation.state.params.pass_data
        : 'undefined';
        console.log('value is ',value,'value true or false',)
        return (

            <SafeAreaView style={{ flex: 2, backgroundColor: '#ffff' }}>

                <View style={{height:'10%',backgroundColor:'#27A291',justifyContent:'center'}}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Select Collection to Edit</Text>
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.list}
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
                            onPress={() =>!this.state.next? this.props.navigation.navigate('collection'):console.log('value is ',value,'value true or false',)}>
                            <Text style={[!this.state.next?styles.textStyle:styles.inacitveStyle]}>Back</Text>

                        </TouchableOpacity>
                        <LinearGradient style={{backgroundColor:'#fff',width:width/3,padding:'1%',borderRadius:15}} colors={this.state.next?['#24D4BC', '#27A291']:['#fff','#fff']} >
                        <TouchableOpacity 
                            onPress={() =>this.state.next? this.props.navigation.navigate('editCollection'):console.log('value is ',value,'value true or false',)}>
                            <Text style={[this.state.next?styles.inacitveColor:styles.inacitveStyle]}>Next</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
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