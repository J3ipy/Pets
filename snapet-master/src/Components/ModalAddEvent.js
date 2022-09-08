import React, {Component}  from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";
import CloseButton from './UI/CloseButton';
import EventDataForm from './EventDataForm';

import { serverUrl } from '../Config/Settings.js'

export default class ModalAddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        chosenTime: '',
        chosenDate: ''
      };
  }

  updateValue(value){
    this.setState({value});
  }

  updateTime(chosenTime){
    this.setState({chosenTime});
  }

  updateDate(chosenDate){
    this.setState({chosenDate});
  }

  submitHandler = () => {
    console.log("hey");

    fetch(serverUrl+this.props.eventAddress+".json",{
      method: "POST",
      body: JSON.stringify({
        //Estou usando do do FIREBASE
        //key: Math.random().toString(),
        value: this.state.value,
        chosenTime: this.state.chosenTime,
        chosenDate: this.state.chosenDate,
      })
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      this.props.onModalClosed();
      this.clearState();
    });
  }

  clearState(){
    this.setState({
      value: '',
      chosenTime: '',
      chosenDate: ''
    });
  }

  render(){
    return (
      <View>
        <Modal
          onRequestClose={this.props.onModalClosed}
          visible={this.props.addingEvent !== null}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.buttonContainer}>
              <CloseButton onPress={this.props.onModalClosed} />
              <Button title="Salvar" onPress={this.submitHandler}/>
            </View>
            <EventDataForm
              formImage={this.props.eventImage}
              formName={this.props.eventName}
              placeholder="Quanto será pago?"
              currentEventValue={this.updateValue.bind(this)}
              currentEventTime={this.updateTime.bind(this)}
              currentEventDate={this.updateDate.bind(this)}
            />
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
    //alignItems: "center"
  },
});
