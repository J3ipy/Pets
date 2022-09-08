import React, {Component} from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  TextInput,
  StyleSheet,
  DatePickerAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default class PetForm extends Component {

  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
        chosenDate: new Date(),
        androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
        petName: '',
        petBreed: '',
      };
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  setDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
      date: new Date(),
      //minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ androidDate: `${day}/${month + 1}/${year}` });
        this.onUpdateDate();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  onUpdatePetName(petName){
    this.setState({petName});
    this.props.currentPetName(petName);
  }
  onUpdatePetBreed(petBreed){
    this.setState({petBreed});
    this.props.currentPetBreed(petBreed);
  }

  onUpdateDate(){
    this.props.currentPetBirthDate(this.state.androidDate);
  }


  render(){
    return(
      <ScrollView style={styles.formContainer}>
        <KeyboardAvoidingView behavior="padding" enabled>
        <TextInput
            style={[styles.pickerContainer, styles.inputText]}
            placeholder='Nome do Pet'
            onChangeText={value => this.onUpdatePetName(value)}
            value={this.state.petName}
            underlineColorAndroid="transparent"
          />
          <TextInput
              style={[styles.pickerContainer, styles.inputText]}
              placeholder='Raça'
              onChangeText={value => this.onUpdatePetBreed(value)}
              value={this.state.petBreed}
              underlineColorAndroid="transparent"
            />

            <TouchableOpacity onPress={() => this.setDateAndroid()}>
              <View style={styles.pickerContainer}>
                <Icon name="ios-calendar" size={25} style={styles.iconPicker}/>
                <Text style={{ fontSize: 16 }}>
                  {this.state.androidDate}
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 10,
    marginBottom: 50,
  },
  eventName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
    paddingBottom: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  inputText: {
    fontSize: 18,
  },
  iconPicker: {
    marginRight: 20
  },
});
