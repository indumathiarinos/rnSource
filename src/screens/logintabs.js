import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Text,
  Body,
  TabHeading,
  ScrollableTab
} from "native-base";
import SignIn from "./signin";
import Signup from "./sign_up";
import { StyleSheet, Image, Dimensions } from "react-native";
import { Avatar } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// import TabThree from "./tabThree";
// import TabFour from "./tabFour";
// import TabFive from "./tabFive";

class LoginTabs extends Component {
  constructor(props) {
    super(props)
    this.state = { initialPage: 0, activeTab: 0 }
  }


  press = (data) => {
    console.log("passed data is ", data);
  }

  render() {
    const name = this.props.navigation.state.params.pass_data
      ? this.props.navigation.state.params.pass_data
      : 'No Value Passed';

    return (
      <Container>
        <Header style={styles.header} hasTabs>
          {/* <Image
            style={{ width: 108, height: 108, borderRadius: 108 / 2 }}
            source={require('../assets/imgs/no_profile.png')}

          /> */}
          {/* <Avatar
            // style={{marginTop:40}}
            // style={{height:108,width:108,borderRadius:108/2}}
            // size="xlarge"
            size='large'
            imageProps={{resizeMode: 'cover'}} 
            rounded
            source={require('../assets/imgs/logo.png')}
            // title="CR"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}/> */}
        </Header>

        <Tabs initialPage={name} page={name}
          tabBarBackgroundColor={'#ffff'} tabBarUnderlineStyle={{ backgroundColor: '#27A291' }}
          renderTabBar={() => <ScrollableTab />}>
          <Tab heading={
            <TabHeading style={styles.tabactive}>
              <Text onPress={this.press(name)} style={{ color: '#27A291' }} >SIGN IN</Text>
            </TabHeading>}>
            <SignIn navigation={this.props.navigation} />
          </Tab>
          <Tab heading={
            <TabHeading style={styles.tabactive}>
              <Text style={{ color: '#27A291' }}>SIGN UP</Text>
            </TabHeading>}>
            <SignIn navigation={this.props.navigation} />
          </Tab>
          {/* <Tab heading="Tab3">
            <TabThree />
          </Tab>
          <Tab heading="Tab4">
            <TabFour />
          </Tab>
          <Tab heading="Tab5">
            <TabFive />
          </Tab> */}
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffff',
    marginTop: '10%',
    height: 108
  },
  tabactive: {
    backgroundColor: '#fff',
    color: '#27A291'
  }
})

export default LoginTabs;

