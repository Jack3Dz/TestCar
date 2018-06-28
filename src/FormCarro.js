import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import firebase from 'react-native-firebase'

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const Veiculo = t.struct({
  nome: t.String,
  preco: t.maybe(t.String),
  haveABS: t.Boolean,
  haveAIR: t.Boolean,
  haveMP3: t.Boolean,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  
  fields: {
    nome: {
      auto: 'none',
      placeholder: 'Nome',
      error: 'Sem um nome, não é possível cadastrar um veículo!'
    },
    preco: {
      auto: 'none',
      placeholder: 'Preço',
      error: 'Sem um nome, não é possível cadastrar um veículo!'
    },
    haveABS: {
      auto: 'none',
      placeholder: 'Possui ABS',
      label: 'Possúi ABS: ',
    },
    haveAIR: {
      auto: 'none',
      placeholder: 'Possui Ar Condicionado',
      label: 'Possúi Ar Condicionado: ',
    },
    haveMP3: {
      auto: 'none',
      placeholder: 'Possui MP3',
      label: 'Possúi MP3: ',
    },
  },
  stylesheet: formStyles,
};



export default class FormCarro extends React.Component {
  
  handleSubmit = () => {
    const value = this._form.getValue();
    var veiculoOldKey = firebase.database().ref().child('list').push().key;
    console.log('value: ', value);
    

    firebase.database().ref('/list/' + veiculoOldKey).orderByKey().set({
      nome: value.nome,
      preco: value.preco,
      haveABS: value.haveABS,
      haveAIR: value.haveAIR,
      haveMP3: value.haveMP3,
    });
    this.clearForm();
    this.props.navigation.navigate('Main');
  }
  
  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }

  
  
  render() {

    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={Veiculo} 
          options={options}
        />
        <Button
          title="Cadastrar Veículo"
          onPress={this.handleSubmit}
        />
        
        <Button
          title="Voltar"
          onPress={() => this.props.navigation.navigate("Main")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
