import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import CommonStyles from '../../Stylesheets/Common';

const drawerButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.buttonContainer}>
      <Icon
        name={props.iconName}
        size={30}
        color="#aaa"
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonText}>{props.name}</Text>
    </View>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: CommonStyles.headerBackgroundColor,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  buttonIcon: {
    marginRight: 20
  },
  buttonText: {
    fontSize: 18,
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
  }
});

export default drawerButton;
