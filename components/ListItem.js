import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from '../styles.js';

class ListItem extends Component {
  render() {
    // We are going to return a simple list item with just a title for now
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task.nome} - R${this.props.task.preco}</Text>
        <TouchableHighlight style={styles.button} onPress={this.props.onTaskCompletion}>
          <Text> Apagar </Text>
        </TouchableHighlight>
        
        {/*Icon taken from google's material icon pack: https://design.google.com/icons/#ic_done*/}
      </View>
    );
  }

}


module.exports = ListItem;