import { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,

} from 'react-native';
import {css} from './css/Style';
import { Button} from 'react-native-paper';

export default ViaCep = () => {
  const [cep, setCep] = useState('xxx');
  let [dados, setDados] = useState([]);

  //-----------------------------------
  const buscaCep = (arg) => {
    let url = `https://viacep.com.br/ws/${arg}/json/`;
    console.log(url);
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((xjson) => {
        console.log(xjson);
        setDados(xjson);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <>
      <TextInput
        placeholder="Digite o Cep"
        onChangeText={(value) => {
          setCep(value);
        }}
        style={{
          border: '2px solid red',
          borderRadius: '4px;',
          margin: 5,
        }}
      />

      <Button
        mode="contained"
        color="#aaff00"
        onPress={() => {
          buscaCep(cep);
        }}
       > Busca </Button>

      <Text style={css.text}> Rua {dados.logradouro} </Text>
      <Text style={css.text}> Bairro {dados['bairro']} </Text>
      <Text style={css.text}> Cidade {dados.localidade} </Text>
      <Text style={css.text}> Estado {dados.estado} </Text>
    </>
  );
};
