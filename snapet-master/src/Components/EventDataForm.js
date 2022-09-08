import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  DatePickerAndroid,
  TimePickerAndroid,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";


export default class EventDataForm extends Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
        chosenDate: new Date(),
        chosenAndroidTime: '00:00',
        androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
        value: '',
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
      minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ androidDate: `${day}/${month + 1}/${year}` });
        this.onUpdateDate();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = (minute < 10) ? `0${minute}` : minute;
        const h = (hour < 10) ? `0${hour}` : hour;
        console.log(`time: ${hour}:${minute}`);
        this.setState({ chosenAndroidTime: `${h}:${m}` });
        this.onUpdateTime();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  onUpdateValue(value){
    this.setState({value});
    this.props.currentEventValue(value);
  }

  onUpdateTime(){
    this.props.currentEventTime(this.state.chosenAndroidTime);
  }

  onUpdateDate(){
    this.props.currentEventDate(this.state.androidDate);
  }


  render(){

    const source = this.mapKeyToImagePath(this.props.formImage);

    return(
      <ScrollView style={styles.formContainer}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Image source={source} style={styles.eventImage} />

          <Text style={styles.eventName}>{this.props.formName}</Text>

            <TouchableOpacity onPress={() => this.setDateAndroid()}>
              <View style={styles.pickerContainer}>
                <Icon name="ios-calendar" size={25} style={styles.iconPicker}/>
                <Text style={{ fontSize: 16 }}>
                  {this.state.androidDate}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setTimeAndroid()}>
              <View style={styles.pickerContainer}>
                <Icon name="ios-time" size={25} style={styles.iconPicker}/>
                <Text style={{fontSize: 16 }}>
                  {this.state.chosenAndroidTime}
                </Text>
              </View>
            </TouchableOpacity>

            <TextInput
                style={[styles.pickerContainer, styles.inputText]}
                placeholder={this.props.placeholder}
                onChangeText={value => this.onUpdateValue(value)}
                value={this.state.value}
                keyboardType='number-pad'
                underlineColorAndroid="transparent"
              />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  mapKeyToImagePath(key) {
    return {
      banho_bg: require("../assets/Images/banho-tosa.jpeg"),
      vacina_bg: require('../assets/Images/vacina.jpg'),
      veterinario_bg: require('../assets/Images/veterinario.jpg'),
    }[key];
  }

}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 10,
    marginBottom: 50,
  },
  eventImage: {
    width: "100%",
    height: 200,
    paddingBottom: 20,
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
  iconPicker: {
    marginRight: 20
  },
  inputText: {
    fontSize: 18,
    marginBottom: 5
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
  }
});
