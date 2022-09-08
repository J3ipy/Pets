import React, {Component}  from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";

import CloseButton from '../../Components/UI/CloseButton';
import PetForm from './PetForm';
import CommonStyles from '../../Stylesheets/Common';
import DefaultButton from "../../Components/UI/DefaultButton";

import { serverUrl } from '../../Config/Settings.js'

export default class PetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: '',
      petBreed: '',
      petBirth: ''
      };
  }

  updateName(petName){
    this.setState({petName});
  }

  updateBreed(petBreed){
    this.setState({petBreed});
  }

  updateBirth(petBirth){
    this.setState({petBirth});
  }

  submitHandler = () => {
    this.deletePetData(this.props.internKey)

      fetch(serverUrl+"petdata.json",{
        method: "POST",
        body: JSON.stringify({
          //Estou usando do do FIREBASE
          //key: Math.random().toString(),
          chosenPetName: this.state.petName,
          chosenPetBreed: this.state.petBreed,
          chosenPetBirth: this.state.petBirth,
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
      petName: '',
      petBreed: '',
      petBirth: ''
    });
  }

  deletePetData(key){
    console.log("Delete pressed");
    console.log(key);

      fetch(serverUrl + 'petdata/' + key + '.json', {
        method: "DELETE"
      })
      .catch(err => console.log(err))
      .then(res => res.json())
  }

  render(){
    return (
      <Modal
        onRequestClose={this.props.onModalClosed}
        visible={this.props.openModal !== null}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.buttonContainer}>
            <CloseButton onPress={this.props.onModalClosed} />
            <DefaultButton label="Salvar" onPress={this.submitHandler} style={[{width: "35%", height: 40}]}/>
          </View>
          <PetForm
            currentPetName = {this.updateName.bind(this)}
            currentPetBreed={this.updateBreed.bind(this)}
            currentPetBirthDate={this.updateBirth.bind(this)}
          />
        </View>
      </Modal>
    )
  }

}

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
  foodImage: {
    width: "100%",
    height: 200,
    paddingBottom: 20,
  },
});
