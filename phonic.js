import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import db from '../config';
import {Audio} from 'expo-av';

export default class TaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedButtonIndex: '',
    };
  }
  resetdb = () => {
   
    db.ref('toDos/' + this.props.keys + '/').update({
      taskName: this.props.wordChunk,
      status: 'done',
    });
  };

   playSound = async () => {
    var soundLink =
      'http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3'
    await Audio.Sound.createAsync(
      {
        uri: soundLink,
      },
      { shouldPlay: true }
    );
  };


  render() {
    return (
      <TouchableOpacity
        style={styles.chunkButton}
        onPress={() => {
          this.setState({ pressedButtonIndex: this.props.buttonIndex });
          this.playSound();
          this.resetdb();
        }}>
        <Text style={styles.displayText}>{this.props.wordChunk}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  displayText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'yellow',
  },
});