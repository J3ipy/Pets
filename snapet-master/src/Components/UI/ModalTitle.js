import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";


const modalTitle = props => (
    <View style={styles.TitleContainer}>
      <Text style={styles.titleText}>{props.label}</Text>
    </View>
)


const styles = StyleSheet.create({
  TitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  titleText: {
    fontSize: 18,
  },
});


export default modalTitle;
