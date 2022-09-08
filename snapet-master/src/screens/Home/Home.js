import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { serverUrl } from '../../Config/Settings.js'
import CommonStyles from '../../Stylesheets/Common';

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    encodedData: '',
    petName: ''
  }

  getPetPhoto = () => {
    fetch(serverUrl+"petphoto.json")
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
         encodedData: dataEvents[0].base64,
     });

    })
  }

  getPetName = () => {
    fetch(serverUrl+"petdata.json")
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes)
      const dataEvents = [];
      for(let key in parsedRes){
        dataEvents.push({
          ...parsedRes[key],
        })
      }
       this.setState({
         petName: dataEvents[0].chosenPetName,
     });

    })
  }

  onNavigatorEvent = event => {
    console.log(event);
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
    
    if(event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
            this.getPetPhoto();
            this.getPetName();
      }
    }

  }
  render(){

    return(
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
              style={styles.imagePet}
              source={{uri: `data:image/gif;base64,${this.state.encodedData}`}}
            />
        </View>
        <Text style={styles.petNameStyle}>{this.state.petName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: CommonStyles.screenBackgroundColor,
      paddingTop: "15%",
      alignItems: 'center'

    },
    imageContainer:{
      height: 255,
      width: 255,
      borderRadius: 125,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
    },
    imagePet: {
      height: 250,
      width: 250,
      borderRadius: 125
    },
    petNameStyle:{
      fontSize: 30,
      paddingTop: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: CommonStyles.mainColor,
    }
});

export default HomeScreen;
