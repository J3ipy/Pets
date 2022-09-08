import React, {Component}  from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";

import CloseButton from '../../Components/UI/CloseButton';
import FoodForm from './FoodForm';
import CommonStyles from '../../Stylesheets/Common';
import DefaultButton from "../../Components/UI/DefaultButton";

import { serverUrl, raspStaticIP, raspWifiCasa } from '../../Config/Settings.js'

export default class FoodModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mealName: '',
        mealTime: '',
        mealHour: '',
        mealMin: '',
        mealPortion: 1,
        mealType: 'G'
      };
  }

  updateName(mealName){
    this.setState({mealName});
  }

  updateTime(mealState){
    this.setState({
      mealTime: mealState.mealTime,
      mealHour: mealState.mealHour,
      mealMin: mealState.mealMin,
    });
  }

  updatePortion(mealPortion){
    this.setState({mealPortion});
  }

  updateType(mealType){
    this.setState({mealType});
  }

  submitHandler = () => {

    console.log("enviando crontab do raspberry");
    fetch(this.props.raspberryDIP+":3000/?nome="+this.state.mealName+
    "&porcao="+this.state.mealPortion+
    "&tipo="+this.state.mealType+
    "&hora="+this.state.mealHour+
    "&min="+this.state.mealMin,{
      method: "POST",
      body: JSON.stringify({})
    })
    .catch(err => console.log(err))

    console.log("enviando firebase");
    fetch(serverUrl+"meals.json",{
      method: "POST",
      body: JSON.stringify({
        //Estou usando do do FIREBASE
        //key: Math.random().toString(),
        chosenName: this.state.mealName,
        chosenTime: this.state.mealTime,
        chosenPortion: this.state.mealPortion,
        chosenType: this.state.mealType,
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
      mealName: '',
      mealTime: '',
      mealTime: 1,
      mealType: 'G'
    });
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
            <FoodForm
              currentMealName = {this.updateName.bind(this)}
              currentMealTime={this.updateTime.bind(this)}
              currentMealPortion={this.updatePortion.bind(this)}
              currentMealType={this.updateType.bind(this)}

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
});
