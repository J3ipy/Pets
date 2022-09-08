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

import UserModal from './UserModal';
import CameraPhotoModal from '../../Components/CameraPhotoModal';
import CommonStyles from '../../Stylesheets/Common';
import DefaultButton from "../../Components/UI/DefaultButton";
import { serverUrl } from '../../Config/Settings.js'

class DadosUserScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    modalVisible: null,
    modalCameraVisible: null,
    userName: '',
    userEmail: '',
    birthDate: '',
    raspberryIp: '',
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
        this.getUserData();
        this.getUserPhoto();
      }
    }
  }

  getUserData = () => {
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
         userName: dataEvents[0].userName,
         userEmail: dataEvents[0].userEmail,
         birthDate: dataEvents[0].birthDate,
         raspberryIp: dataEvents[0].raspberryIp,
         key: dataEvents[0].key
     });

    })
  }

  getUserPhoto = () => {
    fetch(serverUrl+"userphoto.json")
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
    this.getUserData();
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
    this.getUserPhoto();
  };

  modalCameraOpen = () => {
    this.setState({
      modalCameraVisible: true
    });
  };

  post64photo = (userPhoto) => {
        fetch(serverUrl+"userphoto.json",{
          method: "POST",
          body: JSON.stringify({
            base64: userPhoto,
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
        <UserModal
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
              style={styles.imageUser}
              source={{uri: `data:image/gif;base64,${this.state.encodedData}`}}
            />
        </View>
        <View style={styles.informationContainer}>
           <View style={styles.informationLine}>
             <Text style={styles.textTitle}>Nome: </Text>
             <Text style={styles.textInfo}>{this.state.userName}</Text>
           </View>

           <View style={styles.informationLine}>
             <Text style={styles.textTitle}>Email: </Text>
             <Text style={styles.textInfo}>{this.state.userEmail}</Text>
           </View>

           <View style={styles.informationLine}>
             <Text style={styles.textTitle}>Nascimento: </Text>
             <Text style={styles.textInfo}>{this.state.birthDate}</Text>
           </View>

           <View style={styles.informationLine}>
             <Text style={styles.textTitle}>Ip do Dispositivo: </Text>
             <Text style={styles.textInfo}>{this.state.raspberryIp}</Text>
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
  imageUser: {
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

export default DadosUserScreen;
