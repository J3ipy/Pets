import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';

const eventList = props => {
    return (
        <FlatList
          style={styles.listContainer}
          data={props.events}
          keyExtractor={item => item.key}
          renderItem={(info) => (
            <ListItem
              eventDate={info.item.chosenDate}
              eventTime={info.item.chosenTime}
              eventValue={info.item.value}
              onItemPressed={() => props.onItemSelected(info.item.key)}
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

export default eventList;
