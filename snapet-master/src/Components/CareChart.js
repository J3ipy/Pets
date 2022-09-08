import React, {Component}  from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import CloseButton from './UI/CloseButton';
import EventDataForm from './EventDataForm';

import { serverUrl } from '../Config/Settings.js';

import {LineChart} from 'react-native-chart-kit'

export default class CareChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: [],
        chosenDate: [],
      };
  }

  renderChart(){
    if(!this.props.showChart){
      return(
        <Text>Selecione opcao para ver o grafico</Text>
      )
    }
    else{
      return(
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }]
          }}
          width={Dimensions.get('window').width-20} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      )
    }
  }


  render(){
    return (
      <View style={styles.container}>
        {this.renderChart()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
  }
});
