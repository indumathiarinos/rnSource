import React, { Component } from 'react'
import {SafeAreaView,
  View, ImageBackground, FlatList,BackHandler,RefreshControl, StyleSheet, Text, Alert, Dimensions, ScrollView, StatusBar, Image,
  TouchableOpacity, PermissionsAndroid
} from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../assets/img/cover1.png';
import img2 from '../assets/img/cover2.png';
import img3 from '../assets/img/cover3.png';
import Carousel from '@rhysforyou/react-native-carousel';
import LinearGradient from 'react-native-linear-gradient';

// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
console.disableYellowBox = true;

// import { Button } from 'react-native-paper';
const width = Dimensions.get('window').width;
// const { width: screenWidth } = Dimensions.get('window')

const height = Dimensions.get('window').height;
class EditPins extends Component {
  constructor() {
    super();
    this.state = {
    list: [
      {
        id: 0,
        bgcolor: "#569BE0",
        img: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
        title: "The King Without a Crown",
        publications: '4 publications',
        pages: 'Page 3',
        subtitle: "David Attenbodo"
      },
      {
        id: 1,
        bgcolor: "#7C3BD3",
        img: require('../assets/img/lion.png'),
        title: "Ellie the Elephant",
        publications: '4 publications',
        pages: 'Page 69',
        subtitle: "Austin McGuyver"
      },
      {
        id: 2,
        bgcolor: "#EB9A17",
        img: require('../assets/img/cheetah.png'),
        title: "The New King in the Wild",
        subtitle: "Jabro Kanovski",
        pages: 'Page 7'
      },
      {
        id: 3,
        bgcolor: "#EB9A17",
        img: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        title: "Cats in the Wild",
        subtitle: "Frances Theron",
        pages: 'Page 7'

      }
    ],
    boolean: false
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
  backpress = () => {
    //    console.log('before set',this.props.nav)
    this.props.changeNavNews();
    this.props.navigation.navigate('MainpageTabs')
    //    console.log('after set',this.props.nav);
  }
  pressIcon = (item) => {
    let { list } = this.state;
    list = list.map(e => {
      if (item.id === e.id) {
        // item.like = !e.like;
        return this.props.navigation.navigate('viewBook', {
          item: item
        });
        //   } else if (item.id === 1) {
        //     return this.props.navigation.navigate('filter', {
        //       item: item
        //     });
        //   } else if (item.id === 2) {
        //     return this.props.navigation.navigate('bookmarks', {
        //       item: item
        //     });
      } else {
        return e;
      }
    });
  }

  renderItem_card({ item }) {
    // const value = item;
    return (
      // <TouchableOpacity
      // onPress={() => this.pressIcon(item)}
      // >
      <View style={{ flex: 1, marginToo: '2%', marginBottom: '2%' }} >
        <View style={{ width: width / 2 - 20, height: height / 4, elevation: 2, backgroundColor: '#fff', borderRadius: 10, marginLeft: '6%', alignItems: 'center', justifyContent: 'center' }}>
          {isNaN(item.img) ? (<Text style={{ textAlign: 'center', padding: '5%', alignSelf: 'center' }}>{item.img}</Text>) : (<Image style={{ width: width / 2 - 20, height: height / 4 }} source={item.img} />)}
        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: '15%', marginBottom: '5%', marginTop: '5%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ color: '#707070', fontSize: 16 }}>{item.pages}</Text>
        </View>
      </View>
      // </TouchableOpacity>  
    )

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>

        <View style={styles.staticheader}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('collection')}
          >
            <Image source={require('../assets/img/backarrow.png')} />
          </TouchableOpacity>
          {/* <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ alignItems: 'center' }}
            onPress={() => this.props.navigation.navigate('sectionDetail')}
            >
              <Text style={styles.headerText}

              >Reads</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#27A291',
              borderRadius: 20,
            }}
              >
              <Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}
              
              >Pins</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ flexDirection: 'row', width: width - 60, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}

              onPress={() => this.props.navigation.navigate('collectionDetail')}>
              <View style={{ flexDirection: 'row' }}>
                <Text  style={{
                  paddingLeft: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 16,
                  color: 'black',
                  fontWeight: 'bold'
                }}
                >Collections / </Text><Text style={{
                  paddingRight: '5%',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  fontSize: 16,
                  color: '#27A291',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>Sections</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{
              backgroundColor: '#27A291',
              borderRadius: 20,
            }} >
              <Text style={{
                padding: '5%',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
              }}

              >Pins</Text>
            </TouchableOpacity>


          </View>
          <TouchableOpacity onPress={() => this.backpress()}>
          <Image
              style={{ alignSelf: 'center',width:50,height:50 }} 
              source={require('../assets/img/close.png')} />
           </TouchableOpacity>
        </View>

        <ScrollView>

          <ImageBackground style={{ width: width, height: 150, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)', marginBottom: '3%' }}
            imageStyle={{
              opacity: 0.5
            }}
            source={require('../assets/img/lion.png')}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 22 }}>Our Planet</Text>
            {/* <View style={styles.divider}></View> */}
            {/* <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Mamals</Text> */}

          </ImageBackground>



          {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-around', padding: '2%' }}>

            <TouchableOpacity
              style={{ padding: '3%', borderRadius: 30, alignItems: 'center', backgroundColor: '#fff', elevation: 3, width: width / 2 - 50, height: height / 12 }}
              onPress={() => this.props.navigation.navigate('editSection')}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image source={require('../assets/img/pencil.png')} />
                <Text>Edit Section</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: '3%', borderRadius: 30, alignItems: 'center', backgroundColor: '#fff', elevation: 3, width: width / 2 - 50, height: height / 12 }}
              onPress={() => this.props.navigation.navigate('filter')}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image source={require('../assets/img/filter.png')} />
                <Text >Filter</Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <FlatList
            data={this.state.list}
            contentContainerStyle={{ marginTop: '5%' }}
            extraData={this.state}
            numColumns={2}
            renderItem={this.renderItem_card.bind(this)}
            removeClippedSubviews={false}
            enableEmptySections={false}
            keyExtractor={(item, index) => index.toString()}
          />

        
        </ScrollView>
        <FloatingAction
                       style={{color:'#27A291'}}
                       position={'right'}
                        ref={(ref) => { this.floatingAction = ref; }}
                        actions={this.state.actions}
                        color={'#27A291'}
                        onPressItem={name => {
                                this.props.navigation.navigate(name)
                            console.log(`selected button: ${name}`);
                        }}
                    />
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  staticheader: {
    paddingLeft: '2%',
    // paddingRight:'2%',
    flexDirection: 'row',
    // justifyContent: 'center', 
    alignItems: 'center',
    // height: '8%',
    backgroundColor: '#ffff',
    elevation: 1,
    borderBottomColor:'#707070'


  },

  headerText: {
    padding: '5%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider: {
    width: width / 2,
    alignSelf: 'center',
    padding: '1%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPins);