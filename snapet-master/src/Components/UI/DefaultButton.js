import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import CommonStyles from '../../Stylesheets/Common';

const defaultButton = props => (
  <View style={[styles.outerContainer, props.style]}>
  <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <Text style={styles.text}>{props.label}</Text>
  </TouchableOpacity>
  </View>
)


const styles = StyleSheet.create({
  outerContainer:{
    height: 50,
    width: "100%",  //The Width must be the same as the height
    backgroundColor: CommonStyles.mainColor,
    borderRadius: 5,
    elevation: 2, // Android
  },
  buttonContainer: {
    flex: 1,
      justifyContent: 'center',
      alignItems: "center",
  },
  buttonIcon: {
    marginRight: 20
  },
  text: {
    fontFamily: CommonStyles.fontTexts,
    color: CommonStyles.textColor,
    fontSize: CommonStyles.fontSize
  }
});

export default defaultButton;
