import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet} from 'react-native';

import FoodHeader from './FoodHeader';
import FoodModal from './FoodModal';
import FoodEventItem from './FoodEventItem';
import FoodList from './FoodList';
import FoodButton from '../../Components/UI/FoodButton';
import DefaultButton from "../../Components/UI/DefaultButton";
import CommonStyles from '../../Stylesheets/Common';

import { serverUrl, raspStaticIP, raspWifiCasa } from '../../Config/Settings.js'


class FoodScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    modalVisible: null,
    meals: [],
    rasperryDynamicIp: ''
  };

  getRaspberryIp = () => {
    fetch(serverUrl+"userdata.json")
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
       this.setState({
         rasperryDynamicIp: 'http://'+dataEvents[0].raspberryIp
     });

    })
  }

  getEvents = () => {
    fetch(serverUrl+"meals.json")
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
      this.setState({ meals: dataEvents});
    })
  }

  sendSignal = () => {
    console.log("Abrindo reservatorio...");

    fetch(this.state.rasperryDynamicIp+":3000/?porta4=1&porcao=3",{
      method: "POST",
      body: JSON.stringify({})
    })
    .catch(err => console.log(err))
  }


  modalClosedHandler = () => {
    this.setState({
      modalVisible: null
    });
    this.getEvents();
  };

  modalOpenHandler = () => {
    this.setState({
      modalVisible: true
    });
  };

  foodAction = () => {
    Alert.alert(
    'Alimentação',
    'Deseja alimentar seu pet?',
      [
        {},
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim!!', onPress: () => this.sendSignal()},
      ],
    {cancelable: true},
    );
  }


  onNavigatorEvent = event => {
    console.log(event)
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }

    if(event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
          this.getRaspberryIp();
          this.getEvents();
      }
    }
  }

  eventSelectedHandler = item => {

    const selMeal = this.state.meals.find(meal =>  {
      return meal.key === item.key;
    });

    if(selMeal) console.log(selMeal)

      Alert.alert(
      'Petshop',
      'Deseja excluir este evento?',
        [
          {},
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.deleteEvent(item)},
        ],
      {cancelable: true},
    );
  }

  deleteEvent(item){
    console.log("Delete pressed");
    console.log(item.key);
    console.log(item.chosenName);

      fetch(serverUrl + 'meals/' + item.key + '.json', {
        method: "DELETE"
      })
      .catch(err => console.log(err))
      .then(res => res.json())

      fetch(this.state.rasperryDynamicIp+":3000/?nome="+item.chosenName,{
        method: "POST",
        body: JSON.stringify({})
      })
      .catch(err => console.log(err))

      this.getEvents();
  }

  render(){
    return(
      <View style={styles.container}>
        <FoodModal
          openModal={this.state.modalVisible}
          onModalClosed={this.modalClosedHandler}
          raspberryDIP ={this.state.rasperryDynamicIp}
        />
        <FoodHeader />
        <View style={styles.bodyContainer}>
          <FoodList
            meals={this.state.meals}
            onItemSelected={this.eventSelectedHandler}
          />
        </View>

          <View style={styles.buttonContainer}>
            <DefaultButton label='Alimentar' style={[{width: "40%"}]} onPress={this.foodAction}/>
            <FoodButton onPress={this.modalOpenHandler}/>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: CommonStyles.screenBackgroundColor,
    },
    bodyContainer:{
      flex: 2,
      padding: 10,
    },
    buttonContainer: {
      width: "60%",
      flexDirection: 'row',
      marginBottom: 10,
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: "center",
    }
});

export default FoodScreen;
