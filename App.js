import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Button, TextInput, List } from 'react-native-paper';

export default function App() {
  //HOOKS
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Alternar expansão do Accordion
  const handleAccordionPress = () => setExpanded(!expanded);

  // Selecionar item do Accordion
  const handleItemPress = (x) => {
    setSelectedValue(x);
    setExpanded(false);
  };

  // Buscar CEP na API
  const buscaCep = (xcep) => {
    if (xcep.length !== 8 || isNaN(xcep)) {
      Alert.alert('Erro', 'CEP inválido. Digite um CEP válido com 8 dígitos numéricos.');
      return;
    }
    
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then((resp) => resp.json())
      .then((xjson) => {
        if (xjson.erro) {
          Alert.alert('Erro', 'CEP não encontrado. Verifique e tente novamente.');
          setDados({ logradouro: 'CEP inválido', bairro: '', localidade: '' });
          return;
        }
        setDados(xjson);
        setSelectedValue(xjson.uf);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível buscar o CEP. Tente novamente mais tarde.');
      });
  };

  // Função para limpar os dados
  const limparDados = () => {
    setCep('');
    setDados([]);
    setNome('');
    setCpf('');
    setEmail('');
    setSelectedValue(null);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput label='Nome' mode='outlined' value={nome} onChangeText={setNome} />
        <TextInput label='CPF' mode='outlined' keyboardType='numeric' value={cpf} onChangeText={setCpf} />
        <TextInput label='E-mail' mode='outlined' keyboardType='email-address' value={email} onChangeText={setEmail} />
        <TextInput placeholder='Digite o CEP' onChangeText={setCep} style={styles.input} value={cep} />
        <Button icon='card-search' mode='outlined' onPress={() => buscaCep(cep)}>
          Buscar
        </Button>
        <TextInput label='Rua' mode='outlined' value={dados.logradouro || ''} onChangeText={(value) => setDados({ ...dados, logradouro: value })} />
        <TextInput label='Bairro' mode='outlined' value={dados.bairro || ''} onChangeText={(value) => setDados({ ...dados, bairro: value })} />
        <TextInput label='Cidade' mode='outlined' value={dados.localidade || ''} onChangeText={(value) => setDados({ ...dados, localidade: value })} />
        
        <List.Section title='Estado'>
          <List.Accordion
            title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
            expanded={expanded}
            onPress={handleAccordionPress}>
            {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((estado) => (
              <List.Item key={estado} title={estado} onPress={() => handleItemPress(estado)} />
            ))}
          </List.Accordion>
        </List.Section>
        
        <Button icon='eye' mode='contained' onPress={() => setModalVisible(true)}>
          Visualizar Dados
        </Button>
        <Button icon='broom' mode='outlined' onPress={limparDados}>
          Limpar Dados
        </Button>
        
        {/* Modal de Visualização */}
        <Modal visible={modalVisible} animationType='slide' transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Dados Inseridos</Text>
              <Text>Nome: {nome}</Text>
              <Text>CPF: {cpf}</Text>
              <Text>E-mail: {email}</Text>
              <Text>CEP: {cep}</Text>
              <Text>Rua: {dados.logradouro}</Text>
              <Text>Bairro: {dados.bairro}</Text>
              <Text>Cidade: {dados.localidade}</Text>
              <Text>Estado: {selectedValue}</Text>
              <Button mode='contained' onPress={() => setModalVisible(false)}>Fechar</Button>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#ADD8E6', // Azul claro
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalText: {
    fontWeight: 'bold',
    color: '#000',
  }
});
