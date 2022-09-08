import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import CareChart from '../../Components/CareChart';
import CareButton from '../../Components/UI/CareButton';
import Icon from "react-native-vector-icons/Ionicons";
import CommonStyles from '../../Stylesheets/Common';
import FoodHeader from '../Food/FoodHeader';

class CareScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    this.state = {
      showChart: false
      };
  }

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  goToPetshop = () => {
    Promise.all([
      Icon.getImageSource("md-add", 30)
    ]).then(sources => {
      this.props.navigator.push({
        screen: "snapet.PetShopScreen",
        title: "Banho e Tosa",
        navigatorButtons: {
          rightButtons: [
            {
              icon: sources[0],
              title: "addPetshop",
              id: "addPetshopEvent"
            }
          ]
        }
      })
    })
  }

  goToVeterinario = () => {
    Promise.all([
      Icon.getImageSource("md-add", 30)
    ]).then(sources => {
      this.props.navigator.push({
        screen: "snapet.VeterinarioScreen",
        title: "Veterinario",
        navigatorButtons: {
          rightButtons: [
            {
              icon: sources[0],
              title: "addVeterinario",
              id: "addVeterinarioEvent"
            }
          ]
        }
      })
    })
  }

  goToVacinas = () => {
    Promise.all([
      Icon.getImageSource("md-add", 30)
    ]).then(sources => {
      this.props.navigator.push({
        screen: "snapet.VacinasScreen",
        title: "Vacinas",
        navigatorButtons: {
          rightButtons: [
            {
              icon: sources[0],
              title: "addVacinas",
              id: "addVacinasEvent"
            }
          ]
        }
      })
    })
  }

  handleToggleChart = () => {
    this.setState(prevState => {
      return {
        showChart: !prevState.showChart
      };
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <FoodHeader />
        <CareButton name='Banho e Tosa' iconName='md-cut' onPress={this.goToPetshop}/>
        <CareButton name='Veterinário' iconName='md-medkit' onPress={this.goToVeterinario}/>
        <CareButton name='Cartão de vacinas' iconName='md-pulse' onPress={this.goToVacinas}/>
        {/* <CareButton name='Banho Chart' iconName='md-cut' onPress={this.handleToggleChart}/>
        <CareChart showChart={this.state.showChart}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonStyles.screenBackgroundColor,
    flex: 1
  }
});

export default CareScreen;
