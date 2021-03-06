import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppBase from '../baseComponents/AppBase';

class SideDrawer extends Component {
  render() {
    return (
      <AppBase
        style={{
          paddingTop: 40,
        }}
      >
        <TouchableOpacity onPress={Actions.showAllOrders}>
          <Text style={{ fontSize: 18 }}>My Orders</Text>
        </TouchableOpacity>
      </AppBase>
    );
  }
}

SideDrawer.propTypes = {};

export default SideDrawer;