import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  ToolbarAndroid
} from 'react-native';
import firebase from 'react-native-firebase'
import styles from '../styles.js'
import ListItem from '../components/ListItem.js';
import FloatingActionButton from 'react-native-action-button';
import FormCarro from './FormCarro';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.tasksRef = firebase.database().ref('/list');
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource, // dataSource for our list
      newTask: "" // The name of the new task
    };
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }



  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.navbar}
          title="Veículos"> 
        </ToolbarAndroid>
        {/*A list view with our dataSource and a method to render each row*/}
        {/*Allows lists to be empty, can be removed in future versions of react*/}
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView} 
          
        />
        {/* <TextInput
          value={this.state.newTask}
          style={styles.textEdit}
          onChangeText={(text) => this.setState({ newTask: text })}
          placeholder="Novo Carro"
        /> */}
        {/*The library has a bug so I removing the shadow to avoid it*/}
        <FloatingActionButton
          hideShadow={true}
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.props.navigation.navigate('FormCarro')} />
      </View>
    );
  }

  _renderItem(task) {
    // a method for building each list item
    const onTaskCompletion = () => {
      // removes the item from the list
       this.tasksRef.child(task._key).remove()
      
    };
    return (
      <ListItem task={task} onTaskCompletion={onTaskCompletion} />
    );
  }

  _addTask() {
    if (this.state.newTask === "") {
      return;
    }
    this.tasksRef.push({ nome: this.state.newTask });
    this.setState({ newTask: "" });
  }

  listenForTasks(tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var list = [];
      dataSnapshot.forEach((child) => {
        list.push({
          nome: child.val().nome,
          preco: child.val().preco,
          _key: child.key
        });
      });

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list)
      });
    });
  }
}

AppRegistry.registerComponent('Main', () => Main);