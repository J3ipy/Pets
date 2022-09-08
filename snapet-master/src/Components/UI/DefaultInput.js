import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import CommonStyles from '../../Stylesheets/Common';

export default class DefaultInput extends Component {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.props.onInfoTyped(this.state.placeName);
  };

  render() {
    return (
        <TextInput
          placeholder={this.props.placeholder}
          underlineColorAndroid="transparent"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          style={styles.placeInput}
          keyboardType={this.props.keyboardType}
        />

    );
  }
}

const styles = StyleSheet.create({
  placeInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    fontFamily: CommonStyles.fontTexts,
    fontSize: 20
  },
});
