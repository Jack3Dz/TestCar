// Main.js
import React from 'react'
import { FlatList, StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import _ from 'lodash'; // 4.17.4
import { ListItem } from 'react-native-elements';
export default class Main extends React.Component {
  state = { 
    currentUser: null,
    loading: false,
    data: []
  };

  componentWillMount() {
    firebase.database().ref('list').on('value', (data) => {
      console.log(data.toJSON())
    });

    setTimeout(() => {
      firebase.database().ref('list/002').set(
        {
          nome: 'Sentra',
          preco: '90000'
        }).then(() => {
          console.log('Inserted !');
        }).catch((error) => {
          console.log(error);
        })
    }, 5000);
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://testcar-579d3.firebaseio.com/list.json");
    const json = await response.json();
    this.setState({ data: json.response });
  }

  componentDidMount() {
    // const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref(`list/`)
      .on('value', snapshot => {
        const data = _.map(snapshot.val(), (uid) => {
          return {uid}
        });
        this.setState({data, loading: false})
      })
  }

  renderItem({item}) {
    return (
        <ListItem item={item} />
      )
  }

  render() {
    const { currentUser } = this.state
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.nome}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
