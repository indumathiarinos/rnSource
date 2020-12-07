import React, { Component } from 'react'
import {
    SafeAreaView,
    View, ImageBackground, FlatList,BackHandler, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
    TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';

// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

export default class Collections extends Component {
    constructor(props)
    {
        super(props);
    this.state = {
        list: [
            {
                id: 0,
                bgcolor: "#569BE0",
                img: img1,
                title: "Our Planet",
                publications:'4 publications',
                pages:'3 pages',
                subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
            },
            {
                id: 1,
                bgcolor: "#7C3BD3",
                img: img2,
                title: "A Cat's Tale",
                publications:'4 publications',
                pages:'3 pages',
                subtitle: "Share interesting Quotes or Phrases On Social Media"
            },
            {
                id: 2,
                bgcolor: "#EB9A17",
                img: img3,
                title: "Read Anywhere",
                subtitle: "You can also read the same publication on your PC"
            }
        ]
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

    brandsCard({ item }) {
        return (

            <View style={{ width: width - 280, flex: 0.4, }}>

                <View style={{ flexDirection: 'column', }}>

                    <Image
                        style={{ width: 60, height: 60, alignSelf: 'center', borderRadius: 60 / 2 }}
                        source={item.img}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    // containerStyle={{marginLeft:'1%'}}
                    />
                    {/* <Avatar
            rounded
            size='large'
            // style={{ borderWidth: 2,  borderTopLeftRadius: 1, borderStyle:'solid' }}
            overlayContainerStyle={{ borderColor: 'black', borderWidth: 1 }}
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          // containerStyle={{marginLeft:'1%'}}
          /> */}
                    <Text style={{ margin: '5%', color: '#2d2e2d', textAlign: 'center' }}>{item.name}</Text>
                </View>

            </View>
        );

    }

    renderItem_card({ item }) {
        const value = item;
        return (
            <View style={{ flex: 1,marginLeft:'4%'}}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{width:110,height:100,resizeMode:'cover',borderTopLeftRadius:10,borderBottomLeftRadius:10}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrW9K3EkNa5kYmncxzcS97oooUqbQsz0rHNtrbX0Ux0lEWA9Yo&s'}} />
                    <View style={{ flexDirection: 'column',marginLeft:'1%'}}>
                        <Image style={{width:80,height:50,resizeMode:'cover',borderTopRightRadius:10,marginBottom:'1%'}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLf-CvGjfmy7aCLEU9U8LP-Nu7hNppLayY41wo90ERdcZI3trIcA&s'}} />
                        <Image style={{width:80,height:50,resizeMode:'cover',borderBottomRightRadius:10}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLf-CvGjfmy7aCLEU9U8LP-Nu7hNppLayY41wo90ERdcZI3trIcA&s'}} />
                        {/* <Image style={{width:100,resizeMode:'cover'}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLf-CvGjfmy7aCLEU9U8LP-Nu7hNppLayY41wo90ERdcZI3trIcA&s'}} /> */}
                    </View>
                </View>
                <View style={{padding:'2%',margin:'1%'}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>{item.title}</Text>
                <Text style={{color:'#707070'}}>{item.publications}</Text>
                <Text style={{color:'#707070'}}>{item.pages}</Text>
                </View>
                
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
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView>
                <View style={{ height: '10%', backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../assets/img/leftdropdown.png')}  />
                        <LinearGradient style={{ borderRadius: 10}} colors={
              ['#24D4BC', '#27A291']}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('pins')}>
                            <Text style={{
                                padding: '5%',
                                fontSize: 16,
                                fontWeight: 'bold', color: 'white'
                            }}
                            >Reads</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('pins')}>
                            <Text style={styles.headerText}
                            >Pins</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Image
                style={{width:width}}
                resizeMode='cover'
               source={require('../assets/img/collectimg.png')}/>
               <Text style={{alignSelf:'center'}}>Center</Text> */}
               <ScrollView>
                <ImageBackground style={{ width:width,height:150, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)' }}
                    imageStyle={{
                        opacity: 0.5
                    }}
                    source={require('../assets/img/collectimg.png')}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Library</Text>
                </ImageBackground>


                {/* <View style={{height:'20%',alignItems:'center'}}>
                <View style = {styles.backgroundContainer}>
    <Image source={require('../assets/img/collectimg.png')}
     resizeMode = 'cover'
      style = {styles.backdrop} />
  </View>
                    </View> */}
                {/* <ImageBackground
                    // style={{
                    //   width: width, height: height / 2 - 100, resizeMode: 'cover',
                    // }}
                    style={{flex:1 , alignItems: 'center' }}
                    source={require('../assets/img/collectimg.png')}          >
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Library</Text>
                </ImageBackground> */}
                <View style={{ flex: 0.5,margin:'5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                    <TouchableOpacity style={{ width: 350, elevation: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <LinearGradient style={{ padding: '4%', borderTopLeftRadius: 20, width: width / 2 - 50, alignItems: 'center' }} colors={['#24D4BC', '#27A291']} >

                                <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('createCollection')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../assets/img/plus_small.png')} />
                                        <Text style={{ color: 'white', marginLeft: '4%' }}>Create Collection</Text>
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient style={{ width: width / 2 - 50, alignItems: 'center', padding: '4%', borderTopRightRadius: 20 }} colors={['#24D4BC', '#27A291']} >
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../assets/img/filter_white.png')} />
                                        <Text style={{ color: 'white', marginLeft: '4%' }}>Filter</Text>
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                            {/* <TouchableOpacity style={{backgroundColor:'#27A291',width:width/2-100,alignItems:'center',padding:'6%',borderTopEndRadius:20}}>
                    <Text style={{color:'white'}}>Filter</Text>
                </TouchableOpacity> */}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#fff', padding: '4%', borderBottomLeftRadius: 20, width: width / 2 - 50, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/img/bookmark1.png')} />
                                    <Text style={{ color: '#707070', marginLeft: '4%' }}>Bookmarks</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff', width: width / 2 - 50, alignItems: 'center', padding: '4%', borderBottomEndRadius: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/img/readlater1.png')} />
                                    <Text style={{ color: '#707070', marginLeft: '4%' }}>Read Later</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    // contentContainerStyle={{
                    //     flex: 2,
                    //     // marginTop:'5%',marginLeft:'5%'
                    // }}
                    data={this.state.list}
                    extraData={this.state}
                    renderItem={this.renderItem_card.bind(this)}
                    numColumns={2}
                    removeClippedSubviews={false}
                    enableEmptySections={false}
                    keyExtractor={(item, index) => index.toString()}
                />
</ScrollView>
</SafeAreaView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
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