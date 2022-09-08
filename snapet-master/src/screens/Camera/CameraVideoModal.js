import React, {Component}  from "react";
import { Modal, View, Image, Text, Button,TouchableOpacity, StyleSheet } from "react-native";
import Video from 'react-native-video';
import CloseButton from '../../Components/UI/CloseButton';
import { serverUrl, raspStaticIP, raspWifiCasa } from '../../Config/Settings.js'

export default class CameraVideoModal extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <View style={styles.modalContainer}>
        <Modal
          onRequestClose={this.props.onModalClosed}
          visible={this.props.videoVisible !== null}
          animationType="slide"
        >
            <View style={styles.buttonContainer}>
              <CloseButton onPress={this.props.onModalClosed} />
            </View>
            <Video source={{uri: this.props.raspberryDIP+"/hls/index.m3u8"}}   // Can be a URL or a local file.
                //<Video source={{uri: "http://192.168.1.16/hls/index.m3u8"}}
               //<Video source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}   // Can be a URL or a local file.
                   ref={(ref) => {
                     this.player = ref
                   }}                                      // Store reference
                  fullscreen={true}
                 onBuffer={this.onBuffer}                // Callback when remote video is buffering
                 onError={this.videoError}               // Callback when video cannot be loaded
                 style={styles.backgroundVideo}
                 resizeMode='contain'
               />
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10
  },
  backgroundVideo: {
    height: "100%",
    width: "100%",
    backgroundColor: 'black'
  },
});
