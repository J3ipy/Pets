import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import CommonStyles from '../../Stylesheets/Common';

const foodHeader = (props) => (

    <View style={styles.headerContainer}>
    </View>

);

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: 80,
        //backgroundColor: "#0bccde",
        backgroundColor: CommonStyles.mainColor,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
});

export default foodHeader;
