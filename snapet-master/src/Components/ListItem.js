import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import CommonStyles from '../Stylesheets/Common';

const listItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <View style={styles.itemField}>
        <Text style={styles.textTitle}>{props.eventDate}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.textTitle}>{props.eventTime}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.textTitle}>Valor: </Text>
        <Text style={styles.textItem}>{props.eventValue},00</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        height: 60,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    itemField: {
      width: "33%",
      flexDirection: "row",
      justifyContent: "center",
    },
    textItem: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: CommonStyles.mainColor,
    },
    textTitle: {
      fontSize: 18,
      textAlignVertical: 'center',
      paddingRight: 10,
    }
});

export default listItem;
