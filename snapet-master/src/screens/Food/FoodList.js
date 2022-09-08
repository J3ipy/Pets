import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import FoodList from './FoodEventItem';

const foodList = props => {
    return (
        <FlatList
          style={styles.listContainer}
          data={props.meals}
          keyExtractor={item => item.key}
          renderItem={(info) => (
            <FoodList
              mealName={info.item.chosenName}
              mealTime={info.item.chosenTime}
              mealType={info.item.chosenType}
              mealPortion={info.item.chosenPortion}
              onItemPressed={() => props.onItemSelected(info.item)}
             />
          )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default foodList;
