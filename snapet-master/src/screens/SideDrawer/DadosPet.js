import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import PetModal from './PetModal';
import CameraPhotoModal from '../../Components/CameraPhotoModal';
import CommonStyles from '../../Stylesheets/Common';
import DefaultButton from "../../Components/UI/DefaultButton";
import { serverUrl } from '../../Config/Settings.js'

class DadosPetScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    modalVisible: null,
    modalCameraVisible: null,
    petName: '',
    petBreed: '',
    petBirth: '',
    encodedData: '',
    key: ''
  };

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
    if(event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
        this.getPetData();
        this.getPetPhoto();
      }
    }
  }


  getPetData = () => {
    fetch(serverUrl+"petdata.json")
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
         petName: dataEvents[0].chosenPetName,
        petBreed: dataEvents[0].chosenPetBreed,
         petBirth: dataEvents[0].chosenPetBirth,
         key: dataEvents[0].key
     });

    })
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

  modalClosedHandler = () => {
    this.setState({
      modalVisible: null
    });
    this.getPetData();
  };

  modalOpenHandler = () => {
    this.setState({
      modalVisible: true
    });
  };

  modalCameraClosed = () => {
    this.setState({
      modalCameraVisible: null
    });
    this.getPetPhoto();
  };

  modalCameraOpen = () => {
    this.setState({
      modalCameraVisible: true
    });
  };

  post64photo = (petPhoto) => {
        fetch(serverUrl+"petphoto.json",{
          method: "POST",
          body: JSON.stringify({
            base64: petPhoto,
          })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes);
        });
  }

  render(){
    return(
      <View style={styles.container}>
        <PetModal
          openModal={this.state.modalVisible}
          onModalClosed={this.modalClosedHandler}
          internKey={this.state.key}
        />
        <CameraPhotoModal
          openModal={this.state.modalCameraVisible}
          onModalClosed={this.modalCameraClosed}
          pic64={this.post64photo}
          //internKey={this.state.key}
        />

        <View style={styles.imageContainer}>
          <Image
              style={styles.imagePet}
              source={{uri: `data:image/gif;base64,${this.state.encodedData}`}}
            />
        </View>

       <View style={styles.informationContainer}>
          <View style={styles.informationLine}>
            <Text style={styles.textTitle}>Nome: </Text>
            <Text style={styles.textInfo}>{this.state.petName}</Text>
          </View>

          <View style={styles.informationLine}>
            <Text style={styles.textTitle}>Raça: </Text>
            <Text style={styles.textInfo}>{this.state.petBreed}</Text>
          </View>

          <View style={styles.informationLine}>
            <Text style={styles.textTitle}>Nascimento: </Text>
            <Text style={styles.textInfo}>{this.state.petBirth}</Text>
          </View>
       </View>

        <View style={styles.buttonContainer}>
          <DefaultButton label="Alterar foto" style={[{width: "40%"}]} onPress={this.modalCameraOpen}/>
          <DefaultButton label="Alterar dados" style={[{width: "40%"}]} onPress={this.modalOpenHandler}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyles.screenBackgroundColor
  },
  imageContainer:{
    height: 155,
    width: 155,
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
  },
  imagePet: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  informationContainer: {
    margin: 10,
    backgroundColor: "white",
  },
  informationLine: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: CommonStyles.mainColor,
},
  textInfo: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
},
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "80%",
    marginLeft: "10%"
  }
});

export default DadosPetScreen;
