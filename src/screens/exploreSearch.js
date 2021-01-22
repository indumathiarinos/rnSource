import React, { Component } from 'react'
import {SafeAreaView,
  View, ImageBackground, TextInput,BackHandler, FlatList, RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/searchimg1.png';
import img2 from '../assets/img/searchimg2.png';
import img3 from '../assets/img/searchimg3.png';
import Carousel from '@rhysforyou/react-native-carousel';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { connect } from "react-redux";
import { Card } from "react-native-elements";

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')
console.disableYellowBox = true;

const height = Dimensions.get('window').height;

class ExploreSearch extends Component {
  constructor(props){
    super(props)
  this.state = {
    list: [
      {
        id: 0,
        bgcolor: "#569BE0",
        img: img1,
        title: "Collect, Pin, Bookmark",
        subtitle: "Collection publication you like Pin important phrases Bookmark to read later"
      },
      {
        id: 1,
        bgcolor: "#7C3BD3",
        img: img2,
        title: "Share Quotes",
        subtitle: "Share interesting Quotes or Phrases On Social Media"
      },
      {
        id: 2,
        bgcolor: "#EB9A17",
        img: img3,
        title: "Read Anywhere",
        subtitle: "You can also read the same publication on your PC"
      },
      {
        id: 3,
        bgcolor: "#7C3BD3",
        img: img2,
        title: "Share Quotes",
        subtitle: "Share interesting Quotes or Phrases On Social Media"
      },
      {
        id: 4,
        bgcolor: "#EB9A17",
        img: img3,
        title: "Read Anywhere",
        subtitle: "You can also read the same publication on your PC"
      },
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
    this.props.navigation.navigate('collection')
  return true;
}       
  backpress=()=>{
    //    console.log('before set',this.props.nav)
       this.props.changeNavNews();
       this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
   }
  renderItem_card({ item }) {
    return (
      <View style={{ flex: 0.5,alignSelf:'center',margin:'2%' }}>

        {/* <View style={{ width: 155 }}> */}
          <Image
            source={item.img}
          ></Image>
        {/* </View> */}
      </View>
    )
  }
  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={text => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='black'
              placeholder="Search Here"
            />
            <Icon
              style={{ marginLeft: '-8%' }}
              size={20}
              name='ios-search'>

            </Icon>
          </View>
          <TouchableOpacity onPress={()=>this.backpress()}>
          <Image
              style={{ alignSelf: 'center',width:50,height:50 }} 
              source={require('../assets/img/close.png')} />
            </TouchableOpacity>
        </View>

        <View>
          <ScrollView
          >
              <View style = {styles.overlay}>   
  <Text style={{ color: 'black',justifyContent: "center",
    alignItems: "center", fontSize: 32,fontWeight: 'bold' }}>Expole these Reads!</Text>
 
 
<Carousel
  data={[
    {
      id: "1",
      title: "Carousel",
      description: "A handy component for React Native",
      imageUrl: "https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612",
    title: "something three"
    },
    {
        id: "2",
        title: "Carousel",
        description: "A handy component for React Native",
        imageUrl: "https://lh3.googleusercontent.com/-3nN_I6o-2tg/XiwidH4k4UI/AAAAAAAAAtU/v9sJbSF6CD8npkdozC7xbAgguqyVm-a_wCK8BGAsYHg/s0/2020-01-25.png",
      title: "something three"
      },
      {
        id: "3",
        title: "Carousel",
        description: "A handy component for React Native",
        imageUrl: "https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612",
      title: "something three"
      },
 
      {
        id: "4",
        title: "Carousel",
        description: "A handy component for React Native",
        imageUrl: "https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612",
      title: "something three"
      },
      {
        id: "5",
        title: "Carousel",
        description: "A handy component for React Native",
        imageUrl: "https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612",
      title: "something three"
      },
      {
        id: "6",
        title: "Carousel",
        description: "A handy component for React Native",
        imageUrl: "https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612",
      title: "something three"
      },
    // ...
  ]}
  renderItem={info => (
    // <View>
    //   <Text >{info.item.title}</Text>
    //   <Text>{info.item.description}</Text>
    // </View>
     <Card
     title={null}
     image={{ uri: info.item.imageUrl }}
     containerStyle={{ padding: 0, width: 150 }}
   >
     <Text style={{ marginBottom: 10 }}>
       {info.item.title}
     </Text>
   </Card>
  )}
  keyExtractor={item => item.id}
/>    
</View>
            {/* <View style={styles.container}> */}
            {/* <View style={styles.backgroundContainer}>
              <Image source={require('../assets/img/eclipse.png')}
                resizeMode='cover'
                style={styles.backdrop} />
            </View>
            <View style={{ marginTop: '5%', flex:1 }}>
              <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>

                <Image
                  // style={{ width: 50, height: 50 }}
                  source={require('../assets/img/search1.png')}
                />
                <Text style={{ marginLeft: '2%', color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Explore</Text>
              </View>
              <FlatList

                data={this.state.list}
                navigation={() => this.order_nav1.bind(this)}
                extraData={this.state}
                renderItem={this.renderItem_card.bind(this)}
                numColumns={1}
                removeClippedSubviews={false}
                enableEmptySections={false}
                style={{ marginTop: '2%' }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View> */}
          </ScrollView>
        </View>

      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
    overlay:{
        // marginTop:'10%',
        justifyContent: "center",
        alignItems: "center",
      },
     
  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textInputStyle: {
    width: width - 100
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: '55%',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    // flex:1,
    marginTop: '-50%',
    // marginTop:'-120%',
    // marginLeft:'-5%'
  },
})

function mapStateToProps(state){
  return{
  nav:state.apiReducer.nav,
  }
}


function mapDispatchToProps(dispatch){
  return{
      changeNavRec:()=>dispatch({type:'CHANGE_NAV_REC'}),
      changeNavNews:()=>dispatch({type:'CHANGE_NAV_NEWS'})
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ExploreSearch);
