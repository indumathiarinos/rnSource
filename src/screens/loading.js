import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Modal from "react-native-modal";

export default class App extends Component {
 constructor(props){
   super(props);
   this.state={
     loading:true
   }
 }
  render() {
    
    return (
      <View style={styles.container}>
  {/* <Modal isVisible={this.state.loading}03........00...
onBackdropPress={() => this.setState({ loading: false })}> */}
        <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/happy_mothersDay.gif'}} style = {{width: 100, height: 100}} />
       {/* <Image source={require('../assets/gif/download.jfif')} style = {{width: 315, height: 383}}/> */}
       {/* <Image source={{uri : 'https://onlinepngtools.com/images/examples-onlinepngtools/sunset.gif'}} style = {{width: 100, height: 100}} /> */}
      {/* </Modal> */}
       
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});