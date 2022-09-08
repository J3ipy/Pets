import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";

import DrawerButton from '../../Components/UI/DrawerButton';
import CommonStyles from '../../Stylesheets/Common';
import Icon from "react-native-vector-icons/Ionicons";
import { serverUrl } from '../../Config/Settings.js'
import App from "../../../App";

class SideDrawer extends Component {

  state = {
    userName: '',
    keyUser: '',
    encodedData: '',
    key: ''
  };

  componentDidMount() {
    this.getUserData();
      this.getUserPhoto();
  }

  goToDadosPet = () => {
    this.props.navigator.showModal({
      screen: "snapet.DadosPetScreen",
      title: "Dados Pet",
    });
  }

  goToDadosUser = () => {
    this.props.navigator.showModal({
      screen: "snapet.DadosUserScreen",
      title: "Dados Pet",
    });
  }

  gotToRoot = () => {
    App();
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
          keyUser: key
        })
      }
       this.setState({
         userName: dataEvents[0].userName,
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

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image
                style={styles.imageUser}
                source={{uri: `data:image/gif;base64,${this.state.encodedData}`}}
              />
          </View>
          <Text style={styles.headerText}>{this.state.userName}</Text>
        </View>

        <DrawerButton name='Dados Pet' iconName='md-paw' onPress={this.goToDadosPet}/>
        <DrawerButton name='Configurar conta' iconName='md-settings' onPress={this.goToDadosUser}/>
        <DrawerButton name='Sair' iconName='md-log-out' onPress={this.gotToRoot}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: CommonStyles.mainColor,
    flex: 1,
    width: Dimensions.get("window").width * 0.7
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  imageContainer:{
    height: 51,
    width: 51,
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  imageUser: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  headerText: {
    fontSize: 18,
  },
});

export default SideDrawer;
