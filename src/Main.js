// Main.js
import React from 'react'
import { FlatList, StyleSheet, Platform, Image, Text, View, ListView, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import _ from 'lodash'; // 4.17.4
import { ListItem } from 'react-native-elements';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('list');
  }

  getRef() {
    return firebase.database().ref('/list');
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          nome: child.val().nome,
          preco: child.val().preco,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={StyleSheet.container}>

        <StatusBar title="Dictionary" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={StyleSheet.listview}/>


          </View>
        )
      }
  _renderItem(item) {

    return (
      <ListItem item={item}/>
    );
  }

}