import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet} from 'react-native';

import { RNCamera } from 'react-native-camera';
import CloseButton from './UI/CloseButton';
import { serverUrl } from '../Config/Settings.js'

class CameraPhotoModal extends Component {
  constructor(props) {
    super(props);
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.base64);
      this.props.pic64(data.base64);
    }
  };

  render() {
    return (
      <Modal
        onRequestClose={this.props.onModalClosed}
        visible={this.props.openModal !== null}
        animationType="slide"
      >
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <View style={styles.buttonContainer}>
            <CloseButton onPress={this.props.onModalClosed} />
          </View>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'black',
},
buttonContainer: {
  position: 'absolute',
  top: 10,
  left: 10,
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 15,
  paddingHorizontal: 20,
  alignSelf: 'center',
  margin: 20,
},
});

export default CameraPhotoModal;
