import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import CommonStyles from '../../Stylesheets/Common';

const foodEventItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <View style={styles.itemField}>
        <Text style={styles.textTitle}>{props.mealName}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.textItem}>{props.mealTime}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.textItem}>{props.mealPortion}</Text>
        <Text style={styles.textTitle}>porções</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.textItem}>{props.mealType}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        height: 80,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
        flexDirection: "row",
        //justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    itemField: {
      width: "25%",
    },
    textItem: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      color: CommonStyles.mainColor,
    },
    textTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    }
});

export default foodEventItem;
