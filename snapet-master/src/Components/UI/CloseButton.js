import React, { Component } from 'react';

import {
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class CloseButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.closeIconContainer} onPress={this.props.onPress}>
        <Icon name='md-close' size={40} />
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  closeIconContainer: {
     //height: 50,
     width: 50,
    // alignItems: 'flex-start'
    //borderWidth: 0.5,
    //borderColor: '#d6d7da',
  }
});
