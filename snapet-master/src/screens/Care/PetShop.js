import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ModalAddEvent from "../../Components/ModalAddEvent";
import EventList from "../../Components/EventList";
import ModalTitle from "../../Components/UI/ModalTitle";
import { serverUrl } from '../../Config/Settings.js'

class PetShopScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    addingEvent: null,
    events: []
  };

  modalClosedHandler = () => {
    this.setState({
      addingEvent: null
    });
    this.getEvents();
  };

  modalOpenHandler = () => {
    this.setState({
      addingEvent: true
    });
  };

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress"){
      if(event.id === "addPetshopEvent"){
        this.setState({
          addingEvent: true
        });
      }
    }
    if(event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
        console.log('pegando lista')
          this.getEvents();
      }
    }
  }


  getEvents = () => {
    fetch(serverUrl+"petshop.json")
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes)
      const dataEvents = [];
      for(let key in parsedRes){
        dataEvents.push({
          ...parsedRes[key],
          key: key
        })
      }
      this.setState({ events: dataEvents});
    })
  }

  eventSelectedHandler = key => {

    const selEvent = this.state.events.find(event =>  {
      return event.key === key;
    });

    if(selEvent) console.log(selEvent)

      Alert.alert(
      'Petshop',
      'Deseja excluir este evento?',
        [
          {},
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.deleteEvent(key)},
        ],
      {cancelable: true},
    );
  }


deleteEvent(key){
  console.log("Delete pressed");
  console.log(key);

    fetch(serverUrl + 'petshop/' + key + '.json', {
      method: "DELETE"
    })
    .catch(err => console.log(err))
    .then(res => res.json())

    this.getEvents();
}

renderEventList(){
  return(
    <EventList
      events={this.state.events}
      onItemSelected={this.eventSelectedHandler}
    />
  )
}

  render(){
    return(
      <View style={styles.container}>
        <ModalAddEvent
          eventImage='banho_bg'
          eventName='Hora de ir ao Pet :)'
          eventAddress='/petshop'
          addingEvent={this.state.addingEvent}
          onModalClosed={this.modalClosedHandler}
        />
        {this.renderEventList()}
        {/* <Button title="Alterar" onPress={this.modalOpenHandler}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1
  }
});

export default PetShopScreen;
