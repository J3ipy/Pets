import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ModalAddEvent from "../../Components/ModalAddEvent";
import EventList from "../../Components/EventList";
import ModalTitle from "../../Components/UI/ModalTitle";
import { serverUrl } from '../../Config/Settings.js'

class VeterinarioScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    addingEvent: null,
    events: []
  };

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress"){
      if(event.id === "addVeterinarioEvent"){
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

  getEvents = () => {
    fetch(serverUrl+"veterinario.json")
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
      'Veterinario',
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

    fetch(serverUrl + 'veterinario/' + key + '.json', {
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
            eventImage='veterinario_bg'
            eventName='Saude em primeiro lugar ;)'
            eventAddress='/veterinario'
            addingEvent={this.state.addingEvent}
            onModalClosed={this.modalClosedHandler}
          />
          {this.renderEventList()}
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

export default VeterinarioScreen;
