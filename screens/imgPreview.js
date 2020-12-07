
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
      Dimensions,
  BackHandler,
  SafeAreaView,
  Button,
  ImageBackground,
  ProgressViewIOS,
  Modal
} from 'react-native';
import ModalBox from 'react-native-modalbox';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class PreView extends Component {
  constructor(props){
    super(props);
    this.state={
      showBar:false,
      showlikeImg:false,
      collectionPopup:false
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
    this.backpress();
    return true;
  } 
  
  backpress=()=>{
      //  this.props.changeN0avNews();
      //  this.props.navigation.navigate('viewBook',{item:'1'})
      this.props.navigation.goBack();
   }
   imgPress=()=>{
    this.props.navigation.navigate('socialmedia')
  }
  render() {
   let value = this.props.navigation.state.params.name
    ? this.props.navigation.state.params.name
    : false;
    let title=this.props.navigation.state.params.title?this.props.navigation.state.params.title:null
    console.log('img data is ',value);

    // const value = this.props.navigation.getParam('photo');
    return (
     
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#000',
        alignContent: 'center', justifyContent: 'center'
      }}
      >
         <TouchableOpacity style={{position:'absolute',height:"8%",top:0,left:0,right:0}} onPress={()=>this.setState({showBar:!this.state.showBar})}/>
       {!this.state.showBar?null:
        <View style={{flexDirection:'row',position:'absolute',height:"8%",top:0,left:0,right:0,backgroundColor:'gray'}}>
          <Text style={{color:'#fff',marginLeft:'2%',alignSelf:'center',fontSize:17,textAlign:'center',width:width/1.1,}}>{title}</Text>
         <TouchableOpacity style={{marginRight:'2%',alignItems:'center',justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('viewBook')}>
          <Image source={require('../assets/img/close.png')}/>
          </TouchableOpacity>
        </View>}
        <Image 
        style={{ width: '100%', height: '80%', alignSelf: 'center' }}
          source={{uri:value}}>
        </Image>
        <TouchableOpacity style={{position:'absolute',height:"8%",bottom: 0,left:0,right:0}} onPress={()=>this.setState({showBar:!this.state.showBar})}/>

        {!this.state.showBar?null:
         <View style={styles.bottomBar}>
         <TouchableOpacity
           style={{ padding: '1%' }}
           onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
         >
           <Image
             source={!this.state.showlikeImg?require('../assets/img/unlike.png'):require('../assets/img/like.png')}
           />
         </TouchableOpacity>
         <TouchableOpacity
           style={{ padding: '1%' }}
           onPress={() => this.props.navigation.navigate('comments')}
         >
           <Image
             source={require('../assets/img/comment1.png')} />
         </TouchableOpacity>
         <TouchableOpacity
           style={{ padding: '1%' }}
          onPress={()=>this.props.navigation.navigate('collection')}
         >
           <Image source={require('../assets/img/plus1.png')} />
         </TouchableOpacity>
         <TouchableOpacity
           style={{ padding: '1%' }}

           onPress={() => this.refs.modal6.open()}
         >

           <Image source={require('../assets/img/share.png')} />
         </TouchableOpacity>
       </View>
       }
        <ModalBox 
              style={{  alignItems: 'center',
              flex:0.45,
              borderRadius:20,
              // flex:!this.state.expanded?0.4:0.5,
              width: 300,}}
             position={'center'}
             ref={'modal6'}
             isDisabled={this.state.isDisabled}>
          <View style={{ flex: 0.6,backgroundColor:'#fff',borderRadius:30,margin:'8%' }}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:20,margin:'5%',textAlign:'center'}}>Share Via</Text>
              <View style={{flexDirection:'column',justifyContent:'center',alignSelf:'center'}}>
                 <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
      
       <Image source={require('../assets/img/fb2.png')}/>
         <Text style={{margin:'2%'}}>Facebook</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/twitter.png')}/>
         <Text style={{margin:'2%'}}>Twitter</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center', }}>
       <Image source={require('../assets/img/insta.png')}/>
         <Text style={{margin:'2%'}}>Instagram</Text>
       </View>

       </TouchableOpacity>
       </View>
       <View style={{ flexDirection:'row',backgroundColor:'#fff',margin:'3%',alignItems:'center' }}>
       
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/pinterest.png')}/>
         <Text style={{margin:'2%'}}>Pinterest</Text>
       </View>

       </TouchableOpacity>
       <TouchableOpacity onPress={this.imgPress}>
       <View style={{ flexDirection: 'column',margin:'5%',justifyContent:'space-between',alignItems:'center' }}>
       <Image source={require('../assets/img/tumblr.png')}/>
         <Text style={{margin:'2%'}}>Tumblr</Text>
       </View>

       </TouchableOpacity>
      
       </View>
   
   </View>
               
            </View>
           </View>
        </ModalBox>
      </SafeAreaView>
    );
  }
}
const styles=StyleSheet.create({
  bottomBar: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: '3%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
})

export default (PreView);